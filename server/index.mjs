import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import express from 'express';

const app = express();
const PORT = Number(process.env.PORT || 80);
const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(process.cwd(), 'data'));
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const CATALOG_PATH = path.join(DATA_DIR, 'catalog.json');
const DIST_DIR = path.join(process.cwd(), 'dist');
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bopen2026';

const EMPTY_CATALOG = {
  collections: {},
  products: {},
  addedProducts: [],
  images: {},
  content: {},
  deletedProductIds: [],
};

const imageExtensions = {
  'image/avif': '.avif',
  'image/bmp': '.bmp',
  'image/gif': '.gif',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/svg+xml': '.svg',
  'image/tiff': '.tif',
  'image/webp': '.webp',
};

let catalogWriteQueue = Promise.resolve();

const isRecord = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const isValidProduct = (value) => isRecord(value)
  && typeof value.id === 'string'
  && typeof value.name === 'string'
  && typeof value.collection === 'string'
  && typeof value.imageUrl === 'string';

const normalizeCatalog = (value) => {
  if (!isRecord(value)) return { ...EMPTY_CATALOG };
  return {
    collections: isRecord(value.collections) ? value.collections : {},
    products: isRecord(value.products) ? value.products : {},
    addedProducts: Array.isArray(value.addedProducts)
      ? value.addedProducts.filter(isValidProduct)
      : [],
    images: isRecord(value.images) ? value.images : {},
    content: isRecord(value.content) ? value.content : {},
    deletedProductIds: Array.isArray(value.deletedProductIds)
      ? value.deletedProductIds.filter((id) => typeof id === 'string')
      : [],
  };
};

const containsDataUrl = (value) => {
  if (typeof value === 'string') return value.startsWith('data:');
  if (Array.isArray(value)) return value.some(containsDataUrl);
  if (isRecord(value)) return Object.values(value).some(containsDataUrl);
  return false;
};

const sameSecret = (provided, expected) => {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  return providedBuffer.length === expectedBuffer.length
    && crypto.timingSafeEqual(providedBuffer, expectedBuffer);
};

const isAdminRequest = (request) => {
  const header = request.get('authorization') || '';
  if (!header.startsWith('Basic ')) return false;

  try {
    const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
    const separator = decoded.indexOf(':');
    if (separator < 0) return false;
    const username = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);
    return sameSecret(username, ADMIN_USERNAME) && sameSecret(password, ADMIN_PASSWORD);
  } catch {
    return false;
  }
};

const requireAdmin = (request, response, next) => {
  if (!isAdminRequest(request)) {
    response.status(401).json({ error: 'Authentication required.' });
    return;
  }
  next();
};

const ensureDataDirectories = async () => {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
};

const readCatalog = async () => {
  try {
    const raw = await fs.readFile(CATALOG_PATH, 'utf8');
    return normalizeCatalog(JSON.parse(raw));
  } catch (error) {
    if (error.code === 'ENOENT' || error instanceof SyntaxError) return { ...EMPTY_CATALOG };
    throw error;
  }
};

const writeCatalog = async (catalog) => {
  await ensureDataDirectories();
  const temporaryPath = path.join(DATA_DIR, `.catalog-${crypto.randomUUID()}.tmp`);
  await fs.writeFile(temporaryPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
  await fs.rename(temporaryPath, CATALOG_PATH);
};

const safeUploadExtension = (contentType, originalName) => {
  const fallback = imageExtensions[contentType];
  const sanitizedName = path.basename(String(originalName || 'upload')).replace(/[^a-zA-Z0-9._-]/g, '_');
  const requestedExtension = path.extname(sanitizedName).toLowerCase();
  const allowedExtensions = new Set(Object.values(imageExtensions));
  return allowedExtensions.has(requestedExtension) ? requestedExtension : fallback;
};

app.use(express.json({ limit: '2mb' }));

app.get('/api/catalog', async (_request, response, next) => {
  try {
    response.json(await readCatalog());
  } catch (error) {
    next(error);
  }
});

app.put('/api/catalog', requireAdmin, async (request, response, next) => {
  try {
    const requestedCatalog = normalizeCatalog(request.body);
    if (containsDataUrl(requestedCatalog)) {
      response.status(400).json({ error: 'Catalog edits must reference uploaded files, not data URLs.' });
      return;
    }

    const isDeletedProductUpdate = request.get('x-catalog-operation') === 'update-deleted-product';
    const productId = typeof request.body?.deletedProductId === 'string'
      ? request.body.deletedProductId
      : '';
    const deleted = request.body?.deleted === true;
    const write = catalogWriteQueue.catch(() => undefined).then(async () => {
      const currentCatalog = await readCatalog();
      let catalog = requestedCatalog;
      if (isDeletedProductUpdate) {
        const deletedProductIds = new Set(currentCatalog.deletedProductIds);
        if (productId) {
          if (deleted) deletedProductIds.add(productId);
          else deletedProductIds.delete(productId);
        } else {
          requestedCatalog.deletedProductIds.forEach((id) => deletedProductIds.add(id));
        }
        catalog = { ...currentCatalog, deletedProductIds: [...deletedProductIds] };
      }
      await writeCatalog(catalog);
      return catalog;
    });
    catalogWriteQueue = write.catch(() => undefined);
    response.json(await write);
  } catch (error) {
    next(error);
  }
});

app.post(
  '/api/uploads',
  requireAdmin,
  express.raw({ type: '*/*', limit: MAX_UPLOAD_BYTES }),
  async (request, response, next) => {
    try {
      const contentType = (request.get('content-type') || '').split(';', 1)[0].toLowerCase();
      const extension = imageExtensions[contentType];
      if (!extension || !Buffer.isBuffer(request.body) || request.body.length === 0) {
        response.status(400).json({ error: 'Only non-empty image files are accepted.' });
        return;
      }

      await ensureDataDirectories();
      const filename = `${crypto.randomUUID()}${safeUploadExtension(contentType, request.get('x-filename'))}`;
      await fs.writeFile(path.join(UPLOADS_DIR, filename), request.body, { flag: 'wx' });
      response.status(201).json({ url: `/uploads/${filename}` });
    } catch (error) {
      next(error);
    }
  },
);

app.use('/uploads', express.static(UPLOADS_DIR, { fallthrough: false, maxAge: '1y' }));
app.use(express.static(DIST_DIR));
app.get('*', (_request, response) => {
  response.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.use((error, _request, response, next) => {
  if (error?.type === 'entity.too.large') {
    response.status(413).json({ error: 'Upload exceeds the 5MB limit.' });
    return;
  }
  next(error);
});

app.use((error, _request, response, _next) => {
  response.status(500).json({ error: 'Internal server error.' });
  if (process.env.NODE_ENV !== 'production') console.error(error);
});

await ensureDataDirectories();
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') console.log(`bplusopen server listening on port ${PORT}`);
});
