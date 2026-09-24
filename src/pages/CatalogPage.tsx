import React, { useState } from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { InlineEditableImage } from '../components/InlineEditableImage';
import { 
  Download, 
  ExternalLink, 
  Maximize2, 
  BookOpen, 
  FileText, 
  Layers, 
  Sparkles, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface CatalogPageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string; tab?: 'retailers' | 'design-showrooms' | 'contract-hospitality' }) => void;
  onOpenCatalogModal?: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onNavigate, onOpenCatalogModal }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-[#141414] text-[#FAF8F5]">
      {/* 1. TOP FULL-SCREEN DIGITAL FLIPBOOK VIEWER SECTION */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[92vh] flex flex-col items-center justify-center pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 bg-[#181818] overflow-hidden">
        {/* Subtle Textured Background Pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
          <InlineEditableImage
            record="collection"
            recordId="catalog"
            field="heroImage"
            value="https://www.jensenoutdoor.com/wp-content/uploads/2024/03/Gray.png"
            alt={isVi ? 'Nền catalog' : 'Catalog texture'}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/5 blur-3xl pointer-events-none" />

        {/* Header Bar above Flipbook */}
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 z-10">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-full bg-[#C4A482]/20 border border-[#C4A482]/40 flex items-center justify-center text-[#C4A482]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#C4A482] font-semibold">
                {isVi ? 'Tạp Chí & Catalogue Kỹ Thuật Số' : 'Interactive Digital Lookbook'}
              </div>
              <h1 className="font-serif text-lg sm:text-xl font-medium tracking-[0.04em] text-white">
                B+Open 2026 Collection
              </h1>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.jensenoutdoor.com/wp-content/uploads/2026/01/2026-FINAL-Jensen-Outdoor-Product-Knowledge-Guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white rounded-xs border border-white/15 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isVi ? 'Tải PDF' : 'Download PDF'}</span>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('flipsnack-iframe');
                if (el && el.requestFullscreen) {
                  el.requestFullscreen();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#ae5c4a] hover:bg-[#974b3a] text-white rounded-xs transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isVi ? 'Toàn Màn Hình' : 'Full Screen'}</span>
            </button>
          </div>
        </div>

        {/* Flipbook Container (4:3 ratio matching Flipsnack embed on jensenoutdoor.com/catalog/) */}
        <div className="relative w-full max-w-6xl mx-auto z-10 shadow-2xl rounded-xs overflow-hidden border border-white/10 bg-black/60">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1F1D1A] text-[#FAF8F5]/80 p-8 text-center z-0">
              <div className="w-10 h-10 border-2 border-[#C4A482] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-serif text-base tracking-wide">
                {isVi ? 'Đang tải ấn phẩm Catalogue...' : 'Loading B+Open Digital Catalog...'}
              </p>
              <p className="text-xs text-white/50 mt-1 max-w-md">
                {isVi 
                  ? 'Nếu không tải được, bạn có thể bấm "Tải PDF" hoặc xem liên kết trực tiếp.' 
                  : 'You can also download the PDF handbook or view the catalog resources below.'}
              </p>
            </div>
          )}
          <iframe
            id="flipsnack-iframe"
            src="https://player.flipsnack.com?hash=OTY1RjhGNjZBRUQrdDlhYmxpNXVuZg=="
            seamless
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-read; clipboard-write"
            onLoad={() => setIframeLoaded(true)}
            className="w-full aspect-[4/3] sm:min-h-[640px] md:min-h-[760px] lg:min-h-[820px] relative z-10 bg-transparent"
            title="B+Open 2026 Collection Catalog"
          />
        </div>
      </section>

      {/* 2. CATALOG RESOURCES SECTION (Matches jensenoutdoor.com/catalog/) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center bg-[#FAF8F5] text-[#1C1A17] rounded-t-xl sm:rounded-t-2xl shadow-xl mt-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium uppercase tracking-[0.06em] text-[#1C1A17] mb-4">
          {isVi 
            ? 'Khám Phá Catalogue & Tài Nguyên Mới Nhất Của B+Open'
            : 'View the latest in B+Open catalogs and resources'}
        </h2>
        
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#1C1A17]/75 font-sans leading-relaxed mb-10">
          {isVi
            ? 'Chúng tôi tin rằng trải nghiệm có người dẫn lối sẽ vừa truyền cảm hứng sống vừa cung cấp thông tin hữu ích. Nhấp vào các liên kết bên dưới để đắm chìm vào các nguồn tài nguyên di sản này.'
            : 'We believe that a guided experience can inspire as it informs. Click to immerse yourself in these resources.'}
        </p>

        {/* 3 Action Buttons matching Jensen Outdoor */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {/* 1. Easy Care Guide Button */}
          <a
            href="https://www.jensenoutdoor.com/wp-content/uploads/2025/07/JensenOutdoor-EasyCareGuide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
          >
            <span>{isVi ? 'Cẩm Nang Bảo Dưỡng (Easy Care Guide)' : 'Easy Care Guide'}</span>
          </a>

          {/* 2. Product Knowledge Handbook Button */}
          <a
            href="https://www.jensenoutdoor.com/wp-content/uploads/2026/01/2026-FINAL-Jensen-Outdoor-Product-Knowledge-Guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-[#1C1A17] hover:bg-[#1C1A17] hover:text-white text-[#1C1A17] font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer rounded-xs"
          >
            <span>{isVi ? 'Sổ Tay Kiến Thức Sản Phẩm' : 'Product Knowledge Handbook'}</span>
          </a>

          {/* 3. View Fabrics Button */}
          <button
            onClick={() => onNavigate('materials')}
            className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-[#1C1A17] hover:bg-[#1C1A17] hover:text-white text-[#1C1A17] font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer rounded-xs"
          >
            <span>{isVi ? 'Xem Mẫu Vải Sunbrella®' : 'View Fabrics'}</span>
          </button>
        </div>

        {/* Additional Cross Links */}
        <div className="mt-16 pt-10 border-t border-[#1C1A17]/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div 
            onClick={() => onNavigate('care')}
            className="p-5 bg-white rounded-xs border border-[#1C1A17]/10 hover:border-[#ae5c4a] transition-colors cursor-pointer group"
          >
            <div className="text-xs uppercase tracking-wider font-bold text-[#ae5c4a] mb-1">
              {isVi ? 'Bảo Quản Gỗ Ipe' : 'Product Care'}
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1C1A17] group-hover:text-[#ae5c4a] transition-colors mb-1">
              {isVi ? 'Chăm Sóc & Phục Hồi' : 'Care & Maintenance'}
            </h3>
            <p className="text-xs text-[#1C1A17]/70 mb-3">
              {isVi ? '4 cấp độ bảo dưỡng giữ trọn vẹn vẻ đẹp tự nhiên.' : '4 levels of care for enduring craftsmanship.'}
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C1A17] group-hover:text-[#ae5c4a] inline-flex items-center gap-1">
              {isVi ? 'Xem Chi Tiết' : 'Read Guide'} »
            </span>
          </div>

          <div 
            onClick={() => onNavigate('showrooms', { tab: 'design-showrooms' })}
            className="p-5 bg-white rounded-xs border border-[#1C1A17]/10 hover:border-[#ae5c4a] transition-colors cursor-pointer group"
          >
            <div className="text-xs uppercase tracking-wider font-bold text-[#ae5c4a] mb-1">
              {isVi ? 'Không Gian Ảo' : 'Virtual Experience'}
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1C1A17] group-hover:text-[#ae5c4a] transition-colors mb-1">
              {isVi ? 'Showroom 3D Thực Tế Ảo' : '3D Showroom Tour'}
            </h3>
            <p className="text-xs text-[#1C1A17]/70 mb-3">
              {isVi ? 'Trải nghiệm không gian trưng bày chân thực 360 độ.' : 'Explore full room settings in immersive 3D.'}
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C1A17] group-hover:text-[#ae5c4a] inline-flex items-center gap-1">
              {isVi ? 'Khám Phá Ngay' : 'Launch Tour'} »
            </span>
          </div>

          <div 
            onClick={() => onNavigate('how-to-buy')}
            className="p-5 bg-white rounded-xs border border-[#1C1A17]/10 hover:border-[#ae5c4a] transition-colors cursor-pointer group"
          >
            <div className="text-xs uppercase tracking-wider font-bold text-[#ae5c4a] mb-1">
              {isVi ? 'Mua Sắm' : 'Purchasing'}
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1C1A17] group-hover:text-[#ae5c4a] transition-colors mb-1">
              {isVi ? 'Cách Mua Hàng & Đại Lý' : 'How to Buy'}
            </h3>
            <p className="text-xs text-[#1C1A17]/70 mb-3">
              {isVi ? 'Tìm kiếm đại lý ủy quyền và trải nghiệm thực tế.' : 'Locate certified dealers and design partners.'}
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C1A17] group-hover:text-[#ae5c4a] inline-flex items-center gap-1">
              {isVi ? 'Tìm Đại Lý' : 'Find Store'} »
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
