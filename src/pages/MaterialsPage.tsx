import React, { useState } from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { JensenLeafLogo } from '../components/JensenLeafLogo';
import { ChevronLeft, ChevronRight, ArrowLeft, X, CheckCircle2, Shield, Flame, Sparkles, Droplets } from 'lucide-react';
import { InlineEditableContent } from '../components/InlineEditableContent';

interface MaterialsPageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string }) => void;
}

interface MaterialDetail {
  id: string;
  badge: string;
  badgeVi: string;
  title: string;
  titleVi: string;
  subtitle: string;
  subtitleVi: string;
  description: string;
  descriptionVi: string;
  specs: { label: string; labelVi: string; value: string; valueVi: string }[];
  features: { en: string; vi: string }[];
  careTip: { en: string; vi: string };
  image: string;
}

const MATERIAL_DETAILS: Record<string, MaterialDetail> = {
  ipe: {
    id: 'ipe',
    badge: 'Durable Hardwood',
    badgeVi: 'Gỗ Cứng Bền Bỉ',
    title: 'IPE WOOD',
    titleVi: 'GỖ CỨNG IPE BOLIVIA',
    subtitle: 'The Crown Jewel of Sustainable Outdoor Timbers',
    subtitleVi: 'Viên Ngọc Quý Của Lâm Nghiệp Bền Vững Thế Giới',
    description:
      'Ipe (pronounced "EE-pay") is an exceptionally dense, naturally oily tropical hardwood sustainably harvested from FSC®-certified dry-tropical forests in Eastern Bolivia. With a Janka hardness rating of 3,680 lbf—nearly three times harder than Teak—it resists rot, insects, extreme temperature cycles, and severe weather for decades with virtually zero maintenance.',
    descriptionVi:
      'Gỗ Ipe (phát âm là "EE-pay") là loài gỗ cứng nhiệt đới đặc sánh và giàu dầu tự nhiên, được khai thác bền vững từ các khu rừng nhiệt đới khô đạt chứng nhận FSC® tại miền Đông Bolivia. Với độ cứng Janka đạt tới 3.680 lbf—gấp gần 3 lần gỗ Teak—Ipe kháng sâu mọt, ẩm mục, thời tiết khắc nghiệt trong nhiều thập kỷ mà gần như không cần bảo dưỡng phức tạp.',
    specs: [
      { label: 'Janka Hardness', labelVi: 'Độ Cứng Janka', value: '3,680 lbf (3x Teak)', valueVi: '3.680 lbf (Gấp 3 lần Teak)' },
      { label: 'FSC® Certification', labelVi: 'Chứng Nhận FSC®', value: '100% FSC® C013910 Certified', valueVi: '100% Chứng nhận FSC® C013910' },
      { label: 'Fire Rating', labelVi: 'Kháng Cháy', value: 'Class A (Same as concrete/steel)', valueVi: 'Loại A (Tương đương bê tông & thép)' },
      { label: 'Lifespan', labelVi: 'Tuổi Thọ', value: 'Heirloom (50+ years outdoors)', valueVi: 'Di sản (50+ năm ngoài trời)' },
    ],
    features: [
      { en: 'Natural organic oils resist moisture, mildew, and wood-boring insects.', vi: 'Dầu hữu cơ tự nhiên kháng ẩm, rêu mốc và côn trùng đục khoét gỗ.' },
      { en: 'Weathers gracefully from deep chocolate brown to a distinguished silver-gray patina.', vi: 'Biến đổi màu thanh lịch từ nâu socola sang lớp màu patina bạc quý phái.' },
      { en: 'Slowly kiln-dried for 4–8 weeks to 12% moisture content for maximum joint stability.', vi: 'Sấy lò chậm 4–8 tuần đạt độ ẩm 12% giúp mối ghép ổn định tuyệt đối.' },
    ],
    careTip: {
      en: 'Maintain the rich chocolate color with Penofin Verde Oil once a year, or allow it to age naturally to a handsome silver patina.',
      vi: 'Duy trì màu nâu hạt dẻ ấm áp với dầu lau Penofin Verde mỗi năm một lần, hoặc để gỗ tự nhiên ngả màu patina bạc cổ kính.',
    },
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  },
  solara: {
    id: 'solara',
    badge: 'Nature Safe',
    badgeVi: 'An Toàn Thiên Nhiên',
    title: 'WOVEN SOLARA FIBER',
    titleVi: 'SỢI DỆT SOLARA FIBER CAO CẤP',
    subtitle: 'Supreme All-Weather Tensile Strength & Color Permanence',
    subtitleVi: 'Độ Bền Kéo Kháng Mọi Thời Tiết & Giữ Màu Vĩnh Cửu',
    description:
      'Solara Fiber represents the absolute vanguard of synthetic weaving technologies. Engineered specifically for demanding exterior exposures, it pairs natural textural beauty with exceptional tensile durability, total UV impermeability, and full recyclability.',
    descriptionVi:
      'Solara Fiber đại diện cho công nghệ sợi đan tổng hợp tiên tiến nhất hiện nay. Được chế tác riêng cho môi trường ngoài trời khắc nghiệt, sợi kết hợp vẻ đẹp xúc giác tự nhiên với độ bền kéo vượt trội, kháng tia cực tím 100% và thân thiện với môi trường nhờ khả năng tái chế hoàn toàn.',
    specs: [
      { label: 'UV Resistance', labelVi: 'Kháng Tia UV', value: '3,000+ Hours QUV Tested', valueVi: 'Thử nghiệm hơn 3.000 giờ QUV' },
      { label: 'Tensile Strength', labelVi: 'Độ Chịu Lực Kéo', value: 'High-Density Polyethylene Core', valueVi: 'Lõi Polyethylene tỷ trọng cao (HDPE)' },
      { label: 'Temperature Range', labelVi: 'Biên Độ Nhiệt', value: '-30°C to +65°C without cracking', valueVi: '-30°C đến +65°C không rạn nứt' },
      { label: 'Recyclability', labelVi: 'Khả Năng Tái Chế', value: '100% Non-Toxic & Recyclable', valueVi: '100% Không độc hại & Tái chế được' },
    ],
    features: [
      { en: 'Color-through extrusion ensures tone cannot fade, peel, or scratch off.', vi: 'Công nghệ đùn màu đồng nhất từ trong lõi giúp sợi không phai, tróc hay trầy xước.' },
      { en: 'Resistant to chlorinated pool water, salt mist, sunscreens, and food spills.', vi: 'Kháng nước clo hồ bơi, hơi muối biển, kem chống nắng và thức ăn rơi vãi.' },
      { en: 'Hand-woven over powder-coated aluminum and solid Ipe frames by master weavers.', vi: 'Được các nghệ nhân đan thủ công tỉ mỉ trên khung nhôm sơn tĩnh điện và gỗ Ipe.' },
    ],
    careTip: {
      en: 'Clean periodically with a mild soap solution and soft brush, then rinse with fresh water.',
      vi: 'Vệ sinh định kỳ bằng nước xà phòng nhẹ và bàn chải mềm, sau đó tráng sạch lại bằng vòi nước.',
    },
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
  },
  sunbrella: {
    id: 'sunbrella',
    badge: 'Complete Performance',
    badgeVi: 'Hiệu Năng Toàn Diện',
    title: 'SUNBRELLA® CUSHION FABRICS',
    titleVi: 'VẢI ĐỆM NGOẠI THẤT SUNBRELLA®',
    subtitle: 'The Gold Standard in Marine & Outdoor Performance Textiles',
    subtitleVi: 'Tiêu Chuẩn Vàng Của Ngành Vải Ngoại Thất & Hàng Hải',
    description:
      'Sunbrella® fabrics are saturated to the fiber core with highly UV-stabilized pigments before the yarn is even spun. The resulting textile is luxuriously soft to the touch, breathable, resistant to mildew, and resilient against intense sunlight and sudden downpours.',
    descriptionVi:
      'Vải đệm Sunbrella® được ngấm màu sâu tận lõi sợi bằng sắc tố chống tia UV trước khi se sợi (100% Solution-Dyed Acrylic). Nhờ đó, vải mang lại cảm giác mềm mại dễ chịu khi tiếp xúc, thoáng khí, chống ẩm mốc và bền bỉ phi thường dưới nắng gắt hay mưa rào rực lửa.',
    specs: [
      { label: 'Fiber Material', labelVi: 'Chất Liệu Sợi', value: '100% Solution-Dyed Acrylic', valueVi: '100% Sợi Acrylic Nhuộm Dung Dịch' },
      { label: 'Water Repellency', labelVi: 'Chống Thấm Nước', value: 'Fluorocarbon Water-Shield Finish', valueVi: 'Lớp phủ Fluorocarbon kháng nước bề mặt' },
      { label: 'Cleaning Method', labelVi: 'Phương Pháp Tẩy Rửa', value: 'Bleach-Cleanable without fading', valueVi: 'Vệ sinh được bằng thuốc tẩy pha loãng' },
      { label: 'Certification', labelVi: 'Chứng Chỉ An Toàn', value: 'OEKO-TEX & GREENGUARD Gold', valueVi: 'Đạt chuẩn OEKO-TEX & GREENGUARD Gold' },
    ],
    features: [
      { en: 'Does not trap heat like synthetic vinyl; remains cool and inviting in summer.', vi: 'Không giữ nhiệt như simili/nhựa; luôn mát mẻ và thông thoáng suốt mùa hè.' },
      { en: 'Fast-drying open-cell foam cushion cores prevent water retention.', vi: 'Lõi đệm mút tế bào mở (Quick-Dry Foam) thoát nước siêu tốc, không đọng ẩm.' },
      { en: 'Backed by a 5-year manufacturer limited warranty against color loss.', vi: 'Được bảo hành chính hãng 5 năm đối với hiện tượng phai màu tự nhiên.' },
    ],
    careTip: {
      en: 'Most spills wipe clean with warm water and mild soap. For stubborn stains, use a dilute bleach mixture without worrying about color loss.',
      vi: 'Vết bẩn thông thường dễ dàng lau sạch bằng nước ấm và xà phòng nhẹ. Vết bẩn cứng đầu có thể dùng dung dịch tẩy loãng mà không lo bay màu.',
    },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  aluminum: {
    id: 'aluminum',
    badge: 'Commercial-Grade',
    badgeVi: 'Tiêu Chuẩn Thương Mại',
    title: 'POWDER COATED ALUMINUM',
    titleVi: 'NHÔM HỢP KIM SƠN TĨNH ĐIỆN',
    subtitle: 'Architectural Strength with Featherweight Elegance',
    subtitleVi: 'Độ Bền Kiến Trúc Kết Hợp Sự Thanh Nhẹ Tinh Tế',
    description:
      'We use heavy-gauge, seamless aluminum alloy tubing treated with a multi-stage chromate conversion process followed by electrostatic polyester powder-coating baked at 400°F. This creates an impervious barrier that will never rust, corrode, or oxidize.',
    descriptionVi:
      'B+Open sử dụng ống hợp kim nhôm thành dày đúc liền mạch, được xử lý qua quy trình thụ động hóa nhiều giai đoạn trước khi phủ sơn tĩnh điện polyester nung ở 200°C. Lớp phủ tạo nên một lớp màng bảo vệ kiên cố tuyệt đối không bị rỉ sét, ăn mòn hay oxy hóa muối biển.',
    specs: [
      { label: 'Coating Type', labelVi: 'Loại Lớp Phủ', value: 'Thermoset Architectural Polyester', valueVi: 'Sơn Polyester Kiến Trúc Nhiệt Rắn' },
      { label: 'Corrosion Resistance', labelVi: 'Chống Ăn Mòn', value: 'Salt Spray Tested to ASTM B117', valueVi: 'Thử nghiệm phun muối đạt chuẩn ASTM B117' },
      { label: 'Joint Construction', labelVi: 'Kết Cấu Mối Ghép', value: 'Full-Circumference 360° Heliarc Welds', valueVi: 'Mối hàn Heliarc khép kín 360°' },
      { label: 'Weight Advantage', labelVi: 'Ưu Điểm Trọng Lượng', value: 'Heavy enough for wind, easy to reconfigure', valueVi: 'Đủ nặng trước gió lớn, dễ dàng di chuyển' },
    ],
    features: [
      { en: '100% rust-proof even in beachfront, coastal, and poolside environments.', vi: '100% không rỉ sét ngay cả ở vùng bờ biển, hơi muối hay sát mép hồ bơi.' },
      { en: 'Scratch-resistant matte finish that feels silky and stays cool to the touch.', vi: 'Bề mặt sơn mờ chống trầy xước, êm ái khi chạm và tản nhiệt nhanh.' },
      { en: 'Harmoniously pairs with warm Ipe wood accents and woven Solara details.', vi: 'Kết hợp hài hòa cùng các điểm nhấn gỗ Ipe ấm áp và sợi đan Solara.' },
    ],
    careTip: {
      en: 'Simply wash with mild detergent and water. An occasional application of automotive wax preserves the showroom luster.',
      vi: 'Chỉ cần lau rửa bằng nước và chất tẩy rửa nhẹ. Thoa sáp đánh bóng định kỳ sẽ duy trì độ bóng đẹp như ban đầu.',
    },
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  },
  hpl: {
    id: 'hpl',
    badge: 'Table Surface',
    badgeVi: 'Mặt Bàn Chịu Lực',
    title: 'HIGH PRESSURE LAMINATE (HPL)',
    titleVi: 'TẤM ÉP CAO ÁP HPL ĐẲNG CẤP',
    subtitle: 'Resin-Infused Composite with Extreme Scratch & Thermal Resistance',
    subtitleVi: 'Hợp Chất Ngấm Nhựa Chịu Nhiệt & Chống Trầy Cực Cao',
    description:
      'High Pressure Laminate (HPL) is a composite formed by saturating multiple layers of kraft paper with thermosetting phenolic resins, consolidated under simultaneous intense heat (300°F) and extreme pressure (1,000+ psi). The resulting non-porous slab is virtually impervious to heat, sharp impact, wine spills, and UV degradation.',
    descriptionVi:
      'Tấm ép cao áp HPL là vật liệu composite được tạo thành bằng cách ngâm nhiều lớp giấy kraft trong nhựa phenolic nhiệt rắn, sau đó ép đồng thời dưới nhiệt độ cao (150°C) và áp suất cực đại (hơn 1.000 psi). Bề mặt không có lỗ rỗng giúp chống chịu hoàn hảo trước nhiệt độ nồi chảo nóng, va đập, vết rượu vang và tia cực tím.',
    specs: [
      { label: 'Manufacturing Process', labelVi: 'Quy Trình Sản Xuất', value: 'High Heat (300°F) + Extreme Pressure', valueVi: 'Nhiệt Độ Cao (150°C) + Áp Suất Cực Đại' },
      { label: 'Surface Porosity', labelVi: 'Độ Rỗng Bề Mặt', value: 'Zero-Porosity Antimicrobial Slab', valueVi: 'Bề mặt kín hoàn toàn, kháng khuẩn' },
      { label: 'Thermal Resistance', labelVi: 'Chịu Nhiệt', value: 'Withstands hot dinnerware & freezing ice', valueVi: 'Chịu đĩa nóng trực tiếp và băng giá' },
      { label: 'Impact Durability', labelVi: 'Độ Bền Va Đập', value: 'Solid core resist chipping & delamination', valueVi: 'Lõi đặc nguyên khối chống sứt mẻ và bong tróc' },
    ],
    features: [
      { en: 'Completely food-safe and hygienic, prohibiting the growth of mold or bacteria.', vi: 'An toàn vệ sinh thực phẩm 100%, ngăn ngừa vi khuẩn và nấm mốc phát triển.' },
      { en: 'Unaltered by severe outdoor temperature swings between summer and winter.', vi: 'Không cong vênh hay biến dạng trước sự chênh lệch nhiệt độ giữa mùa hè và mùa đông.' },
      { en: 'Contemporary sleek aesthetic with matte bevel-profile edges.', vi: 'Thẩm mỹ hiện đại tinh tế với mép vát cạnh chuẩn phong cách tối giản Châu Âu.' },
    ],
    careTip: {
      en: 'Wipe with a damp sponge or microfiber cloth. Resists all household cleaners and acidic foods like lemon juice and balsamic vinegar.',
      vi: 'Lau chùi đơn giản với khăn sợi microfiber ẩm. Kháng hoàn toàn các chất tẩy gia dụng và axit từ nước chanh hay giấm thơm.',
    },
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
  },
};

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // Selected Material for Interactive Modal
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialDetail | null>(null);

  // Bottom Navigation Cards matching official Jensen Outdoor site
  const storyCards = [
    {
      id: 'sustainability',
      title: 'SUSTAINABILITY',
      titleVi: 'PHÁT TRIỂN BỀN VỮNG',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      alt: 'Bolivian rainforest canopy',
      hasLogo: true,
      action: () => onNavigate('sustainability'),
    },
    {
      id: 'design',
      title: 'DESIGN',
      titleVi: 'THIẾT KẾ',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      alt: 'Drafting and designing furniture prototypes',
      action: () => onNavigate('design'),
    },
    {
      id: 'craftsmanship',
      title: 'CRAFTSMANSHIP',
      titleVi: 'KỸ THUẬT CHẾ TÁC',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      alt: 'Artisan wood bench and mortise joinery',
      action: () => {
        onNavigate('story');
        setTimeout(() => {
          const el = document.getElementById('materials-ipe');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
    },
    {
      id: 'product-care',
      title: 'PRODUCT CARE',
      titleVi: 'BẢO QUẢN SẢN PHẨM',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      alt: 'Outdoor patio lounge sofa furniture',
      action: () => onNavigate('care'),
    },
  ];

  return (
    <div className="bg-white text-[#1C1A17] selection:bg-[#9B522E] selection:text-white font-sans animate-in fade-in duration-300">
      
      {/* 1. TOP BRAND HEADER / BREADCRUMB BAR */}
      <div className="bg-[#14232C] text-white py-3 px-4 border-b border-white/10 flex items-center justify-between">
        <button
          onClick={() => onNavigate('story')}
          className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isVi ? 'Quay lại Câu chuyện thương hiệu' : 'Back to Our Story'}</span>
        </button>

        <div className="flex items-center gap-2 select-none">
          <img
            src="/logo-b-open.png"
            alt="B+Open Logo"
            className="h-6 w-auto object-contain"
          />
        </div>

        <div className="text-[11px] text-white/60 tracking-wider hidden sm:block">
          {isVi ? 'TIÊU CHUẨN CHẤT LIỆU CAO CẤP' : 'THE HIGHEST-QUALITY MATERIALS'}
        </div>
      </div>

      {/* 2. HERO BANNER: "THE HIGHEST-QUALITY: MATERIALS" (Matching Screenshot 1) */}
      <section className="relative w-full overflow-hidden bg-[#201D1A]">
        <div className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] lg:h-[680px]">
          {/* Official Jensen Outdoor heirloom timber furniture photograph */}
          <img
            src="https://www.jensenoutdoor.com/wp-content/uploads/2020/10/opal-63400-63720-h-3-1024x683.jpg"
            alt="Round Outdoor Hardwood Dining Table with Chairs - B+Open"
            className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-105"
          />
          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />

          {/* Centered headline */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center select-none">
            <span className="text-white text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] sm:tracking-[0.32em] uppercase mb-2 drop-shadow-md text-white/90">
              {isVi ? 'CHẤT LƯỢNG CAO NHẤT:' : 'THE HIGHEST-QUALITY:'}
            </span>
            <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.22em] sm:tracking-[0.28em] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              {isVi ? 'CHẤT LIỆU' : 'MATERIALS'}
            </h1>
          </div>
        </div>
      </section>

      {/* 3. INTRODUCTION: THE HIGHEST-QUALITY SUSTAINABLE FURNITURE IN THE WORLD... (Matching Screenshot 1) */}
      <section className="bg-white py-14 sm:py-20 border-b border-[#EAE6E1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold uppercase tracking-[0.06em] text-[#1C1A17] leading-snug max-w-3xl mx-auto">
            {isVi 
              ? 'NỘI THẤT BỀN VỮNG CHẤT LƯỢNG CAO NHẤT THẾ GIỚI ĐÒI HỎI NHỮNG CHẤT LIỆU HOÀN HẢO NHẤT'
              : 'THE HIGHEST-QUALITY SUSTAINABLE FURNITURE IN THE WORLD REQUIRES THE RIGHT MATERIALS'}
          </h2>
          
          <div className="text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal text-center max-w-3xl mx-auto">
            <p>
              {isVi
                ? 'Tại B+Open, chúng tôi tin rằng nội thất sang trọng bắt đầu từ những chất liệu hoàn hảo. Những kiệt tác bền bỉ với chất lượng di sản trường tồn thanh lịch vượt qua thử thách của thiên nhiên, cường độ sử dụng và thời gian nhờ phẩm chất vượt trội của vật liệu. Khám phá cách tiêu chuẩn di sản của chúng tôi thấm đượm vào trái tim của từng sản phẩm nội thất tạo ra.'
                : 'At B+Open, we believe that luxury furniture begins with the right materials. Durable, heirloom-quality pieces elegantly withstand the test of nature, use, and time by the grace of superior materials. Learn how our heirloom-quality standard for materials is at the heart of every piece of furniture we make.'}
            </p>
          </div>
        </div>
      </section>

      {/* 4. FEATURE 1: IPE WOOD WITH FULL-WIDTH LANDSCAPE (Matching Screenshot 1 & 2) */}
      <section className="bg-white pt-4 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Panoramic Image with Top-Left Floating Card */}
          <div className="relative w-full overflow-hidden shadow-sm border border-[#E8E4DD] rounded-xs">
            
            {/* Golden Hour Sunset Mountain View with Stone Patio, Fire Pit, and Adirondack Chairs */}
            <div className="relative h-[420px] sm:h-[540px] md:h-[640px] lg:h-[720px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2200&q=85"
                alt="Golden sunset patio with roaring fire pit and B+Open Ipe Adirondack chairs overlooking scenic mountains"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>

            {/* Floating White Overlay Card on Top-Left (Exact match to user screenshot 1) */}
            <div className="absolute top-6 left-6 sm:top-10 sm:left-10 max-w-[320px] sm:max-w-sm bg-white/95 backdrop-blur-xs p-6 sm:p-8 shadow-xl border border-black/5 rounded-xs">
              <span className="inline-block px-2.5 py-0.5 rounded-xs bg-[#737D5A] text-white text-[10px] font-bold uppercase tracking-wider mb-2 shadow-xs">
                {isVi ? 'ĐẤT & RỪNG • BỀN BỈ TRUYỀN ĐỜI' : 'EARTH • HEIRLOOM DURABLE'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1C1A17] uppercase tracking-[0.06em] mb-3">
                {isVi ? 'GỖ IPE TỰ NHIÊN' : 'IPE WOOD'}
              </h3>
              <p className="text-xs sm:text-[13px] text-[#2C2A29] leading-relaxed font-normal mb-5">
                {isVi
                  ? 'Gỗ Ipe, viên ngọc quý trên vương miện gỗ tự nhiên của chúng tôi, hiện thân cho tiêu chuẩn chất lượng di sản mà chúng tôi cam kết cho mọi chất liệu cấu thành.'
                  : 'Ipe wood, the crown jewel of our timbers, embodies the heirloom-quality standard we hold all of our materials to.'}
              </p>
              <button
                onClick={() => setSelectedMaterial(MATERIAL_DETAILS.ipe)}
                className="inline-block text-xs font-bold text-[#9B522E] underline underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer uppercase tracking-wider"
              >
                {isVi ? 'Đọc thêm về gỗ Ipe' : 'Read About Ipe Wood'}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FOUR ALTERNATING MATERIAL BLOCKS (Matching Screenshot 2) */}
      <section className="bg-white pb-20 sm:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          
          {/* BLOCK 1: WOVEN SOLARA FIBER (Left: Image | Right: Text) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left: Photo of woven wicker texture with sculpted Ipe arm cap */}
            <div className="relative overflow-hidden shadow-xs border border-[#E8E4DD] rounded-xs aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85"
                alt="Woven Solara Fiber with sculpted Ipe wood arm cap and plush cushion"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Text Box */}
            <div className="space-y-3 sm:space-y-4 text-left">
              <span className="inline-block px-2.5 py-0.5 rounded-xs bg-[#DED9CD] text-[#221F1C] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                {isVi ? 'KHÔNG KHÍ • THOÁNG ĐÃNG AN TOÀN' : 'AIR • NATURE SAFE'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.06em] text-[#1C1A17]">
                {isVi ? 'SỢI DỆT SOLARA FIBER' : 'WOVEN SOLARA FIBER'}
              </h3>
              <p className="text-xs sm:text-sm text-[#2C2A29] leading-relaxed font-normal">
                {isVi
                  ? 'Sợi Dệt Solara Fiber là sự kết hợp hoàn hảo cho danh mục nội thất sang trọng của B+Open nhờ khả năng phục hồi siêu việt, độ bền màu vĩnh cửu, độ dẻo dai và vẻ quyến rũ phong cách.'
                  : "Woven Solara Fiber is a perfect fit for B+Open's portfolio of luxury furniture for its superior resilience, indelible color fastness, flexibility and stylistic allure."}
              </p>
              <div className="pt-1">
                <button
                  onClick={() => setSelectedMaterial(MATERIAL_DETAILS.solara)}
                  className="inline-block text-xs font-bold text-[#9B522E] underline underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer uppercase tracking-wider"
                >
                  {isVi ? 'Tìm hiểu thêm về sợi Solara' : 'Learn More About Woven Solara Fiber'}
                </button>
              </div>
            </div>
          </div>

          {/* BLOCK 2: SUNBRELLA® CUSHION FABRICS (Left: Text | Right: Image) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left: Text Box (Order 2 on mobile, Order 1 on desktop) */}
            <div className="space-y-3 sm:space-y-4 text-left order-2 md:order-1">
              <span className="inline-block px-2.5 py-0.5 rounded-xs bg-[#798E9D] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                {isVi ? 'NƯỚC • KHÁNG NƯỚC TOÀN DIỆN' : 'WATER • COMPLETE PERFORMANCE'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.06em] text-[#1C1A17]">
                {isVi ? 'VẢI ĐỆM NGOẠI THẤT SUNBRELLA®' : 'SUNBRELLA® CUSHION FABRICS'}
              </h3>
              <p className="text-xs sm:text-sm text-[#2C2A29] leading-relaxed font-normal">
                {isVi
                  ? 'Sunbrella® bao bọc các tấm đệm ngoài trời của chúng tôi trong chất liệu vải chuẩn ngoại thất bền bỉ, êm ái với đa dạng màu sắc và phong cách tuyển chọn.'
                  : 'Sunbrella® wraps our outdoor cushions in durable, comfortable, outdoor-grade fabrics offered in a wide selection of colors and styles.'}
              </p>
              <div className="pt-1">
                <button
                  onClick={() => setSelectedMaterial(MATERIAL_DETAILS.sunbrella)}
                  className="inline-block text-xs font-bold text-[#798E9D] underline underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer uppercase tracking-wider"
                >
                  {isVi ? 'Đọc thêm về vải đệm Sunbrella®' : 'Read About Sunbrella® Cushion Fabrics'}
                </button>
              </div>
            </div>

            {/* Right: Photo of two wooden chairs with royal blue Sunbrella cushions */}
            <div className="relative overflow-hidden shadow-xs border border-[#E8E4DD] rounded-xs aspect-[4/3] order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85"
                alt="Two outdoor hardwood lounge armchairs with royal blue Sunbrella cushions on porch"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* BLOCK 3: POWDER COATED ALUMINUM (Left: Image | Right: Text) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left: Photo of outdoor dining set with powder-coated aluminum frame */}
            <div className="relative overflow-hidden shadow-xs border border-[#E8E4DD] rounded-xs aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
                alt="Commercial-grade powder coated aluminum dining set with hardwood tabletop"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Text Box */}
            <div className="space-y-3 sm:space-y-4 text-left">
              <span className="inline-block px-2.5 py-0.5 rounded-xs bg-[#9B522E] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                {isVi ? 'LỬA • KIM LOẠI THƯƠNG MẠI' : 'FIRE • COMMERCIAL-GRADE'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.06em] text-[#1C1A17]">
                {isVi ? 'NHÔM SƠN TĨNH ĐIỆN' : 'POWDER COATED ALUMINUM'}
              </h3>
              <p className="text-xs sm:text-sm text-[#2C2A29] leading-relaxed font-normal">
                {isVi
                  ? 'Bền bỉ phi thường nhưng lại nhẹ nhàng một cách bất ngờ, nhôm sơn tĩnh điện chuẩn thương mại là lựa chọn lý tưởng cho không gian ngoài trời. Đóng vai trò định hình kiểu dáng cho các thiết kế nhôm và tạo khung xương cho các sản phẩm đan, hãy khám phá thêm về chất liệu thực sự ấn tượng này.'
                  : 'Remarkably durable yet surprisingly lightweight, commercial-grade powder coated aluminum is ideal for outdoor use. Instrumental to the styling of our aluminum designs and providing structure for our woven pieces, learn more about this truly remarkable material.'}
              </p>
              <div className="pt-1">
                <button
                  onClick={() => setSelectedMaterial(MATERIAL_DETAILS.aluminum)}
                  className="inline-block text-xs font-bold text-[#9B522E] underline underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer uppercase tracking-wider"
                >
                  {isVi ? 'Tìm hiểu thêm về nhôm sơn tĩnh điện' : 'Find out More About Powder Coated Aluminum'}
                </button>
              </div>
            </div>
          </div>

          {/* BLOCK 4: HIGH PRESSURE LAMINATE (HPL) (Left: Text | Right: Image) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left: Text Box (Order 2 on mobile, Order 1 on desktop) */}
            <div className="space-y-3 sm:space-y-4 text-left order-2 md:order-1">
              <span className="text-[11px] font-semibold text-[#5C554E] uppercase tracking-wider block">
                {isVi ? 'Mặt Bàn Chịu Lực' : 'Table Surface'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.06em] text-[#1C1A17]">
                {isVi ? 'TẤM ÉP CAO ÁP HPL' : 'HIGH PRESSURE LAMINATE (HPL)'}
              </h3>
              <p className="text-xs sm:text-sm text-[#2C2A29] leading-relaxed font-normal">
                {isVi
                  ? 'HPL là vật liệu composite công nghệ cao từ giấy kraft ngậm nhựa nhiệt rắn, kết hợp cùng nhau tạo nên bề mặt hoàn thiện với chất lượng thị giác xuất sắc, tuổi thọ lâu dài và đặc tính kháng khuẩn vượt trội.'
                  : 'HPL is a high tech composite of kraft paper enriched with resin, put together these materials create a surface finish with excellent visual qualities, a long life, and antimicrobial properties.'}
              </p>
              <div className="pt-1">
                <button
                  onClick={() => setSelectedMaterial(MATERIAL_DETAILS.hpl)}
                  className="inline-block text-xs font-bold text-[#1C1A17] underline underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer uppercase tracking-wider"
                >
                  {isVi ? 'Khám phá sự thật về tấm ép HPL' : 'Get the Facts on High Pressure Laminate'}
                </button>
              </div>
            </div>

            {/* Right: Photo of modern outdoor dining table with sleek HPL surface */}
            <div className="relative overflow-hidden shadow-xs border border-[#E8E4DD] rounded-xs aspect-[4/3] order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
                alt="High Pressure Laminate outdoor dining tabletop with aluminum frame and chairs"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6. BOTTOM EXPLORATION CARDS CAROUSEL */}
      <section className="bg-[#F8F6F2] py-14 sm:py-20 border-t border-[#EAE4DC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {storyCards.map((card) => (
              <div
                key={card.id}
                onClick={card.action}
                className="group relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-xs cursor-pointer shadow-xs border border-black/10 hover:shadow-md transition-all duration-300"
              >
                {/* Background Image */}
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 group-hover:via-black/20 transition-colors" />

                {/* Optional Brand Logo on Sustainability card */}
                {card.hasLogo && (
                  <div className="absolute inset-0 flex items-center justify-center pb-6 pointer-events-none">
                    <img
                      src="/logo-b-open.png"
                      alt="B+Open Logo"
                      className="h-16 sm:h-20 w-auto max-w-[200px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
                    />
                  </div>
                )}

                {/* Title Banner at Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-center">
                  <h3 className="text-white text-xs sm:text-sm font-bold tracking-[0.18em] uppercase drop-shadow-sm">
                    {isVi ? card.titleVi : card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Arrows on Sides as shown in screenshot */}
          <div className="hidden lg:flex items-center justify-between absolute -inset-x-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <button
              onClick={() => onNavigate('design')}
              className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-black/70 hover:text-black shadow-md transition-all cursor-pointer"
              aria-label="Previous story section"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('sustainability')}
              className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-black/70 hover:text-black shadow-md transition-all cursor-pointer"
              aria-label="Next story section"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* 7. INTERACTIVE DETAIL MODAL FOR MATERIAL SPECIFICATIONS */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xs shadow-2xl border border-[#E5E2DC] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image with close button */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden">
              <img
                src={selectedMaterial.image}
                alt={selectedMaterial.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedMaterial(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title inside header */}
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#E8D8C8]">
                  {isVi ? selectedMaterial.badgeVi : selectedMaterial.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
                  {isVi ? selectedMaterial.titleVi : selectedMaterial.title}
                </h3>
                <p className="text-xs text-white/80 font-normal mt-0.5">
                  {isVi ? selectedMaterial.subtitleVi : selectedMaterial.subtitle}
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Description */}
              <p className="text-xs sm:text-sm text-[#2C2A29] leading-relaxed">
                {isVi ? selectedMaterial.descriptionVi : selectedMaterial.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="bg-[#F8F6F2] p-4 sm:p-5 rounded-xs border border-[#ECE6DE] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1A17] flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#9B522E]" />
                  <span>{isVi ? 'Thông Số Kỹ Thuật Đạt Chuẩn' : 'Technical Specifications'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {selectedMaterial.specs.map((s, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-xs border border-[#EBE5DC]">
                      <div className="text-[10px] text-[#7A756F] uppercase tracking-wider">
                        {isVi ? s.labelVi : s.label}
                      </div>
                      <div className="text-xs font-bold text-[#1C1A17] mt-0.5">
                        {isVi ? s.valueVi : s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features Bullet Points */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1A17] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#9B522E]" />
                  <span>{isVi ? 'Đặc Tính Vượt Trội' : 'Key Advantages'}</span>
                </h4>
                <ul className="space-y-2">
                  {selectedMaterial.features.map((feat, idx) => (
                    <li key={idx} className="text-xs text-[#3C3833] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9B522E] mt-1.5 shrink-0" />
                      <span>{isVi ? feat.vi : feat.en}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Care Tip Box */}
              <div className="p-4 bg-[#F2EDE4] rounded-xs border-l-3 border-[#9B522E] text-xs text-[#2A2621]">
                <strong className="font-bold block mb-1">
                  {isVi ? 'Mẹo Bảo Quản & Chăm Sóc:' : 'Care & Maintenance Tip:'}
                </strong>
                <span>{isVi ? selectedMaterial.careTip.vi : selectedMaterial.careTip.en}</span>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#EAE4DC]">
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="px-5 py-2.5 bg-[#1C1A17] hover:bg-[#3C3833] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
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
