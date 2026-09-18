import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ARTICLES_DATA, ArticleItem } from '../data/articlesData';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { 
  Calendar, 
  ArrowRight, 
  Search, 
  ExternalLink, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Share2, 
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ArticlesPageProps {
  onNavigate: (page: PageId, extra?: any) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Categories list
  const categories = useMemo(() => {
    return [
      { id: 'all', en: 'All Articles', vi: 'Tất Cả Tin Tức' },
      { id: 'appointments', en: 'Appointments', vi: 'Bổ Nhiệm & Nhân Sự' },
      { id: 'events', en: 'Events & Markets', vi: 'Sự Kiện & Triển Lãm' },
      { id: 'awards', en: 'Awards & Honors', vi: 'Giải Thưởng & Vinh Danh' },
      { id: 'corporate', en: 'Corporate News', vi: 'Tin Doanh Nghiệp' },
      { id: 'media', en: 'Videos & Media', vi: 'Video & Tri Thức' }
    ];
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      // Category match
      let matchCat = true;
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'appointments') matchCat = art.categoryEn === 'Appointments';
        else if (selectedCategory === 'events') matchCat = art.categoryEn === 'Events & Markets';
        else if (selectedCategory === 'awards') matchCat = art.categoryEn === 'Awards & Recognition';
        else if (selectedCategory === 'corporate') matchCat = art.categoryEn.includes('Corporate') || art.categoryEn.includes('Heritage');
        else if (selectedCategory === 'media') matchCat = art.categoryEn === 'Videos & Media' || art.categoryEn === 'Showrooms';
      }

      // Search query match
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchSearch = 
          art.title.toLowerCase().includes(q) ||
          art.titleVi.toLowerCase().includes(q) ||
          art.excerpt.toLowerCase().includes(q) ||
          art.excerptVi.toLowerCase().includes(q) ||
          art.date.toLowerCase().includes(q);
      }

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Paginated articles
  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  // Handle share
  const handleShare = (art: ArticleItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(art.link || window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Next / Previous navigation in modal
  const currentIndex = activeArticle ? ARTICLES_DATA.findIndex(a => a.id === activeArticle.id) : -1;
  const prevArticle = currentIndex > 0 ? ARTICLES_DATA[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES_DATA.length - 1 ? ARTICLES_DATA[currentIndex + 1] : null;

  return (
    <div className="bg-[#FAF8F5] text-[#1C1A17] min-h-screen">

      {/* 1. COVER HERO VIDEO BANNER (Matching jensenoutdoor.com/articles exact cover block) */}
      <section className="relative w-full h-[340px] sm:h-[420px] lg:h-[480px] overflow-hidden bg-black flex items-center justify-center">
        {/* Background Sustainability / Heritage Video from Jensen Outdoor */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center opacity-65 brightness-[0.75]"
        >
          <source 
            src="https://www.jensenoutdoor.com/wp-content/uploads/2023/01/Homepage-5s-Sustainability.mp4" 
            type="video/mp4" 
          />
          {/* Fallback image */}
          <img 
            src="https://www.jensenoutdoor.com/wp-content/uploads/2024/02/JensenOutdoor_DanaCollection_FoundationsCollection_74-103InchTeakDiningTable_Lifetyle2-scaled.jpg" 
            alt="News and Events Banner" 
            className="w-full h-full object-cover" 
          />
        </video>

        {/* Dark Dim Overlay matching has-dark-background-color has-background-dim */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

        {/* Hero Title Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 sm:pt-28 flex flex-col items-center">
          <span className="text-[11px] sm:text-xs tracking-[0.3em] font-semibold text-[#C4A482] uppercase mb-3 drop-shadow-sm">
            {isVi ? 'BẢN TIN CHUYÊN NGÀNH & DI SẢN KIẾN TRÚC' : 'OFFICIAL PRESS, ARCHITECTURAL RECOGNITIONS & EVENTS'}
          </span>
          <h1 
            id="news-events" 
            className="text-3xl sm:text-5xl lg:text-6xl font-light text-white uppercase tracking-[0.18em] sm:tracking-[0.22em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]"
          >
            {isVi ? 'Tin Tức & Sự Kiện' : 'News & Events'}
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-white/80 max-w-2xl font-light tracking-wide leading-relaxed">
            {isVi 
              ? 'Cập nhật những giải thưởng thiết kế quốc tế, bước ngoặt thương hiệu, triển lãm kiến trúc và các hoạt động phát triển bền vững từ B+Open.'
              : 'Discover recent brand announcements, design excellence awards, upcoming trade market appearances, and updates in sustainable craftsmanship.'}
          </p>
        </div>
      </section>

      {/* 2. SUB-BAR: BREADCRUMBS + SEARCH & CATEGORY FILTER BAR */}
      <section className="border-b border-[#EAE3DA] bg-white sticky top-[106px] sm:top-[118px] lg:top-[126px] z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#7A6B5F] select-none">
              <button 
                onClick={() => onNavigate('home')} 
                className="hover:text-[#1C1A17] transition-colors cursor-pointer font-medium"
              >
                {isVi ? 'Trang Chủ' : 'Home'}
              </button>
              <span className="text-[#B5A89D]">/</span>
              <span className="text-[#1C1A17] font-semibold uppercase tracking-wider">
                {isVi ? 'Tin Tức & Sự Kiện' : 'News & Events'}
              </span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-[#F4EFEA] text-[10.5px] font-semibold text-[#8B5A2B]">
                {filteredArticles.length} {isVi ? 'bài viết' : 'articles'}
              </span>
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isVi ? 'Tìm kiếm bài viết, giải thưởng...' : 'Search articles, awards, reps...'}
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-[#FAF8F5] border border-[#D9CEBF] focus:border-[#5C3822] focus:bg-white rounded-xs transition-colors outline-none text-[#1C1A17] placeholder-[#8C7A6B]"
              />
              <Search className="w-3.5 h-3.5 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7A6B] hover:text-[#1C1A17] p-0.5 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Horizontal Scrolling on Mobile) */}
          <div className="flex items-center gap-2 pt-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.1em] rounded-xs transition-all cursor-pointer select-none ${
                    active
                      ? 'bg-[#1C1A17] text-white shadow-xs'
                      : 'bg-[#F2ECE4] text-[#5C5046] hover:bg-[#EAE3DA] hover:text-[#1C1A17]'
                  }`}
                >
                  {isVi ? cat.vi : cat.en}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MAIN ARTICLES FEED (Matching 2-Column Row Layout on jensenoutdoor.com/articles) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {displayedArticles.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#EAE3DA] rounded-xs p-8 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-[#B5A89D] mx-auto mb-3 stroke-[1.2]" />
            <h3 className="font-serif text-xl font-light text-[#1C1A17] mb-2">
              {isVi ? 'Không tìm thấy bài viết nào' : 'No Articles Found'}
            </h3>
            <p className="text-xs text-[#7A6B5F] mb-5">
              {isVi 
                ? 'Không có kết quả nào khớp với bộ lọc hoặc từ khóa tìm kiếm của bạn. Hãy thử chọn danh mục khác.'
                : 'No articles match your search filter criteria. Try resetting your search or filter options.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2 bg-[#1C1A17] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#5C3822] transition-colors cursor-pointer rounded-xs"
            >
              {isVi ? 'Xem Tất Cả Bài Viết' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-14">
            {displayedArticles.map((article, idx) => {
              const title = isVi ? article.titleVi : article.title;
              const excerpt = isVi ? article.excerptVi : article.excerpt;
              const categoryBadge = isVi ? article.category : article.categoryEn;

              return (
                <article 
                  key={article.id}
                  className={`group pt-10 sm:pt-12 first:pt-0 pb-10 sm:pb-12 border-b border-[#EAE3DA] last:border-b-0 transition-all`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center">
                    
                    {/* LEFT COLUMN: 16:9 FEATURED IMAGE (Exact match to jensenoutdoor.com) */}
                    <div className="md:col-span-6 lg:col-span-6">
                      <div 
                        onClick={() => setActiveArticle(article)}
                        className="relative aspect-[16/9] w-full overflow-hidden bg-[#ECE5DC] rounded-xs cursor-pointer shadow-xs border border-black/5 group-hover:shadow-md transition-shadow"
                      >
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                          loading={idx < 4 ? 'eager' : 'lazy'}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback image in case external hotlink has domain protection
                            (e.target as HTMLImageElement).src = 
                              'https://www.jensenoutdoor.com/wp-content/uploads/2024/02/JensenOutdoor_DanaCollection_FoundationsCollection_74-103InchTeakDiningTable_Lifetyle2-scaled.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        
                        {/* Category Badge overlay */}
                        <div className="absolute top-3 left-3 bg-[#1C1A17]/85 backdrop-blur-xs text-white px-2.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider rounded-xs">
                          {categoryBadge}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: DATE, TITLE, EXCERPT, AND DISCOVER MORE LINK */}
                    <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center space-y-3 sm:space-y-3.5">
                      
                      {/* Publication Date */}
                      <div className="flex items-center gap-2 text-[11.5px] sm:text-xs uppercase tracking-[0.14em] text-[#8C7A6B] font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#8B5A2B]" />
                        <time dateTime={article.date}>{article.date}</time>
                        <span className="text-[#C4A482]">•</span>
                        <span>{article.readTime || '3 min read'}</span>
                      </div>

                      {/* Post Title (Exact styling: uppercase, medium font size, line-height 1.5) */}
                      <h2 
                        onClick={() => setActiveArticle(article)}
                        className="text-base sm:text-lg md:text-xl lg:text-[21px] font-normal leading-[1.4] sm:leading-[1.45] text-[#1C1A17] uppercase tracking-[0.025em] hover:text-[#8B5A2B] transition-colors cursor-pointer"
                      >
                        {title}
                      </h2>

                      {/* Excerpt truncated 3 lines */}
                      <p className="text-xs sm:text-[13.5px] text-[#6B5E55] leading-relaxed line-clamp-3 font-light">
                        {excerpt}
                      </p>

                      {/* DISCOVER MORE » Link matching exact WordPress text */}
                      <div className="pt-1.5">
                        <button
                          onClick={() => setActiveArticle(article)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8B5A2B] hover:text-[#5C3822] group cursor-pointer"
                        >
                          <span>{isVi ? 'KHÁM PHÁ THÊM »' : 'DISCOVER MORE »'}</span>
                        </button>
                      </div>

                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* 4. LOAD MORE ARTICLES BUTTON */}
        {visibleCount < filteredArticles.length && (
          <div className="mt-14 sm:mt-16 text-center border-t border-[#EAE3DA] pt-10">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 8, filteredArticles.length))}
              className="px-8 py-3.5 bg-[#1C1A17] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#5C3822] transition-colors shadow-sm cursor-pointer rounded-xs inline-flex items-center gap-2"
            >
              <span>{isVi ? `Xem Thêm Bài Viết (${filteredArticles.length - visibleCount} còn lại)` : `Load More Articles (${filteredArticles.length - visibleCount} remaining)`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 5. BOTTOM EDITORIAL FEATURE CARD (Living Beyond Walls Journal) */}
        <section className="mt-20 border border-[#EAE3DA] bg-white p-6 sm:p-10 rounded-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8B5A2B]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isVi ? 'Tập San Kiến Trúc B+Open' : 'The B+Open Journal'}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1C1A17]">
                {isVi ? 'Nhận Bản Tin Chuyên Đề & Ấn Phẩm Thiết Kế Định Kỳ' : 'Stay Connected to Sustainable Luxury & Design Insights'}
              </h3>
              <p className="text-xs sm:text-sm text-[#7A6B5F] font-light leading-relaxed max-w-2xl">
                {isVi 
                  ? 'Đăng ký để nhận sớm nhất các thông tin ra mắt bộ sưu tập mới, tài liệu phân tích kỹ thuật gỗ Ipe và các chương trình đặc quyền cho giới thiết kế.'
                  : 'Receive timely notifications of new product debuts, architectural case studies, trade market events, and seasonal collections delivered directly to your inbox.'}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => onNavigate('trade')}
                className="w-full py-3 px-6 bg-[#1C1A17] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#5C3822] transition-colors text-center cursor-pointer rounded-xs"
              >
                {isVi ? 'Đăng Ký Thành Viên Trade' : 'Join Trade Program'}
              </button>
              <button
                onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
                className="w-full py-3 px-6 border border-[#1C1A17] text-[#1C1A17] text-xs font-semibold uppercase tracking-widest hover:bg-[#FAF8F5] transition-colors text-center cursor-pointer rounded-xs"
              >
                {isVi ? 'Tìm Showroom & Đại Lý' : 'Find Showrooms & Dealers'}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 6. ARTICLE DETAIL SLIDE-OVER READER MODAL */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className="w-full max-w-2xl lg:max-w-3xl min-h-full bg-white text-[#1C1A17] p-6 sm:p-10 shadow-2xl overflow-y-auto relative animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Controls */}
            <div className="flex items-center justify-between pb-5 border-b border-[#EAE3DA] mb-6 sticky top-0 bg-white/95 backdrop-blur-xs z-20">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase font-semibold tracking-widest text-[#8B5A2B] bg-[#F7F2EB] px-2.5 py-1 rounded-xs">
                  {isVi ? activeArticle.category : activeArticle.categoryEn}
                </span>
                <span className="text-xs text-[#8C7A6B]">•</span>
                <span className="text-xs text-[#8C7A6B] font-medium">{activeArticle.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(activeArticle)}
                  className="p-2 text-[#7A6B5F] hover:text-[#1C1A17] hover:bg-[#FAF8F5] rounded-xs transition-colors cursor-pointer"
                  title="Share Article Link"
                  aria-label="Share Article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 text-[#7A6B5F] hover:text-[#1C1A17] hover:bg-[#FAF8F5] rounded-xs transition-colors cursor-pointer"
                  title="Close Reader"
                  aria-label="Close Reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Copied alert badge */}
            {copiedLink && (
              <div className="mb-4 py-2 px-3 bg-[#2D3E35] text-white text-xs font-semibold rounded-xs flex items-center justify-between animate-in fade-in">
                <span>{isVi ? 'Đã sao chép liên kết bài viết vào bộ nhớ tạm!' : 'Article link copied to clipboard!'}</span>
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setCopiedLink(false)} />
              </div>
            )}

            {/* Article Headline */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-[#1C1A17] leading-snug tracking-tight uppercase mb-6">
              {isVi ? activeArticle.titleVi : activeArticle.title}
            </h1>

            {/* Featured Image */}
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xs bg-[#ECE5DC] mb-6 shadow-xs border border-[#EAE3DA]">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Author Byline & Read time */}
            <div className="flex items-center justify-between py-3 border-y border-[#EAE3DA] text-xs text-[#7A6B5F] mb-6 font-light">
              <div>
                {isVi ? 'Ban Biên Tập:' : 'By:'}{' '}
                <strong className="font-semibold text-[#1C1A17]">{activeArticle.author || 'B+Open Press Team'}</strong>
              </div>
              <div>{activeArticle.readTime || '3 min read'}</div>
            </div>

            {/* Full Body / Detailed Press Release Text */}
            <div className="space-y-4 text-sm sm:text-base text-[#4A4036] leading-relaxed font-light">
              <p className="font-normal text-[#1C1A17] text-base sm:text-lg leading-relaxed">
                {isVi ? activeArticle.excerptVi : activeArticle.excerpt}
              </p>

              <p>
                {isVi 
                  ? 'Là biểu tượng dẫn đầu Bắc Mỹ về nội thất gỗ ngoài trời sang trọng và bền vững, B+Open luôn khẳng định cam kết gìn giữ các giá trị di sản rừng Bolivia kết hợp cùng nghệ thuật tạo tác thủ công chuẩn mực.'
                  : 'As North America’s premier manufacturer of sustainably harvested, heirloom luxury outdoor furniture, B+Open continues to elevate outdoor living spaces across the globe with timeless craftsmanship and rigorous environmental stewardship.'}
              </p>

              <blockquote className="border-l-2 border-[#8B5A2B] pl-4 py-1.5 my-6 text-sm sm:text-base italic text-[#5C3822] bg-[#FAF8F5]">
                {isVi 
                  ? '“Mỗi bước tiến, mỗi giải thưởng và mỗi nhân sự mới đều phản ánh tinh thần Made to Inspire — kiến tạo những giá trị vượt thời gian cho thế hệ hôm nay và mai sau.”'
                  : '“Every milestone, accolade, and appointment reflects our foundational philosophy: Made to Inspire. We are committed to crafting furniture that endures for generations.”'}
              </blockquote>

              <p>
                {isVi 
                  ? 'Quý đối tác thiết kế, nhà phân phối và khách hàng có thể liên hệ trực tiếp với chúng tôi hoặc ghé thăm các showroom chính thức tại Atlanta, Chicago và High Point để trải nghiệm thực tế các bộ sưu tập mới nhất.'
                  : 'Trade partners, showroom directors, and prospective residential clients are invited to connect with their regional sales representatives or visit flagship showrooms during upcoming markets.'}
              </p>
            </div>

            {/* External Official Link Button */}
            <div className="mt-8 pt-6 border-t border-[#EAE3DA] flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={activeArticle.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#8B5A2B] text-white text-xs uppercase font-semibold tracking-wider hover:bg-[#5C3822] transition-colors rounded-xs"
              >
                <span>{isVi ? 'Đọc Toàn Văn Trên B+Open' : 'View Original on B+Open'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Prev / Next Article Switchers */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                {prevArticle && (
                  <button
                    onClick={() => setActiveArticle(prevArticle)}
                    className="p-2 border border-[#EAE3DA] hover:bg-[#FAF8F5] text-xs flex items-center gap-1 cursor-pointer rounded-xs"
                    title={isVi ? 'Bài trước' : 'Previous article'}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">{isVi ? 'Trước' : 'Prev'}</span>
                  </button>
                )}
                {nextArticle && (
                  <button
                    onClick={() => setActiveArticle(nextArticle)}
                    className="p-2 border border-[#EAE3DA] hover:bg-[#FAF8F5] text-xs flex items-center gap-1 cursor-pointer rounded-xs"
                    title={isVi ? 'Bài kế tiếp' : 'Next article'}
                  >
                    <span className="hidden sm:inline">{isVi ? 'Kế tiếp' : 'Next'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
