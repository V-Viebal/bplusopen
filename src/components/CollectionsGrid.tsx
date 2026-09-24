import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCatalogData } from '../context/CatalogDataContext';
import { InlineEditableText } from './InlineEditableText';
import { InlineEditableImage } from './InlineEditableImage';
import { getCollectionCardName } from '../utils/collectionDisplay';

interface CollectionsGridProps {
  onSelectCollection: (collectionId: string) => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({ onSelectCollection }) => {
  const { language, t } = useLanguage();
  const isVi = language === 'vi';
  const { collections } = useCatalogData();

  return (
    <section id="collections" className="py-20 sm:py-28 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#DED9CD]">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#9B522E] block mb-2">
              {t('collections.subtitle')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1A17] tracking-tight">
              {t('collections.title')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B5E52] font-light leading-relaxed">
              {t('collections.description')}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <a 
              href="#catalog" 
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#9B522E] hover:text-[#2A1D15] transition-colors"
            >
              <span>{t('collections.viewAll')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Collections Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => {
            const displayName = getCollectionCardName(
              col.id,
              language,
              isVi && col.nameVi ? col.nameVi : col.name,
            );
            const displayDesc = isVi && col.descriptionVi ? col.descriptionVi : col.description;
            const displaySpecs = isVi && col.highlightSpecsVi ? col.highlightSpecsVi : col.highlightSpecs;

            return (
              <div
                key={col.id}
                id={`collection-card-${col.id}`}
                className="group flex flex-col bg-white border border-[#DED9CD] overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Collection Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE4D9]">
                  <InlineEditableImage
                    record="collection"
                    recordId={col.id}
                    field="heroImage"
                    value={col.heroImage}
                    alt={displayName}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-[#2A1D15]/80 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-wider text-[#F8F6F2] font-semibold">
                    {col.primaryMaterial}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-[#2A1D15]">
                    {col.itemCount} {isVi ? 'Thiết Kế' : 'Pieces'}
                  </div>
                </div>

                {/* Collection Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#9B522E] font-semibold mb-1">
                      {isVi ? `Thiết kế bởi ${col.designer}` : `Designed by ${col.designer}`}
                    </div>
                    <h3 className="font-serif text-2xl text-[#1C1A17] font-normal group-hover:text-[#9B522E] transition-colors mb-2">
                      <InlineEditableText
                        record="collection"
                        recordId={col.id}
                        field={isVi ? 'nameVi' : 'name'}
                        value={displayName}
                        as="span"
                        label={isVi ? 'Tên collection tiếng Việt' : 'Collection name'}
                      />
                    </h3>
                    <p className="text-xs text-[#6B5E52] leading-relaxed mb-4 line-clamp-3">
                      <InlineEditableText
                        record="collection"
                        recordId={col.id}
                        field={isVi ? 'descriptionVi' : 'description'}
                        value={displayDesc}
                        as="span"
                        multiline
                        label={isVi ? 'Mô tả collection tiếng Việt' : 'Collection description'}
                      />
                    </p>
                  </div>

                  {/* Highlight specs */}
                  <div className="pt-4 border-t border-[#F0EBE3]">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {displaySpecs.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#F8F6F2] text-[#9B522E] px-2 py-0.5 rounded-xs border border-[#DED9CD]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => onSelectCollection(col.id)}
                      className="w-full py-2.5 px-4 bg-[#F8F6F2] hover:bg-[#9B522E] text-[#2A1D15] hover:text-white border border-[#DED9CD] hover:border-[#9B522E] text-xs font-semibold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{isVi ? `Khám Phá ${displayName}` : `Explore ${displayName}`}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
