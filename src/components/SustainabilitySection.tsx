import React from 'react';
import { TreePine } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SustainabilitySection: React.FC = () => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  return (
    <section id="sustainability" className="py-20 sm:py-28 bg-[#1C140F] text-white overflow-hidden relative">
      
      {/* Background imagery with dark timber warmth */}
      <div className="absolute inset-0 opacity-20 mix-blend-luminosity pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2000&q=80"
          alt="Bolivian Dry Tropical Forest Canopy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-[#EADBCE] uppercase tracking-widest font-medium mb-3 border border-white/20">
            <TreePine className="w-3.5 h-3.5 text-[#9B522E]" />
            <span>{isVi ? 'Chứng Nhận FSC® C009849 Quốc Tế' : 'FSC® Certificate C009849'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
            {isVi ? 'Bảo Tồn Rừng Nguyên Sinh Bolivia.' : 'Stewardship of the Bolivian Forest.'} <br />
            <span className="italic font-normal text-[#EADBCE]">
              {isVi ? 'Chu Kỳ Luân Canh 30 Năm Bền Vững.' : 'Rooted in 30-Year Rotations.'}
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#D6C7BA] leading-relaxed font-light">
            {isVi
              ? 'Năm 1995, B+Open trở thành một trong những nhà chế tác ngoại thất đầu tiên trên thế giới đạt chứng nhận của Hội Đồng Quản Lý Rừng (FSC®). Chúng tôi không chỉ khai thác gỗ, chúng tôi gìn giữ di sản bảo tồn thiên nhiên xuyên thế hệ trên diện tích 2 triệu mẫu rừng nhiệt đới khô tại miền Đông Bolivia.'
              : 'In 1995, B+Open became one of the first outdoor furniture makers in the world to earn Forest Stewardship Council (FSC®) certification. We don’t just harvest timber; we cultivate a multi-generational legacy of conservation across 2 million acres of dry-tropical forest in Eastern Bolivia.'}
          </p>
        </div>

        {/* 3 Core Tenets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1 */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#9B522E]/30 flex items-center justify-center text-[#EADBCE] border border-[#9B522E]/50">
              <span className="font-serif text-lg font-bold">01</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-white">
              {isVi ? 'Khai Thác Chọn Lọc Cây Trăm Tuổi' : 'Century-Old Selective Harvesting'}
            </h3>
            <p className="text-xs text-[#D6C7BA] leading-relaxed font-light">
              {isVi
                ? 'Gỗ Ipe sinh trưởng rất chậm, cần gần một thế kỷ để đạt độ đanh chắc tối ưu. Chúng tôi tuyệt đối không đốn hạ trắng hàng loạt. Các chuyên gia lâm nghiệp khảo sát từng cây 100 năm tuổi, giữ nguyên cây non và cây phát tán hạt giống để thảm rừng liên tục sinh sôi.'
                : 'Ipe trees grow slowly, requiring nearly a century to attain structural maturity. We never clear-cut. Master foresters hand-select only mature 100-year-old trees, leaving younger, seed-bearing trees intact to replenish the canopy.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#9B522E]/30 flex items-center justify-center text-[#EADBCE] border border-[#9B522E]/50">
              <span className="font-serif text-lg font-bold">02</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-white">
              {isVi ? 'Chu Kỳ Nghỉ Dưỡng & Tái Sinh 30 Năm' : '30-Year Rest & Renewal Cycle'}
            </h3>
            <p className="text-xs text-[#D6C7BA] leading-relaxed font-light">
              {isVi
                ? 'Khu bảo tồn được chia thành 30 phân khu độc lập. Sau khi một phân khu được chọn lọc khai thác, phân khu đó được phong tỏa và bảo vệ tuyệt đối khỏi sự tác động của con người suốt 30 năm liên tục, để hệ sinh thái và muông thú tự nhiên hồi phục hoàn toàn.'
                : 'Our concession land is divided into thirty distinct sectors. Once a sector is selectively harvested, it is completely protected from human entry for 30 consecutive years, allowing wildlife corridors and soil flora to naturally regenerate.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#9B522E]/30 flex items-center justify-center text-[#EADBCE] border border-[#9B522E]/50">
              <span className="font-serif text-lg font-bold">03</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-white">
              {isVi ? 'Chuỗi Hành Trình Minh Bạch Tuyệt Đối' : 'Complete Chain of Custody'}
            </h3>
            <p className="text-xs text-[#D6C7BA] leading-relaxed font-light">
              {isVi
                ? 'Từng thân gỗ đều được gắn mã định danh ngay tại rừng, được thợ mộc địa phương tại Bolivia cưa xẻ không lãng phí, và vận chuyển thẳng đến trung tâm phân phối Virginia với kiểm toán độc lập nghiêm ngặt của tổ chức FSC.'
                : 'Every timber beam is barcoded in the forest, milled by local artisans in Bolivia with zero waste, and directly shipped to our Virginia distribution facility with audited tracking guaranteed by the Forest Stewardship Council.'}
            </p>
          </div>

        </div>

        {/* Bolivian Artisan Community Feature */}
        <div className="bg-[#2A1D15] border border-white/15 p-6 sm:p-10 rounded-xs flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#9B522E] font-semibold">
              {isVi ? 'Cộng Đồng & Phát Triển Bền Vững Đạo Đức' : 'Community & Ethical Prosperity'}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
              {isVi ? 'Tạo Dựng Sinh Kế Cho Nghệ Nhân Bản Địa Bolivia' : 'Empowering Bolivian Woodcraft Guilds'}
            </h3>
            <p className="text-xs sm:text-sm text-[#D6C7BA] leading-relaxed font-light">
              {isVi
                ? 'Bằng việc đặt xưởng chế tác thủ công mộng gỗ ngay tại Bolivia kề bên cánh rừng, chúng tôi đầu tư trực tiếp vào đào tạo nghề cho các nghệ nhân bản địa, đảm bảo môi trường làm việc an toàn, mức thu nhập công bằng và trường học cho con em nông thôn.'
                : 'By locating our processing and master joinery workshops in Bolivia adjacent to the forest, we invest directly in indigenous craftsman careers, safe working conditions, fair living wages, and educational infrastructure for rural families.'}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-4">
            <div className="p-4 bg-black/40 border border-white/10 text-center rounded-xs min-w-[150px]">
              <div className="font-serif text-3xl text-[#EADBCE]">2M+</div>
              <div className="text-[11px] text-[#A69587] uppercase tracking-wider mt-1">
                {isVi ? 'Mẫu Anh Được Bảo Tồn' : 'Acres Protected'}
              </div>
            </div>
            <div className="p-4 bg-black/40 border border-white/10 text-center rounded-xs min-w-[150px]">
              <div className="font-serif text-3xl text-[#EADBCE]">30 yrs</div>
              <div className="text-[11px] text-[#A69587] uppercase tracking-wider mt-1">
                {isVi ? 'Chu Kỳ Khai Thác' : 'Harvest Interval'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
