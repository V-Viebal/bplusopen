import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Product, PageId } from '../types';
import { ArrowRight, Bookmark, Check, Eye, Layers, Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { formatDimensionsSummary } from '../utils/dimensionUtils';
import { InlineEditableImage } from '../components/InlineEditableImage';
import { InlineEditableText } from '../components/InlineEditableText';
import { DeleteProductButton } from '../components/DeleteProductButton';
import { useCatalogData } from '../context/CatalogDataContext';

interface CollectionsPageProps {
  initialCollection?: string;
  savedProductIds: Set<string>;
  onToggleSave: (product: Product) => void;
  onOpenProductModal: (product: Product) => void;
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string }) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  initialCollection = 'all',
  savedProductIds,
  onToggleSave,
  onOpenProductModal,
  onNavigate,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const { collections, products } = useCatalogData();
  const [activeColId, setActiveColId] = useState<string>(
    initialCollection !== 'all' ? initialCollection : 'all'
  );

  const displayedCollections = activeColId === 'all'
    ? collections
    : collections.filter((c) => c.id === activeColId);

  return (
    <div className="space-y-0 animate-in fade-in duration-300">
      {/* Page Header */}
      <PageHeader
        badge={isVi ? 'Hợp Tác Thiết Kế Quốc Tế' : 'Architectural Design Collaborations'}
        title={isVi ? 'Bộ Sưu Tập Ngoài Trời' : 'Outdoor Collections'}
        description={
          isVi
            ? 'Khám phá những bộ sưu tập nội thất cho không gian sống ngoài trời, với chất liệu và ngôn ngữ thiết kế riêng.'
            : 'Explore outdoor furniture collections, each with its own materials and design language.'
        }
        breadcrumb={isVi ? 'Bộ Sưu Tập' : 'Collections'}
        onNavigateHome={() => onNavigate('home')}
      />

      {/* Collection Quick Switcher Tabs */}
      <div className="sticky top-[106px] sm:top-[118px] lg:top-[126px] z-30 bg-white border-b border-[#EAE3DA] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between overflow-x-auto gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveColId('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer ${
                activeColId === 'all'
                  ? 'bg-[#5C3822] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#6B5E52] hover:bg-[#EAE4D9] hover:text-[#2A1D15]'
              }`}
            >
              {isVi ? 'Tất Cả Bộ Sưu Tập (4)' : 'All Collections (4)'}
            </button>
            {collections.map((c) => {
              const displayName = isVi && c.nameVi ? c.nameVi : c.name;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveColId(c.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer ${
                    activeColId === c.id
                      ? 'bg-[#5C3822] text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-[#6B5E52] hover:bg-[#EAE4D9] hover:text-[#2A1D15]'
                  }`}
                >
                  {displayName}
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-[#7A6B5F]">
            <Sparkles className="w-3.5 h-3.5 text-[#C4A482]" />
            <span>{isVi ? '100% Gỗ Lõi Kháng Thời Tiết' : '100% Weatherproof Heartwood'}</span>
          </div>
        </div>
      </div>

      {/* Collections Detailed Sections */}
      <div className="divide-y divide-[#EAE3DA]">
        {displayedCollections.map((col, index) => {
          const displayName = isVi && col.nameVi ? col.nameVi : col.name;
          const displayTagline = isVi && col.taglineVi ? col.taglineVi : col.tagline;
          const displayDesc = isVi && col.descriptionVi ? col.descriptionVi : col.description;
          const displaySpecs = isVi && col.highlightSpecsVi ? col.highlightSpecsVi : col.highlightSpecs;
          const colProducts = products.filter((p) => p.collection.toLowerCase() === col.id.toLowerCase());

          return (
            <section key={col.id} id={`collection-${col.id}`} className="py-16 sm:py-24 bg-[#FAF8F5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Collection Editorial Banner */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
                  <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative rounded-xs overflow-hidden border border-[#EAE3DA] shadow-lg group">
                      <InlineEditableImage
                        record="collection"
                        recordId={col.id}
                        field="heroImage"
                        value={col.heroImage}
                        alt={displayName}
                      className="w-full aspect-[4/3] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-[#1C1A17]/85 backdrop-blur-xs text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-xs">
                        {col.itemCount} {isVi ? 'Thiết kế di sản' : 'Heirloom Pieces'}
                      </div>
                    </div>
                  </div>

                  <div className={`lg:col-span-5 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div>
                      <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C5535] block mb-1">
                        <InlineEditableText record="collection" recordId={col.id} field={isVi ? 'primaryMaterialVi' : 'primaryMaterial'} value={isVi ? col.primaryMaterialVi || col.primaryMaterial : col.primaryMaterial} as="span" label={isVi ? 'Vật liệu chính tiếng Việt' : 'Primary material'} />
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1A17] tracking-tight">
                        <InlineEditableText record="collection" recordId={col.id} field={isVi ? 'nameVi' : 'name'} value={displayName} as="span" label={isVi ? 'Tên collection tiếng Việt' : 'Collection name'} />
                      </h2>
                      <p className="text-sm sm:text-base text-[#5C3822] font-serif italic mt-1">
                        <InlineEditableText record="collection" recordId={col.id} field={isVi ? 'taglineVi' : 'tagline'} value={displayTagline} as="span" multiline label={isVi ? 'Tagline collection tiếng Việt' : 'Collection tagline'} />
                      </p>
                    </div>

                    <p className="text-sm text-[#6B5E52] leading-relaxed">
                      <InlineEditableText record="collection" recordId={col.id} field={isVi ? 'descriptionVi' : 'description'} value={displayDesc} as="span" multiline label={isVi ? 'Mô tả collection tiếng Việt' : 'Collection description'} />
                    </p>

                    <div className="pt-2 border-t border-[#EAE3DA]">
                      <div className="text-xs font-semibold text-[#1C1A17] uppercase tracking-wider mb-2">
                        {isVi ? 'Đặc Tính Cốt Lõi:' : 'Architectural Highlights:'}
                      </div>
                      <ul className="space-y-1.5">
                        {displaySpecs.map((spec, sIdx) => (
                          <li key={sIdx} className="text-xs text-[#6B5E52] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5C3822] shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => onNavigate('collection-detail', { collection: col.id })}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5C3822] hover:bg-[#2A1D15] text-white text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer shadow-xs"
                      >
                        <span>{isVi ? 'Khám Phá Chi Tiết' : 'Explore Details'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onNavigate('furniture', { collection: col.id })}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#EAE4D9] text-[#2A1D15] border border-[#EAE3DA] text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        <span>{isVi ? 'Lọc Danh Mục' : 'Filter Catalog'}</span>
                      </button>
                      <button
                        onClick={() => col.id === 'luma' ? window.open('/luma/catalog-luma-2026.pdf', '_blank', 'noopener') : onNavigate('trade')}
                        className="text-xs font-semibold uppercase tracking-wider text-[#6B5E52] hover:text-[#1C1A17] underline underline-offset-4"
                      >
                        {col.id === 'luma' ? (isVi ? 'Xem catalog' : 'View catalog') : (isVi ? 'Tải CAD / BIM' : 'CAD Specs')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collection Pieces Grid */}
                <div className="mt-8 pt-8 border-t border-[#EAE3DA]">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1C1A17]">
                      {isVi ? `Các Thiết Kế Trong Bộ Sưu Tập ${displayName}` : `${displayName} Pieces (${colProducts.length})`}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {colProducts.map((product) => {
                      const isSaved = savedProductIds.has(product.id);
                      const prodName = isVi && product.nameVi ? product.nameVi : product.name;

                      return (
                        <div
                          key={product.id}
                          className="group bg-white border border-[#EAE3DA] rounded-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                        >
                          <div className="relative aspect-[4/3] bg-[#F7F4EF] overflow-hidden">
                            <DeleteProductButton product={product} className="absolute bottom-2 right-2" />
                            <InlineEditableImage
                              record="product"
                              recordId={product.id}
                              field="imageUrl"
                              value={product.imageUrl}
                              alt={prodName}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            {/* Save Spec Button */}
                            <button
                              onClick={() => onToggleSave(product)}
                              className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                                isSaved
                                  ? 'bg-[#5C3822] text-white'
                                  : 'bg-white/80 text-[#2A1D15] hover:bg-white hover:text-[#5C3822]'
                              }`}
                              title={isSaved ? (isVi ? 'Đã lưu vào Spec Sheet' : 'Saved') : (isVi ? 'Lưu vào Spec Sheet' : 'Save')}
                            >
                              {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                            <div>
                              <div className="text-[10px] text-[#8C5535] font-semibold uppercase tracking-wider">
                                <InlineEditableText record="product" recordId={product.id} field="sku" value={product.sku} as="span" label="SKU" />
                              </div>
                              <h4 className="font-serif text-base text-[#1C1A17] group-hover:text-[#5C3822] transition-colors line-clamp-1 mt-0.5">
                                <InlineEditableText record="product" recordId={product.id} field={isVi ? 'nameVi' : 'name'} value={prodName} as="span" label={isVi ? 'Tên sản phẩm tiếng Việt' : 'Product name'} />
                              </h4>
                              <p className="text-[11px] text-[#7A6B5F] mt-1 font-mono">
                                {formatDimensionsSummary(product.dimensions)}
                              </p>
                            </div>

                            <button
                              onClick={() => onOpenProductModal(product)}
                              className="w-full py-2 bg-[#FAF7F2] hover:bg-[#EAE4D9] text-[#2A1D15] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>{isVi ? 'Xem Chi Tiết' : 'Specifications'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
