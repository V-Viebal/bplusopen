import React, { useState, useEffect, useRef } from 'react';
import { Product, PageId } from '../types';
import { Search, X, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCatalogData } from '../context/CatalogDataContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectCollection: (colId: string) => void;
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string }) => void;
  onOpenCatalogModal?: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectCollection,
  onNavigate,
  onOpenCatalogModal,
}) => {
  const [query, setQuery] = useState('');
  const [activeCollectionId, setActiveCollectionId] = useState('luma');
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const { products, collections } = useCatalogData();
  const inputRef = useRef<HTMLInputElement>(null);

  // Top collections carousel items matching screenshot
  const menuCollections = [
    {
      id: 'heritage',
      name: 'HERITAGE',
      nameVi: 'HERITAGE',
      image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=500&q=80',
      mapped: 'serenity'
    },
    {
      id: 'innova',
      name: 'INNOVA',
      nameVi: 'INNOVA',
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=500&q=80',
      mapped: 'lumino'
    },
    {
      id: 'jett',
      name: 'JETT',
      nameVi: 'JETT',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80',
      mapped: 'bloom'
    },
    {
      id: 'laguna',
      name: 'LAGUNA',
      nameVi: 'LAGUNA',
      image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=500&q=80',
      mapped: 'luma'
    },
    {
      id: 'luma',
      name: 'LUMA',
      nameVi: 'LUMA',
      image: '/luma/scene-3.webp',
      mapped: 'luma'
    },
    {
      id: 'lumino',
      name: 'LUMINO',
      nameVi: 'LUMINO',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
      mapped: 'lumino'
    },
    {
      id: 'bloom',
      name: 'BLOOM',
      nameVi: 'BLOOM',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80',
      mapped: 'bloom'
    },
    {
      id: 'serenity',
      name: 'SERENITY',
      nameVi: 'SERENITY',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=500&q=80',
      mapped: 'serenity'
    },
  ];

  // Lock body scroll and set initial focus when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredProducts = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.nameVi && p.nameVi.toLowerCase().includes(q)) ||
          p.collection.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.descriptionVi && p.descriptionVi.toLowerCase().includes(q))
      )
    : [];

  const matchedCollections = q
    ? collections.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.nameVi && c.nameVi.toLowerCase().includes(q)) ||
          c.tagline.toLowerCase().includes(q) ||
          (c.taglineVi && c.taglineVi.toLowerCase().includes(q))
      )
    : [];

  const handleSelectCollection = (colId: string) => {
    setActiveCollectionId(colId);
    onSelectCollection(colId);
    onClose();
  };

  const handleNav = (page: PageId, extra?: { category?: string; collection?: string }) => {
    onNavigate(page, extra);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start items-stretch">
      {/* Dark backdrop overlay - clicking closes the drawer */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
        aria-label="Close menu backdrop"
      />

      {/* Slide-out Left Drawer Panel - flush to the left edge */}
      <aside
        className="relative w-full max-w-[390px] sm:max-w-[440px] h-full bg-[#121212] text-white shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-300 border-r border-white/10 px-4 sm:px-5 py-4"
        role="dialog"
        aria-modal="true"
      >
        {/* 1. TOP BAR: [Close ✕ Button] + Centered Logo */}
        <div className="relative flex items-center justify-between pb-4 pt-2 border-b border-white/10">
          <button
            onClick={onClose}
            aria-label="Close navigation search menu"
            className="p-1.5 text-white/80 hover:text-white transition-colors cursor-pointer rounded-xs"
          >
            <X className="w-6 h-6 stroke-[1.8]" />
          </button>

          {/* Brand Logo in Search Modal */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center select-none flex items-center justify-center">
            <img
              src="/logo-b-open.png"
              alt="B+Open Logo"
              className="h-12 sm:h-14 w-auto max-w-[240px] object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Spacer for symmetrical centering */}
          <div className="w-8" />
        </div>

        {/* 2. COLLECTION THUMBNAILS CAROUSEL matching screenshot */}
        <div className="pt-4 pb-2">
          <div className="flex items-start gap-3 sm:gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {menuCollections.map((col) => {
              const isActive = activeCollectionId === col.id;
              return (
                <div
                  key={col.id}
                  onClick={() => handleSelectCollection(col.mapped)}
                  className="shrink-0 w-28 sm:w-32 cursor-pointer group select-none"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#242220] border border-white/10 mb-2">
                    <img
                      src={col.image}
                      alt={col.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 brightness-90 group-hover:brightness-100"
                    />
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-white text-left pl-0.5">
                    {col.name}
                  </div>
                  {/* Underline Indicator */}
                  <div className="mt-1.5 w-full h-[2px] bg-[#333333]">
                    <div
                      className={`h-full transition-all duration-200 ${
                        isActive ? 'bg-white w-full' : 'bg-transparent group-hover:bg-white/60 w-full'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. SEARCH INPUT BAR matching screenshot */}
        <div className="mt-4 mb-6">
          <div className="flex items-stretch border border-white/20 shadow-md">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isVi ? 'Search / Tìm kiếm...' : 'Search...'}
              className="flex-1 bg-white text-[#1C1A17] placeholder-[#777777] px-4 py-2.5 sm:py-3 text-sm font-sans focus:outline-none"
            />
            <button
              onClick={() => {
                if (filteredProducts.length > 0) {
                  onSelectProduct(filteredProducts[0]);
                  onClose();
                } else if (matchedCollections.length > 0) {
                  onSelectCollection(matchedCollections[0].id);
                  onClose();
                }
              }}
              aria-label="Search"
              className="bg-black hover:bg-[#202020] text-white px-4 sm:px-5 flex items-center justify-center transition-colors cursor-pointer border-l border-black"
            >
              <Search className="w-4 h-4 text-white stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* 4. CONTENT AREA: If user typed query -> Live Results; Otherwise -> Main Menu List */}
        {q ? (
          <div className="space-y-6 flex-1">
            {/* Matched Collections */}
            {matchedCollections.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6B29C] mb-3">
                  {isVi ? `BỘ SƯU TẬP (${matchedCollections.length})` : `COLLECTIONS (${matchedCollections.length})`}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {matchedCollections.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => {
                        onSelectCollection(col.id);
                        onClose();
                      }}
                      className="text-left p-3 bg-[#1C1A18] hover:bg-[#2A2724] border border-white/10 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="font-sans font-bold text-sm text-white tracking-wide">{col.name}</div>
                        <div className="text-[11px] text-[#A09890] mt-0.5 line-clamp-1">{col.tagline}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#C6B29C]" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Products */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6B29C] mb-3">
                {isVi ? `SẢN PHẨM (${filteredProducts.length})` : `PIECES & FURNITURE (${filteredProducts.length})`}
              </h3>

              {filteredProducts.length === 0 && matchedCollections.length === 0 ? (
                <div className="py-8 text-center text-sm text-[#888888]">
                  {isVi ? `Không tìm thấy kết quả nào cho "${query}"` : `No results found for "${query}"`}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((p) => {
                    const displayName = isVi && p.nameVi ? p.nameVi : p.name;
                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="flex items-center gap-3.5 p-2.5 bg-[#1C1A18] hover:bg-[#2A2724] border border-white/10 transition-colors cursor-pointer group"
                      >
                        <img
                          src={p.imageUrl}
                          alt={displayName}
                          className="w-12 h-12 object-cover bg-black/40 border border-white/10 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#C6B29C]">
                            {p.collection} • {p.sku}
                          </div>
                          <div className="text-sm font-medium text-white group-hover:text-[#9B522E] transition-colors truncate">
                            {displayName}
                          </div>
                          <div className="text-[11px] text-[#888888]">
                            {p.material}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* DEFAULT MENU LIST MATCHING SCREENSHOT EXACTLY */
          <div className="flex-1 flex flex-col justify-between">
            {/* Primary Navigation Links with Chevron Right */}
            <nav className="divide-y divide-transparent space-y-1">
              {/* FURNITURE > */}
              <button
                onClick={() => handleNav('furniture')}
                className="w-full py-2.5 sm:py-3 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-sans text-sm sm:text-[15px] font-bold tracking-[0.14em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                  FURNITURE
                </span>
                <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </button>

              {/* DINING > */}
              <button
                onClick={() => handleNav('furniture', { category: 'dining' })}
                className="w-full py-2.5 sm:py-3 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-sans text-sm sm:text-[15px] font-bold tracking-[0.14em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                  DINING
                </span>
                <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </button>

              {/* LOUNGING > */}
              <button
                onClick={() => handleNav('furniture', { category: 'lounging' })}
                className="w-full py-2.5 sm:py-3 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-sans text-sm sm:text-[15px] font-bold tracking-[0.14em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                  LOUNGING
                </span>
                <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </button>

              {/* OUTDOOR FABRICS (no arrow in screenshot) */}
              <button
                onClick={() => handleNav('materials')}
                className="w-full py-2.5 sm:py-3 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-sans text-sm sm:text-[15px] font-bold tracking-[0.14em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                  OUTDOOR FABRICS
                </span>
              </button>

              {/* PRODUCT CARE > */}
              <button
                onClick={() => handleNav('care')}
                className="w-full py-2.5 sm:py-3 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-sans text-sm sm:text-[15px] font-bold tracking-[0.14em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                  PRODUCT CARE
                </span>
                <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </button>

              {/* OUR STORY > */}
              <button
                onClick={() => handleNav('sustainability')}
                className="w-full py-2.5 sm:py-3 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-sans text-sm sm:text-[15px] font-bold tracking-[0.14em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                  OUR STORY
                </span>
                <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </button>

              {/* Help Center > */}
              <button
                onClick={() => handleNav('help-center')}
                className="w-full py-2.5 sm:py-3 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-sans text-sm sm:text-[15px] font-bold tracking-[0.14em] text-white group-hover:text-[#9B522E] transition-colors">
                  Help Center
                </span>
                <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </button>
              {/* NEWS & EVENTS > */}
              <button
                onClick={() => handleNav('news')}
                className="w-full py-2.5 sm:py-3 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-sans text-sm sm:text-[15px] font-bold tracking-[0.14em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                  {language === 'vi' ? 'TIN TỨC & SỰ KIỆN' : 'NEWS & EVENTS'}
                </span>
                <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </button>
            </nav>

            {/* Subtle Divider */}
            <div className="border-t border-white/15 my-5" />

            {/* Secondary Links: Warm gold/amber tone matching screenshot */}
            <div className="space-y-2.5">
              <div>
                <button
                  onClick={() => handleNav('trade')}
                  className="font-sans text-xs sm:text-[13px] font-medium text-[#C8B6A6] hover:text-white transition-colors cursor-pointer"
                >
                  Trade Program
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleNav('help-center')}
                  className="font-sans text-xs sm:text-[13px] font-medium text-[#C8B6A6] hover:text-white transition-colors cursor-pointer"
                >
                  Help Center
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleNav('showrooms')}
                  className="font-sans text-xs sm:text-[13px] font-medium text-[#C8B6A6] hover:text-white transition-colors cursor-pointer"
                >
                  Find a Retailer
                </button>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="border-t border-white/15 my-5" />

            {/* Tertiary Quick Links: Gray/stone tone matching screenshot */}
            <div className="space-y-2.5 pb-6">
              <div>
                <button
                  onClick={() => handleNav('catalog')}
                  className="font-sans text-xs sm:text-[13px] text-[#A69E96] hover:text-white transition-colors cursor-pointer"
                >
                  Catalog
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleNav('care')}
                  className="font-sans text-xs sm:text-[13px] text-[#A69E96] hover:text-white transition-colors cursor-pointer"
                >
                  Product Care
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleNav('3d-showroom')}
                  className="font-sans text-xs sm:text-[13px] text-[#A69E96] hover:text-white transition-colors cursor-pointer"
                >
                  3D Showroom
                </button>
              </div>
              <div>
                <a
                  href="tel:+18004030403"
                  className="inline-block font-sans text-xs sm:text-[13px] font-semibold text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  +1 (800) 403-0403
                </a>
              </div>
            </div>
          </div>
        )}

      </aside>
    </div>
  );
};
