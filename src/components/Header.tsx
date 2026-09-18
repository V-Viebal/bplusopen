import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Menu, X, ChevronDown, ChevronRight, MapPin, Globe, ShieldCheck } from 'lucide-react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCatalogData } from '../context/CatalogDataContext';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string; tab?: 'retailers' | 'design-showrooms' | 'contract-hospitality' }) => void;
  onOpenSearch: () => void;
  onOpenSpecDrawer: () => void;
  onOpenTradeModal: () => void;
  onOpenCatalogModal: () => void;
  onOpenMenuDrawer?: (screen?: 'root' | 'furniture' | 'dining' | 'lounging' | 'care' | 'story' | 'collections' | 'accessories') => void;
  isAdminAuthenticated: boolean;
  isAdminEditMode: boolean;
  onOpenAdminLogin: () => void;
  onToggleAdminEditMode: () => void;
  savedItemCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenSpecDrawer,
  onOpenTradeModal,
  onOpenCatalogModal,
  onOpenMenuDrawer,
  isAdminAuthenticated,
  isAdminEditMode,
  onOpenAdminLogin,
  onToggleAdminEditMode,
  savedItemCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const { collections } = useCatalogData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: PageId, extra?: { category?: string; collection?: string; tab?: 'retailers' | 'design-showrooms' | 'contract-hospitality' }) => {
    onNavigate(page, extra);
    setMobileMenuOpen(false);
  };

  const isHeroPage = ['home', 'story', 'furniture', 'how-to-buy', 'trade', 'collections', 'care', 'news'].includes(currentPage);
  const isTransparent = isHeroPage && !isScrolled;

  return (
    <>
      {/* MAIN NAVIGATION HEADER */}
      <header
        id="main-header"
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans"
      >
        {/* TOP UTILITY BAR (matching screenshot) */}
        <div
          className={`border-b text-[11.5px] font-normal tracking-[0.02em] select-none transition-all duration-300 ${
            isTransparent
              ? 'bg-black/35 backdrop-blur-xs border-white/10 text-white/90'
              : 'bg-[#0c0c0c] border-white/10 text-[#D8D8D8]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
            {/* Left links: Trade Program, News & Events */}
            <div className="flex items-center space-x-5 sm:space-x-6">
              <button
                onClick={() => handleNav('trade')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {language === 'vi' ? 'Chương Trình Dự Án' : 'Trade Program'}
              </button>
              <button
                onClick={() => handleNav('news')}
                className={`transition-colors cursor-pointer ${
                  currentPage === 'news' ? 'text-[#9B522E] font-medium underline underline-offset-4' : 'hover:text-white'
                }`}
              >
                {language === 'vi' ? 'Tin Tức & Sự Kiện' : 'News & Events'}
              </button>
            </div>

            {/* Right links: Catalog, Product Care, 3D Showroom, +1 (800) 403-0403 */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={() => handleNav('catalog')}
                className={`hover:text-white transition-colors cursor-pointer ${
                  currentPage === 'catalog' ? 'text-[#9B522E] font-semibold' : ''
                }`}
              >
                {language === 'vi' ? 'Catalogue' : 'Catalog'}
              </button>
              <button
                onClick={() => handleNav('care')}
                className={`hover:text-white transition-colors cursor-pointer hidden sm:inline-block ${
                  currentPage === 'care' ? 'text-[#9B522E] font-semibold' : ''
                }`}
              >
                {language === 'vi' ? 'Bảo Dưỡng Sản Phẩm' : 'Product Care'}
              </button>
              <button
                onClick={() => handleNav('3d-showroom')}
                className={`hover:text-white transition-colors cursor-pointer hidden md:inline-block ${
                  currentPage === '3d-showroom' ? 'text-[#9B522E] font-semibold' : ''
                }`}
              >
                {language === 'vi' ? 'Showroom 3D' : '3D Showroom'}
              </button>
              <a
                href="tel:+18004030403"
                className="hover:text-white transition-colors font-medium tracking-wide hidden lg:inline-block"
              >
                +1 (800) 403-0403
              </a>

              {/* Language Switcher */}
              <div className="flex items-center border border-white/20 rounded-full px-1.5 py-0.5 bg-black/40 text-[10px] tracking-normal font-sans ml-1">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-0.2 rounded-full transition-all cursor-pointer font-medium ${
                    language === 'en'
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'text-[#D6C7BA] hover:text-white'
                  }`}
                  title="Switch to English"
                >
                  EN
                </button>
                <span className="text-white/30 px-0.5">/</span>
                <button
                  type="button"
                  onClick={() => setLanguage('vi')}
                  className={`px-1.5 py-0.2 rounded-full transition-all cursor-pointer font-medium ${
                    language === 'vi'
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'text-[#D6C7BA] hover:text-white'
                  }`}
                  title="Chuyển sang Tiếng Việt"
                >
                  VI
                </button>
              </div>

              {/* Project Spec Sheet Trigger with Count Badge */}
              <button
                onClick={onOpenSpecDrawer}
                className="relative p-1 text-white/90 hover:text-[#9B522E] transition-colors cursor-pointer rounded-full"
                title="Saved Project Specs"
                aria-label="View Project Spec Sheet"
              >
                <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.8} />
                {savedItemCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#9B522E] text-black text-[9px] font-bold flex items-center justify-center">
                    {savedItemCount}
                  </span>
                )}
              </button>

              {/* Local admin editor access */}
              <button
                type="button"
                onClick={() => {
                  if (isAdminAuthenticated) {
                    onToggleAdminEditMode();
                  } else {
                    onOpenAdminLogin();
                  }
                }}
                className={`flex items-center gap-1.5 rounded-full p-1 transition-colors cursor-pointer ${
                  isAdminEditMode ? 'text-[#C28B75]' : 'text-white/90 hover:text-[#9B522E]'
                }`}
                title={isAdminAuthenticated ? (isAdminEditMode ? 'Exit edit mode' : 'Enable edit mode') : 'Admin sign in'}
                aria-label={isAdminAuthenticated ? (isAdminEditMode ? 'Exit edit mode' : 'Enable edit mode') : 'Admin sign in'}
              >
                <ShieldCheck className="w-4 h-4" strokeWidth={1.8} />
                <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wider">
                  {isAdminAuthenticated
                    ? (isAdminEditMode ? (language === 'vi' ? 'Đang sửa' : 'Editing') : (language === 'vi' ? 'Bật sửa' : 'Edit'))
                    : 'Admin'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION BAR (matching screenshot) */}
        <div
          className={`transition-all duration-300 ${
            isTransparent
              ? 'bg-gradient-to-b from-black/70 via-black/25 to-transparent border-b-0 py-3 sm:py-4'
              : isScrolled
              ? 'bg-[#141414]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-2 sm:py-2.5'
              : 'bg-[#181818]/95 backdrop-blur-md shadow-md border-b border-white/10 py-3 sm:py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'min-h-[58px] sm:min-h-[66px]' : 'min-h-[76px] sm:min-h-[92px] lg:min-h-[104px]'}`}>
              
              {/* LEFT SECTION: [Menu & Search Icon] + Furniture + Our Story + How to Buy */}
              <div className="flex items-center space-x-3 sm:space-x-5 lg:space-x-7 z-10">
                {/* Menu Drawer & Search Button Group */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {/* Two horizontal menu bars -> Open Navigation Menu Drawer ("Menu Cuộn") */}
                  <button
                    onClick={() => {
                      if (onOpenMenuDrawer) {
                        onOpenMenuDrawer('root');
                      } else {
                        setMobileMenuOpen(!mobileMenuOpen);
                      }
                    }}
                    className="group flex items-center justify-center p-2 min-w-[44px] min-h-[44px] text-white/90 hover:text-[#9B522E] transition-colors cursor-pointer"
                    title={language === 'vi' ? 'Menu Cuộn Danh Mục' : 'Navigation Menu'}
                    aria-label="Open navigation menu drawer"
                  >
                    <div className="flex flex-col gap-1.5 justify-center py-1">
                      <span className="w-5 h-[2px] bg-white group-hover:bg-[#9B522E] transition-colors rounded-full" />
                      <span className="w-5 h-[2px] bg-white group-hover:bg-[#9B522E] transition-colors rounded-full" />
                    </div>
                  </button>

                  {/* Magnifying glass -> Open Search Modal */}
                  <button
                    onClick={onOpenSearch}
                    className="group flex items-center justify-center p-2 min-w-[44px] min-h-[44px] text-white/90 hover:text-[#9B522E] transition-colors cursor-pointer"
                    title={language === 'vi' ? 'Tìm kiếm' : 'Search catalog'}
                    aria-label="Search catalog"
                  >
                    <Search className="w-5 h-5 text-white group-hover:text-[#9B522E] transition-colors" strokeWidth={2} />
                  </button>
                </div>

                {/* Desktop Nav Links */}
                <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[13.5px] sm:text-[14px] font-semibold text-white tracking-[0.02em]">
                  {/* Furniture Link */}
                  <button
                    onClick={() => handleNav('furniture')}
                    className={`py-1.5 transition-colors cursor-pointer hover:text-[#9B522E] ${
                      currentPage === 'furniture'
                        ? 'text-white underline underline-offset-[6px] decoration-[2px] decoration-white'
                        : 'text-white'
                    }`}
                  >
                    {language === 'vi' ? 'Nội Thất' : 'Furniture'}
                  </button>

                  {/* Our Story Link */}
                  <button
                    onClick={() => handleNav('story')}
                    className={`py-1.5 transition-colors cursor-pointer hover:text-[#9B522E] ${
                      currentPage === 'story' || currentPage === 'sustainability' || currentPage === 'design' || currentPage === 'materials'
                        ? 'text-white underline underline-offset-[6px] decoration-[2px] decoration-white'
                        : 'text-white'
                    }`}
                  >
                    {language === 'vi' ? 'Về Chúng Tôi' : 'Our Story'}
                  </button>

                  {/* How to Buy Link */}
                  <button
                    onClick={() => handleNav('how-to-buy')}
                    className={`py-1.5 transition-colors cursor-pointer hover:text-[#9B522E] ${
                      currentPage === 'how-to-buy'
                        ? 'text-white underline underline-offset-[6px] decoration-[2px] decoration-white'
                        : 'text-white'
                    }`}
                  >
                    {language === 'vi' ? 'Cách Mua Hàng' : 'How to Buy'}
                  </button>
                </nav>
              </div>

              {/* CENTER SECTION: BRAND LOGO - DEAD CENTER OF PAGE */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-auto">
                <button
                  onClick={() => handleNav('home')}
                  id="brand-logo"
                  className="flex items-center justify-center group cursor-pointer text-center py-1 select-none"
                  aria-label="B+Open Home"
                >
                  <img
                    src="/logo-b-open.png"
                    alt="B+Open Logo"
                    className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-lg ${
                      isScrolled
                        ? 'h-11 sm:h-13 lg:h-14 max-w-[200px]'
                        : 'h-15 sm:h-18 lg:h-20 max-w-[260px]'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                </button>
              </div>

              {/* RIGHT SECTION: Trade Program + Help Center + Find a Retailer */}
              <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-5 xl:space-x-6 text-[13px] sm:text-[13.5px] font-semibold text-white tracking-[0.02em] z-10">
                {/* 1. Trade Program with Calendar + Lightning Bolt Icon */}
                <button
                  onClick={() => handleNav('trade')}
                  className="hidden md:flex items-center gap-1.5 sm:gap-2 text-white hover:text-[#9B522E] transition-colors cursor-pointer group shrink-0 whitespace-nowrap"
                >
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-white group-hover:stroke-[#9B522E] transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <path d="M12.5 8L9.5 13H13.5L11.5 18" stroke="currentColor" fill="currentColor" strokeWidth="0.8" />
                  </svg>
                  <span>{language === 'vi' ? 'Chương Trình Trade' : 'Trade Program'}</span>
                </button>

                {/* 2. Help Center with Circle Question Mark Icon */}
                <button
                  onClick={() => handleNav('help-center')}
                  className="hidden md:flex items-center gap-1.5 sm:gap-2 text-white hover:text-[#9B522E] transition-colors cursor-pointer group shrink-0 whitespace-nowrap"
                >
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-white group-hover:stroke-[#9B522E] transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
                  </svg>
                  <span>Help Center</span>
                </button>

                {/* 3. Find a Retailer with Location Pin Icon */}
                <button
                  onClick={() => handleNav('showrooms', { tab: 'retailers' })}
                  className="flex items-center gap-1.5 sm:gap-2 p-2 min-h-[44px] text-white hover:text-[#9B522E] transition-colors cursor-pointer group shrink-0 whitespace-nowrap"
                  aria-label={language === 'vi' ? 'Tìm Đại Lý' : 'Find a Retailer'}
                >
                  <MapPin className="w-5 h-5 sm:w-4.5 sm:h-4.5 text-white group-hover:text-[#9B522E] transition-colors" strokeWidth={2} />
                  <span className="hidden sm:inline font-medium text-[13.5px]">{language === 'vi' ? 'Tìm Đại Lý' : 'Find a Retailer'}</span>
                </button>

                {/* Mobile Menu Hamburger */}
                <button
                  id="header-mobile-menu-btn"
                  onClick={() => {
                    if (onOpenMenuDrawer) {
                      onOpenMenuDrawer('root');
                    } else {
                      setMobileMenuOpen(!mobileMenuOpen);
                    }
                  }}
                  className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-[#9B522E] transition-colors cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#161616] text-white px-6 py-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              
              {/* Brand Header inside Mobile Menu */}
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleNav('home')}
                  className="flex items-center cursor-pointer text-left py-1"
                >
                  <img
                    src="/logo-b-open.png"
                    alt="B+Open Logo"
                    className="h-14 sm:h-16 w-auto max-w-[260px] object-contain"
                    referrerPolicy="no-referrer"
                  />
                </button>
              </div>

              {/* Mobile Language Selector */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[13px] font-bold text-white/80 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Language / Ngôn ngữ</span>
                </span>
                <div className="flex items-center bg-white/10 p-1 rounded-sm">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xs transition-colors cursor-pointer min-h-[36px] ${
                      language === 'en' ? 'bg-[#9B522E] text-white shadow-sm' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('vi')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xs transition-colors cursor-pointer min-h-[36px] ${
                      language === 'vi' ? 'bg-[#9B522E] text-white shadow-sm' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    VI
                  </button>
                </div>
              </div>

              {/* Home Link */}
              <button
                onClick={() => handleNav('home')}
                className={`w-full text-left py-2.5 text-[17px] font-bold uppercase tracking-wider min-h-[48px] flex items-center ${
                  currentPage === 'home' ? 'text-[#9B522E]' : 'text-white'
                }`}
              >
                {language === 'vi' ? 'Trang Chủ' : 'Home'}
              </button>

              {/* Furniture Link */}
              <button
                onClick={() => handleNav('furniture')}
                className={`w-full text-left py-2.5 text-[17px] font-bold uppercase tracking-wider min-h-[48px] flex items-center ${
                  currentPage === 'furniture' ? 'text-[#9B522E]' : 'text-white'
                }`}
              >
                {language === 'vi' ? 'Nội Thất' : 'Furniture'}
              </button>

              {/* Collections */}
              <div className="text-[13px] font-bold text-white/70 uppercase tracking-widest pt-2 pb-1 border-b border-white/10 flex justify-between items-center">
                <span>{language === 'vi' ? 'Bộ Sưu Tập' : 'Collections'}</span>
                <button
                  onClick={() => handleNav('collections')}
                  className="text-[13px] text-[#9B522E] font-semibold underline p-1 min-h-[36px] flex items-center"
                >
                  {language === 'vi' ? 'Xem tất cả' : 'View all'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[15px]">
                {collections.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => handleNav('collections', { collection: col.id })}
                    className="text-left py-2 text-white/90 hover:text-[#9B522E] font-medium cursor-pointer min-h-[40px] flex items-center"
                  >
                    {language === 'vi' && col.nameVi ? col.nameVi : col.name}
                  </button>
                ))}
              </div>

              {/* Quick Navigation Items matching screenshot */}
              <div className="pt-3 border-t border-white/10 space-y-2 text-[16px] font-semibold text-white">
                <button
                  onClick={() => handleNav('story')}
                  className="block w-full text-left py-2 hover:text-[#9B522E] cursor-pointer min-h-[44px]"
                >
                  {language === 'vi' ? 'Về Chúng Tôi (Our Story)' : 'Our Story'}
                </button>
                <button
                  onClick={() => handleNav('sustainability')}
                  className={`block w-full text-left py-1.5 pl-3 text-[14px] cursor-pointer min-h-[38px] ${
                    currentPage === 'sustainability' ? 'text-[#9B522E] font-bold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  └ {language === 'vi' ? 'Phát Triển Bền Vững (Sustainability)' : 'Sustainability'}
                </button>
                <button
                  onClick={() => handleNav('design')}
                  className={`block w-full text-left py-1.5 pl-3 text-[14px] cursor-pointer min-h-[38px] ${
                    currentPage === 'design' ? 'text-[#9B522E] font-bold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  └ {language === 'vi' ? 'Quy Trình Thiết Kế (Design)' : 'Design Process'}
                </button>
                <button
                  onClick={() => handleNav('materials')}
                  className={`block w-full text-left py-1.5 pl-3 text-[14px] cursor-pointer min-h-[38px] ${
                    currentPage === 'materials' ? 'text-[#9B522E] font-bold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  └ {language === 'vi' ? 'Chất Liệu & Gỗ Ipe (Materials)' : 'Materials & Ipe Wood'}
                </button>
                <button
                  onClick={() => handleNav('how-to-buy')}
                  className={`block w-full text-left py-2 cursor-pointer font-semibold min-h-[44px] ${
                    currentPage === 'how-to-buy' ? 'text-[#9B522E]' : 'hover:text-[#9B522E]'
                  }`}
                >
                  {language === 'vi' ? 'Cách Mua Hàng (How to Buy)' : 'How to Buy'}
                </button>
                <button
                  onClick={() => handleNav('showrooms', { tab: 'retailers' })}
                  className="block w-full text-left py-2 hover:text-[#9B522E] cursor-pointer min-h-[44px]"
                >
                  {language === 'vi' ? 'Tìm Đại Lý (Find a Retailer)' : 'Find a Retailer'}
                </button>
                <button
                  onClick={() => handleNav('showrooms', { tab: 'design-showrooms' })}
                  className="block w-full text-left py-2 hover:text-[#9B522E] cursor-pointer min-h-[44px]"
                >
                  {language === 'vi' ? 'Showroom Thiết Kế (Design Showrooms)' : 'Design Showrooms'}
                </button>
                <button
                  onClick={() => handleNav('showrooms', { tab: 'contract-hospitality' })}
                  className="block w-full text-left py-2 hover:text-[#9B522E] cursor-pointer min-h-[44px]"
                >
                  {language === 'vi' ? 'Dự Án / Nghỉ Dưỡng (Contract / Hospitality)' : 'Contract / Hospitality'}
                </button>
                <button
                  onClick={() => handleNav('trade')}
                  className="block w-full text-left py-2 hover:text-[#9B522E] cursor-pointer min-h-[44px]"
                >
                  {language === 'vi' ? 'Chương Trình Trade Program' : 'Trade Program'}
                </button>
                <button
                  onClick={() => handleNav('news')}
                  className={`block w-full text-left py-2 cursor-pointer min-h-[44px] ${
                    currentPage === 'news' ? 'text-[#9B522E]' : 'hover:text-[#9B522E]'
                  }`}
                >
                  {language === 'vi' ? 'Tin Tức & Sự Kiện (News & Events)' : 'News & Events'}
                </button>
                <button
                  onClick={() => handleNav('help-center')}
                  className={`block w-full text-left py-2 cursor-pointer min-h-[44px] ${
                    currentPage === 'help-center' ? 'text-[#9B522E]' : 'hover:text-[#9B522E]'
                  }`}
                >
                  {language === 'vi' ? 'Trung Tâm Hỗ Trợ (Help Center)' : 'Help Center'}
                </button>
                <button
                  onClick={() => handleNav('3d-showroom')}
                  className={`block w-full text-left py-2 cursor-pointer min-h-[44px] ${
                    currentPage === '3d-showroom' ? 'text-[#9B522E]' : 'hover:text-[#9B522E]'
                  }`}
                >
                  {language === 'vi' ? 'Showroom Thực Tế Ảo 3D' : '3D Virtual Showroom'}
                </button>
                <button
                  onClick={() => handleNav('catalog')}
                  className={`block w-full text-left py-2 cursor-pointer min-h-[44px] ${
                    currentPage === 'catalog' ? 'text-[#9B522E]' : 'hover:text-[#9B522E]'
                  }`}
                >
                  {language === 'vi' ? 'Khám Phá Catalogue 2026' : 'Digital Catalog & Lookbook'}
                </button>
              </div>

              {/* Lookbook button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => { onOpenCatalogModal(); setMobileMenuOpen(false); }}
                  className="w-full py-3.5 bg-[#9B522E] text-white text-sm font-bold tracking-wider uppercase hover:bg-[#854424] transition-colors cursor-pointer rounded-xs min-h-[48px]"
                >
                  {language === 'vi' ? 'TẢI CATALOG MÙA 2026' : 'VIEW 2026 CATALOG'}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
