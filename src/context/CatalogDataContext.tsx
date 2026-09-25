import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { COLLECTIONS, PRODUCTS } from '../data/furnitureData';
import { Collection, Product } from '../types';

const EDITS_STORAGE_KEY = 'b-open-catalog-edits-v1';
const ADMIN_SESSION_KEY = 'b-open-admin-session-v1';
const ADMIN_CREDENTIALS_KEY = 'b-open-admin-credentials-v1';
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export type CatalogEdits = {
  collections: Record<string, Partial<Collection>>;
  products: Record<string, Partial<Product>>;
  images: Record<string, string>;
  content: Record<string, string>;
  deletedProductIds: string[];
};

type CatalogDataContextValue = {
  collections: Collection[];
  products: Product[];
  edits: CatalogEdits;
  revision: number;
  isAdminAuthenticated: boolean;
  isEditMode: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setEditMode: (enabled: boolean) => void;
  saveEdits: (nextEdits: CatalogEdits) => void;
  saveImageEdit: (originalSrc: string, replacementSrc: string) => void;
  removeImageEdit: (originalSrc: string) => void;
  saveContentEdit: (contentKey: string, replacementText: string) => void;
  saveContentEdits: (patch: Record<string, string>) => void;
  removeContentEdit: (contentKey: string) => void;
  deleteProduct: (id: string) => void;
  restoreProduct: (id: string) => void;
  resetEdits: () => void;
  uploadImage: (file: File) => Promise<string>;
};

const CatalogDataContext = createContext<CatalogDataContextValue | undefined>(undefined);

const EMPTY_EDITS: CatalogEdits = {
  collections: {},
  products: {},
  images: {},
  content: {},
  deletedProductIds: [],
};

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const BASE_COLLECTIONS = clone(COLLECTIONS);
const BASE_PRODUCTS = clone(PRODUCTS);

const readStoredEdits = (): CatalogEdits => {
  if (typeof window === 'undefined') return clone(EMPTY_EDITS);

  try {
    const raw = window.localStorage.getItem(EDITS_STORAGE_KEY);
    if (!raw) return clone(EMPTY_EDITS);
    const parsed = JSON.parse(raw) as Partial<CatalogEdits>;
    return {
      collections: parsed.collections && typeof parsed.collections === 'object' ? parsed.collections : {},
      products: parsed.products && typeof parsed.products === 'object' ? parsed.products : {},
      images: parsed.images && typeof parsed.images === 'object' ? parsed.images : {},
      content: parsed.content && typeof parsed.content === 'object' ? parsed.content : {},
      deletedProductIds: Array.isArray(parsed.deletedProductIds)
        ? parsed.deletedProductIds.filter((id): id is string => typeof id === 'string')
        : [],
    };
  } catch {
    return clone(EMPTY_EDITS);
  }
};

const applyEditsToCatalog = (edits: CatalogEdits) => {
  // Restore the source data first so reset and edits from another tab are deterministic.
  COLLECTIONS.splice(0, COLLECTIONS.length, ...clone(BASE_COLLECTIONS));
  PRODUCTS.splice(0, PRODUCTS.length, ...clone(BASE_PRODUCTS));

  Object.entries(edits.collections).forEach(([id, patch]) => {
    const collection = COLLECTIONS.find((item) => item.id === id);
    if (collection) Object.assign(collection, clone(patch));
  });

  Object.entries(edits.products).forEach(([id, patch]) => {
    const product = PRODUCTS.find((item) => item.id === id);
    if (product) Object.assign(product, clone(patch));
  });
  const deleted = new Set(edits.deletedProductIds || []);
  PRODUCTS.splice(0, PRODUCTS.length, ...PRODUCTS.filter((product) => !deleted.has(product.id)));
};

const buildEffectiveCatalog = (edits: CatalogEdits) => {
  const collections = clone(BASE_COLLECTIONS);
  const products = clone(BASE_PRODUCTS);

  Object.entries(edits.collections).forEach(([id, patch]) => {
    const collection = collections.find((item) => item.id === id);
    if (collection) Object.assign(collection, clone(patch));
  });

  Object.entries(edits.products).forEach(([id, patch]) => {
    const product = products.find((item) => item.id === id);
    if (product) Object.assign(product, clone(patch));
  });

  const deleted = new Set(edits.deletedProductIds || []);
  return { collections, products: products.filter((product) => !deleted.has(product.id)) };
};

