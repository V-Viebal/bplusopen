import React from 'react';
import { Product } from '../types';
import { Eye, Bookmark, Check, TreePine } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DeleteProductButton } from './DeleteProductButton';
import { formatCompactDimensions } from '../utils/dimensionUtils';
import { InlineEditableImage } from './InlineEditableImage';
import { InlineEditableText } from './InlineEditableText';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
  isSaved: boolean;
  onToggleSave: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenModal,
  isSaved,
  onToggleSave,
}) => {
  const { language, t } = useLanguage();
  const isVi = language === 'vi';
  const displayName = (isVi && product.nameVi) ? product.nameVi : product.name;
  const displayDescription = (isVi && product.descriptionVi) ? product.descriptionVi : product.description;
  const displayMaterial = (isVi && product.materialVi) ? product.materialVi : product.material;

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white border border-[#DED9CD] flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-[#F7F4EE] overflow-hidden">
        <InlineEditableImage
          record="product"
          recordId={product.id}
          field="imageUrl"
          value={product.imageUrl}
          alt={displayName}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <DeleteProductButton product={product} className="absolute bottom-3 right-3" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider bg-[#221F1C]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-xs shadow-sm">
            <InlineEditableText record="product" recordId={product.id} field="collection" value={product.collection} as="span" label="Collection ID" />
          </span>
          {product.cadAvailable && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#798E9D]/95 backdrop-blur-xs text-white px-2 py-0.5 rounded-xs shadow-sm">
              CAD Ready
            </span>
          )}
        </div>

        {/* Save to Project Spec Sheet Button (Enlarged 40x40 touch target) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(product);
          }}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer min-w-[40px] min-h-[40px] ${
            isSaved
              ? 'bg-[#9B522E] text-white'
              : 'bg-white/95 text-[#221F1C] hover:bg-white hover:text-[#9B522E]'
          }`}
          title={isSaved ? t('catalog.removeFromSpec') : t('catalog.addToSpec')}
          aria-label={isSaved ? t('catalog.removeFromSpec') : t('catalog.addToSpec')}
        >
          {isSaved ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Bookmark className="w-5 h-5 stroke-[2]" />}
        </button>

        {/* Quick View Hover Bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <button
            onClick={() => onOpenModal(product)}
            className="w-full py-2.5 bg-white/95 hover:bg-[#9B522E] text-[#221F1C] hover:text-white text-[12px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer min-h-[40px]"
          >
            <Eye className="w-4 h-4" />
            <span>{t('catalog.viewSpecs')}</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[12px] sm:text-[12.5px] text-[#7A6B5F] font-semibold uppercase tracking-wider mb-1.5">
            <span className="line-clamp-1"><InlineEditableText record="product" recordId={product.id} field={isVi ? 'materialVi' : 'material'} value={displayMaterial} as="span" label={isVi ? 'Vật liệu tiếng Việt' : 'Material'} /></span>
            <span className="text-[#99887A]">SKU: <InlineEditableText record="product" recordId={product.id} field="sku" value={product.sku} as="span" label="SKU" /></span>
          </div>

          <h3 
            onClick={() => onOpenModal(product)}
            className="font-serif text-[18px] sm:text-xl text-[#1C1A17] font-semibold leading-snug hover:text-[#9B522E] transition-colors cursor-pointer mb-2"
          >
            <InlineEditableText record="product" recordId={product.id} field={isVi ? 'nameVi' : 'name'} value={displayName} as="span" label={isVi ? 'Tên sản phẩm tiếng Việt' : 'Product name'} />
          </h3>

          <p className="text-[13.5px] sm:text-[14px] text-[#554C42] line-clamp-2 leading-relaxed mb-3">
            <InlineEditableText record="product" recordId={product.id} field={isVi ? 'descriptionVi' : 'description'} value={displayDescription} as="span" multiline label={isVi ? 'Mô tả sản phẩm tiếng Việt' : 'Product description'} />
          </p>
        </div>

        {/* Dimensions & Footer Actions */}
        <div className="pt-3 border-t border-[#F0EBE3] space-y-2.5">
          <div className="text-[12.5px] sm:text-[13px] text-[#6B5E52] flex justify-between items-center">
            <span className="font-medium">{t('catalog.dimensions')}:</span>
            <span className="font-bold text-[#1C1A17]">{formatCompactDimensions(product.dimensions.width, product.dimensions.depth)}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="inline-flex items-center gap-1 text-[12px] text-[#55693C] font-semibold">
              <TreePine className="w-3.5 h-3.5" />
              <span>{product.collection === 'luma' ? 'LUMA 2026' : '100% FSC® Certified'}</span>
            </span>

            <button
              onClick={() => onOpenModal(product)}
              className="px-3 py-1.5 rounded-xs bg-[#9B522E]/10 hover:bg-[#9B522E] text-[#9B522E] hover:text-white text-[12.5px] font-bold uppercase tracking-wider transition-colors cursor-pointer min-h-[38px] flex items-center"
            >
              {t('catalog.details')} &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
