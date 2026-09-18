import React, { useState, useEffect } from 'react';
import { Collection, Product, PageId } from '../types';
import { FABRIC_SWATCHES } from '../data/furnitureData';
import { useLanguage } from '../context/LanguageContext';
import { formatDimensionsSummary, cleanMm } from '../utils/dimensionUtils';
import { InlineEditableText } from '../components/InlineEditableText';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { InlineEditableImage } from '../components/InlineEditableImage';
import { useCatalogData } from '../context/CatalogDataContext';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Eye,
  Sparkles,
  Download,
  FileText,
  ShieldCheck,
  Compass,
  Layers,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Sun,
  CloudSun,
  ExternalLink,
  Plus,
  Maximize2,
  X,
  LayoutGrid,
  Table,
  Images,
  Ruler,
  Scale,
  Armchair
} from 'lucide-react';

interface GalleryPhoto {
  url: string;
  title: string;
  titleVi: string;
  caption: string;
  captionVi: string;
  category: string;
  categoryVi: string;
}

const COLLECTION_GALLERIES: Record<string, GalleryPhoto[]> = {
  luma: [
    {
      url: '/luma/scene-3.webp',
      title: 'LUMA Outdoor Collection',
      titleVi: 'Không Gian Ngoài Trời LUMA',
      caption: 'The complete LUMA collection of teak, woven cord and powder-coated metal in a tropical garden setting.',
      captionVi: 'Toàn cảnh bộ sưu tập LUMA với gỗ teak, dây đan và kim loại sơn tĩnh điện trong khu vườn nhiệt đới.',
      category: 'Collection Overview',
      categoryVi: 'Toàn Cảnh Bộ Sưu Tập'
    },
    {
      url: '/luma/scene-6.webp',
      title: 'LUMA Armchair in a Garden Terrace',
      titleVi: 'Ghế Bành LUMA Trong Vườn',
      caption: 'Rounded powder-coated aluminum frames, woven cord backs and quick-dry cushions for relaxed outdoor seating.',
      captionVi: 'Khung nhôm sơn tĩnh điện bo tròn, tựa lưng đan dây và đệm thoát nước nhanh cho không gian thư giãn ngoài trời.',
      category: 'Lounge Seating',
      categoryVi: 'Ghế Thư Giãn'
    },
    {
      url: '/luma/scene-11.webp',
      title: 'LUMA Lounge Composition',
      titleVi: 'Không Gian Sofa LUMA',
      caption: 'Armchairs, sofa and coffee table arranged beneath a slatted pergola for contemporary garden living.',
      captionVi: 'Ghế bành, sofa và bàn trà kết hợp dưới giàn pergola nan gỗ cho không gian sân vườn đương đại.',
      category: 'Deep Seating',
      categoryVi: 'Sofa Thư Giãn'
    },
    {
      url: '/luma/scene-15.webp',
      title: 'LUMA Dining on a Contemporary Patio',
      titleVi: 'Không Gian Ăn Uống LUMA',
      caption: 'Teak dining surfaces and woven dining chairs bring lightness and rhythm to a modern patio.',
      captionVi: 'Mặt bàn teak và ghế ăn đan dây tạo nên vẻ nhẹ nhàng, cân bằng cho sân hiên hiện đại.',
      category: 'Dining',
      categoryVi: 'Không Gian Ăn Uống'
    },
    {
      url: '/luma/scene-18.webp',
      title: 'LUMA Dining Table Setting',
      titleVi: 'Bàn Ăn LUMA Trong Không Gian Ngoài Trời',
      caption: 'A complete dining arrangement with teak slat tables and woven chairs for generous outdoor gatherings.',
      captionVi: 'Bố cục bàn ăn hoàn chỉnh với bàn nan teak và ghế đan dây cho những buổi quây quần ngoài trời.',
      category: 'Outdoor Dining',
      categoryVi: 'Bàn Ghế Ngoài Trời'
    },
    {
      url: '/luma/scene-37.webp',
      title: 'LUMA Bar and Bistro Setting',
      titleVi: 'Không Gian Bar LUMA',
      caption: 'Bar-height tables and woven seating designed for relaxed hospitality and garden entertaining.',
      captionVi: 'Bàn bar và ghế đan dây dành cho không gian tiếp khách, nghỉ ngơi và thưởng thức ngoài trời.',
      category: 'Bar & Hospitality',
      categoryVi: 'Bar & Hospitality'
    },
    {
      url: '/luma/scene-41.webp',
      title: 'LUMA Four-Seater Table',
      titleVi: 'Bàn LUMA Liền Ghế 4 Chỗ',
      caption: 'A compact integrated table-and-seat configuration for courtyards, terraces and intimate gardens.',
      captionVi: 'Cấu hình bàn liền ghế gọn gàng cho sân trong, sân hiên và khu vườn có diện tích vừa phải.',
      category: 'Compact Dining',
      categoryVi: 'Bàn Ăn Gọn Gàng'
    }
  ],
  lumino: [
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      title: 'Modern Architectural Courtyard',
      titleVi: 'Sân Trong Biệt Thự Hiện Đại',
      caption: 'Lumino 3-seat deep seating sofa and low-profile cocktail table framing serene outdoor lounge.',
      captionVi: 'Sofa Lumino 3 chỗ ngồi cùng bàn trà thấp tạo nên không gian thư giãn an yên tuyệt đối.',
      category: 'Deep Seating',
      categoryVi: 'Sofa Thư Giãn'
    },
    {
      url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1600&q=80',
      title: 'Sunken Firepit Terrace',
      titleVi: 'Khu Sưởi Ấm Ngoài Trời Sân Vườn',
      caption: 'Lumino lounge chairs nestled around fire feature with heavy timber permanence.',
      captionVi: 'Đôi ghế bành Lumino quây quần bên lò sưởi ấm cúng với độ đầm chắc trăm năm.',
      category: 'Courtyard Living',
      categoryVi: 'Không Gian Sân Vườn'
    },
    {
      url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=80',
      title: 'Hardwood Poolside Chaise Loungers',
      titleVi: 'Cặp Giường Nằm Tắm Nắng Lumino Hồ Bơi',
      caption: 'Multi-position recliners with integrated sliding cocktail trays and discrete wooden wheels.',
      captionVi: 'Giường ngả đa nấc tích hợp khay trượt để ly cocktail và bánh xe gỗ lăn êm ái.',
      category: 'Poolside Leisure',
      categoryVi: 'Hồ Bơi Nghỉ Dưỡng'
    },
    {
      url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80',
      title: 'Architectural Timber Shadowlines',
      titleVi: 'Đường Viền Bóng Đổ Kiến Trúc Nan Gỗ',
      caption: 'Broad 2" solid Ipe timber framework and precision flush joints.',
      captionVi: 'Khung gỗ Ipe nguyên khối dày 5cm với mộng kín phẳng tuyệt đối.',
      category: 'Material Details',
      categoryVi: 'Chất Liệu Chi Tiết'
    },
    {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      title: 'Twilight Coastal Veranda',
      titleVi: 'Hiên Biệt Thự Ven Biển Buổi Chiều Tà',
      caption: 'Engineered to withstand direct sea salt spray, high winds, and intense UV exposure.',
      captionVi: 'Độ bền tự nhiên bất hoại trước hơi muối biển, gió bão và nắng gắt nhiệt đới.',
      category: 'Coastal Living',
      categoryVi: 'Biệt Thự Ven Biển'
    }
  ],
  bloom: [
    {
      url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
      title: 'Resort Cocoon Barrel Lounge',
      titleVi: 'Ghế Thùng Kén Nghỉ Dưỡng Resort',
      caption: 'Organic Solara woven fiber shell resting atop precision-milled Bolivian Ipe timber sled base.',
      captionVi: 'Dáng kén đan sợi Solara mềm mại đặt trên đế trượt gỗ Ipe Bolivia đẽo gọt chuẩn xác.',
      category: 'Organic Modern',
      categoryVi: 'Đường Cong Hữu Cơ'
    },
    {
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
      title: 'Infinity Deck Relaxation',
      titleVi: 'Thư Giãn Bên Hồ Bơi Vô Cực',
      caption: 'Bloom multi-position chaise loungers paired with round woven accent pedestal table.',
      captionVi: 'Ghế tắm nắng ngả lưng Bloom kết hợp cùng bàn trà tròn đế đan sợi tinh mỹ.',
      category: 'Pool Deck',
      categoryVi: 'Sàn Hồ Bơi'
    },
    {
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
      title: 'Hand-Plaited Solara Fiber Texture',
      titleVi: 'Chất Cảm Sợi Đan Solara Viro® Thủ Công',
      caption: 'Over 14 hours of master hand-weaving yielding all-weather UV resilience and breezy comfort.',
      captionVi: 'Hơn 14 giờ đan tay tỉ mỉ của nghệ nhân mang lại độ thoáng mát và kháng nắng mưa bền bỉ.',
      category: 'Master Weaving',
      categoryVi: 'Nghệ Thuật Đan Tay'
    },
    {
      url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1600&q=80',
      title: 'Veranda Alfresco Dining',
      titleVi: 'Bàn Ăn Hiên Nhà Lộng Gió',
      caption: 'Bloom woven armchairs combining ergonomic back curves with smooth wooden touchpoints.',
      captionVi: 'Ghế ăn tay vịn Bloom nâng niu sống lưng cùng tay vịn gỗ mài bóng ấm áp khi chạm.',
      category: 'Alfresco Dining',
      categoryVi: 'Ẩm Thực Ngoài Trời'
    },
    {
      url: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1600&q=80',
      title: 'Sunset Garden Sanctuary',
      titleVi: 'Góc Vườn Bình Yên Dưới Nắng Chiều',
      caption: 'Harmonious blend of warm organic fibers, dark Bolivian timber, and natural lush flora.',
      captionVi: 'Sự giao thoa hoàn mỹ giữa sợi đan tự nhiên, gỗ Ipe trầm và thảm thực vật nhiệt đới.',
      category: 'Garden Sanctuary',
      categoryVi: 'Ốc Đảo Sân Vườn'
    }
  ],
  serenity: [
    {
      url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
      title: 'Linear Fire Table Evening Gathering',
      titleVi: 'Đêm Quây Quần Bên Bàn Lửa Sưởi Tuyến Tính',
      caption: 'Serenity 60" Fire Table with smokeless clean burner surrounded by contoured Adirondack chairs.',
      captionVi: 'Bàn lửa sưởi Serenity không khói tỏa hơi ấm cho bốn chiếc ghế Adirondack êm ái.',
      category: 'Fireside Gathering',
      categoryVi: 'Quây Quần Bên Lửa'
    },
    {
      url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
      title: 'Heritage Garden Bench Under Mature Oaks',
      titleVi: 'Ghế Băng Di Sản Dưới Bóng Mát Cây Cổ Thụ',
      caption: 'Serenity 5ft Garden Bench dished seat profile providing blissful rest without cushions.',
      captionVi: 'Lòng ngồi cong công thái học nâng đỡ êm ru mà không cần dùng đến đệm lót.',
      category: 'Historic Gardens',
      categoryVi: 'Vườn Cảnh Di Sản'
    },
    {
      url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1600&q=80',
      title: 'Steam-Bent Woodcraft & Adirondack Arch',
      titleVi: 'Nghệ Thuật Uốn Nan Bằng Hơi Nước Nóng',
      caption: 'Seven contoured Ipe slats softened by steam, offering ergonomic spinal cradle.',
      captionVi: 'Bảy thanh nan Ipe hấp hơi nước sôi rồi gò định hình ôm ấp nhẹ nhàng bờ lưng.',
      category: 'Steam Bending',
      categoryVi: 'Kỹ Thuật Uốn Hơi Nước'
    },
    {
      url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80',
      title: 'Porch Rocking Chair & Slat Coffee Table',
      titleVi: 'Ghế Bập Bênh Hiên Nhà & Bàn Trà Elip',
      caption: 'Quiet gliding motion engineered with balanced radiused runners for meditative mornings.',
      captionVi: 'Nhịp đưa êm đềm tĩnh lặng cho những tách trà sớm mai ngắm sương giăng trên cỏ.',
      category: 'Porch Leisure',
      categoryVi: 'Hiên Nhà Thư Thái'
    },
    {
      url: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1600&q=80',
      title: 'Platinum Silver Patina Aging',
      titleVi: 'Lớp Màu Bạc Patina Quý Phái Theo Thời Gian',
      caption: 'Un-oiled Ipe timber gracefully developing a silver patina while maintaining structural density.',
      captionVi: 'Gỗ Ipe để tự nhiên chuyển hóa thành sắc bạc ánh kim thanh tao quý phái qua hàng thập kỷ.',
      category: 'Silver Patina',
      categoryVi: 'Màu Bạc Patina'
    }
  ]
};

