import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Store, 
  HelpCircle,
  FileText,
  Sparkles,
  MapPin,
  Send
} from 'lucide-react';

interface HelpCenterPageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string; tab?: 'retailers' | 'design-showrooms' | 'contract-hospitality' }) => void;
  onOpenCatalogModal?: () => void;
  onOpenTradeModal?: () => void;
}

interface FaqItem {
  id: string;
  category: 'care' | 'buy' | 'warranty' | 'general';
  questionEn: string;
  questionVi: string;
  answerEn: string;
  answerVi: string;
  actionTextEn?: string;
  actionTextVi?: string;
  actionTarget?: PageId;
  actionExtra?: { tab?: 'retailers' | 'design-showrooms' | 'contract-hospitality' };
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'restore-ipe',
    category: 'care',
    questionEn: "How do I restore my Ipe Wood furniture to an 'as new' finish after it goes gray?",
    questionVi: "Làm thế nào để khôi phục màu gỗ Ipe về màu nâu hổ phách nguyên bản khi đã ngả bạc?",
    answerEn: "To restore the deep chocolate-brown 'as new' finish of Bolivian Ipe wood, simply wash the furniture with a wood cleaner or mild detergent, let it dry completely for 24-48 hours, light sand if needed with 120-grit sandpaper, and apply a thin, even coat of Penofin Verde Wood Oil. Wipe off any excess after 20 minutes.",
    answerVi: "Để khôi phục màu nâu hổ phách sâu nguyên bản của gỗ Ipe Bolivia, hãy vệ sinh sạch bề mặt bằng dung dịch tẩy rửa gỗ chuyên dụng hoặc nước xà phòng nhẹ, để khô hoàn toàn trong 24-48 giờ, xả nhám nhẹ (giấy nhám 120-grit) nếu cần và thoa một lớp mỏng dầu bảo dưỡng Penofin Verde. Lau sạch phần dầu thừa sau 20 phút.",
    actionTextEn: "View Care & Maintenance Guide",
    actionTextVi: "Xem Hướng Dẫn Bảo Dưỡng",
    actionTarget: 'care',
  },
  {
    id: 'ipe-go-gray',
    category: 'care',
    questionEn: "Can I let my Ipe Wood furniture go gray?",
    questionVi: "Tôi có thể để gỗ Ipe tự nhiên ngả sang màu xám bạc ánh kim được không?",
    answerEn: "Yes, absolutely! Bolivian Ipe is one of the densest and most durable hardwoods in the world. Letting it weather naturally into an elegant, silvery-gray patina does not diminish its structural integrity or lifespan in the slightest. It requires minimal maintenance other than occasional washing with soap and water.",
    answerVi: "Hoàn toàn được! Gỗ Ipe Bolivia là một trong những loại gỗ cứng đặc và bền nhất thế giới. Để gỗ phong hóa tự nhiên sang màu xám bạc quý phái ánh kim không hề ảnh hưởng đến độ bền kết cấu hay tuổi thọ hàng chục năm của sản phẩm. Bạn chỉ cần lau rửa định kỳ bằng nước ấm và xà phòng nhẹ.",
    actionTextEn: "Learn About Ipe Wood",
    actionTextVi: "Tìm Hiểu Về Gỗ Ipe",
    actionTarget: 'materials',
  },
  {
    id: 'care-supplies',
    category: 'care',
    questionEn: "What care supplies do I need for my furniture?",
    questionVi: "Tôi cần những dụng cụ và vật tư bảo dưỡng nào cho đồ nội thất?",
    answerEn: "For routine maintenance, you only need mild soap, warm water, and a soft-bristle brush. To maintain or restore the amber-brown luster, we recommend Penofin Verde Oil (an environmentally friendly, zero-VOC formula designed specifically for dense tropical hardwoods), fine sanding sponges (120-150 grit), and lint-free cotton cloths.",
    answerVi: "Để làm sạch thông thường, bạn chỉ cần xà phòng nhẹ, nước ấm và bàn chải lông mềm. Để duy trì sắc nâu hổ phách ấm áp, chúng tôi khuyến nghị dùng dầu Penofin Verde (công thức gốc thực vật không chứa VOC chuyên dụng cho gỗ cứng nhiệt đới), miếng nhám xốp mịn (120-150 grit) và khăn bông không xơ.",
  },
  {
    id: 'ipe-weather-resistance',
    category: 'care',
    questionEn: "How well does Ipe wood stand up to being left outside?",
    questionVi: "Gỗ Ipe chịu đựng các điều kiện thời tiết khắc nghiệt ngoài trời tốt như thế nào?",
    answerEn: "Bolivian Ipe is naturally impervious to decay, moisture, mold, termites, and rot thanks to its incredible density (Janka hardness of 3,680 lbf - nearly three times harder than Teak). It carries a Class A fire rating (the same as concrete and steel) and can withstand intense coastal sun, torrential rain, frost, and snow year after year.",
    answerVi: "Gỗ Ipe Bolivia có khả năng kháng ẩm, chống mối mọt, nấm mốc và mục rữa tự nhiên nhờ mật độ thớ gỗ cực cao (độ cứng Janka đạt 3,680 lbf - cứng gấp 3 lần gỗ Teak). Gỗ đạt tiêu chuẩn chống cháy cấp A (tương đương bê tông và thép), bền bỉ vượt trội trước nắng gắt ven biển, mưa bão, sương giá và tuyết lạnh quanh năm.",
  },
  {
    id: 'suggested-price',
    category: 'buy',
    questionEn: "What does the 'suggested' price mean?",
    questionVi: "Mức giá 'đề xuất' (Suggested Price / MSRP) có ý nghĩa như thế nào?",
    answerEn: "The suggested retail price (MSRP) is the manufacturer's benchmark price. Actual showroom and retail prices may vary based on local promotions, package discounts, delivery services, and custom fabric choices selected through our certified retail partners.",
    answerVi: "Mức giá bán lẻ đề xuất (MSRP) là mức giá chuẩn từ nhà sản xuất. Mức giá thực tế tại đại lý và showroom có thể thay đổi tùy thuộc vào chương trình ưu đãi địa phương, gói chiết khấu tổng thể, dịch vụ giao hàng lắp đặt tận nơi và tùy chọn bọc vải Sunbrella® cao cấp.",
  },
  {
    id: 'why-not-online-direct',
    category: 'buy',
    questionEn: "Why doesn't B+Open sell furniture directly online?",
    questionVi: "Tại sao B+Open không bán hàng trực tiếp trên website thương mại điện tử?",
    answerEn: "We believe luxury heirloom furniture requires an experiential purchase. Our network of authorized retail partners and design showrooms provide white-glove design consultation, fabric swatch touching, ergonomic comfort testing, and professional room-of-choice assembly and delivery.",
    answerVi: "Chúng tôi tin rằng sản phẩm nội thất di sản thủ công cao cấp cần được trải nghiệm thực tế. Hệ thống đại lý ủy quyền và showroom chuyên nghiệp sẽ giúp khách hàng cảm nhận trực tiếp vân gỗ, độ êm của nệm, xem mẫu vải thực tế và được phục vụ trọn gói dịch vụ giao hàng lắp đặt chuẩn White-Glove.",
    actionTextEn: "Find Nearest Retailer",
    actionTextVi: "Tìm Đại Lý Gần Bạn",
    actionTarget: 'showrooms',
    actionExtra: { tab: 'retailers' }
  },
  {
    id: 'nearest-retailer',
    category: 'buy',
    questionEn: "Where is my nearest B+Open retailer?",
    questionVi: "Làm thế nào để tìm đại lý hoặc showroom B+Open gần nhất?",
    answerEn: "You can locate authorized retailers across the United States, Canada, and international design partner centers using our interactive Retail Locator tool, filtered by zip code or city.",
    answerVi: "Bạn có thể dễ dàng tra cứu danh sách các showroom và đại lý đối tác được chứng nhận tại Hoa Kỳ, Việt Nam và quốc tế thông qua công cụ Định vị Đại lý trên hệ thống.",
    actionTextEn: "Open Store Locator",
    actionTextVi: "Mở Bản Đồ Đại Lý",
    actionTarget: 'showrooms',
    actionExtra: { tab: 'retailers' }
  },
  {
    id: 'warranty-coverage',
    category: 'warranty',
    questionEn: "What is covered under the residential warranty?",
    questionVi: "Chính sách bảo hành dân dụng (Residential Warranty) bao gồm những gì?",
    answerEn: "B+Open provides a 5-Year Limited Manufacturer Warranty covering timber framing and structural integrity against manufacturing defects and structural failure. Sunbrella® fabrics carry a 5-year warranty against color fading, and hardware is warrantied for 1 year.",
    answerVi: "B+Open áp dụng chế độ bảo hành 5 năm đối với kết cấu khung gỗ Ipe trước các lỗi kỹ thuật từ nhà sản xuất. Vải ngoài trời cao cấp Sunbrella® được bảo hành 5 năm chống bạc màu, và phụ kiện kim khí được bảo hành 1 năm.",
  },
  {
    id: 'submit-warranty',
    category: 'warranty',
    questionEn: "How do I submit a warranty claim or service request?",
    questionVi: "Quy trình gửi yêu cầu bảo hành hoặc hỗ trợ kỹ thuật như thế nào?",
    answerEn: "If you purchased from an authorized retail partner, please contact them first with your receipt and product photos. You can also reach our corporate customer service team directly via the contact form on this page or by calling +1 (800) 403-0403.",
    answerVi: "Nếu bạn mua hàng thông qua đại lý ủy quyền, vui lòng liên hệ trực tiếp với đại lý kèm hóa đơn và ảnh chụp chi tiết. Bạn cũng có thể liên hệ trực tiếp đội ngũ Chăm sóc khách hàng của chúng tôi qua biểu mẫu liên hệ hoặc gọi +1 (800) 403-0403.",
  }
];

