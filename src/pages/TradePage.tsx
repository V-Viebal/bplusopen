import React, { useState, useRef } from 'react';
import { PageId } from '../types';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { 
  CheckCircle2, 
  Download, 
  Mail, 
  ArrowRight, 
  FileText, 
  Phone, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TradePageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string; tab?: 'retailers' | 'design-showrooms' | 'contract-hospitality' }) => void;
  onOpenCatalogModal: () => void;
}

interface BenefitCard {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  image: string;
}

export const TradePage: React.FC<TradePageProps> = ({ onNavigate, onOpenCatalogModal }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [step1Errors, setStep1Errors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    website: '',
    workEmail: '',
    workPhone: '',
    country: 'United States',
    zipCode: '',
    usState: '',
    businessType: 'Interior Designer',
    taxId: '',
    projectType: 'High-End Residential',
    annualVolume: '$50,000 - $100,000',
    notes: '',
    uploadedFileName: '',
  });

  const usStatesList = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const scrollToApplication = () => {
    const el = document.getElementById('trade-account-application');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!formData.firstName.trim()) errors.push('First Name');
    if (!formData.lastName.trim()) errors.push('Last Name');
    if (!formData.company.trim()) errors.push('Company');
    if (!formData.website.trim()) errors.push('Website');
    if (!formData.workEmail.trim()) errors.push('Work Email');
    if (!formData.workPhone.trim()) errors.push('Work Phone');
    if (!formData.zipCode.trim()) errors.push('Zip / Postal Code');
    if (formData.country === 'United States' && !formData.usState) errors.push('US State');

    if (errors.length > 0) {
      setStep1Errors(errors);
      return;
    }

    setStep1Errors([]);
    setCurrentStep(2);
    const formTop = document.getElementById('trade-account-application');
    if (formTop) {
      formTop.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // 7 Member Benefits from user screenshots
  const memberBenefits: BenefitCard[] = [
    {
      id: 'early-access',
      title: 'Early Access',
      titleVi: 'Đặc Quyền Tiếp Cận Sớm',
      description:
        'Be first in line for the best of the season. Consult your Design Concierge for early access to select new releases.',
      descriptionVi:
        'Ưu tiên tiếp cận sớm các bộ sưu tập mới nhất trong mùa. Trao đổi cùng Chuyên viên Tư Vấn Thiết Kế để đặt trước các thiết kế giới hạn.',
      image:
        'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'trade-publicity',
      title: 'Trade Publicity',
      titleVi: 'Quảng Bá Dự Án Đối Tác',
      description:
        "We promote our Trade members' projects to our North American network of customers through editorial features, emails, and social media.",
      descriptionVi:
        'Chúng tôi đồng hành quảng bá các dự án tiêu biểu của đối tác kiến trúc qua các bài viết chuyên đề, bản tin và hệ thống truyền thông toàn cầu.',
      image:
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'trade-pricing',
      title: 'Trade Pricing',
      titleVi: 'Mức Giá Chiết Khấu Đối Tác',
      description: 'Enjoy your Trade discount every day on our full line.',
      descriptionVi: 'Hưởng mức chiết khấu thương mại độc quyền mỗi ngày trên toàn bộ danh mục sản phẩm cao cấp.',
      image:
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'concierge-service',
      title: 'Concierge Service',
      titleVi: 'Dịch Vụ Tư Vấn Thiết Kế Tận Tâm',
      description:
        "B+Open's Design Concierge is here to help you with sourcing, placing orders, and delivery.",
      descriptionVi:
        'Đội ngũ Chuyên viên Tư Vấn Thiết Kế B+Open luôn sẵn sàng hỗ trợ bạn tìm kiếm mẫu, hoàn tất đơn đặt hàng và điều phối vận chuyển dự án.',
      image:
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'vip-events',
      title: 'VIP Events',
      titleVi: 'Sự Kiện VIP & Kết Nối Ngành',
      description:
        'Network with industry leaders, furniture designers, and fellow Trade members at our curated, intimate events such as HPMKT and Casual Show.',
      descriptionVi:
        'Kết nối cùng các nhà lãnh đạo trong ngành, nhà thiết kế nội thất và thành viên Trade tại các sự kiện thân mật tại HPMKT và Casual Market.',
      image:
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'special-orders',
      title: 'Special Orders',
      titleVi: 'Đơn Hàng Đặt Riêng (COM / Custom)',
      description:
        'Your Design Concierge can special-order from a wide range of top fabric brands, including COM orders.',
      descriptionVi:
        'Chuyên viên thiết kế hỗ trợ đặt hàng riêng từ các thương hiệu vải hàng đầu thế giới (Sunbrella®) và hỗ trợ đơn hàng vải do khách chỉ định (COM).',
      image:
        'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'exclusive-promotions',
      title: 'Exclusive Promotions',
      titleVi: 'Khuyến Mãi Độc Quyền',
      description:
        "In addition to your everyday Trade discount, you'll have access to Trade-only discounts during promotions and special offers.",
      descriptionVi:
        'Bên cạnh mức chiết khấu định kỳ, bạn sẽ nhận được các ưu đãi đặc biệt dành riêng cho thành viên Trade trong các đợt ra mắt và chương trình ưu tiên.',
      image:
        'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* 1. TOP HERO SECTION: DEEP FOREST GREEN (Matching Image 1 & 2) */}
      <section className="bg-[#2D3E35] text-white pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          
          {/* Top Logo Mark: MADE TO INSPIRE / TRADE */}
          <div className="inline-flex flex-col items-center justify-center">
            <span className="text-[11px] sm:text-xs tracking-[0.3em] font-medium uppercase text-white/90 leading-tight">
              MADE TO
            </span>
            <span className="text-sm sm:text-base tracking-[0.35em] font-serif uppercase text-white font-light leading-tight">
              INSPIRE
            </span>
            <div className="w-14 h-[1px] bg-white/70 my-1.5" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.35em] font-bold uppercase text-white">
              TRADE
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-normal text-white tracking-tight leading-tight max-w-4xl mx-auto">
            {isVi
              ? 'Chương Trình Đối Tác Toàn Diện B+Open (Trade Program)'
              : 'The All-New B+Open Trade Program'}
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base text-white/85 font-normal leading-relaxed max-w-3xl mx-auto px-2">
            {isVi
              ? 'Từ dịch vụ chăm sóc tận tâm của Chuyên viên Tư vấn Thiết kế đến sự thuận tiện khi đặt hàng trực tiếp từ đại diện thương hiệu, hãy khám phá lý do vì sao tư cách thành viên Trade là giải pháp không thể thiếu. Chúng tôi luôn sẵn sàng hỗ trợ các dự án ở mọi quy mô: phòng khách ngoài trời, hồ bơi, ban công và nội thất sân vườn di sản.'
              : "From the unparalleled personal service of our Design Concierge to the convenience of ordering directly from your corporate liaison, learn why B+Open Trade membership is a must-have. We're here to help you with projects of all shapes and sizes, including outdoor living spaces, pool, deck, and patio furniture."}
          </p>

          {/* White Pill CTA Button */}
          <div className="pt-2">
            <button
              id="hero-trade-apply-btn"
              onClick={scrollToApplication}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1C2822] hover:bg-[#F3EEE6] text-xs font-semibold uppercase tracking-[0.18em] rounded-full transition-all duration-200 shadow-md cursor-pointer hover:shadow-lg transform active:scale-98"
            >
              {isVi ? 'ĐĂNG KÝ TÀI KHOẢN ĐỐI TÁC' : 'TRADE ACCOUNT APPLICATION'}
            </button>
          </div>
        </div>

        {/* Hero Photographic Feature: Poolside Patio with Fire Pit (Matching Image 2) */}
        <div className="max-w-6xl mx-auto mt-12 sm:mt-16 px-0 sm:px-4">
          <div className="relative w-full aspect-16/9 sm:aspect-21/9 rounded-xs overflow-hidden shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
              alt="Outdoor Living Patio with Fire Pit and Poolside Lounge"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 2. MEMBER BENEFITS CAROUSEL SECTION (Matching Image 2, 3, 4, 5) */}
      <section className="bg-[#2D3E35] text-white pt-10 sm:pt-14 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Row: Member Benefits (Left) & JOIN NOW (Right) */}
          <div className="flex items-center justify-between pb-8 sm:pb-12 border-b border-white/15">
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-light tracking-tight">
              {isVi ? 'Đặc Quyền Thành Viên' : 'Member Benefits'}
            </h2>
            <button
              onClick={scrollToApplication}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-[#1C2822] hover:bg-[#F3EEE6] text-xs font-semibold uppercase tracking-[0.18em] rounded-full transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-98"
            >
              {isVi ? 'THAM GIA NGAY' : 'JOIN NOW'}
            </button>
          </div>

          {/* Carousel Slider with Navigation Arrows */}
          <div className="relative mt-8 group">
            
            {/* Left Chevron Button */}
            <button
              onClick={() => scrollCarousel('left')}
              aria-label="Previous Benefit"
              className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Chevron Button */}
            <button
              onClick={() => scrollCarousel('right')}
              aria-label="Next Benefit"
              className="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {memberBenefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="shrink-0 w-[280px] sm:w-[320px] md:w-[350px] bg-white text-[#1C1A17] rounded-xs overflow-hidden shadow-lg flex flex-col transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Card Image */}
                  <div className="relative aspect-4/3 w-full bg-[#EAE3DA] overflow-hidden">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-start space-y-3">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1A17] tracking-tight">
                      {isVi ? benefit.titleVi : benefit.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#554C42] leading-relaxed font-normal">
                      {isVi ? benefit.descriptionVi : benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Dots Hint */}
            <div className="flex items-center justify-center gap-1.5 mt-6 text-white/50 text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-white" />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRADE ACCOUNT APPLICATION FORM (Matching User Screenshots 1, 2, 3) */}
      <section
        id="trade-account-application"
        className="py-16 sm:py-24 bg-white border-t border-[#EAE3DA] scroll-mt-10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Title & Descriptive Opening Paragraphs */}
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1C1A17] tracking-tight">
              {isVi ? 'Đăng Ký Tài Khoản Trade (Trade Account Application)' : 'Trade Account Application'}
            </h2>
            <div className="max-w-3xl mx-auto space-y-3.5 text-sm sm:text-base text-[#444] font-normal leading-relaxed">
              <p>
                {isVi
                  ? 'Cảm ơn bạn đã quan tâm đến việc thiết lập tài khoản Trade với chúng tôi; chúng tôi rất vinh hạnh được đồng hành cùng các đối tác thiết kế mới.'
                  : 'Thank you for your interest in establishing a trade account with us; we love working with new design partners.'}
              </p>
              <p>
                {isVi
                  ? 'Để bắt đầu, vui lòng điền vào biểu mẫu bên dưới giúp chúng tôi hiểu rõ hơn về bạn và doanh nghiệp của bạn. Nếu có bất kỳ câu hỏi nào về đơn đăng ký này, các dòng sản phẩm, năng lực sản xuất hoặc phương thức hợp tác, xin đừng ngần ngại liên hệ với chúng tôi.'
                  : 'To get started, please fill out the form below to help us become familiar with you and your business. Should you have any questions about this application, our products and capabilities or simply how we do business, please do not hesitate to contact us.'}
              </p>
              <p className="font-medium text-[#1C1A17]">
                {isVi
                  ? 'Chúng tôi dành riêng tài khoản Trade cho các Nhà thiết kế nội thất, Kiến trúc sư, Đơn vị trưng bày Showroom và Nhà thầu / Thu mua FF&E.'
                  : 'We reserve trade accounts for Interior designers, Architects, Showroom and FF&E Procurement/Contractors.'}
              </p>
            </div>
          </div>

          {/* Form Container */}
          {submitted ? (
            <div className="py-16 px-6 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs text-center space-y-5 shadow-sm">
              <div className="w-16 h-16 bg-[#2D3E35] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1A17]">
                {isVi ? 'Đơn Đăng Ký Đã Được Tiếp Nhận' : 'Trade Application Received'}
              </h3>
              <p className="text-sm sm:text-base text-[#554C42] max-w-lg mx-auto leading-relaxed">
                {isVi
                  ? `Cảm ơn bạn, ${formData.firstName} ${formData.lastName}. Đội ngũ Trade Liaison của B+Open đang xét duyệt hồ sơ và sẽ gửi xác nhận kèm thông tin chiết khấu độc quyền đến ${formData.workEmail} trong vòng 24 giờ làm việc.`
                  : `Thank you, ${formData.firstName} ${formData.lastName}. Our trade liaison team is reviewing your credentials and will reach out to ${formData.workEmail} with your trade pricing tier and dedicated account representative within 24 hours.`}
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-2.5 bg-[#2B2B2B] hover:bg-[#111] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {isVi ? 'Gửi Thêm Hồ Sơ Khác' : 'Submit Another Application'}
                </button>
                <button
                  onClick={onOpenCatalogModal}
                  className="px-6 py-2.5 bg-white border border-[#D5D5D5] hover:bg-[#F3EEE6] text-[#1C1A17] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {isVi ? 'Tải Catalogue Dự Án' : 'Download Lookbook & Specs'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white">
              {/* Step indicator and Confidentiality Notice */}
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#1C1A17]">
                  {currentStep === 1
                    ? (isVi ? 'Thông Tin Của Bạn (Bước 1/2)' : 'About You (1 of 2)')
                    : (isVi ? 'Thông Tin Doanh Nghiệp (Bước 2/2)' : 'About Your Business (2 of 2)')}
                </h3>
                <p className="text-sm italic text-[#555] mt-1">
                  {isVi ? 'Mọi thông tin đều được bảo mật tuyệt đối.' : 'All information will remain confidential.'}
                </p>
              </div>

              {/* Horizontal Divider Line Matching Screenshot */}
              <hr className="border-t border-[#1C1A17]/80 my-4" />

              {step1Errors.length > 0 && currentStep === 1 && (
                <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
                  {isVi
                    ? `Vui lòng điền đầy đủ các trường bắt buộc (*): ${step1Errors.join(', ')}`
                    : `Please fill in the required fields (*): ${step1Errors.join(', ')}`}
                </div>
              )}

              {/* STEP 1: ABOUT YOU */}
              {currentStep === 1 && (
                <form onSubmit={handleNextStep} className="space-y-6 pt-2">
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                        {isVi ? 'Tên (First Name)' : 'First Name'} <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="First"
                        className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] placeholder-[#A0A0A0] focus:outline-none focus:border-[#111] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                        {isVi ? 'Họ (Last Name)' : 'Last Name'} <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Last"
                        className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] placeholder-[#A0A0A0] focus:outline-none focus:border-[#111] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company & Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                        {isVi ? 'Công Ty (Company)' : 'Company'} <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your Company"
                        className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] placeholder-[#A0A0A0] focus:outline-none focus:border-[#111] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                        {isVi ? 'Website' : 'Website'} <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="www.yourdomain.com"
                        className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] placeholder-[#A0A0A0] focus:outline-none focus:border-[#111] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                      {isVi ? 'Email Công Việc (Work Email)' : 'Work Email'} <span className="text-red-600 font-bold">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] placeholder-[#A0A0A0] focus:outline-none focus:border-[#111] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Work Phone */}
                  <div>
                    <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                      {isVi ? 'Số Điện Thoại Công Việc (Work Phone)' : 'Work Phone'} <span className="text-red-600 font-bold">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.workPhone}
                      onChange={(e) => setFormData({ ...formData, workPhone: e.target.value })}
                      placeholder="+1 (555) 555-5555"
                      className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] placeholder-[#A0A0A0] focus:outline-none focus:border-[#111] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Country & Zip / Postal Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                        {isVi ? 'Quốc Gia (Country)' : 'Country'} <span className="text-red-600 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] focus:outline-none focus:border-[#111] focus:bg-white transition-colors appearance-none cursor-pointer pr-10"
                        >
                          <option value="United States">United States</option>
                          <option value="Vietnam">{isVi ? 'Việt Nam' : 'Vietnam'}</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="France">France</option>
                          <option value="Germany">Germany</option>
                          <option value="Other">{isVi ? 'Quốc gia khác' : 'Other'}</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#555]">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                        {isVi ? 'Mã Bưu Chính (Zip / Postal Code)' : 'Zip / Postal Code'} <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        placeholder="55555"
                        className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] placeholder-[#A0A0A0] focus:outline-none focus:border-[#111] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* US States (Dropdown when United States is selected, or region input) */}
                  {formData.country === 'United States' ? (
                    <div>
                      <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                        US States <span className="text-red-600 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={formData.usState}
                          onChange={(e) => setFormData({ ...formData, usState: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] focus:outline-none focus:border-[#111] focus:bg-white transition-colors appearance-none cursor-pointer pr-10"
                        >
                          <option value="">- Select State -</option>
                          {usStatesList.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#555]">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                        {isVi ? 'Tỉnh / Bang / Thành Phố' : 'State / Province / Region'}
                      </label>
                      <input
                        type="text"
                        value={formData.usState}
                        onChange={(e) => setFormData({ ...formData, usState: e.target.value })}
                        placeholder={isVi ? 'Ví dụ: TP. Hồ Chí Minh, Hà Nội...' : 'e.g. Ontario, London...'}
                        className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] placeholder-[#A0A0A0] focus:outline-none focus:border-[#111] focus:bg-white transition-colors"
                      />
                    </div>
                  )}

                  {/* Next Button Matching Image 3 (Right aligned, dark button) */}
                  <div className="pt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-9 py-2.5 bg-[#2B2B2B] hover:bg-[#111] text-white text-sm font-medium tracking-wide transition-colors cursor-pointer shadow-xs active:scale-98"
                    >
                      {isVi ? 'Tiếp Theo' : 'Next'}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: ABOUT YOUR BUSINESS (Credentials & Project Details) */}
              {currentStep === 2 && (
                <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                  {/* Business Type & Resale Tax ID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                        {isVi ? 'Chuyên Ngành / Vai Trò' : 'Business Specialty'} <span className="text-red-600 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] focus:outline-none focus:border-[#111] focus:bg-white transition-colors appearance-none cursor-pointer pr-10"
                        >
                          <option value="Interior Designer">{isVi ? 'Nhà Thiết Kế Nội Thất (Interior Designer)' : 'Interior Designer'}</option>
                          <option value="Architect">{isVi ? 'Kiến Trúc Sư (Architect)' : 'Architect'}</option>
                          <option value="Landscape Architect">{isVi ? 'Kiến Trúc Sư Cảnh Quan (Landscape Architect)' : 'Landscape Architect'}</option>
                          <option value="Showroom Partner">{isVi ? 'Đối Tác Showroom / Bán Lẻ' : 'Showroom / Retailer Partner'}</option>
                          <option value="FF&E Procurement / Contractor">{isVi ? 'Nhà Thầu / Đơn Vị Thu Mua FF&E' : 'FF&E Procurement / Contractor'}</option>
                          <option value="Developer / Property Manager">{isVi ? 'Chủ Đầu Tư / Quản Lý Bất Động Sản' : 'Developer / Property Manager'}</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#555]">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                        {isVi ? 'Mã Số Thuế / Giấy Phép Hành Nghề' : 'Tax ID / Resale Certificate #'} <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.taxId}
                        onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                        placeholder={isVi ? 'Mã số thuế doanh nghiệp hoặc số giấy phép' : 'e.g. State Resale Tax ID or ASID / AIA #'}
                        className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] placeholder-[#A0A0A0] focus:outline-none focus:border-[#111] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Primary Project Focus & Annual Purchasing Volume */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                        {isVi ? 'Loại Hình Dự Án Chính' : 'Primary Project Focus'}
                      </label>
                      <div className="relative">
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] focus:outline-none focus:border-[#111] focus:bg-white transition-colors appearance-none cursor-pointer pr-10"
                        >
                          <option value="High-End Residential">{isVi ? 'Biệt Thự & Nhà Ở Cao Cấp (Residential)' : 'High-End Residential'}</option>
                          <option value="Luxury Hospitality & Resorts">{isVi ? 'Khu Nghỉ Dưỡng & Khách Sạn 5* (Hospitality)' : 'Luxury Hospitality & Resorts'}</option>
                          <option value="Commercial / Corporate">{isVi ? 'Thương Mại & Văn Phòng Doanh Nghiệp' : 'Commercial / Corporate'}</option>
                          <option value="Country Club / Private Estates">{isVi ? 'Sân Golf & Câu Lạc Bộ Tư Nhân' : 'Country Club / Private Estates'}</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#555]">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                        {isVi ? 'Quy Mô Ngân Sách Dự Án / Năm' : 'Estimated Annual Volume'}
                      </label>
                      <div className="relative">
                        <select
                          value={formData.annualVolume}
                          onChange={(e) => setFormData({ ...formData, annualVolume: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] focus:outline-none focus:border-[#111] focus:bg-white transition-colors appearance-none cursor-pointer pr-10"
                        >
                          <option value="Under $25,000">Dưới $25,000 (Under $25k)</option>
                          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                          <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                          <option value="$100,000+">$100,000+</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#555]">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upload Resale Certificate or Business Card */}
                  <div>
                    <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                      {isVi ? 'Đính Kèm Giấy Phép / Danh Thiếp Kinh Doanh (Tùy Chọn)' : 'Attach Resale Certificate or Business Card (Optional)'}
                    </label>
                    <div className="border-2 border-dashed border-[#D5D5D5] hover:border-[#1C1A17] p-6 text-center rounded-xs bg-[#FAFAFA] transition-colors cursor-pointer relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFormData({ ...formData, uploadedFileName: e.target.files[0].name });
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <FileText className="w-8 h-8 mx-auto text-[#777] mb-2" />
                      <p className="text-xs sm:text-sm text-[#444] font-medium">
                        {formData.uploadedFileName
                          ? `${isVi ? 'Đã chọn: ' : 'Selected: '} ${formData.uploadedFileName}`
                          : (isVi
                              ? 'Nhấp hoặc kéo thả tệp PDF / JPG / PNG vào đây'
                              : 'Click to upload or drag and drop your resale certificate or professional license')}
                      </p>
                      <p className="text-[11px] text-[#888] mt-1">PDF, JPG, PNG up to 15MB</p>
                    </div>
                  </div>

                  {/* Project Details & Inquiries */}
                  <div>
                    <label className="block text-sm font-bold text-[#1C1A17] mb-1.5">
                      {isVi ? 'Ghi Chú Về Dự Án Hoặc Yêu Cầu Chỉ Định Cụ Thể' : 'Project Notes / Specific Collections of Interest'}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={isVi
                        ? 'Ví dụ: Đang lên phương án cho resort ven biển với 20 phòng suite ngoài trời, cần tìm hiểu về gỗ Ipe và vải Sunbrella chỉ định...'
                        : "Tell us about your upcoming project or any specific B+Open collections you'd like to specify..."}
                      className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#D5D5D5] text-sm text-[#222] placeholder-[#A0A0A0] focus:outline-none focus:border-[#111] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Back & Submit Application Buttons */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-2.5 bg-white border border-[#D5D5D5] hover:bg-[#FAFAFA] text-[#1C1A17] text-sm font-medium tracking-wide transition-colors cursor-pointer"
                    >
                      {isVi ? 'Quay Lại' : 'Back'}
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-2.5 bg-[#2B2B2B] hover:bg-[#111] text-white text-sm font-medium tracking-wide transition-colors cursor-pointer shadow-xs active:scale-98"
                    >
                      {isVi ? 'Nộp Hồ Sơ Đăng Ký' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Complementary Architecture & Trade Support Bar Below */}
          <div className="mt-16 pt-12 border-t border-[#EAE3DA] grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF7F2] p-5 border border-[#EAE3DA] rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-[#8C5535]">
                <FileText className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isVi ? 'Thư Viện 3D CAD / Revit' : '3D CAD & Revit BIM'}
                </span>
              </div>
              <p className="text-xs text-[#6B5E52] leading-relaxed">
                {isVi ? 'Tải trọn bộ mô hình 3D .DWG, .SKP cho kiến trúc sư.' : 'Download complete 3D models for rendering and construction documents.'}
              </p>
              <button
                onClick={onOpenCatalogModal}
                className="text-xs font-semibold text-[#1C1A17] hover:text-[#8C5535] underline cursor-pointer pt-1 inline-flex items-center gap-1"
              >
                {isVi ? 'Tải Thư Viện Kỹ Thuật' : 'Request Spec Binder'} &rarr;
              </button>
            </div>

            <div className="bg-[#FAF7F2] p-5 border border-[#EAE3DA] rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-[#8C5535]">
                <Mail className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isVi ? 'Liên Hệ Trực Tiếp' : 'Direct Trade Inquiries'}
                </span>
              </div>
              <p className="text-xs text-[#6B5E52] leading-relaxed">
                trade@bopenoutdoor.com | +1 (800) 403-0403 (M-F 8am-5pm EST)
              </p>
              <span className="text-[11px] text-[#8C5535] font-medium block">
                {isVi ? 'Phản hồi trong 24 giờ' : 'Dedicated Concierge within 24h'}
              </span>
            </div>

            <div className="bg-[#FAF7F2] p-5 border border-[#EAE3DA] rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-[#8C5535]">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isVi ? 'Showroom & Đại Lý' : 'Experience In Person'}
                </span>
              </div>
              <p className="text-xs text-[#6B5E52] leading-relaxed">
                {isVi ? 'Tham quan trực tiếp tại các Design Showroom ủy quyền.' : 'Locate authorized retailers or visit our design centers.'}
              </p>
              <div className="flex items-center gap-3 pt-1 flex-wrap">
                <button
                  onClick={() => {
                    onNavigate('showrooms', { tab: 'design-showrooms' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-[#1C1A17] hover:text-[#8C5535] underline cursor-pointer inline-flex items-center gap-1"
                >
                  {isVi ? 'Design Showrooms' : 'Design Showrooms'} &rarr;
                </button>
                <span className="text-[#D5CCC2]">|</span>
                <button
                  onClick={() => {
                    onNavigate('showrooms', { tab: 'retailers' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-[#1C1A17] hover:text-[#8C5535] underline cursor-pointer inline-flex items-center gap-1"
                >
                  {isVi ? 'Tìm Đại Lý' : 'Find a Retailer'} &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};