// Catalog-backed galleries for the imported collection profiles.
COLLECTION_GALLERIES.lumino = [1, 2, 3, 4, 5, 6].map((n) => ({
  url: `/lumino-profile/scene-${n}.webp`,
  title: `Lumino Catalog Setting ${n}`,
  titleVi: `Không Gian Lumino Trong Catalog ${n}`,
  caption: 'Lumino coordinated outdoor furniture in a contemporary shared space.',
  captionVi: 'Không gian nội thất ngoài trời Lumino đồng bộ trong bối cảnh đương đại.',
  category: 'Catalog Setting',
  categoryVi: 'Không Gian Catalog',
}));
COLLECTION_GALLERIES.bloom = [1, 2, 3, 4].map((n) => ({
  url: `/poly-bloom/scene-${n}.webp`,
  title: `POLY BLOOM Catalog Setting ${n}`,
  titleVi: `Không Gian POLY BLOOM Trong Catalog ${n}`,
  caption: 'POLY BLOOM molded composite furniture in a relaxed outdoor setting.',
  captionVi: 'Nội thất composite đúc POLY BLOOM trong không gian ngoài trời thư giãn.',
  category: 'Catalog Setting',
  categoryVi: 'Không Gian Catalog',
}));

interface CollectionDetailPageProps {
  collectionId: string;
  savedProductIds: Set<string>;
  onToggleSave: (product: Product) => void;
  onOpenProductModal: (product: Product) => void;
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string }) => void;
  onOpenCatalogModal?: () => void;
  onSelectCollection?: (colId: string) => void;
}

