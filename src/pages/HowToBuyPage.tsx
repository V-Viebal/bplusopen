import React, { useState } from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Download, 
  Phone, 
  ArrowRight, 
  ChevronRight, 
  Search, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Navigation
} from 'lucide-react';
import heroImg from '../assets/images/how_to_buy_hero_1789045548664.jpg';
import { InlineEditableImage } from '../components/InlineEditableImage';

interface HowToBuyPageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string; tab?: 'retailers' | 'design-showrooms' | 'contract-hospitality' }) => void;
  onOpenCatalogModal?: () => void;
  onOpenTradeModal?: () => void;
}

export const HowToBuyPage: React.FC<HowToBuyPageProps> = ({
  onNavigate,
  onOpenCatalogModal,
  onOpenTradeModal,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // Quick lookup state for nearby retailer preview
  const [searchZip, setSearchZip] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const sampleRetailers = [
    {
      name: 'Pacific Outdoor Heritage',
      city: 'Santa Monica, CA',
      distance: '2.4 miles',
      address: '1420 Ocean Avenue, Santa Monica, CA 90401',
      phone: '(310) 899-4400',
      type: 'Premier Showcase Dealer',
      features: ['White-Glove Delivery', 'Full Lumino Display', 'Sunbrella Fabric Library'],
    },
    {
      name: 'Manhattan Terrace & Garden',
      city: 'New York, NY',
      distance: 'A&D Building, 8th Fl',
      address: '150 E 58th St, New York, NY 10155',
      phone: '(212) 644-2200',
      type: 'Flagship Design Center',
      features: ['Trade Concierge', 'CAD/BIM Assistance', 'All 8 Collections On-Site'],
    },
    {
      name: 'South Beach Living Patio Gallery',
      city: 'Miami, FL',
      distance: 'Design District',
      address: '3841 NE 2nd Avenue, Miami, FL 33137',
      phone: '(305) 573-8800',
      type: 'Coastal Luxury Partner',
      features: ['Marine-Grade Specs', 'Custom Cushion Studio', 'Immediate Stock Available'],
    },
    {
      name: 'Great Lakes Luxury Living',
      city: 'Chicago, IL',
      distance: 'The Mart Suite 1400',
      address: '222 W Merchandise Mart Plaza, Chicago, IL 60654',
      phone: '(312) 527-7000',
      type: 'Midwest Regional Showcase',
      features: ['Full Dining Suites', 'Penofin Finish Bar', 'On-Site Parking'],
    },
  ];

  const filteredRetailers = searchZip.trim()
    ? sampleRetailers.filter(
        (r) =>
          r.city.toLowerCase().includes(searchZip.toLowerCase()) ||
          r.name.toLowerCase().includes(searchZip.toLowerCase()) ||
          r.address.toLowerCase().includes(searchZip.toLowerCase())
      )
    : sampleRetailers;

  const faqs = [
    {
      q: isVi ? 'Tôi có thể đặt mua trực tiếp trên website của B+Open không?' : 'Can I purchase B+Open furniture directly online through this website?',
      a: isVi
        ? 'B+Open sản xuất dòng nội thất gỗ Ipe cao cấp nguyên khối đạt chuẩn FSC® 100%. Do đặc tính trọng lượng lớn, độ tinh xảo và các tùy chọn đệm Sunbrella® may đo riêng, chúng tôi phân phối độc quyền qua mạng lưới đại lý bán lẻ chuyên nghiệp và showroom ủy quyền trên toàn Bắc Mỹ để đảm bảo khách hàng luôn nhận được dịch vụ giao nhận white-glove, lắp đặt hoàn thiện và bảo hành chính hãng tốt nhất.'
        : 'B+Open crafts heavyweight, 100% FSC®-certified solid Ipe timber furniture designed for generations of outdoor living. Due to the substantial weight of our pieces, tailored Sunbrella® cushion choices, and white-glove residential delivery requirements, we distribute exclusively through an elite network of fine outdoor retailers and authorized design showrooms across North America.',
    },
    {
      q: isVi ? 'Làm sao để đặt may nệm với chất liệu vải và màu sắc theo sở thích cá nhân?' : 'How do I order custom Sunbrella® cushion fabrics and colors?',
      a: isVi
        ? 'Mỗi đại lý bán lẻ ủy quyền và Design Showroom đều trang bị đầy đủ cây mẫu vải B+Open Textile Studio với hơn 50+ mẫu vải ngoài trời Sunbrella® cao cấp, chống bám bẩn, kháng tia UV và thời tiết khắc nghiệt. Bạn có thể chọn vải mẫu trực tiếp hoặc yêu cầu đại lý đặt may riêng theo bảng spec của bạn.'
        : 'Every authorized retailer and design showroom maintains a comprehensive B+Open Fabric Swatch Gallery featuring 50+ Sunbrella® marine-grade acrylic fabrics. You can explore swatches in person, match colors to your outdoor landscape, and place custom cushion orders through your designated retailer.',
    },
    {
      q: isVi ? 'Thời gian giao hàng và lắp đặt thường mất bao lâu?' : 'What are the delivery lead times and white-glove options?',
      a: isVi
        ? 'Các sản phẩm nằm trong danh mục Quick-Ship sẵn có tại kho Bắc Mỹ thường được đại lý điều phối giao trong vòng 1-2 tuần. Đối với các đơn đặt hàng theo yêu cầu hoặc dự án lớn, thời gian giao hàng thường dao động từ 3-5 tuần kèm dịch vụ bàn giao, lắp ráp tận nơi và thu dọn bao bì.'
        : 'In-stock Quick-Ship items are typically fulfilled through local retail partner inventory within 1–2 weeks. Custom cushion configurations or contract orders generally ship within 3–5 weeks. Most of our fine retailers offer comprehensive white-glove delivery, including unboxing, professional placement, and packaging removal.',
    },
    {
      q: isVi ? 'Kiến trúc sư và nhà thiết kế nội thất có chính sách mua hàng riêng không?' : 'How do architects and interior designers place trade orders?',
      a: isVi
        ? 'Chúng tôi có chương trình Trade Program chuyên biệt dành riêng cho kiến trúc sư, nhà thiết kế nội thất và nhà phát triển dự án nghỉ dưỡng với các mức chiết khấu thương mại cạnh tranh, quyền tải thư viện 2D/3D CAD & BIM, cùng chuyên viên quản lý tài khoản riêng biệt.'
        : 'Yes. Verified design professionals, landscape architects, and hospitality developers can register for our Trade Program to unlock tier-based trade discounts, priority production allocation, 2D/3D CAD/BIM specifications, and dedicated concierge project assistance.',
    },
    {
      q: isVi ? 'Tôi có thể mua bộ sản phẩm dưỡng gỗ Ipe và phụ kiện thay thế ở đâu?' : 'Where can I purchase Ipe wood care kits and replacement parts?',
      a: isVi
        ? 'Tất cả các sản phẩm bảo dưỡng chính hãng như dầu dưỡng Ipe Penofin®, bộ chà nhám làm mới gỗ, ốc vít inox 316 và đệm thay thế đều có thể đặt mua trực tiếp thông qua bất kỳ đại lý B+Open ủy quyền nào gần bạn nhất.'
        : 'All authentic B+Open wood care solutions—including our custom Penofin® Ipe Wood Finish, restoration sanding kits, marine-grade 316 stainless replacement hardware, and replacement cushions—can be purchased through your local authorized dealer.',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#1C1A17] min-h-screen">
      {/* 
        ========================================================================
        HERO SECTION - IDENTICAL REPLICA OF USER'S SCREENSHOT
        Background image: Ocean-view cliffside terrace with 4 wood lounge chairs 
        around fire pit table.
        ========================================================================
      */}
      <section 
        id="how-to-buy-hero"
        className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center bg-[#1A1815] overflow-hidden"
      >
        <div className="absolute inset-0">
          <InlineEditableImage
            record="collection"
            recordId="how-to-buy"
            field="heroImage"
            value={heroImg}
            alt={isVi ? 'Không gian ngoài trời' : 'Outdoor terrace'}
            className="h-full w-full object-cover"
          />
        </div>
        {/* Cinematic dark tint overlay for crisp typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-32 sm:pt-40 pb-16 flex flex-col items-center">
          {/* Main Title - Matches exact layout and capitalization in screenshot */}
          <h1 
            id="how-to-buy-title"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-[0.12em] sm:tracking-[0.16em] uppercase drop-shadow-md mb-8 sm:mb-10 select-none"
          >
            HOW TO BUY
          </h1>

          {/* Prominent Ochre / Gold Action Button - Exact match to screenshot */}
          <button
            onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
            id="btn-find-a-retailer-hero"
            className="w-full max-w-[420px] sm:max-w-[460px] py-4 sm:py-4.5 px-8 bg-[#C8A870] hover:bg-[#BFA067] active:bg-[#B3935A] text-[#1C1A17] font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase rounded-xs transition-all duration-200 shadow-xl cursor-pointer text-center"
          >
            {isVi ? 'TÌM ĐẠI LÝ (FIND A RETAILER)' : 'FIND A RETAILER'}
          </button>

          {/* Sub-links - Exact match to screenshot under the gold button */}
          <div className="flex items-center justify-center gap-8 sm:gap-14 mt-6 sm:mt-8 text-white/95 text-xs sm:text-sm md:text-[15px] font-medium tracking-[0.05em]">
            <button
              onClick={() => onNavigate('showrooms', { tab: 'design-showrooms' })}
              className="hover:text-[#D4AF37] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              {isVi ? 'Showroom Thiết Kế' : 'Design Showroom'}
            </button>
            <button
              onClick={() => onNavigate('trade')}
              className="hover:text-[#D4AF37] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              {isVi ? 'Chương Trình Trade' : 'Trade Program'}
            </button>
          </div>
        </div>

        {/* Subtle bottom scroll indicator cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/80 font-light">
            {isVi ? 'Khám phá phương thức mua' : 'Explore Purchasing Options'}
          </span>
          <div className="w-4 h-7 border border-white/60 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-1.5 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        INTRODUCTION STATEMENT
        ========================================================================
      */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8C5535] mb-3">
          {isVi ? 'ĐẲNG CẤP & ĐỘ BỀN VƯỢT THỜI GIAN' : 'CRAFTED TO ENDURE • DELIVERED WITH CARE'}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1C1A17] font-bold leading-tight max-w-3xl mx-auto mb-6 uppercase tracking-wide">
          {isVi 
            ? 'Tại sao nội thất B+Open được phân phối qua các đối tác tuyển chọn?' 
            : 'Why B+Open is Sold Exclusively Through Fine Retail Partners'}
        </h2>
        <div className="w-16 h-0.5 bg-[#C8A870] mx-auto mb-6" />
        <p className="text-sm sm:text-base text-[#4A453E] font-light leading-relaxed max-w-3xl mx-auto">
          {isVi
            ? 'Gỗ Ipe Bolivia 100% chứng nhận FSC® có mật độ sợi dày gấp 3 lần gỗ Teak và độ cứng Janka đạt 3.680 lbf. Vì từng bộ bàn ghế mang trọng lượng nguyên khối và đòi hỏi sự chăm chút tinh xảo trong việc phối vải Sunbrella® cùng dịch vụ lắp đặt tận hiên nhà, chúng tôi hợp tác chặt chẽ cùng các nhà bán lẻ uy tín nhất để mang đến cho bạn trải nghiệm mua sắm hoàn mỹ từ bản vẽ đến không gian sống thực tế.'
            : 'Sustainably harvested from 100% FSC®-certified heartwood forests in Bolivia, genuine Ipe timber possesses three times the density of teak and a legendary 3,680 lbf Janka hardness rating. Because our substantial pieces demand expert handling, personalized Sunbrella® fabric curation, and white-glove residential placement, we partner with premier regional retailers who share our passion for generational craftsmanship.'}
        </p>
      </section>

      {/* 
        ========================================================================
        THREE DISTINCT PATHWAYS TO PURCHASE
        ========================================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Fine Retailers */}
          <div className="bg-white border border-[#E8E1D7] rounded-xs p-8 sm:p-9 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xs bg-[#F4EFEA] text-[#8C5535] flex items-center justify-center mb-6 group-hover:bg-[#8C5535] group-hover:text-white transition-colors">
                <MapPin className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <p className="text-[10.5px] uppercase font-bold tracking-[0.2em] text-[#8C5535] mb-2">
                {isVi ? 'Dành Cho Gia Chủ' : 'FOR HOMEOWNERS'}
              </p>
              <h3 className="text-xl sm:text-2xl font-serif text-[#1C1A17] font-normal mb-3">
                {isVi ? 'Đại Lý Bán Lẻ Ủy Quyền' : 'Authorized Fine Retailers'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C554D] leading-relaxed mb-6 font-light">
                {isVi
                  ? 'Ghé thăm các cửa hàng chuyên biệt về ngoại thất cao cấp tại địa phương bạn. Tận mắt chạm vào chất gỗ Ipe, thử nghiệm độ êm của nệm ngồi và được giao hàng white-glove trọn gói.'
                  : 'Visit local independent luxury patio furniture dealers throughout the United States and Canada. Experience full collection setups, test seating comfort, and receive white-glove home delivery.'}
              </p>

              <ul className="space-y-2.5 mb-8 text-xs text-[#4A453E]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5535] shrink-0" />
                  <span>{isVi ? 'Trưng bày bộ sưu tập hoàn chỉnh' : 'Full floor display pieces & sets'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5535] shrink-0" />
                  <span>{isVi ? 'Bộ mẫu vải Sunbrella® hơn 50 màu' : 'Comprehensive Sunbrella® swatch studio'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5535] shrink-0" />
                  <span>{isVi ? 'Dịch vụ vận chuyển & lắp ráp tận nơi' : 'White-glove residential setup & assembly'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5535] shrink-0" />
                  <span>{isVi ? 'Có sẵn bộ dầu dưỡng Penofin® & linh kiện' : 'Genuine Penofin® oils & care supplies'}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
              className="w-full py-3.5 px-6 bg-[#1C1A17] hover:bg-[#8C5535] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isVi ? 'Tìm Đại Lý Gần Bạn' : 'Find a Retailer Near You'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Design Showrooms */}
          <div className="bg-white border border-[#E8E1D7] rounded-xs p-8 sm:p-9 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xs bg-[#F4EFEA] text-[#8C5535] flex items-center justify-center mb-6 group-hover:bg-[#8C5535] group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <p className="text-[10.5px] uppercase font-bold tracking-[0.2em] text-[#8C5535] mb-2">
                {isVi ? 'Trải Nghiệm Trực Quan' : 'EXPERIENCE IN PERSON'}
              </p>
              <h3 className="text-xl sm:text-2xl font-serif text-[#1C1A17] font-normal mb-3">
                {isVi ? 'Showroom Thiết Kế' : 'Design Showrooms'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C554D] leading-relaxed mb-6 font-light">
                {isVi
                  ? 'Khám phá các trung tâm thiết kế (Design Centers) tại các đô thị lớn như New York, Atlanta, Chicago, Dallas, High Point để chiêm ngưỡng các thiết kế mới nhất của studio B+Open.'
                  : 'Immerse yourself in our premier flagship spaces and regional market showrooms. Compare natural timber patina variations, explore bespoke layouts, and consult with brand specialists.'}
              </p>

              <ul className="space-y-2.5 mb-8 text-xs text-[#4A453E]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5535] shrink-0" />
                  <span>{isVi ? 'Trưng bày bộ sưu tập mới nhất 2026' : 'Premier 2026 signature introductions'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5535] shrink-0" />
                  <span>{isVi ? 'Tư vấn chuyên sâu từ đại diện hãng' : 'One-on-one manufacturer consultations'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5535] shrink-0" />
                  <span>{isVi ? 'Mẫu vân gỗ tự nhiên & lão hóa bạc' : 'Natural heartwood & silver patina displays'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5535] shrink-0" />
                  <span>{isVi ? 'Hỗ trợ đặt lịch hẹn trực tiếp / online' : 'Private appointments & virtual walk-throughs'}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('showrooms', { tab: 'design-showrooms' })}
              className="w-full py-3.5 px-6 bg-[#C8A870] hover:bg-[#BFA067] text-[#1C1A17] text-xs font-semibold uppercase tracking-[0.16em] rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isVi ? 'Khám Phá Showroom' : 'Explore Design Showrooms'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Trade & Contract Program */}
          <div className="bg-white border border-[#E8E1D7] rounded-xs p-8 sm:p-9 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xs bg-[#F4EFEA] text-[#8C5535] flex items-center justify-center mb-6 group-hover:bg-[#8C5535] group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <p className="text-[10.5px] uppercase font-bold tracking-[0.2em] text-[#8C5535] mb-2">
                {isVi ? 'Dành Cho Chuyên Gia' : 'FOR DESIGN PROFESSIONALS'}
              </p>
              <h3 className="text-xl sm:text-2xl font-serif text-[#1C1A17] font-normal mb-3">
                {isVi ? 'Chương Trình Trade & Dự Án' : 'Trade & Contract Program'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C554D] leading-relaxed mb-6 font-light">
                {isVi
                  ? 'Chính sách ưu đãi độc quyền dành riêng cho kiến trúc sư, nhà thiết kế nội thất, cảnh quan và chủ đầu tư resort / khách sạn cao cấp với chiết khấu theo cấp bậc và hỗ trợ spec.'
                  : 'Tailored for accredited interior designers, landscape architects, luxury resorts, and high-volume commercial projects requiring specialized specifications and volume pricing.'}
              </p>

              <ul className="space-y-2.5 mb-8 text-xs text-[#4A453E]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5535] shrink-0" />
                  <span>{isVi ? 'Chiết khấu thương mại độc quyền' : 'Tiered professional trade discounts'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5535] shrink-0" />
                  <span>{isVi ? 'Thư viện file CAD, Revit BIM 2D/3D' : 'Complete 2D/3D CAD & Revit BIM files'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5535] shrink-0" />
                  <span>{isVi ? 'Chuyên viên quản lý dự án riêng' : 'Dedicated commercial account concierge'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5535] shrink-0" />
                  <span>{isVi ? 'Báo giá spec sheet & tùy biến COM' : 'Instant spec sheet exports & COM options'}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('trade')}
              className="w-full py-3.5 px-6 bg-[#1C1A17] hover:bg-[#8C5535] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isVi ? 'Đăng Ký Trade Program' : 'Join the Trade Program'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        INTERACTIVE QUICK RETAILER DIRECTORY PREVIEW
        ========================================================================
      */}
      <section className="bg-[#F0EAE1] border-y border-[#E2D8CC] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C5535] mb-2">
                {isVi ? 'TRA CỨU ĐIỂM BÁN HÀNG' : 'DEALER LOCATOR'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1A17] font-normal">
                {isVi ? 'Tìm Đại Lý Gần Bạn' : 'Featured Authorized Retailers'}
              </h2>
              <p className="text-xs sm:text-sm text-[#635B52] mt-1 font-light">
                {isVi 
                  ? 'Nhập mã bưu chính, thành phố hoặc tiểu bang để định vị đối tác chính thức' 
                  : 'Enter your city, state, or ZIP code to find nearby certified partners'}
              </p>
            </div>

            {/* Search Box */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                value={searchZip}
                onChange={(e) => setSearchZip(e.target.value)}
                placeholder={isVi ? 'Ví dụ: California, New York, Miami...' : 'e.g. California, New York, Miami...'}
                className="w-full bg-white border border-[#D5CCC0] rounded-xs pl-10 pr-4 py-3 text-xs text-[#1C1A17] focus:outline-none focus:border-[#8C5535] shadow-xs"
              />
              <Search className="w-4 h-4 text-[#8C5535] absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Retailer Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredRetailers.map((dealer, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E6DDD1] rounded-xs p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#8C5535] font-semibold uppercase tracking-wider mb-1.5">
                    <span>{dealer.type}</span>
                    <span className="text-[#A3988C] font-normal">{dealer.distance}</span>
                  </div>
                  <h4 className="font-serif text-base text-[#1C1A17] font-semibold mb-1">
                    {dealer.name}
                  </h4>
                  <p className="text-xs text-[#524B43] mb-3 leading-snug">
                    {dealer.address}
                  </p>

                  <div className="space-y-1 mb-4">
                    {dealer.features.map((f, fi) => (
                      <div key={fi} className="text-[11px] text-[#6E6459] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#8C5535]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                  <a
                    href={`tel:${dealer.phone.replace(/[^0-9]/g, '')}`}
                    className="text-xs font-semibold text-[#8C5535] hover:text-[#1C1A17] flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{dealer.phone}</span>
                  </a>

                  <button
                    onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
                    className="text-[11px] font-semibold text-[#1C1A17] hover:text-[#8C5535] flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isVi ? 'Bản đồ' : 'Map'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#1C1A17] hover:bg-[#8C5535] text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-xs transition-colors cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>{isVi ? 'Mở Bản Đồ Toàn Bộ Điểm Bán Hàng' : 'View Full Interactive Dealer Locator'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        4-STEP PURCHASING JOURNEY
        ========================================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8C5535] mb-2">
            {isVi ? 'QUY TRÌNH TINH GỌN' : 'THE BUYING JOURNEY'}
          </p>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#1C1A17] font-normal">
            {isVi ? 'Quy Trình 4 Bước Sở Hữu Nội Thất Gia Bảo' : 'From Inspiration to Outdoor Sanctuary in 4 Steps'}
          </h2>
          <div className="w-16 h-0.5 bg-[#C8A870] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white border border-[#E8E1D7] rounded-xs p-6 flex flex-col justify-between relative group hover:border-[#8C5535] transition-colors">
            <div>
              <span className="text-3xl font-serif font-light text-[#C8A870] mb-3 block">01</span>
              <h4 className="font-serif text-lg text-[#1C1A17] font-semibold mb-2">
                {isVi ? 'Khám Phá & Chọn Bộ Sưu Tập' : 'Explore Collections'}
              </h4>
              <p className="text-xs text-[#5C554D] leading-relaxed font-light">
                {isVi
                  ? 'Duyệt các bộ sưu tập chữ ký như Lumino, Richmond, Opal, Forte trên website hoặc tải danh mục Lookbook 2026 để lấy cảm hứng kiến trúc cảnh quan.'
                  : 'Browse our architectural collections online or download the 2026 Master Lookbook to explore configurations tailored to your terrace, pool, or patio.'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('furniture')}
              className="mt-6 text-xs font-semibold text-[#8C5535] hover:text-[#1C1A17] flex items-center gap-1 cursor-pointer"
            >
              <span>{isVi ? 'Xem sản phẩm' : 'Browse furniture'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-[#E8E1D7] rounded-xs p-6 flex flex-col justify-between relative group hover:border-[#8C5535] transition-colors">
            <div>
              <span className="text-3xl font-serif font-light text-[#C8A870] mb-3 block">02</span>
              <h4 className="font-serif text-lg text-[#1C1A17] font-semibold mb-2">
                {isVi ? 'Trải Nghiệm Tại Showroom' : 'Visit or Connect'}
              </h4>
              <p className="text-xs text-[#5C554D] leading-relaxed font-light">
                {isVi
                  ? 'Ghé thăm đại lý ủy quyền hoặc Design Showroom gần nhất để cảm nhận độ mịn của thớ gỗ Ipe và độ êm ái đàn hồi của đệm mút chuẩn hàng hải.'
                  : 'Visit an authorized dealer or design showroom. Experience ergonomic seat depths, test cushion firmness, and consult with seasoned outdoor design experts.'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('showrooms', { tab: 'design-showrooms' })}
              className="mt-6 text-xs font-semibold text-[#8C5535] hover:text-[#1C1A17] flex items-center gap-1 cursor-pointer"
            >
              <span>{isVi ? 'Xem showroom' : 'Locate showrooms'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-[#E8E1D7] rounded-xs p-6 flex flex-col justify-between relative group hover:border-[#8C5535] transition-colors">
            <div>
              <span className="text-3xl font-serif font-light text-[#C8A870] mb-3 block">03</span>
              <h4 className="font-serif text-lg text-[#1C1A17] font-semibold mb-2">
                {isVi ? 'Tùy Biến Vải & Quy Cách' : 'Select Fabrics & Finishes'}
              </h4>
              <p className="text-xs text-[#5C554D] leading-relaxed font-light">
                {isVi
                  ? 'Lựa chọn từ hơn 50 mã vải Sunbrella® cao cấp và quyết định để gỗ Ipe tự nhiên lão hóa màu bạc xám thanh lịch hoặc bảo dưỡng dầu Penofin® màu nâu socola ấm.'
                  : 'Choose from 50+ Sunbrella® performance fabrics. Decide whether to preserve the chocolate warmth with Penofin® oil or allow natural silver-gray patina aging.'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('materials')}
              className="mt-6 text-xs font-semibold text-[#8C5535] hover:text-[#1C1A17] flex items-center gap-1 cursor-pointer"
            >
              <span>{isVi ? 'Tìm hiểu chất liệu Ipe' : 'About Ipe wood'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-[#E8E1D7] rounded-xs p-6 flex flex-col justify-between relative group hover:border-[#8C5535] transition-colors">
            <div>
              <span className="text-3xl font-serif font-light text-[#C8A870] mb-3 block">04</span>
              <h4 className="font-serif text-lg text-[#1C1A17] font-semibold mb-2">
                {isVi ? 'Giao Nhận White-Glove' : 'White-Glove Delivery'}
              </h4>
              <p className="text-xs text-[#5C554D] leading-relaxed font-light">
                {isVi
                  ? 'Đại lý của chúng tôi điều phối dịch vụ giao hàng tận hiên nhà, lắp ráp chính xác từng chi tiết mộng ghép và thu dọn vỏ hộp chu đáo, sẵn sàng cho bạn tận hưởng.'
                  : 'Your retailer handles everything from freight logistics to on-site assembly, precise terrace positioning, and debris removal for immediate generational enjoyment.'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('care')}
              className="mt-6 text-xs font-semibold text-[#8C5535] hover:text-[#1C1A17] flex items-center gap-1 cursor-pointer"
            >
              <span>{isVi ? 'Hướng dẫn bảo quản' : 'Care & warranty'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        PURCHASING FAQ ACCORDION
        ========================================================================
      */}
      <section className="bg-white border-t border-[#E8E1D7] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C5535] mb-2">
              {isVi ? 'CÂU HỎI THƯỜNG GẶP' : 'PURCHASING FAQ'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1A17] font-normal">
              {isVi ? 'Giải Đáp Thắc Mắc Khi Mua Hàng' : 'Frequently Asked Questions'}
            </h2>
            <div className="w-12 h-0.5 bg-[#C8A870] mx-auto mt-3" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="border border-[#E8E1D7] rounded-xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-4.5 bg-[#FAF8F5] hover:bg-[#F4EFEA] flex items-center justify-between gap-4 cursor-pointer transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg text-[#1C1A17] font-medium">
                      {faq.q}
                    </span>
                    <span className="text-[#8C5535] text-xl font-light shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 py-5 bg-white border-t border-[#E8E1D7] text-xs sm:text-sm text-[#4A453E] leading-relaxed font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        FINAL CALL TO ACTION BANNER
        ========================================================================
      */}
      <section className="bg-[#1C1A17] text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#C8A870] mb-3 font-semibold">
            {isVi ? 'SẴN SÀNG NÂNG TẦM KHÔNG GIAN' : 'READY TO CRAFT YOUR RETREAT?'}
          </p>
          <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white mb-6">
            {isVi 
              ? 'Bắt Đầu Trải Nghiệm Cùng B+Open Ngay Hôm Nay' 
              : 'Connect with an Authorized Specialist Today'}
          </h2>
          <p className="text-xs sm:text-base text-[#D5CCC2] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            {isVi
              ? 'Cho dù bạn đang lên kế hoạch cho một hiên nhà biệt thự ấm cúng hay một dự án resort nghỉ dưỡng quy mô, đội ngũ đại diện và đại lý ủy quyền luôn sẵn lòng hỗ trợ bạn.'
              : 'Whether specifying for a private coastal terrace or furnishing a luxury hospitality estate, our certified partners are ready to bring your outdoor vision to life.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
              className="w-full sm:w-auto px-9 py-4 bg-[#C8A870] hover:bg-[#BFA067] text-[#1C1A17] font-semibold text-xs uppercase tracking-[0.2em] rounded-xs transition-colors cursor-pointer"
            >
              {isVi ? 'Tìm Đại Lý (Find a Retailer)' : 'Find a Retailer'}
            </button>

            <button
              onClick={() => {
                if (onOpenCatalogModal) onOpenCatalogModal();
                else onNavigate('furniture');
              }}
              className="w-full sm:w-auto px-9 py-4 bg-transparent hover:bg-white/10 text-white border border-white/40 font-semibold text-xs uppercase tracking-[0.2em] rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isVi ? 'Tải Catalogue 2026' : 'Download Catalog'}</span>
            </button>

            <button
              onClick={() => onNavigate('trade')}
              className="w-full sm:w-auto px-9 py-4 bg-transparent hover:bg-white/10 text-white/80 hover:text-white text-xs uppercase tracking-[0.2em] rounded-xs transition-colors cursor-pointer"
            >
              {isVi ? 'Dành Cho KTS & Nhà Thiết Kế →' : 'For Designers & Architects →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
