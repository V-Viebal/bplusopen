import React, { useState } from 'react';
import { Product } from '../types';
import { X, Trash2, Download, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { formatDimensionsSummary } from '../utils/dimensionUtils';

interface ProjectSpecDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProducts: Product[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
  onLocateShowroom: () => void;
}

export const ProjectSpecDrawer: React.FC<ProjectSpecDrawerProps> = ({
  isOpen,
  onClose,
  savedProducts,
  onRemoveProduct,
  onClearAll,
  onLocateShowroom,
}) => {
  const [isInquirySubmitted, setIsInquirySubmitted] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const { language } = useLanguage();
  const isVi = language === 'vi';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zip: '',
    projectNotes: '',
  });

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInquirySubmitted(true);
    setTimeout(() => {
      setIsInquirySubmitted(false);
      setShowInquiryForm(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        id="project-spec-drawer"
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#DED9CD]"
      >
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#DED9CD] bg-[#F8F6F2] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#9B522E] font-bold">
              {isVi ? 'Bảng Thông Số Kiến Trúc' : 'Architectural Spec Sheet'}
            </span>
            <h2 className="font-serif text-2xl text-[#1C1A17] mt-0.5">
              {isVi ? 'Hồ Sơ Dự Án Đã Lưu' : 'Project Specification'}
            </h2>
            <p className="text-xs text-[#6B5E52]">
              {isVi 
                ? `Đã lưu ${savedProducts.length} sản phẩm thiết kế` 
                : `${savedProducts.length} ${savedProducts.length === 1 ? 'Design Item' : 'Design Items'} Saved`}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#6B5E52] hover:text-[#1C1A17] hover:bg-[#EAE4D9] rounded-full transition-colors cursor-pointer"
            aria-label="Close spec sheet drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: List of Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F8F6F2] text-[#8C7A6B] flex items-center justify-center mx-auto border border-[#DED9CD]">
                ✕
              </div>
              <h3 className="font-serif text-lg text-[#1C1A17]">
                {isVi ? 'Bảng Dự Án Của Bạn Đang Trống' : 'Your Spec Sheet is Empty'}
              </h3>
              <p className="text-xs text-[#6B5E52] max-w-xs mx-auto">
                {isVi
                  ? 'Khám phá các bộ sưu tập và nhấn nút lưu trên bất kỳ sản phẩm nào để tổng hợp bảng thông số dự án riêng.'
                  : 'Explore our collections and click the bookmark button on any piece to compile a custom design project spec sheet.'}
              </p>
            </div>
          ) : (
            <>
              {savedProducts.map((p) => {
                const displayName = isVi && p.nameVi ? p.nameVi : p.name;
                return (
                  <div
                    key={p.id}
                    className="flex gap-4 p-3 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs relative group"
                  >
                    <img
                      src={p.imageUrl}
                      alt={displayName}
                      className="w-20 h-20 object-cover rounded-xs border border-[#DED9CD] shrink-0"
                    />

                    <div className="flex-1 min-w-0 pr-6">
                      <div className="text-[10px] uppercase tracking-wider text-[#9B522E] font-semibold">
                        {p.collection} • {p.sku}
                      </div>
                      <h4 className="font-serif text-sm font-medium text-[#1C1A17] truncate">
                        {displayName}
                      </h4>
                      <p className="text-[11px] text-[#6B5E52] mt-0.5 font-mono">
                        {formatDimensionsSummary(p.dimensions)}
                      </p>
                      <div className="text-[10px] text-[#4A7C59] font-medium mt-1">
                        {isVi ? '100% Gỗ Ipe Bolivia FSC®' : '100% FSC® Bolivian Ipe'}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveProduct(p.id)}
                      className="absolute top-3 right-3 text-[#9C8E82] hover:text-[#B23B2A] transition-colors cursor-pointer"
                      title={isVi ? 'Xóa mục' : 'Remove item'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}

              <div className="pt-2 flex justify-between items-center text-xs">
                <button
                  onClick={onClearAll}
                  className="text-[#9C8E82] hover:text-[#B23B2A] underline cursor-pointer"
                >
                  {isVi ? 'Xóa tất cả' : 'Clear all items'}
                </button>
                <span className="text-[#6B5E52]">
                  {isVi ? `Tổng cộng: ${savedProducts.length} sản phẩm` : `Total: ${savedProducts.length} unique pieces`}
                </span>
              </div>
            </>
          )}

          {/* Quick Inquiry Form if active */}
          {showInquiryForm && savedProducts.length > 0 && (
            <div className="mt-4 p-4 bg-white border border-[#9B522E] rounded-xs space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-serif text-base text-[#1C1A17]">
                  {isVi ? 'Yêu Cầu Báo Giá Đại Lý Ủy Quyền' : 'Request Dealer Pricing Quote'}
                </h4>
                <button onClick={() => setShowInquiryForm(false)} className="text-xs text-gray-400">✕</button>
              </div>

              {isInquirySubmitted ? (
                <div className="text-center py-4 text-[#4A7C59] space-y-1">
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                  <div className="font-serif text-sm font-semibold">
                    {isVi ? 'Gửi Yêu Cầu Thành Công' : 'Inquiry Sent Successfully'}
                  </div>
                  <div className="text-[11px] text-gray-600">
                    {isVi 
                      ? 'Đại diện đại lý địa phương sẽ liên hệ bạn cung cấp báo giá và phương án vận chuyển.'
                      : 'Your local dealer representative will contact you with pricing and freight logistics.'}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-2 text-xs">
                  <input
                    required
                    type="text"
                    placeholder={isVi ? 'Họ và tên của bạn' : 'Your Name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs"
                  />
                  <input
                    required
                    type="email"
                    placeholder={isVi ? 'Địa chỉ Email' : 'Email Address'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      required
                      type="tel"
                      placeholder={isVi ? 'Số điện thoại' : 'Phone Number'}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs"
                    />
                    <input
                      required
                      type="text"
                      placeholder={isVi ? 'Mã bưu chính / Tỉnh thành' : 'Zip Code'}
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full p-2 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder={isVi ? 'Ghi chú (sở thích màu vải, tiến độ bàn giao công trình)...' : 'Notes (e.g. fabric preference, installation timeline)...'}
                    value={formData.projectNotes}
                    onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
                    className="w-full p-2 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#9B522E] hover:bg-[#2A1D15] text-white font-semibold uppercase tracking-wider text-[11px] transition-colors cursor-pointer"
                  >
                    {isVi ? 'Gửi Hồ Sơ Tới Đại Lý' : 'Submit Spec to Local Dealer'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {savedProducts.length > 0 && (
          <div className="p-6 border-t border-[#DED9CD] bg-[#F8F6F2] space-y-2.5">
            <button
              onClick={() => setShowInquiryForm(true)}
              className="w-full py-3.5 bg-[#9B522E] hover:bg-[#2A1D15] text-white text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isVi ? 'Yêu Cầu Báo Giá Đại Lý' : 'Request Dealer Price Quote'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="w-full py-3 bg-white hover:bg-[#F8F6F2] text-[#2A1D15] border border-[#DED9CD] text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isVi ? 'Xuất / In Bảng Thông Số Kỹ Thuật (PDF)' : 'Export / Print Spec Sheet (PDF)'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onLocateShowroom();
              }}
              className="w-full py-2 text-center text-[11px] text-[#7A6B5F] hover:text-[#1C1A17] font-medium underline cursor-pointer"
            >
              {isVi ? 'Tìm showroom gần nhất trưng bày bộ sưu tập này' : 'Find nearest showroom with these collections'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
