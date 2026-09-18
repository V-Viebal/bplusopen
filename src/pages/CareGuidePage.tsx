import React, { useState } from 'react';
import { PageId } from '../types';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { useLanguage } from '../context/LanguageContext';
import { 
  Download, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Droplets,
  Sun,
  Layers,
  Wrench
} from 'lucide-react';

interface CareGuidePageProps {
  onNavigate: (page: PageId, extra?: { tab?: string; category?: string }) => void;
  onOpenCatalogModal?: () => void;
}

export const CareGuidePage: React.FC<CareGuidePageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // State for interactive modals
  const [activeModal, setActiveModal] = useState<
    'levels' | 'ipe-instructions' | 'viro-instructions' | 'supplies' | 'contact' | 'warranty' | null
  >(null);

  const [contactSuccess, setContactSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1A17] font-sans">
      {/* 1. HERO COVER SECTION */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        {/* Background Image matching Jensen Outdoor */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://www.jensenoutdoor.com/wp-content/uploads/2020/12/coral-gray-70421-70401-opal-63710-h-1.jpg')`,
          }}
        >
          {/* Subtle vignette / dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Title */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.08em] uppercase text-white drop-shadow-md">
            {isVi ? 'Bảo Dưỡng & Chăm Sóc' : 'Care & Maintenance'}
          </h1>
          <div className="w-16 h-0.5 bg-[#C4A482] mx-auto mt-4" />
        </div>
      </section>

      {/* 2. INTRODUCTION BLOCK */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-serif font-medium leading-snug text-[#1C1A17] mb-6">
          {isVi
            ? 'Bảo dưỡng nội thất thật dễ dàng với các cấp độ chăm sóc phù hợp với từng nhu cầu của bạn.'
            : 'Maintaining your furniture is a breeze with levels of care to fit your needs.'}
        </h2>
        
        <p className="text-sm sm:text-base text-[#1C1A17]/80 leading-relaxed max-w-3xl mx-auto mb-10 font-light">
          {isVi
            ? 'Tại B+Open, chúng tôi tin rằng nội thất xa xỉ cũng phải mang lại sự xa xỉ của sự chăm sóc đơn giản. Duy trì vẻ đẹp và sự thoải mái cho nội thất gỗ Ipe, vải đệm và sợi mây đan của bạn sẽ vô cùng nhẹ nhàng khi bạn tuân thủ các nguyên tắc bảo dưỡng dễ dàng của chúng tôi.'
            : 'At B+Open, we believe that luxury furniture should offer the luxury of simple care. Maintaining the beauty and comfort of your Ipe furniture, cushion fabrics, and woven fibers will feel effortless when you follow our easy care guidelines.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href="https://www.jensenoutdoor.com/wp-content/uploads/2025/07/JensenOutdoor-EasyCareGuide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
          >
            <span>{isVi ? 'Tải Cẩm Nang Bảo Dưỡng Dễ Dàng' : 'Download the Easy Care Guide'}</span>
          </a>

          <button
            onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#1C1A17] hover:bg-[#1C1A17] hover:text-white text-[#1C1A17] font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer rounded-xs"
          >
            <span>{isVi ? 'Nơi Mua Dụng Cụ Bảo Dưỡng' : 'Where to Buy Care Supplies'}</span>
          </button>
        </div>
      </section>

      {/* 3. SPLIT SECTION: WEATHERED SILVER VS RESTORED CHOCOLATE BROWN (With Animated GIF) */}
      <section className="py-16 sm:py-24 bg-[#F2EDE4] border-y border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Animated GIF showing Silver Patina to Chocolate Restoration */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative rounded-xs overflow-hidden shadow-xl border border-[#DCD3C0] bg-black">
                <img
                  src="https://www.jensenoutdoor.com/wp-content/uploads/2025/02/Innova-AuroraGardenBench-Restored.gif"
                  alt="Ipe Wood Restoration Before and After"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-xs sm:text-[13px] text-[#5A524A] italic text-center sm:text-left leading-relaxed">
                {isVi
                  ? 'Gỗ Ipe phong hóa khoác lên mình ánh bạc quý phái trước khi các bước đơn giản của Bộ Phục Hồi Ipe đưa gỗ trở lại tông màu nâu sô-cô-la nguyên bản.'
                  : 'Weathered Ipe wood takes on a silver glow before following the simple steps in the Ipe Aftercare Kit to return the wood to it’s chocolate-brown finish.'}
              </p>
            </div>

            {/* Right: Choose Your Path & 4 Levels of Care */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ae5c4a]">
                {isVi ? 'Chọn Con Đường Của Bạn' : 'Choose Your Path'}
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1A17] tracking-tight">
                {isVi ? '4 Cấp Độ Bảo Dưỡng' : '4 Levels of Care'}
              </h2>

              <p className="text-sm sm:text-base text-[#1C1A17]/80 leading-relaxed font-light">
                {isVi
                  ? 'Không phải mọi tình huống chăm sóc đều giống nhau, đó là lý do vì sao chúng tôi thiết kế cẩm nang đơn giản này để chia sẻ cách thức, thời điểm và lý do cần chăm sóc cho nội thất của bạn.'
                  : 'Not all care scenarios are created equal, that’s why we have created an easy guide to share how, when, and why to maintain your furniture.'}
              </p>

              <button
                onClick={() => setActiveModal('levels')}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
              >
                <span>{isVi ? 'Xem 4 Cấp Độ Bảo Dưỡng' : 'See Levels of Care'}</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SUNBRELLA® FABRICS SECTION */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Image Tempo Swivel Rocker */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-xs overflow-hidden shadow-lg border border-[#EAE3D2]">
              <img
                src="https://www.jensenoutdoor.com/wp-content/uploads/2025/08/S26_Tempo_SwivelRocker_L2_4K-1024x683.jpg"
                alt="Sunbrella Fabric cushions on Ipe swivel rocker"
                className="w-full h-auto object-cover hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ae5c4a]">
              Sunbrella® Fabrics
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1A17] tracking-tight">
              {isVi ? 'Vệ sinh vải dệt bền bỉ Sunbrella®' : 'Cleaning durable Sunbrella® fabrics'}
            </h3>

            <p className="text-sm sm:text-base text-[#1C1A17]/80 leading-relaxed font-light">
              {isVi
                ? 'Gỗ Ipe có thể được duy trì ở trạng thái "mới tinh" như ban đầu, hoặc để gỗ tự nhiên ngả sang màu ánh bạc patina thanh lịch theo năm tháng. Diện mạo và mức độ bảo trì hoàn toàn do bạn quyết định.'
                : 'Ipe wood can be maintained with an ‘as new’ finish, or allowed to gracefully age to an elegant silver-patina. The look, and level of maintenance, is up to you.'}
            </p>

            <button
              onClick={() => setActiveModal('ipe-instructions')}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
            >
              <span>{isVi ? 'Hướng Dẫn Bảo Dưỡng Gỗ Ipe' : 'Ipe Care Instructions'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 5. WOVEN VIRO® FIBER SECTION */}
      <section className="py-20 sm:py-28 bg-[#F8F5EE] border-t border-[#EAE3D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ae5c4a]">
                Woven Viro® Fiber
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1A17] tracking-tight">
                {isVi ? 'Sợi Mây Viro® Ít Cần Bảo Dưỡng' : 'Low Maintenance Viro® Fiber'}
              </h2>

              <p className="text-sm sm:text-base text-[#1C1A17]/80 leading-relaxed font-light">
                {isVi
                  ? 'Sợi mây đan thủ công Viro® Fiber có độ bền vượt trội tương đương với sự dễ dàng trong bảo quản. Hãy đọc cẩm nang chăm sóc của chúng tôi để thấy việc giữ sạch đơn giản đến nhường nào!'
                  : 'Woven Viro® Fiber is as durable as it is easy to maintain. Read our care guide to see how simple it is!'}
              </p>

              <button
                onClick={() => setActiveModal('viro-instructions')}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
              >
                <span>{isVi ? 'Hướng Dẫn Bảo Dưỡng Sợi Viro®' : 'Woven Viro® Fiber Care Instructions'}</span>
              </button>
            </div>

            {/* Right: Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xs overflow-hidden shadow-lg border border-[#EAE3D2]">
                <img
                  src="https://www.jensenoutdoor.com/wp-content/uploads/2022/02/coral-hpsq-2.jpg"
                  alt="Close-up of Woven Viro Fiber outdoor seating"
                  className="w-full h-auto object-cover hover:scale-102 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CARE SUPPLIES / THE RIGHT STUFF SECTION */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Image of Ipe Aftercare Kit */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xs overflow-hidden shadow-lg border border-[#EAE3D2] bg-white p-4">
              <img
                src="https://www.jensenoutdoor.com/wp-content/uploads/2020/12/17_IpeAftercareKit81000.jpg"
                alt="B+Open Ipe Aftercare Kit Supplies"
                className="w-full h-auto object-contain hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ae5c4a]">
              {isVi ? 'Dụng Cụ Bảo Dưỡng' : 'Care Supplies'}
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1A17] tracking-tight">
              {isVi ? 'Vật Liệu Chuẩn Xác' : 'The Right Stuff'}
            </h2>

            <p className="text-sm sm:text-base text-[#1C1A17]/80 leading-relaxed font-light">
              {isVi
                ? 'B+Open đã hợp tác với các nhà cung cấp sản phẩm bảo dưỡng hàng đầu trong ngành nội thất ngoại thất để tạo nên những sản phẩm chăm sóc giúp việc duy trì vẻ đẹp đồ gỗ của bạn trở nên vô cùng nhẹ nhàng.'
                : 'B+Open has worked with the leading care suppliers in the outdoor industry to create care products that make maintaining your furniture a breeze.'}
            </p>

            <button
              onClick={() => setActiveModal('supplies')}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
            >
              <span>{isVi ? 'Xem Các Sản Phẩm Bảo Dưỡng' : 'View Care Supplies'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 7. TO ORDER SUPPLIES BANNER */}
      <section className="py-16 bg-[#2B2723] text-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide">
            {isVi ? 'Để Đặt Mua Vật Phẩm Bảo Dưỡng' : 'To Order Supplies'}
          </h2>
          <p className="text-sm text-white/70 tracking-wider uppercase font-sans">
            {isVi ? 'Liên hệ cửa hàng đối tác tại địa phương của bạn' : 'Contact your local store'}
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
            >
              <span>{isVi ? 'Tìm Đại Lý Gần Nhất' : 'Find a Retailer'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM 6 TOUCHPOINT GRID (Matches jensenoutdoor.com/product-care/ & Help Center) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EAE3D2]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          
          {/* Card 1: Retail Stores */}
          <div className="bg-white p-8 rounded-xs border border-[#EAE3D2] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1C1A17]">
                {isVi ? 'Cửa Hàng Bán Lẻ' : 'Retail Stores'}
              </h3>
              <p className="text-sm text-[#5A524A] font-light leading-relaxed">
                {isVi
                  ? 'Ghé thăm một trong những đối tác bán lẻ thân thiện và am hiểu của B+Open.'
                  : 'Visit one of B+Open’s friendly, knowledgeable retail partners.'}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#ae5c4a] hover:text-[#8C3F30] cursor-pointer"
              >
                <span>{isVi ? 'Tìm Cửa Hàng' : 'Find a Store'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Design Showrooms */}
          <div className="bg-white p-8 rounded-xs border border-[#EAE3D2] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1C1A17]">
                {isVi ? 'Showroom Thiết Kế' : 'Design Showrooms'}
              </h3>
              <p className="text-sm text-[#5A524A] font-light leading-relaxed">
                {isVi
                  ? 'Mở cửa theo lịch hẹn dành riêng cho giới kiến trúc sư và đối tác thiết kế.'
                  : 'Open by appointment to the trade.'}
              </p>
            </div>
            <div className="pt-6 flex items-center gap-6">
              <button
                onClick={() => onNavigate('showrooms', { tab: 'design-showrooms' })}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#ae5c4a] hover:text-[#8C3F30] cursor-pointer"
              >
                <span>{isVi ? 'Tìm Showroom' : 'Find a Showroom'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Contract / Hospitality */}
          <div className="bg-white p-8 rounded-xs border border-[#EAE3D2] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1C1A17]">
                {isVi ? 'Dự Án Nghỉ Dưỡng & Khách Sạn' : 'Contract / Hospitality'}
              </h3>
              <p className="text-sm text-[#5A524A] font-light leading-relaxed">
                {isVi
                  ? 'Kết nối với đội ngũ phụ trách kinh doanh dự án của chúng tôi.'
                  : 'Get in touch with our trade sales team.'}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => setActiveModal('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#ae5c4a] hover:text-[#8C3F30] cursor-pointer"
              >
                <span>{isVi ? 'Mẫu Đơn Liên Hệ' : 'Contact Form'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 4: Corporate Office */}
          <div className="bg-white p-8 rounded-xs border border-[#EAE3D2] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1C1A17]">
                {isVi ? 'Văn Phòng Trụ Sở' : 'Corporate Office'}
              </h3>
              <p className="text-sm text-[#5A524A] font-light leading-relaxed">
                1900 Old Williamsburg Road<br />
                Sandston, VA 23150
              </p>
            </div>
            <div className="pt-6 text-xs text-[#8C7A6B]">
              {isVi ? 'Hoa Kỳ • Quản lý vận hành toàn cầu' : 'United States • Global Logistics'}
            </div>
          </div>

          {/* Card 5: Customer Service */}
          <div className="bg-white p-8 rounded-xs border border-[#EAE3D2] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1C1A17]">
                {isVi ? 'Dịch Vụ Khách Hàng' : 'Customer Service'}
              </h3>
              <p className="text-sm text-[#5A524A] font-light leading-relaxed">
                {isVi
                  ? 'Giải đáp thắc mắc chung, thông tin sản phẩm, đăng ký tài khoản hoặc chế độ bảo hành.'
                  : 'For general inquiries, product questions, account setup, or warranties.'}
              </p>
              <div className="text-xs text-[#5A524A] pt-1">
                {isVi ? 'Thứ Hai – Thứ Sáu' : 'Monday – Friday'}<br />
                8:00AM – 5:00PM ET
              </div>
            </div>
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveModal('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#ae5c4a] hover:text-[#8C3F30] cursor-pointer"
              >
                <span>{isVi ? 'Liên Hệ Hỗ Trợ' : 'Contact Customer Service'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveModal('warranty')}
                className="text-xs font-bold uppercase tracking-[0.14em] text-[#8C7A6B] hover:text-[#1C1A17] underline cursor-pointer"
              >
                {isVi ? 'Bảo Hành' : 'Warranty'}
              </button>
            </div>
          </div>

          {/* Card 6: Connect With Us */}
          <div className="bg-white p-8 rounded-xs border border-[#EAE3D2] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1C1A17]">
                {isVi ? 'Kết Nối Với Chúng Tôi' : 'Connect With Us'}
              </h3>
              <p className="text-sm text-[#5A524A] font-light leading-relaxed">
                {isVi
                  ? 'Theo dõi câu chuyện di sản, dự án ngoài trời và nguồn cảm hứng sống mới nhất.'
                  : 'Follow our heritage story, real project installations, and outdoor design inspiration.'}
              </p>
            </div>
            <div className="pt-6 flex items-center space-x-6 text-sm font-medium text-[#ae5c4a]">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Pinterest</a>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== MODALS ===================== */}

      {/* 1. MODAL: 4 LEVELS OF CARE */}
      {activeModal === 'levels' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#EAE3D2] max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE3D2] hover:bg-[#DCD3C0] flex items-center justify-center text-[#1C1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ae5c4a]">
                  {isVi ? 'Giao Thức Tiêu Chuẩn' : 'Maintenance Matrix'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1A17] mt-1">
                  {isVi ? '4 Cấp Độ Bảo Dưỡng Nội Thất Gỗ Ipe' : 'The 4 Levels of Ipe Care'}
                </h3>
                <p className="text-sm text-[#5A524A] mt-2">
                  {isVi 
                    ? 'Tùy thuộc vào việc bạn muốn giữ vẻ nâu hổ phách sẫm hay tôn vinh sắc xám bạc tự nhiên:'
                    : 'Depending on whether you wish to maintain the deep chocolate brown or celebrate the natural silver patina:'}
                </p>
              </div>

              <div className="space-y-4 text-left">
                {/* Level 1 */}
                <div className="p-5 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 bg-[#ae5c4a]/10 text-[#ae5c4a] font-bold text-xs uppercase tracking-wider rounded-xs">
                      {isVi ? 'Cấp Độ 1: Vệ Sinh Định Kỳ Hàng Mùa' : 'Level 1: Routine Seasonal Wash'}
                    </span>
                    <span className="text-xs text-[#8C7A6B]">
                      {isVi ? '3-6 tháng/lần' : 'Every 3-6 months'}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1A17] mb-1">
                    {isVi ? 'Loại Bỏ Bụi Bẩn & Phấn Hoa Bề Mặt' : 'Surface Dust & Pollen Removal'}
                  </h4>
                  <p className="text-xs text-[#5A524A] leading-relaxed">
                    {isVi
                      ? 'Dùng nước sạch pha xà phòng nhẹ (như Dawn) và bàn chải lông mềm để chải sạch bụi bẩn thông thường. Sau đó xả lại bằng vòi nước và để khô tự nhiên.'
                      : 'Rinse with clean water and mild dish soap using a soft bristle brush. Rinse thoroughly and allow to air dry.'}
                  </p>
                </div>

                {/* Level 2 */}
                <div className="p-5 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 bg-[#ae5c4a]/10 text-[#ae5c4a] font-bold text-xs uppercase tracking-wider rounded-xs">
                      {isVi ? 'Cấp Độ 2: Tẩy Rửa & Làm Sạch Sâu' : 'Level 2: Deep Cleansing'}
                    </span>
                    <span className="text-xs text-[#8C7A6B]">
                      {isVi ? '1 năm/lần' : 'Annually'}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1A17] mb-1">
                    {isVi ? 'Dùng Dung Dịch Ipe Cleaner Chuyên Dụng' : 'Specialized Ipe Cleaner Application'}
                  </h4>
                  <p className="text-xs text-[#5A524A] leading-relaxed">
                    {isVi
                      ? 'Thoa đều dung dịch Penofin Pro-Tech Cleaner lên bề mặt gỗ ẩm, để hoạt chất ngấm 10-15 phút rồi chà nhẹ bằng miếng cọ xơ. Rửa sạch triệt để bằng vòi xịt nước.'
                      : 'Apply Penofin Pro-Tech Cleaner to damp timber. Let dwell for 10-15 minutes, scrub with an abrasive pad along the grain, and rinse thoroughly.'}
                  </p>
                </div>

                {/* Level 3 */}
                <div className="p-5 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 bg-[#ae5c4a]/10 text-[#ae5c4a] font-bold text-xs uppercase tracking-wider rounded-xs">
                      {isVi ? 'Cấp Độ 3: Bổ Sung Dầu Dưỡng Penofin®' : 'Level 3: Penofin® Oil Conditioning'}
                    </span>
                    <span className="text-xs text-[#8C7A6B]">
                      {isVi ? '1-2 lần/năm (Tùy Chọn)' : '1-2x yearly (Optional)'}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1A17] mb-1">
                    {isVi ? 'Duy Trì Sắc Nâu Hổ Phách Chocolate' : 'Preserve the Rich Chocolate Glow'}
                  </h4>
                  <p className="text-xs text-[#5A524A] leading-relaxed">
                    {isVi
                      ? 'Sau khi gỗ đã khô hoàn toàn sau khi làm sạch, quét một lớp mỏng dầu Penofin Verde Rosewood Oil. Sau 20-30 phút, dùng khăn cotton lau sạch hoàn toàn lượng dầu thừa trên bề mặt.'
                      : 'Ensure timber is completely dry. Apply a thin, even coat of Penofin Verde Rosewood Oil. After 20-30 minutes, thoroughly wipe off any excess standing oil.'}
                  </p>
                </div>

                {/* Level 4 */}
                <div className="p-5 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 bg-[#ae5c4a]/10 text-[#ae5c4a] font-bold text-xs uppercase tracking-wider rounded-xs">
                      {isVi ? 'Cấp Độ 4: Phục Hồi Toàn Diện Bằng Bộ Aftercare Kit' : 'Level 4: Complete Restoration Kit'}
                    </span>
                    <span className="text-xs text-[#8C7A6B]">
                      {isVi ? 'Khi muốn đưa gỗ bạc về màu ban đầu' : 'To reverse grey patina'}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1A17] mb-1">
                    {isVi ? 'Khôi Phục Gỗ Đã Phong Hóa Sang Màu Ban Đầu' : 'Reverse Weathered Patina to As-New'}
                  </h4>
                  <p className="text-xs text-[#5A524A] leading-relaxed">
                    {isVi
                      ? 'Sử dụng trọn bộ Ipe Aftercare Kit gồm chất tẩy rửa (Step 1 Cleaner), chất trung hòa và làm sáng (Step 2 Brightener), xả sạch phơi khô và phủ dầu dưỡng Penofin (Step 3 Oil).'
                      : 'Utilize the 3-step Ipe Aftercare Kit: Step 1 Cleaner strip, Step 2 Brightener neutralizer, followed by Step 3 Penofin Oil penetration.'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#EAE3D2]">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 bg-[#1C1A17] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL: IPE CARE INSTRUCTIONS */}
      {activeModal === 'ipe-instructions' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#EAE3D2] max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE3D2] hover:bg-[#DCD3C0] flex items-center justify-center text-[#1C1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 text-left">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ae5c4a]">
                  {isVi ? 'Cẩm Nang Kỹ Thuật' : 'Official Guidelines'}
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1C1A17] mt-1">
                  {isVi ? 'Hướng Dẫn Chi Tiết Bảo Dưỡng Gỗ Ipe' : 'Ipe Wood Care Instructions'}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="font-bold text-[#1C1A17] mb-1">
                    {isVi ? 'Lựa chọn 1: Để gỗ ngả sang màu xám bạc patina tự nhiên' : 'Option 1: Allow to naturally weather into Silver Patina'}
                  </div>
                  <p>
                    {isVi
                      ? 'Gỗ Ipe có mật độ thớ gỗ cực cao (độ cứng Janka 3,680 lbf) và chứa dầu tự nhiên dồi dào. Bạn hoàn toàn không cần làm gì ngoài việc xịt rửa bụi bẩn định kỳ. Gỗ sẽ từ từ chuyển từ nâu sẫm sang màu bạc ánh kim tuyệt đẹp mà không hề suy giảm độ bền cơ học.'
                      : 'Ipe has extraordinary natural oil density (Janka 3,680 lbf). Beyond regular rinsing with soapy water, no oiling is required. It gracefully shifts to a silvery-grey patina without losing strength.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="font-bold text-[#1C1A17] mb-1">
                    {isVi ? 'Lựa chọn 2: Duy trì sắc nâu sô-cô-la hổ phách bằng dầu Penofin®' : 'Option 2: Maintain chocolate brown with Penofin®'}
                  </div>
                  <p>
                    {isVi
                      ? 'Làm sạch bề mặt bằng nước và chất tẩy nhẹ. Đợi gỗ khô hoàn toàn trong 24-48 giờ. Quét một lớp mỏng dầu Penofin Verde Rosewood Oil. Quan trọng nhất: Sau 20 phút, lau sạch hoàn toàn lượng dầu thừa bằng giẻ cotton sạch để tránh bị dính rít bề mặt.'
                      : 'Wash and let dry for 24-48 hours. Brush a light, uniform coat of Penofin Verde. Most crucially: After 20 minutes, wipe off ALL excess standing oil thoroughly with clean rags.'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#EAE3D2]">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 bg-[#1C1A17] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  {isVi ? 'Đã Hiểu' : 'Got it'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MODAL: VIRO FIBER CARE */}
      {activeModal === 'viro-instructions' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#EAE3D2] max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE3D2] hover:bg-[#DCD3C0] flex items-center justify-center text-[#1C1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 text-left">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ae5c4a]">
                  {isVi ? 'Vật Liệu Mây Đan' : 'Woven Specifications'}
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1C1A17] mt-1">
                  {isVi ? 'Hướng Dẫn Bảo Quản Sợi Viro® Fiber' : 'Woven Viro® Fiber Care Guide'}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                <p>
                  {isVi
                    ? 'Sợi đan Viro® Fiber là loại sợi polyethylene cao cấp thân thiện với môi trường, có khả năng kháng tia UV, nước mặn clo và nhiệt độ khắc nghiệt.'
                    : 'Viro® Fiber is an eco-friendly high-density polyethylene weave that resists UV degradation, chlorinated water, and temperature swings.'}
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    {isVi
                      ? 'Dùng vòi nước xịt nhẹ hoặc khăn ẩm lau bụi bẩn bám giữa các khe đan.'
                      : 'Rinse with clean water or use a soft damp cloth to clear debris between weaves.'}
                  </li>
                  <li>
                    {isVi
                      ? 'Đối với vết thức ăn dầu mỡ, dùng dung dịch xà phòng loãng và bọt biển mềm chà nhẹ.'
                      : 'For food or oil spills, apply mild liquid detergent with a soft sponge and rinse.'}
                  </li>
                  <li>
                    {isVi
                      ? 'Không dùng máy xịt áp lực cao hoặc chất tẩy rửa có tính mài mòn mạnh.'
                      : 'Never use high-pressure power washers or harsh solvent-based abrasives.'}
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#EAE3D2]">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 bg-[#1C1A17] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: VIEW CARE SUPPLIES */}
      {activeModal === 'supplies' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#EAE3D2] max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE3D2] hover:bg-[#DCD3C0] flex items-center justify-center text-[#1C1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 text-left">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ae5c4a]">
                  {isVi ? 'Sản Phẩm Khuyên Dùng' : 'Official Supplies'}
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1C1A17] mt-1">
                  {isVi ? 'Danh Mục Dụng Cụ Bảo Dưỡng Chính Hãng' : 'Certified Care Products'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs space-y-2">
                  <div className="font-bold text-[#1C1A17] text-sm">
                    {isVi ? 'Bộ Phục Hồi Ipe Aftercare Kit' : 'Ipe Aftercare Kit'}
                  </div>
                  <p className="text-xs text-[#5A524A]">
                    {isVi
                      ? 'Bao gồm dung dịch làm sạch Ipe Cleaner, dung dịch làm sáng Brightener, dầu dưỡng Penofin Verde và miếng chà chuyên dụng.'
                      : 'Complete set with Cleaner, Brightener, Penofin Verde Oil, and specialty non-metallic abrasive scrub pads.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs space-y-2">
                  <div className="font-bold text-[#1C1A17] text-sm">
                    {isVi ? 'Dầu Dưỡng Penofin® Verde Rosewood' : 'Penofin® Verde Rosewood Oil'}
                  </div>
                  <p className="text-xs text-[#5A524A]">
                    {isVi
                      ? 'Dầu dưỡng chiết xuất gỗ cẩm lai thân thiện với môi trường, lọc tia UV 99%, duy trì màu hổ phách chocolate đậm đà.'
                      : 'Brazilian Rosewood oil formula with 99% UV protection, zero VOC, highlighting deep grain tones.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs space-y-2">
                  <div className="font-bold text-[#1C1A17] text-sm">
                    {isVi ? 'Dung Dịch Làm Sạch Penofin Pro-Tech' : 'Penofin Pro-Tech Cleaner'}
                  </div>
                  <p className="text-xs text-[#5A524A]">
                    {isVi
                      ? 'Tẩy sạch lớp dầu cũ bị ố, nấm mốc và cặn bẩn bám dính trên bề mặt gỗ ngoài trời.'
                      : 'Restores weathered timber, stripping dirt and environmental film without bleaching or stripping grain.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs space-y-2">
                  <div className="font-bold text-[#1C1A17] text-sm">
                    {isVi ? 'Bạt Phủ Bảo Vệ Tùy Chỉnh' : 'Tailored Furniture Covers'}
                  </div>
                  <p className="text-xs text-[#5A524A]">
                    {isVi
                      ? 'Vải bạt chống nước thoáng khí, có dây rút cố định cho các mùa mưa tuyết kéo dài.'
                      : 'Breathable, water-resistant heavy-duty outdoor fabric covers designed to fit each B+Open seating and dining set.'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE3D2] flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveModal(null);
                    onNavigate('showrooms', { tab: 'retailers' });
                  }}
                  className="px-6 py-2.5 bg-[#ae5c4a] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-[#974b3a] transition-colors"
                >
                  {isVi ? 'Tìm Đại Lý Để Mua Hàng' : 'Find Retailer to Order'}
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 bg-gray-200 text-[#1C1A17] text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-gray-300"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL: CONTACT FORM */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#EAE3D2] max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => {
                setActiveModal(null);
                setContactSuccess(false);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE3D2] hover:bg-[#DCD3C0] flex items-center justify-center text-[#1C1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {contactSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1C1A17]">
                  {isVi ? 'Cảm Ơn Bạn Đã Liên Hệ!' : 'Message Sent Successfully!'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A524A]">
                  {isVi
                    ? 'Đội ngũ Dịch Vụ Khách Hàng B+Open sẽ phản hồi lại bạn trong vòng 1 ngày làm việc.'
                    : 'A B+Open customer representative will follow up with you within 1 business day.'}
                </p>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setContactSuccess(false);
                  }}
                  className="px-6 py-2.5 bg-[#1C1A17] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSuccess(true);
                }}
                className="space-y-4 text-left"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ae5c4a]">
                    {isVi ? 'Gửi Yêu Cầu Hỗ Trợ' : 'Get In Touch'}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#1C1A17] mt-1">
                    {isVi ? 'Liên Hệ Dịch Vụ Khách Hàng' : 'Contact Customer Service'}
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1A17] mb-1">
                    {isVi ? 'Họ và tên *' : 'Full Name *'}
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-2.5 text-xs bg-white border border-[#DCD3C0] rounded-xs focus:outline-none focus:border-[#ae5c4a]"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1C1A17] mb-1">
                      {isVi ? 'Email *' : 'Email Address *'}
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-2.5 text-xs bg-white border border-[#DCD3C0] rounded-xs focus:outline-none focus:border-[#ae5c4a]"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1C1A17] mb-1">
                      {isVi ? 'Số điện thoại' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2.5 text-xs bg-white border border-[#DCD3C0] rounded-xs focus:outline-none focus:border-[#ae5c4a]"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1A17] mb-1">
                    {isVi ? 'Chủ đề quan tâm' : 'Inquiry Type'}
                  </label>
                  <select className="w-full px-4 py-2.5 text-xs bg-white border border-[#DCD3C0] rounded-xs focus:outline-none focus:border-[#ae5c4a]">
                    <option>{isVi ? 'Hướng dẫn bảo dưỡng gỗ Ipe' : 'Ipe Wood Maintenance'}</option>
                    <option>{isVi ? 'Đặt mua vật phẩm bảo dưỡng' : 'Ordering Care Supplies'}</option>
                    <option>{isVi ? 'Hỏi về chế độ bảo hành' : 'Warranty Questions'}</option>
                    <option>{isVi ? 'Chương trình Trade / Dự án' : 'Trade Program / Commercial'}</option>
                    <option>{isVi ? 'Khác' : 'Other General Inquiries'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1A17] mb-1">
                    {isVi ? 'Nội dung tin nhắn *' : 'Message *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 text-xs bg-white border border-[#DCD3C0] rounded-xs focus:outline-none focus:border-[#ae5c4a]"
                    placeholder={isVi ? 'Vui lòng mô tả chi tiết thắc mắc của bạn...' : 'Please describe your request in detail...'}
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-gray-200 text-[#1C1A17] text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-gray-300"
                  >
                    {isVi ? 'Hủy' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#ae5c4a] hover:bg-[#974b3a] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer shadow-sm transition-colors"
                  >
                    {isVi ? 'Gửi Tin Nhắn' : 'Submit Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 6. MODAL: WARRANTY */}
      {activeModal === 'warranty' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#EAE3D2] max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE3D2] hover:bg-[#DCD3C0] flex items-center justify-center text-[#1C1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 text-left">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ae5c4a]">
                  {isVi ? 'Cam Kết Chất Lượng' : 'Warranty Policy'}
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1C1A17] mt-1">
                  {isVi ? 'Chính Sách Bảo Hành Di Sản B+Open' : 'B+Open Limited Warranty'}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="font-bold text-[#1C1A17] mb-1">
                    {isVi ? 'Bảo Hành Khung Gỗ Ipe (5 Năm Dân Dụng / 3 Năm Dự Án)' : 'Ipe Timber Frames (5-Year Residential / 3-Year Commercial)'}
                  </div>
                  <p>
                    {isVi
                      ? 'B+Open bảo hành mọi lỗi vật liệu và gia công liên kết mộng gỗ trong 5 năm đối với mục đích sử dụng dân dụng.'
                      : 'Warranted to be free from structural defects in materials and craftsmanship for 5 years in residential installations.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="font-bold text-[#1C1A17] mb-1">
                    {isVi ? 'Vải Sunbrella® & Sợi Viro® (5 Năm Kháng Phai Màu)' : 'Sunbrella® Fabrics & Viro® Fiber (5-Year Fade Resistance)'}
                  </div>
                  <p>
                    {isVi
                      ? 'Được bảo hành 5 năm không bị mất màu do tiếp xúc ánh nắng mặt trời và thời tiết tự nhiên.'
                      : 'Warranted against becoming unserviceable due to color or strength loss from normal usage and exposure conditions.'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#EAE3D2]">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 bg-[#1C1A17] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