export const HelpCenterPage: React.FC<HelpCenterPageProps> = ({
  onNavigate,
  onOpenCatalogModal,
  onOpenTradeModal,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  // Active FAQ filter
  const [activeTab, setActiveTab] = useState<'all' | 'care' | 'buy' | 'warranty'>('all');
  // Expanded FAQ IDs
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({
    'restore-ipe': true,
    'why-not-online-direct': true,
  });

  // Contact Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactCategory, setContactCategory] = useState('general');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Warranty Info Modal State
  const [isWarrantyModalOpen, setIsWarrantyModalOpen] = useState(false);

  // Filter FAQs based on tab and search
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesTab = activeTab === 'all' || item.category === activeTab;
      if (!matchesTab) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.questionEn.toLowerCase().includes(q) ||
        item.questionVi.toLowerCase().includes(q) ||
        item.answerEn.toLowerCase().includes(q) ||
        item.answerVi.toLowerCase().includes(q)
      );
    });
  }, [activeTab, searchQuery]);

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setIsContactModalOpen(false);
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1A17]">
      {/* 1. TOP HEADER & SEARCH BAR SECTION (matches Jensen Outdoor Help Center) */}
      <section className="pt-8 pb-10 sm:pt-12 sm:pb-14 px-4 sm:px-6 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-[0.08em] uppercase text-[#1C1A17] mb-6">
          {isVi ? 'Trung Tâm Hỗ Trợ' : 'Help Center'}
        </h1>

        {/* Search Input Box */}
        <div className="relative max-w-xl mx-auto shadow-md rounded-xs overflow-hidden border border-[#1C1A17]/15">
          <label htmlFor="help-center-search" className="sr-only">
            {isVi ? 'Tìm kiếm' : 'Search'}
          </label>
          <div className="flex items-center bg-white">
            <input
              id="help-center-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? 'Tìm kiếm theo chủ đề, câu hỏi, vật liệu...' : 'Search for a topic...'}
              className="w-full py-3.5 sm:py-4 px-5 text-sm sm:text-base text-[#1C1A17] placeholder:text-[#1C1A17]/50 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              className="bg-[#ae5c4a] hover:bg-[#974b3a] text-white px-5 sm:px-6 py-3.5 sm:py-4 transition-colors flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {searchQuery && (
          <p className="mt-3 text-xs sm:text-sm text-[#1C1A17]/70">
            {isVi 
              ? `Tìm thấy ${filteredFaqs.length} kết quả cho "${searchQuery}"`
              : `Found ${filteredFaqs.length} results for "${searchQuery}"`}
          </p>
        )}
      </section>

      {/* 2. TOP 3 HIGHLIGHT ACTION CARDS (#ae5c4a terracotta matching Jensen Outdoor) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: FURNITURE FAQ */}
          <div 
            className="bg-[#ae5c4a] text-white p-8 sm:p-10 text-center shadow-lg transition-transform hover:-translate-y-0.5 duration-200 flex flex-col items-center justify-between"
            style={{ minHeight: '220px' }}
          >
            <h2 className="text-xl sm:text-2xl font-serif uppercase tracking-[0.08em] font-semibold text-white mb-6">
              {isVi ? 'Hỏi Đáp Nội Thất' : 'Furniture FAQ'}
            </h2>
            <button
              onClick={() => {
                const el = document.getElementById('faq-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block bg-[#ae5c4a] border-2 border-white/80 hover:bg-white hover:text-[#ae5c4a] text-white font-sans text-xs sm:text-sm uppercase tracking-[0.14em] font-bold px-7 py-3 transition-colors shadow-md cursor-pointer"
            >
              {isVi ? 'Khám Phá Câu Trả Lời' : 'Discover Answers'}
            </button>
          </div>

          {/* Card 2: HOW TO BUY */}
          <div 
            className="bg-[#ae5c4a] text-white p-8 sm:p-10 text-center shadow-lg transition-transform hover:-translate-y-0.5 duration-200 flex flex-col items-center justify-between"
            style={{ minHeight: '220px' }}
          >
            <h2 className="text-xl sm:text-2xl font-serif uppercase tracking-[0.08em] font-semibold text-white mb-6">
              {isVi ? 'Cách Mua Hàng' : 'How to Buy'}
            </h2>
            <button
              onClick={() => onNavigate('how-to-buy')}
              className="inline-block bg-[#ae5c4a] border-2 border-white/80 hover:bg-white hover:text-[#ae5c4a] text-white font-sans text-xs sm:text-sm uppercase tracking-[0.14em] font-bold px-7 py-3 transition-colors shadow-md cursor-pointer"
            >
              {isVi ? 'Tìm Hiểu Ngay' : 'Find Out'}
            </button>
          </div>

          {/* Card 3: PRODUCT CARE */}
          <div 
            className="bg-[#ae5c4a] text-white p-8 sm:p-10 text-center shadow-lg transition-transform hover:-translate-y-0.5 duration-200 flex flex-col items-center justify-between"
            style={{ minHeight: '220px' }}
          >
            <h2 className="text-xl sm:text-2xl font-serif uppercase tracking-[0.08em] font-semibold text-white mb-6">
              {isVi ? 'Bảo Dưỡng Sản Phẩm' : 'Product Care'}
            </h2>
            <button
              onClick={() => onNavigate('care')}
              className="inline-block bg-[#ae5c4a] border-2 border-white/80 hover:bg-white hover:text-[#ae5c4a] text-white font-sans text-xs sm:text-sm uppercase tracking-[0.14em] font-bold px-7 py-3 transition-colors shadow-md cursor-pointer"
            >
              {isVi ? 'Xem Cẩm Nang' : 'See the guide'}
            </button>
          </div>
        </div>
      </section>

      {/* 3. 6-ITEM VISUAL IMAGE GRID (Jensen Outdoor Authentic Images) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-14 sm:pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-6">
          {/* 1. Trade Program */}
          <div 
            onClick={() => onNavigate('trade')}
            className="flex flex-col items-center group cursor-pointer text-center"
          >
            <div className="w-full aspect-[4/5] overflow-hidden rounded-[9px] shadow-sm mb-3 bg-[#EAE5DC]">
              <img
                src="https://www.jensenoutdoor.com/wp-content/uploads/2022/09/ConciergeService-Small-1024x1229.jpg"
                alt="Trade Program Concierge Service"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif text-sm sm:text-base font-bold text-[#1C1A17] group-hover:text-[#ae5c4a] transition-colors">
              {isVi ? 'Chương Trình Trade' : 'Trade Program'}
            </span>
          </div>

          {/* 2. Warranty */}
          <div 
            onClick={() => setIsWarrantyModalOpen(true)}
            className="flex flex-col items-center group cursor-pointer text-center"
          >
            <div className="w-full aspect-[4/5] overflow-hidden rounded-[9px] shadow-sm mb-3 bg-[#EAE5DC]">
              <img
                src="https://www.jensenoutdoor.com/wp-content/uploads/2022/09/ExclusivePromotions-Small-1024x1229.jpg"
                alt="Warranty"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif text-sm sm:text-base font-bold text-[#1C1A17] group-hover:text-[#ae5c4a] transition-colors">
              {isVi ? 'Chế Độ Bảo Hành' : 'Warranty'}
            </span>
          </div>

          {/* 3. Catalog */}
          <div 
            onClick={() => onNavigate('catalog')}
            className="flex flex-col items-center group cursor-pointer text-center"
          >
            <div className="w-full aspect-[4/5] overflow-hidden rounded-[9px] shadow-sm mb-3 bg-[#EAE5DC]">
              <img
                src="https://www.jensenoutdoor.com/wp-content/uploads/2022/09/TradePublicity-Small-1024x1229.jpg"
                alt="Catalog"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif text-sm sm:text-base font-bold text-[#1C1A17] group-hover:text-[#ae5c4a] transition-colors">
              {isVi ? 'Catalogue Bộ Sưu Tập' : 'Catalog'}
            </span>
          </div>

          {/* 4. 3D Showroom */}
          <div 
            onClick={() => onNavigate('3d-showroom')}
            className="flex flex-col items-center group cursor-pointer text-center"
          >
            <div className="w-full aspect-[4/5] overflow-hidden rounded-[9px] shadow-sm mb-3 bg-[#EAE5DC]">
              <img
                src="https://www.jensenoutdoor.com/wp-content/uploads/2022/09/EarlyAccess-Small-1024x1229.jpg"
                alt="3D Showroom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif text-sm sm:text-base font-bold text-[#1C1A17] group-hover:text-[#ae5c4a] transition-colors">
              {isVi ? 'Showroom 3D Ảo' : '3D Showroom'}
            </span>
          </div>

          {/* 5. Sustainability */}
          <div 
            onClick={() => onNavigate('story')}
            className="flex flex-col items-center group cursor-pointer text-center"
          >
            <div className="w-full aspect-[4/5] overflow-hidden rounded-[9px] shadow-sm mb-3 bg-[#EAE5DC]">
              <img
                src="https://www.jensenoutdoor.com/wp-content/uploads/2022/09/Sustainability-Small-1024x1229.jpg"
                alt="Sustainability"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif text-sm sm:text-base font-bold text-[#1C1A17] group-hover:text-[#ae5c4a] transition-colors">
              {isVi ? 'Phát Triển Bền Vững' : 'Sustainability'}
            </span>
          </div>

          {/* 6. Privacy */}
          <div 
            onClick={() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
            className="flex flex-col items-center group cursor-pointer text-center"
          >
            <div className="w-full aspect-[4/5] overflow-hidden rounded-[9px] shadow-sm mb-3 bg-[#EAE5DC]">
              <img
                src="https://www.jensenoutdoor.com/wp-content/uploads/2022/09/TradePricing-Small-1024x1229.jpg"
                alt="Privacy Policy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif text-sm sm:text-base font-bold text-[#1C1A17] group-hover:text-[#ae5c4a] transition-colors">
              {isVi ? 'Chính Sách Bảo Mật' : 'Privacy'}
            </span>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FAQ ACCORDION SECTION */}
      <section id="faq-section" className="py-12 sm:py-16 bg-[#F4EFEA] border-y border-[#1C1A17]/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-[#ae5c4a] font-bold">
              {isVi ? 'Giải Đáp Thắc Mắc' : 'Knowledge Base'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif tracking-[0.06em] uppercase text-[#1C1A17] mt-1">
              {isVi ? 'Câu Hỏi Thường Gặp (FAQ)' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-sm sm:text-base text-[#1C1A17]/70 mt-2">
              {isVi 
                ? 'Thông tin hướng dẫn chăm sóc gỗ Ipe, quy trình mua sắm và chính sách bảo hành' 
                : 'Everything you need to know about caring for Bolivian Ipe, how to buy, and warranty claims.'}
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { id: 'all', labelEn: 'All Topics', labelVi: 'Tất Cả Chủ Đề' },
                { id: 'care', labelEn: 'Care & Maintenance', labelVi: 'Bảo Dưỡng & Chăm Sóc' },
                { id: 'buy', labelEn: 'How to Buy', labelVi: 'Cách Mua Hàng' },
                { id: 'warranty', labelEn: 'Warranty & Claims', labelVi: 'Bảo Hành & Khiếu Nại' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#ae5c4a] text-white shadow-sm'
                      : 'bg-white/80 text-[#1C1A17]/80 hover:bg-white hover:text-[#1C1A17]'
                  }`}
                >
                  {isVi ? tab.labelVi : tab.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xs p-6 border border-[#1C1A17]/10">
                <p className="text-[#1C1A17]/70 mb-3">
                  {isVi ? 'Không tìm thấy câu hỏi phù hợp với tìm kiếm.' : 'No questions found matching your search.'}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold uppercase tracking-wider text-[#ae5c4a] underline cursor-pointer"
                >
                  {isVi ? 'Xem tất cả câu hỏi' : 'Clear search and show all'}
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = !!expandedFaqs[faq.id];
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xs border border-[#1C1A17]/10 shadow-2xs overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/70 transition-colors"
                    >
                      <span className="font-serif text-base sm:text-lg font-semibold text-[#1C1A17]">
                        {isVi ? faq.questionVi : faq.questionEn}
                      </span>
                      <span className="shrink-0 text-[#ae5c4a]">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 stroke-[2.2]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 stroke-[2.2]" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 pt-1 text-[#1C1A17]/80 text-sm sm:text-base leading-relaxed border-t border-[#1C1A17]/5 space-y-4">
                        <p>{isVi ? faq.answerVi : faq.answerEn}</p>
                        {faq.actionTarget && (
                          <div>
                            <button
                              onClick={() => onNavigate(faq.actionTarget!, faq.actionExtra)}
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wider text-[#ae5c4a] hover:text-[#8d4637] transition-colors cursor-pointer group"
                            >
                              <span>{isVi ? faq.actionTextVi : faq.actionTextEn}</span>
                              <span className="group-hover:translate-x-0.5 transition-transform">»</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* 5. "STILL NEED ASSISTANCE?" SECTION (Matches Jensen Outdoor) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-[0.08em] uppercase text-[#1C1A17] mb-3">
          {isVi ? 'Bạn Vẫn Cần Thêm Trợ Giúp?' : 'Still need assistance?'}
        </h2>
        <p className="text-base sm:text-lg text-[#1C1A17]/75 font-sans mb-8">
          {isVi ? 'Đội ngũ chuyên viên tư vấn luôn sẵn sàng hỗ trợ bạn.' : 'We are here to help.'}
        </p>

        {/* Contact Us Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-block bg-[#1C1A17] hover:bg-[#ae5c4a] text-white font-sans text-xs sm:text-sm uppercase tracking-[0.16em] font-bold px-9 py-4 transition-colors shadow-md cursor-pointer"
          >
            {isVi ? 'Liên Hệ Với Chúng Tôi' : 'Contact Us'}
          </button>
        </div>

        {/* Telephone Call Support */}
        <p className="text-sm sm:text-base text-[#1C1A17]/70">
          {isVi ? 'hoặc gọi bộ phận chăm sóc khách hàng tại:' : 'or call customer care at:'}
          <br />
          <a
            href="tel:18004030403"
            className="inline-flex items-center gap-2 mt-2 text-lg sm:text-xl font-bold font-serif text-[#1C1A17] hover:text-[#ae5c4a] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#ae5c4a]" />
            +1 (800) 403-0403
          </a>
        </p>
      </section>

      {/* 6. 6-BOX CONTACT & LOCATION TOUCHPOINTS GRID (Matches Jensen Outdoor Bottom Grid) */}
      <section className="bg-[#EFEAE2] border-t border-[#1C1A17]/10 py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Box 1: Retail Stores */}
            <div className="bg-white/80 p-6 sm:p-7 rounded-xs border border-[#1C1A17]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#ae5c4a] mb-2">
                  <Store className="w-5 h-5" />
                  <p className="font-serif text-lg font-bold text-[#1C1A17]">
                    {isVi ? 'Cửa Hàng Bán Lẻ' : 'Retail Stores'}
                  </p>
                </div>
                <p className="text-sm text-[#1C1A17]/75 leading-relaxed mb-4">
                  {isVi 
                    ? 'Ghé thăm các đối tác bán lẻ thân thiện và am hiểu sản phẩm của B+Open.' 
                    : 'Visit one of B+Open’s friendly, knowledgeable retail partners.'}
                </p>
              </div>
              <div>
                <button
                  onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
                  className="font-bold text-sm text-[#1C1A17] hover:text-[#ae5c4a] transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <strong>{isVi ? 'Tìm Cửa Hàng' : 'Find a Store'}</strong> »
                </button>
              </div>
            </div>

            {/* Box 2: Design Showrooms */}
            <div className="bg-white/80 p-6 sm:p-7 rounded-xs border border-[#1C1A17]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#ae5c4a] mb-2">
                  <Building2 className="w-5 h-5" />
                  <p className="font-serif text-lg font-bold text-[#1C1A17]">
                    {isVi ? 'Showroom Thiết Kế' : 'Design Showrooms'}
                  </p>
                </div>
                <p className="text-sm text-[#1C1A17]/75 leading-relaxed mb-4">
                  {isVi 
                    ? 'Mở cửa theo lịch hẹn dành riêng cho giới kiến trúc sư và nhà thiết kế.' 
                    : 'Open by appointment to the trade.'}
                </p>
              </div>
              <div className="space-y-1">
                <div>
                  <button
                    onClick={() => onNavigate('showrooms', { tab: 'design-showrooms' })}
                    className="font-bold text-sm text-[#1C1A17] hover:text-[#ae5c4a] transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <strong>{isVi ? 'Tìm Showroom' : 'Find a Showroom'}</strong> »
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => onNavigate('trade')}
                    className="font-bold text-sm text-[#ae5c4a] hover:text-[#8d4637] transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <strong>{isVi ? 'Chương Trình Trade' : 'Trade Program'}</strong> »
                  </button>
                </div>
              </div>
            </div>

            {/* Box 3: Contract / Hospitality */}
            <div className="bg-white/80 p-6 sm:p-7 rounded-xs border border-[#1C1A17]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#ae5c4a] mb-2">
                  <Sparkles className="w-5 h-5" />
                  <p className="font-serif text-lg font-bold text-[#1C1A17]">
                    {isVi ? 'Dự Án Khách Sạn & Resort' : 'Contract / Hospitality'}
                  </p>
                </div>
                <p className="text-sm text-[#1C1A17]/75 leading-relaxed mb-4">
                  {isVi 
                    ? 'Liên hệ trực tiếp với đội ngũ tư vấn chuyên trách dự án thương mại của chúng tôi.' 
                    : 'Get in touch with our trade sales team.'}
                </p>
              </div>
              <div>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="font-bold text-sm text-[#1C1A17] hover:text-[#ae5c4a] transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <strong>{isVi ? 'Mở Biểu Mẫu Liên Hệ' : 'Contact Form'}</strong> »
                </button>
              </div>
            </div>

            {/* Box 4: Corporate Office */}
            <div className="bg-white/80 p-6 sm:p-7 rounded-xs border border-[#1C1A17]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#ae5c4a] mb-2">
                  <MapPin className="w-5 h-5" />
                  <p className="font-serif text-lg font-bold text-[#1C1A17]">
                    {isVi ? 'Trụ Sở Chính' : 'Corporate Office'}
                  </p>
                </div>
                <p className="text-sm text-[#1C1A17]/75 leading-relaxed">
                  1900 Old Williamsburg Road<br />
                  Sandston, VA 23150, USA
                </p>
              </div>
              <div className="text-xs text-[#1C1A17]/60 pt-3">
                {isVi ? 'Phân phối toàn cầu & Chi nhánh Việt Nam' : 'Global Logistics & Factory Operations'}
              </div>
            </div>

            {/* Box 5: Customer Service */}
            <div className="bg-white/80 p-6 sm:p-7 rounded-xs border border-[#1C1A17]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#ae5c4a] mb-2">
                  <Mail className="w-5 h-5" />
                  <p className="font-serif text-lg font-bold text-[#1C1A17]">
                    {isVi ? 'Dịch Vụ Khách Hàng' : 'Customer Service'}
                  </p>
                </div>
                <p className="text-sm text-[#1C1A17]/75 leading-relaxed mb-3">
                  {isVi 
                    ? 'Giải đáp thắc mắc chung, tư vấn mã hàng, đăng ký tài khoản hoặc hồ sơ bảo hành.' 
                    : 'For general inquiries, product questions, account setup, or warranties.'}
                </p>
                <div className="space-y-1 text-sm font-bold">
                  <div>
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="text-[#1C1A17] hover:text-[#ae5c4a] transition-colors cursor-pointer"
                    >
                      {isVi ? 'Gửi Yêu Cầu Hỗ Trợ' : 'Contact Customer Service'}
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsWarrantyModalOpen(true)}
                      className="text-[#ae5c4a] hover:text-[#8d4637] transition-colors cursor-pointer"
                    >
                      {isVi ? 'Chính Sách Bảo Hành' : 'Warranty'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-xs text-[#1C1A17]/60 pt-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Monday – Friday 8:00AM – 5:00PM ET</span>
              </div>
            </div>

            {/* Box 6: Connect With Us */}
            <div className="bg-white/80 p-6 sm:p-7 rounded-xs border border-[#1C1A17]/10 flex flex-col justify-between">
              <div>
                <p className="font-serif text-lg font-bold text-[#1C1A17] mb-2">
                  {isVi ? 'Kết Nối Với Chúng Tôi' : 'Connect With Us'}
                </p>
                <p className="text-sm text-[#1C1A17]/75 leading-relaxed mb-4">
                  {isVi 
                    ? 'Theo dõi những công trình ngoài trời đẳng cấp và cập nhật tin tức mới nhất.' 
                    : 'Follow our architectural projects, material insights, and design events.'}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/JensenOutdoorFurniture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1C1A17] text-white flex items-center justify-center hover:bg-[#ae5c4a] transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/JensenOutdoorFurniture/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1C1A17] text-white flex items-center justify-center hover:bg-[#ae5c4a] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* Pinterest */}
                <a
                  href="https://www.pinterest.com/JensenOutdoor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1C1A17] text-white flex items-center justify-center hover:bg-[#ae5c4a] transition-colors"
                  aria-label="Pinterest"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.289,2C6.617,2,3.606,5.648,3.606,9.622c0,1.846,1.025,4.146,2.666,4.878c0.25,0.111,0.381,0.063,0.439-0.169 c0.044-0.175,0.267-1.029,0.365-1.428c0.032-0.128,0.017-0.237-0.091-0.362C6.445,11.911,6.01,10.75,6.01,9.668 c0-2.777,2.194-5.464,5.933-5.464c3.23,0,5.49,2.108,5.49,5.122c0,3.407-1.794,5.768-4.13,5.768c-1.291,0-2.257-1.021-1.948-2.277 c0.372-1.495,1.089-3.112,1.089-4.191c0-0.967-0.542-1.775-1.663-1.775c-1.319,0-2.379,1.309-2.379,3.059 c0,1.115,0.394,1.869,0.394,1.869s-1.302,5.279-1.54,6.261c-0.405,1.666,0.053,4.368,0.094,4.604 c0.021,0.126,0.167,0.169,0.25,0.063c0.129-0.165,1.699-2.419,2.142-4.051c0.158-0.59,0.817-2.995,0.817-2.995 c0.43,0.784,1.681,1.446,3.013,1.446c3.963,0,6.822-3.494,6.822-7.833C20.394,5.112,16.849,2,12.289,2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE CONTACT MODAL (Matches /help-center/contact/) */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-xs shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {contactSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1C1A17] mb-2">
                  {isVi ? 'Yêu Cầu Đã Được Gửi Thành Công!' : 'Message Sent Successfully!'}
                </h3>
                <p className="text-sm text-[#1C1A17]/75">
                  {isVi 
                    ? 'Chuyên viên chăm sóc khách hàng sẽ phản hồi qua email hoặc số điện thoại của bạn trong vòng 24 giờ làm việc.' 
                    : 'A B+Open customer care specialist will respond within 24 business hours.'}
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs uppercase tracking-[0.16em] text-[#ae5c4a] font-bold">
                  {isVi ? 'Hỗ Trợ Trực Tuyến' : 'Direct Assistance'}
                </span>
                <h3 className="text-2xl font-serif uppercase tracking-[0.06em] text-[#1C1A17] mt-1 mb-2">
                  {isVi ? 'Gửi Thắc Mắc & Yêu Cầu' : 'Contact Customer Service'}
                </h3>
                <p className="text-xs sm:text-sm text-[#1C1A17]/70 mb-6">
                  {isVi 
                    ? 'Vui lòng cung cấp thông tin để chúng tôi phục vụ bạn tốt nhất.' 
                    : 'Please share your details and our customer care team will assist you.'}
                </p>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                      {isVi ? 'Chủ đề hỗ trợ *' : 'Inquiry Type *'}
                    </label>
                    <select
                      value={contactCategory}
                      onChange={(e) => setContactCategory(e.target.value)}
                      className="w-full text-sm border border-[#1C1A17]/20 p-2.5 rounded-xs bg-white focus:outline-none focus:border-[#ae5c4a]"
                      required
                    >
                      <option value="general">{isVi ? 'Thắc mắc chung (General Inquiries)' : 'General Inquiries'}</option>
                      <option value="product">{isVi ? 'Thông tin sản phẩm & Chất liệu (Product Care & Ipe Wood)' : 'Product Care & Ipe Wood'}</option>
                      <option value="warranty">{isVi ? 'Yêu cầu bảo hành (Warranty Claim)' : 'Warranty Claim'}</option>
                      <option value="order">{isVi ? 'Tư vấn đại lý & Mua sắm (Dealer & Purchase)' : 'Dealer & Purchase Guidance'}</option>
                      <option value="trade">{isVi ? 'Hợp tác dự án Trade & Hospitality' : 'Trade & Hospitality Sales'}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                        {isVi ? 'Họ và tên *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full text-sm border border-[#1C1A17]/20 p-2.5 rounded-xs focus:outline-none focus:border-[#ae5c4a]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                        {isVi ? 'Số điện thoại' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full text-sm border border-[#1C1A17]/20 p-2.5 rounded-xs focus:outline-none focus:border-[#ae5c4a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                      {isVi ? 'Địa chỉ Email *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="client@example.com"
                      className="w-full text-sm border border-[#1C1A17]/20 p-2.5 rounded-xs focus:outline-none focus:border-[#ae5c4a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                      {isVi ? 'Nội dung chi tiết *' : 'Message *'}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder={isVi ? 'Mô tả chi tiết câu hỏi hoặc yêu cầu của bạn...' : 'How can we help you today?'}
                      className="w-full text-sm border border-[#1C1A17]/20 p-2.5 rounded-xs focus:outline-none focus:border-[#ae5c4a]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm uppercase tracking-[0.14em] font-bold py-3.5 transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isVi ? 'Gửi Yêu Cầu Hỗ Trợ' : 'Submit Message'}</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. WARRANTY DETAILS MODAL */}
      {isWarrantyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-xs shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsWarrantyModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#ae5c4a] mb-2">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xs uppercase tracking-[0.18em] font-bold">
                {isVi ? 'Chính Sách Nhà Sản Xuất' : 'B+Open Guarantee'}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif uppercase tracking-[0.06em] text-[#1C1A17] mb-4">
              {isVi ? 'Chính Sách Bảo Hành Di Sản (5 Năm)' : 'Residential Warranty Policy'}
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-[#1C1A17]/80 leading-relaxed border-t border-[#1C1A17]/10 pt-4">
              <div>
                <h4 className="font-bold text-[#1C1A17] mb-1">
                  {isVi ? '1. Kết Cấu Khung Gỗ Ipe (5 Năm)' : '1. Ipe Timber Structure (5-Year Limited Warranty)'}
                </h4>
                <p>
                  {isVi 
                    ? 'Bảo hành 5 năm đối với khung gỗ và độ vững chãi kết cấu trước các hiện tượng mục rữa, nứt gãy vật lý bất thường hoặc lỗi kỹ thuật từ khâu sản xuất.'
                    : 'B+Open warrants that the Bolivian Ipe wood frames will be free from structural defects and rot for five (5) years from the original purchase date.'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1C1A17] mb-1">
                  {isVi ? '2. Vải Ngoài Trời Sunbrella® (5 Năm)' : '2. Sunbrella® Outdoor Fabric (5-Year Limited Warranty)'}
                </h4>
                <p>
                  {isVi 
                    ? 'Bảo hành 5 năm chống bạc màu do ánh nắng mặt trời, chống mất độ bền cơ học và chống nấm mốc tự nhiên.'
                    : 'Sunbrella® solution-dyed acrylic fabrics carry a 5-year warranty against excessive loss of color or strength resulting from normal weather exposure.'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1C1A17] mb-1">
                  {isVi ? '3. Phụ Kiện Kim Khí & Sơn Tĩnh Điện (1 Năm)' : '3. Hardware & Powder-Coated Aluminum (1-Year Warranty)'}
                </h4>
                <p>
                  {isVi 
                    ? 'Phụ kiện bu-lông inox 304 và các chi tiết nhôm đúc sơn tĩnh điện được bảo hành 1 năm đối với lỗi vật liệu và bong tróc bề mặt.'
                    : 'All 304 stainless steel hardware fasteners and powder-coated aluminum components are covered for one (1) year against manufacturer defects.'}
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xs border border-[#1C1A17]/10 text-xs sm:text-sm">
                <p className="font-bold text-[#1C1A17] mb-1">
                  {isVi ? 'Lưu ý về phong hóa tự nhiên:' : 'Natural Weathering Notice:'}
                </p>
                <p>
                  {isVi 
                    ? 'Gỗ Ipe là vật liệu hữu cơ tự nhiên; việc bề mặt ngả sang màu xám bạc ánh kim hoặc xuất hiện các vi vết nứt chân chim bề mặt là đặc tính tự nhiên khi gỗ thở và thích nghi với độ ẩm, hoàn toàn không phải là lỗi kết cấu.'
                    : 'The transition of Ipe wood to a silvery-gray patina and slight surface checking are natural occurrences as the dense timber acclimates to outdoor environments, and do not affect the integrity of the furniture.'}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsWarrantyModalOpen(false);
                    setIsContactModalOpen(true);
                  }}
                  className="w-full bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs uppercase tracking-[0.14em] font-bold py-3.5 transition-colors cursor-pointer"
                >
                  {isVi ? 'Gửi Yêu Cầu Bảo Hành Ngay' : 'File a Warranty Claim'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
