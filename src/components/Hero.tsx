import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageId } from '../types';
import { COLLECTIONS as CATALOG_COLLECTIONS } from '../data/furnitureData';
import { InlineEditableText } from './InlineEditableText';
import { InlineEditableImage } from './InlineEditableImage';

interface HeroSlide {
  id: string;
  preTitle: string;
  preTitleVi: string;
  title: string;
  titleVi: string;
  subtitle: string;
  subtitleVi: string;
  image: string;
  targetCollection?: string;
  targetProduct?: string;
  targetPage?: PageId;
}

const HERO_SLIDES: HeroSlide[] = [
  { id: 'luma', preTitle: 'OUTDOOR COLLECTION 2026', preTitleVi: 'BỘ SƯU TẬP NGOÀI TRỜI 2026', title: 'LUMA', titleVi: 'LUMA', subtitle: 'TEAK, WOVEN CORD & POWDER-COATED METAL', subtitleVi: 'GỖ TEAK, DÂY ĐAN & KIM LOẠI SƠN TĨNH ĐIỆN', image: '/luma/scene-3.webp', targetCollection: 'luma' },
  {
    id: 'lumino',
    preTitle: 'NEW COLLECTION 2026',
    preTitleVi: 'BỘ SƯU TẬP MỚI 2026',
    title: 'LUMINO',
    titleVi: 'LUMINO',
    subtitle: 'LIGHTWEIGHT ALUMINUM FOR MODERN OUTDOOR LIVING',
    subtitleVi: 'NHÔM GỌN NHẸ CHO KHÔNG GIAN NGOÀI TRỜI HIỆN ĐẠI',
    image: '/lumino-profile/scene-2.webp',
    targetCollection: 'lumino',
  },
  {
    id: 'bloom',
    preTitle: 'NEW COLLECTION 2026',
    preTitleVi: 'BỘ SƯU TẬP MỚI 2026',
    title: 'POLY BLOOM',
    titleVi: 'POLY BLOOM',
    subtitle: 'SOFT, ROUNDED FORMS IN DURABLE MOLDED COMPOSITE',
    subtitleVi: 'DÁNG CONG MỀM MẠI TỪ COMPOSITE ĐÚC BỀN BỈ',
    image: '/poly-bloom/scene-2.webp',
    targetCollection: 'bloom',
  },
  {
    id: 'serenity',
    preTitle: 'NEW COLLECTION 2026',
    preTitleVi: 'BỘ SƯU TẬP MỚI 2026',
    title: 'SERENITY',
    titleVi: 'SERENITY',
    subtitle: 'CLEAN, REFINED ALUMINUM FOR PEACEFUL OUTDOOR LIVING',
    subtitleVi: 'NHÔM TINH GỌN CHO KHÔNG GIAN NGOÀI TRỜI AN YÊN',
    image: '/serenity/catalog-02.jpg',
    targetCollection: 'serenity',
  },
  {
    id: 'soleo',
    preTitle: 'SIMPLY',
    preTitleVi: 'TINH TẾ',
    title: 'SOLEO',
    titleVi: 'SOLEO',
    subtitle: 'MIDCENTURY, MODERNIZED IN THREE WOVEN COLORWAYS',
    subtitleVi: 'PHONG CÁCH GIỮA THẾ KỶ HIỆN ĐẠI HÓA VỚI 3 TÔNG MÀU DỆT',
    image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/08/S26_Soleo_L1_IvoryWeave_4K.jpg',
    targetCollection: 'soleo',
  },
  {
    id: 'breeze',
    preTitle: 'EASE INTO',
    preTitleVi: 'THOẢI MÁI ĐÓN NHẬN',
    title: 'BREEZE',
    titleVi: 'BREEZE',
    subtitle: 'ELEVATED ALUMINUM DINING IN NINE SLING COLORWAYS',
    subtitleVi: 'BÀN ĂN NHÔM TINH TẾ VỚI 9 TÔNG MÀU LƯỚI SLING',
    image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/08/Mesa_86RectangleDiningTable_L2A.jpg',
    targetCollection: 'breeze',
  },
  {
    id: 'tempo',
    preTitle: 'TAP INTO',
    preTitleVi: 'CHẠM VÀO ĐẲNG CẤP',
    title: 'TEMPO',
    titleVi: 'TEMPO',
    subtitle: '12 COLORWAYS OF WEATHER-PROOF IPE AND ULTRALEATHER® PERFECTION',
    subtitleVi: '12 SẮC THÁI GỖ IPE CHỐNG CHỊU THỜI TIẾT & DA ULTRALEATHER® HOÀN HẢO',
    image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/08/S26_Tempo_SwivelRocker_L1_4K.jpg',
    targetCollection: 'tempo',
  },
  {
    id: 'foundations',
    preTitle: 'ELEVATED ALFRESCO',
    preTitleVi: 'TIỆC NGOÀI TRỜI ĐẲNG CẤP',
    title: 'FOUNDATIONS',
    titleVi: 'FOUNDATIONS',
    subtitle: 'COUNTER-HEIGHT IPE DINING AND HOSPITALITY CONSOLE',
    subtitleVi: 'BÀN ĂN CAO CẤP VÀ TỦ SOFA GỖ IPE CHO DỰ ÁN NGHỈ DƯỠNG',
    image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/08/S26_Foundations_SageServingBuffet_IpeWoodShadowTop_P1_4K.jpg',
    targetCollection: 'foundations',
  },
  {
    id: 'sway',
    preTitle: 'SOOTHING',
    preTitleVi: 'ÊM ÁI VỖ VỀ',
    title: 'SWAY ROCKER',
    titleVi: 'GHẾ BẬP BÊNH SWAY',
    subtitle: 'MODERN MOTION IN FSC®-CERTIFIED IPE WOOD',
    subtitleVi: 'CHUYỂN ĐỘNG ĐUNG ĐƯA HIỆN ĐẠI TỪ GỖ IPE CHỨNG NHẬN FSC®',
    image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/08/Innova_SwayModernIpeRocker_L2_4k.jpg',
    targetProduct: 'sway-modern-ipe-rocker',
  },
  {
    id: 'plume',
    preTitle: 'PERFORMANCE',
    preTitleVi: 'HIỆU NĂNG BỀN BỈ',
    title: 'PLUME PILLOWS',
    titleVi: 'GỐI ĐỆM PLUME',
    subtitle: 'THE UNCOMMON THREAD TO UNFORGETTABLE GATHERINGS',
    subtitleVi: 'SỢI CHỈ ĐẶC BIỆT GẮN KẾT NHỮNG KHOẢNH KHẮC ĐÁNG NHỚ',
    image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/01/Plume-GoldPillows-Lifestyle1.jpg',
    targetCollection: 'plume-pillows',
  },
  {
    id: 'velo',
    preTitle: 'INTRODUCING',
    preTitleVi: 'GIỚI THIỆU TÁC PHẨM',
    title: 'VELO',
    titleVi: 'VELO',
    subtitle: 'SAY HELLO TO AN OASIS OF WOVEN CAMEL-TONES',
    subtitleVi: 'ỐC ĐẢO NGHỈ DƯỠNG VỚI SỢI DỆT TÔNG NÂU LẠC ĐÀ ẤM ÁP',
    image: 'https://www.jensenoutdoor.com/wp-content/uploads/2024/09/PlumeVelo-2x1Aspect-Shot1.jpg',
    targetCollection: 'velo',
  },
  {
    id: 'unicon',
    preTitle: 'UNVEILING',
    preTitleVi: 'RA MẮT ẤN TƯỢNG',
    title: 'UNICON',
    titleVi: 'UNICON',
    subtitle: 'URBAN COMFORT FOR TRADITIONAL TASTES',
    subtitleVi: 'SỰ TIỆN NGHI ĐÔ THỊ CHO GU THẨM MỸ TRUYỀN THỐNG',
    image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/08/S26-Unicon-Swivel_Rocker_L1_4k.jpg',
    targetCollection: 'unicon',
  },
];

