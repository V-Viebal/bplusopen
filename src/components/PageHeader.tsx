import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  breadcrumb: string;
  onNavigateHome: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  breadcrumb,
  onNavigateHome,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  return (
    <div className="bg-[#2A1D15] text-white pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-[#3E2C22] relative overflow-hidden">
      {/* Subtle architectural background watermark */}
      <div 
        aria-hidden="true" 
        className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none bg-repeat bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs uppercase tracking-[0.18em] text-[#9B522E] mb-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 text-[#9B522E] hover:text-white transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isVi ? 'Trang Chủ' : 'Home'}</span>
          </button>
          <ChevronRight className="w-3 h-3 text-white/40" />
          <span className="text-white/80 font-medium">{breadcrumb}</span>
        </nav>

        {/* Optional Overline Badge */}
        {badge && (
          <span className="inline-block text-[11px] uppercase tracking-[0.25em] font-semibold text-[#9B522E] mb-2 bg-[#3E2C22]/80 px-2.5 py-1 rounded-xs border border-[#9B522E]">
            {badge}
          </span>
        )}

        {/* Page Title */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#F8F6F2]">
          {title}
        </h1>

        {/* Page Subtitle / Narrative */}
        {description && (
          <p className="mt-3 max-w-3xl text-sm sm:text-base text-[#D6C7BA] font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
