import React, { useEffect, useState, useMemo } from 'react';
import { Product, PageId, FabricSwatch } from '../types';
import { FABRIC_SWATCHES } from '../data/furnitureData';
import { useLanguage } from '../context/LanguageContext';
import { formatDimensionsSummary, cleanMm } from '../utils/dimensionUtils';
import { InlineEditableText } from '../components/InlineEditableText';
import { InlineEditableImage } from '../components/InlineEditableImage';
import { useCatalogData } from '../context/CatalogDataContext';
import {
  ChevronRight,
  ChevronDown,
  Check,
  Bookmark,
  Printer,
  Shield,
  Ruler,
  Info,
  ExternalLink,
  MapPin,
  Briefcase,
  Layers,
  Sparkles,
  Download,
  ArrowRight,
  TreePine,
  RotateCw
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  savedProductIds: Set<string>;
  onToggleSave: (product: Product) => void;
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string; tab?: 'retailers' | 'design-showrooms' | 'contract-hospitality' }) => void;
  onSelectProduct: (productId: string) => void;
  onOpenTradeModal?: () => void;
  onOpenCatalogModal?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  savedProductIds,
  onToggleSave,
  onNavigate,
  onSelectProduct,
  onOpenTradeModal,
  onOpenCatalogModal,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const { products, collections } = useCatalogData();

  // Find the active product or fallback to the first product
  const product = useMemo(() => {
    return products.find((p) => p.id === productId) || products[0];
  }, [productId, products]);
  const isLumaProduct = product.collection.toLowerCase() === 'luma';

  // Find the associated collection
  const collection = useMemo(() => {
    return collections.find((c) => c.id === product.collection) || collections[0];
  }, [product.collection, collections]);

  // Companion pieces in the same collection
  const companionProducts = useMemo(() => {
    return products.filter((p) => p.collection === product.collection && p.id !== product.id);
  }, [product.collection, product.id, products]);

  // Finishes: Chocolate Ipe vs Weathered Silver
  const [selectedFinish, setSelectedFinish] = useState<'chocolate' | 'silver'>('chocolate');

  // Selected Fabric Swatch
  const [selectedFabric, setSelectedFabric] = useState<FabricSwatch>(FABRIC_SWATCHES[0]);
  const [showAllFabrics, setShowAllFabrics] = useState(false);

  // Active Main Image (switching through thumbnails)
  const allImages = useMemo(() => {
    const list = [product.imageUrl];
    if (product.lifestyleImageUrl && !list.includes(product.lifestyleImageUrl)) {
      list.push(product.lifestyleImageUrl);
    }
    if (product.secondaryImages) {
      product.secondaryImages.forEach((img) => {
        if (!list.includes(img)) list.push(img);
      });
    }
    // Use the supplied catalog imagery for LUMA instead of mixing in unrelated stock photos.
    const fillerImages = isLumaProduct
      ? ['/luma/scene-3.webp', '/luma/scene-18.webp', '/luma/scene-37.webp']
      : [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
        ];
    for (const fImg of fillerImages) {
      if (list.length < 4 && !list.includes(fImg)) list.push(fImg);
    }
    return list;
  }, [product]);

  const [activeImage, setActiveImage] = useState(allImages[0]);
  useEffect(() => {
    setActiveImage(allImages[0]);
  }, [allImages]);

  // Stack of lifestyle images below the main cutout (Screenshot 1)
  const lifestyleStack = useMemo(() => {
    if (product.lifestyleImagesList?.length) {
      return product.lifestyleImagesList.slice(0, 3);
    }
    if (isLumaProduct) {
      if (product.subCategory === 'bar') {
        return ['/luma/scene-37.webp', '/luma/scene-18.webp', '/luma/scene-41.webp'];
      }
      if (product.category === 'deep-seating') {
        return ['/luma/scene-6.webp', '/luma/scene-11.webp', '/luma/scene-3.webp'];
      }
      if (product.category === 'dining' || product.subCategory === 'tables') {
        return ['/luma/scene-18.webp', '/luma/scene-15.webp', '/luma/scene-41.webp'];
      }
      return ['/luma/scene-15.webp', '/luma/scene-3.webp', '/luma/scene-37.webp'];
    }
    return [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1600&q=80'
    ];
  }, [isLumaProduct, product.category, product.subCategory, product.lifestyleImagesList]);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    overview: true,
    dimensions: true,
    details: false,
    care: false,
    warranty: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // FAQ open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Extended fabric swatches to showcase comprehensive palette (Screenshot 1)
  const extendedFabrics = useMemo(() => {
    const extraSwatches: FabricSwatch[] = [
      { id: 'canvas-natural', name: 'Canvas Natural', nameVi: 'Vải Bạt Tự Nhiên', colorHex: '#E5DFD3', code: 'CUSTOM-CANVAS-NATURAL', texture: 'Outdoor performance weave', materialType: 'Outdoor performance fabric' },
      { id: 'cast-ash', name: 'Cast Ash', nameVi: 'Xám Tro Cast Ash', colorHex: '#C6C5C0', code: 'CUSTOM-CAST-ASH', texture: 'Outdoor performance weave', materialType: 'Outdoor performance fabric' },
      { id: 'canvas-heather', name: 'Charcoal Heather', nameVi: 'Xám Than Heather', colorHex: '#3D3F42', code: 'CUSTOM-CANVAS-HEATHER', texture: 'Outdoor performance weave', materialType: 'Outdoor performance fabric' },
      { id: 'cast-sand', name: 'Sandstone Dune', nameVi: 'Cát Sa Mạc Dune', colorHex: '#D8C7B0', code: 'CUSTOM-CAST-SAND', texture: 'Outdoor performance weave', materialType: 'Outdoor performance fabric' },
      { id: 'forest-olive', name: 'Forest Olive', nameVi: 'Xanh Rêu Ô Liu', colorHex: '#525B49', code: 'CUSTOM-FOREST-OLIVE', texture: 'Outdoor performance weave', materialType: 'Outdoor performance fabric' },
      { id: 'coastal-mist', name: 'Coastal Mist', nameVi: 'Sương Khói Ven Biển', colorHex: '#B4BCB9', code: 'CUSTOM-COASTAL-MIST', texture: 'Outdoor performance weave', materialType: 'Outdoor performance fabric' },
      { id: 'terra-rust', name: 'Sienna Rust', nameVi: 'Đỏ Đất Sienna', colorHex: '#8C4D3B', code: 'CUSTOM-TERRA-RUST', texture: 'Outdoor performance weave', materialType: 'Outdoor performance fabric' },
      { id: 'indigo-deep', name: 'Deep Indigo', nameVi: 'Xanh Chàm Đậm', colorHex: '#1E2838', code: 'CUSTOM-INDIGO-DEEP', texture: 'Outdoor performance weave', materialType: 'Outdoor performance fabric' },
      { id: 'espresso-brown', name: 'Bark Espresso', nameVi: 'Nâu Vỏ Cây Espresso', colorHex: '#423630', code: 'CUSTOM-ESPRESSO-BROWN', texture: 'Outdoor performance weave', materialType: 'Outdoor performance fabric' },
      { id: 'pearl-cream', name: 'Pearl Cream', nameVi: 'Trắng Sữa Ngọc Trai', colorHex: '#F2EDE4', code: 'CUSTOM-PEARL-CREAM', texture: 'Outdoor performance weave', materialType: 'Outdoor performance fabric' }
    ];
    return [...FABRIC_SWATCHES, ...extraSwatches];
  }, []);

  const displayedFabrics = showAllFabrics ? extendedFabrics : extendedFabrics.slice(0, 12);

  // Pricing calculations
  const baseFramePrice = 4420;
  const cushionPrice = 2850;
  const configuredTotal = baseFramePrice + cushionPrice;

  const isSaved = savedProductIds.has(product.id);
  const prodName = isVi && product.nameVi ? product.nameVi : product.name;
  const colName = isVi && collection.nameVi ? collection.nameVi : collection.name;
  const prodDescription = isVi && product.descriptionVi ? product.descriptionVi : product.description;
  const prodMaterial = isVi && product.materialVi ? product.materialVi : product.material;

  return (
    <div className="bg-[#FAF8F5] text-[#1C1A17] min-h-screen">
      {/* 1. BREADCRUMBS BAR */}
      <div className="border-b border-[#EAE3DA] bg-white/70 backdrop-blur-xs sticky top-[106px] sm:top-[118px] lg:top-[126px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-1.5 text-xs text-[#7A6B5F] overflow-x-auto whitespace-nowrap">
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-[#5C3822] transition-colors cursor-pointer"
              >
                {isVi ? 'Trang Chủ' : 'Home'}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#C4A482] shrink-0" />
              <button
                onClick={() => onNavigate('furniture')}
                className="hover:text-[#5C3822] transition-colors cursor-pointer"
              >
                {isVi ? 'Nội Thất' : 'Furnishings'}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#C4A482] shrink-0" />
              <button
                onClick={() => {
                  onNavigate('collection-detail', { collection: product.collection });
                }}
                className="hover:text-[#5C3822] transition-colors cursor-pointer font-medium text-[#5C3822]"
              >
                {colName}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#C4A482] shrink-0" />
              <span className="text-[#1C1A17] font-semibold truncate max-w-[200px] sm:max-w-xs">
                {prodName}
              </span>
            </nav>

            <button
              onClick={() => onNavigate('collection-detail', { collection: product.collection })}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5C3822] hover:text-[#2A1D15] transition-colors cursor-pointer"
            >
              &larr; {isVi ? 'Xem Toàn Bộ BST' : 'View Entire Collection'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY PRODUCT CONFIGURATOR & MEDIA SECTION (SCREENSHOT 1) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT SIDE: THUMBNAILS + MAIN CUTOUT + STACKED LIFESTYLE SHOTS */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top Cutout Isolated View + Vertical Thumbnails */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 items-start">
              
              {/* Vertical Thumbnails List */}
              <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[500px] pb-2 sm:pb-0 w-full sm:w-20 shrink-0">
                {allImages.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 aspect-[4/3] rounded-xs overflow-hidden border transition-all cursor-pointer shrink-0 ${
                      activeImage === img
                        ? 'border-[#5C3822] ring-2 ring-[#5C3822]/40 shadow-xs'
                        : 'border-[#EAE3DA] opacity-75 hover:opacity-100 hover:border-[#C4A482]'
                    }`}
                  >
                    <InlineEditableImage
                      record="product"
                      recordId={product.id}
                      field={idx === 0 ? 'imageUrl' : idx === 1 ? 'lifestyleImageUrl' : 'secondaryImages'}
                      arrayIndex={idx >= 2 ? idx - 2 : undefined}
                      arrayField={idx >= 2 ? 'secondaryImages' : undefined}
                      arrayValues={idx >= 2 ? product.secondaryImages : undefined}
                      value={img}
                      alt={`View ${idx + 1}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-contain bg-white"
                    />
                  </button>
                ))}
              </div>

              {/* Main Product Canvas */}
              <div className="relative flex-1 aspect-[4/3] bg-white border border-[#EAE3DA] rounded-xs overflow-hidden shadow-xs flex items-center justify-center p-4">
                {activeImage === product.imageUrl ? (
                  <InlineEditableImage
                    record="product"
                    recordId={product.id}
                    field="imageUrl"
                    value={activeImage}
                    alt={prodName}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-full object-contain max-h-[460px] transition-all duration-500"
                  />
                ) : (
                  <img
                    src={activeImage}
                    alt={prodName}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-full object-contain max-h-[460px] transition-all duration-500"
                  />
                )}

                {/* Craft / FSC Badge */}
                <div className="absolute top-4 left-4 bg-[#1C1A17]/85 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-xs flex items-center gap-1.5 shadow-sm">
                  <TreePine className="w-3 h-3 text-[#A8D5BA]" />
                  <span>{isLumaProduct ? 'LUMA / 2026' : '100% FSC® Certified Ipe'}</span>
                </div>

                {/* Finish Indicator on Image */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs border border-[#EAE3DA] px-2.5 py-1 text-[11px] font-mono text-[#2A1D15] rounded-xs shadow-xs">
                  {isVi ? 'Bề mặt: ' : 'Finish: '}
                  <span className="font-semibold text-[#5C3822]">
                    {isLumaProduct
                      ? (isVi ? 'Màu RAL tùy chỉnh' : 'Custom RAL color')
                      : selectedFinish === 'chocolate'
                        ? (isVi ? 'Hổ Phách Chocolate' : 'Chocolate Amber')
                        : (isVi ? 'Bạc Phong Hóa Silver' : 'Weathered Silver')}
                  </span>
                </div>
              </div>
            </div>

            {/* STACK OF 3 LARGE LIFESTYLE IMAGES (MATCHING SCREENSHOT 1) */}
            <div className="space-y-6 pt-4 border-t border-[#EAE3DA]/60">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#7A6B5F]">
                {isVi ? 'Không Gian Kiến Trúc Thực Tế' : 'Architectural Lifestyle Environments'}
              </h3>
              
              {lifestyleStack.map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/10] bg-[#F2EDE5] rounded-xs overflow-hidden border border-[#EAE3DA] shadow-xs group"
                >
                  <InlineEditableImage
                    record="product"
                    recordId={product.id}
                    field="lifestyleImagesList"
                    arrayIndex={i}
                    arrayValues={lifestyleStack}
                    value={imgUrl}
                    alt={`${prodName} in exterior setting ${i + 1}`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-xs bg-black/40 px-3 py-1.5 rounded-xs">
                      {isVi ? `Góc Cảnh Quan Ngoại Thất 0${i + 1}` : `Exterior Landscape Angle 0${i + 1}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: PRODUCT CONFIGURATION & ACCORDIONS (SCREENSHOT 1) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            {/* Collection Eyebrow & Product Title */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#8C5535] mb-1">
                <InlineEditableText record="product" recordId={product.id} field="designer" value={product.designer || collection.designer || (isVi ? 'B+OPEN HERITAGE GUILD' : 'JOHN CALDWELL')} as="span" label="Product designer" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-medium tracking-tight">
                <InlineEditableText
                  record="product"
                  recordId={product.id}
                  field={isVi ? 'nameVi' : 'name'}
                  value={prodName}
                  as="span"
                  label={isVi ? 'Tên sản phẩm tiếng Việt' : 'Product name'}
                />
              </h1>
              
              {/* MSRP Range */}
              <div className="mt-2 text-sm text-[#7A6B5F] font-mono">
                <span className="text-[#1C1A17] font-semibold text-base sm:text-lg">
                  {isLumaProduct
                    ? (isVi ? 'Liên hệ để nhận báo giá' : 'Contact for project pricing')
                    : '$4,545 – $8,010 MSRP'}
                </span>
              </div>
            </div>

            {/* COMPONENT 1: FRAME SPECIFICATION */}
            <div className="p-4 bg-white border border-[#EAE3DA] rounded-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1C1A17]">
                <span>{isLumaProduct ? (isVi ? 'KHUNG & KẾT CẤU' : 'FRAME & STRUCTURE') : (isVi ? 'KHUNG GỖ SOFA' : 'SOFA FRAME')}</span>
                <span className="font-mono text-sm text-[#5C3822]">
                  {isLumaProduct ? (isVi ? 'Liên hệ' : 'On request') : `$${baseFramePrice.toLocaleString()}.00`}
                </span>
              </div>

              {/* Colorway Finishes */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B5F] mb-2">
                  {isVi ? 'Bề Mặt Hoàn Thiện (Colorway):' : 'Colorway:'}
                </label>
                <div className="flex items-center gap-3">
                  {/* Primary finish option */}
                  <button
                    onClick={() => setSelectedFinish('chocolate')}
                    className={`flex items-center gap-2.5 p-2 rounded-xs border transition-all cursor-pointer ${
                      selectedFinish === 'chocolate'
                        ? 'border-[#5C3822] bg-[#FAF7F2] ring-1 ring-[#5C3822]'
                        : 'border-[#EAE3DA] hover:border-[#C4A482]'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full border border-black/20 shadow-inner shrink-0 ${isLumaProduct ? 'bg-[#E5D1B8]' : 'bg-[#5C3822]'}`} />
                    <span className="text-xs font-medium text-[#1C1A17]">
                      {isLumaProduct ? (isVi ? 'Màu RAL tùy chỉnh' : 'Custom RAL color') : 'Chocolate Amber'}
                    </span>
                  </button>

                  {/* Secondary finish option */}
                  <button
                    onClick={() => setSelectedFinish('silver')}
                    className={`flex items-center gap-2.5 p-2 rounded-xs border transition-all cursor-pointer ${
                      selectedFinish === 'silver'
                        ? 'border-[#5C3822] bg-[#FAF7F2] ring-1 ring-[#5C3822]'
                        : 'border-[#EAE3DA] hover:border-[#C4A482]'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full border border-black/20 shadow-inner shrink-0 ${isLumaProduct ? 'bg-[#6F726D]' : 'bg-[#A8A9AD]'}`} />
                    <span className="text-xs font-medium text-[#1C1A17]">
                      {isLumaProduct ? (isVi ? 'Mẫu hoàn thiện catalog' : 'Catalog finish sample') : 'Weathered Silver'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* COMPONENT 2: CUSHION SET & FABRICS (SCREENSHOT 1) */}
            <div className="p-4 bg-white border border-[#EAE3DA] rounded-xs space-y-3.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1C1A17]">
                <span>{isLumaProduct ? (isVi ? 'VẬT LIỆU & HOÀN THIỆN' : 'MATERIALS & FINISH') : (isVi ? 'BỘ ĐỆM CAO CẤP' : 'SOFA CUSHION SET')}</span>
                <span className="font-mono text-sm text-[#5C3822]">
                  {isLumaProduct ? (isVi ? 'Theo dự án' : 'Project specific') : '$1,925.00 – $3,460.00'}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6B5F]">
                    {isVi ? 'Chất Liệu Vải: ' : 'Fabric: '}
                    <strong className="text-[#1C1A17] font-semibold">{selectedFabric.name}</strong>
                  </span>
                  <span className="text-[10px] font-mono text-[#8C5535]">
                    {isLumaProduct ? 'Catalog reference' : 'Sunbrella® Value I'}
                  </span>
                </div>

                {/* Circular Colorway Swatches Grid */}
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2.5 pt-1">
                  {displayedFabrics.map((fabric) => (
                    <button
                      key={fabric.id}
                      onClick={() => setSelectedFabric(fabric)}
                      className={`group relative w-8 h-8 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                        selectedFabric.id === fabric.id
                          ? 'ring-2 ring-offset-2 ring-[#5C3822] scale-110'
                          : 'hover:scale-105 opacity-85 hover:opacity-100'
                      }`}
                      title={fabric.name}
                    >
                      <span
                        className="w-full h-full rounded-full border border-black/15 shadow-inner"
                        style={{ backgroundColor: fabric.colorHex }}
                      />
                      {selectedFabric.id === fabric.id && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow-md absolute" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Toggle Show More Swatches */}
                <div className="mt-3 text-center">
                  <button
                    onClick={() => setShowAllFabrics(!showAllFabrics)}
                    className="text-xs font-semibold text-[#5C3822] hover:text-[#2A1D15] underline cursor-pointer"
                  >
                    {showAllFabrics
                      ? (isVi ? 'Thu gọn -' : 'Show Less -')
                      : (isVi ? 'Xem Thêm Màu Vải +' : 'Show More +')}
                  </button>
                </div>
              </div>
            </div>

            {/* AS CONFIGURED PRICE SUMMARY */}
            <div className="flex items-center justify-between p-3.5 bg-[#F2EDE5] border border-[#E3D8CC] rounded-xs">
              <div className="flex items-center gap-1.5 text-xs text-[#5C3822]">
                <span className="font-semibold">{isVi ? 'Giá Cấu Hình:' : 'As Configured:'}</span>
                <span className="font-mono text-base font-bold text-[#1C1A17]">
                  {isLumaProduct
                    ? (isVi ? 'Liên hệ báo giá' : 'Quote on request')
                    : `$${configuredTotal.toLocaleString()}.00 MSRP`}
                </span>
              </div>
              <div className="text-[11px] text-[#7A6B5F] flex items-center gap-1" title="Manufacturer Suggested Retail Price">
                <Info className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* PRIMARY CALL TO ACTION BUTTONS */}
            <div className="space-y-2.5">
              {/* Terracotta Primary CTA: Find a Retailer */}
              <button
                onClick={() => onNavigate('showrooms')}
                className="w-full py-3.5 bg-[#C28B75] hover:bg-[#A86D51] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>{isVi ? 'Tìm Đại Lý Gần Nhất' : 'FIND A RETAILER'}</span>
              </button>

              {/* Secondary CTA: Apply for Trade Account */}
              <button
                onClick={() => {
                  if (onOpenTradeModal) onOpenTradeModal();
                  else onNavigate('trade');
                }}
                className="w-full py-3.5 bg-[#1C1A17] hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>{isVi ? 'Đăng Ký Tài Khoản Dự Án (Trade)' : 'APPLY FOR A TRADE ACCOUNT'}</span>
              </button>

              {/* Save to Project Spec Sheet */}
              <button
                onClick={() => onToggleSave(product)}
                className={`w-full py-2.5 border rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  isSaved
                    ? 'border-[#5C3822] bg-[#5C3822]/10 text-[#5C3822]'
                    : 'border-[#EAE3DA] bg-white text-[#4A3B32] hover:bg-[#FAF7F2]'
                }`}
              >
                {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>{isSaved ? (isVi ? 'Đã Lưu Vào Hồ Sơ Thiết Kế' : 'Saved in Project Spec Sheet') : (isVi ? 'Lưu Vào Hồ Sơ Thiết Kế' : 'Save to Spec Sheet')}</span>
              </button>
            </div>

            {/* ACCORDIONS LIST (SCREENSHOT 1) */}
            <div className="border-t border-[#EAE3DA] divide-y divide-[#EAE3DA]">
              
              {/* Overview Accordion */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('overview')}
                  className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#1C1A17] hover:text-[#5C3822] transition-colors cursor-pointer"
                >
                  <span>{isVi ? 'Tổng Quan Sản Phẩm' : 'Overview'}</span>
                  {openAccordions.overview ? <ChevronDown className="w-4 h-4 text-[#5C3822]" /> : <ChevronRight className="w-4 h-4 text-[#7A6B5F]" />}
                </button>
                {openAccordions.overview && (
                  <div className="mt-3 text-xs text-[#5C4D42] leading-relaxed space-y-2">
                    <InlineEditableText
                      record="product"
                      recordId={product.id}
                      field={isVi ? 'descriptionVi' : 'description'}
                      value={prodDescription}
                      as="p"
                      multiline
                      label={isVi ? 'Mô tả sản phẩm tiếng Việt' : 'Product description'}
                    />
                    <ul className="list-disc pl-4 space-y-1 pt-1 text-[#4A3B32]">
                      {(isVi && product.featuresVi ? product.featuresVi : product.features).map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Dimensions Accordion (Clean and simple, mm only, no weight) */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('dimensions')}
                  className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#1C1A17] hover:text-[#5C3822] transition-colors cursor-pointer"
                >
                  <span>{isVi ? 'Kích Thước (mm)' : 'Dimensions (mm)'}</span>
                  {openAccordions.dimensions ? <ChevronDown className="w-4 h-4 text-[#5C3822]" /> : <ChevronRight className="w-4 h-4 text-[#7A6B5F]" />}
                </button>
                {openAccordions.dimensions && (
                  <div className="mt-3 p-3 bg-[#F4EFEA] rounded-xs font-mono text-xs text-[#1C1A17] space-y-1.5">
                    <div className="font-semibold text-sm tracking-tight text-[#1C1A17]">
                      {formatDimensionsSummary(product.dimensions)}
                    </div>
                    {product.dimensions.seatHeight && (
                      <div className="text-[11px] text-[#7A6B5F]">
                        {isVi ? 'Chiều cao ngồi: ' : 'Seat Height: '} {cleanMm(product.dimensions.seatHeight)}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Additional Details */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#1C1A17] hover:text-[#5C3822] transition-colors cursor-pointer"
                >
                  <span>{isVi ? 'Thông Số Chi Tiết' : 'Additional Details'}</span>
                  {openAccordions.details ? <ChevronDown className="w-4 h-4 text-[#5C3822]" /> : <ChevronRight className="w-4 h-4 text-[#7A6B5F]" />}
                </button>
                {openAccordions.details && (
                  <div className="mt-3 text-xs text-[#5C4D42] space-y-2">
                    <div className="flex justify-between py-1 border-b border-[#EAE3DA]/60">
                      <span className="text-[#7A6B5F]">{isVi ? 'Vật liệu khung:' : 'Frame Material:'}</span>
                      <span className="font-medium text-[#1C1A17]">{prodMaterial}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#EAE3DA]/60">
                      <span className="text-[#7A6B5F]">{isVi ? 'Mã SKU:' : 'SKU:'}</span>
                      <InlineEditableText record="product" recordId={product.id} field="sku" value={product.sku} as="span" className="font-mono text-[#1C1A17]" label="SKU" />
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#EAE3DA]/60">
                      <span className="text-[#7A6B5F]">{isVi ? 'Chứng nhận:' : 'Certification:'}</span>
                      <span className="font-medium text-[#2E6F40]">FSC® C109654 (100% Chain-of-Custody)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#7A6B5F]">{isVi ? 'Hồ sơ 2D/3D CAD:' : 'CAD Models:'}</span>
                      <span className="text-[#5C3822] font-semibold">{product.cadAvailable ? (isVi ? 'Khả dụng (.DWG, .OBJ)' : 'Available (.DWG, .OBJ)') : 'Upon Request'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Care & Maintenance */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#1C1A17] hover:text-[#5C3822] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>{isVi ? 'Hướng Dẫn Bảo Quản' : 'Care'}</span>
                    <ExternalLink className="w-3 h-3 text-[#8C5535]" />
                  </span>
                  {openAccordions.care ? <ChevronDown className="w-4 h-4 text-[#5C3822]" /> : <ChevronRight className="w-4 h-4 text-[#7A6B5F]" />}
                </button>
                {openAccordions.care && (
                  <div className="mt-3 text-xs text-[#5C4D42] space-y-2">
                    <p>
                      {isVi
                        ? 'Gỗ Ipe có mật độ sợi tự nhiên cực cao, có thể để ngoài trời quanh năm mà không cần sơn phủ. Thoa dầu Ipe Aftercare hàng năm để duy trì sắc hổ phách sô-cô-la, hoặc để chuyển sang ánh bạc tự nhiên.'
                        : 'Ipe timber has natural high density, thriving outdoors year-round. Apply Penofin Ipe Oil annually to retain the warm chocolate luster, or allow it to naturally transition into a dignified platinum silver.'}
                    </p>
                    <button
                      onClick={() => onNavigate('care')}
                      className="text-xs font-semibold text-[#5C3822] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {isVi ? 'Xem Cẩm Nang Bảo Quản Đầy Đủ &rarr;' : 'Read Comprehensive Care Guide &rarr;'}
                    </button>
                  </div>
                )}
              </div>

              {/* 5-Year Guarantee Warranty */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('warranty')}
                  className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#1C1A17] hover:text-[#5C3822] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>{isVi ? 'Chính Sách Bảo Hành 5 Năm' : 'Warranty'}</span>
                    <Shield className="w-3 h-3 text-[#5C3822]" />
                  </span>
                  {openAccordions.warranty ? <ChevronDown className="w-4 h-4 text-[#5C3822]" /> : <ChevronRight className="w-4 h-4 text-[#7A6B5F]" />}
                </button>
                {openAccordions.warranty && (
                  <div className="mt-3 text-xs text-[#5C4D42] space-y-2">
                    <p>
                      {isVi
                        ? 'Tất cả sản phẩm B+Open được bảo hành 5 năm đối với kết cấu gỗ và mối ghép mộng, cùng bảo hành 5 năm từ Sunbrella® chống phai màu sợi vải dưới nắng gắt.'
                        : 'All B+Open furniture is protected by our signature 5-Year Structural Frame Warranty against decay and joinery failure, paired with Sunbrella® 5-Year fabric fade protection.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Download Tear Sheet */}
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C1A17]">
                  {isVi ? 'Bản Vẽ Kỹ Thuật (Tear Sheet)' : 'Tear Sheet'}
                </span>
                <button
                  onClick={() => window.print()}
                  className="text-xs font-semibold text-[#5C3822] hover:text-[#2A1D15] flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs cursor-pointer hover:bg-[#F2EDE5] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Tải PDF / In' : 'Print / Download'}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 3. THE COLLECTION — VIEW ALL (SCREENSHOT 1 BOTTOM) */}
      {companionProducts.length > 0 && (
        <div className="border-t border-[#EAE3DA] bg-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl text-[#1C1A17] font-medium">
                {isVi ? `Bộ Sưu Tập ${colName} — Tất Cả Các Món` : `The Collection — View all`}
              </h2>
              <button
                onClick={() => onNavigate('collection-detail', { collection: product.collection })}
                className="text-xs font-bold uppercase tracking-widest text-[#5C3822] hover:text-[#2A1D15] transition-colors cursor-pointer"
              >
                {isVi ? 'Xem Chi Tiết BST &rarr;' : 'View Collection &rarr;'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {companionProducts.slice(0, 5).map((comp) => {
                const cName = isVi && comp.nameVi ? comp.nameVi : comp.name;
                return (
                  <div
                    key={comp.id}
                    onClick={() => {
                      onSelectProduct(comp.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group bg-[#FAF8F5] border border-[#EAE3DA] rounded-xs p-3 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer hover:border-[#C4A482]"
                  >
                    <div className="aspect-[4/3] bg-white rounded-xs overflow-hidden mb-3 flex items-center justify-center p-2">
                      <InlineEditableImage
                        record="product"
                        recordId={comp.id}
                        field="imageUrl"
                        value={comp.imageUrl}
                        alt={cName}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80';
                        }}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[#8C5535] uppercase">{comp.sku}</div>
                      <h4 className="font-serif text-xs font-semibold text-[#1C1A17] group-hover:text-[#5C3822] transition-colors line-clamp-2 mt-0.5">
                        {cName}
                      </h4>
                      <div className="mt-1 text-[11px] font-mono text-[#7A6B5F]">
                        $2,100 – $4,400 MSRP
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. OUR DIFFERENCE (SCREENSHOT 2 & 3: 8-CARD CHECKERBOARD BENTO GRID) */}
      <div className="border-t border-[#EAE3DA] bg-[#FAF8F5] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-medium tracking-tight uppercase">
              {isVi ? 'Sự Khác Biệt Của Chúng Tôi' : 'OUR DIFFERENCE'}
            </h2>
            <div className="w-16 h-0.5 bg-[#5C3822] mx-auto mt-4" />
          </div>

          {/* Alternating Checkerboard 2-Column Grid */}
          <div className="divide-y divide-[#EAE3DA] border-y border-[#EAE3DA]">
            
            {/* Block 1: Guarantee (Image Left, Text Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="aspect-[16/10] bg-[#F3EFE9] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1200&q=80"
                  alt="5-Year Guarantee"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C5535]">
                  {isVi ? 'BẢO HÀNH CHÍNH HÃNG' : 'PROTECTED WITH A'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] font-medium">
                  {isVi ? 'BẢO HÀNH 5 NĂM' : '5-YEAR GUARANTEE'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
                  {isVi
                    ? 'Chúng tôi cam kết chất lượng tuyệt đối cho từng sản phẩm với chế độ bảo hành 5 năm của nhà sản xuất đối với kết cấu gỗ và mộng ghép.'
                    : 'We stand behind all of our furniture with a five year manufacturer’s warranty.'}
                </p>
                <button
                  onClick={() => onNavigate('care')}
                  className="text-xs font-bold uppercase tracking-wider text-[#5C3822] hover:text-[#1C1A17] underline text-left pt-2 cursor-pointer"
                >
                  {isVi ? 'Xem Chi Tiết Bảo Hành' : 'See Warranty'}
                </button>
              </div>
            </div>

            {/* Block 2: Comfort (Text Left, Image Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-3 order-2 md:order-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C5535]">
                  {isVi ? 'TRẢI NGHIỆM ĐẲNG CẤP' : 'THE BEST IN'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] font-medium">
                  {isVi ? 'SỰ THƯ THÁI TỐI ĐA' : 'COMFORT'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
                  {isVi
                    ? 'Chúng tôi mang lại những chiếc đệm êm ái và bền bỉ bọc bằng vải Sunbrella® cao cấp, được thiết kế riêng cho những ai tìm kiếm sự nâng đỡ công thái học tuyệt đối.'
                    : 'We offer plush and durable cushions covered in your choice of Sunbrella® outdoor fabrics for those looking for enhanced deep seating comfort.'}
                </p>
              </div>
              <div className="aspect-[16/10] bg-[#F3EFE9] overflow-hidden order-1 md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="The Best in Comfort"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Block 3: Construction (Image Left, Text Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="aspect-[16/10] bg-[#F3EFE9] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
                  alt="Timeless Joinery"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C5535]">
                  {isVi ? 'KỸ NGHỆ TRUYỀN THỐNG' : 'TIMELESS TECHNIQUES'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] font-medium">
                  {isVi ? 'KẾT CẤU MỘNG VỮNG CHÃI' : 'CONSTRUCTION'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
                  {isVi
                    ? 'Các kỹ thuật ghép mộng mộc tinh hoa được truyền thụ qua nhiều thế kỷ giúp khung ghế liên kết bền chặt vĩnh cửu theo năm tháng mà không phụ thuộc vào keo dán hay ốc vít thông thường.'
                    : 'You can count on one hand the joinery techniques we use in our furniture. Developed by masters from centuries past, our construction is built to last.'}
                </p>
              </div>
            </div>

            {/* Block 4: Design (Text Left, Image Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-3 order-2 md:order-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C5535]">
                  {isVi ? 'SÁNG TẠO ĐỘT PHÁ' : 'INNOVATIVE'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] font-medium">
                  {isVi ? 'THIẾT KẾ ĐOẠT GIẢI' : 'DESIGN'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
                  {isVi
                    ? 'Các nhà thiết kế quốc tế tài ba của chúng tôi kiến tạo nên những tác phẩm phù hợp với phong cách sống tinh hoa của bạn, đa dạng từ cổ điển trang nhã đến tối giản hiện đại.'
                    : 'Our award-winning designers craft furniture to fit your life. Our breadth of elegant looks ensure that no matter your taste, we have a style for you.'}
                </p>
              </div>
              <div className="aspect-[16/10] bg-[#F3EFE9] overflow-hidden order-1 md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
                  alt="Award Winning Design"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Block 5: Durability (Image Left, Text Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="aspect-[16/10] bg-[#F3EFE9] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80"
                  alt="Heirloom Quality"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C5535]">
                  {isVi ? 'PHẨM CHẤT GIA BẢO' : 'HEIRLOOM QUALITY'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] font-medium">
                  {isVi ? 'ĐỘ BỀN THẬP KỶ' : 'DURABILITY'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
                  {isVi
                    ? 'Được tạo dựng để trường tồn, chúng tôi chỉ sử dụng những vật liệu tự nhiên tốt nhất để bạn có thể an tâm tận hưởng và trao truyền lại cho các thế hệ tương lai.'
                    : 'Designed to last, we use only the best materials so you can enjoy your furniture, then pass it on.'}
                </p>
              </div>
            </div>

            {/* Block 6: Easy Care (Text Left, Image Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-3 order-2 md:order-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C5535]">
                  {isVi ? 'AN TÂM TUYỆT ĐỐI' : 'NEVER WORRY'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] font-medium">
                  {isVi ? 'BẢO QUẢN DỄ DÀNG' : 'EASY CARE'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
                  {isVi
                    ? 'Tận hưởng từng giây phút nghỉ ngơi bởi mọi sản phẩm gỗ Ipe đều được nghiên cứu để bảo dưỡng đơn giản thông qua quy trình từng bước rõ ràng.'
                    : 'Relax confidently knowing that all B+Open Outdoor products are designed to be a snap to maintain with step-by-step instructions in our easy care guide.'}
                </p>
                <button
                  onClick={() => onNavigate('care')}
                  className="text-xs font-bold uppercase tracking-wider text-[#5C3822] hover:text-[#1C1A17] underline text-left pt-2 cursor-pointer"
                >
                  {isVi ? 'Hướng Dẫn Bảo Dưỡng' : 'Care Instructions'}
                </button>
              </div>
              <div className="aspect-[16/10] bg-[#F3EFE9] overflow-hidden order-1 md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80"
                  alt="Easy Care Kit"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Block 7: Sustainable Ipe Wood (Image Left, Text Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="aspect-[16/10] bg-[#F3EFE9] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80"
                  alt="Sustainable Ipe Wood"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C5535]">
                  {isVi ? 'BỀN VỮNG MÔI TRƯỜNG' : 'SUSTAINABLE'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] font-medium">
                  {isVi ? 'GỖ IPE BOLIVIA' : 'IPE WOOD'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
                  {isVi
                    ? 'Với sắc nâu sô-cô-la sang trọng, gỗ Ipe khai thác bền vững là loại gỗ đặc cứng nhất hành tinh hiện nay, lý tưởng trọn đời cho môi trường ngoài trời.'
                    : 'A striking deep-chocolate brown color, sustainably-sourced Ipe is the densest wood on the market today, ideal for years of outdoor use.'}
                </p>
                <button
                  onClick={() => onNavigate('materials')}
                  className="text-xs font-bold uppercase tracking-wider text-[#5C3822] hover:text-[#1C1A17] underline text-left pt-2 cursor-pointer"
                >
                  {isVi ? 'Khám Phá Gỗ Ipe' : 'Discover IPE'}
                </button>
              </div>
            </div>

            {/* Block 8: Solara Fiber (Text Left, Image Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-3 order-2 md:order-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C5535]">
                  {isVi ? 'NGHỆ THUẬT ĐAN' : 'WOVEN'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] font-medium">
                  {isVi ? 'SỢI ĐAN SOLARA FIBER' : 'SOLARA FIBER'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
                  {isVi
                    ? 'Sợi đan Solara thân thiện với thiên nhiên được tinh chế đặc biệt để chịu đựng tia UV, giữ màu sắc sống động và mang lại chất cảm xúc giác ấm cúng.'
                    : 'Nature-safe woven Solara Fiber is perfectly suited to outdoor use through superior resilience, indelible color fastness, and stylistic allure.'}
                </p>
              </div>
              <div className="aspect-[16/10] bg-[#F3EFE9] overflow-hidden order-1 md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80"
                  alt="Solara Fiber"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 5. WHERE TO BUY HERO BANNER (SCREENSHOT 3) */}
      <div className="relative py-24 sm:py-32 bg-[#2A1D15] overflow-hidden text-white">
        <div className="absolute inset-0 z-0 opacity-45">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
            alt="Where to Buy Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight uppercase">
            {isVi ? 'ĐỊA ĐIỂM MUA HÀNG' : 'WHERE TO BUY'}
          </h2>
          <p className="text-sm sm:text-base text-white/90 font-light max-w-md mx-auto">
            {isVi ? 'Trải nghiệm trực tiếp tại showroom hoặc đặt lịch hẹn trực tuyến cùng chuyên gia.' : 'Shop in-store or by virtual appointment.'}
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/90 hover:bg-white hover:text-[#1C1A17] text-white text-xs font-bold uppercase tracking-widest transition-all rounded-xs cursor-pointer shadow-lg"
            >
              <MapPin className="w-4 h-4" />
              <span>{isVi ? 'Tìm Đại Lý (Retailers)' : 'FIND A RETAILER'}</span>
            </button>
            <button
              onClick={() => onNavigate('showrooms', { tab: 'design-showrooms' })}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#1C1A17] hover:bg-[#F0EAE1] text-xs font-bold uppercase tracking-widest transition-all rounded-xs cursor-pointer shadow-lg"
            >
              <span>{isVi ? 'Design Showrooms' : 'DESIGN SHOWROOMS'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6. FREQUENTLY ASKED QUESTIONS (SCREENSHOT 3 BOTTOM) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] font-medium tracking-tight uppercase">
            {isVi ? 'CÂU HỎI THƯỜNG GẶP' : 'FREQUENTLY ASKED QUESTIONS'}
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6B5F] max-w-xl mx-auto leading-relaxed">
            {isVi
              ? 'Để tìm hiểu thêm thông tin về gỗ Ipe, B+Open Outdoor, đồ nội thất và nhiều hơn nữa, hãy xem câu trả lời bên dưới hoặc liên hệ đội ngũ chuyên viên của chúng tôi.'
              : 'For more information about Ipe wood, B+Open Outdoor, our furniture and more, visit our FAQ section. To contact the appropriate member of our team, visit our contact page.'}
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="divide-y divide-[#EAE3DA] border-y border-[#EAE3DA]">
          
          {/* Question 1 */}
          <div className="py-4">
            <button
              onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
              className="w-full flex items-center justify-between text-left text-sm sm:text-base font-medium text-[#1C1A17] hover:text-[#5C3822] transition-colors cursor-pointer"
            >
              <span>{isVi ? 'Việc mua sản phẩm này đóng góp trực tiếp như thế nào vào việc bảo vệ rừng?' : 'How does my purchase directly protect the forest?'}</span>
              <ChevronRight className={`w-4 h-4 text-[#8C5535] transition-transform ${openFaq === 0 ? 'rotate-90' : ''}`} />
            </button>
            {openFaq === 0 && (
              <div className="mt-3 text-xs sm:text-sm text-[#5C4D42] leading-relaxed pl-2 border-l-2 border-[#5C3822]">
                {isVi
                  ? '100% gỗ Ipe của B+Open được khai thác theo chứng chỉ FSC® khắt khe từ khu bảo tồn sinh thái Bolivia. Chỉ những cây trưởng thành trên chu kỳ 30 năm mới được tuyển chọn, đảm bảo tán rừng nguyên sinh tiếp tục tái sinh tự nhiên và ngăn chặn việc phá rừng làm nông nghiệp.'
                  : '100% of B+Open Ipe is sourced from FSC®-certified lowland forests in Bolivia. Managed on a 30-year selective rotation, only mature canopy trees are harvested, providing local communities with a sustainable economy that legally safeguards over 2 million acres of tropical rainforest from clear-cutting.'}
              </div>
            )}
          </div>

          {/* Question 2 */}
          <div className="py-4">
            <button
              onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
              className="w-full flex items-center justify-between text-left text-sm sm:text-base font-medium text-[#1C1A17] hover:text-[#5C3822] transition-colors cursor-pointer"
            >
              <span>{isVi ? 'Tôi có thể để gỗ Ipe tự chuyển sang màu xám bạc tự nhiên được không?' : 'Can I let my Ipe Wood furniture go gray?'}</span>
              <ChevronRight className={`w-4 h-4 text-[#8C5535] transition-transform ${openFaq === 1 ? 'rotate-90' : ''}`} />
            </button>
            {openFaq === 1 && (
              <div className="mt-3 text-xs sm:text-sm text-[#5C4D42] leading-relaxed pl-2 border-l-2 border-[#5C3822]">
                {isVi
                  ? 'Hoàn toàn được! Gỗ Ipe chứa hàm lượng dầu và mật độ đặc tự nhiên đến mức việc bạc màu chỉ diễn ra trên lớp vi mô bề mặt mà không làm ảnh hưởng đến độ bền kết cấu. Sau 6-12 tháng ngoài nắng mưa, sản phẩm sẽ khoác lên sắc bạc ánh kim platinum sang trọng như các dinh thự cổ điển.'
                  : 'Yes, absolutely! Letting your furniture naturally patina into a lustrous silver-gray is an intentional design aesthetic favored by landscape architects. This surface oxidation does not degrade the wood’s legendary strength or rot resistance.'}
              </div>
            )}
          </div>

          {/* Question 3 */}
          <div className="py-4">
            <button
              onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
              className="w-full flex items-center justify-between text-left text-sm sm:text-base font-medium text-[#1C1A17] hover:text-[#5C3822] transition-colors cursor-pointer"
            >
              <span>{isVi ? 'Tôi có thể đặt mua sản phẩm B+Open Outdoor ở đâu?' : 'How do I purchase B+Open Outdoor furniture?'}</span>
              <ChevronRight className={`w-4 h-4 text-[#8C5535] transition-transform ${openFaq === 2 ? 'rotate-90' : ''}`} />
            </button>
            {openFaq === 2 && (
              <div className="mt-3 text-xs sm:text-sm text-[#5C4D42] leading-relaxed pl-2 border-l-2 border-[#5C3822]">
                {isVi
                  ? 'Sản phẩm của chúng tôi được phân phối thông qua mạng lưới Showroom thiết kế cao cấp và các đại lý bán lẻ ủy quyền trên toàn quốc. Đối với kiến trúc sư và nhà thiết kế nội thất, bạn có thể đăng ký tài khoản Trade để nhận chiết khấu dự án chuyên biệt.'
                  : 'Our products are available through authorized luxury design showrooms and premier outdoor retailers nationwide. Qualified interior designers and architects can also apply for our Trade Program for dedicated commercial pricing and white-glove logistics.'}
              </div>
            )}
          </div>

          {/* Question 4 */}
          <div className="py-4">
            <button
              onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
              className="w-full flex items-center justify-between text-left text-sm sm:text-base font-medium text-[#1C1A17] hover:text-[#5C3822] transition-colors cursor-pointer"
            >
              <span>{isVi ? 'Quy trình bảo dưỡng sản phẩm gồm những bước nào?' : 'How do I care for my furniture?'}</span>
              <ChevronRight className={`w-4 h-4 text-[#8C5535] transition-transform ${openFaq === 3 ? 'rotate-90' : ''}`} />
            </button>
            {openFaq === 3 && (
              <div className="mt-3 text-xs sm:text-sm text-[#5C4D42] leading-relaxed pl-2 border-l-2 border-[#5C3822]">
                {isVi
                  ? 'Định kỳ rửa sạch bằng nước ấm pha xà phòng nhẹ và bàn chải lông mềm. Nếu muốn giữ màu nâu gỗ nguyên bản, hãy thoa một lớp dầu Penofin Ipe mỏng mỗi năm một lần trước mùa hè.'
                  : 'Routine maintenance simply involves washing with mild soapy water and a soft bristle brush. If you prefer to maintain the warm chocolate luster, apply a light coat of Penofin Verde Ipe Oil once annually.'}
              </div>
            )}
          </div>

          {/* Question 5 */}
          <div className="py-4">
            <button
              onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
              className="w-full flex items-center justify-between text-left text-sm sm:text-base font-medium text-[#1C1A17] hover:text-[#5C3822] transition-colors cursor-pointer"
            >
              <span>{isVi ? 'Tôi có thể xem tất cả bảng màu vải Sunbrella® ở đâu?' : 'Where can I see all of the available Sunbrella® Fabric colorways?'}</span>
              <ChevronRight className={`w-4 h-4 text-[#8C5535] transition-transform ${openFaq === 4 ? 'rotate-90' : ''}`} />
            </button>
            {openFaq === 4 && (
              <div className="mt-3 text-xs sm:text-sm text-[#5C4D42] leading-relaxed pl-2 border-l-2 border-[#5C3822]">
                {isVi
                  ? 'Bạn có thể xem trực tiếp các mẫu vải trong bảng cấu hình phía trên, hoặc ghé thăm các Showroom ủy quyền để chạm tay trải nghiệm hơn 60 mã màu vải Sunbrella® kháng nước, chống tia UV chuẩn hàng hải.'
                  : 'You can explore our interactive swatches on this page, or visit any authorized showroom to request physical memo samples of our complete 60+ Sunbrella® marine performance fabric library.'}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
