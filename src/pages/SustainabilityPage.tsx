import React from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { JensenLeafLogo } from '../components/JensenLeafLogo';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { InlineEditableImage } from '../components/InlineEditableImage';

interface SustainabilityPageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string }) => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // The 4 exploration cards at the bottom matching official Jensen Outdoor site
  const storyCards: {
    id: string;
    title: string;
    titleVi: string;
    image: string;
    alt: string;
    hasLogo?: boolean;
    action: () => void;
  }[] = [
    {
      id: 'design',
      title: 'DESIGN',
      titleVi: 'THIẾT KẾ',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      alt: 'Drafting and designing furniture prototypes',
      action: () => onNavigate('design'),
    },
    {
      id: 'materials',
      title: 'MATERIALS',
      titleVi: 'CHẤT LIỆU',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      alt: 'Outdoor dining furniture and hardwood materials',
      action: () => onNavigate('materials'),
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
      <div className="bg-[#1C241E] text-white py-3 px-4 border-b border-white/10 flex items-center justify-between">
        <button
          onClick={() => onNavigate('story')}
          className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-[#DED9CD] transition-colors cursor-pointer"
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

        <div className="hidden sm:block">
          <span className="px-2.5 py-0.5 rounded-full bg-[#737D5A] text-white text-[10px] font-bold tracking-wider uppercase">
            {isVi ? 'CHỨNG NHẬN FSC® C013910' : 'FSC® C013910 CERTIFIED'}
          </span>
        </div>
      </div>

      {/* 2. HERO BANNER: "OUR STORY: SUSTAINABILITY" (Matching Screenshot 1) */}
      <section className="relative w-full overflow-hidden bg-[#1B271F]">
        <div className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] lg:h-[680px]">
          {/* Official Jensen Outdoor Chiquitania rainforest canopy photograph */}
          <InlineEditableImage record="collection" recordId="sustainability" field="heroImage" value="https://www.jensenoutdoor.com/wp-content/uploads/2021/02/FI-Unicon.jpg" alt="Bolivian Chiquitania Rainforest Canopy at Dawn - B+Open" className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-105" />
          {/* Vignette & overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/45" />

          {/* Centered headline */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center select-none">
            <span className="text-white text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] sm:tracking-[0.32em] uppercase mb-2 drop-shadow-md text-white/90">
              {isVi ? 'CÂU CHUYỆN CỦA CHÚNG TÔI:' : 'OUR STORY:'}
            </span>
            <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.22em] sm:tracking-[0.28em] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              {isVi ? 'PHÁT TRIỂN BỀN VỮNG' : 'SUSTAINABILITY'}
            </h1>
          </div>
        </div>
      </section>

      {/* 3. SECTION: THE SEEDS OF SUSTAINABILITY (Matching Screenshot 1) */}
      <section className="bg-white py-14 sm:py-20 border-b border-[#EAE6E1]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
            {isVi ? 'NHỮNG HẠT MẦM CỦA SỰ BỀN VỮNG' : 'THE SEEDS OF SUSTAINABILITY'}
          </h2>
          
          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal text-center max-w-2xl mx-auto">
            <p>
              {isVi
                ? 'Tại B+Open, chúng tôi hiểu rằng để mang lại các loại gỗ chất lượng cao nhất cho thị trường, khu rừng cần được bảo vệ chu đáo đến tận khi cây đạt độ trưởng thành hoàn hảo và xa hơn thế nữa.'
                : 'At B+Open we understand that in order to bring the highest-quality timbers to market, the forest needs to be safe-guarded well into full maturity and beyond.'}
            </p>
            <p>
              {isVi
                ? 'Cây gỗ cứng Ipe (phát âm là "ee-pay") sinh trưởng rất chậm, phải mất gần một thế kỷ để đạt tới kích thước tiêu chuẩn cần thiết cho ra đời những thân gỗ mịn màng và bền bỉ bậc nhất trên thị trường hiện nay.'
                : 'Ipe (pronounced "EE-pay") hardwood trees grow slowly, taking nearly a century to reach the dimensions necessary to produce the finest, most durable, timbers on the market today.'}
            </p>
          </div>
        </div>
      </section>

      {/* 4. LANDSCAPE IMAGE: BOLIVIAN FSC® CERTIFIED FORESTS (Matching Screenshot 2) */}
      <section className="bg-white">
        <div className="w-full">
          <div className="relative w-full h-[320px] sm:h-[460px] md:h-[600px] lg:h-[720px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2200&q=85"
              alt="B+Open's FSC® Certified forests in Bolivia"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Image caption */}
          <div className="py-3 px-4 text-center">
            <p className="text-xs sm:text-[13px] text-[#4A4744] italic tracking-wide">
              {isVi
                ? '(Những cánh rừng được chứng nhận FSC® của B+Open tại Bolivia)'
                : "(B+Open's FSC® Certified forests in Bolivia)"}
            </p>
          </div>
        </div>
      </section>

      {/* 5. SECTION: WE KNOW THE SOURCE OF OUR TIMBER & FEEL GOOD FURNITURE (Matching Screenshot 2) */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12 text-center">
          
          {/* Part A: WE KNOW THE SOURCE OF OUR TIMBER */}
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
              {isVi ? 'CHÚNG TÔI THẤU HIỂU NGUỒN GỐC GỖ CỦA MÌNH' : 'WE KNOW THE SOURCE OF OUR TIMBER'}
            </h2>
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal max-w-2xl mx-auto">
              <p>
                {isVi
                  ? 'Miền Đông Bolivia là vùng đất của gia đình và lâm nghiệp bền vững. Quốc gia này sở hữu hơn 3,7 triệu mẫu đất rừng được Hội đồng Quản lý Rừng (FSC®) chứng nhận, đưa Bolivia trở thành quốc gia dẫn đầu về rừng bền vững trong số các vùng nhiệt đới. Những người coi Bolivia là "hogar" (mái ấm) luôn gắn kết bẩm sinh với môi trường tự nhiên, thấu hiểu sâu sắc cách giữ gìn những tài nguyên này cho các thế hệ mai sau.'
                  : 'Eastern Bolivia is a place of family and forestry. The country is home to 3.7 million acres of Forest Stewardship Council (FSC®)-Certified forestland, making Bolivia the leader in sustainable forests among tropical countries. Those that call Bolivia "hogar" (home) have an innate connection to the natural environment, understanding how these resources are to be preserved for future generations.'}
              </p>
              <p>
                {isVi
                  ? 'Thông qua hợp đồng nhượng quyền và thuê đất dài hạn với chính phủ Bolivia, B+Open trực tiếp quản lý hơn 2 triệu mẫu rừng nhiệt đới khô tại Đông Bolivia. Nhờ quy trình chuỗi hành trình sản phẩm được chứng nhận FSC®, chúng tôi có thể truy xuất nguồn gốc chính xác của từng cây gỗ và vị trí khai thác chọn lọc bền vững cho đến khi sản phẩm hoàn thiện cập bến trung tâm phân phối tại Virginia.'
                  : 'Through a land-lease partnership with the Bolivian government, B+Open manages over 2 million acres of dry-tropical forests in Eastern Bolivia. Through the FSC®-certification chain of custody process, we are able to track the exact tree and location from where it is sustainably felled to when it arrives in our distribution center in Virginia as a finished piece of furniture.'}
              </p>
            </div>
          </div>

          {/* Part B: FEEL GOOD FURNITURE */}
          <div className="space-y-6 pt-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
              {isVi ? 'NỘI THẤT MANG LẠI SỰ AN LÀNH' : 'FEEL GOOD FURNITURE'}
            </h2>
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal max-w-2xl mx-auto">
              <p>
                {isVi
                  ? 'Bằng việc sở hữu sản phẩm của B+Open, bạn đang trực tiếp ủng hộ sự trường tồn của những cánh rừng do chúng tôi quản lý. B+Open gia tăng giá trị cho các tài nguyên thiên nhiên này thông qua thiết kế sáng tạo và kỹ thuật chế tác tiên tiến; nhưng chúng tôi sẽ chẳng thể tạo ra giá trị nào nếu các cánh rừng biến mất. Đó là lý do kỹ thuật thu hoạch dấu chân nhỏ của chúng tôi chỉ chọn lọc những cây Ipe trăm tuổi đã già cỗi, giữ lại các cây non và sung mãn hơn để nuôi dưỡng rừng trước chu kỳ thu hoạch tiếp theo.'
                  : "By purchasing B+Open you are directly supporting the longevity of the forests we manage. B+Open adds value to these natural resources, through creative furniture design and manufacturing techniques; but we wouldn't be able to add any value if our forests disappeared. That is why our small-footprint harvesting techniques only select the century-old mature Ipe trees, leaving the younger and more fertile trees to replenish the forest before our next harvest."}
              </p>
              <p>
                {isVi
                  ? 'B+Open đã thiết lập kế hoạch luân phiên khai thác rừng theo chuẩn chứng nhận FSC® qua từng mùa. Điều này đảm bảo mỗi lô rừng sẽ không bao giờ bị tác động lại trong suốt 30 năm, tạo thời gian cho các thế hệ cây Ipe mới vươn lên và đóng góp vào tính đa dạng sinh học của rừng.'
                  : 'B+Open has made an FSC®-Certified plan to rotate which areas of the forest are harvested every season. This ensures that the same plot of forest is not touched again before thirty years have passed, allowing new batches of mature Ipe trees to grow, contributing to forest diversity.'}
              </p>
              <p>
                {isVi
                  ? "Chất gỗ Ipe của chúng tôi có độ bền truyền đời. Bạn hoàn toàn có thể an tâm khi biết rằng nội thất B+Open có thể truyền lại cho thế hệ tiếp theo. Khi các xu hướng thay đổi, hãy tự tin rằng đến đời cháu chắt của bạn sở hữu những khoảng sân vườn riêng, B+Open vẫn sẽ luôn đồng hành để tạo nên những tác phẩm nội thất gỗ mới mẻ, phong cách và bền vững."
                  : "Our Ipe wood is heirloom-durable. Rest comfortably in the knowledge you can pass down your B+Open furniture to the next generation. As trends change, feel confident knowing that when your children's-children have backyards of their own B+Open will be there making new, stylish and sustainable, wood furniture."}
              </p>
              <p>
                {isVi
                  ? 'Cam kết bảo tồn rừng của chúng tôi biến việc lựa chọn B+Open cho không gian thư giãn của bạn thành một quyết định đầy tự hào.'
                  : 'Our commitment to preserving our forests makes choosing B+Open for your leisure spaces a decision to be proud of.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. PATIO DINING SET IMAGE (Matching Screenshot 3) */}
      <section className="bg-white">
        <div className="w-full">
          <div className="relative w-full h-[320px] sm:h-[460px] md:h-[600px] lg:h-[720px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
              alt="Be patio-proud with sustainable B+Open furniture"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Caption */}
          <div className="py-3 px-4 text-center">
            <p className="text-xs sm:text-[13px] text-[#4A4744] italic tracking-wide">
              {isVi
                ? '(Tự hào với không gian sân vườn cùng nội thất bền vững B+Open)'
                : '(Be patio-proud with sustainable B+Open furniture)'}
            </p>
          </div>
        </div>
      </section>

      {/* 7. SECTION: ACCOUNTABLY FSC®-CERTIFIED (Matching Screenshot 3) */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
            {isVi ? 'CHỨNG NHẬN FSC® CÓ TRÁCH NHIỆM GIẢI TRÌNH' : 'ACCOUNTABLY FSC®-CERTIFIED'}
          </h2>
          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal max-w-2xl mx-auto">
            <p>
              {isVi
                ? 'Hội đồng Quản lý Rừng, FSC®, được thành lập năm 1993 với sứ mệnh thúc đẩy việc quản lý rừng có trách nhiệm với môi trường, mang lại lợi ích xã hội và thịnh vượng kinh tế trên toàn cầu. Ngày nay, hơn 380 triệu mẫu rừng trên khắp thế giới đã được chứng nhận độc lập, với nhãn FSC® xuất hiện trên các sản phẩm tự nhiên được sản xuất 100% theo các hướng dẫn đã được xác minh.'
                : "The Forest Stewardship Council, FSC®, formed in 1993 with the mission to promote environmentally sound, socially beneficial and economically prosperous management of the world's forests. Today, more than 380 million acres of forests worldwide have been independently certified, with the FSC® label carried on natural products 100% produced within the verified guidelines."}
            </p>
            <p>
              {isVi
                ? "B+Open, mã chứng nhận C013910, là một trong những tổ chức đầu tiên sở hữu diện tích rừng tại Nam Mỹ đạt chứng nhận 100% FSC® vào năm 1995. Điều này có nghĩa là các khu rừng cung cấp gỗ cho chúng tôi được thanh tra độc lập và xác minh tính tuân thủ nghiêm ngặt dựa trên 10 Nguyên tắc Quản lý Rừng của Hội đồng Quản lý Rừng FSC®. Các nguyên tắc này bao gồm việc công nhận quyền của cộng đồng và các dân tộc bản địa, tính khả thi kinh tế lâu dài, cùng sự bảo tồn động vật hoang dã và môi trường sống."
                : "B+Open, C013910, was one of the first organizations with forests in South America to become 100% FSC®-Certified in 1995. This means that the forests our wood products come from are independently inspected and verified for compliance against strict standards based on the Forest Stewardship Council's, 10 Principles of Forest Stewardship. These principles include the recognition of communities and indigenous peoples' rights, long-term economic viability, and protection of wildlife and the environment."}
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onNavigate('furniture')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1C1A17] hover:bg-[#3D2C22] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer rounded-xs"
            >
              <span>{isVi ? 'Khám Phá Các Bộ Sưu Tập FSC®' : 'Explore FSC® Certified Furniture'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM EXPLORATION CARDS CAROUSEL (Matching Screenshot 3) */}
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

                {/* Optional Brand Logo (like on Sustainability card) */}
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
              onClick={() => onNavigate('story')}
              className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-black/70 hover:text-black shadow-md transition-all cursor-pointer"
              aria-label="Previous story section"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('care')}
              className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-black/70 hover:text-black shadow-md transition-all cursor-pointer"
              aria-label="Next story section"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
