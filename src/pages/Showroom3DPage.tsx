import React, { useState } from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { InlineEditableImage } from '../components/InlineEditableImage';
import { 
  Maximize2, 
  Compass, 
  MapPin, 
  Store, 
  Building2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Showroom3DPageProps {
  onNavigate: (page: PageId, extra?: { tab?: string; category?: string }) => void;
}

export const Showroom3DPage: React.FC<Showroom3DPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-[#141414] text-[#FAF8F5]">
      {/* 1. TOP COVER WITH 3D SHOWROOM EMBED (Matches jensenoutdoor.com/3d-showroom/) */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Cover Image */}
        <div className="absolute inset-0">
          <InlineEditableImage
            record="collection"
            recordId="showroom-3d"
            field="heroImage"
            value="https://www.jensenoutdoor.com/wp-content/uploads/2020/12/coral-gray-70401-70441-70711-h-1.jpg"
            alt={isVi ? 'Showroom 3D' : '3D showroom'}
            className="h-full w-full object-cover"
          />
          {/* 70% dark overlay matching has-background-dim-70 in original HTML */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]" />
        </div>

        {/* Top Control Bar */}
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ae5c4a]/30 border border-[#ae5c4a]/60 flex items-center justify-center text-[#E5A99B]">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#C4A482] font-semibold">
                {isVi ? 'Trải Nghiệm Thực Tế Ảo 3D' : 'Virtual Walkthrough Experience'}
              </div>
              <h1 className="font-serif text-lg sm:text-xl font-medium tracking-wide text-white">
                B+Open 3D Showroom
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('showroom-iframe');
                if (el && el.requestFullscreen) {
                  el.requestFullscreen();
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#ae5c4a] hover:bg-[#974b3a] text-white rounded-xs transition-colors cursor-pointer shadow-md"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isVi ? 'Toàn Màn Hình' : 'Full Screen'}</span>
            </button>
          </div>
        </div>

        {/* 16/9 Showroom Iframe Container */}
        <div className="relative w-full max-w-6xl mx-auto z-10 shadow-2xl rounded-xs overflow-hidden border border-white/20 bg-black/80">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#191715] text-[#FAF8F5] p-8 text-center z-0">
              <div className="w-12 h-12 border-3 border-[#ae5c4a] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-serif text-lg tracking-wide">
                {isVi ? 'Đang khởi chạy Showroom 3D...' : 'Launching B+Open 3D Showroom...'}
              </p>
              <p className="text-xs text-white/50 mt-1 max-w-md">
                {isVi 
                  ? 'Sử dụng chuột hoặc cảm ứng để xoay 360°, phóng to chi tiết và dạo bước qua các không gian nội thất ngoài trời.' 
                  : 'Use your cursor or touch to pan 360°, zoom in on timber details, and explore curated living and dining layouts.'}
              </p>
            </div>
          )}

          <iframe
            id="showroom-iframe"
            style={{ position: 'relative', aspectRatio: '16/9', zIndex: 1 }}
            src="https://showroom.aftermkt.com/jensen-leisure/casual26"
            scrolling="yes"
            allowFullScreen
            width="100%"
            height="100%"
            frameBorder="0"
            onLoad={() => setIframeLoaded(true)}
            className="w-full aspect-[16/9] min-h-[420px] sm:min-h-[560px] md:min-h-[640px] lg:min-h-[700px]"
            title="B+Open 3D Showroom Tour"
          />
        </div>
      </section>

      {/* 2. BOTTOM CALLOUT SECTION (Matches jensenoutdoor.com/3d-showroom/) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center bg-[#FAF8F5] text-[#1C1A17] rounded-t-2xl shadow-2xl mt-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium uppercase tracking-[0.06em] text-[#1C1A17] mb-4">
          {isVi 
            ? 'Tìm Kiếm Showroom Thiết Kế B+Open'
            : 'Find a B+Open design showroom'}
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#1C1A17]/75 font-sans leading-relaxed mb-10">
          {isVi
            ? 'Các showroom thiết kế của chúng tôi mở cửa theo lịch hẹn dành riêng cho giới kiến trúc sư và đối tác dự án. Hãy tìm kiếm địa điểm gần bạn nhất hoặc tra cứu các cửa hàng đối tác bán lẻ trưng bày sản phẩm thực tế.'
            : 'Our design showrooms are open by appointment to the trade. Find your nearest location or look up a retail floor near you.'}
        </p>

        {/* Action Buttons matching Jensen Outdoor */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => onNavigate('showrooms', { tab: 'design-showrooms' })}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
          >
            <span>{isVi ? 'Tìm Showroom Thiết Kế' : 'Find a Design Showroom'}</span>
          </button>

          <button
            onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#1C1A17] hover:bg-[#1C1A17] hover:text-white text-[#1C1A17] font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer rounded-xs"
          >
            <span>{isVi ? 'Định Vị Đối Tác Bán Lẻ' : 'Locate a Retailer Partner'}</span>
          </button>
        </div>

        {/* Feature Cards below buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 text-left border-t border-[#1C1A17]/10 pt-10">
          <div 
            onClick={() => onNavigate('trade')}
            className="p-6 bg-white border border-[#1C1A17]/10 rounded-xs hover:border-[#ae5c4a] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-5 h-5 text-[#ae5c4a]" />
              <h3 className="font-serif text-lg font-bold text-[#1C1A17] group-hover:text-[#ae5c4a] transition-colors">
                {isVi ? 'Chương Trình Đối Tác (Trade Program)' : 'Trade Program & Specifications'}
              </h3>
            </div>
            <p className="text-xs text-[#1C1A17]/70 leading-relaxed">
              {isVi 
                ? 'Dành riêng cho các kiến trúc sư, nhà thiết kế nội thất và nhà phát triển bất động sản. Hỗ trợ giá chiết khấu, mẫu vật liệu và tài liệu CAD/BIM.'
                : 'Dedicated to interior designers, architects, and commercial developers with trade pricing and material samples.'}
            </p>
          </div>

          <div 
            onClick={() => onNavigate('catalog')}
            className="p-6 bg-white border border-[#1C1A17]/10 rounded-xs hover:border-[#ae5c4a] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-[#ae5c4a]" />
              <h3 className="font-serif text-lg font-bold text-[#1C1A17] group-hover:text-[#ae5c4a] transition-colors">
                {isVi ? 'Khám Phá Toàn Bộ Catalogue' : 'Explore Full Collection Catalog'}
              </h3>
            </div>
            <p className="text-xs text-[#1C1A17]/70 leading-relaxed">
              {isVi 
                ? 'Lật mở từng trang Lookbook kỹ thuật số 2026 với kích thước, thông số kỹ thuật và các phối cảnh không gian sống sang trọng.'
                : 'Flip through the complete 2026 digital lookbook with dimensioned specs, textile options, and outdoor inspiration.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
