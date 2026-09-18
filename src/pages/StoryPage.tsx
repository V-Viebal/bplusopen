import React, { useState } from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { JensenLeafLogo } from '../components/JensenLeafLogo';
import { Volume2, VolumeX } from 'lucide-react';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { InlineEditableImage } from '../components/InlineEditableImage';

interface StoryPageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string }) => void;
  onOpenCatalogModal?: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="bg-[#FAF8F5] text-[#1C1A17] selection:bg-[#5C3822] selection:text-white">
      
      {/* 1. OFFICIAL VIDEO AUTOPLAY HERO */}
      <section className="relative w-full overflow-hidden bg-[#141414]">
        <div className="relative w-full h-[360px] sm:h-[480px] md:h-[600px] lg:h-[720px] xl:h-[80vh] overflow-hidden bg-black">
          
          {/* Vimeo Background Video with Autoplay & Loop from official B+Open site */}
          <iframe
            src={`https://player.vimeo.com/video/684408853?autoplay=1&loop=1&autopause=0&muted=${isMuted ? 1 : 0}&background=${isMuted ? 1 : 0}`}
            className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
            allow="autoplay; fullscreen; picture-in-picture"
            title="B+Open | Our Story"
          />

          {/* Subtle gradient vignette for cinematic atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

          {/* Subtle Audio Mute / Unmute Floating Control */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-black/60 hover:bg-black/85 text-white backdrop-blur-md rounded-full text-xs font-medium tracking-wider uppercase border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
              title={isMuted ? (isVi ? 'Bật âm thanh video' : 'Unmute video audio') : (isVi ? 'Tắt âm thanh' : 'Mute audio')}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-white/90" />
                  <span className="hidden sm:inline text-[11px] font-semibold">{isVi ? 'Bật âm thanh' : 'Unmute'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                  <span className="hidden sm:inline text-[11px] font-semibold text-[#D4AF37]">{isVi ? 'Đang phát âm thanh' : 'Sound On'}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </section>

      {/* 2. B+OPEN MISSION STATEMENT */}
      <section className="bg-white pt-14 pb-10 sm:pt-20 sm:pb-14 border-b border-[#EAE6E1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#1C1A17] uppercase">
            {isVi ? "SỨ MỆNH CỦA B+OPEN • B+OPEN'S MISSION" : "B+OPEN'S MISSION"}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold text-[#1C1A17] uppercase tracking-tight leading-[1.25] max-w-3xl mx-auto">
            {isVi 
              ? 'MANG ĐẾN CHO KHÔNG GIAN NGOÀI TRỜI CỦA BẠN NỘI THẤT GỖ BỀN VỮNG CHẤT LƯỢNG CAO NHẤT THẾ GIỚI.'
              : 'TO BRING THE HIGHEST-QUALITY SUSTAINABLE WOOD FURNITURE IN THE WORLD, TO YOUR OUTDOORS.'}
          </h2>
        </div>
      </section>

      {/* 3. THE THREE SIGNATURE ALTERNATING FEATURE BLOCKS */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-0 border border-[#E5E2DC] shadow-xs divide-y divide-[#E5E2DC]">

            {/* BLOCK 1: SUSTAINABILITY (Left: Forest with White Logo | Right: Text) */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
              {/* Left Column: Forest with Centered Logo */}
              <div className="relative min-h-[340px] sm:min-h-[420px] overflow-hidden group">
                <InlineEditableImage record="collection" recordId="story" field="heroImage" value="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80" alt="Bolivian Chiquitania Rainforest River Canopy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/15 transition-colors" />
                
                {/* Centered White B+Open Logo */}
                <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <img
                      src="/logo-b-open.png"
                      alt="B+Open Logo"
                      className="h-20 sm:h-28 w-auto max-w-[320px] object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.7)]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Warm Gray Text Box */}
              <div className="bg-[#ECEBE6] p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-left">
                <div className="text-xs font-bold text-[#1C1A17] mb-2 tracking-wide">
                  {isVi ? 'Phát triển bền vững (Sustainability)' : 'Sustainability'}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#1C1A17] uppercase tracking-wide leading-snug mb-4">
                  {isVi ? 'BẢO VỆ TƯƠNG LAI CỦA NỘI THẤT' : 'PROTECTING THE FUTURE OF FURNITURE'}
                </h3>
                <p className="text-xs sm:text-sm text-[#1C1A17]/85 font-normal leading-relaxed mb-6">
                  {isVi
                    ? 'B+Open là một trong những thương hiệu nội thất ngoài trời tiên phong nhận chứng chỉ FSC®. Hãy khám phá cách chúng tôi dẫn đầu trách nhiệm quản lý và bảo tồn rừng sinh thái.'
                    : "B+Open was among the first outdoor furniture manufacturers to receive FSC® Certification. See how we're leading from the front on forestry stewardship."}
                </p>
                <div>
                  <button
                    onClick={() => onNavigate('sustainability')}
                    className="inline-block text-xs sm:text-sm font-bold text-[#1C1A17] underline underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer"
                  >
                    {isVi ? 'Cam kết bền vững của chúng tôi' : 'Our Sustainability Promise'}
                  </button>
                </div>
              </div>
            </div>

            {/* BLOCK 2: DESIGN (Left: Text | Right: People Lounging on Patio Sofa) */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
              {/* Left Column: Warm Gray Text Box */}
              <div className="bg-[#ECEBE6] p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-left order-2 md:order-1">
                <div className="text-xs font-bold text-[#1C1A17] mb-2 tracking-wide">
                  {isVi ? 'Thiết kế (Design)' : 'Design'}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#1C1A17] uppercase tracking-wide leading-snug mb-4">
                  {isVi ? 'PHONG CÁCH ĐƯỢC TẠO RA ĐỂ HÒA HỢP VỚI CUỘC SỐNG BẠN' : 'STYLES PURPOSE-BUILT TO FIT YOUR LIFE'}
                </h3>
                <p className="text-xs sm:text-sm text-[#1C1A17]/85 font-normal leading-relaxed mb-6">
                  {isVi
                    ? 'Những thiết kế đoạt giải thưởng của chúng tôi được sáng tạo bởi các bộ óc tinh hoa hàng đầu trong ngành. Mỗi bộ sưu tập đều được đo ni đóng giày cho thẩm mỹ độc bản và công năng thực tế trong cuộc sống của bạn.'
                    : 'Our award-winning designs are dreamed up by the best minds in the industry. Each collection tailor-made to suit a unique aesthetic and intended use in your life.'}
                </p>
                <div>
                  <button
                    onClick={() => onNavigate('design')}
                    className="inline-block text-xs sm:text-sm font-bold text-[#1C1A17] underline underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer"
                  >
                    {isVi ? 'Khám phá quy trình thiết kế' : 'Explore our Design Process'}
                  </button>
                </div>
              </div>

              {/* Right Column: Outdoor Patio Sofa Lifestyle Imagery */}
              <div className="relative min-h-[340px] sm:min-h-[420px] overflow-hidden group order-1 md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
                  alt="Friends and family enjoying outdoor patio sofa lifestyle"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
              </div>
            </div>

            {/* BLOCK 3: MATERIALS (Left: Dining Table Overlooking Hills | Right: Text) */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
              {/* Left Column: Outdoor Dining Overlooking Scenic Rolling Hills */}
              <div className="relative min-h-[340px] sm:min-h-[420px] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80"
                  alt="Outdoor hardwood dining table with flowers overlooking scenic green hills"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
              </div>

              {/* Right Column: Warm Gray Text Box */}
              <div className="bg-[#ECEBE6] p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-left">
                <div className="text-xs font-bold text-[#1C1A17] mb-2 tracking-wide">
                  {isVi ? 'Chất liệu (Materials)' : 'Materials'}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#1C1A17] uppercase tracking-wide leading-snug mb-4">
                  {isVi ? 'NHỮNG LOẠI GỖ BỀN NHẤT THẾ GIỚI' : "THE WORLD’S MOST DURABLE TIMBERS"}
                </h3>
                <p className="text-xs sm:text-sm text-[#1C1A17]/85 font-normal leading-relaxed mb-6">
                  {isVi
                    ? 'Gỗ Ipe - viên ngọc quý trên vương miện gỗ tự nhiên của chúng tôi, hiện thân cho tiêu chuẩn di sản truyền đời mà chúng tôi cam kết cho mọi chất liệu cấu thành.'
                    : 'Ipe wood, the crown jewel of our timbers, embodies the heirloom-quality standard we hold all of our materials to.'}
                </p>
                <div>
                  <button
                    onClick={() => onNavigate('materials')}
                    className="inline-block text-xs sm:text-sm font-bold text-[#1C1A17] underline underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer"
                  >
                    {isVi ? 'Tìm hiểu về gỗ Ipe và các chất liệu khác' : 'Learn About Ipe and More'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
