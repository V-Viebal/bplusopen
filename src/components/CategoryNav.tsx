import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onSelectCategory }) => {
  const { language, t } = useLanguage();
  const isVi = language === 'vi';

  const categories = [
    {
      id: 'dining',
      name: isVi ? 'Bàn Ghế Ăn Ngoài Trời' : 'Outdoor Dining',
      count: isVi ? '32 Sản Phẩm' : '32 Items',
      desc: isVi 
        ? 'Bàn mở rộng cánh bướm, ghế ăn tay vịn và ghế băng dài cho những bữa tiệc ngoài trời sang trọng.' 
        : 'Extendable butterfly tables, armchairs, and dining benches for grand al fresco banquets.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'deep-seating',
      name: isVi ? 'Sofa & Ghế Bành Thư Giãn' : 'Deep Seating & Sofas',
      count: isVi ? '28 Sản Phẩm' : '28 Items',
      desc: isVi 
        ? 'Ghế bành êm ái đầm chắc, sofa module đa dạng bọc đệm Sunbrella® cao cấp.' 
        : 'Plush low-slung club chairs, modular sectionals, and sofas wrapped in Sunbrella®.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'chaises',
      name: isVi ? 'Ghế Tắm Nắng Bể Bơi' : 'Poolside & Chaises',
      count: isVi ? '16 Sản Phẩm' : '16 Items',
      desc: isVi 
        ? 'Ghế ngả đa nấc bánh xe ẩn linh hoạt, đường cong công thái học nâng đỡ toàn diện cơ thể.' 
        : 'Multi-position ratchet recliners with concealed wheels and ergonomic contouring.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tables',
      name: isVi ? 'Bàn Lửa Sưởi & Bàn Trà' : 'Fire & Occasional',
      count: isVi ? '19 Sản Phẩm' : '19 Items',
      desc: isVi 
        ? 'Bàn sưởi gas propane 60.000 BTU, bàn trà mặt gỗ nan lớn và bàn phụ tiện lợi.' 
        : 'Clean 60,000 BTU propane fire pits, wide timber cocktail tables, and drink consoles.',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'accessories',
      name: isVi ? 'Ghế Băng & Ghế Adirondack' : 'Benches & Adirondacks',
      count: isVi ? '14 Sản Phẩm' : '14 Items',
      desc: isVi 
        ? 'Ghế băng vườn cổ điển kiểu Anh, ghế Adirondack trứ danh và chậu cây kiến trúc.' 
        : 'Heirloom 5-foot English garden benches, iconic Adirondacks, and architectural planters.',
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=800&q=80',
    }
  ];

  return (
    <section id="furniture-categories" className="py-16 bg-[#F3EEE6] border-y border-[#DED9CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#9B522E]">
            {isVi ? 'Phân Loại Không Gian Sống' : 'Furniture Taxonomy'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light mt-1">
            {isVi ? 'Mua Sắm Theo Không Gian' : 'Shop by Living Space'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5E52] mt-2">
            {isVi 
              ? 'Chọn không gian để khám phá các cấu hình thiết kế cho biệt thự ven biển, resort nghỉ dưỡng và tư gia sân vườn.'
              : 'Select a category to explore curated configurations handcrafted for coastal estates, desert villas, and mountain retreats.'}
          </p>
        </div>

        {/* Flagship Category Switcher: DINING vs LOUNGING matching brand taxonomy */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-[#161616] p-1.5 rounded-sm shadow-md border border-black/20 text-xs sm:text-sm">
            <button
              onClick={() => onSelectCategory('dining')}
              className={`px-6 sm:px-8 py-2.5 font-sans tracking-[0.1em] uppercase font-medium transition-all rounded-xs cursor-pointer flex items-center gap-2 ${
                selectedCategory === 'dining'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <span>DINING</span>
              <span className="text-[10.5px] opacity-75 hidden sm:inline">({isVi ? 'Bàn Ghế Ăn' : 'Outdoor Dining'})</span>
            </button>
            <button
              onClick={() => onSelectCategory('lounging')}
              className={`px-6 sm:px-8 py-2.5 font-sans tracking-[0.1em] uppercase font-medium transition-all rounded-xs cursor-pointer flex items-center gap-2 ${
                selectedCategory === 'lounging'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <span>LOUNGING</span>
              <span className="text-[10.5px] opacity-75 hidden sm:inline">({isVi ? 'Sofa & Thư Giãn' : 'Sofas & Lounging'})</span>
            </button>
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-4 sm:px-5 py-2.5 font-sans tracking-normal transition-all rounded-xs cursor-pointer text-xs ${
                selectedCategory === 'all'
                  ? 'bg-white/20 text-white font-medium'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {isVi ? 'Xem tất cả' : 'View All'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-left group relative bg-white border transition-all duration-300 overflow-hidden flex flex-col cursor-pointer ${
                  isActive
                    ? 'border-[#9B522E] ring-2 ring-[#9B522E] shadow-md'
                    : 'border-[#DED9CD] hover:border-[#9B522E] hover:shadow-lg'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE4D9]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="text-xs font-serif font-medium">{cat.name}</div>
                    <div className="text-[10px] text-white/80">{cat.count}</div>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <p className="text-[11px] text-[#6B5E52] leading-relaxed line-clamp-2">
                    {cat.desc}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#9B522E] pt-2 border-t border-[#F0EBE3]">
                    <span>{isActive ? (isVi ? 'Đang Chọn' : 'Active View') : (isVi ? 'Xem Thêm' : 'Browse')}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedCategory !== 'all' && (
          <div className="mt-6 text-center">
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs uppercase tracking-wider text-[#9B522E] hover:text-[#2A1D15] underline font-semibold cursor-pointer"
            >
              {isVi ? 'Đặt lại bộ lọc & xem tất cả danh mục' : 'Reset filter & view all furniture categories'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
