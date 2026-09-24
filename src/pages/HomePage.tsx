import React, { useRef, useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { StoryVideoModal } from '../components/StoryVideoModal';
import { LookbookModal } from '../components/LookbookModal';
import { VirtualShowroomModal } from '../components/VirtualShowroomModal';
import { CatalogDownloadModal } from '../components/CatalogDownloadModal';
import { InlineEditableText } from '../components/InlineEditableText';
import { InlineEditableImage } from '../components/InlineEditableImage';
import { COLLECTIONS as CATALOG_COLLECTIONS } from '../data/furnitureData';
import { getCollectionCardName } from '../utils/collectionDisplay';

interface HomePageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string; productId?: string; tab?: string }) => void;
}

interface CollectionCardData {
  id: string;
  name: string;
  nameVi: string;
  badge?: string;
  badgeVi?: string;
  description: string;
  descriptionVi: string;
  image: string;
  targetCollection: string;
}

interface CategoryCardData {
  id: string;
  title: string;
  titleVi: string;
  subtitle: string;
  subtitleVi: string;
  label: string;
  image: string;
  route: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // Modals state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);
  const [isCatalogDownloadOpen, setIsCatalogDownloadOpen] = useState(false);
  const [isVirtualShowroomOpen, setIsVirtualShowroomOpen] = useState(false);

  // Background Forest Video Auto-play State (Section 3: From our forest to your family)
  const forestVideoRef = useRef<HTMLVideoElement>(null);
  const [isForestVideoPlaying, setIsForestVideoPlaying] = useState(true);
  const [isForestVideoMuted, setIsForestVideoMuted] = useState(true);

  // Background Catalog Video Auto-play State (Section 5: The 2026 Season Catalog)
  const catalogVideoRef = useRef<HTMLVideoElement>(null);
  const [isCatalogVideoPlaying, setIsCatalogVideoPlaying] = useState(true);
  const [isCatalogVideoMuted, setIsCatalogVideoMuted] = useState(true);

