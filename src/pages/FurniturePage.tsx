import React, { useRef, useEffect } from 'react';
import { Product, PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCatalogData } from '../context/CatalogDataContext';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { InlineEditableImage } from '../components/InlineEditableImage';

interface FurniturePageProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedCollection: string;
  onSelectCollection: (col: string) => void;
  savedProductIds: Set<string>;
  onToggleSave: (product: Product) => void;
  onOpenProductModal: (product: Product) => void;
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string }) => void;
}

export const FurniturePage: React.FC<FurniturePageProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedCollection,
  onSelectCollection,
  savedProductIds,
  onToggleSave,
  onOpenProductModal,
  onNavigate,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const { collections } = useCatalogData();
  const collectionsTrackRef = useRef<HTMLDivElement>(null);
  const categoriesTrackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Autoplay waiting for interaction:', err);
          const tryPlay = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          };
          window.addEventListener('click', tryPlay, { once: true });
          window.addEventListener('touchstart', tryPlay, { once: true });
          window.addEventListener('scroll', tryPlay, { once: true });
        });
      }
    }
  }, []);

  const scrollCollections = (direction: 'left' | 'right') => {
    if (collectionsTrackRef.current) {
      const amount = collectionsTrackRef.current.clientWidth * 0.5;
      collectionsTrackRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesTrackRef.current) {
      const amount = categoriesTrackRef.current.clientWidth * 0.5;
      categoriesTrackRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  // 1. COLLECTIONS: B+Open signature collections (Luma, Lumino, Bloom, Serenity)
  const collectionsList = [
    {
      id: 'luma',
      name: 'LUMA',
      nameVi: 'BỘ SƯU TẬP LUMA',
      tagline: 'Teak, woven cord & powder-coated metal',
      taglineVi: 'Teak, dây đan & kim loại sơn tĩnh điện',
      image: '/luma/scene-3.webp',
      mappedCollection: 'luma'
    },
    {
      id: 'lumino',
      name: 'LUMINO',
      nameVi: 'BỘ SƯU TẬP LUMINO',
      tagline: 'Architectural lines meet radiant deep-seated comfort',
      taglineVi: 'Đường nét kiến trúc thanh quang và đệm khối thư thái',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      mappedCollection: 'lumino'
    },
    {
      id: 'bloom',
      name: 'BLOOM',
      nameVi: 'BỘ SƯU TẬP BLOOM',
      tagline: 'Artisanal barrel curves & woven botanical fiber',
      taglineVi: 'Dáng vòm hữu cơ kết hợp sợi đan thủ công tinh mỹ',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
      mappedCollection: 'bloom'
    },
    {
      id: 'serenity',
      name: 'SERENITY',
      nameVi: 'BỘ SƯU TẬP SERENITY',
      tagline: 'Scandinavian peaceful clarity with floating slatted rhythm',
      taglineVi: 'Sự tĩnh tại Bắc Âu thuần khiết với nhịp điệu nan gỗ',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=85',
      mappedCollection: 'serenity'
    },
  ];

  // 2. CATEGORIES matching the exact screenshot (6 items)
  const effectiveCollectionsList = collectionsList.map((item) => {
    const catalogCollection = collections.find((collection) => collection.id === item.mappedCollection);
    if (!catalogCollection) return item;
    return {
      ...item,
      name: catalogCollection.name.replace(/ Collection$/i, ''),
      nameVi: catalogCollection.nameVi?.replace(/^Bộ Sưu Tập /i, '') || item.nameVi,
      tagline: catalogCollection.tagline,
      taglineVi: catalogCollection.taglineVi || item.taglineVi,
      image: catalogCollection.heroImage,
    };
  });

  const categoriesList = [
    {
      id: 'pillows',
      name: 'PILLOWS',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
      catFilter: 'accessories'
    },
    {
      id: 'lounging',
      name: 'LOUNGING',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      catFilter: 'lounging'
    },
    {
      id: 'dining',
      name: 'DINING',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80',
      catFilter: 'dining'
    },
    {
      id: 'new',
      name: 'NEW',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
      catFilter: 'all'
    },
    {
      id: 'accessories',
      name: 'ACCESSORIES',
      image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=600&q=80',
      catFilter: 'accessories'
    },
    {
      id: 'ipe-wood',
      name: 'IPE WOOD',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      catFilter: 'all'
    },
  ];

  // 3. DIVE FURTHER subcategories matching the exact screenshot (6 items: 3 columns x 2 rows)
  const diveFurtherList = [
    {
      id: 'entertaining-staples',
      name: 'ENTERTAINING STAPLES',
      nameVi: 'BÀN ĂN TIỆC NGOÀI TRỜI',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      catFilter: 'dining'
    },
    {
      id: 'chaise-lounges',
      name: 'CHAISE LOUNGES',
      nameVi: 'GHẾ TẮM NẮNG HỒ BƠI',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      catFilter: 'chaises'
    },
    {
      id: 'sectionals',
      name: 'SECTIONALS',
      nameVi: 'SOFA GÓC MODULE ĐẲNG CẤP',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      catFilter: 'deep-seating'
    },
    {
      id: 'benches',
      name: 'BENCHES',
      nameVi: 'GHẾ BĂNG GỖ NGUYÊN KHỐI',
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=800&q=80',
      catFilter: 'accessories'
    },
    {
      id: 'dining-sets',
      name: 'DINING SETS',
      nameVi: 'BỘ BÀN GHẾ ĂN HOÀN CHỈNH',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
      catFilter: 'dining'
    },
    {
      id: 'fabrics',
      name: 'FABRICS',
      nameVi: 'VẢI & ĐỆM SUNBRELLA® CAO CẤP',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      catFilter: 'all'
    },
  ];

  const handleSelectCollectionCard = (col: (typeof collectionsList)[0]) => {
    onSelectCollection(col.mappedCollection);
    onNavigate('collection-detail', { collection: col.mappedCollection });
  };

  const handleSelectCategoryCard = (cat: (typeof categoriesList)[0]) => {
    onSelectCategory(cat.catFilter);
  };

  const handleSelectDiveCard = (item: (typeof diveFurtherList)[0]) => {
    onSelectCategory(item.catFilter);
  };

  return (
    <div className="bg-white min-h-screen text-[#1C1A17] animate-in fade-in duration-300">
      {/* 1. HERO BANNER matching screenshot with auto-play outdoor furniture video */}
      <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[540px] overflow-hidden bg-[#1E1B18]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
          className="w-full h-full object-cover object-center brightness-[0.72]"
        >
          <source
            src="https://assets.mixkit.co/videos/42172/42172-720.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/42167/42167-720.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/43645/43645-720.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/43644/43644-720.mp4"
            type="video/mp4"
          />
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
            alt="Luxury Wood Furniture"
            className="w-full h-full object-cover object-center brightness-[0.72]"
          />
        </video>
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center px-4 pt-16 sm:pt-20 pointer-events-none select-none">
          <h1 className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-[52px] text-white font-light tracking-[0.2em] sm:tracking-[0.24em] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
            LUXURY WOOD FURNITURE
          </h1>
          <p className="text-white/95 text-xs sm:text-sm md:text-base tracking-[0.32em] sm:tracking-[0.38em] uppercase font-sans font-medium mt-3 sm:mt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
            MADE TO INSPIRE
          </p>
        </div>
      </div>

      {/* 2. COLLECTIONS SECTION matching screenshot carousel */}
      <section className="py-8 sm:py-12 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-3 sm:mb-4">
          <h2 className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#1C1A17] pl-1">
            <InlineEditableContent contentKey="furniture.section.collections" value="COLLECTIONS" />
          </h2>
        </div>

        {/* Carousel with 4 visible items and navigation arrows */}
        <div className="relative group/col">
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollCollections('left')}
            aria-label="Scroll collections left"
            className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 bg-[#404040]/90 hover:bg-[#1C1A17] text-white w-10 sm:w-11 h-18 sm:h-20 flex items-center justify-center rounded-xs shadow-xl transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
          </button>

          {/* Scrollable Track */}
          <div
            ref={collectionsTrackRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-1 px-1"
          >
            {effectiveCollectionsList.map((col) => (
              <div
                key={col.id}
                onClick={() => handleSelectCollectionCard(col)}
                className="w-[calc(100%-1.5rem)] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)] shrink-0 aspect-[16/11] relative overflow-hidden bg-[#EAE4D9] cursor-pointer group/card transition-all duration-300 hover:shadow-xl"
                title={isVi ? `Xem chi tiết bộ sưu tập ${col.name}` : `Explore ${col.name} Collection`}
              >
                {collections.some((collection) => collection.id === col.mappedCollection) ? (
                  <InlineEditableImage
                    record="collection"
                    recordId={col.mappedCollection}
                    field="heroImage"
                    value={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-108"
                  />
                ) : (
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-108"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end pb-4 sm:pb-5 px-3 transition-colors group-hover/card:from-black/90">
                  <span className="text-white font-sans text-sm sm:text-base font-bold tracking-[0.18em] uppercase text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                    {col.name}
                  </span>
                  <span className="text-[10px] text-[#E5D7C5] tracking-widest uppercase font-medium mt-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover/card:translate-y-0">
                    {isVi ? 'Xem Chi Tiết →' : 'Explore Collection →'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollCollections('right')}
            aria-label="Scroll collections right"
            className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 bg-[#404040]/90 hover:bg-[#1C1A17] text-white w-10 sm:w-11 h-18 sm:h-20 flex items-center justify-center rounded-xs shadow-xl transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
          </button>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION matching screenshot carousel */}
      <section className="py-6 sm:py-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-3 sm:mb-4">
          <h2 className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#1C1A17] pl-1">
            <InlineEditableContent contentKey="furniture.section.categories" value="CATEGORIES" />
          </h2>
        </div>

        {/* Carousel with 4 visible items and navigation arrows */}
        <div className="relative group/cat">
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollCategories('left')}
            aria-label="Scroll categories left"
            className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 bg-[#404040]/90 hover:bg-[#1C1A17] text-white w-10 sm:w-11 h-18 sm:h-20 flex items-center justify-center rounded-xs shadow-xl transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
          </button>

          {/* Scrollable Track */}
          <div
            ref={categoriesTrackRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-1 px-1"
          >
            {categoriesList.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleSelectCategoryCard(cat)}
                className="w-[calc(100%-1.5rem)] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)] shrink-0 aspect-[16/11] relative overflow-hidden bg-[#EAE4D9] cursor-pointer group/card transition-transform duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent flex items-end justify-center pb-4 sm:pb-5 px-3">
                  <span className="text-white font-sans text-sm sm:text-base font-bold tracking-[0.15em] uppercase text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                    {cat.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollCategories('right')}
            aria-label="Scroll categories right"
            className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 bg-[#404040]/90 hover:bg-[#1C1A17] text-white w-10 sm:w-11 h-18 sm:h-20 flex items-center justify-center rounded-xs shadow-xl transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
          </button>
        </div>
      </section>

      {/* 4. DIVE FURTHER INTO OUR ABUNDANCE OF DESIGNS TO SUIT YOUR TASTE AND SPACE. */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 border-t border-black/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-sans text-xl sm:text-2xl font-light tracking-[0.06em] text-[#1C1A17] uppercase leading-snug">
            <InlineEditableContent
              contentKey="furniture.section.dive.title"
              value="DIVE FURTHER INTO OUR ABUNDANCE OF DESIGNS TO SUIT YOUR TASTE AND SPACE."
              as="span"
            />
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-normal mt-2.5">
            <InlineEditableContent
              contentKey="furniture.section.dive.description"
              value="Discover additional selections and special accents to enhance your outdoor enjoyment."
              as="span"
              multiline
            />
          </p>
        </div>

        {/* 3 columns x 2 rows grid of curated cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {diveFurtherList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectDiveCard(item)}
              className="group cursor-pointer flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[4/3] overflow-hidden bg-[#EAE4D9] mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <span className="font-sans text-[12px] sm:text-[13px] font-semibold tracking-[0.12em] uppercase text-[#1C1A17] group-hover:text-[#8C5535] transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BOTTOM BANNER matching screenshot */}
      <section className="bg-[#FAF7F2] py-14 sm:py-18 border-t border-[#EDE5DA] text-center px-4">
        <div className="max-w-xl mx-auto space-y-4">
          <p className="font-sans text-sm sm:text-base text-[#2E2823] font-medium tracking-wide">
            Ready to see, feel, and touch B+Open for yourself?
          </p>
          <div>
            <button
              onClick={() => onNavigate('showrooms')}
              className="inline-block bg-[#DFCFC4] hover:bg-[#D4C1B4] text-[#2C241E] text-xs font-semibold tracking-[0.16em] uppercase px-8 py-3.5 transition-colors cursor-pointer rounded-xs shadow-xs"
            >
              FIND A RETAILER
            </button>
          </div>
          <p className="text-xs text-[#7A6E65]">
            Shop in-store or by virtual appointment
          </p>
        </div>
      </section>
    </div>
  );
};
