import React, { useState } from 'react';
import { TreePine, Droplets, Flame, Shield, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MaterialsExplorer: React.FC = () => {
  const [patinaMode, setPatinaMode] = useState<'chocolate' | 'silver'>('chocolate');
  const { language, t } = useLanguage();
  const isVi = language === 'vi';

  const woodComparison = [
    { 
      name: isVi ? 'Gỗ Ipe Bolivia (B+Open)' : 'Bolivian Ipe (B+Open)', 
      janka: 3680, 
      hardnessPercent: 100, 
      rotResistance: isVi ? 'Vượt trội (40+ năm)' : 'Exceptional (40+ yrs)', 
      fireRating: isVi ? 'Hạng A (Kháng lửa cao)' : 'Class A (Fire resistant)', 
      maintenance: isVi ? 'Chỉ cần dầu tự nhiên tối thiểu' : 'Minimal natural oils' 
    },
    { 
      name: isVi ? 'Gỗ Teak Miến Điện / Rừng Trồng' : 'Burmese / Plantation Teak', 
      janka: 1070, 
      hardnessPercent: 29, 
      rotResistance: isVi ? 'Trung bình đến Khá' : 'Moderate to High', 
      fireRating: isVi ? 'Hạng B/C' : 'Class B/C', 
      maintenance: isVi ? 'Phải quét dầu thường xuyên' : 'Frequent oiling needed' 
    },
    { 
      name: isVi ? 'Gỗ Sồi Trắng Mỹ (White Oak)' : 'American White Oak', 
      janka: 1360, 
      hardnessPercent: 37, 
      rotResistance: isVi ? 'Trung bình' : 'Moderate', 
      fireRating: isVi ? 'Hạng C' : 'Class C', 
      maintenance: isVi ? 'Cần chất phủ keo hóa học' : 'Requires chemical sealant' 
    },
    { 
      name: isVi ? 'Gỗ Tuyết Tùng Đỏ (Red Cedar)' : 'Western Red Cedar', 
      janka: 350, 
      hardnessPercent: 10, 
      rotResistance: isVi ? 'Dễ móp méo, trầy xước' : 'Prone to denting', 
      fireRating: isVi ? 'Dễ cháy' : 'Combustible', 
      maintenance: isVi ? 'Chi phí bảo trì cao' : 'High upkeep' 
    },
  ];

  return (
    <section id="materials" className="py-20 sm:py-28 bg-[#F8F6F2] border-b border-[#DED9CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-[#9B522E] mb-2">
            <TreePine className="w-3.5 h-3.5 text-[#9B522E]" />
            <span>{isVi ? 'Đỉnh Cao Thực Vật Học' : 'Botanical Excellence'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1A17] tracking-tight">
            {isVi ? 'Khoa Học & Vẻ Đẹp Của Gỗ Ipe Bolivia' : 'The Science & Beauty of Bolivian Ipe'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B5E52] leading-relaxed">
            {isVi
              ? 'Gỗ Ipe (phát âm: "ee-pay") là kiệt tác của tự nhiên. Khai thác độc quyền từ các cánh rừng nhiệt đới khô được chứng nhận tại miền Đông Bolivia, loại gỗ này đặc đến mức chìm trong nước và tự kháng chịu thiên nhiên mà không cần bất kỳ hóa chất bảo quản nào.'
              : 'Ipe (pronounced "ee-pay") is nature’s masterwork. Sourced exclusively from certified dry tropical forests in Eastern Bolivia, it is dense enough to sink in water and so naturally fortified that it requires zero chemical preservatives.'}
          </p>
        </div>

        {/* 4 Super Pillars of Ipe */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-white border border-[#DED9CD] rounded-sm shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#9B522E] mb-4 border border-[#DED9CD]">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1C1A17] mb-1.5">
              {isVi ? 'Chống Cháy Hạng A' : 'Class A Fire Rated'}
            </h3>
            <p className="text-xs text-[#6B5E52] leading-relaxed">
              {isVi
                ? 'Gỗ Ipe có chỉ số lan truyền lửa tương đương bê tông đúc và thép kết cấu, đáp ứng các tiêu chuẩn khắt khe nhất tại các khu biệt thự ven biển và vùng rừng đồi.'
                : 'Ipe possesses the same flame-spread rating as poured concrete and steel, meeting the strictest coastal and mountain wildland urban interface codes.'}
            </p>
          </div>

          <div className="p-6 bg-white border border-[#DED9CD] rounded-sm shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#9B522E] mb-4 border border-[#DED9CD]">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1C1A17] mb-1.5">
              {isVi ? 'Kháng Mục Nát Tuyệt Đối' : 'Impervious to Rot'}
            </h3>
            <p className="text-xs text-[#6B5E52] leading-relaxed">
              {isVi
                ? 'Lượng tannin đậm đặc tự nhiên cùng các vi tinh thể silica ngăn chặn sự xâm nhập của hơi ẩm, mối mọt, bào tử nấm mốc và hóa chất Clo hồ bơi.'
                : 'Natural essential tannins and microscopic silica crystals guard against moisture penetration, termites, fungal spores, and poolside chlorine splash.'}
            </p>
          </div>

          <div className="p-6 bg-white border border-[#DED9CD] rounded-sm shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#9B522E] mb-4 border border-[#DED9CD]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1C1A17] mb-1.5">
              {isVi ? 'Độ Cứng Janka 3.680 lbf' : '3,680 Janka Hardness'}
            </h3>
            <p className="text-xs text-[#6B5E52] leading-relaxed">
              {isVi
                ? 'Gấp hơn ba lần tỷ trọng gỗ Teak truyền thống. Chống trầy xước từ móng vuốt thú cưng, va chạm đồ đạc và chịu được bão giật mà không lung lay.'
                : 'More than three times the density of teak. Resists gouges, chair-scuffs, dog claws, and high winds with immovable estate authority.'}
            </p>
          </div>

          <div className="p-6 bg-white border border-[#DED9CD] rounded-sm shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#9B522E] mb-4 border border-[#DED9CD]">
              <TreePine className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1C1A17] mb-1.5">
              {isVi ? 'Cây Trưởng Thành 100 Năm' : '100-Year Maturity'}
            </h3>
            <p className="text-xs text-[#6B5E52] leading-relaxed">
              {isVi
                ? 'Chúng tôi chỉ chọn lọc khai thác những cây Ipe trăm năm tuổi đã đạt đỉnh sinh trưởng, tạo điều kiện cho thảm thực vật xung quanh tái sinh liên tục suốt chu kỳ 30 năm.'
                : 'We selectively harvest only mature century-old trees, allowing the surrounding canopy and younger saplings 30 years of uninterrupted regeneration.'}
            </p>
          </div>
        </div>

        {/* Interactive Patina Journey Simulator */}
        <div className="bg-[#201712] text-white rounded-sm overflow-hidden p-6 sm:p-12 mb-16 shadow-xl border border-[#3E2C22]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-[#EADBCE] uppercase tracking-widest font-medium">
                <Sun className="w-3.5 h-3.5 text-[#9B522E]" />
                <span>{isVi ? 'Trải Nghiệm Phong Hóa Tự Nhiên' : 'Interactive Weathering Experience'}</span>
              </div>
              
              <h3 className="font-serif text-2xl sm:text-4xl font-light text-white leading-tight">
                {isVi ? 'Hai Sắc Thái Riêng Biệt.' : 'Two Distinct Aesthetics.'} <br />
                <span className="italic font-normal text-[#EADBCE]">
                  {isVi ? 'Một Cốt Gỗ Bất Biến.' : 'One Indestructible Core.'}
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-[#D6C7BA] leading-relaxed font-light">
                {isVi
                  ? 'Nội thất ngoại thất B+Open có thể thưởng thức ở hai vẻ đẹp hoàn hảo. Độ bền kết cấu không bao giờ suy giảm — việc giữ màu nâu ấm hay ngả bạc hoàn toàn do sở thích thẩm mỹ của gia chủ.'
                  : 'B+Open furniture can be celebrated in two distinct stages. The structural strength never diminishes — the choice of surface finish is purely yours.'}
              </p>

              {/* Toggle Controls */}
              <div className="inline-flex p-1.5 bg-black/40 rounded-sm border border-white/20">
                <button
                  id="patina-mode-chocolate-btn"
                  onClick={() => setPatinaMode('chocolate')}
                  className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    patinaMode === 'chocolate'
                      ? 'bg-[#9B522E] text-white shadow-sm'
                      : 'text-[#C7B5A7] hover:text-white'
                  }`}
                >
                  {isVi ? 'Nâu Chocolate Ấm Áp' : 'Deep Chocolate Luster'}
                </button>
                <button
                  id="patina-mode-silver-btn"
                  onClick={() => setPatinaMode('silver')}
                  className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    patinaMode === 'silver'
                      ? 'bg-[#8A928E] text-white shadow-sm'
                      : 'text-[#C7B5A7] hover:text-white'
                  }`}
                >
                  {isVi ? 'Bạc Ánh Kim Quý Phái' : 'Silver Gray Patina'}
                </button>
              </div>

              {/* Dynamic Description based on Mode */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-xs text-xs space-y-2">
                {patinaMode === 'chocolate' ? (
                  <>
                    <div className="font-semibold text-[#EADBCE] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#9B522E]"></span>
                      {isVi ? 'Duy Trì Sắc Nâu Hổ Phách Sang Trọng' : 'Preserving The Rich Amber Tone'}
                    </div>
                    <p className="text-[#C7B5A7] leading-relaxed">
                      {isVi
                        ? 'Duy trì dễ dàng bằng cách thoa tinh dầu bảo vệ B+Open Wood Shield 1-2 lần mỗi mùa. Để làm mới sâu sau nhiều năm, lớp dầu dưỡng Penofin Verde sẽ trả lại độ ấm nâu sô-cô-la nguyên bản ngay tức thì.'
                        : 'Maintained by applying B+Open Wood Shield once or twice per season. For deep revitalization after years, the Penofin Verde Oil treatment restores the deep chocolate-brown warmth instantly.'}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="font-semibold text-[#EADBCE] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#8A928E]"></span>
                      {isVi ? 'Tự Do Chuyển Bạc Kiểu Biệt Thự Ven Biển' : 'Embracing Coastal Driftwood Silver'}
                    </div>
                    <p className="text-[#C7B5A7] leading-relaxed">
                      {isVi
                        ? 'Khi để tự nhiên dưới nắng gió và mưa biển, gỗ Ipe nhẹ nhàng oxy hóa sau 9 đến 12 tháng thành màu xám bạc ánh kim mê hoặc mà không hề bị nứt dăm hay cong queo. Bạn có thể dễ dàng lau dầu để trả về màu nâu ấm bất cứ lúc nào.'
                        : 'Left untreated to the sun and coastal rains, Ipe gently oxidizes over 9 to 12 months into a breathtaking silver-gray patina without splintering or checking. Can be easily restored to chocolate whenever desired.'}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Visualizer Frame */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xs border-2 border-white/20 shadow-2xl">
                <img
                  src={
                    patinaMode === 'chocolate'
                      ? 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1200&q=85'
                      : 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=85'
                  }
                  alt={patinaMode === 'chocolate' ? 'Ipe Rich Chocolate Amber Finish' : 'Ipe Natural Silver Patina Finish'}
                  className="w-full h-full object-cover transition-all duration-700 ease-out"
                />
                
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 text-xs text-white uppercase tracking-widest font-semibold border border-white/20">
                  {patinaMode === 'chocolate' 
                    ? (isVi ? 'Gỗ Ipe Lau Dầu Nâu Hổ Phách' : 'Freshly Oiled Chocolate Amber') 
                    : (isVi ? 'Gỗ Ipe Phong Hóa Màu Bạc Tự Nhiên' : 'Naturally Weathered Silver Patina')}
                </div>

                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 text-[11px] text-[#EADBCE] border border-white/10">
                  {isVi ? '100% Gỗ Ipe Chứng Nhận FSC® Bolivia' : '100% FSC® Bolivian Ipe Timber'}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Janka Hardness Scale Comparison */}
        <div className="bg-white border border-[#DED9CD] p-6 sm:p-10 shadow-xs">
          <div className="mb-6">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9B522E]">
              {isVi ? 'Tiêu Chuẩn Kiểm Định Kết Cấu' : 'Structural Benchmarks'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1C1A17] mt-1">
              {isVi ? 'So Sánh Thang Độ Cứng Janka' : 'Janka Hardness Index Comparison'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5E52] mt-1">
              {isVi
                ? 'Thử nghiệm độ cứng Janka đo lực cần thiết để ấn một viên bi thép 11,28mm ngập nửa thân vào thớ gỗ. Giá trị càng cao biểu thị khả năng chống mài mòn, chống cong vênh và kháng thời tiết càng vượt trội.'
                : 'The Janka hardness test measures the force required to embed an 11.28mm steel ball halfway into a piece of wood. Higher values mean superior resistance to wear, warping, and weathering.'}
            </p>
          </div>

          <div className="space-y-5">
            {woodComparison.map((wood) => (
              <div key={wood.name} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#1C1A17]">{wood.name}</span>
                    {wood.name.includes('B+Open') && (
                      <span className="text-[10px] bg-[#F8F6F2] text-[#9B522E] px-2 py-0.5 font-bold uppercase tracking-wider border border-[#DED9CD]">
                        {isVi ? 'Tiêu Chuẩn Vàng Ngành Nội Thất' : 'Industry Gold Standard'}
                      </span>
                    )}
                  </div>
                  <div className="text-[#6B5E52] text-[11px] mt-0.5 sm:mt-0 flex items-center gap-3">
                    <span>{wood.rotResistance}</span>
                    <span className="font-bold text-[#1C1A17] text-xs">{wood.janka.toLocaleString()} lbf</span>
                  </div>
                </div>

                <div className="w-full bg-[#EAE4D9] h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      wood.name.includes('B+Open')
                        ? 'bg-gradient-to-r from-[#9B522E] to-[#9B522E]'
                        : 'bg-[#9C8E82]'
                    }`}
                    style={{ width: `${wood.hardnessPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#F0EBE3] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#6B5E52]">
            <div>
              <span className="font-semibold text-[#1C1A17] block mb-1">
                {isVi ? 'Đệm Cao Cấp Sunbrella®' : 'Sunbrella® Cushions'}
              </span>
              {isVi 
                ? 'Sợi acrylic nhuộm dung dịch 100% kháng clo hồ bơi, chống phai màu bởi tia cực tím và chống nấm mốc.' 
                : '100% solution-dyed acrylics impervious to chlorine, UV fading, and mildew growth.'}
            </div>
            <div>
              <span className="font-semibold text-[#1C1A17] block mb-1">
                {isVi ? 'Sợi Đan Viro® All-Weather' : 'Woven Viro® Fiber'}
              </span>
              {isVi 
                ? 'Sợi polyethylene mật độ cao đan tay thủ công, dẻo dai và chịu mưa nắng nhiệt đới bền bỉ.' 
                : 'All-weather high-density polyethylene strands hand-plaited for flexible strength.'}
            </div>
            <div>
              <span className="font-semibold text-[#1C1A17] block mb-1">
                {isVi ? 'Mộng Gỗ & Phụ Kiện Hàng Hải' : 'Marine-Grade Joinery'}
              </span>
              {isVi 
                ? 'Mộng ghép mộng gỗ chuẩn xác kết hợp phụ kiện inox 304 tiêu chuẩn hàng hải chống gỉ tuyệt đối.' 
                : 'Traditional mortise-and-tenon craftsmanship with concealed 304 stainless steel hardware.'}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
