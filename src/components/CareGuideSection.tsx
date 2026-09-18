import React, { useState } from 'react';
import { Sparkles, Droplets, Shield, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CareGuideSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'routine' | 'restoration' | 'fabrics'>('routine');
  const { language } = useLanguage();
  const isVi = language === 'vi';

  return (
    <section id="care" className="py-20 sm:py-28 bg-[#F8F6F2] border-b border-[#DED9CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#9B522E]">
            {isVi ? 'Độ Bền Di Sản Truyền Đời' : 'Heirloom Longevity'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1A17] tracking-tight mt-1">
            {isVi ? 'Cẩm Nang Chăm Sóc & Bảo Dưỡng' : 'Care & Maintenance Guide'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6B5E52] leading-relaxed">
            {isVi
              ? 'Nhờ tỷ trọng cực cao và lượng tinh dầu tự nhiên dồi dào của gỗ Ipe Bolivia, nội thất B+Open đòi hỏi rất ít công sức bảo dưỡng để duy trì độ hoàn hảo qua nhiều thập kỷ.'
              : 'Due to the extraordinary density and natural oils of Bolivian Ipe, B+Open furniture requires surprisingly little effort to remain in pristine condition for decades.'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#F3EEE6] border border-[#DED9CD] rounded-sm">
            <button
              onClick={() => setActiveTab('routine')}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'routine'
                  ? 'bg-[#9B522E] text-white shadow-xs'
                  : 'text-[#6B5E52] hover:text-[#1C1A17]'
              }`}
            >
              {isVi ? '1. Chăm Sóc Định Kỳ' : '1. Routine Seasonal Care'}
            </button>
            <button
              onClick={() => setActiveTab('restoration')}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'restoration'
                  ? 'bg-[#9B522E] text-white shadow-xs'
                  : 'text-[#6B5E52] hover:text-[#1C1A17]'
              }`}
            >
              {isVi ? '2. Phục Hồi Nâu Hổ Phách' : '2. Restoring to Chocolate Amber'}
            </button>
            <button
              onClick={() => setActiveTab('fabrics')}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'fabrics'
                  ? 'bg-[#9B522E] text-white shadow-xs'
                  : 'text-[#6B5E52] hover:text-[#1C1A17]'
              }`}
            >
              {isVi ? '3. Vải Sunbrella® & Sợi Viro®' : '3. Sunbrella® & Viro® Fiber'}
            </button>
          </div>
        </div>

        {/* Tab 1: Routine Seasonal Care */}
        {activeTab === 'routine' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-300">
            <div className="bg-white border border-[#DED9CD] p-6 rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#9B522E] border border-[#DED9CD]">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1C1A17]">
                {isVi ? 'Vệ Sinh Bằng Nước & Xà Phòng' : 'Soap & Water Rinse'}
              </h3>
              <p className="text-xs text-[#6B5E52] leading-relaxed">
                {isVi
                  ? 'Khi có bụi bẩn hay phấn hoa bám trên bề mặt, bạn chỉ cần xịt vòi nước làm ướt hoặc dùng xà phòng rửa chén sinh học dịu nhẹ với bàn chải lông mềm. Sau đó rửa sạch lại bằng nước.'
                  : 'For occasional pollen, dirt, or dust buildup, simply hose down your furniture or wash with mild biodegradable dish soap and a soft-bristle nylon brush. Rinse thoroughly with clean water.'}
              </p>
            </div>

            <div className="bg-white border border-[#DED9CD] p-6 rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#9B522E] border border-[#DED9CD]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1C1A17]">
                {isVi ? 'Dầu Bảo Vệ B+Open Wood Shield' : 'B+Open Wood Shield'}
              </h3>
              <p className="text-xs text-[#6B5E52] leading-relaxed">
                {isVi
                  ? 'Thoa một lớp mỏng B+Open Wood Shield lên mặt bàn ăn và tay vịn 1-2 lần mỗi năm. Lớp phủ vô hình tạo màng bảo vệ thoáng khí chống vết ố rượu vang, cà phê hay nước xốt tiệc nướng mà vẫn giữ nguyên thớ gỗ chân thật.'
                  : 'Apply B+Open Wood Shield onto clean dining tabletops and armrests once or twice a year. It forms a transparent breathable barrier against red wine, coffee, and barbecue sauce spills without altering the wood’s tactile grain.'}
              </p>
            </div>

            <div className="bg-white border border-[#DED9CD] p-6 rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#9B522E] border border-[#DED9CD]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1C1A17]">
                {isVi ? 'Tận Hưởng Màu Bạc Quý Phái' : 'Embracing Silver Patina'}
              </h3>
              <p className="text-xs text-[#6B5E52] leading-relaxed">
                {isVi
                  ? 'Nếu bạn yêu thích vẻ đẹp phong hóa cổ điển kiểu biệt thự ven biển, bạn không cần phải làm gì cả! Ánh nắng tự nhiên sẽ chuyển hóa bề mặt ngoài của thớ gỗ thành màu xám bạc ánh kim sau 9-12 tháng mà không ảnh hưởng kết cấu lõi.'
                  : 'If you adore the weathered coastal look, do nothing! Natural sunlight will gently convert the outer wood fibers into a gorgeous platinum-silver tone over 9 to 12 months. The wood will never weaken or rot.'}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Penofin Restoration */}
        {activeTab === 'restoration' && (
          <div className="bg-white border border-[#DED9CD] p-6 sm:p-10 rounded-xs shadow-xs animate-in fade-in duration-300">
            <div className="max-w-3xl mb-8">
              <span className="text-[10px] uppercase tracking-wider text-[#9B522E] font-bold">
                {isVi ? 'Hệ Thống Phục Hồi Chuyên Nghiệp Penofin® Pro-Tech' : 'The Penofin® Pro-Tech System'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] mt-1">
                {isVi ? 'Cách Phục Hồi Gỗ Ipe Từ Màu Bạc Về Nâu Chocolate' : 'How to Restore Ipe From Silver to Rich Chocolate'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5E52] mt-2">
                {isVi
                  ? 'Dù trải qua nhiều năm dưới nắng gió hay băng tuyết, gỗ Ipe Bolivia có thể trở lại sắc nâu rực rỡ ban đầu chỉ trong một buổi chiều với bộ sản phẩm 3 bước Penofin Aftercare Kit của B+Open.'
                  : "Even after years of exposure to snow, desert sun, or ocean spray, Bolivian Ipe can be returned to its day-one chocolate brilliance in an afternoon using B+Open's 3-step Penofin Aftercare Kit."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs space-y-2">
                <div className="text-xs font-bold text-[#9B522E] uppercase">
                  {isVi ? 'Bước 1: Làm Sạch' : 'Step 1: Clean'}
                </div>
                <h4 className="font-medium text-[#1C1A17] text-sm">Penofin Pro-Tech Wood Cleaner</h4>
                <p className="text-xs text-[#6B5E52]">
                  {isVi 
                    ? 'Hòa tan bụi bẩn bám sâu và lớp phong hóa xám tự nhiên mà không dùng hóa chất tẩy Clo độc hại.' 
                    : 'Dissolves ground-in dirt, pollen, and natural gray oxidation without harsh bleach. Scrub gently and rinse.'}
                </p>
              </div>

              <div className="p-4 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs space-y-2">
                <div className="text-xs font-bold text-[#9B522E] uppercase">
                  {isVi ? 'Bước 2: Phục Hồi Sắc Gỗ' : 'Step 2: Brighten'}
                </div>
                <h4 className="font-medium text-[#1C1A17] text-sm">Penofin Pro-Tech Brightener</h4>
                <p className="text-xs text-[#6B5E52]">
                  {isVi 
                    ? 'Cân bằng độ pH cho gỗ, đánh thức sắc vàng mật ong ấm áp và mở các vi lỗ chân lông để gỗ hấp thu dầu.' 
                    : 'Balances the pH of the timber, revives the golden honey undertones, and opens the dense pores for oil absorption.'}
                </p>
              </div>

              <div className="p-4 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs space-y-2">
                <div className="text-xs font-bold text-[#9B522E] uppercase">
                  {isVi ? 'Bước 3: Lau Dầu Dưỡng' : 'Step 3: Oil Finish'}
                </div>
                <h4 className="font-medium text-[#1C1A17] text-sm">Penofin Verde Oil for Ipe</h4>
                <p className="text-xs text-[#6B5E52]">
                  {isVi 
                    ? 'Tinh dầu dưỡng 100% gốc thực vật kết hợp dầu gỗ cẩm lai Brazil và sắc tố trans-oxide khóa chặt độ ấm nâu hổ phách.' 
                    : 'A 100% plant-oil based finish infused with Brazilian rosewood oil and trans-oxide pigments to lock in deep chocolate radiance.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Fabrics & Woven */}
        {activeTab === 'fabrics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
            <div className="bg-white border border-[#DED9CD] p-6 rounded-xs space-y-3">
              <h3 className="font-serif text-xl font-medium text-[#1C1A17]">
                {isVi ? 'Bảo Dưỡng Vải Ngoại Thất Sunbrella®' : 'Sunbrella® Performance Fabric Care'}
              </h3>
              <p className="text-xs text-[#6B5E52] leading-relaxed">
                {isVi
                  ? 'Vải Sunbrella được nhuộm màu ngay từ khâu nấu sợi acrylic lỏng. Nhờ màu sắc thấm tận lõi sợi, bạn hoàn toàn có thể vệ sinh bằng dung dịch thuốc tẩy pha loãng nếu có vết mốc cứng đầu mà không sợ phai màu.'
                  : 'Sunbrella fabrics are saturated to the core with UV-stabilized pigments. Because color is embedded into the fibers, they can be cleaned with a bleach solution (1 cup bleach + ¼ cup mild soap per gallon of water) to eradicate stubborn mildew without fading.'}
              </p>
              <ul className="text-xs text-[#5C5046] space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4A7C59]" />
                  <span>{isVi ? 'Dùng bàn chải mềm phẩy sạch bụi bẩn ngay khi phát hiện' : 'Brush off loose dirt promptly before it embeds'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4A7C59]" />
                  <span>{isVi ? 'Luôn phơi khô tự nhiên trong bóng râm, không dùng máy sấy nhiệt' : 'Always air dry cushion covers flat; do not machine tumble dry'}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-[#DED9CD] p-6 rounded-xs space-y-3">
              <h3 className="font-serif text-xl font-medium text-[#1C1A17]">
                {isVi ? 'Bảo Trì Sợi Đan All-Weather Viro®' : 'Woven Viro® Fiber Maintenance'}
              </h3>
              <p className="text-xs text-[#6B5E52] leading-relaxed">
                {isVi
                  ? 'Sợi Viro® được tinh chế từ polyethylene mật độ cao hoàn toàn kháng thời tiết và tái chế 100%. Sợi không bao giờ bị giòn nứt dưới mùa đông giá lạnh hay nắng sa mạc 45°C.'
                  : 'Viro® fiber is engineered from high-density polyethylene strands that are completely weatherproof and 100% recyclable. They do not crack, peel, or rot in sub-zero winters or 110°F desert heat.'}
              </p>
              <ul className="text-xs text-[#5C5046] space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4A7C59]" />
                  <span>{isVi ? 'Lau sạch đơn giản bằng mút mềm, nước ấm và một chút xà phòng' : 'Clean simply with a soft sponge, warm water, and dish soap'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4A7C59]" />
                  <span>{isVi ? 'Tránh dùng bột cọ rửa nhám hoặc vòi phun áp lực quá mạnh' : 'Avoid abrasive scouring powders or high-pressure washers'}</span>
                </li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