  // Carousel refs
  const collectionsScrollRef = useRef<HTMLDivElement>(null);
  const categoriesScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forestVideoRef.current) {
      forestVideoRef.current.play().catch(() => {});
    }
    if (catalogVideoRef.current) {
      catalogVideoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleForestPlayback = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (forestVideoRef.current) {
      if (forestVideoRef.current.paused) {
        forestVideoRef.current.play();
        setIsForestVideoPlaying(true);
      } else {
        forestVideoRef.current.pause();
        setIsForestVideoPlaying(false);
      }
    }
  };

  const toggleForestMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (forestVideoRef.current) {
      forestVideoRef.current.muted = !forestVideoRef.current.muted;
      setIsForestVideoMuted(forestVideoRef.current.muted);
    }
  };

  const toggleCatalogPlayback = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (catalogVideoRef.current) {
      if (catalogVideoRef.current.paused) {
        catalogVideoRef.current.play();
        setIsCatalogVideoPlaying(true);
      } else {
        catalogVideoRef.current.pause();
        setIsCatalogVideoPlaying(false);
      }
    }
  };

  const toggleCatalogMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (catalogVideoRef.current) {
      catalogVideoRef.current.muted = !catalogVideoRef.current.muted;
      setIsCatalogVideoMuted(catalogVideoRef.current.muted);
    }
  };

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Featured collections, with the newly added catalog collections directly after LUMA.
  const COLLECTIONS_LIST: CollectionCardData[] = [
    {
      id: 'luma',
      name: 'LUMA',
      nameVi: 'LUMA',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: 'Natural teak, woven cord, and powder-coated metal for contemporary outdoor living.',
      descriptionVi: 'Gỗ teak tự nhiên, dây đan và kim loại sơn tĩnh điện cho không gian ngoài trời đương đại.',
      image: '/luma/scene-3.webp',
      targetCollection: 'luma',
    },
    {
      id: 'lumino',
      name: 'LUMINO',
      nameVi: 'LUMINO',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: 'Clean, lightweight aluminum seating and dining for modern outdoor spaces.',
      descriptionVi: 'Hệ sản phẩm nhôm gọn nhẹ cho không gian lounge và dining ngoài trời hiện đại.',
      image: '/lumino-profile/scene-2.webp',
      targetCollection: 'lumino',
    },
    {
      id: 'bloom',
      name: 'POLY BLOOM',
      nameVi: 'POLY BLOOM',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: 'Soft, rounded forms in durable molded composite for outdoor living.',
      descriptionVi: 'Dáng cong mềm mại từ composite đúc bền bỉ cho không gian ngoài trời.',
      image: '/poly-bloom/scene-2.webp',
      targetCollection: 'bloom',
    },
    {
      id: 'serenity',
      name: 'SERENITY',
      nameVi: 'SERENITY',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: 'Clean, refined aluminum furniture for peaceful contemporary outdoor living.',
      descriptionVi: 'Nội thất nhôm tinh gọn, thanh lịch cho không gian ngoài trời đương đại an yên.',
      image: '/serenity/catalog-02.jpg',
      targetCollection: 'serenity',
    },
    {
      id: 'coral',
      name: 'CORAL',
      nameVi: 'CORAL',
      badge: 'BEST SELLER',
      badgeVi: 'BÁN CHẠY NHẤT',
      description: 'Transitional woven Solara Fiber in your choice of cream or stone gray.',
      descriptionVi: 'Sợi đan Solara Fiber chuyển tiếp trong lựa chọn màu kem hoặc xám đá.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/coral-hptall-2.jpg',
      targetCollection: 'coral',
    },
    {
      id: 'dana',
      name: 'DANA',
      nameVi: 'DANA',
      description: 'The Dana teak dining chair–elegantly crafted, enduringly comfortable.',
      descriptionVi: 'Ghế ăn gỗ teak Dana – chế tác trang nhã, êm ái bền bỉ qua năm tháng.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/01/Dana-MidCenturyDiningwithTeslinWovenCordSeat-1080.jpg',
      targetCollection: 'dana',
    },
    {
      id: 'forte',
      name: 'FORTE',
      nameVi: 'FORTE',
      description: 'Mid-century woven deep seating collection with Ipe wood accents.',
      descriptionVi: 'Bộ sưu tập sofa sâu dệt thủ công giữa thế kỷ với điểm nhấn gỗ Ipe cao cấp.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/forte-hptall-1.jpg',
      targetCollection: 'forte',
    },
    {
      id: 'foundations',
      name: 'FOUNDATIONS',
      nameVi: 'FOUNDATIONS',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: "B+Open's unified table range in stunning FSC®-certified Ipe or Teak.",
      descriptionVi: 'Hệ bàn đồng bộ từ B+Open với gỗ Ipe hoặc Teak chứng nhận 100% FSC®.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/01/Foundations-MosaicConsole-1080.jpg',
      targetCollection: 'foundations',
    },
    {
      id: 'glow',
      name: 'GLOW',
      nameVi: 'GLOW',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: 'The look of Ipe in a brand new fire table offering from B+Open.',
      descriptionVi: 'Bàn sưởi ấm lửa trại ngoài trời chế tác từ gỗ Ipe thượng hạng của B+Open.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2023/01/glow-tall-slider-2.jpg',
      targetCollection: 'glow',
    },
    {
      id: 'harmony',
      name: 'HARMONY',
      nameVi: 'HARMONY',
      description: 'Contemporary styling meets the finest materials to elevate your outdoor decor.',
      descriptionVi: 'Phong cách đương đại kết hợp cùng những vật liệu tinh tế nhất để nâng tầm cảnh quan.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/harmony-hptall-2.jpg',
      targetCollection: 'harmony',
    },
    {
      id: 'heritage',
      name: 'HERITAGE',
      nameVi: 'HERITAGE',
      badge: 'BEST SELLER',
      badgeVi: 'BÁN CHẠY NHẤT',
      description: 'Formerly Classic Ipe, this collection has traditional cottage styling in Ipe.',
      descriptionVi: 'Bộ sưu tập di sản với phong cách đồng quê Mỹ kinh điển từ gỗ Ipe nguyên khối.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/classic-ipe-hptall-1.jpg',
      targetCollection: 'heritage',
    },
    {
      id: 'inception',
      name: 'INCEPTION',
      nameVi: 'INCEPTION',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: 'Teak and Solara fiber: inspired by mid-century, woven for this century.',
      descriptionVi: 'Gỗ Teak và sợi Solara: cảm hứng giữa thế kỷ, đan dệt cho thế kỷ hiện đại.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/01/Inception-LoungeChairswithBronzeSolaraWovenFramesandTeakAccents-1080.jpg',
      targetCollection: 'inception',
    },
    {
      id: 'innova',
      name: 'INNOVA',
      nameVi: 'INNOVA',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: 'Delightfully new, yet pleasingly familiar: Innova is modern Ipe comfort.',
      descriptionVi: 'Mới mẻ đầy bất ngờ nhưng quen thuộc thanh lịch: Innova mang lại sự êm ái hiện đại.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/01/Innova-TrellisModernLoungeChair-1080.jpg',
      targetCollection: 'innova',
    },
    {
      id: 'jett',
      name: 'JETT',
      nameVi: 'JETT',
      description: 'Sleek styling places Jett firmly in the category of modern masterpieces.',
      descriptionVi: 'Đường nét sắc sảo đưa Jett trở thành kiệt tác kiến trúc hiện đại hàng đầu.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/jett-hptall-1.jpg',
      targetCollection: 'jett',
    },
    {
      id: 'laguna',
      name: 'LAGUNA',
      nameVi: 'LAGUNA',
      description: 'Craftsmanship blends with contemporary styling in FSC®-Certified Ipe.',
      descriptionVi: 'Kỹ nghệ thủ công điêu luyện giao hòa phong cách đương đại trong gỗ Ipe FSC®.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/01/Laguna-DiningArmChair.jpg',
      targetCollection: 'laguna',
    },
    {
      id: 'mix',
      name: 'MIX',
      nameVi: 'MIX',
      description: 'Endulge in the luxury of choice with Mix Ipe sectional and deep seating.',
      descriptionVi: 'Tự do bài trí với hệ sofa module ghép và ghế sâu thư giãn từ gỗ Ipe.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/mix-hptall-1.jpg',
      targetCollection: 'mix',
    },
    {
      id: 'nest',
      name: 'NEST',
      nameVi: 'NEST',
      description: 'Retro cool with casual warmth, Nest envelops you in woven comfort.',
      descriptionVi: 'Cá tính hoài niệm ấm áp, Nest ôm trọn bạn trong sự êm ái của sợi đan tự nhiên.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/nest-hptall-1.jpg',
      targetCollection: 'nest',
    },
    {
      id: 'opal',
      name: 'OPAL',
      nameVi: 'OPAL',
      badge: 'BEST SELLER',
      badgeVi: 'BÁN CHẠY NHẤT',
      description: 'A B+Open jewel, the Opal collection dazzles in any landscape.',
      descriptionVi: 'Viên ngọc quý của B+Open, bộ sưu tập Opal tỏa sáng kiêu hãnh trong mọi cảnh quan.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/opal-hptall-1.jpg',
      targetCollection: 'opal',
    },
    {
      id: 'plume-pillows',
      name: 'PLUME PILLOWS',
      nameVi: 'GỐI ĐỆM PLUME',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: 'The uncommon thread to unforgettable gatherings, Plume pillows.',
      descriptionVi: 'Sợi chỉ dệt nên những cuộc hội ngộ khó quên, gối đệm ngoài trời Plume.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2025/01/Plume-WhitePillows-Lifestyle1-1080.jpg',
      targetCollection: 'plume-pillows',
    },
    {
      id: 'richmond',
      name: 'RICHMOND',
      nameVi: 'RICHMOND',
      description: 'Keep your guests coming back with the relaxed elegance of Richmond.',
      descriptionVi: 'Giữ chân những vị khách quý bằng sự tao nhã và thanh lịch trầm tĩnh của Richmond.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/richmond-hptall-1.jpg',
      targetCollection: 'richmond',
    },
    {
      id: 'savannah',
      name: 'SAVANNAH',
      nameVi: 'SAVANNAH',
      description: 'The FSC®-certified teak Savannah collection is pure Americana.',
      descriptionVi: 'Bộ sưu tập Savannah từ gỗ Teak chứng nhận FSC® mang đậm hơi thở di sản Mỹ.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2023/02/Savannah-SwivelRocker-1080x1350-1.jpg',
      targetCollection: 'savannah',
    },
    {
      id: 'sky',
      name: 'SKY',
      nameVi: 'SKY',
      description: 'The Sky collection brings a fresh, tasteful allure to outdoor living in Ipe wood.',
      descriptionVi: 'Bộ sưu tập Sky mang sức hút thanh tân đầy lôi cuốn đến không gian sống ngoài trời.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/sky-hptall-1.jpg',
      targetCollection: 'sky',
    },
    {
      id: 'sorrento',
      name: 'SORRENTO',
      nameVi: 'SORRENTO',
      badge: 'BEST SELLER',
      badgeVi: 'BÁN CHẠY NHẤT',
      description: 'Palace-scale teak deep seating and dining with the Sorrento collection.',
      descriptionVi: 'Sofa sâu và bàn ăn quy mô dinh thự chế tác từ gỗ Teak với bộ sưu tập Sorrento.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/sorrento-hptall-2.jpg',
      targetCollection: 'sorrento',
    },
    {
      id: 'tempo',
      name: 'TEMPO',
      nameVi: 'TEMPO',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: '12 colorways of all-weather Ultraleather® now available.',
      descriptionVi: '12 sắc màu da Ultraleather® chống chịu mọi thời tiết sẵn sàng cho không gian.',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2023/02/Tempo-SummitCreamLady-1080x1350-1.jpg',
      targetCollection: 'tempo',
    },
  ];

  // 12 Authentic Categories matching official jensenoutdoor.com
  const CATEGORIES_LIST: CategoryCardData[] = [
    {
      id: 'cat-new',
      title: 'NEW',
      titleVi: 'MẪU MỚI',
      subtitle: 'Discover our latest offerings ⇁',
      subtitleVi: 'Khám phá các tuyệt tác mới nhất ⇁',
      label: 'SKY',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/sky-hpsq-1.jpg',
      route: () => onNavigate('furniture'),
    },
    {
      id: 'cat-bestsellers',
      title: 'BEST SELLERS',
      titleVi: 'BÁN CHẠY NHẤT',
      subtitle: 'Our most popular selections ⇁',
      subtitleVi: 'Những lựa chọn được ưa chuộng nhất ⇁',
      label: 'OPAL',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/opal-hpsq-1.jpg',
      route: () => onNavigate('furniture'),
    },
    {
      id: 'cat-lounging',
      title: 'LOUNGING',
      titleVi: 'PHÒNG KHÁCH NGOÀI TRỜI',
      subtitle: 'Comfort on the patio ⇁',
      subtitleVi: 'Êm ái trọn vẹn trên hiên nhà ⇁',
      label: 'MIX',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/mix-hpsq-1.jpg',
      route: () => onNavigate('furniture', { category: 'deep-seating' }),
    },
    {
      id: 'cat-dining',
      title: 'DINING',
      titleVi: 'BÀN ĂN & TIỆC',
      subtitle: 'Elegant outdoor banquet furniture ⇁',
      subtitleVi: 'Nội thất bàn tiệc ngoài trời thanh lịch ⇁',
      label: 'OPAL',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/02/opal-hpsq-2.jpg',
      route: () => onNavigate('furniture', { category: 'dining' }),
    },
    {
      id: 'cat-tables',
      title: 'TABLES',
      titleVi: 'CÁC LOẠI BÀN',
      subtitle: 'Dining, counter, and bar height ⇁',
      subtitleVi: 'Bàn ăn, bàn counter và bàn bar ⇁',
      label: 'SKY',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/sky-hpsq-2.jpg',
      route: () => onNavigate('furniture', { category: 'tables' }),
    },
    {
      id: 'cat-seating',
      title: 'SEATING',
      titleVi: 'CÁC DÒNG GHẾ',
      subtitle: 'Arm, side, bench, and stool ⇁',
      subtitleVi: 'Ghế tay vịn, ghế băng, ghế đẩu ⇁',
      label: 'TOPAZ',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/02/topaz-hpsq-2.jpg',
      route: () => onNavigate('furniture', { category: 'dining' }),
    },
    {
      id: 'cat-deep-seating',
      title: 'DEEP SEATING',
      titleVi: 'SOFA SÂU THƯ GIÃN',
      subtitle: 'Our most comfortable introductions ⇁',
      subtitleVi: 'Những tạo tác êm ái thư thái nhất ⇁',
      label: 'NEST',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/nest-hpsq-1.jpg',
      route: () => onNavigate('furniture', { category: 'deep-seating' }),
    },
    {
      id: 'cat-sectionals',
      title: 'SECTIONALS',
      titleVi: 'SOFA GHÉP MODULE',
      subtitle: 'Modular group seating ⇁',
      subtitleVi: 'Hệ thống ghế ngồi ghép module ⇁',
      label: 'SORRENTO',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/sorrento-hpsq-2.jpg',
      route: () => onNavigate('furniture', { category: 'deep-seating' }),
    },
    {
      id: 'cat-chaises',
      title: 'CHAISE LOUNGES',
      titleVi: 'GHẾ NẰM TẮM NẮNG',
      subtitle: 'Recline in style ⇁',
      subtitleVi: 'Thư giãn ngả lưng kiêu sa ⇁',
      label: 'CORAL',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/02/coral-hpsq-1.jpg',
      route: () => onNavigate('furniture', { category: 'chaises' }),
    },
    {
      id: 'cat-fabrics',
      title: 'OUTDOOR FABRICS',
      titleVi: 'VẢI NGOÀI TRỜI',
      subtitle: 'Sunbrella® Performance ⇁',
      subtitleVi: 'Vải Sunbrella® hiệu năng hàng hải ⇁',
      label: 'LAGUNA',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/02/laguna-hpsq-1.jpg',
      route: () => onNavigate('materials'),
    },
    {
      id: 'cat-accessories',
      title: 'ACCESSORIES',
      titleVi: 'PHỤ KIỆN & BẢO DƯỠNG',
      subtitle: 'Care products, parts, and more ⇁',
      subtitleVi: 'Sản phẩm chăm sóc gỗ, phụ kiện ⇁',
      label: 'CARE PRODUCTS',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/02/care-hpsq-1.jpg',
      route: () => onNavigate('care'),
    },
    {
      id: 'cat-materials',
      title: 'MATERIALS',
      titleVi: 'NGUỒN VẬT LIỆU',
      subtitle: 'Ipe, teak, aluminum, and woven ⇁',
      subtitleVi: 'Gỗ Ipe, Teak, nhôm & sợi đan ⇁',
      label: 'CORAL',
      image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/02/coral-hpsq-2.jpg',
      route: () => onNavigate('materials'),
    },
  ];

  return (
    <div className="space-y-0 bg-[#F8F6F2] text-[#1C1A17] selection:bg-[#9B522E] selection:text-white">
      {/* 1. HERO SLIDER SECTION (8 Seasonal slides matching authentic Smart Slider 3) */}
      <Hero onNavigate={onNavigate} />

      {/* 2. SECTION: DISCOVER OUR COLLECTIONS */}
      <section className="py-14 sm:py-20 lg:py-24 relative border-b border-[#DED9CD] bg-white">
        {/* Section Header matching exact website typography */}
        <div className="text-center max-w-3xl mx-auto px-4 mb-8 sm:mb-12">
          <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[0.14em] text-[#1C1A17] uppercase">
            {isVi ? 'KHÁM PHÁ CÁC BỘ SƯU TẬP' : 'DISCOVER OUR COLLECTIONS'}
          </h3>
          <p className="mt-3">
            <button
              onClick={() => onNavigate('collections')}
              className="inline-flex items-center text-sm sm:text-base uppercase tracking-wider text-[#1C1A17] hover:text-[#9B522E] underline underline-offset-4 font-bold cursor-pointer transition-colors min-h-[40px]"
            >
              {isVi ? 'Xem tất cả bộ sưu tập' : 'Or see them all'}
            </button>
          </p>
        </div>

        {/* Carousel Container with Edge Navigation Chevrons */}
        <div className="relative group/track max-w-[1520px] mx-auto">
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollContainer(collectionsScrollRef, 'left')}
            className="absolute left-2 sm:left-4 top-[40%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-[#1C1A17] border border-[#DED9CD] shadow-md hover:shadow-xl flex items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100"
            aria-label="Previous collections"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollContainer(collectionsScrollRef, 'right')}
            className="absolute right-2 sm:right-4 top-[40%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-[#1C1A17] border border-[#DED9CD] shadow-md hover:shadow-xl flex items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100"
            aria-label="Next collections"
          >
            <ChevronRight className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Horizontal Scrolling Card Track */}
          <div
            ref={collectionsScrollRef}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scroll-smooth px-5 sm:px-14 pb-4 pt-1 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {COLLECTIONS_LIST.map((col) => (
              <div
                key={col.id}
                onClick={() => onNavigate('collections', { collection: col.targetCollection })}
                className="w-[250px] sm:w-[280px] lg:w-[295px] shrink-0 flex flex-col bg-[#F8F6F2] border border-[#DED9CD] rounded-xs overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                {(() => {
                  const catalogCollection = CATALOG_COLLECTIONS.find((item) => item.id === col.targetCollection);
                  const cardName = getCollectionCardName(
                    col.targetCollection,
                    language,
                    isVi ? col.nameVi : col.name,
                  );
                  const cardDescription = catalogCollection
                    ? (isVi && catalogCollection.descriptionVi ? catalogCollection.descriptionVi : catalogCollection.description)
                    : (isVi ? col.descriptionVi : col.description);

                  return (
                    <>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE4D9]">
                  {catalogCollection ? (
                    <InlineEditableImage
                      record="collection"
                      recordId={catalogCollection.id}
                      field="heroImage"
                      value={catalogCollection.heroImage}
                      alt={cardName}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <img
                      src={col.image}
                      alt={col.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  )}
                  {col.badge && (
                    <div className="absolute top-3 right-3 bg-[#1C1A17]/90 backdrop-blur-xs text-white text-[10.5px] uppercase font-bold tracking-wider px-3 py-1 rounded-xs shadow-sm">
                      {isVi ? col.badgeVi : col.badge}
                    </div>
                  )}
                </div>

                {/* Card Info Box */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-sans text-[17px] sm:text-lg font-bold tracking-wider text-[#1C1A17] group-hover:text-[#9B522E] transition-colors uppercase">
                      {catalogCollection ? (
                        <InlineEditableText
                          record="collection"
                          recordId={col.targetCollection}
                          field={isVi ? 'nameVi' : 'name'}
                          value={cardName}
                          as="span"
                          label={isVi ? 'Tên collection tiếng Việt' : 'Collection name'}
                        />
                      ) : (
                        cardName
                      )}
                    </h4>
                    <p className="text-[13.5px] text-[#554C42] mt-1.5 leading-relaxed line-clamp-2">
                      {catalogCollection ? (
                        <InlineEditableText
                          record="collection"
                          recordId={col.targetCollection}
                          field={isVi ? 'descriptionVi' : 'description'}
                          value={cardDescription}
                          as="span"
                          multiline
                          label={isVi ? 'Mô tả collection tiếng Việt' : 'Collection description'}
                        />
                      ) : (
                        cardDescription
                      )}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#DED9CD] flex items-center justify-between text-[12.5px] font-bold text-[#9B522E] uppercase tracking-wider">
                    <span>{isVi ? 'Xem chi tiết bộ sưu tập' : 'View collection'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2]" />
                  </div>
                </div>
                    </>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION: FULL-WIDTH CINEMATIC FOREST VIDEO BANNER */}
      <section className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0D1510]">
        {/* Authentic loop video from jensenoutdoor.com */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={forestVideoRef}
            autoPlay
            loop
            muted={isForestVideoMuted}
            playsInline
            preload="auto"
            poster="https://www.jensenoutdoor.com/wp-content/uploads/2022/06/Sorrento-Canvas-Persimmon-Lifestyle1.jpg"
            className="w-full h-full object-cover object-center scale-101 transition-opacity duration-1000"
          >
            <source src="https://www.jensenoutdoor.com/wp-content/uploads/2023/01/Homepage-5s-Sustainability.mp4" type="video/mp4" />
          </video>
          {/* Scrim Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/70 pointer-events-none" />
        </div>

        {/* Center Content Overlay */}
        <div className="relative z-10 text-center text-white px-5 py-16 sm:py-20 max-w-3xl mx-auto flex flex-col items-center">
          {/* Play Icon Button */}
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="group flex flex-col items-center gap-2 mb-4 sm:mb-5 cursor-pointer min-h-[80px]"
            aria-label="Play documentary video"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/25 backdrop-blur-md border-2 border-white/80 flex items-center justify-center text-white group-hover:bg-[#9B522E] group-hover:border-[#9B522E] group-hover:scale-108 transition-all shadow-2xl">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
            </div>
            <span className="text-[12px] sm:text-[13px] uppercase tracking-[0.22em] font-bold text-white group-hover:text-[#DED9CD] transition-colors">
              {isVi ? 'XEM PHIM TƯ LIỆU' : 'Watch The Film'}
            </span>
          </button>

          {/* Earth / Sustainability Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#737D5A] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#EFECE6]" />
            {isVi ? '100% GỖ RỪNG BOLIVIA CHỨNG NHẬN FSC®' : '100% FSC®-CERTIFIED BOLIVIAN TIMBER'}
          </span>

          {/* Big Bold Headline */}
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[0.06em] text-white leading-tight mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {isVi ? 'TỪ RỪNG XANH BOLIVIA.\nĐẾN KHÔNG GIAN GIA ĐÌNH BẠN.' : 'FROM OUR FOREST. TO YOUR FAMILY.'}
          </h2>

          {/* Subtitle with Air Tone */}
          <p className="text-[13.5px] sm:text-base uppercase tracking-[0.14em] text-[#EFECE6] font-medium mb-6 max-w-xl leading-relaxed">
            {isVi ? 'NỘI THẤT GỖ NGOÀI TRỜI 100% CHỨNG NHẬN FSC®' : 'FSC ® -Certified outdoor wood furniture.'}
          </p>

          {/* Read Our Story Link */}
          <button
            onClick={() => onNavigate('story')}
            className="inline-flex items-center text-[13.5px] sm:text-base uppercase tracking-[0.16em] font-bold text-white hover:text-[#9B522E] underline underline-offset-8 cursor-pointer transition-colors min-h-[44px]"
          >
            {isVi ? 'ĐỌC CÂU CHUYỆN CỦA CHÚNG TÔI' : 'Read Our Story'}
          </button>
        </div>

        {/* Video Controls (Play/Pause & Mute/Unmute) */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/25">
          <button
            onClick={toggleForestPlayback}
            className="text-white hover:text-[#9B522E] p-1.5 transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
            aria-label={isForestVideoPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isForestVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <div className="w-px h-3.5 bg-white/25" />
          <button
            onClick={toggleForestMute}
            className="text-white hover:text-[#9B522E] p-1.5 transition-colors cursor-pointer flex items-center gap-1.5 min-h-[32px]"
            aria-label={isForestVideoMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isForestVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="text-[11px] uppercase font-bold hidden sm:inline text-white/90">
              {isForestVideoMuted ? (isVi ? 'Tắt tiếng' : 'Muted') : (isVi ? 'Bật âm thanh' : 'Sound On')}
            </span>
          </button>
        </div>
      </section>

      {/* 4. SECTION: EXPLORE OUR CATEGORIES */}
      <section className="py-14 sm:py-20 lg:py-24 relative border-b border-[#DED9CD] bg-white">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto px-4 mb-8 sm:mb-12">
          <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[0.14em] text-[#1C1A17] uppercase">
            {isVi ? 'DANH MỤC SẢN PHẨM' : 'EXPLORE OUR CATEGORIES'}
          </h3>
          <p className="mt-3">
            <button
              onClick={() => onNavigate('furniture')}
              className="inline-flex items-center text-sm sm:text-base uppercase tracking-wider text-[#1C1A17] hover:text-[#9B522E] underline underline-offset-4 font-bold cursor-pointer transition-colors min-h-[40px]"
            >
              {isVi ? 'Xem tất cả sản phẩm' : 'Or see them all'}
            </button>
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group/track max-w-[1520px] mx-auto">
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollContainer(categoriesScrollRef, 'left')}
            className="absolute left-2 sm:left-4 top-[40%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-[#1C1A17] border border-[#DED9CD] shadow-md hover:shadow-xl flex items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100"
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollContainer(categoriesScrollRef, 'right')}
            className="absolute right-2 sm:right-4 top-[40%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-[#1C1A17] border border-[#DED9CD] shadow-md hover:shadow-xl flex items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100"
            aria-label="Next categories"
          >
            <ChevronRight className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Horizontal Scrolling Category Track */}
          <div
            ref={categoriesScrollRef}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scroll-smooth px-5 sm:px-14 pb-4 pt-1 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {CATEGORIES_LIST.map((cat) => (
              <div
                key={cat.id}
                onClick={cat.route}
                className="w-[240px] sm:w-[270px] lg:w-[285px] shrink-0 flex flex-col bg-[#F8F6F2] border border-[#DED9CD] rounded-xs overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                {/* Square Image Container */}
                <div className="relative aspect-square overflow-hidden bg-[#EAE4D9]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Top-Right Badge */}
                  <div className="absolute top-3 right-3 bg-[#1C1A17]/90 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-xs shadow-sm">
                    {cat.label}
                  </div>
                </div>

                {/* Card Info Box */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-sans text-[15px] sm:text-base font-bold tracking-wider text-[#1C1A17] group-hover:text-[#9B522E] transition-colors uppercase">
                      {isVi ? cat.titleVi : cat.title}
                    </h4>
                    <p className="text-[13px] text-[#554C42] mt-1.5 leading-relaxed">
                      {isVi ? cat.subtitleVi : cat.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#DED9CD] flex items-center justify-between text-[11.5px] font-bold text-[#9B522E] uppercase tracking-wider">
                    <span>{isVi ? 'Khám phá ngay' : 'Explore'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTION: FULL-WIDTH LUXURY PATIO CATALOG BANNER */}
      <section className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#16120E]">
        {/* Authentic video loop from jensenoutdoor.com */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={catalogVideoRef}
            autoPlay
            loop
            muted={isCatalogVideoMuted}
            playsInline
            preload="auto"
            poster="https://www.jensenoutdoor.com/wp-content/uploads/2022/06/Sorrento-Canvas-Persimmon-Lifestyle1.jpg"
            className="w-full h-full object-cover object-center scale-101 transition-opacity duration-1000"
          >
            <source src="https://www.jensenoutdoor.com/wp-content/uploads/2023/01/2023Products-Homepage-5s.mp4" type="video/mp4" />
          </video>
          {/* Subtle Scrim for Contrast & Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/70 pointer-events-none" />
        </div>

        {/* Center Content Overlay */}
        <div className="relative z-10 text-center text-white px-5 py-16 sm:py-20 max-w-3xl mx-auto flex flex-col items-center">
          {/* Book Icon Button */}
          <button
            onClick={() => setIsLookbookModalOpen(true)}
            className="group flex flex-col items-center gap-2 mb-4 sm:mb-5 cursor-pointer min-h-[80px]"
            aria-label="View 2026 Season Catalog"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/25 backdrop-blur-md border-2 border-white/80 flex items-center justify-center text-white group-hover:bg-[#9B522E] group-hover:border-[#9B522E] group-hover:scale-108 transition-all shadow-2xl">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <span className="text-[12px] sm:text-[13px] uppercase tracking-[0.22em] font-bold text-white group-hover:text-[#DED9CD] transition-colors">
              {isVi ? 'LẬT MỞ CATALOG' : 'Open Lookbook'}
            </span>
          </button>

          {/* Heading */}
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[0.06em] text-white leading-tight mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {isVi ? 'CATALOG MÙA MỚI 2026' : 'THE 2026 SEASON CATALOG'}
          </h2>

          {/* Subtitle */}
          <p className="text-[14px] sm:text-base text-[#EFECE6] font-medium tracking-wide mb-6 max-w-xl leading-relaxed">
            {isVi
              ? 'Lật mở từng trang ấn phẩm mùa mới với những thiết kế ngoại thất gỗ Ipe đỉnh cao.'
              : 'Engage with the pages of our latest brochure.'}
          </p>

          {/* Action Link */}
          <button
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center text-[13.5px] sm:text-base uppercase tracking-[0.16em] font-bold text-white hover:text-[#9B522E] underline underline-offset-8 cursor-pointer transition-colors min-h-[44px]"
          >
            {isVi ? 'XEM TẤT CẢ CATALOG' : 'SEE ALL CATALOGS'}
          </button>
        </div>

        {/* Video Controls (Play/Pause & Mute/Unmute) */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/25">
          <button
            onClick={toggleCatalogPlayback}
            className="text-white hover:text-[#9B522E] p-1.5 transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
            aria-label={isCatalogVideoPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isCatalogVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <div className="w-px h-3.5 bg-white/25" />
          <button
            onClick={toggleCatalogMute}
            className="text-white hover:text-[#9B522E] p-1.5 transition-colors cursor-pointer flex items-center gap-1.5 min-h-[32px]"
            aria-label={isCatalogVideoMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isCatalogVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="text-[11px] uppercase font-bold hidden sm:inline text-white/90">
              {isCatalogVideoMuted ? (isVi ? 'Tắt tiếng' : 'Muted') : (isVi ? 'Bật âm thanh' : 'Sound On')}
            </span>
          </button>
        </div>
      </section>

      {/* 6. SECTION: RESOURCES */}
      <section className="py-14 sm:py-24 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[0.14em] text-[#1C1A17] uppercase">
              {isVi ? 'TƯ LIỆU & DỊCH VỤ' : 'RESOURCES'}
            </h3>
            <p className="text-[14px] sm:text-base text-[#554C42] mt-2 font-medium">
              {isVi ? 'Tìm kiếm những dịch vụ và hỗ trợ quý khách cần.' : "Find what you're looking for."}
            </p>
          </div>

          {/* 3 Authentic Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Card 1: FIND A RETAILER */}
            <div
              onClick={() => onNavigate('how-to-buy')}
              className="group flex flex-col bg-white border border-[#DED9CD] rounded-xs overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE4D9]">
                <img
                  src="https://www.jensenoutdoor.com/wp-content/uploads/2022/02/retailer-hpsq-1.jpg"
                  alt="Find a Retailer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 bg-[#9B522E] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-xs shadow-xs">
                  {isVi ? 'CÁCH MUA HÀNG' : 'HOW TO BUY'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans text-[17px] sm:text-lg font-bold tracking-wider text-[#1C1A17] uppercase group-hover:text-[#9B522E] transition-colors">
                    {isVi ? 'TÌM ĐẠI LÝ BÁN LẺ' : 'FIND A RETAILER'}
                  </h4>
                  <p className="text-[13.5px] text-[#554C42] mt-1.5 leading-relaxed">
                    {isVi ? 'Mua sắm trực tiếp tại các showroom đối tác ⇁' : 'Shop in-store ⇁'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-[13px] font-bold text-[#9B522E] uppercase tracking-wider">
                  <span>{isVi ? 'Tìm kiếm cửa hàng gần bạn' : 'Locate stores'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2]" />
                </div>
              </div>
            </div>

            {/* Card 2: 3D SHOWROOM (WATER ACCENT) */}
            <div
              onClick={() => onNavigate('3d-showroom')}
              className="group flex flex-col bg-white border border-[#DED9CD] rounded-xs overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE4D9]">
                <img
                  src="https://www.jensenoutdoor.com/wp-content/uploads/2022/02/3dshowroom-hpsq-1.jpg"
                  alt="3D Showroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 bg-[#798E9D] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-xs shadow-xs">
                  {isVi ? 'TƯƠNG TÁC 3D' : 'INTERACTIVE 3D'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans text-[17px] sm:text-lg font-bold tracking-wider text-[#1C1A17] uppercase group-hover:text-[#798E9D] transition-colors">
                    {isVi ? 'SHOWROOM 3D THỰC TẾ ẢO' : '3D VIRTUAL SHOWROOM'}
                  </h4>
                  <p className="text-[13.5px] text-[#554C42] mt-1.5 leading-relaxed">
                    {isVi ? 'Tham quan trung tâm thiết kế tương tác 360° ⇁' : 'Tour our Atlanta design center ⇁'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-[13px] font-bold text-[#798E9D] uppercase tracking-wider">
                  <span>{isVi ? 'Khám phá không gian ảo 3D' : 'Enter 3D Tour'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2]" />
                </div>
              </div>
            </div>

            {/* Card 3: HELP CENTER (EARTH ACCENT) */}
            <div
              onClick={() => onNavigate('help-center')}
              className="group flex flex-col bg-white border border-[#DED9CD] rounded-xs overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE4D9]">
                <img
                  src="https://www.jensenoutdoor.com/wp-content/uploads/2022/02/care-hpsq-1.jpg"
                  alt="Help Center"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 bg-[#737D5A] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-xs shadow-xs">
                  {isVi ? 'BẢO DƯỠNG & HỖ TRỢ' : 'CARE & SUPPORT'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans text-[17px] sm:text-lg font-bold tracking-wider text-[#1C1A17] uppercase group-hover:text-[#737D5A] transition-colors">
                    {isVi ? 'TRUNG TÂM HỖ TRỢ' : 'HELP CENTER'}
                  </h4>
                  <p className="text-[13.5px] text-[#554C42] mt-1.5 leading-relaxed">
                    {isVi ? 'Hướng dẫn bảo quản và giải đáp thắc mắc ⇁' : 'What can we help you with today ⇁'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-[13px] font-bold text-[#737D5A] uppercase tracking-wider">
                  <span>{isVi ? 'Xem cẩm nang & hỏi đáp' : 'Visit Help Center'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modals */}
      <StoryVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onReadStory={() => onNavigate('story')}
      />

      <LookbookModal
        isOpen={isLookbookModalOpen}
        onClose={() => setIsLookbookModalOpen(false)}
        onExploreProducts={() => onNavigate('furniture')}
      />

      <CatalogDownloadModal
        isOpen={isCatalogDownloadOpen}
        onClose={() => setIsCatalogDownloadOpen(false)}
      />

      <VirtualShowroomModal
        isOpen={isVirtualShowroomOpen}
        onClose={() => setIsVirtualShowroomOpen(false)}
        onNavigateToShowrooms={() => onNavigate('showrooms')}
      />
    </div>
  );
};