interface HeroProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string; productId?: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-play slider with 5.5s duration, pause on hover
  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isHovered]);

  const handleSlideClick = (slide: HeroSlide) => {
    if (slide.targetProduct) {
      onNavigate('product-detail', { productId: slide.targetProduct });
    } else if (slide.targetCollection) {
      onNavigate('collections', { collection: slide.targetCollection });
    } else if (slide.targetPage) {
      onNavigate(slide.targetPage);
    } else {
      onNavigate('furniture');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      id="hero-slider"
      className="relative w-full h-[88vh] min-h-[580px] sm:min-h-[660px] lg:min-h-[760px] max-h-[1050px] overflow-hidden bg-[#0A0A0A] select-none group/slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides with Cross-Fade */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlideIndex;
        const catalogCollection = slide.targetCollection
          ? CATALOG_COLLECTIONS.find((collection) => collection.id === slide.targetCollection)
          : undefined;
        const slideTitle = catalogCollection
          ? (isVi && catalogCollection.nameVi ? catalogCollection.nameVi : catalogCollection.name)
          : (isVi ? slide.titleVi : slide.title);
        const slideSubtitle = catalogCollection
          ? (isVi && catalogCollection.taglineVi ? catalogCollection.taglineVi : catalogCollection.tagline)
          : (isVi ? slide.subtitleVi : slide.subtitle);
        const slideImage = catalogCollection?.heroImage || slide.image;
        return (
          <div
            key={slide.id}
            onClick={() => handleSlideClick(slide)}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Slide Image */}
            {catalogCollection ? (
              <InlineEditableImage
                record="collection"
                recordId={catalogCollection.id}
                field="heroImage"
                value={slideImage}
                alt={`${slideTitle} - ${slideSubtitle}`}
                className="w-full h-full object-cover object-center transition-transform duration-7000 ease-out scale-100 group-hover/slider:scale-103"
              />
            ) : (
              <img
                src={slideImage}
                alt={`${slide.title} - ${slide.subtitle}`}
                className="w-full h-full object-cover object-center transition-transform duration-7000 ease-out scale-100 group-hover/slider:scale-103"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            )}

            {/* Gradient Scrims: Darkened top for header legibility and darkened bottom for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/60 pointer-events-none" />

            {/* Slide Text Content Overlay - Centered exactly like official site */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5 sm:px-8 z-20">
              {/* Pre-title / Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/45 border border-white/25 backdrop-blur-xs text-[12px] sm:text-[13px] uppercase tracking-[0.24em] font-bold text-[#EFECE6] drop-shadow-md mb-3 sm:mb-4">
                <span className="w-2 h-2 rounded-full bg-[#9B522E]" />
                {isVi ? slide.preTitleVi : slide.preTitle}
              </div>

              {/* Main Headline */}
              <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal sm:font-light tracking-[0.06em] text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] mb-3 sm:mb-4">
                {catalogCollection ? (
                  <InlineEditableText
                    record="collection"
                    recordId={catalogCollection.id}
                    field={isVi ? 'nameVi' : 'name'}
                    value={slideTitle}
                    as="span"
                    label={isVi ? 'Tên collection tiếng Việt' : 'Collection name'}
                  />
                ) : (
                  slideTitle
                )}
              </h1>

              {/* Subtitle / Description */}
              <p className="font-sans text-[14.5px] sm:text-base md:text-lg font-medium tracking-[0.08em] sm:tracking-[0.12em] uppercase text-white/95 max-w-2xl px-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed">
                {catalogCollection ? (
                  <InlineEditableText
                    record="collection"
                    recordId={catalogCollection.id}
                    field={isVi ? 'taglineVi' : 'tagline'}
                    value={slideSubtitle}
                    as="span"
                    label={isVi ? 'Tagline tiếng Việt' : 'Collection tagline'}
                  />
                ) : (
                  slideSubtitle
                )}
              </p>

              {/* Explore CTA Button with optimal mobile touch target */}
              <div className="mt-5 sm:mt-7">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSlideClick(slide);
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#9B522E] hover:bg-[#854424] text-white text-[14px] sm:text-[15px] font-bold uppercase tracking-wider rounded-xs shadow-xl transition-all active:scale-95 cursor-pointer min-h-[48px]"
                >
                  <span>{isVi ? 'Khám Phá Ngay' : 'Explore Collection'}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slider Navigation Arrows (Matching authentic circular arrow style) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-2.5 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-[#9B522E] border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs opacity-85 hover:opacity-100 hover:scale-105"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-2.5 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-[#9B522E] border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs opacity-85 hover:opacity-100 hover:scale-105"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
      </button>

      {/* Slide Indicators at bottom */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-2.5 py-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlideIndex(idx);
            }}
            className={`transition-all duration-300 rounded-full cursor-pointer p-1 -m-1 ${
              idx === currentSlideIndex
                ? 'w-7 sm:w-9 h-2 sm:h-2.5 bg-[#9B522E] shadow-md ring-1 ring-white/70'
                : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
          />
        ))}
      </div>
    </section>
  );
};
