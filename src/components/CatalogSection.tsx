import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Search, RotateCcw, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCatalogData } from '../context/CatalogDataContext';

interface CatalogSectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedCollection: string;
  onSelectCollection: (collection: string) => void;
  savedProductIds: Set<string>;
  onToggleSave: (product: Product) => void;
  onOpenProductModal: (product: Product) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedCollection,
  onSelectCollection,
  savedProductIds,
  onToggleSave,
  onOpenProductModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'material'>('featured');
  const { language, t } = useLanguage();
  const isVi = language === 'vi';
  const { collections, products } = useCatalogData();

  const categories = [
    { id: 'all', name: t('catalog.allPieces') },
    { id: 'dining', name: isVi ? 'DINING (Bàn Ghế Ăn)' : 'DINING' },
    { id: 'lounging', name: isVi ? 'LOUNGING (Sofa & Thư Giãn)' : 'LOUNGING' },
    { id: 'deep-seating', name: t('cat.deep-seating.name') },
    { id: 'chaises', name: t('cat.chaises.name') },
    { id: 'tables', name: t('cat.tables.name') },
    { id: 'accessories', name: t('cat.accessories.name') },
  ];

  const materials = [
    { id: 'all', name: t('catalog.allMaterials') },
    { id: '100% FSC Ipe', name: isVi ? '100% Gỗ Ipe FSC®' : '100% FSC Ipe' },
    { id: 'Ipe & Woven Viro', name: isVi ? 'Gỗ Ipe & Sợi Đan Viro' : 'Ipe & Woven Viro' },
    { id: 'Ipe & Aluminum', name: isVi ? 'Gỗ Ipe & Khung Nhôm' : 'Ipe & Aluminum' },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter supporting DINING and LOUNGING
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'dining' && p.category !== 'dining') {
          return false;
        }
        if (selectedCategory === 'lounging' && p.category === 'dining') {
          return false;
        }
        if (selectedCategory !== 'dining' && selectedCategory !== 'lounging' && p.category !== selectedCategory) {
          return false;
        }
      }
      // Collection filter
      if (selectedCollection !== 'all' && p.collection !== selectedCollection) {
        return false;
      }
      // Material filter
      if (selectedMaterial !== 'all' && p.material !== selectedMaterial) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q) || (p.nameVi && p.nameVi.toLowerCase().includes(q));
        const matchesCollection = p.collection.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q) || (p.descriptionVi && p.descriptionVi.toLowerCase().includes(q));
        const matchesSku = p.sku.toLowerCase().includes(q);
        if (!matchesName && !matchesCollection && !matchesDesc && !matchesSku) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = isVi && a.nameVi ? a.nameVi : a.name;
        const nameB = isVi && b.nameVi ? b.nameVi : b.name;
        return nameA.localeCompare(nameB);
      }
      if (sortBy === 'material') {
        const matA = isVi && a.materialVi ? a.materialVi : a.material;
        const matB = isVi && b.materialVi ? b.materialVi : b.material;
        return matA.localeCompare(matB);
      }
      return 0; // default order
    });
  }, [selectedCategory, selectedCollection, selectedMaterial, searchQuery, sortBy, isVi]);

  const resetAllFilters = () => {
    onSelectCategory('all');
    onSelectCollection('all');
    setSelectedMaterial('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedCollection !== 'all' ||
    selectedMaterial !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <section id="catalog" className="py-20 sm:py-24 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#9B522E]">
            {t('catalog.subtitle')}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1A17] tracking-tight mt-1">
            {t('catalog.title')}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6B5E52]">
            {t('catalog.description')}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-[#DED9CD] p-4 sm:p-6 mb-8 rounded-sm shadow-xs space-y-4">
          
          {/* Top row: Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A6B]" />
              <input
                id="catalog-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('catalog.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs text-xs sm:text-sm text-[#1C1A17] placeholder:text-[#9C8E82] focus:outline-none focus:border-[#9B522E]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A6B] hover:text-[#1C1A17] cursor-pointer"
                >
                  {isVi ? 'Xoá' : 'Clear'}
                </button>
              )}
            </div>

            {/* Sort & Reset Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#7A6B5F] font-semibold hidden sm:inline">
                  {t('catalog.sort')}:
                </span>
                <select
                  id="catalog-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="py-2.5 px-3 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs text-xs text-[#2E2823] font-medium focus:outline-none focus:border-[#9B522E] cursor-pointer"
                >
                  <option value="featured">{t('catalog.sortFeatured')}</option>
                  <option value="name">{t('catalog.sortName')}</option>
                  <option value="material">{t('catalog.sortMaterial')}</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="py-2.5 px-3 bg-[#F8F6F2] hover:bg-[#EAE4D9] text-[#9B522E] border border-[#DED9CD] rounded-xs text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('catalog.reset')}</span>
                </button>
              )}
            </div>

          </div>

          {/* Category Pills */}
          <div className="pt-2 border-t border-[#F0EBE3]">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A6B] mb-2">
              {t('catalog.livingCategory')}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xs text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#9B522E] text-white shadow-xs'
                      : 'bg-[#F8F6F2] text-[#5C5046] hover:bg-[#EAE4D9] border border-[#DED9CD]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Collection & Material Secondary Filter Pills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#F0EBE3]">
            {/* Collection Filter */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A6B] mb-1.5">
                {t('catalog.signatureCollection')}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => onSelectCollection('all')}
                  className={`px-2.5 py-1 text-xs rounded-xs font-medium transition-colors cursor-pointer ${
                    selectedCollection === 'all'
                      ? 'bg-[#2A1D15] text-white'
                      : 'bg-[#F8F6F2] text-[#5C5046] border border-[#DED9CD]'
                  }`}
                >
                  {t('catalog.allCollections')}
                </button>
                {collections.map((c) => {
                  const colName = isVi && c.nameVi ? c.nameVi.replace('Bộ Sưu Tập ', '') : c.name.replace(' Collection', '');
                  return (
                    <button
                      key={c.id}
                      onClick={() => onSelectCollection(c.id)}
                      className={`px-2.5 py-1 text-xs rounded-xs font-medium transition-colors cursor-pointer ${
                        selectedCollection === c.id
                          ? 'bg-[#2A1D15] text-white'
                          : 'bg-[#F8F6F2] text-[#5C5046] hover:bg-[#EAE4D9] border border-[#DED9CD]'
                      }`}
                    >
                      {colName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material Filter */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A6B] mb-1.5">
                {t('catalog.timberMaterial')}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {materials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat.id)}
                    className={`px-2.5 py-1 text-xs rounded-xs font-medium transition-colors cursor-pointer ${
                      selectedMaterial === mat.id
                        ? 'bg-[#2A1D15] text-white'
                        : 'bg-[#F8F6F2] text-[#5C5046] hover:bg-[#EAE4D9] border border-[#DED9CD]'
                    }`}
                  >
                    {mat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-[#7A6B5F] mb-6">
          <div>
            {t('catalog.showing')} <span className="font-semibold text-[#1C1A17]">{filteredProducts.length}</span> {t('catalog.designs')}
          </div>
          {savedProductIds.size > 0 && (
            <div className="text-[#9B522E] font-medium">
              {savedProductIds.size} {isVi ? 'sản phẩm đã lưu vào Bảng Thông Số Dự Án' : `${savedProductIds.size === 1 ? 'piece' : 'pieces'} saved to your Project Spec Sheet`}
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={onOpenProductModal}
                isSaved={savedProductIds.has(product.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-[#DED9CD] rounded-sm p-8">
            <Filter className="w-10 h-10 text-[#8C7A6B] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl text-[#1C1A17] mb-1">{t('catalog.noMatchTitle')}</h3>
            <p className="text-xs text-[#6B5E52] mb-4">
              {t('catalog.noMatchDesc')}
            </p>
            <button
              onClick={resetAllFilters}
              className="px-6 py-2.5 bg-[#9B522E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2A1D15] transition-colors cursor-pointer"
            >
              {t('catalog.reset')}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
