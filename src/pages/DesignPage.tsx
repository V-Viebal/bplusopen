import React from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { JensenLeafLogo } from '../components/JensenLeafLogo';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { InlineEditableImage } from '../components/InlineEditableImage';

interface DesignPageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string }) => void;
}

export const DesignPage: React.FC<DesignPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // Exploration cards at the bottom matching official Jensen Outdoor site
  const storyCards = [
    {
      id: 'sustainability',
      title: 'SUSTAINABILITY',
      titleVi: 'PHÁT TRIỂN BỀN VỮNG',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      alt: 'Bolivian rainforest canopy with B+Open Leaf emblem',
      hasLogo: true,
      action: () => onNavigate('sustainability'),
    },
    {
      id: 'materials',
      title: 'MATERIALS',
      titleVi: 'CHẤT LIỆU',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      alt: 'Outdoor dining furniture overlooking scenic landscape',
      action: () => onNavigate('materials'),
    },
    {
      id: 'craftsmanship',
      title: 'CRAFTSMANSHIP',
      titleVi: 'KỸ THUẬT CHẾ TÁC',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      alt: 'Artisan wood mortise and tenon joinery',
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
    <div className="bg-white text-[#1C1A17] selection:bg-[#5C3822] selection:text-white font-sans animate-in fade-in duration-300">
      
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
          {isVi ? 'QUY TRÌNH THIẾT KẾ ĐỘC BẢN' : 'DESIGN PROCESS'}
        </div>
      </div>

      {/* 2. HERO BANNER: "OUR STORY: DESIGN" (Matching Screenshot 1) */}
      <section className="relative w-full overflow-hidden bg-[#24211E]">
        <div className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] lg:h-[680px]">
          {/* Official Jensen Outdoor award-winning furniture design photograph */}
          <InlineEditableImage record="collection" recordId="design" field="heroImage" value="https://www.jensenoutdoor.com/wp-content/uploads/2021/02/FI-Jett.jpg" alt="Award-Winning Modern Outdoor Furniture Design - B+Open" className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-105" />
          {/* Subtle dark vignette overlay for typography legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />

          {/* Centered headline */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center select-none">
            <span className="text-white text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] sm:tracking-[0.32em] uppercase mb-2 drop-shadow-md text-white/90">
              {isVi ? 'CÂU CHUYỆN CỦA CHÚNG TÔI:' : 'OUR STORY:'}
            </span>
            <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.22em] sm:tracking-[0.28em] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              {isVi ? 'THIẾT KẾ' : 'DESIGN'}
            </h1>
          </div>
        </div>
      </section>

      {/* 3. SECTION: DESIGNS 'MADE TO INSPIRE'. (Matching Screenshot 1) */}
      <section className="bg-white py-14 sm:py-20 border-b border-[#EAE6E1]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
            {isVi ? "THIẾT KẾ 'KHƠI NGUỒN CẢM HỨNG'" : "DESIGNS 'MADE TO INSPIRE'."}
          </h2>
          
          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal text-center max-w-2xl mx-auto">
            <p>
              {isVi
                ? 'Khi bắt đầu hành trình thiết kế một bộ sưu tập nội thất mới, luôn có một quy trình hợp tác sâu sắc kết nối hoạt động quản lý rừng tại Bolivia với các đội ngũ thiết kế của chúng tôi tại Hoa Kỳ và Châu Âu. Ý tưởng nào vừa mới mẻ đầy hứng khởi, nhưng lại gần gũi thân thuộc, mà chúng tôi có thể mang tới cho thị trường ngoài trời để tôn vinh trọn vẹn vẻ đẹp ngoạn mục của những chất liệu bền vững sẵn có? Trải qua nhiều năm, đội ngũ của chúng tôi không ngừng đổi mới bền vững cả trong ngôn ngữ thiết kế lẫn tay nghề chế tác để đáp ứng những nhu cầu luôn đổi thay.'
                : 'When we begin the work of designing a new furniture collection, there is a collaborative process that connects our forestry operations in Bolivia, to our design teams in the United States and Europe. What excitingly new, yet pleasingly familiar, idea can we bring to the outdoor market that best accentuates the striking beauty of the sustainable materials we have to work with? Over the years our team has continued to sustainably innovate our designs and craftsmanship to meet with an ever-changing need.'}
            </p>
            <p className="font-medium text-[#1C1A17]">
              {isVi
                ? "Hãy cùng tiếp tục khám phá cách các thiết kế của B+Open được 'Khơi Nguồn Cảm Hứng'."
                : "Read on to explore how B+Open designs are 'Made to Inspire.'"}
            </p>
          </div>
        </div>
      </section>

      {/* 4. IMAGE WITH OVERLAY BOX: "OUR PROCESS" (Matching Screenshot 2) */}
      <section className="bg-white pt-6 pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Photo with Floating Text Card */}
          <div className="relative w-full overflow-hidden shadow-sm border border-[#E8E4DD] rounded-xs">
            {/* Macro angle photo of chair joinery & woven detail */}
            <div className="relative h-[360px] sm:h-[480px] md:h-[560px] lg:h-[620px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2000&q=85"
                alt="B+Open chair craftsmanship detail with sculpted wood armrest and woven texture"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Floating White Overlay Card on top-left */}
            <div className="absolute top-6 left-6 sm:top-10 sm:left-10 max-w-[340px] sm:max-w-md bg-white/95 backdrop-blur-xs p-6 sm:p-8 shadow-lg border border-black/5">
              <h3 className="text-base sm:text-lg font-bold text-[#1C1A17] uppercase tracking-[0.08em] mb-3">
                {isVi ? 'QUY TRÌNH CỦA CHÚNG TÔI' : 'OUR PROCESS'}
              </h3>
              <p className="text-xs sm:text-sm text-[#2C2A29] leading-relaxed font-normal">
                {isVi
                  ? 'Mỗi sản phẩm của B+Open đều được khơi nguồn cảm hứng từ thiên nhiên, mài giũa đến độ hoàn mỹ qua nét bút của các nhà thiết kế đoạt giải thưởng, và được kiểm nghiệm nghiêm ngặt cùng ban lãnh đạo trụ sở tại Virginia nhằm đảm bảo rằng bạn sẽ cảm thấy êm ái tuyệt đối khi ngồi trên ghế B+Open cũng như tràn đầy niềm tự hào khi ngắm nhìn nó qua ô cửa sổ phòng bếp.'
                  : 'Every B+Open item is inspired by nature, honed to perfection by the pens of award-winning designers, and tested with our Virginia-based leadership team to ensure that you can feel as comfortable sitting in a B+Open chair as you can feel a sense of pride while admiring it through your kitchen window.'}
              </p>
            </div>
          </div>

          {/* Three Narrative Paragraphs below the photo */}
          <div className="max-w-3xl mx-auto mt-12 sm:mt-16 space-y-6 text-center text-sm sm:text-base leading-relaxed text-[#2C2A29]">
            <p>
              {isVi
                ? 'Đội ngũ của chúng tôi luôn cống hiến hết mình để tìm kiếm những thiết kế truyền cảm hứng phù hợp với nhu cầu của người tiêu dùng hiện đại. Không ngừng đánh giá xu hướng, thấu hiểu hành vi khách hàng và suy ngẫm cách chúng tôi có thể gia tăng giá trị cho các vật liệu tự nhiên được lồng ghép bền vững vào từng thiết kế.'
                : "Our team dedicates themselves to finding inspired designs that suit the needs of today's consumer. Always evaluating trends, understanding consumer behavior, and reflecting upon how we can add value to the natural materials that we can sustainably incorporate into our designs."}
            </p>
            <p>
              {isVi
                ? 'Khi B+Open đã xác định được nguồn cảm hứng cho bộ sưu tập tiếp theo, chúng tôi hợp tác cùng các nhà thiết kế hàng đầu Châu Âu và Bắc Mỹ từng đoạt giải thưởng chuyên sâu về nội thất gỗ và ngoài trời, nhằm mài giũa sản phẩm thành những thiết kế vừa mới lạ đầy bất ngờ, vừa gần gũi thân thương giúp làm bừng sáng khoảng sân hiên của bạn.'
                : 'Once B+Open has determined the inspiration of our next collection, we engage with the top award-winning European and North American designers who specialize in outdoor and wood furniture to further hone our furniture into the excitingly new, yet pleasingly familiar designs that make your patio shine.'}
            </p>
            <p>
              {isVi
                ? 'Từ nét bút phác thảo đến thớ gỗ đời thực: Đội ngũ nghệ nhân bậc thầy của chúng tôi, hoạt động bền vững gần nguồn nguyên liệu tại Bolivia, hiện thực hóa các thiết kế thông qua những đợt thử nghiệm và tinh chỉnh khắt khe để bảo đảm độ ổn định kết cấu cùng tính thẩm mỹ hoàn hảo nhất.'
                : 'From pen to wood: Our team of expert craftsmen, sustainably located near the source of our materials in Bolivia, bring these designs to life with rigorous rounds of testing and revision to ensure the structural stability and design aesthetics are just right.'}
            </p>
          </div>

        </div>
      </section>

      {/* 5. DARK CONTRAST SECTION: AWARD-WINNING CREATIVE MINDS (Matching Screenshot 2) */}
      <section className="bg-[#141414] text-white py-16 sm:py-24 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            
            {/* Left Column: Text */}
            <div className="space-y-4 text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CDBAA8] block">
                {isVi ? 'Các Nhà Thiết Kế Của Chúng Tôi' : 'Our Designers'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
                {isVi ? 'NHỮNG BỘ ÓC SÁNG TẠO ĐOẠT GIẢI THƯỞNG' : 'AWARD-WINNING CREATIVE MINDS'}
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal pt-2">
                {isVi
                  ? 'B+Open hợp tác độc quyền với các nhà thiết kế nội thất đoạt giải thưởng danh giá, những chuyên gia về nội thất gỗ và không gian ngoài trời với phong cách thẩm mỹ đa dạng, tinh tế.'
                  : 'B+Open exclusively partners with award-winning furniture designers who specialize in outdoor and wood furniture with a wide array of aesthetic inclinations.'}
              </p>
            </div>

            {/* Right Column: Photo of Designer Sketching Blueprints & Miniature Models */}
            <div className="relative overflow-hidden shadow-2xl border border-white/10 rounded-xs">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85"
                alt="Furniture designer drafting sketches and blueprints on desk with miniature prototype chair models"
                className="w-full h-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />
            </div>

          </div>
        </div>
      </section>

      {/* 6. CRAFTSMANSHIP & TIME-TESTED JOINERY (Matching Screenshot 3) */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12 text-center">
          
          {/* Part A: Our Craftsmanship */}
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
              {isVi ? 'TAY NGHỀ CHẾ TÁC CỦA CHÚNG TÔI' : 'OUR CRAFTSMANSHIP'}
            </h2>
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal max-w-2xl mx-auto">
              <p>
                {isVi
                  ? 'Nội thất gỗ của B+Open được tạo nên từ phần lõi tinh túy nhất của những thân cây thu hoạch. Phần gỗ lõi (heartwood) là phần có độ ổn định kích thước cao nhất và chiếm tỷ trọng lớn hơn đáng kể ở những cây Ipe cổ thụ hàng thế kỷ phát triển chậm. Gỗ lõi đóng vai trò sống còn trong nội thất ngoài trời để duy trì độ bền lâu dài và sự vững chãi của các mối ghép mộng mẹp qua những khắc nghiệt của chu kỳ đóng băng - tan băng, hay những đợt mưa nắng kéo dài.'
                  : "B+Open's wood furniture is made from the heart of the trees we harvest. The heartwood portion of the tree is the most dimensionally stable and is a significantly greater portion of slow-growing, century old trees. Heartwood is critical in outdoor furniture to maintain the long-term strength and integrity of the mortise and tenon joinery throughout the seasonal extremities of freeze and thaw, and extended wet and dry periods."}
              </p>
              <p>
                {isVi
                  ? 'Gỗ của chúng tôi được sấy lò cẩn trọng trong thời gian từ 4 đến 8 tuần để giảm độ ẩm xuống còn 12%, mức độ lý tưởng cho phép các mối ghép mộng gỗ của nội thất ngày càng khít chặt và ổn định hơn khi tiếp xúc với độ ẩm không khí cao hơn trong quá trình sử dụng. Quá trình sấy chậm và dưỡng gỗ giải tỏa các ứng suất tự nhiên trong thớ gỗ, đảm bảo độ bền bỉ hàng chục năm ngoài trời trong mọi điều kiện khí hậu.'
                  : "Our timber is carefully kiln dried for periods ranging from four to eight weeks to reduce the moisture content to 12%, which is perfectly suited to allow our furniture's wood joinery to only grow more stable when exposed to higher levels of humidity in the air when in use. The slow drying and conditioning process relaxes the natural tensions in the wood to assure years of outdoor use in a wide range of climates."}
              </p>
              <p>
                {isVi
                  ? 'Nội thất gỗ của B+Open được thiết kế với các cấu kiện có kích thước lớn và dày dặn nhằm tăng cường độ chịu lực và tính ổn định. Mỗi món đồ nội thất đều được thử nghiệm nghiêm ngặt trong phòng thí nghiệm theo các tiêu chuẩn khắt khe dành cho công trình thương mại - những tiêu chuẩn vượt xa yêu cầu dân dụng thông thường.'
                  : "B+Open's wood furniture is designed with heavy dimensioned components for greater strength and stability. Each piece of furniture has been laboratory-tested to the demanding specifications of commercial applications. Commercial specifications far exceed the standards for common residential use."}
              </p>
            </div>
          </div>

          {/* Part B: Time-Tested Joinery Techniques */}
          <div className="space-y-6 pt-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
              {isVi ? 'KỸ THUẬT NỐI MỘNG ĐƯỢC THỬ THÁCH QUA THỜI GIAN' : 'TIME-TESTED JOINERY TECHNIQUES'}
            </h2>
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal max-w-2xl mx-auto">
              <p>
                {isVi
                  ? 'Nội thất gỗ của chúng tôi được chế tác bằng kỹ thuật nối mộng lồng truyền thống (interlocking mortise and tenon) và mộng chốt đinh gỗ (dowelled joinery) tạo nên những liên kết vững như bàn thạch. Được gia công chính xác với dung sai cực kỳ ngặt nghèo bằng công nghệ CNC tiên tiến, các chi tiết rời được gắn kết vĩnh cửu bằng các khớp mộng khít khao chống ẩm. Cấp độ chế tác này triệt tiêu hoàn toàn hiện tượng rung lắc lỏng lẻo, giúp đồ nội thất luôn an toàn và vững vàng qua trọn một đời người.'
                  : 'Our wood furniture is crafted using traditional interlocking mortise and tenon, and dowelled joinery that form rock solid connections. Engineered to extremely tight tolerances through CNC technology, the individual furniture components are permanently attached with snug, moisture-sealed joints. This level of craftsmanship prevents problems such as shaking during use, making the furniture safe and stable during a lifetime of use.'}
              </p>
              <p>
                {isVi
                  ? "Bề mặt hoàn thiện thủ công 'mịn như gương kính' của B+Open có được là nhờ đặc tính siêu đặc chắc của gỗ Ipe kết hợp cùng kỹ thuật chà nhám ngược thớ (cross-grain sanding) độc bản của chúng tôi. Chà nhám ngược thớ ngăn chặn sự bong xơ của các sợi vi mô bề mặt, giữ cho lớp hoàn thiện luôn mịn màng êm ái khi gỗ chịu tác động của thời tiết ngoài trời."
                  : "The 'smooth-as-glass' hand finish of B+Open furniture is possible due to the dense nature of Ipe wood and our unique cross-grain sanding technique. Sanding cross-grain prevents the lifting of surface micro-fibers and preserves a smooth feel as the wood weathers outdoors."}
              </p>
            </div>
          </div>

          {/* Part C: Call To Action (Ready to see, feel, and touch...) */}
          <div className="pt-10 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-[#1C1A17]">
              {isVi 
                ? 'Sẵn sàng để tự mình chiêm ngưỡng, cảm nhận và chạm vào B+Open?'
                : 'Ready to see, feel, and touch B+Open for yourself?'}
            </h3>
            <div>
              <button
                onClick={() => onNavigate('showrooms')}
                className="inline-block px-10 py-3.5 bg-[#D6C5B3] hover:bg-[#C5B29E] text-[#1C1A17] text-xs font-bold uppercase tracking-[0.2em] shadow-xs hover:shadow-md transition-all cursor-pointer rounded-xs"
              >
                {isVi ? 'TÌM ĐẠI LÝ PHÂN PHỐI' : 'FIND A RETAILER'}
              </button>
            </div>
            <p className="text-xs text-[#5C5955] tracking-wide">
              {isVi ? 'mua sắm tại cửa hàng hoặc đặt lịch hẹn trực tuyến' : 'shop in store or by virtual appointment'}
            </p>
          </div>

        </div>
      </section>

      {/* 7. BOTTOM EXPLORATION CARDS CAROUSEL (Matching Screenshot 3) */}
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
              onClick={() => onNavigate('sustainability')}
              className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-black/70 hover:text-black shadow-md transition-all cursor-pointer"
              aria-label="Previous story section"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('materials')}
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