const readAdminSession = () => {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated'
      && Boolean(window.sessionStorage.getItem(ADMIN_CREDENTIALS_KEY));
  } catch {
    return false;
  }
};

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'bopen2026';

const getAdminAuthorization = () => {
  if (typeof window === 'undefined') return '';
  try {
    return window.sessionStorage.getItem(ADMIN_CREDENTIALS_KEY) || '';
  } catch {
    return '';
  }
};

const hasEdits = (value: CatalogEdits) =>
  Object.keys(value.collections).length > 0
  || Object.keys(value.products).length > 0
  || Object.keys(value.images).length > 0
  || Object.keys(value.content).length > 0
  || value.deletedProductIds.length > 0;

const removeDataUrls = <T,>(value: T): T => {
  if (typeof value === 'string') return (value.startsWith('data:') ? '' : value) as T;
  if (Array.isArray(value)) return value.map((item) => removeDataUrls(item)) as T;
  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, removeDataUrls(item)]),
    ) as T;
  }
  return value;
};

const parseDataUrl = async (dataUrl: string) => {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  if (!blob.type.startsWith('image/')) throw new Error('Only image data URLs can be migrated.');
  const extension = blob.type.split('/')[1]?.replace('jpeg', 'jpg') || 'bin';
  return new File([blob], `legacy-upload.${extension}`, { type: blob.type });
};

const mapDataUrls = async <T,>(value: T, upload: (file: File) => Promise<string>): Promise<T> => {
  if (typeof value === 'string') {
    return (value.startsWith('data:') ? await upload(await parseDataUrl(value)) : value) as T;
  }
  if (Array.isArray(value)) {
    return (await Promise.all(value.map((item) => mapDataUrls(item, upload)))) as T;
  }
  if (isRecord(value)) {
    return Object.fromEntries(
      await Promise.all(Object.entries(value).map(async ([key, item]) => [key, await mapDataUrls(item, upload)])),
    ) as T;
  }
  return value;
};

