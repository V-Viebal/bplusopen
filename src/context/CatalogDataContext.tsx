import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { COLLECTIONS, PRODUCTS } from '../data/furnitureData';
import { Collection, Product } from '../types';

const EDITS_STORAGE_KEY = 'b-open-catalog-edits-v1';
const ADMIN_SESSION_KEY = 'b-open-admin-session-v1';

export type CatalogEdits = {
  collections: Record<string, Partial<Collection>>;
  products: Record<string, Partial<Product>>;
  images: Record<string, string>;
  content: Record<string, string>;
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
  removeContentEdit: (contentKey: string) => void;
  resetEdits: () => void;
};

const CatalogDataContext = createContext<CatalogDataContextValue | undefined>(undefined);

const EMPTY_EDITS: CatalogEdits = {
  collections: {},
  products: {},
  images: {},
  content: {},
};

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

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

  return { collections, products };
};

const readAdminSession = () => {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated';
  } catch {
    return false;
  }
};

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'bopen2026';

export const CatalogDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [edits, setEdits] = useState<CatalogEdits>(() => {
    const stored = readStoredEdits();
    applyEditsToCatalog(stored);
    return stored;
  });
  const [revision, setRevision] = useState(0);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(readAdminSession);
  const [isEditMode, setIsEditModeState] = useState(false);
  const { collections, products } = useMemo(() => buildEffectiveCatalog(edits), [edits]);

  const setEditMode = useCallback((enabled: boolean) => {
    setIsEditModeState(enabled);
  }, []);

  const login = useCallback((username: string, password: string) => {
    const isValid = username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
    if (!isValid) return false;

    try {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
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
    } catch {
      // Ignore storage failures; the React state still logs the user out.
    }
    setIsEditModeState(false);
    setIsAdminAuthenticated(false);
  }, []);

  const saveEdits = useCallback((nextEdits: CatalogEdits) => {
    const normalized = clone(nextEdits);
    applyEditsToCatalog(normalized);
    try {
      window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(normalized));
    } catch {
      // The current session still reflects the saved values even if storage is unavailable.
    }
    setEdits(normalized);
    setRevision((current) => current + 1);
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

  const saveContentEdit = useCallback((contentKey: string, replacementText: string) => {
    saveEdits({
      ...edits,
      content: {
        ...edits.content,
        [contentKey]: replacementText,
      },
    });
  }, [edits, saveEdits]);

  const removeContentEdit = useCallback((contentKey: string) => {
    const nextContent = { ...edits.content };
    delete nextContent[contentKey];
    saveEdits({ ...edits, content: nextContent });
  }, [edits, saveEdits]);

  const resetEdits = useCallback(() => {
    const empty = clone(EMPTY_EDITS);
    applyEditsToCatalog(empty);
    try {
      window.localStorage.removeItem(EDITS_STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
    setEdits(empty);
    setRevision((current) => current + 1);
  }, []);

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
      removeContentEdit,
      resetEdits,
    }),
    [collections, products, edits, revision, isAdminAuthenticated, isEditMode, login, logout, setEditMode, saveEdits, saveImageEdit, removeImageEdit, saveContentEdit, removeContentEdit, resetEdits],
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
