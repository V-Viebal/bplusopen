import React, { useState } from 'react';
import { Product, FabricSwatch } from '../types';
import { FABRIC_SWATCHES } from '../data/furnitureData';
import { X, Check, Bookmark, Download, MapPin, TreePine, Ruler } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { InlineEditableImage } from './InlineEditableImage';
import { InlineEditableText } from './InlineEditableText';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (product: Product) => void;
  onLocateShowroom: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isSaved,
  onToggleSave,
  onLocateShowroom,
}) => {
  if (!product) return null;

  const { language, t } = useLanguage();
  const isVi = language === 'vi';

  const [activeImage, setActiveImage] = useState<string>(product.imageUrl);
  const [selectedFabric, setSelectedFabric] = useState<FabricSwatch>(FABRIC_SWATCHES[0]);
  const [selectedFinish, setSelectedFinish] = useState<'chocolate' | 'silver'>('chocolate');

  const allImages = [product.imageUrl, product.lifestyleImageUrl, ...product.secondaryImages];

  const handlePrintSpec = () => {
    window.print();
  };

  const displayName = isVi && product.nameVi ? product.nameVi : product.name;
  const displayDesc = isVi && product.descriptionVi ? product.descriptionVi : product.description;
  const displayFeatures = isVi && product.featuresVi ? product.featuresVi : product.features;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="product-detail-modal"
        className="relative bg-white w-full max-w-5xl rounded-sm shadow-2xl overflow-hidden border border-[#DED9CD] my-8 max-h-[90vh] flex flex-col"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#DED9CD] bg-[#F8F6F2]">
          <div className="flex items-center gap-3">
            <span className="text-[11px] sm:text-[10px] uppercase tracking-widest font-bold bg-[#9B522E] text-white px-3 py-1 rounded-xs">
              <InlineEditableText record="product" recordId={product.id} field="collection" value={product.collection} as="span" label="Collection ID" />
            </span>
            <span className="text-[13px] sm:text-xs text-[#5C5046] font-semibold tracking-wider uppercase">
              SKU: <InlineEditableText record="product" recordId={product.id} field="sku" value={product.sku} as="span" label="SKU" />
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center text-[#5C5046] hover:text-[#1C1A17] hover:bg-[#EAE4D9] rounded-full transition-colors cursor-pointer"
            aria-label="Close product modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left: Image Gallery & Finish Preview */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Large Image */}
            <div className="relative aspect-[4/3] bg-[#F3EEE6] border border-[#DED9CD] overflow-hidden rounded-xs">
              {activeImage === product.imageUrl ? (
                <InlineEditableImage
                  record="product"
                  recordId={product.id}
                  field="imageUrl"
                  value={activeImage}
                  alt={displayName}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={activeImage}
                  alt={displayName}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
              )}
              
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 text-[12px] sm:text-[11px] text-white rounded-xs">
                {isVi ? 'Bề mặt gỗ:' : 'Finish:'} {selectedFinish === 'chocolate' 
                  ? (isVi ? 'Hổ phách Chocolate ấm áp' : 'Lustrous Chocolate Amber') 
                  : (isVi ? 'Bạc phong hóa tự nhiên' : 'Weathered Silver Driftwood')}
              </div>

              {selectedFabric && product.availableFabrics && (
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[12px] sm:text-[11px] text-[#2A1D15] font-medium flex items-center gap-2 border border-[#DED9CD] rounded-xs shadow-xs">
                  <span 
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: selectedFabric.colorHex }}
                  />
                  <span>{isVi && selectedFabric.nameVi ? selectedFabric.nameVi : selectedFabric.name}</span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-18 h-18 sm:w-20 sm:h-20 shrink-0 border overflow-hidden transition-all cursor-pointer rounded-xs ${
                    activeImage === img
                      ? 'border-[#9B522E] ring-2 ring-[#9B522E]'
                      : 'border-[#DED9CD] opacity-75 hover:opacity-100'
                  }`}
                >
                  <InlineEditableImage
                    record="product"
                    recordId={product.id}
                    field={idx === 0 ? 'imageUrl' : idx === 1 ? 'lifestyleImageUrl' : 'secondaryImages'}
                    arrayIndex={idx >= 2 ? idx - 2 : undefined}
                    arrayField={idx >= 2 ? 'secondaryImages' : undefined}
                    arrayValues={idx >= 2 ? product.secondaryImages : undefined}
                    value={img}
                    alt={`View ${idx + 1}`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80';
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Timber Finish Simulator Toggle */}
            <div className="p-4 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#1C1A17]">
                  {isVi ? 'Tùy Chọn Bề Mặt Gỗ Ipe' : 'Timber Finish Option'}
                </span>
                <span className="text-[12px] text-[#6B5E52] font-medium">
                  {isVi ? '100% Gỗ Ipe Bolivia' : '100% Solid Bolivian Ipe'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setSelectedFinish('chocolate')}
                  className={`min-h-[50px] py-2.5 px-3.5 text-xs font-medium border text-left transition-all cursor-pointer rounded-xs ${
                    selectedFinish === 'chocolate'
                      ? 'bg-[#9B522E] text-white border-[#9B522E] shadow-xs'
                      : 'bg-white text-[#2E2823] border-[#DED9CD] hover:bg-[#F3EEE6]'
                  }`}
                >
                  <div className="font-bold text-[13px]">{isVi ? 'Nâu Chocolate' : 'Chocolate Amber'}</div>
                  <div className="text-[11px] opacity-90 mt-0.5">{isVi ? 'Phủ bảo dưỡng B+Open Shield' : 'Wood Shield + Penofin Treated'}</div>
                </button>
                <button
                  onClick={() => setSelectedFinish('silver')}
                  className={`min-h-[50px] py-2.5 px-3.5 text-xs font-medium border text-left transition-all cursor-pointer rounded-xs ${
                    selectedFinish === 'silver'
                      ? 'bg-[#798E9D] text-white border-[#798E9D] shadow-xs'
                      : 'bg-white text-[#2E2823] border-[#DED9CD] hover:bg-[#F3EEE6]'
                  }`}
                >
                  <div className="font-bold text-[13px]">{isVi ? 'Ánh Bạc Patina' : 'Silver Patina'}</div>
                  <div className="text-[11px] opacity-90 mt-0.5">{isVi ? 'Phong hóa tự nhiên sau 9-12 tháng' : 'Naturally Weathered 9-12 mos'}</div>
                </button>
              </div>
            </div>

            {/* Sunbrella Fabric Swatch Picker */}
            {product.availableFabrics && (
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold uppercase tracking-wider text-[#1C1A17]">
                    {isVi ? 'Vải Đệm Sunbrella®' : 'Sunbrella® Cushion Fabrics'}
                  </span>
                  <span className="text-[12px] text-[#9B522E] font-bold">
                    {isVi && selectedFabric.nameVi ? selectedFabric.nameVi : selectedFabric.name} ({selectedFabric.code})
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {FABRIC_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.id}
                      onClick={() => setSelectedFabric(swatch)}
                      className={`min-h-[56px] p-2 rounded-xs border text-left flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedFabric.id === swatch.id
                          ? 'border-[#9B522E] bg-[#F8F6F2] ring-2 ring-[#9B522E]'
                          : 'border-[#DED9CD] bg-white hover:bg-[#F8F6F2]'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-full shadow-inner border border-black/15 shrink-0"
                        style={{ backgroundColor: swatch.colorHex }}
                      />
                      <span className="text-[11px] font-semibold text-[#2E2823] text-center leading-tight truncate w-full">
                        {isVi && swatch.nameVi ? swatch.nameVi : swatch.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right: Specifications & Inquiries */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-[13px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#9B522E] mb-1">
                {product.collection} {isVi ? 'Bộ sưu tập' : 'Ensemble'}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1C1A17] leading-tight mb-2">
                <InlineEditableText record="product" recordId={product.id} field={isVi ? 'nameVi' : 'name'} value={displayName} as="span" label={isVi ? 'Tên sản phẩm tiếng Việt' : 'Product name'} />
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#554C42] leading-relaxed">
                <InlineEditableText record="product" recordId={product.id} field={isVi ? 'descriptionVi' : 'description'} value={displayDesc} as="span" multiline label={isVi ? 'Mô tả sản phẩm tiếng Việt' : 'Product description'} />
              </p>
            </div>

            {/* Dimensions Table */}
            <div className="border border-[#DED9CD] bg-[#F8F6F2] p-4.5 rounded-xs">
              <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-[#1C1A17] mb-3">
                <Ruler className="w-4 h-4 text-[#9B522E]" />
                <span>{isVi ? 'Thông Số Kỹ Thuật (mm)' : 'Technical Dimensions (mm)'}</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                <div>
                  <span className="text-[#6B5E52] block text-[12px]">{isVi ? 'Chiều Rộng:' : 'Width:'}</span>
                  <span className="font-bold text-[14px] text-[#1C1A17]">{product.dimensions.width}</span>
                </div>
                <div>
                  <span className="text-[#6B5E52] block text-[12px]">{isVi ? 'Chiều Sâu:' : 'Depth:'}</span>
                  <span className="font-bold text-[14px] text-[#1C1A17]">{product.dimensions.depth}</span>
                </div>
                <div>
                  <span className="text-[#6B5E52] block text-[12px]">{isVi ? 'Chiều Cao:' : 'Height:'}</span>
                  <span className="font-bold text-[14px] text-[#1C1A17]">{product.dimensions.height}</span>
                </div>
                {product.dimensions.seatHeight && (
                  <div>
                    <span className="text-[#6B5E52] block text-[12px]">{isVi ? 'Chiều Cao Mặt Ngồi:' : 'Seat Height:'}</span>
                    <span className="font-bold text-[14px] text-[#1C1A17]">{product.dimensions.seatHeight}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Craftsmanship Features */}
            <div className="space-y-2.5">
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#1C1A17] block">
                {isVi ? 'Kỹ Thuật Chế Tác & Bền Vững' : 'Engineering & Sustainability'}
              </span>
              <ul className="space-y-2 text-[14px] text-[#443D36]">
                {displayFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#737D5A] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2.5">
                  <TreePine className="w-4 h-4 text-[#737D5A] shrink-0 mt-0.5" />
                  <span>{isVi ? 'Khai thác từ 100% rừng Ipe khô nhiệt đới Bolivia có chứng nhận FSC®' : 'Harvested from 100% FSC®-certified Bolivian dry-tropical forest'}</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Add to Spec Sheet */}
              <button
                onClick={() => onToggleSave(product)}
                className={`w-full min-h-[48px] py-3.5 px-4 text-[13px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 transition-all cursor-pointer rounded-xs shadow-sm ${
                  isSaved
                    ? 'bg-[#737D5A] text-white hover:bg-[#60694B]'
                    : 'bg-[#9B522E] text-white hover:bg-[#854524]'
                }`}
              >
                {isSaved ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Bookmark className="w-4 h-4 stroke-[2.5]" />}
                <span>
                  {isSaved 
                    ? (isVi ? 'Đã Lưu Vào Bảng Dự Án' : 'Item Added to Project Spec Sheet')
                    : (isVi ? 'Thêm Vào Bảng Dự Án' : 'Add to Project Spec Sheet')}
                </span>
              </button>

              {/* Find in Showroom */}
              <button
                onClick={() => {
                  onClose();
                  onLocateShowroom();
                }}
                className="w-full min-h-[48px] py-3.5 px-4 bg-[#F8F6F2] hover:bg-[#EAE4D9] text-[#1C1A17] border border-[#DED9CD] text-[13px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 transition-colors cursor-pointer rounded-xs"
              >
                <MapPin className="w-4 h-4 text-[#9B522E]" />
                <span>{isVi ? 'Tìm Showroom & Đại Lý Ủy Quyền' : 'Locate at Authorized Dealer'}</span>
              </button>

              {/* Print / Download Spec Sheet */}
              <button
                onClick={handlePrintSpec}
                className="w-full min-h-[44px] py-2.5 text-[14px] text-[#5C5046] hover:text-[#1C1A17] font-semibold flex items-center justify-center gap-2 underline cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#9B522E]" />
                <span>{isVi ? 'In / Tải Xuống Bản Thông Số Kỹ Thuật PDF' : 'Print / Save Architecture Spec Sheet'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
