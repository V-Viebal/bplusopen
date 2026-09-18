import React, { useState } from 'react';
import { TreePine, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageId } from '../types';
import { useCatalogData } from '../context/CatalogDataContext';

interface FooterProps {
  onOpenCatalogModal: () => void;
  onOpenTradeModal: () => void;
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string; tab?: 'retailers' | 'design-showrooms' | 'contract-hospitality' }) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCatalogModal,
  onOpenTradeModal,
  onNavigate,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const { collections } = useCatalogData();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail('');
      }, 3500);
    }
  };

  const categoryLabels: Record<string, { en: string; vi: string }> = {
    'dining': { en: 'Outdoor Dining', vi: 'Bàn Ghế Ăn Ngoài Trời' },
    'deep-seating': { en: 'Deep Seating & Sofas', vi: 'Sofa & Ghế Bành Thư Giãn' },
    'chaises': { en: 'Poolside & Chaises', vi: 'Ghế Tắm Nắng Bể Bơi' },
    'tables': { en: 'Fire Pits & Occasional Tables', vi: 'Bàn Lửa Sưởi & Bàn Trà' },
    'accessories': { en: 'Benches & Adirondacks', vi: 'Ghế Băng & Ghế Adirondack' },
  };

  return (
    <footer id="site-footer" className="bg-[#1C1A18] text-[#DED9CD] border-t border-[#2B2724]">
      
      {/* Newsletter & Lookbook Band */}
      <div className="border-b border-white/10 py-16 bg-[#24211E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-2">
              <span className="text-[13px] sm:text-xs uppercase tracking-[0.22em] font-bold text-[#9B522E]">
                {isVi ? 'Tập San B+Open • Living Beyond Walls' : 'The B+Open Journal • Living Beyond Walls'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                {isVi ? 'Nhận Bản Ấn Phẩm Lookbook Mùa 2026' : 'Receive the 2026 Seasonal Lookbook'}
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#DED9CD] font-light leading-relaxed">
                {isVi
                  ? 'Đón nhận đầu tiên các bộ sưu tập nhà thiết kế mới, ý tưởng kiến trúc sân vườn đẳng cấp và bí quyết chăm sóc gỗ Ipe trăm tuổi.'
                  : 'Be the first to explore new designer collections, seasonal outdoor living concepts, and architectural timber care insights.'}
              </p>
            </div>

            <div className="lg:col-span-6">
              {newsletterSuccess ? (
                <div className="p-4 bg-white/10 border border-white/20 rounded-xs text-[14px] text-[#EADBCE]">
                  {isVi 
                    ? 'Cảm ơn bạn đã đăng ký. Bản Lookbook kỹ thuật số 2026 đã được gửi tới hộp thư của bạn.' 
                    : 'Thank you for subscribing. Your digital 2026 Lookbook has been dispatched to your inbox.'}
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    required
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={isVi ? 'Nhập địa chỉ email của bạn...' : 'Enter your email address...'}
                    className="flex-1 px-4 py-3 min-h-[48px] bg-white/5 border border-white/20 text-[15px] text-white placeholder:text-[#8C7A6B] focus:outline-none focus:border-[#9B522E] rounded-xs"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 min-h-[48px] bg-[#9B522E] text-white hover:bg-[#854524] text-[13px] sm:text-xs font-bold uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-xs shrink-0 shadow-sm"
                  >
                    <span>{isVi ? 'Đăng Ký' : 'Subscribe'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* Col 1: Brand & Heritage */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex flex-col cursor-pointer group select-none items-start"
            >
              <img
                src="/logo-b-open.png"
                alt="B+Open Logo"
                className="h-14 sm:h-16 w-auto object-contain object-left mb-3 transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="text-[13px] sm:text-[14px] tracking-[0.22em] uppercase font-bold text-white mb-1">
                Living beyond walls
              </div>
            </div>

            <p className="text-[14px] text-[#C4B7AA] leading-relaxed font-light">
              {isVi
                ? 'Nội thất ngoại thất di sản cao cấp được điêu khắc thủ công từ 100% gỗ Ipe Bolivia chứng nhận FSC®.'
                : 'Heirloom luxury outdoor furnishings hand-sculpted from 100% FSC®-certified Bolivian Ipe timber.'}
            </p>

            <div className="pt-2 text-[13px] text-[#A69587] space-y-1.5">
              <div>{isVi ? 'Trung tâm phân phối: Richmond, Virginia, Hoa Kỳ' : 'Distribution: Richmond, Virginia'}</div>
              <div>{isVi ? 'Bảo tồn rừng lâm nghiệp: Miền Đông Bolivia' : 'Forest Stewardship: Eastern Bolivia'}</div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <button 
                onClick={() => onNavigate('story')}
                className="inline-flex items-center gap-1.5 text-[14px] text-[#9B522E] font-bold hover:underline cursor-pointer min-h-[38px]"
              >
                <span>{isVi ? 'Câu Chuyện Di Sản' : 'Our Story'}</span>
              </button>
              <span className="text-white/20">•</span>
              <button 
                onClick={() => onNavigate('sustainability')}
                className="inline-flex items-center gap-1.5 text-[14px] text-[#737D5A] hover:text-[#88946B] font-bold hover:underline cursor-pointer min-h-[38px]"
              >
                <TreePine className="w-4 h-4" />
                <span>{isVi ? 'Chứng Nhận FSC® C009849' : 'FSC® C009849 Certified'}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Furniture Categories */}
          <div className="space-y-3">
            <div className="text-[13px] font-bold uppercase tracking-wider text-white">
              {isVi ? 'Danh Mục Sản Phẩm' : 'Furniture'}
            </div>
            <ul className="space-y-1 text-[14px] text-[#C4B7AA]">
              {['dining', 'deep-seating', 'chaises', 'tables', 'accessories'].map((catId) => (
                <li key={catId}>
                  <button
                    onClick={() => onNavigate('furniture', { category: catId })}
                    className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                  >
                    {isVi ? categoryLabels[catId]?.vi : categoryLabels[catId]?.en}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('furniture', { category: 'all' })}
                  className="text-[#9B522E] hover:text-white transition-colors font-bold cursor-pointer py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Toàn Bộ Danh Mục →' : 'View Master Catalog →'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Signature Collections */}
          <div className="space-y-3">
            <div className="text-[13px] font-bold uppercase tracking-wider text-white">
              {isVi ? 'Bộ Sưu Tập' : 'Collections'}
            </div>
            <ul className="space-y-1 text-[14px] text-[#C4B7AA]">
              {collections.map((c) => {
                const displayName = isVi && c.nameVi ? c.nameVi : c.name;
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => onNavigate('collections', { collection: c.id })}
                      className="hover:text-white transition-colors capitalize cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                    >
                      {isVi ? `Bộ Sưu Tập ${displayName}` : `${displayName} Collection`}
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="text-[#9B522E] hover:text-white transition-colors font-bold cursor-pointer py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Xem 4 Bộ Sưu Tập →' : 'All Collections →'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Materials & Care */}
          <div className="space-y-3">
            <div className="text-[13px] font-bold uppercase tracking-wider text-white">
              {isVi ? 'Vật Liệu & Bảo Dưỡng' : 'Materials & Care'}
            </div>
            <ul className="space-y-1 text-[14px] text-[#C4B7AA]">
              <li>
                <button 
                  onClick={() => onNavigate('materials')} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? '100% Gỗ Ipe Bolivia' : '100% Bolivian Ipe'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('materials')} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Thang Đo Độ Cứng Janka' : 'Janka Hardness Scale'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('materials')} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Cẩm Nang Màu Bạc Patina' : 'Patina Weathering Guide'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('care')} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Hệ Thống Phục Hồi Penofin®' : 'Penofin® Care System'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('help-center')} 
                  className="hover:text-white transition-colors cursor-pointer text-left text-[#9B522E] font-bold py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Trung Tâm Hỗ Trợ' : 'Help Center'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sustainability')} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Chu Kỳ Tái Sinh Rừng 30 Năm' : '30-Year Stewardship'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Professionals & Company */}
          <div className="space-y-3">
            <div className="text-[13px] font-bold uppercase tracking-wider text-white">
              {isVi ? 'Dành Cho Giới Chuyên Môn' : 'Professionals'}
            </div>
            <ul className="space-y-1 text-[14px] text-[#C4B7AA]">
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-white transition-colors text-left cursor-pointer text-[#9B522E] font-bold py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Câu Chuyện Di Sản & Rừng FSC®' : 'Our Story & FSC® Forests'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="hover:text-white transition-colors text-left cursor-pointer py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Tin Tức & Sự Kiện' : 'News & Events'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trade')}
                  className="hover:text-white transition-colors text-left cursor-pointer py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Chương Trình Đối Tác (Trade)' : 'Trade Program'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trade')}
                  className="hover:text-white transition-colors text-left cursor-pointer py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Thư Viện File 2D/3D CAD & BIM' : '2D/3D CAD & BIM Models'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('how-to-buy')} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Cách Mua Hàng (How to Buy)' : 'How to Buy'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('showrooms', { tab: 'retailers' })} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Tìm Đại Lý (Find a Retailer)' : 'Find a Retailer'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('showrooms', { tab: 'design-showrooms' })} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Showroom Thiết Kế (Design Showrooms)' : 'Design Showrooms'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('3d-showroom')} 
                  className="hover:text-white transition-colors cursor-pointer text-left text-[#9B522E] font-bold py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Showroom Thực Tế Ảo 3D' : '3D Showroom Tour'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('showrooms', { tab: 'contract-hospitality' })} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Dự Án & Nghỉ Dưỡng (Contract / Hospitality)' : 'Contract & Hospitality'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors text-left cursor-pointer font-bold text-[#9B522E] py-1 min-h-[36px] flex items-center"
                >
                  {isVi ? 'Catalogue & Lookbook Kỹ Thuật Số' : 'Digital Catalog & Lookbook'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#8C7A6B] gap-4">
          <div>
            © {new Date().getFullYear()} B+Open. {isVi ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'} Living beyond walls. FSC®-C009849.
          </div>
          <div className="flex space-x-6">
            <button onClick={() => onNavigate('care')} className="hover:text-[#D6C7BA] transition-colors cursor-pointer">
              {isVi ? 'Chính Sách Bảo Hành' : 'Warranty'}
            </button>
            <button onClick={() => onNavigate('trade')} className="hover:text-[#D6C7BA] transition-colors cursor-pointer">
              {isVi ? 'Quy Chuẩn Dự Án' : 'Trade Terms'}
            </button>
            <button onClick={() => onNavigate('sustainability')} className="hover:text-[#D6C7BA] transition-colors cursor-pointer">
              {isVi ? 'Cam Kết Môi Trường' : 'Environmental Policy'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
