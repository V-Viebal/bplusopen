import React, { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import {
  Check,
  CheckCircle2,
  Database,
  Eye,
  Image as ImageIcon,
  Layers3,
  LogOut,
  Package,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import { Collection, PageId, Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { CatalogEdits, useCatalogData } from '../context/CatalogDataContext';

interface AdminPageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string }) => void;
  onOpenLogin: () => void;
}

type EditorTab = 'collections' | 'products';

type NewProductDraft = {
  name: string;
  nameVi: string;
  sku: string;
  collection: string;
  category: Product['category'];
  material: Product['material'];
  description: string;
  descriptionVi: string;
  imageUrl: string;
  lifestyleImageUrl: string;
  width: string;
  depth: string;
  height: string;
};

const newProductDraft = (collection = ''): NewProductDraft => ({
  name: '',
  nameVi: '',
  sku: '',
  collection,
  category: 'dining',
  material: 'Powder-coated aluminum',
  description: '',
  descriptionVi: '',
  imageUrl: '',
  lifestyleImageUrl: '',
  width: '',
  depth: '',
  height: '',
});

const cloneEdits = (edits: CatalogEdits): CatalogEdits =>
  JSON.parse(JSON.stringify(edits)) as CatalogEdits;

const listToText = (items?: string[]) => (items || []).join('\n');
const textToList = (value: string) =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

const inputClass =
  'w-full rounded-xs border border-[#DED9CD] bg-white px-3 py-2.5 text-sm text-[#1C1A17] outline-none transition-colors focus:border-[#9B522E] focus:ring-2 focus:ring-[#9B522E]/15 disabled:cursor-not-allowed disabled:bg-[#F2EDE5] disabled:text-[#8C7A6B]';

const labelClass =
  'mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#6B5E52]';