export const CollectionDetailPage: React.FC<CollectionDetailPageProps> = ({
  collectionId,
  savedProductIds,
  onToggleSave,
  onOpenProductModal,
  onNavigate,
  onOpenCatalogModal,
  onSelectCollection,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const { products, collections } = useCatalogData();

  // Find active collection, default to 'lumino' if not found
  const collection: Collection =
    collections.find((c) => c.id.toLowerCase() === collectionId.toLowerCase()) ||
    collections[0];

  const displayName = isVi && collection.nameVi ? collection.nameVi : collection.name;
  const displayTagline = isVi && collection.taglineVi ? collection.taglineVi : collection.tagline;
  const displayDesc = isVi && collection.descriptionVi ? collection.descriptionVi : collection.description;
  const displayStory = isVi && collection.storyVi ? collection.storyVi : collection.story;
  const displayDesignerBio = isVi && collection.designerBioVi ? collection.designerBioVi : collection.designerBio;
  const displaySpecs = isVi && collection.highlightSpecsVi ? collection.highlightSpecsVi : collection.highlightSpecs;
  const displayMaterial = isVi && collection.primaryMaterialVi ? collection.primaryMaterialVi : collection.primaryMaterial;
  const isPolyBloom = collection.id.toLowerCase() === 'bloom';
  const isCatalogLumino = collection.id.toLowerCase() === 'lumino';

  // Products belonging to this collection
  const collectionProducts = products.filter(
    (p) => p.collection.toLowerCase() === collection.id.toLowerCase()
  );

  // Gallery Photos for this collection
  const baseGalleryPhotos = COLLECTION_GALLERIES[collection.id.toLowerCase()] || [
    {
      url: collection.heroImage,
      title: displayName,
      titleVi: displayName,
      caption: displayTagline,
      captionVi: displayTagline,
      category: 'Architecture',
      categoryVi: 'Kiến Trúc'
    }
  ];
  const galleryPhotos = baseGalleryPhotos.map((photo, index) => ({
    ...photo,
    url: collection.lifestyleImages?.[index] || photo.url,
  }));

  // Gallery interactive states
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [galleryViewMode, setGalleryViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Product catalog view mode: visual grid vs architectural spec sheet table
  const [productViewMode, setProductViewMode] = useState<'grid' | 'table'>('grid');

  // Sub-category filter inside this collection
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');
  // Selected fabric swatch preview
  const [activeFabricId, setActiveFabricId] = useState<string>(FABRIC_SWATCHES[0]?.id || '');

  // Reset active gallery image when collection changes
  useEffect(() => {
    setActiveGalleryIndex(0);
    setLightboxIndex(null);
  }, [collection.id, collections, products]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryPhotos.length - 1));
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null && prev < galleryPhotos.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, galleryPhotos.length]);

  // Gallery navigation handlers
  const handlePrevGallery = () => {
    setActiveGalleryIndex((prev) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1));
  };
  const handleNextGallery = () => {
    setActiveGalleryIndex((prev) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1));
  };

  // Lightbox navigation handlers
  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryPhotos.length - 1));
  };
  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null && prev < galleryPhotos.length - 1 ? prev + 1 : 0));
  };

  // Category translation helper
  const formatCategoryName = (cat: string) => {
    if (isVi) {
      if (cat === 'dining') return 'Bàn & Ghế Ăn';
      if (cat === 'deep-seating') return 'Sofa Thư Giãn';
      if (cat === 'chaises') return 'Giường Hồ Bơi';
      if (cat === 'tables') return 'Bàn Trà & Phụ';
      return cat;
    }
    if (cat === 'dining') return 'Dining';
    if (cat === 'deep-seating') return 'Deep Seating';
    if (cat === 'chaises') return 'Poolside Chaise';
    if (cat === 'tables') return 'Occasional Table';
    return cat;
  };

  // Filtered products
  const filteredProducts = collectionProducts.filter((prod) => {
    if (selectedSubCat === 'all') return true;
    if (selectedSubCat === 'dining') return prod.category === 'dining';
    if (selectedSubCat === 'lounging') return prod.category === 'deep-seating';
    if (selectedSubCat === 'chaises') return prod.category === 'chaises';
    if (selectedSubCat === 'tables') return prod.category === 'tables';
    return true;
  });

  // Other collections for bottom carousel
  const otherCollections = collections.filter((c) => c.id !== collection.id);

  const handleCollectionSwitch = (newId: string) => {
    if (onSelectCollection) {
      onSelectCollection(newId);
    } else {
      onNavigate('collection-detail', { collection: newId });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1A17] min-h-screen animate-in fade-in duration-300">
      
      {/* TOP STICKY BAR: Breadcrumb + Quick Collection Switcher Tabs */}
      <div className="sticky top-[106px] sm:top-[118px] lg:top-[126px] z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 overflow-x-auto">
          {/* Breadcrumb / Back button */}
          <div className="flex items-center gap-2 shrink-0 text-xs text-[#7A6B5F]">
            <button
              onClick={() => onNavigate('collections')}
              className="inline-flex items-center gap-1.5 font-semibold text-[#5C3822] hover:text-[#1C1A17] uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isVi ? 'Tất Cả Bộ Sưu Tập' : 'All Collections'}</span>
            </button>
            <span className="text-[#C4A482]">/</span>
            <span className="font-semibold text-[#1C1A17] uppercase tracking-wider truncate max-w-[160px] sm:max-w-none">
              {displayName}
            </span>
          </div>

          {/* Quick Collection Selector Tabs */}
          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto">
            {collections.map((c) => {
              const cName = isVi && c.nameVi ? c.nameVi.replace('Bộ Sưu Tập ', '') : c.name.replace(' Collection', '');
              const isActive = c.id === collection.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleCollectionSwitch(c.id)}
                  className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#5C3822] text-white shadow-xs'
                      : 'bg-white text-[#6B5E52] hover:bg-[#EAE4D9] hover:text-[#1C1A17] border border-[#EAE3DA]'
                  }`}
                >
                  {cName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION: Grand Architectural Banner */}
      <section className="relative overflow-hidden bg-[#1C1A17] text-white border-b border-[#EAE3DA]">
        {/* Background Image with Cinematic Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <InlineEditableImage
            record="collection"
            recordId={collection.id}
            field="heroImage"
            value={collection.heroImage}
            alt={displayName}
            className="w-full h-full object-cover object-center opacity-45 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17] via-[#1C1A17]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1A17]/85 via-transparent to-[#1C1A17]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 sm:pt-24 sm:pb-20">
          <div className="max-w-3xl space-y-6">
            
            {/* Badges strip */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C4A482]/20 border border-[#C4A482]/40 backdrop-blur-xs text-[#EAD8C2] text-[10px] font-bold uppercase tracking-[0.2em] rounded-xs">
                <Sparkles className="w-3 h-3 text-[#C4A482]" />
                {displayMaterial}
              </span>
              {collection.yearIntroduced && (
                <span className="px-2.5 py-1 bg-white/10 text-white/90 text-[10px] font-semibold uppercase tracking-widest rounded-xs">
                  {collection.yearIntroduced}
                </span>
              )}
              <span className="px-2.5 py-1 bg-white/10 text-white/90 text-[10px] font-semibold uppercase tracking-widest rounded-xs">
                {collection.itemCount} {isVi ? 'Thiết kế di sản' : 'Heirloom Pieces'}
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]">
                <InlineEditableText
                  record="collection"
                  recordId={collection.id}
                  field={isVi ? 'nameVi' : 'name'}
                  value={displayName}
                  as="span"
                  label={isVi ? 'Tên collection tiếng Việt' : 'Collection name'}
                />
              </h1>
              <p className="mt-3 font-serif italic text-lg sm:text-2xl text-[#E5D7C5] font-normal leading-relaxed">
                "<InlineEditableText
                  record="collection"
                  recordId={collection.id}
                  field={isVi ? 'taglineVi' : 'tagline'}
                  value={displayTagline}
                  as="span"
                  label={isVi ? 'Tagline tiếng Việt' : 'Collection tagline'}
                />"
              </p>
            </div>

            {/* Description Summary */}
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl font-light">
              <InlineEditableText
                record="collection"
                recordId={collection.id}
                field={isVi ? 'descriptionVi' : 'description'}
                value={displayDesc}
                as="span"
                multiline
                label={isVi ? 'Mô tả collection tiếng Việt' : 'Collection description'}
              />
            </p>

            {/* Designer Byline */}
            <div className="pt-2 flex items-center gap-3 text-xs text-stone-300 border-t border-white/15">
              <span className="uppercase tracking-widest text-[#C4A482] font-semibold">
                {isVi ? 'Nhà Thiết Kế:' : 'Design Collaboration:'}
              </span>
              <InlineEditableText
                record="collection"
                recordId={collection.id}
                field="designer"
                value={collection.designer}
                as="span"
                className="text-white font-medium"
                label="Collection designer"
              />
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <a
                href="#collection-catalog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C4A482] hover:bg-[#B39371] text-[#1C1A17] text-xs font-bold uppercase tracking-widest rounded-xs transition-colors shadow-md cursor-pointer"
              >
                <span>{isVi ? `Xem Các Mẫu Thiết Kế (${collectionProducts.length})` : `Explore Pieces (${collectionProducts.length})`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#collection-gallery"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-semibold uppercase tracking-wider rounded-xs backdrop-blur-xs transition-colors cursor-pointer"
              >
                <Images className="w-3.5 h-3.5 text-[#C4A482]" />
                <span>{isVi ? `Gallery Phối Cảnh (${galleryPhotos.length})` : `Photo Gallery (${galleryPhotos.length})`}</span>
              </a>

              {onOpenCatalogModal && (
                <button
                  onClick={onOpenCatalogModal}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs font-semibold uppercase tracking-wider rounded-xs backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#C4A482]" />
                  <span>{isVi ? 'Tải Lookbook (PDF)' : 'Download Lookbook'}</span>
                </button>
              )}

              <button
                onClick={() => onNavigate('trade')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs font-semibold uppercase tracking-wider rounded-xs backdrop-blur-xs transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#C4A482]" />
                <span>{isVi ? 'Tài Liệu CAD & BIM' : 'CAD & BIM Specs'}</span>
              </button>

              <button
                onClick={() => onNavigate('showrooms')}
                className="inline-flex items-center gap-2 px-5 py-3 text-stone-300 hover:text-white text-xs font-semibold uppercase tracking-wider underline underline-offset-4 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{isVi ? 'Tìm Showroom Trưng Bày' : 'Find a Showroom'}</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HEIRLOOM ATTRIBUTES BAR: Engineering & Timber Credentials */}
      <section className="bg-white border-b border-[#EAE3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#EAE3DA]">
            
            <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pr-4">
              <div className="w-10 h-10 rounded-xs bg-[#FAF7F2] border border-[#EAE3DA] flex items-center justify-center shrink-0 text-[#5C3822]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-[#8C5535] font-semibold uppercase tracking-widest">
                  {isPolyBloom ? (isVi ? 'Vật Liệu' : 'Material') : isCatalogLumino ? (isVi ? 'Vật Liệu Khung' : 'Frame Material') : (isVi ? 'Nguồn Gỗ' : 'Timber Origin')}
                </div>
                <div className="text-sm font-serif font-bold text-[#1C1A17] mt-0.5">
                  {isPolyBloom ? 'Molded FRP composite' : isCatalogLumino ? 'Powder-coated aluminum' : '100% FSC® Pure Ipe'}
                </div>
                <div className="text-[11px] text-[#7A6B5F]">
                  {isPolyBloom ? (isVi ? 'Bề mặt ổn định tia UV' : 'UV-stabilized surface') : isCatalogLumino ? (isVi ? 'Nhẹ, bền và chống gỉ' : 'Lightweight and rust-resistant') : (isVi ? 'Rừng khô nhiệt đới Bolivia' : 'Chiquitania Dry Forests')}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:px-4">
              <div className="w-10 h-10 rounded-xs bg-[#FAF7F2] border border-[#EAE3DA] flex items-center justify-center shrink-0 text-[#5C3822]">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-[#8C5535] font-semibold uppercase tracking-widest">
                  {isPolyBloom ? (isVi ? 'Bề Mặt' : 'Surface') : isCatalogLumino ? (isVi ? 'Đệm Ngoài Trời' : 'Outdoor Comfort') : (isVi ? 'Độ Cứng Janka' : 'Janka Hardness')}
                </div>
                <div className="text-sm font-serif font-bold text-[#1C1A17] mt-0.5">
                  {isPolyBloom ? (isVi ? 'Composite không xốp' : 'Non-porous composite') : isCatalogLumino ? (isVi ? 'Mút thoát nước nhanh' : 'Quick-dry foam') : '3,680 lbf'}
                </div>
                <div className="text-[11px] text-[#7A6B5F]">
                  {isPolyBloom ? (isVi ? 'Chống thấm nước và nấm mốc' : 'Resists water and mold growth') : isCatalogLumino ? (isVi ? 'Vải ngoài trời tiêu chuẩn nhà máy' : 'Factory-standard outdoor fabric') : (isVi ? 'Gấp 3 lần Teak, kháng trầy xước' : '3x harder than Teak timber')}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:px-4">
              <div className="w-10 h-10 rounded-xs bg-[#FAF7F2] border border-[#EAE3DA] flex items-center justify-center shrink-0 text-[#5C3822]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-[#8C5535] font-semibold uppercase tracking-widest">
                  {isPolyBloom ? (isVi ? 'Kết Cấu' : 'Construction') : isCatalogLumino ? (isVi ? 'Ngôn Ngữ Thiết Kế' : 'Design Language') : (isVi ? 'Kết Cấu Mộc' : 'Artisan Joinery')}
                </div>
                <div className="text-sm font-serif font-bold text-[#1C1A17] mt-0.5">
                  {isPolyBloom ? (isVi ? 'Đúc liền mạch' : 'Seamless molded form') : isCatalogLumino ? (isVi ? 'Nan tuyến tính' : 'Linear slatted surfaces') : 'Mortise & Tenon'}
                </div>
                <div className="text-[11px] text-[#7A6B5F]">
                  {isPolyBloom ? (isVi ? 'Tỷ lệ mềm mại, bo tròn' : 'Soft, rounded proportions') : isCatalogLumino ? (isVi ? 'Đường nét gọn và hiện đại' : 'Clean, modern proportions') : (isVi ? 'Mộng gỗ kín âm & Inox 316' : 'Blind joins & 316 Stainless')}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-4">
              <div className="w-10 h-10 rounded-xs bg-[#FAF7F2] border border-[#EAE3DA] flex items-center justify-center shrink-0 text-[#5C3822]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-[#8C5535] font-semibold uppercase tracking-widest">
                  {isPolyBloom || isCatalogLumino ? (isVi ? 'Tùy Chỉnh Dự Án' : 'Project Options') : (isVi ? 'Bảo Hành Gia Bảo' : 'Heirloom Warranty')}
                </div>
                <div className="text-sm font-serif font-bold text-[#1C1A17] mt-0.5">
                  {isPolyBloom || isCatalogLumino ? (isVi ? 'Màu & vải tùy chọn' : 'Custom colors & fabrics') : '10-Year Framework'}
                </div>
                <div className="text-[11px] text-[#7A6B5F]">
                  {isPolyBloom || isCatalogLumino ? (isVi ? 'Theo yêu cầu từng dự án' : 'Configured per project') : (isVi ? 'Độ bền tự nhiên vượt 40 năm' : 'Natural lifespan 40+ years')}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DEDICATED COLLECTION IMAGE GALLERY (LIFESTYLE & ARCHITECTURE) */}
      <section id="collection-gallery" className="py-16 sm:py-24 bg-[#F5F0EB] border-b border-[#EAE3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Gallery Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C5535]">
                  {isVi ? 'Thư Viện Hình Ảnh Bộ Sưu Tập' : 'Collection Image Gallery'}
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#5C3822]/10 text-[#5C3822] rounded-xs">
                  {galleryPhotos.length} {isVi ? 'Phối Cảnh' : 'Lifestyle Views'}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light tracking-tight">
                {isVi ? `Phối Cảnh Không Gian & Chi Tiết ${displayName}` : `${displayName} In Situ & Architecture Gallery`}
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6B5F] mt-1 max-w-2xl">
                {isVi
                  ? collection.id.toLowerCase() === 'luma'
                    ? `Hình ảnh bộ sưu tập ${displayName} từ catalog 2026, với các không gian lounge, dining và bar ngoài trời.`
                    : `Hình ảnh thực tế bộ sưu tập ${displayName} tại các công trình biệt thự cao cấp, hiên nhà nghỉ dưỡng và cận cảnh nghệ thuật gia công mộc Ipe Bolivia.`
                  : collection.id.toLowerCase() === 'luma'
                    ? `LUMA collection imagery from the 2026 catalog, spanning outdoor lounge, dining and bar settings.`
                    : `Real-world architectural settings of ${displayName} across coastal estates, veranda sanctuaries, and precision craftsmanship details.`}
              </p>
            </div>

          </div>

          {/* Carousel / Featured Cinema Mode */}
          {galleryViewMode === 'carousel' && (
            <div className="space-y-4">
              {/* Main Feature Image Stage */}
              <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] bg-[#1C1A17] rounded-xs overflow-hidden border border-[#EAE3DA] shadow-md group">
                <InlineEditableImage
                  record="collection"
                  recordId={collection.id}
                  field="lifestyleImages"
                  arrayIndex={activeGalleryIndex}
                  arrayField="lifestyleImages"
                  arrayValues={collection.lifestyleImages || []}
                  value={galleryPhotos[activeGalleryIndex].url}
                  alt={isVi ? galleryPhotos[activeGalleryIndex].titleVi : galleryPhotos[activeGalleryIndex].title}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out cursor-pointer group-hover:scale-102"
                />

                {/* Top Overlay: Counter & Lightbox Expand Button */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none">
                  <div className="pointer-events-auto bg-[#1C1A17]/80 backdrop-blur-xs text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xs border border-white/20">
                    <span>{isVi ? 'Ảnh' : 'Photo'} {activeGalleryIndex + 1} / {galleryPhotos.length}</span>
                  </div>

                  <button
                    onClick={() => setLightboxIndex(activeGalleryIndex)}
                    className="pointer-events-auto flex items-center gap-1.5 bg-[#1C1A17]/80 hover:bg-[#1C1A17] text-white px-3 py-1.5 rounded-xs border border-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs transition-colors cursor-pointer"
                    title={isVi ? 'Xem toàn màn hình' : 'Expand Fullscreen'}
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#C4A482]" />
                    <span className="hidden sm:inline">{isVi ? 'Phóng To' : 'Fullscreen'}</span>
                  </button>
                </div>

                {/* Left / Right Navigation Arrows */}
                <button
                  onClick={handlePrevGallery}
                  aria-label="Previous photo"
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1A17]/70 hover:bg-[#1C1A17] text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer shadow-lg border border-white/20"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={handleNextGallery}
                  aria-label="Next photo"
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1A17]/70 hover:bg-[#1C1A17] text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer shadow-lg border border-white/20"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Bottom Caption Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6 text-white pointer-events-auto">
                  <div className="max-w-3xl">
                    <span className="inline-block px-2.5 py-0.5 bg-[#C4A482] text-[#1C1A17] text-[10px] uppercase font-bold tracking-widest rounded-xs mb-1.5">
                      {isVi ? galleryPhotos[activeGalleryIndex].categoryVi : galleryPhotos[activeGalleryIndex].category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-2xl font-normal text-white">
                      {isVi ? galleryPhotos[activeGalleryIndex].titleVi : galleryPhotos[activeGalleryIndex].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 mt-1 font-light line-clamp-2">
                      {isVi ? galleryPhotos[activeGalleryIndex].captionVi : galleryPhotos[activeGalleryIndex].caption}
                    </p>
                  </div>
                </div>
              </div>

              {/* Thumbnails Filmstrip */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {galleryPhotos.map((photo, idx) => {
                  const isActive = activeGalleryIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative aspect-[16/10] sm:aspect-[16/9] rounded-xs overflow-hidden border-2 transition-all cursor-pointer group ${
                        isActive
                          ? 'border-[#5C3822] ring-2 ring-[#5C3822]/40 shadow-sm scale-102'
                          : 'border-[#EAE3DA] opacity-65 hover:opacity-100 hover:border-[#8C5535]'
                      }`}
                    >
                      <InlineEditableImage
                        record="collection"
                        recordId={collection.id}
                        field="lifestyleImages"
                        arrayIndex={idx}
                        arrayField="lifestyleImages"
                        arrayValues={collection.lifestyleImages || []}
                        value={photo.url}
                        alt={isVi ? photo.titleVi : photo.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] font-mono px-1 rounded-xs">
                        {idx + 1}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Photo Grid Mode */}
          {galleryViewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group bg-white border border-[#EAE3DA] rounded-xs overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between hover:border-[#C4A482]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1C1A17]">
                    <InlineEditableImage
                      record="collection"
                      recordId={collection.id}
                      field="lifestyleImages"
                      arrayIndex={idx}
                      arrayField="lifestyleImages"
                      arrayValues={collection.lifestyleImages || []}
                      value={photo.url}
                      alt={isVi ? photo.titleVi : photo.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#1C1A17]/85 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                      {isVi ? photo.categoryVi : photo.category}
                    </div>
                    <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-[#1C1A17] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-base text-[#1C1A17] group-hover:text-[#5C3822] transition-colors font-medium">
                        {isVi ? photo.titleVi : photo.title}
                      </h4>
                      <p className="text-xs text-[#7A6B5F] mt-1 leading-relaxed">
                        {isVi ? photo.captionVi : photo.caption}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-[#EAE3DA] flex items-center justify-between text-[11px] font-semibold text-[#5C3822]">
                      <span>{isVi ? 'Phóng to ảnh' : 'View full size'}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* LIGHTBOX FULLSCREEN MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-[#C4A482] font-semibold">
                {displayName} Gallery
              </span>
              <span className="text-xs text-stone-400">
                {lightboxIndex + 1} / {galleryPhotos.length}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Đóng (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Photo Display */}
          <div className="relative flex-1 flex items-center justify-center p-2 sm:p-4" onClick={(e) => e.stopPropagation()}>
            <InlineEditableImage
              record="collection"
              recordId={collection.id}
              field="lifestyleImages"
              arrayIndex={lightboxIndex}
              arrayField="lifestyleImages"
              arrayValues={collection.lifestyleImages || []}
              value={galleryPhotos[lightboxIndex].url}
              alt={isVi ? galleryPhotos[lightboxIndex].titleVi : galleryPhotos[lightboxIndex].title}
              className="max-w-full max-h-[78vh] object-contain rounded-xs shadow-2xl"
            />

            {/* Lightbox Nav Buttons */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer border border-white/20"
              title="Ảnh trước (Mũi tên trái)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextLightbox}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer border border-white/20"
              title="Ảnh tiếp theo (Mũi tên phải)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption in Lightbox */}
          <div className="max-w-3xl mx-auto text-center text-white pb-2" onClick={(e) => e.stopPropagation()}>
            <div className="text-sm sm:text-base font-serif font-medium text-[#EAD8C2]">
              {isVi ? galleryPhotos[lightboxIndex].titleVi : galleryPhotos[lightboxIndex].title}
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              {isVi ? galleryPhotos[lightboxIndex].captionVi : galleryPhotos[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}

      {/* 5. PIECES IN THIS COLLECTION (COMPLETE PRODUCT LIST & SPECS) */}
      <section id="collection-catalog" className="py-16 sm:py-24 bg-white border-b border-[#EAE3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C5535]">
                  {isVi ? 'Danh Mục Chi Tiết Toàn Bộ Sản Phẩm' : 'Complete Pieces Catalog'}
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#5C3822] text-white rounded-xs">
                  {collectionProducts.length} {isVi ? 'Món Thiết Kế' : 'Pieces'}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light tracking-tight">
                {isVi ? `Tất Cả Các Món Trong Bộ Sưu Tập ${displayName}` : `All ${displayName} Pieces (${collectionProducts.length})`}
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6B5F] mt-1 max-w-2xl">
                {isVi
                  ? 'Danh sách toàn bộ các sản phẩm trong bộ sưu tập, thể hiện chi tiết hình ảnh thumbnail, tên sản phẩm và kích thước tiêu chuẩn.'
                  : 'Complete inventory of all collection pieces with high-res thumbnails, product names, and architectural dimensions.'}
              </p>
            </div>

            {/* Layout Mode Switcher (Grid vs Architectural Spec Table) */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 p-1 bg-[#FAF8F5] border border-[#EAE3DA] rounded-xs shadow-2xs">
                <button
                  onClick={() => setProductViewMode('grid')}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                    productViewMode === 'grid'
                      ? 'bg-[#5C3822] text-white shadow-xs'
                      : 'text-[#6B5E52] hover:text-[#1C1A17]'
                  }`}
                  title={isVi ? 'Xem dạng lưới sản phẩm' : 'Grid View'}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Lưới Sản Phẩm' : 'Cards'}</span>
                </button>
                <button
                  onClick={() => setProductViewMode('table')}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                    productViewMode === 'table'
                      ? 'bg-[#5C3822] text-white shadow-xs'
                      : 'text-[#6B5E52] hover:text-[#1C1A17]'
                  }`}
                  title={isVi ? 'Xem bảng thông số kỹ thuật' : 'Spec Table View'}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Bảng Kỹ Thuật' : 'Spec Table'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sub-Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 border-b border-[#EAE3DA]">
            {[
              { id: 'all', labelEn: `All Pieces (${collectionProducts.length})`, labelVi: `Tất Cả Mẫu (${collectionProducts.length})` },
              { id: 'dining', labelEn: 'Dining', labelVi: 'Bàn & Ghế Ăn' },
              { id: 'lounging', labelEn: 'Lounging', labelVi: 'Sofa & Thư Giãn' },
              { id: 'chaises', labelEn: 'Poolside', labelVi: 'Hồ Bơi & Giường Nằm' },
              { id: 'tables', labelEn: 'Tables', labelVi: 'Bàn Trà & Phụ' },
            ].map((tab) => {
              const count = tab.id === 'all'
                ? collectionProducts.length
                : collectionProducts.filter((p) => {
                    if (tab.id === 'dining') return p.category === 'dining';
                    if (tab.id === 'lounging') return p.category === 'deep-seating';
                    if (tab.id === 'chaises') return p.category === 'chaises';
                    if (tab.id === 'tables') return p.category === 'tables';
                    return true;
                  }).length;

              if (tab.id !== 'all' && count === 0) return null;

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSubCat(tab.id)}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shrink-0 ${
                    selectedSubCat === tab.id
                      ? 'bg-[#5C3822] text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-[#6B5E52] hover:bg-[#EAE4D9] hover:text-[#1C1A17]'
                  }`}
                >
                  {isVi ? tab.labelVi : tab.labelEn} {tab.id !== 'all' && `(${count})`}
                </button>
              );
            })}
          </div>

          {/* VIEW 1: PRODUCTS GRID WITH THUMBNAIL, NAME, AND DIMENSIONS */}
          {productViewMode === 'grid' && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => {
                const isSaved = savedProductIds.has(product.id);
                const prodName = isVi && product.nameVi ? product.nameVi : product.name;
                const prodMaterial = isVi && product.materialVi ? product.materialVi : product.material;

                return (
                  <div
                    key={product.id}
                    className="group bg-[#FAF8F5] border border-[#EAE3DA] rounded-xs overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:border-[#C4A482]"
                  >
                    {/* 1. Image Thumbnail Area */}
                    <div
                      className={`relative aspect-[4/3] overflow-hidden cursor-pointer ${
                        collection.id.toLowerCase() === 'luma' ? 'bg-white' : 'bg-[#F3EFE9]'
                      }`}
                      onClick={() => onOpenProductModal(product)}
                    >
                      <InlineEditableImage
                        record="product"
                        recordId={product.id}
                        field="imageUrl"
                        value={product.imageUrl}
                        alt={prodName}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80';
                        }}
                        className={`w-full h-full object-center group-hover:scale-105 transition-transform duration-700 ease-out ${
                          collection.id.toLowerCase() === 'luma'
                            ? 'object-contain scale-[0.88] group-hover:scale-[0.92]'
                            : 'object-cover'
                        }`}
                      />

                      {/* LUMA catalog cutouts are intentionally presented cleanly without an overlay badge. */}
                      {collection.id.toLowerCase() !== 'luma' && (
                        <div className="absolute top-2.5 left-2.5 bg-[#1C1A17]/85 backdrop-blur-xs text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs">
                          {isVi ? '100% FSC® Ipe' : 'FSC® 100%'}
                        </div>
                      )}

                      {/* Hover Inspect Overlay Prompt */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="px-3 py-1.5 bg-white/90 text-[#1C1A17] text-xs font-semibold uppercase tracking-wider rounded-xs backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isVi ? 'Xem Chi Tiết' : 'Quick View'}</span>
                        </span>
                      </div>
                    </div>

                    {/* 2. Product Information & Dimensions */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-[#8C5535] font-semibold uppercase tracking-widest">
                          <span>{product.sku}</span>
                          <span>{prodMaterial}</span>
                        </div>
                        
                        {/* Product Name */}
                        <h4
                          onClick={() => onOpenProductModal(product)}
                          className="font-serif text-base text-[#1C1A17] group-hover:text-[#5C3822] transition-colors line-clamp-2 mt-1 font-medium cursor-pointer"
                        >
                          {prodName}
                        </h4>
                      </div>

                      {/* UNIFIED ARCHITECTURAL SPEC & SELECT BLOCK */}
                      <div className="mt-3.5 p-2.5 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs flex items-center justify-between gap-2.5 transition-colors hover:border-[#C4A482]">
                        {/* Technical Dimensions (Clickable to view details) */}
                        <div
                          onClick={() => onOpenProductModal(product)}
                          className="flex-1 min-w-0 cursor-pointer group/dim"
                          title={isVi ? 'Nhấp để xem chi tiết thông số kỹ thuật' : 'Click to view technical specifications'}
                        >
                          <div className="flex items-center gap-1 text-[10px] uppercase font-semibold text-[#8C7A6B] tracking-wider mb-0.5">
                            <Ruler className="w-3 h-3 text-[#8C5535] shrink-0" />
                            <span>{isVi ? 'Kích Thước (mm)' : 'Dimensions (mm)'}</span>
                          </div>
                          <div className="text-xs font-semibold text-[#1C1A17] tracking-tight truncate group-hover/dim:text-[#5C3822] transition-colors">
                            {formatDimensionsSummary(product.dimensions)}
                          </div>
                          {product.dimensions.seatHeight && (
                            <div className="text-[11px] text-[#7A6B5F] mt-0.5 truncate">
                              {isVi ? 'Chiều cao ngồi: ' : 'Seat Height: '}
                              <span className="font-medium text-[#2E2823]">{cleanMm(product.dimensions.seatHeight)}</span>
                            </div>
                          )}
                        </div>

                        {/* Selection Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(product);
                          }}
                          className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                            isSaved
                              ? 'bg-[#5C3822] text-white shadow-xs hover:bg-[#472B1A]'
                              : 'bg-white hover:bg-[#5C3822] text-[#5C3822] hover:text-white border border-[#EAE3DA] hover:border-[#5C3822] shadow-2xs'
                          }`}
                          title={isSaved ? (isVi ? 'Đã lưu vào Spec Sheet (Nhấp để bỏ chọn)' : 'Saved to Spec Sheet (Click to remove)') : (isVi ? 'Chọn vào Spec Sheet' : 'Add to Spec Sheet')}
                        >
                          {isSaved ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>{isVi ? 'Đã Chọn' : 'Selected'}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>{isVi ? 'Chọn' : 'Select'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW 2: ARCHITECTURAL SPEC TABLE (THUMBNAIL, NAME, DIMENSIONS, SEAT HEIGHT, WEIGHT) */}
          {productViewMode === 'table' && filteredProducts.length > 0 && (
            <div className="border border-[#EAE3DA] rounded-xs overflow-hidden bg-[#FAF8F5] shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#1C1A17]">
                  <thead className="bg-[#EAE4D9] text-[#5C3822] uppercase tracking-wider font-semibold border-b border-[#EAE3DA]">
                    <tr>
                      <th className="py-3 px-4 w-20">{isVi ? 'Hình Ảnh' : 'Thumbnail'}</th>
                      <th className="py-3 px-4 min-w-[200px]">{isVi ? 'Tên Sản Phẩm & SKU' : 'Product Name & SKU'}</th>
                      <th className="py-3 px-4 min-w-[120px]">{isVi ? 'Phân Loại' : 'Category'}</th>
                      <th className="py-3 px-4 min-w-[220px]">{isVi ? 'Kích Thước (mm)' : 'Dimensions (mm)'}</th>
                      <th className="py-3 px-4 min-w-[130px]">{isVi ? 'Chiều Cao Ngồi' : 'Seat Height'}</th>
                      <th className="py-3 px-4 text-right min-w-[140px]">{isVi ? 'Thao Tác' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE3DA] bg-white">
                    {filteredProducts.map((product) => {
                      const isSaved = savedProductIds.has(product.id);
                      const prodName = isVi && product.nameVi ? product.nameVi : product.name;
                      const prodCategory = formatCategoryName(product.category);

                      return (
                        <tr key={product.id} className="hover:bg-[#FAF8F5] transition-colors">
                          {/* Thumbnail */}
                          <td className="py-3 px-4">
                            <div
                              onClick={() => onOpenProductModal(product)}
                              className="w-16 h-12 bg-[#F3EFE9] rounded-xs overflow-hidden border border-[#EAE3DA] cursor-pointer group"
                            >
                              <InlineEditableImage
                                record="product"
                                recordId={product.id}
                                field="imageUrl"
                                value={product.imageUrl}
                                alt={prodName}
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80';
                                }}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          </td>

                          {/* Product Name & SKU */}
                          <td className="py-3 px-4">
                            <div
                              onClick={() => onOpenProductModal(product)}
                              className="font-serif text-sm font-semibold text-[#1C1A17] hover:text-[#5C3822] cursor-pointer"
                            >
                              {prodName}
                            </div>
                            <div className="text-[10px] text-[#8C5535] font-mono mt-0.5">
                              {product.sku} • {product.collection.toUpperCase()}
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs text-[11px] text-[#6B5E52] uppercase font-semibold tracking-wider">
                              {prodCategory}
                            </span>
                          </td>

                          {/* Dimensions (W x D x H mm) */}
                          <td className="py-3 px-4">
                            <div className="font-mono text-xs font-semibold text-[#1C1A17]">
                              {formatDimensionsSummary(product.dimensions)}
                            </div>
                          </td>

                          {/* Seat Height */}
                          <td className="py-3 px-4 font-mono text-xs text-[#6B5E52]">
                            {product.dimensions.seatHeight ? cleanMm(product.dimensions.seatHeight) : '—'}
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onOpenProductModal(product)}
                                className="px-2.5 py-1.5 bg-[#5C3822] hover:bg-[#2A1D15] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
                                title={isVi ? 'Xem thông số' : 'View Specs'}
                              >
                                <Eye className="w-3 h-3" />
                                <span className="hidden sm:inline">{isVi ? 'Chi Tiết' : 'Specs'}</span>
                              </button>

                              <button
                                onClick={() => onToggleSave(product)}
                                className={`p-1.5 border rounded-xs transition-colors cursor-pointer ${
                                  isSaved
                                    ? 'border-[#5C3822] bg-[#5C3822]/10 text-[#5C3822]'
                                    : 'border-[#EAE3DA] bg-white text-[#6B5E52] hover:text-[#1C1A17]'
                                }`}
                                title={isSaved ? (isVi ? 'Bỏ lưu' : 'Remove') : (isVi ? 'Lưu vào Spec Sheet' : 'Add to Spec')}
                              >
                                {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="p-12 text-center bg-[#FAF8F5] border border-dashed border-[#EAE3DA] rounded-xs">
              <p className="text-sm text-[#7A6B5F]">
                {isVi ? 'Không có sản phẩm nào thuộc phân mục này.' : 'No products found under this category filter.'}
              </p>
              <button
                onClick={() => setSelectedSubCat('all')}
                className="mt-3 text-xs uppercase tracking-wider font-semibold text-[#5C3822] underline underline-offset-4 cursor-pointer"
              >
                {isVi ? 'Xem tất cả sản phẩm' : 'View all pieces'}
              </button>
            </div>
          )}

          {/* Quick Filter In Catalog Link & Spec Notice */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#8C5535] shrink-0" />
              <div className="text-xs text-[#6B5E52]">
                <span className="font-semibold text-[#1C1A17] block">
                  {isVi ? 'Tài Liệu Kỹ Thuật CAD, 3D SketchUp & Revit Đã Sẵn Sàng' : 'Architectural CAD, 3D SketchUp & Revit Models Available'}
                </span>
                <span>
                  {isVi
                    ? `Dành riêng cho giới kiến trúc sư và nhà thiết kế nội thất chỉ định bộ sưu tập ${displayName}.`
                    : `Comprehensive BIM symbols and tear sheets for architects specifying ${displayName}.`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigate('trade')}
                className="px-4 py-2.5 bg-[#5C3822] hover:bg-[#2A1D15] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                {isVi ? 'Đăng Ký Spec Pro' : 'Trade Spec Portal'}
              </button>
              <button
                onClick={() => onNavigate('furniture', { collection: collection.id })}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#EAE4D9] text-[#2A1D15] border border-[#EAE3DA] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                <span>{isVi ? `Lọc Trong Toàn Bộ Catalog` : `Filter in Full Catalog`}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CURATED SIGNATURE ENSEMBLES (BESPOKE PATIO SETS) */}
      {collection.curatedEnsembles && collection.curatedEnsembles.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE3DA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C5535] block mb-1">
                {isVi ? 'Giải Pháp Không Gian Trọn Vẹn' : 'Curated Spatial Settings'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light tracking-tight">
                {isVi ? 'Bộ Phối Cảnh Không Gian Tiêu Biểu' : 'Signature Curated Arrangements'}
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6B5F] mt-2">
                {isVi
                  ? 'Được kiến tạo sẵn bởi đội ngũ chuyên gia cảnh quan của B+Open, tối ưu hóa công năng và tỷ lệ không gian hiên nhà.'
                  : 'Engineered by our in-house landscape team to optimize clearance, flow, and visual cadence.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collection.curatedEnsembles.map((ens) => {
                const ensName = isVi && ens.nameVi ? ens.nameVi : ens.name;
                const ensTagline = isVi && ens.taglineVi ? ens.taglineVi : ens.tagline;
                const ensSpace = isVi && ens.idealSpaceVi ? ens.idealSpaceVi : ens.idealSpace;

                return (
                  <div
                    key={ens.id}
                    className="bg-white border border-[#EAE3DA] rounded-xs overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE4D9]">
                      <InlineEditableImage
                        record="collection"
                        recordId={collection.id}
                        field="heroImage"
                        value={ens.image}
                        alt={ensName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-[#1C1A17]/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs">
                        {ens.pieceCount} {isVi ? 'Món đồ' : 'Pieces Set'}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif text-xl text-[#1C1A17] font-bold">
                          {ensName}
                        </h3>
                        <p className="text-xs text-[#5C3822] font-serif italic mt-1">
                          {ensTagline}
                        </p>
                        <div className="mt-3 text-xs text-[#6B5E52]">
                          <span className="font-semibold text-[#1C1A17]">
                            {isVi ? 'Không gian lý tưởng: ' : 'Ideal Setting: '}
                          </span>
                          <span>{ensSpace}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#EAE3DA] flex items-center justify-between gap-4">
                        <button
                          onClick={() => {
                            // Save all products in this ensemble
                            const toSave = products.filter((p) => ens.includedProductIds.includes(p.id));
                            toSave.forEach((p) => onToggleSave(p));
                          }}
                          className="flex-1 py-2.5 bg-[#5C3822] hover:bg-[#2A1D15] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>{isVi ? 'Lưu Toàn Bộ Set Vào Spec' : 'Save Set to Spec Sheet'}</span>
                        </button>
                        <button
                          onClick={() => onNavigate('trade')}
                          className="text-xs font-semibold uppercase tracking-wider text-[#6B5E52] hover:text-[#1C1A17] underline underline-offset-4 cursor-pointer"
                        >
                          {isVi ? 'Tư Vấn' : 'Inquire'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. SIGNATURE MATERIALS & SUNBRELLA® FABRIC PAIRINGS */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#EAE3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C5535] block">
                {isVi ? 'Chất Liệu Tuyển Chọn' : 'Material Mastery'}
              </span>
              <h2 className="font-serif text-3xl text-[#1C1A17] font-light tracking-tight">
                {isVi ? 'Bảng Phối Vải Sunbrella® Khuyên Dùng' : 'Recommended Sunbrella® Marine Fabrics'}
              </h2>
              <p className="text-sm text-[#6B5E52] leading-relaxed">
                {isVi
                  ? `Mỗi bộ sưu tập ${displayName} được thiết kế để kết hợp hài hòa cùng bộ sưu tập vải acrylic nhuộm dung dịch 100% chuẩn hàng hải của Sunbrella®. Kháng tia UV, chống ố bẩn rượu vang, dầu mỡ và thoát nước siêu tốc.`
                  : `Each ${displayName} silhouette harmonizes seamlessly with Sunbrella® marine-grade solution-dyed acrylics. Fade-proof, mildew-resistant, and easily bleach-cleanable.`}
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('materials')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5C3822] hover:text-[#1C1A17] underline underline-offset-4 cursor-pointer"
                >
                  <span>{isVi ? 'Xem Toàn Bộ Thư Viện Chất Liệu & Vải' : 'Explore All Materials & Fabrics'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Swatches Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FABRIC_SWATCHES.map((swatch) => {
                const sName = isVi && swatch.nameVi ? swatch.nameVi : swatch.name;
                const isSelected = activeFabricId === swatch.id;

                return (
                  <div
                    key={swatch.id}
                    onClick={() => setActiveFabricId(swatch.id)}
                    className={`p-3 bg-[#FAF8F5] border rounded-xs cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-[#5C3822] ring-1 ring-[#5C3822] shadow-xs'
                        : 'border-[#EAE3DA] hover:border-[#8C5535]'
                    }`}
                  >
                    <div
                      className="w-full aspect-[16/9] rounded-xs border border-black/10 shadow-inner mb-2.5 relative"
                      style={{ backgroundColor: swatch.colorHex }}
                    >
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#5C3822] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-bold text-[#1C1A17] truncate">{sName}</div>
                    <div className="text-[10px] text-[#7A6B5F] font-mono">{swatch.code}</div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 7. OTHER COLLECTIONS CAROUSEL (EXPLORE FURTHER) */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C5535] block mb-1">
                {isVi ? 'Mở Rộng Không Gian' : 'Portfolio Exploration'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] font-light">
                {isVi ? 'Khám Phá Các Bộ Sưu Tập Khác' : 'Explore Other Signature Collections'}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('collections')}
              className="text-xs uppercase tracking-wider font-semibold text-[#5C3822] hover:text-[#1C1A17] underline underline-offset-4 cursor-pointer"
            >
              {isVi ? 'Xem Tất Cả' : 'View All →'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCollections.map((col) => {
              const colName = isVi && col.nameVi ? col.nameVi : col.name;
              const colTagline = isVi && col.taglineVi ? col.taglineVi : col.tagline;

              return (
                <div
                  key={col.id}
                  onClick={() => handleCollectionSwitch(col.id)}
                  className="group bg-white border border-[#EAE3DA] rounded-xs overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE4D9]">
                    <InlineEditableImage
                      record="collection"
                      recordId={col.id}
                      field="heroImage"
                      value={col.heroImage}
                      alt={colName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#1C1A17]/85 backdrop-blur-xs text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs">
                      {col.itemCount} {isVi ? 'Mẫu' : 'Pieces'}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] text-[#8C5535] font-semibold uppercase tracking-wider">
                        {col.primaryMaterial}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#1C1A17] group-hover:text-[#5C3822] transition-colors mt-0.5">
                        {colName}
                      </h3>
                      <p className="text-xs text-[#6B5E52] mt-1 line-clamp-2">
                        {colTagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EAE3DA] flex items-center justify-between text-xs font-semibold text-[#5C3822] group-hover:text-[#1C1A17]">
                      <span>{isVi ? 'Xem Chi Tiết Bộ Sưu Tập' : 'View Collection Details'}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
