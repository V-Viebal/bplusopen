import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Search } from 'lucide-react';
import { PageId } from '../types';
import { useCatalogData } from '../context/CatalogDataContext';

export type MenuScreen =
  | 'root'
  | 'furniture'
  | 'dining'
  | 'lounging'
  | 'care'
  | 'story'
  | 'help'
  | 'collections'
  | 'accessories'
  | 'materials';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (
    page: PageId,
    extra?: { category?: string; collection?: string; tab?: 'retailers' | 'design-showrooms' | 'contract-hospitality' }
  ) => void;
  initialScreen?: MenuScreen;
  language?: 'en' | 'vi';
  onOpenSearch?: () => void;
}

// 17 Collections featured in the Jensen Outdoor drawer carousel
export const DRAWER_CAROUSEL_COLLECTIONS = [
  { id: 'coral', name: 'Coral', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2021/01/SQ_Coral-180x180.jpg' },
  { id: 'forte', name: 'Forte', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2021/01/SQ_Forte-180x180.jpg' },
  { id: 'foundations', name: 'Foundations', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2026/03/Foundations-180x180.jpg' },
  { id: 'harmony', name: 'Harmony', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2021/01/SQ_Harmony-180x180.jpg' },
  { id: 'classic-ipe', name: 'Heritage', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2021/01/SQ_Classic-Ipe-180x180.jpg' },
  { id: 'innova', name: 'Innova', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2026/03/Innova-180x180.jpg' },
  { id: 'jett', name: 'Jett', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2021/01/SQ_Jett-180x180.jpg' },
  { id: 'laguna', name: 'Laguna', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2021/01/SQ_Laguna-180x180.jpg' },
  { id: 'mix', name: 'Mix', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/mix-hpsq-1-180x180.jpg' },
  { id: 'nest', name: 'Nest', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2021/01/SQ_Nest-180x180.jpg' },
  { id: 'opal', name: 'Opal', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2021/01/SQ_Opal-180x180.jpg' },
  { id: 'richmond', name: 'Richmond', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2021/01/SQ_Richmond-180x180.jpg' },
  { id: 'sky', name: 'Sky', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2022/01/sky-hpsq-1-180x180.jpg' },
  { id: 'sorrento', name: 'Sorrento', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2026/03/Sorrento-180x180.jpg' },
  { id: 'tempo', name: 'Tempo', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2026/03/Tempo-180x180.jpg' },
  { id: 'topaz', name: 'Topaz', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2021/01/SQ_Topaz-180x180.jpg' },
  { id: 'unicon', name: 'Unicon', image: 'https://www.jensenoutdoor.com/wp-content/uploads/2026/03/Unicon-180x180.jpg' },
];

const getInitialStack = (screen?: MenuScreen | string): MenuScreen[] => {
  if (screen === 'furniture') return ['root', 'furniture'];
  if (screen === 'dining') return ['root', 'dining'];
  if (screen === 'lounging') return ['root', 'lounging'];
  if (screen === 'care') return ['root', 'care'];
  if (screen === 'story') return ['root', 'story'];
  if (screen === 'help') return ['root', 'help'];
  if (screen === 'collections') return ['root', 'furniture', 'collections'];
  if (screen === 'accessories') return ['root', 'furniture', 'accessories'];
  if (screen === 'materials') return ['root', 'materials'];
  return ['root'];
};

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  initialScreen = 'root',
  language = 'en',
  onOpenSearch,
}) => {
  const { collections } = useCatalogData();
  const [screenStack, setScreenStack] = useState<MenuScreen[]>(() => getInitialStack(initialScreen));
  const [searchVal, setSearchVal] = useState('');
  const [logoError, setLogoError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Reset screen stack when drawer opens
  useEffect(() => {
    if (isOpen) {
      setScreenStack(getInitialStack(initialScreen));
      setSearchVal('');
      setScrollProgress(0);
    }
  }, [isOpen, initialScreen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(1, Math.max(0, scrollLeft / maxScroll)));
    }
  };

  const currentScreen = screenStack[screenStack.length - 1] || 'root';
  const isRoot = currentScreen === 'root';

  const pushScreen = (screen: MenuScreen) => {
    setScreenStack((prev) => [...prev, screen]);
  };

  const popScreen = () => {
    if (screenStack.length > 1) {
      setScreenStack((prev) => prev.slice(0, -1));
    } else {
      onClose();
    }
  };

  const handleLinkClick = (action: () => void) => {
    action();
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    if (onOpenSearch) {
      onOpenSearch();
    }
  };

  if (!isOpen) return null;

  // Handle width for the scroll indicator (approx 30%)
  const handleWidthPercent = 30;
  const handleLeftPercent = scrollProgress * (100 - handleWidthPercent);

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      {/* Dark Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel (Width matches Jensen Outdoor: max-w-[440px] on desktop, full on mobile) */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 320 }}
        className="relative w-full max-w-[460px] bg-[#141414] text-white flex flex-col h-full shadow-2xl z-10 border-r border-white/10"
      >
        {/* TOP BAR */}
        {isRoot ? (
          /* ROOT HEADER: Close button on LEFT, Logo CENTERED (Matches Image 3) */
          <div className="relative flex items-center justify-between px-6 pt-5 pb-4 select-none shrink-0 border-b border-transparent">
            {/* Close Button on left */}
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1.5 -ml-2 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[1.25]" />
            </button>

            {/* Logo Centered */}
            <div className="flex-1 flex items-center justify-center -ml-5">
              <button
                onClick={() => handleLinkClick(() => onNavigate('home'))}
                className="flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                {!logoError ? (
                  <img
                    src="/logo-b-open.png"
                    alt="B+Open Logo"
                    className="h-11 sm:h-12 w-auto object-contain brightness-100"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="flex items-center gap-2 text-center">
                    <span className="text-[17px] font-bold tracking-[0.18em] uppercase text-white">
                      B+OPEN
                    </span>
                  </div>
                )}
              </button>
            </div>

            {/* Spacer for perfect center alignment */}
            <div className="w-5" />
          </div>
        ) : (
          /* SUBMENU HEADER: [<] PREVIOUS MENU [X] */
          <div className="relative flex items-center justify-between px-6 py-4 select-none shrink-0 border-b border-white/10">
            {/* Back Chevron */}
            <button
              onClick={popScreen}
              className="text-white/80 hover:text-white p-1 -ml-1 transition-colors cursor-pointer"
              aria-label="Previous menu"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Centered "PREVIOUS MENU" button */}
            <button
              onClick={popScreen}
              className="text-[14px] sm:text-[15px] tracking-[0.16em] uppercase font-bold text-white hover:text-[#9B522E] transition-colors cursor-pointer py-2 px-3 flex items-center gap-1.5"
            >
              <span>{language === 'vi' ? 'QUAY LẠI' : 'PREVIOUS MENU'}</span>
            </button>

            {/* Close Button on right */}
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 -mr-1 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        )}

        {/* SCROLLABLE DRAWER BODY */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden text-white">
          <AnimatePresence mode="wait">
            {/* ROOT SCREEN */}
            {currentScreen === 'root' && (
              <motion.div
                key="root-screen"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.16 }}
                className="flex flex-col min-h-full"
              >
                {/* 1. HORIZONTAL COLLECTIONS CAROUSEL (Image 3) */}
                <div className="pt-2 pb-3">
                  <div
                    ref={carouselRef}
                    onScroll={handleCarouselScroll}
                    className="flex gap-3 overflow-x-auto scrollbar-none px-6 py-1 scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {DRAWER_CAROUSEL_COLLECTIONS.map((col) => (
                      <button
                        key={col.id}
                        onClick={() =>
                          handleLinkClick(() => onNavigate('collection-detail', { collection: col.id }))
                        }
                        className="flex flex-col items-start gap-2 shrink-0 group text-left cursor-pointer"
                        style={{ width: 140 }}
                      >
                        <div className="w-[140px] h-[140px] bg-[#1c1c1c] overflow-hidden border border-white/5">
                          <img
                            src={col.image}
                            alt={col.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <span className="text-sm font-bold tracking-[0.06em] uppercase text-white group-hover:text-[#9B522E] transition-colors truncate w-full">
                          {col.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Horizontal Scroll Indicator Bar with sliding pill (Image 3) */}
                  <div className="w-full max-w-[260px] mx-auto h-[3px] bg-white/20 rounded-full mt-3 relative overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-100 ease-out"
                      style={{
                        width: `${handleWidthPercent}%`,
                        marginLeft: `${handleLeftPercent}%`,
                      }}
                    />
                  </div>
                </div>

                {/* 2. SEARCH BAR (White input box with solid black search button, Image 3 & Image 2) */}
                <div className="px-6 pt-3 pb-4">
                  <form onSubmit={handleSearchSubmit} className="flex items-stretch w-full h-[50px] shadow-md">
                    <input
                      type="search"
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                      placeholder={language === 'vi' ? 'Tìm kiếm nội thất, bộ sưu tập...' : 'Search furniture, collections...'}
                      className="flex-1 bg-white text-black placeholder-[#666666] text-base px-4 rounded-none outline-none border-0 font-medium"
                    />
                    <button
                      type="submit"
                      className="w-[50px] min-w-[50px] bg-black text-white hover:bg-[#9B522E] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                      aria-label="Search"
                    >
                      <Search className="w-5 h-5 stroke-[2.2]" />
                    </button>
                  </form>
                </div>

                {/* Thin divider line below search (Image 2) */}
                <div className="border-t border-white/10 mx-6 mb-2" />

                {/* 3. PRIMARY MENU LIST (Image 2) */}
                <div className="py-1">
                  {/* FURNITURE */}
                  <button
                    onClick={() => pushScreen('furniture')}
                    className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.04] active:bg-white/[0.08] cursor-pointer transition-colors min-h-[52px]"
                  >
                    <span className="text-[17px] sm:text-[18px] font-bold tracking-[0.04em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                      {language === 'vi' ? 'NỘI THẤT' : 'FURNITURE'}
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors stroke-[2]" />
                  </button>

                  {/* DINING */}
                  <button
                    onClick={() => pushScreen('dining')}
                    className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.04] active:bg-white/[0.08] cursor-pointer transition-colors min-h-[52px]"
                  >
                    <span className="text-[17px] sm:text-[18px] font-bold tracking-[0.04em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                      {language === 'vi' ? 'BÀN ĂN NGOÀI TRỜI' : 'DINING'}
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors stroke-[2]" />
                  </button>

                  {/* LOUNGING */}
                  <button
                    onClick={() => pushScreen('lounging')}
                    className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.04] active:bg-white/[0.08] cursor-pointer transition-colors min-h-[52px]"
                  >
                    <span className="text-[17px] sm:text-[18px] font-bold tracking-[0.04em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                      {language === 'vi' ? 'THƯ GIÃN & LOUNGE' : 'LOUNGING'}
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors stroke-[2]" />
                  </button>

                  {/* OUTDOOR FABRICS (Direct link, no chevron - matches Image 2) */}
                  <button
                    onClick={() => handleLinkClick(() => onNavigate('materials'))}
                    className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.04] active:bg-white/[0.08] cursor-pointer transition-colors min-h-[52px]"
                  >
                    <span className="text-[17px] sm:text-[18px] font-bold tracking-[0.04em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                      {language === 'vi' ? 'VẢI NGOÀI TRỜI' : 'OUTDOOR FABRICS'}
                    </span>
                  </button>

                  {/* PRODUCT CARE */}
                  <button
                    onClick={() => pushScreen('care')}
                    className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.04] active:bg-white/[0.08] cursor-pointer transition-colors min-h-[52px]"
                  >
                    <span className="text-[17px] sm:text-[18px] font-bold tracking-[0.04em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                      {language === 'vi' ? 'BẢO DƯỠNG SẢN PHẨM' : 'PRODUCT CARE'}
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors stroke-[2]" />
                  </button>

                  {/* OUR STORY */}
                  <button
                    onClick={() => pushScreen('story')}
                    className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.04] active:bg-white/[0.08] cursor-pointer transition-colors min-h-[52px]"
                  >
                    <span className="text-[17px] sm:text-[18px] font-bold tracking-[0.04em] uppercase text-white group-hover:text-[#9B522E] transition-colors">
                      {language === 'vi' ? 'VỀ CHÚNG TÔI' : 'OUR STORY'}
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors stroke-[2]" />
                  </button>

                  {/* Help Center (Title-case, clear legible font) */}
                  <button
                    onClick={() => pushScreen('help')}
                    className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.04] active:bg-white/[0.08] cursor-pointer transition-colors min-h-[52px]"
                  >
                    <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                      {language === 'vi' ? 'Trung Tâm Hỗ Trợ' : 'Help Center'}
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors stroke-[2]" />
                  </button>
                </div>

                {/* THIN HORIZONTAL DIVIDER (Image 1) */}
                <div className="border-t border-white/10 mx-6 my-4" />

                {/* 4. HELP MENU 2 (Bronze/Tan #9B522E, Image 1) */}
                <div className="px-6 py-1 space-y-2">
                  <button
                    onClick={() => handleLinkClick(() => onNavigate('trade'))}
                    className="block w-full text-left text-[16px] sm:text-[17px] font-medium text-[#D88358] hover:text-white transition-colors cursor-pointer py-2"
                  >
                    {language === 'vi' ? 'Chương Trình Trade' : 'Trade Program'}
                  </button>
                  <button
                    onClick={() => handleLinkClick(() => onNavigate('help-center'))}
                    className="block w-full text-left text-[16px] sm:text-[17px] font-medium text-[#D88358] hover:text-white transition-colors cursor-pointer py-2"
                  >
                    {language === 'vi' ? 'Trung Tâm Hỗ Trợ' : 'Help Center'}
                  </button>
                  <button
                    onClick={() => handleLinkClick(() => onNavigate('showrooms', { tab: 'retailers' }))}
                    className="block w-full text-left text-[16px] sm:text-[17px] font-medium text-[#D88358] hover:text-white transition-colors cursor-pointer py-2"
                  >
                    {language === 'vi' ? 'Tìm Đại Lý' : 'Find a Retailer'}
                  </button>
                </div>

                {/* THIN HORIZONTAL DIVIDER (Image 1) */}
                <div className="border-t border-white/10 mx-6 my-4" />

                {/* 5. SALES MENU 2 (White text, Image 1) */}
                <div className="px-6 py-1 space-y-2">
                  <button
                    onClick={() => handleLinkClick(() => onNavigate('catalog'))}
                    className="block w-full text-left text-[16px] sm:text-[17px] font-medium text-white hover:text-[#9B522E] transition-colors cursor-pointer py-2"
                  >
                    {language === 'vi' ? 'Catalogue Sản Phẩm' : 'Catalog'}
                  </button>
                  <button
                    onClick={() => handleLinkClick(() => onNavigate('care'))}
                    className="block w-full text-left text-[16px] sm:text-[17px] font-medium text-white hover:text-[#9B522E] transition-colors cursor-pointer py-2"
                  >
                    {language === 'vi' ? 'Bảo Dưỡng Sản Phẩm' : 'Product Care'}
                  </button>
                  <button
                    onClick={() => handleLinkClick(() => onNavigate('3d-showroom'))}
                    className="block w-full text-left text-[16px] sm:text-[17px] font-medium text-white hover:text-[#9B522E] transition-colors cursor-pointer py-2"
                  >
                    {language === 'vi' ? 'Showroom 3D Trực Tuyến' : '3D Showroom'}
                  </button>
                  <a
                    href="tel:18004030403"
                    className="block w-full text-left text-[16px] sm:text-[17px] font-bold text-white hover:text-[#9B522E] transition-colors cursor-pointer py-2"
                  >
                    +1 (800) 403-0403
                  </a>
                </div>

                {/* 6. BUSINESS MENU 2 (Solid black background bottom bar) */}
                <div className="bg-black border-t border-white/10 px-6 py-5 mt-6 space-y-2 shrink-0">
                  <button
                    onClick={() => handleLinkClick(() => onNavigate('trade'))}
                    className="block w-full text-left text-[16px] sm:text-[17px] font-semibold text-white hover:text-[#9B522E] transition-colors cursor-pointer py-1.5"
                  >
                    {language === 'vi' ? 'Chương Trình Trade' : 'Trade Program'}
                  </button>
                  <button
                    onClick={() => handleLinkClick(() => onNavigate('news'))}
                    className="block w-full text-left text-[16px] sm:text-[17px] font-semibold text-white hover:text-[#9B522E] transition-colors cursor-pointer py-1.5"
                  >
                    {language === 'vi' ? 'Tin Tức & Sự Kiện' : 'News & Events'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 1: FURNITURE */}
            {currentScreen === 'furniture' && (
              <motion.div
                key="furniture-screen"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.16 }}
                className="py-2"
              >
                {/* 1. Collections */}
                <button
                  onClick={() => pushScreen('collections')}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Bộ Sưu Tập' : 'Collections'}
                  </span>
                  <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors stroke-[2]" />
                </button>

                {/* 2. New */}
                <button
                  onClick={() => handleLinkClick(() => onNavigate('furniture'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Mới Ra Mắt' : 'New'}
                  </span>
                </button>

                {/* 3. Best Sellers */}
                <button
                  onClick={() => handleLinkClick(() => onNavigate('furniture'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Bán Chạy Nhất' : 'Best Sellers'}
                  </span>
                </button>

                {/* 4. Dining */}
                <button
                  onClick={() => pushScreen('dining')}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Bàn Ăn Ngoài Trời' : 'Dining'}
                  </span>
                  <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors stroke-[2]" />
                </button>

                {/* 5. Lounging */}
                <button
                  onClick={() => pushScreen('lounging')}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Thư Giãn & Lounge' : 'Lounging'}
                  </span>
                  <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors stroke-[2]" />
                </button>

                {/* 6. Outdoor Fabrics */}
                <button
                  onClick={() => handleLinkClick(() => onNavigate('materials'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'VẢI NGOÀI TRỜI' : 'OUTDOOR FABRICS'}
                  </span>
                </button>

                {/* 7. Accessories */}
                <button
                  onClick={() => pushScreen('accessories')}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Phụ Kiện' : 'Accessories'}
                  </span>
                  <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors stroke-[2]" />
                </button>

                {/* 8. Materials */}
                <button
                  onClick={() => pushScreen('materials')}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Vật Liệu' : 'Materials'}
                  </span>
                  <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors stroke-[2]" />
                </button>
              </motion.div>
            )}

            {/* SCREEN 2: DINING */}
            {currentScreen === 'dining' && (
              <motion.div
                key="dining-screen"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.16 }}
                className="py-2"
              >
                <button
                  onClick={() => handleLinkClick(() => onNavigate('furniture', { category: 'tables' }))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Bàn Ăn' : 'Tables'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('furniture', { category: 'dining' }))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Ghế Ăn' : 'Chairs'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('furniture', { category: 'dining' }))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Quầy Bar & Ghế Bar' : 'Bar'}
                  </span>
                </button>
              </motion.div>
            )}

            {/* SCREEN 3: LOUNGING */}
            {currentScreen === 'lounging' && (
              <motion.div
                key="lounging-screen"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.16 }}
                className="py-2"
              >
                <button
                  onClick={() => handleLinkClick(() => onNavigate('furniture', { category: 'deep-seating' }))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Sofa & Ghế Thư Giãn Sâu' : 'Deep Seating'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('furniture', { category: 'chaises' }))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Giường Tắm Nắng' : 'Chaise Lounges'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('furniture', { category: 'tables' }))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Bàn Phụ & Bàn Trà' : 'Accessory Tables'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('furniture', { category: 'deep-seating' }))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    Adirondack
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('furniture', { category: 'deep-seating' }))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Ghế Dài Vườn' : 'Garden Benches'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('furniture', { category: 'chaises' }))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Ghế Nằm Steamer' : 'Steamer'}
                  </span>
                </button>
              </motion.div>
            )}

            {/* SCREEN 4: PRODUCT CARE */}
            {currentScreen === 'care' && (
              <motion.div
                key="care-screen"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.16 }}
                className="py-2"
              >
                <button
                  onClick={() => handleLinkClick(() => onNavigate('care'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Tổng Quan Bảo Dưỡng' : 'Overview'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('care'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Các Cấp Độ Chăm Sóc' : 'Levels of Care'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('care'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Cách Bảo Quản Gỗ Ipe' : 'How to Care for Ipe Wood'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('care'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Chăm Sóc Vải Đệm' : 'How to care for cushion fabrics'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('care'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Chăm Sóc Sợi Đan Solara' : 'How to care for Woven SOLARA Fiber'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('care'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Sản Phẩm Bảo Dưỡng' : 'Care Products'}
                  </span>
                </button>
              </motion.div>
            )}

            {/* SCREEN 5: OUR STORY */}
            {currentScreen === 'story' && (
              <motion.div
                key="story-screen"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.16 }}
                className="py-2"
              >
                <button
                  onClick={() => handleLinkClick(() => onNavigate('story'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Câu Chuyện Di Sản' : 'Our Story'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('sustainability'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Phát Triển Bền Vững' : 'Sustainability'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('design'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Tinh Hoa Thủ Công' : 'Craftsmanship'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('design'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Nhà Thiết Kế' : 'Designers'}
                  </span>
                </button>
                <button
                  onClick={() => pushScreen('materials')}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Vật Liệu' : 'Materials'}
                  </span>
                  <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors stroke-[2]" />
                </button>
              </motion.div>
            )}

            {/* SCREEN 6: HELP CENTER */}
            {currentScreen === 'help' && (
              <motion.div
                key="help-screen"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.16 }}
                className="py-2"
              >
                <button
                  onClick={() => handleLinkClick(() => onNavigate('help-center'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Trung Tâm Hỗ Trợ' : 'Help Center'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('how-to-buy'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Cách Mua Hàng' : 'How to Buy'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('help-center'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Liên Hệ Hỗ Trợ' : 'Contact Support'}
                  </span>
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('help-center'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                    {language === 'vi' ? 'Cơ Hội Nghề Nghiệp' : 'Careers'}
                  </span>
                </button>
              </motion.div>
            )}

            {/* SCREEN 7: COLLECTIONS */}
            {currentScreen === 'collections' && (
              <motion.div
                key="collections-screen"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.16 }}
                className="py-2"
              >
                <button
                  onClick={() => handleLinkClick(() => onNavigate('collections'))}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors bg-white/[0.03] min-h-[50px]"
                >
                  <span className="text-[16px] sm:text-[17px] font-bold text-[#D88358]">
                    {language === 'vi' ? 'Tất Cả Bộ Sưu Tập' : 'All Collections'}
                  </span>
                </button>
                {collections.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleLinkClick(() => onNavigate('collection-detail', { collection: c.id }))}
                    className="w-full px-6 py-3.5 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[48px]"
                  >
                    <span className="text-[16px] sm:text-[17px] font-medium text-white/95 group-hover:text-white transition-colors">
                      {c.name}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}

            {/* SCREEN 8: ACCESSORIES */}
            {currentScreen === 'accessories' && (
              <motion.div
                key="accessories-screen"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.16 }}
                className="py-2"
              >
                {[
                  { id: 'all', name: 'All Accessories', nameVi: 'Tất Cả Phụ Kiện' },
                  { id: 'covers', name: 'Covers & Protection', nameVi: 'Bạt Phủ & Bảo Vệ' },
                  { id: 'cushions', name: 'Cushions & Pillows', nameVi: 'Đệm & Gối Ôm' },
                  { id: 'susans', name: 'Lazy Susans', nameVi: 'Mâm Xoay Bàn Ăn' },
                  { id: 'planters', name: 'Plinths & Planters', nameVi: 'Chậu Cây & Bệ Đỡ' },
                ].map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleLinkClick(() => onNavigate('furniture', { category: 'accessories' }))}
                    className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                  >
                    <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                      {language === 'vi' ? acc.nameVi : acc.name}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}

            {/* SCREEN 9: MATERIALS */}
            {currentScreen === 'materials' && (
              <motion.div
                key="materials-screen"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.16 }}
                className="py-2"
              >
                {[
                  { id: 'ipe', name: 'Ipe Wood', nameVi: 'Gỗ Ipe Bolivia' },
                  { id: 'sunbrella', name: 'Sunbrella® Fabrics', nameVi: 'Vải Sunbrella®' },
                  { id: 'solara', name: 'Woven SOLARA Fiber', nameVi: 'Sợi Mây Đan SOLARA' },
                  { id: 'aluminum', name: 'Powder Coated Aluminum', nameVi: 'Nhôm Sơn Tĩnh Điện' },
                  { id: 'hpl', name: 'High Pressure Laminate', nameVi: 'Tấm Laminate HPL' },
                ].map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => handleLinkClick(() => onNavigate('materials'))}
                    className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/[0.05] active:bg-white/[0.1] cursor-pointer transition-colors min-h-[50px]"
                  >
                    <span className="text-[16px] sm:text-[17px] font-semibold text-white group-hover:text-[#9B522E] transition-colors">
                      {language === 'vi' ? mat.nameVi : mat.name}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM ACCENT BAR */}
        <div className="py-3 px-6 border-t border-white/10 flex items-center justify-between bg-[#0e0e0e] shrink-0 text-xs">
          <span className="text-white/50 tracking-wider text-[11.5px]">
            B+OPEN • Living beyond walls
          </span>
          <button
            onClick={() => handleLinkClick(() => onNavigate('how-to-buy'))}
            className="text-white/70 hover:text-white underline cursor-pointer text-[11.5px]"
          >
            {language === 'vi' ? 'Cách Mua Hàng' : 'How to Buy'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