const AdminField: React.FC<{
  label: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  hint?: string;
}> = ({ label, value, disabled, onChange, multiline = false, rows = 4, hint }) => (
  <label className="block">
    <span className={labelClass}>{label}</span>
    {multiline ? (
      <textarea
        value={value}
        rows={rows}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} resize-y`}
      />
    ) : (
      <input
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    )}
    {hint && <span className="mt-1 block text-[11px] leading-relaxed text-[#9A8D80]">{hint}</span>}
  </label>
);

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate, onOpenLogin }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const {
    collections,
    products,
    edits,
    isAdminAuthenticated,
    isEditMode,
    setEditMode,
    logout,
    saveEdits,
    addProduct,
    resetEdits,
    deleteProduct,
    restoreProduct,
    uploadImage,
  } = useCatalogData();

  const [activeTab, setActiveTab] = useState<EditorTab>('collections');
  const [selectedCollectionId, setSelectedCollectionId] = useState(collections[0]?.id || '');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [productFilter, setProductFilter] = useState('all');
  const [draftEdits, setDraftEdits] = useState<CatalogEdits>(() => cloneEdits(edits));
  const [saveMessage, setSaveMessage] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProductDraft>(() => newProductDraft(collections[0]?.id));
  const [createError, setCreateError] = useState('');

  const setNewProductField = <K extends keyof NewProductDraft>(field: K, value: NewProductDraft[K]) => {
    setNewProduct((previous) => ({ ...previous, [field]: value }));
    setCreateError('');
  };

  const handleNewImageFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 3 * 1024 * 1024) {
      setCreateError(isVi ? 'Chọn ảnh dưới 3 MB.' : 'Choose an image under 3 MB.');
      event.target.value = '';
      return;
    }
    try {
      const url = await uploadImage(file);
      setNewProductField('imageUrl', url);
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : (isVi ? 'Không tải được hình ảnh.' : 'Could not upload the image.'));
    } finally {
      event.target.value = '';
    }
  };

  const handleCreateProduct = () => {
    if (!isAdminAuthenticated || !isEditMode) return;
    const name = newProduct.name.trim();
    const sku = newProduct.sku.trim();
    const collection = collections.find((item) => item.id === newProduct.collection);
    if (!name || !sku || !collection || !newProduct.imageUrl.trim() || newProduct.imageUrl.startsWith('data:')) {
      setCreateError(isVi ? 'Vui lòng nhập tên, SKU, bộ sưu tập và tải hình ảnh lên.' : 'Enter a name, SKU, collection and upload an image.');
      return;
    }
    if (products.some((item) => item.sku.toLowerCase() === sku.toLowerCase()) ||
        (edits.addedProducts || []).some((item) => item.sku.toLowerCase() === sku.toLowerCase())) {
      setCreateError(isVi ? 'SKU đã tồn tại.' : 'This SKU already exists.');
      return;
    }
    const id = `custom-${crypto.randomUUID()}`;
    const product: Product = {
      id,
      name,
      nameVi: newProduct.nameVi.trim() || name,
      sku,
      collection: collection.id,
      category: newProduct.category,
      material: newProduct.material,
      materialVi: newProduct.material,
      description: newProduct.description.trim() || name,
      descriptionVi: newProduct.descriptionVi.trim() || newProduct.description.trim() || name,
      imageUrl: newProduct.imageUrl.trim(),
      lifestyleImageUrl: newProduct.lifestyleImageUrl.trim() || newProduct.imageUrl.trim(),
      secondaryImages: [],
      features: [],
      featuresVi: [],
      dimensions: {
        width: newProduct.width.trim(),
        depth: newProduct.depth.trim(),
        height: newProduct.height.trim(),
      },
      cadAvailable: false,
      inStock: true,
    };
    const nextEdits = cloneEdits({ ...edits, addedProducts: [...(edits.addedProducts || []), product] });
    if (!addProduct(product)) {
      setCreateError(isVi ? 'Không lưu được sản phẩm.' : 'Could not save the product.');
      return;
    }
    setDraftEdits(nextEdits);
    setProductFilter(collection.id);
    setSelectedProductId(id);
    setNewProduct(newProductDraft(collection.id));
    setIsAddingProduct(false);
    setCreateError('');
    setSaveMessage(isVi ? `Đã thêm sản phẩm "${name}".` : `Added "${name}".`);
  };

  useEffect(() => {
    setDraftEdits(cloneEdits(edits));
  }, [edits]);

  useEffect(() => {
    if (!collections.some((collection) => collection.id === selectedCollectionId)) {
      setSelectedCollectionId(collections[0]?.id || '');
    }
  }, [collections, selectedCollectionId]);

  useEffect(() => {
    if (!products.some((product) => product.id === selectedProductId)) {
      setSelectedProductId(products[0]?.id || '');
    }
  }, [products, selectedProductId]);

  const selectedCollection = useMemo(() => {
    const source = collections.find((collection) => collection.id === selectedCollectionId);
    if (!source) return null;
    return {
      ...source,
      ...draftEdits.collections[selectedCollectionId],
    } as Collection;
  }, [collections, draftEdits.collections, selectedCollectionId]);

  const selectedProduct = useMemo(() => {
    const source = products.find((product) => product.id === selectedProductId);
    if (!source) return null;
    const patch = draftEdits.products[selectedProductId];
    return {
      ...source,
      ...patch,
      dimensions: {
        ...source.dimensions,
        ...(patch?.dimensions || {}),
      },
    } as Product;
  }, [draftEdits.products, products, selectedProductId]);

  const filteredProducts = useMemo(
    () =>
      productFilter === 'all'
        ? products
        : products.filter((product) => product.collection === productFilter),
    [productFilter, products],
  );

  const updateCollectionField = (field: keyof Collection, value: unknown) => {
    if (!selectedCollectionId) return;
    setDraftEdits((previous) => ({
      ...previous,
      collections: {
        ...previous.collections,
        [selectedCollectionId]: {
          ...previous.collections[selectedCollectionId],
          [field]: value,
        } as Partial<Collection>,
      },
    }));
  };

  const updateProductField = (field: keyof Product, value: unknown) => {
    if (!selectedProductId) return;
    setDraftEdits((previous) => ({
      ...previous,
      products: {
        ...previous.products,
        [selectedProductId]: {
          ...previous.products[selectedProductId],
          [field]: value,
        } as Partial<Product>,
      },
    }));
  };

  const updateProductDimension = (field: keyof Product['dimensions'], value: string) => {
    if (!selectedProductId) return;
    setDraftEdits((previous) => ({
      ...previous,
      products: {
        ...previous.products,
        [selectedProductId]: {
          ...previous.products[selectedProductId],
          dimensions: {
            width: previous.products[selectedProductId]?.dimensions?.width || selectedProduct?.dimensions.width || '',
            depth: previous.products[selectedProductId]?.dimensions?.depth || selectedProduct?.dimensions.depth || '',
            height: previous.products[selectedProductId]?.dimensions?.height || selectedProduct?.dimensions.height || '',
            ...(previous.products[selectedProductId]?.dimensions || {}),
            [field]: value,
          },
        },
      },
    }));
  };

  const handleSave = () => {
    if (!isEditMode) return;
    saveEdits(draftEdits);
    setSaveMessage(isVi ? 'Đã lưu dữ liệu trên máy chủ.' : 'Changes saved to the server.');
    window.setTimeout(() => setSaveMessage(''), 3500);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      isVi
        ? 'Xóa toàn bộ chỉnh sửa đã lưu trên máy chủ?'
        : 'Remove all saved edits from the server?',
    );
    if (!confirmed) return;
    resetEdits();
    setSaveMessage(isVi ? 'Đã khôi phục dữ liệu gốc.' : 'Original catalog data restored.');
    window.setTimeout(() => setSaveMessage(''), 3500);
  };

  const handleDeleteProduct = () => {
    if (!isEditMode || !selectedProduct) return;
    const confirmed = window.confirm(
      isVi
        ? `Xóa "${selectedProduct.name}" khỏi website? Bạn có thể khôi phục sản phẩm bên dưới.`
        : `Remove "${selectedProduct.name}" from the website? You can restore it below.`,
    );
    if (!confirmed) return;
    deleteProduct(selectedProduct.id);
    setSaveMessage(isVi ? 'Đã xóa sản phẩm.' : 'Product removed.');
  };

  if (!isAdminAuthenticated) {
    return (
      <div data-admin-ui className="min-h-[calc(100vh-184px)] bg-[#F8F6F2] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl overflow-hidden rounded-sm border border-[#DED9CD] bg-white shadow-lg">
          <div className="bg-[#1C1A17] px-6 py-8 text-white sm:px-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#9B522E]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D9B69F]">B+OPEN CMS</p>
            <h1 className="mt-2 font-serif text-3xl font-light">
              {isVi ? 'Khu vực quản trị' : 'Admin workspace'}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              {isVi
                ? 'Đăng nhập để bật chế độ chỉnh sửa, cập nhật nội dung collection và sản phẩm, sau đó lưu trên máy chủ.'
                : 'Sign in to edit collection and product content, then save the changes on the server.'}
            </p>
          </div>
          <div className="space-y-5 px-6 py-8 sm:px-10">
            <div className="flex gap-3 rounded-xs border border-[#EADFD4] bg-[#FAF7F2] p-4 text-sm text-[#6B5E52]">
              <Database className="mt-0.5 h-5 w-5 shrink-0 text-[#9B522E]" />
              <p>
                {isVi
                  ? 'Dữ liệu chỉnh sửa được lưu trên máy chủ và dùng chung cho mọi trình duyệt.'
                  : 'Edits are saved on the server and shared across browsers.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenLogin}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xs bg-[#9B522E] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#7F4024]"
            >
              <ShieldCheck className="h-4 w-4" />
              {isVi ? 'Đăng nhập quản trị' : 'Admin sign in'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="w-full py-2 text-xs font-semibold uppercase tracking-wider text-[#6B5E52] underline underline-offset-4 hover:text-[#1C1A17]"
            >
              {isVi ? 'Quay lại website' : 'Return to website'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-admin-ui className="min-h-[calc(100vh-184px)] bg-[#F8F6F2] pb-16">
      <section className="border-b border-[#DED9CD] bg-[#1C1A17] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#D9B69F]">
                <ShieldCheck className="h-4 w-4" />
                B+OPEN CMS
              </div>
              <h1 className="font-serif text-3xl font-light sm:text-4xl">
                {isVi ? 'Quản lý nội dung catalog' : 'Catalog content manager'}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
                {isVi
                  ? 'Chỉnh sửa collection và sản phẩm trong chế độ Edit. Bấm Lưu để áp dụng ngay trên toàn bộ website.'
                  : 'Switch to Edit mode to update collections and products. Save to apply changes across the website.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-xs border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                <Eye className="h-4 w-4" />
                {isVi ? 'Xem website' : 'View website'}
              </button>
              <button
                type="button"
                onClick={logout}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-xs border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:border-[#C28B75] hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                {isVi ? 'Đăng xuất' : 'Log out'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: isVi ? 'Collections' : 'Collections',
              value: collections.length,
              icon: Layers3,
            },
            {
              label: isVi ? 'Sản phẩm' : 'Products',
              value: products.length,
              icon: Package,
            },
            {
              label: isVi ? 'Đã chỉnh sửa' : 'Edited records',
              value: Object.keys(edits.collections).length + Object.keys(edits.products).length + (edits.addedProducts || []).length + Object.keys(edits.images || {}).length + (edits.deletedProductIds || []).length,
              icon: Pencil,
            },
            {
              label: isVi ? 'Trạng thái' : 'Status',
              value: isEditMode ? (isVi ? 'EDIT' : 'EDIT') : (isVi ? 'XEM' : 'VIEW'),
              icon: SlidersHorizontal,
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xs border border-[#DED9CD] bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7A6B]">{stat.label}</span>
                  <Icon className="h-4 w-4 text-[#9B522E]" />
                </div>
                <div className="mt-2 font-serif text-2xl text-[#1C1A17]">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 rounded-xs border border-[#DED9CD] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 rounded-full p-2 ${isEditMode ? 'bg-[#E9F5EB] text-[#287A3D]' : 'bg-[#F2EDE5] text-[#7A6B5F]'}`}>
              {isEditMode ? <Pencil className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </div>
            <div>
              <div className="text-sm font-bold text-[#1C1A17]">
                {isEditMode
                  ? (isVi ? 'Đang bật chế độ chỉnh sửa' : 'Edit mode is on')
                  : (isVi ? 'Chế độ xem hiện tại' : 'View mode is on')}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[#7A6B5F]">
                {isEditMode
                  ? (isVi ? 'Các ô dữ liệu đã được mở khóa. Bạn có thể chỉnh sửa và lưu.' : 'Fields are unlocked. You can edit and save catalog content.')
                  : (isVi ? 'Bật công tắc để mở khóa các trường dữ liệu.' : 'Turn on the switch to unlock the data fields.')}
              </p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isEditMode}
            onClick={() => setEditMode(!isEditMode)}
            className={`inline-flex min-h-[46px] items-center justify-center gap-3 rounded-xs px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
              isEditMode
                ? 'bg-[#287A3D] text-white hover:bg-[#1F6331]'
                : 'bg-[#1C1A17] text-white hover:bg-[#3A332D]'
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${isEditMode ? 'bg-white' : 'bg-[#C28B75]'}`} />
            {isEditMode ? (isVi ? 'Edit mode: ON' : 'Edit mode: ON') : (isVi ? 'Bật Edit mode' : 'Turn on edit mode')}
          </button>
        </div>

        <div className="flex flex-col gap-3 border-b border-[#DED9CD] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('collections')}
              className={`inline-flex min-h-[44px] items-center gap-2 border-b-2 px-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'collections' ? 'border-[#9B522E] text-[#9B522E]' : 'border-transparent text-[#7A6B5F] hover:text-[#1C1A17]'
              }`}
            >
              <Layers3 className="h-4 w-4" />
              {isVi ? 'Bộ sưu tập' : 'Collections'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`inline-flex min-h-[44px] items-center gap-2 border-b-2 px-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'products' ? 'border-[#9B522E] text-[#9B522E]' : 'border-transparent text-[#7A6B5F] hover:text-[#1C1A17]'
              }`}
            >
              <Package className="h-4 w-4" />
              {isVi ? 'Sản phẩm' : 'Products'}
            </button>
          </div>
          <div className="pb-3 text-[11px] text-[#8C7A6B] sm:pb-0">
            {isVi ? 'Các thay đổi chưa lưu chỉ nằm trong bản nháp.' : 'Unsaved changes remain in the draft.'}
          </div>
        </div>

        {activeTab === 'collections' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="rounded-xs border border-[#DED9CD] bg-white p-3 shadow-xs">
              <div className="mb-3 flex items-center justify-between px-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5E52]">
                  {isVi ? 'Chọn collection' : 'Select collection'}
                </span>
                <span className="text-[10px] font-mono text-[#9A8D80]">{collections.length}</span>
              </div>
              <div className="space-y-1">
                {collections.map((collection) => {
                  const active = collection.id === selectedCollectionId;
                  return (
                    <button
                      type="button"
                      key={collection.id}
                      onClick={() => setSelectedCollectionId(collection.id)}
                      className={`flex w-full items-center justify-between rounded-xs px-3 py-3 text-left transition-colors ${
                        active ? 'bg-[#1C1A17] text-white' : 'text-[#4F463F] hover:bg-[#F2EDE5]'
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">{collection.name}</span>
                        <span className={`mt-0.5 block text-[10px] uppercase tracking-wider ${active ? 'text-white/55' : 'text-[#9A8D80]'}`}>
                          {collection.id}
                        </span>
                      </span>
                      {active && <Check className="h-4 w-4 shrink-0 text-[#C28B75]" />}
                    </button>
                  );
                })}
              </div>
            </aside>

            {selectedCollection && (
              <section className="space-y-5 rounded-xs border border-[#DED9CD] bg-white p-5 shadow-xs sm:p-6">
                <div className="flex flex-col gap-3 border-b border-[#EAE3DA] pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9B522E]">
                      <Layers3 className="h-3.5 w-3.5" />
                      {isVi ? 'Collection record' : 'Collection record'}
                    </div>
                    <h2 className="mt-1 font-serif text-2xl text-[#1C1A17]">{selectedCollection.name}</h2>
                    <p className="mt-1 text-xs text-[#8C7A6B]">ID: {selectedCollection.id}</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-xs border border-[#EAE3DA] bg-[#FAF7F2] px-3 py-2 text-[11px] text-[#6B5E52]">
                    <ImageIcon className="h-4 w-4 text-[#9B522E]" />
                    {selectedCollection.itemCount} {isVi ? 'thiết kế' : 'pieces'}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <AdminField label="Name (EN)" value={selectedCollection.name} disabled={!isEditMode} onChange={(value) => updateCollectionField('name', value)} />
                  <AdminField label="Tên (VI)" value={selectedCollection.nameVi || ''} disabled={!isEditMode} onChange={(value) => updateCollectionField('nameVi', value)} />
                  <AdminField label="Tagline (EN)" value={selectedCollection.tagline} disabled={!isEditMode} onChange={(value) => updateCollectionField('tagline', value)} />
                  <AdminField label="Tagline (VI)" value={selectedCollection.taglineVi || ''} disabled={!isEditMode} onChange={(value) => updateCollectionField('taglineVi', value)} />
                  <AdminField label="Description (EN)" value={selectedCollection.description} disabled={!isEditMode} multiline rows={5} onChange={(value) => updateCollectionField('description', value)} />
                  <AdminField label="Mô tả (VI)" value={selectedCollection.descriptionVi || ''} disabled={!isEditMode} multiline rows={5} onChange={(value) => updateCollectionField('descriptionVi', value)} />
                  <AdminField label="Designer" value={selectedCollection.designer} disabled={!isEditMode} onChange={(value) => updateCollectionField('designer', value)} />
                  <AdminField label="Primary material" value={selectedCollection.primaryMaterial} disabled={!isEditMode} onChange={(value) => updateCollectionField('primaryMaterial', value)} />
                  <AdminField label="Hero image URL" value={selectedCollection.heroImage} disabled={!isEditMode} hint="Use a local /public path or an image URL." onChange={(value) => updateCollectionField('heroImage', value)} />
                  <AdminField label="Year introduced" value={selectedCollection.yearIntroduced || ''} disabled={!isEditMode} onChange={(value) => updateCollectionField('yearIntroduced', value)} />
                  <AdminField label="Highlights (one per line)" value={listToText(selectedCollection.highlightSpecs)} disabled={!isEditMode} multiline rows={5} onChange={(value) => updateCollectionField('highlightSpecs', textToList(value))} />
                  <AdminField label="Điểm nổi bật (VI)" value={listToText(selectedCollection.highlightSpecsVi)} disabled={!isEditMode} multiline rows={5} onChange={(value) => updateCollectionField('highlightSpecsVi', textToList(value))} />
                  <AdminField label="Story (EN)" value={selectedCollection.story || ''} disabled={!isEditMode} multiline rows={7} onChange={(value) => updateCollectionField('story', value)} />
                  <AdminField label="Câu chuyện (VI)" value={selectedCollection.storyVi || ''} disabled={!isEditMode} multiline rows={7} onChange={(value) => updateCollectionField('storyVi', value)} />
                </div>

                <div className="grid grid-cols-1 gap-4 border-t border-[#EAE3DA] pt-5 sm:grid-cols-[180px_1fr]">
                  <div className="overflow-hidden rounded-xs border border-[#DED9CD] bg-[#F2EDE5]">
                    <img src={selectedCollection.heroImage} alt="" className="aspect-[4/3] h-full w-full object-cover" />
                  </div>
                  <div className="flex items-center text-xs leading-relaxed text-[#7A6B5F]">
                    {isVi
                      ? 'Ảnh preview dùng đúng giá trị Hero image URL hiện tại. Lưu để cập nhật hình trên các trang sử dụng collection.'
                      : 'The preview uses the current Hero image URL. Save to update the image everywhere this collection appears.'}
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            {isEditMode && (
              <section className="rounded-xs border border-[#DED9CD] bg-white p-4 shadow-xs lg:col-span-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingProduct((previous) => !previous);
                    setCreateError('');
                  }}
                  aria-expanded={isAddingProduct}
                  className="inline-flex items-center gap-2 rounded-xs bg-[#9B522E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#7F4024]"
                >
                  <Plus className="h-4 w-4" />
                  {isVi ? 'Thêm sản phẩm mới' : 'Add new product'}
                </button>
                {isAddingProduct && (
                  <div className="mt-5 space-y-5 border-t border-[#EAE3DA] pt-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <AdminField label={isVi ? 'Tên sản phẩm (EN) *' : 'Product name (EN) *'} value={newProduct.name} disabled={false} onChange={(value) => setNewProductField('name', value)} />
                      <AdminField label={isVi ? 'Tên sản phẩm (VI)' : 'Product name (VI)'} value={newProduct.nameVi} disabled={false} onChange={(value) => setNewProductField('nameVi', value)} />
                      <AdminField label="SKU *" value={newProduct.sku} disabled={false} onChange={(value) => setNewProductField('sku', value)} />
                      <label>
                        <span className={labelClass}>{isVi ? 'Bộ sưu tập *' : 'Collection *'}</span>
                        <select className={inputClass} value={newProduct.collection} onChange={(event) => setNewProductField('collection', event.target.value)}>
                          <option value="">{isVi ? 'Chọn bộ sưu tập' : 'Choose collection'}</option>
                          {collections.map((collection) => <option key={collection.id} value={collection.id}>{collection.name}</option>)}
                        </select>
                      </label>
                      <label>
                        <span className={labelClass}>{isVi ? 'Danh mục' : 'Category'}</span>
                        <select className={inputClass} value={newProduct.category} onChange={(event) => setNewProductField('category', event.target.value as Product['category'])}>
                          {(['dining', 'deep-seating', 'chaises', 'tables', 'accessories'] as const).map((category) =>
                            <option key={category} value={category}>{category}</option>)}
                        </select>
                      </label>
                      <label>
                        <span className={labelClass}>{isVi ? 'Chất liệu' : 'Material'}</span>
                        <select className={inputClass} value={newProduct.material} onChange={(event) => setNewProductField('material', event.target.value as Product['material'])}>
                          {(['100% FSC Ipe', 'Ipe & Woven Viro', 'Ipe & Aluminum', 'Powder-coated aluminum & woven cord', 'Powder-coated steel & teak', 'Molded FRP composite', 'Powder-coated aluminum'] as const).map((material) =>
                            <option key={material} value={material}>{material}</option>)}
                        </select>
                      </label>
                      <AdminField label={isVi ? 'Mô tả (EN)' : 'Description (EN)'} value={newProduct.description} disabled={false} multiline onChange={(value) => setNewProductField('description', value)} />
                      <AdminField label={isVi ? 'Mô tả (VI)' : 'Description (VI)'} value={newProduct.descriptionVi} disabled={false} multiline onChange={(value) => setNewProductField('descriptionVi', value)} />
                      <AdminField label={isVi ? 'Đường dẫn hình phối cảnh' : 'Lifestyle image URL'} value={newProduct.lifestyleImageUrl} disabled={false} onChange={(value) => setNewProductField('lifestyleImageUrl', value)} />
                      <AdminField label={isVi ? 'Chiều rộng (mm)' : 'Width (mm)'} value={newProduct.width} disabled={false} onChange={(value) => setNewProductField('width', value)} />
                      <AdminField label={isVi ? 'Chiều sâu (mm)' : 'Depth (mm)'} value={newProduct.depth} disabled={false} onChange={(value) => setNewProductField('depth', value)} />
                      <AdminField label={isVi ? 'Chiều cao (mm)' : 'Height (mm)'} value={newProduct.height} disabled={false} onChange={(value) => setNewProductField('height', value)} />
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <label className="cursor-pointer rounded-xs border border-[#C7A58F] px-4 py-2.5 text-xs font-semibold text-[#5C3822] hover:bg-[#FAF7F2]">
                        {isVi ? 'Tải hình chính (dưới 3 MB)' : 'Upload main image (under 3 MB)'}
                        <input type="file" accept="image/*" className="hidden" onChange={handleNewImageFile} />
                      </label>
                      {newProduct.imageUrl && <img src={newProduct.imageUrl} alt="" className="h-24 w-32 rounded-xs border border-[#DED9CD] object-contain" />}
                    </div>
                    {createError && <p role="alert" className="text-sm text-red-700">{createError}</p>}
                    <div className="flex gap-2">
                      <button type="button" onClick={handleCreateProduct} className="rounded-xs bg-[#287A3D] px-5 py-2.5 text-xs font-bold uppercase text-white hover:bg-[#1F6331]">
                        {isVi ? 'Lưu sản phẩm mới' : 'Save new product'}
                      </button>
                      <button type="button" onClick={() => setIsAddingProduct(false)} className="rounded-xs border border-[#DED9CD] px-4 py-2.5 text-xs font-semibold">
                        {isVi ? 'Hủy' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                )}
              </section>
            )}
            <aside className="rounded-xs border border-[#DED9CD] bg-white p-3 shadow-xs">
              <label className="mb-4 block px-2">
                <span className={labelClass}>{isVi ? 'Lọc theo collection' : 'Filter by collection'}</span>
                <select value={productFilter} onChange={(event) => setProductFilter(event.target.value)} className={inputClass}>
                  <option value="all">{isVi ? 'Tất cả sản phẩm' : 'All products'}</option>
                  {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>{collection.name}</option>
                  ))}
                </select>
              </label>
              <div className="mb-3 flex items-center justify-between px-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5E52]">
                  {isVi ? 'Chọn sản phẩm' : 'Select product'}
                </span>
                <span className="text-[10px] font-mono text-[#9A8D80]">{filteredProducts.length}</span>
              </div>
              <div className="max-h-[620px] space-y-1 overflow-y-auto pr-1">
                {filteredProducts.map((product) => {
                  const active = product.id === selectedProductId;
                  return (
                    <button
                      type="button"
                      key={product.id}
                      onClick={() => setSelectedProductId(product.id)}
                      className={`flex w-full items-center justify-between rounded-xs px-3 py-3 text-left transition-colors ${
                        active ? 'bg-[#1C1A17] text-white' : 'text-[#4F463F] hover:bg-[#F2EDE5]'
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">{product.name}</span>
                        <span className={`mt-0.5 block truncate text-[10px] uppercase tracking-wider ${active ? 'text-white/55' : 'text-[#9A8D80]'}`}>
                          {product.sku}
                        </span>
                      </span>
                      {active && <Check className="h-4 w-4 shrink-0 text-[#C28B75]" />}
                    </button>
                  );
                })}
              </div>
            </aside>

            {selectedProduct && (
              <section className="space-y-5 rounded-xs border border-[#DED9CD] bg-white p-5 shadow-xs sm:p-6">
                <div className="flex flex-col gap-4 border-b border-[#EAE3DA] pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9B522E]">
                      <Package className="h-3.5 w-3.5" />
                      {selectedProduct.collection}
                    </div>
                    <h2 className="mt-1 font-serif text-2xl text-[#1C1A17]">{selectedProduct.name}</h2>
                    <p className="mt-1 text-xs text-[#8C7A6B]">ID: {selectedProduct.id}</p>
                  </div>
                  <div className="flex h-28 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xs border border-[#DED9CD] bg-[#F2EDE5]">
                    <img src={selectedProduct.imageUrl} alt="" className="h-full w-full object-contain" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <AdminField label="Name (EN)" value={selectedProduct.name} disabled={!isEditMode} onChange={(value) => updateProductField('name', value)} />
                  <AdminField label="Tên (VI)" value={selectedProduct.nameVi || ''} disabled={!isEditMode} onChange={(value) => updateProductField('nameVi', value)} />
                  <AdminField label="SKU" value={selectedProduct.sku} disabled={!isEditMode} onChange={(value) => updateProductField('sku', value)} />
                  <AdminField label="Collection ID" value={selectedProduct.collection} disabled={!isEditMode} onChange={(value) => updateProductField('collection', value)} />
                  <AdminField label="Material" value={selectedProduct.material} disabled={!isEditMode} onChange={(value) => updateProductField('material', value)} />
                  <AdminField label="Vật liệu (VI)" value={selectedProduct.materialVi || ''} disabled={!isEditMode} onChange={(value) => updateProductField('materialVi', value)} />
                  <AdminField label="Description (EN)" value={selectedProduct.description} disabled={!isEditMode} multiline rows={5} onChange={(value) => updateProductField('description', value)} />
                  <AdminField label="Mô tả (VI)" value={selectedProduct.descriptionVi || ''} disabled={!isEditMode} multiline rows={5} onChange={(value) => updateProductField('descriptionVi', value)} />
                  <AdminField label="Product image URL" value={selectedProduct.imageUrl} disabled={!isEditMode} hint="Use a local /public path or an image URL." onChange={(value) => updateProductField('imageUrl', value)} />
                  <AdminField label="Lifestyle image URL" value={selectedProduct.lifestyleImageUrl} disabled={!isEditMode} onChange={(value) => updateProductField('lifestyleImageUrl', value)} />
                  <AdminField label="Secondary images (one per line)" value={listToText(selectedProduct.secondaryImages)} disabled={!isEditMode} multiline rows={4} onChange={(value) => updateProductField('secondaryImages', textToList(value))} />
                  <AdminField label="Features (one per line)" value={listToText(selectedProduct.features)} disabled={!isEditMode} multiline rows={5} onChange={(value) => updateProductField('features', textToList(value))} />
                  <AdminField label="Tính năng (VI)" value={listToText(selectedProduct.featuresVi)} disabled={!isEditMode} multiline rows={5} onChange={(value) => updateProductField('featuresVi', textToList(value))} />
                  <AdminField label="Designer" value={selectedProduct.designer || ''} disabled={!isEditMode} onChange={(value) => updateProductField('designer', value)} />
                </div>

                <div className="border-t border-[#EAE3DA] pt-5">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B5E52]">
                    <SlidersHorizontal className="h-4 w-4 text-[#9B522E]" />
                    {isVi ? 'Kích thước (mm)' : 'Dimensions (mm)'}
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <AdminField label="Width" value={selectedProduct.dimensions.width} disabled={!isEditMode} onChange={(value) => updateProductDimension('width', value)} />
                    <AdminField label="Depth" value={selectedProduct.dimensions.depth} disabled={!isEditMode} onChange={(value) => updateProductDimension('depth', value)} />
                    <AdminField label="Height" value={selectedProduct.dimensions.height} disabled={!isEditMode} onChange={(value) => updateProductDimension('height', value)} />
                    <AdminField label="Seat height" value={selectedProduct.dimensions.seatHeight || ''} disabled={!isEditMode} onChange={(value) => updateProductDimension('seatHeight', value)} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-5 border-t border-[#EAE3DA] pt-5">
                  <label className={`inline-flex items-center gap-2 text-sm ${isEditMode ? 'cursor-pointer text-[#1C1A17]' : 'text-[#8C7A6B]'}`}>
                    <input
                      type="checkbox"
                      checked={selectedProduct.inStock}
                      disabled={!isEditMode}
                      onChange={(event) => updateProductField('inStock', event.target.checked)}
                      className="h-4 w-4 accent-[#9B522E]"
                    />
                    {isVi ? 'Đang có hàng' : 'In stock'}
                  </label>
                  <label className={`inline-flex items-center gap-2 text-sm ${isEditMode ? 'cursor-pointer text-[#1C1A17]' : 'text-[#8C7A6B]'}`}>
                    <input
                      type="checkbox"
                      checked={selectedProduct.cadAvailable}
                      disabled={!isEditMode}
                      onChange={(event) => updateProductField('cadAvailable', event.target.checked)}
                      className="h-4 w-4 accent-[#9B522E]"
                    />
                    CAD available
                  </label>
                </div>
                {isEditMode && (
                  <div className="border-t border-[#EAE3DA] pt-5">
                    <button
                      type="button"
                      onClick={handleDeleteProduct}
                      className="inline-flex items-center gap-2 rounded-xs border border-red-300 px-4 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      {isVi ? 'Xóa sản phẩm này' : 'Delete this product'}
                    </button>
                  </div>
                )}
              </section>
            )}
            {(edits.deletedProductIds || []).length > 0 && (
              <section className="rounded-xs border border-[#DED9CD] bg-white p-5 shadow-xs lg:col-span-2">
                <h3 className="mb-3 text-sm font-semibold text-[#1C1A17]">
                  {isVi ? 'Sản phẩm đã xóa — có thể khôi phục' : 'Deleted products — available to restore'}
                </h3>
                <div className="space-y-2">
                  {edits.deletedProductIds.map((id) => (
                    <div key={id} className="flex items-center justify-between gap-3 border-t border-[#EAE3DA] pt-2 text-sm">
                      <span className="truncate">{id}</span>
                      <button
                        type="button"
                        onClick={() => restoreProduct(id)}
                        className="inline-flex shrink-0 items-center gap-1 rounded-xs border border-[#DED9CD] px-3 py-2 text-xs font-semibold hover:border-[#9B522E]"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        {isVi ? 'Khôi phục' : 'Restore'}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-xs border border-[#D9C9BB] bg-[#FAF7F2]/95 p-3 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div className="flex items-center gap-2 text-xs text-[#6B5E52]">
            {saveMessage ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-[#287A3D]" />
                <span className="font-semibold text-[#287A3D]">{saveMessage}</span>
              </>
            ) : (
              <>
                <Database className="h-4 w-4 text-[#9B522E]" />
                <span>{isVi ? 'Nơi lưu: máy chủ dùng chung' : 'Storage: shared server'}</span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xs border border-[#DED9CD] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#6B5E52] transition-colors hover:border-[#9B522E] hover:text-[#9B522E]"
            >
              <RotateCcw className="h-4 w-4" />
              {isVi ? 'Khôi phục gốc' : 'Reset saved edits'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isEditMode}
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xs bg-[#9B522E] px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#7F4024] disabled:cursor-not-allowed disabled:bg-[#C8B7AA]"
            >
              <Save className="h-4 w-4" />
              {isVi ? 'Lưu dữ liệu' : 'Save changes'}
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] leading-relaxed text-[#9A8D80]">
          {isVi
            ? 'Dữ liệu chỉnh sửa và hình ảnh tải lên được lưu trên máy chủ, dùng chung cho mọi người truy cập.'
            : 'Catalog edits and uploaded images are saved on the server and shared with every visitor.'}
        </p>
      </div>
    </div>
  );
};
