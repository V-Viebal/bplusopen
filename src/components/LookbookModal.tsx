import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, BookOpen, ExternalLink, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreProducts: () => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  onExploreProducts,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const [currentPage, setCurrentPage] = useState(0);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  if (!isOpen) return null;

  const catalogSpreads = [
    {
      pageNumber: 'Cover / 01',
      title: isVi ? 'Lookbook Mùa 2026: Living Beyond Walls' : '2026 Season Lookbook: Living Beyond Walls',
      subtitle: isVi ? 'Tuyệt tác ngoại thất từ 100% gỗ Ipe Bolivia' : 'Heirloom outdoor furnishings hand-sculpted in Bolivian Ipe',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      caption: isVi ? 'Biệt thự Palm Springs, California • Bộ sưu tập Lumino Deep Seating' : 'Palm Springs Estate, California • Lumino Deep Seating Ensemble',
      tag: isVi ? 'ẤN PHẨM CHÍNH THỨC 2026' : 'OFFICIAL 2026 EDITION',
    },
    {
      pageNumber: '02 / 03',
      title: isVi ? 'Nghệ Thuật Bàn Ăn Ngoài Trời' : 'Architectural Dining Ensembles',
      subtitle: isVi ? 'Bàn teak và ghế đan dây LUMA' : 'LUMA Teak Tables & Woven Dining Chairs',
      image: '/luma/scene-18.webp',
      caption: isVi ? 'Khung thép sơn tĩnh điện, mặt bàn teak; ghế khung nhôm đan dây' : 'Powder-coated steel and teak tables with aluminum woven chairs',
      tag: isVi ? 'BỘ SƯU TẬP LUMA' : 'LUMA COLLECTION',
    },
    {
      pageNumber: '04 / 05',
      title: isVi ? 'Bể Bơi & Sân Thượng Tắm Nắng' : 'Poolside & Sun Terrace Sanctuary',
      subtitle: isVi ? 'Ghế tắm nắng điều chỉnh góc & bàn góc Ipe' : 'Multi-position Chaises & Architectural Accent Tables',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85',
      caption: isVi ? 'Bánh xe đồng thau bọc cao su chống trượt & tay vịn mài nhẵn' : 'Solid brass rubber-tread wheels with ergonomic steam-bent arms',
      tag: isVi ? 'KHÔNG GIAN NGHỈ DƯỠNG' : 'RESORT LIVING',
    },
    {
      pageNumber: '06 / 07',
      title: isVi ? 'Vải Sunbrella® & Sợi Đan Solara' : 'Textile Alchemy & Botanical Fibers',
      subtitle: isVi ? 'Bảng màu biển cát, mây trời và rừng rậm nhiệt đới' : 'Sunbrella® Marine Textiles & Handwoven Weatherproof Weaves',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
      caption: isVi ? 'Kháng tia UV, chống thấm nước, thoáng khí và êm ái tối đa' : 'UV-inhibited pigment solution with open-cell quick-dry foam cores',
      tag: isVi ? 'CHẤT LIỆU CAO CẤP' : 'MATERIAL SCIENCE',
    },
  ];

  const currentSpread = catalogSpreads[currentPage];

  const handleDownload = () => {
    setHasDownloaded(true);
    setTimeout(() => setHasDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#F8F6F2] text-[#1C1A17] max-w-5xl w-full rounded-sm overflow-hidden shadow-2xl border border-[#DED9CD] relative flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DED9CD] bg-white">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#9B522E]" />
            <div>
              <div className="font-serif text-lg font-medium text-[#1C1A17]">
                {isVi ? 'Catalog Điện Tử Mùa 2026' : 'The 2026 Season Catalog'}
              </div>
              <div className="text-[10px] text-[#7A6B5F] uppercase tracking-wider">
                B+Open • Living beyond walls • {currentSpread.pageNumber}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#9B522E] hover:bg-[#2A1D15] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {hasDownloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#A8D5BA]" />
                  <span>{isVi ? 'Đang tải PDF...' : 'Downloading PDF...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Tải PDF (112 Trang)' : 'Download PDF (112 Pages)'}</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black p-1 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Spread Viewport */}
        <div className="relative flex-1 bg-[#1C140F] flex items-center justify-center overflow-hidden min-h-[380px] sm:min-h-[460px]">
          <img
            src={currentSpread.image}
            alt={currentSpread.title}
            className="w-full h-full object-cover max-h-[550px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

          {/* Tag on top left */}
          <div className="absolute top-4 left-6 bg-[#9B522E] text-[#1C140F] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1">
            {currentSpread.tag}
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => setCurrentPage((prev) => (prev > 0 ? prev - 1 : catalogSpreads.length - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => setCurrentPage((prev) => (prev < catalogSpreads.length - 1 ? prev + 1 : 0))}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Caption Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#EADBCE] block mb-1">
              {currentSpread.subtitle}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light leading-tight mb-2">
              {currentSpread.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#D6C7BA] font-light">
              {currentSpread.caption}
            </p>
          </div>
        </div>

        {/* Footer Thumbnails & Actions */}
        <div className="px-6 py-4 bg-white border-t border-[#DED9CD] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {catalogSpreads.map((spread, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`text-xs px-3 py-1.5 transition-all cursor-pointer font-medium uppercase tracking-wider ${
                  currentPage === idx
                    ? 'bg-[#2A1D15] text-white'
                    : 'bg-[#F0EBE3] text-[#6B5E52] hover:bg-[#DED9CD]'
                }`}
              >
                {spread.pageNumber}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onExploreProducts();
              }}
              className="text-xs font-semibold text-[#9B522E] hover:text-[#2A1D15] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>{isVi ? 'Xem Toàn Bộ Sản Phẩm' : 'Explore Full Collection'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