export const CatalogDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [edits, setEdits] = useState<CatalogEdits>(() => {
    const stored = readStoredEdits();
    applyEditsToCatalog(stored);
    return stored;
  });
  const [revision, setRevision] = useState(0);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(readAdminSession);
  const [isEditMode, setIsEditModeState] = useState(readAdminSession);
  const [serverCatalogStatus, setServerCatalogStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [serverHasEdits, setServerHasEdits] = useState(false);
  const catalogSaveQueue = useRef(Promise.resolve());
  const editsRef = useRef(edits);
  const migrationStarted = useRef(false);
  const { collections, products } = useMemo(() => buildEffectiveCatalog(edits), [edits]);

  const cacheEdits = useCallback((nextEdits: CatalogEdits) => {
    try {
      // Keep the browser cache useful for fast boot, but never put legacy file data in it.
      window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(removeDataUrls(nextEdits)));
    } catch {
      // The server remains the source of truth when browser storage is unavailable.
    }
  }, []);

  const persistCatalog = useCallback(async (nextEdits: CatalogEdits, operation?: { productId: string; deleted: boolean }) => {
    let lastError: unknown;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const response = await fetch('/api/catalog', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: getAdminAuthorization(),
            ...(operation ? { 'X-Catalog-Operation': 'update-deleted-product' } : {}),
          },
          body: JSON.stringify(operation
            ? {
              deletedProductIds: nextEdits.deletedProductIds,
              deletedProductId: operation.productId,
              deleted: operation.deleted,
            }
            : nextEdits),
        });
        if (!response.ok) throw new Error(`Catalog save failed (${response.status}).`);
        return;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError instanceof Error ? lastError : new Error('Catalog save failed.');
  }, []);

  const queueCatalogSave = useCallback((nextEdits: CatalogEdits) => {
    const save = catalogSaveQueue.current.then(() => persistCatalog(nextEdits));
    catalogSaveQueue.current = save.catch((error) => {
      window.alert(error instanceof Error ? error.message : 'Catalog save failed.');
    });
    void save.catch(() => undefined);
  }, [persistCatalog]);

  const commitLocalEdits = useCallback((nextEdits: CatalogEdits) => {
    const normalized = clone(nextEdits);
    editsRef.current = normalized;
    applyEditsToCatalog(normalized);
    cacheEdits(normalized);
    setEdits(normalized);
    setRevision((current) => current + 1);
  }, [cacheEdits]);

  const setEditMode = useCallback((enabled: boolean) => {
    setIsEditModeState(enabled);
  }, []);

  const login = useCallback((username: string, password: string) => {
    const isValid = username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
    if (!isValid) return false;

    try {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
      window.sessionStorage.setItem(
        ADMIN_CREDENTIALS_KEY,
        `Basic ${window.btoa(`${username.trim()}:${password}`)}`,
      );
    } catch {
      // The in-memory session remains available if browser storage is disabled.
    }
    setIsEditModeState(true);
    setIsAdminAuthenticated(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    try {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
      window.sessionStorage.removeItem(ADMIN_CREDENTIALS_KEY);
    } catch {
      // Ignore storage failures; the React state still logs the user out.
    }
    setIsEditModeState(false);
    setIsAdminAuthenticated(false);
  }, []);

  const saveEdits = useCallback((nextEdits: CatalogEdits) => {
    const normalized = clone(nextEdits);
    commitLocalEdits(normalized);
    queueCatalogSave(normalized);
  }, [commitLocalEdits, queueCatalogSave]);

  const uploadImage = useCallback(async (file: File) => {
    if (file.size > MAX_UPLOAD_BYTES) throw new Error('File is too large. Choose an image under 5MB.');
    if (!file.type.startsWith('image/')) throw new Error('Only image files are accepted.');
    const response = await fetch('/api/uploads', {
      method: 'POST',
      headers: {
        'Content-Type': file.type,
        'X-Filename': file.name,
        Authorization: getAdminAuthorization(),
      },
      body: file,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || typeof payload.url !== 'string') {
      throw new Error(typeof payload.error === 'string' ? payload.error : 'Image upload failed.');
    }
    return payload.url as string;
  }, []);

  const saveImageEdit = useCallback((originalSrc: string, replacementSrc: string) => {
    const nextEdits: CatalogEdits = {
      ...edits,
      images: {
        ...edits.images,
        [originalSrc]: replacementSrc,
      },
    };
    saveEdits(nextEdits);
  }, [edits, saveEdits]);

  const removeImageEdit = useCallback((originalSrc: string) => {
    const nextImages = { ...edits.images };
    delete nextImages[originalSrc];
    saveEdits({ ...edits, images: nextImages });
  }, [edits, saveEdits]);

  const saveContentEdits = useCallback((patch: Record<string, string>) => {
    const next = { ...edits, content: { ...edits.content, ...patch } };
    commitLocalEdits(next);
    queueCatalogSave(next);
  }, [commitLocalEdits, edits, queueCatalogSave]);

  const saveContentEdit = useCallback((contentKey: string, replacementText: string) => {
    saveContentEdits({ [contentKey]: replacementText });
  }, [saveContentEdits]);

  const removeContentEdit = useCallback((contentKey: string) => {
    const nextContent = { ...edits.content };
    delete nextContent[contentKey];
    const next = { ...edits, content: nextContent };
    commitLocalEdits(next);
    queueCatalogSave(next);
  }, [commitLocalEdits, edits, queueCatalogSave]);

  const queueDeletedProductSave = useCallback((id: string, deleted: boolean) => {
    const save = catalogSaveQueue.current
      .catch(() => undefined)
      .then(() => persistCatalog(editsRef.current, { productId: id, deleted }));
    catalogSaveQueue.current = save.catch((error) => {
      setEdits((current) => {
        const ids = new Set(current.deletedProductIds || []);
        if (ids.has(id) !== deleted) return current;
        if (deleted) ids.delete(id);
        else ids.add(id);
        const normalized = clone({ ...current, deletedProductIds: [...ids] });
        editsRef.current = normalized;
        applyEditsToCatalog(normalized);
        cacheEdits(normalized);
        return normalized;
      });
      setRevision((current) => current + 1);
      window.alert(error instanceof Error
        ? `${error.message} The product change was reverted.`
        : 'Catalog save failed. The product change was reverted.');
    });
    void save.catch(() => undefined);
  }, [cacheEdits, persistCatalog]);

  const updateDeletedProducts = useCallback((id: string, deleted: boolean) => {
    if (!isAdminAuthenticated || !isEditMode || !BASE_PRODUCTS.some((product) => product.id === id)) return;
    setServerHasEdits(true);
    setEdits((current) => {
      const ids = new Set(current.deletedProductIds || []);
      if (deleted) ids.add(id);
      else ids.delete(id);
      const normalized = clone({ ...current, deletedProductIds: [...ids] });
      editsRef.current = normalized;
      applyEditsToCatalog(normalized);
      cacheEdits(normalized);
      return normalized;
    });
    setRevision((current) => current + 1);
    queueDeletedProductSave(id, deleted);
  }, [cacheEdits, isAdminAuthenticated, isEditMode, queueDeletedProductSave]);
  const deleteProduct = useCallback((id: string) => updateDeletedProducts(id, true), [updateDeletedProducts]);
  const restoreProduct = useCallback((id: string) => updateDeletedProducts(id, false), [updateDeletedProducts]);

  const resetEdits = useCallback(() => {
    const empty = clone(EMPTY_EDITS);
    commitLocalEdits(empty);
    queueCatalogSave(empty);
    try {
      window.localStorage.removeItem(EDITS_STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
  }, [commitLocalEdits, queueCatalogSave]);

  useEffect(() => {
    let active = true;
    fetch('/api/catalog', { headers: { Accept: 'application/json' } })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Catalog load failed (${response.status}).`);
        return response.json() as Promise<Partial<CatalogEdits>>;
      })
      .then((remote) => {
        if (!active) return;
        const normalized: CatalogEdits = {
          collections: remote.collections && typeof remote.collections === 'object' ? remote.collections : {},
          products: remote.products && typeof remote.products === 'object' ? remote.products : {},
          images: remote.images && typeof remote.images === 'object' ? remote.images : {},
          content: remote.content && typeof remote.content === 'object' ? remote.content : {},
          deletedProductIds: Array.isArray(remote.deletedProductIds)
            ? remote.deletedProductIds.filter((id): id is string => typeof id === 'string')
            : [],
        };
        const remoteHasEdits = hasEdits(normalized);
        setServerHasEdits(remoteHasEdits);
        setServerCatalogStatus('loaded');
        if (remoteHasEdits) commitLocalEdits(normalized);
      })
      .catch(() => {
        if (active) setServerCatalogStatus('error');
      });
    return () => {
      active = false;
    };
  }, [commitLocalEdits]);

  useEffect(() => {
    if (!isAdminAuthenticated || serverCatalogStatus !== 'loaded' || serverHasEdits || migrationStarted.current) return;
    if (!hasEdits(edits)) return;
    migrationStarted.current = true;
    let active = true;
    const migrate = async () => {
      try {
        const migrated = await mapDataUrls(edits, uploadImage);
        await persistCatalog(migrated);
        if (active) {
          commitLocalEdits(migrated);
          setServerHasEdits(hasEdits(migrated));
        }
      } catch {
        migrationStarted.current = false;
        window.alert('Catalog migration failed. Please try saving again.');
      }
    };
    void migrate();
    return () => {
      active = false;
    };
  }, [commitLocalEdits, edits, isAdminAuthenticated, persistCatalog, serverCatalogStatus, serverHasEdits, uploadImage]);

  const value = useMemo(
    () => ({
      collections,
      products,
      edits,
      revision,
      isAdminAuthenticated,
      isEditMode,
      login,
      logout,
      setEditMode,
      saveEdits,
      saveImageEdit,
      removeImageEdit,
      saveContentEdit,
      saveContentEdits,
      removeContentEdit,
      deleteProduct,
      restoreProduct,
      resetEdits,
      uploadImage,
    }),
    [collections, products, edits, revision, isAdminAuthenticated, isEditMode, login, logout, setEditMode, saveEdits, saveImageEdit, removeImageEdit, saveContentEdit, saveContentEdits, removeContentEdit, deleteProduct, restoreProduct, resetEdits, uploadImage],
  );

  return <CatalogDataContext.Provider value={value}>{children}</CatalogDataContext.Provider>;
};

export const useCatalogData = () => {
  const context = useContext(CatalogDataContext);
  if (!context) {
    throw new Error('useCatalogData must be used inside CatalogDataProvider');
  }
  return context;
};
