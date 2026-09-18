import React, { useState } from 'react';
import { Download, CheckCircle2, X, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CatalogDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogDownloadModal: React.FC<CatalogDownloadModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [catalogType, setCatalogType] = useState('2026 Master Lookbook (PDF)');
  const [isDownloaded, setIsDownloaded] = useState(false);
  const { language } = useLanguage();
  const isVi = language === 'vi';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDownloaded(true);
    setTimeout(() => {
      setIsDownloaded(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-sm shadow-2xl border border-[#DED9CD] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-[#6B5E52] hover:text-[#1C1A17] hover:bg-[#F3EEE6] rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5 pb-4 border-b border-[#F0EBE3]">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#9B522E] font-bold">
            <BookOpen className="w-4 h-4" />
            <span>{isVi ? 'Ấn Phẩm Kỹ Thuật Số' : 'Digital Publications'}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] mt-1.5 leading-tight">
            {isVi ? 'Tải Xuống Catalog Bộ Sưu Tập 2026' : 'Download 2026 Collection Catalog'}
          </h3>
          <p className="text-[14px] text-[#554C42] mt-2 leading-relaxed">
            {isVi
              ? 'Khám phá 112 trang thiết kế phong cách sống ngoại thất sang trọng bền vững, thông số kỹ thuật kiến trúc, bảng màu vải Sunbrella và nguồn gốc xuất xứ gỗ Ipe.'
              : 'Explore 112 pages of award-winning sustainable luxury outdoor living, full architectural specifications, fabric palettes, and material provenance.'}
          </p>
        </div>

        {isDownloaded ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#737D5A] mx-auto" />
            <h4 className="font-serif text-2xl text-[#1C1A17]">
              {isVi ? 'Catalog Đã Sẵn Sàng' : 'Catalog Ready'}
            </h4>
            <p className="text-[14px] text-[#554C42]">
              {isVi 
                ? `Tệp tài liệu đang được tải xuống và đường liên kết lưu trữ vĩnh viễn đã gửi tới ${email}.`
                : `Your download has initiated, and a permanent link has been sent to ${email}.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] text-[#1C1A17] font-bold uppercase tracking-wider mb-1.5">
                {isVi ? 'Họ và Tên' : 'Full Name'}
              </label>
              <input
                required
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={isVi ? 'Nguyễn Văn C' : 'Eleanor Vance'}
                className="w-full min-h-[48px] p-3 text-[15px] bg-[#F8F6F2] border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E]"
              />
            </div>

            <div>
              <label className="block text-[13px] text-[#1C1A17] font-bold uppercase tracking-wider mb-1.5">
                {isVi ? 'Địa Chỉ Email' : 'Email Address'}
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eleanor@example.com"
                className="w-full min-h-[48px] p-3 text-[15px] bg-[#F8F6F2] border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E]"
              />
            </div>

            <div>
              <label className="block text-[13px] text-[#1C1A17] font-bold uppercase tracking-wider mb-1.5">
                {isVi ? 'Phiên Bản Ấn Phẩm' : 'Edition Requested'}
              </label>
              <select
                value={catalogType}
                onChange={(e) => setCatalogType(e.target.value)}
                className="w-full min-h-[48px] p-3 text-[14px] bg-[#F8F6F2] border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E] cursor-pointer"
              >
                <option value="2026 Master Lookbook (PDF)">
                  {isVi ? 'Ấn phẩm Master Lookbook 2026 (112 Trang, PDF độ phân giải cao)' : '2026 Master Lookbook (112 Pages, High Res PDF)'}
                </option>
                <option value="Trade & Hospitality Spec Guide">
                  {isVi ? 'Hồ Sơ Kỹ Thuật Dự Án Khách Sạn & Resort' : 'Trade & Hospitality Technical Spec Binder'}
                </option>
                <option value="Ipe Care & Restoration Guide">
                  {isVi ? 'Sổ Tay Chăm Sóc & Phục Hồi Gỗ Ipe Chuẩn Penofin' : 'Ipe Care, Weathering & Restoration Handbook'}
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full min-h-[48px] py-3.5 bg-[#9B522E] hover:bg-[#854524] text-white text-[13px] font-bold uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm rounded-xs"
            >
              <Download className="w-4 h-4" />
              <span>{isVi ? 'Tải Xuống Ngay' : 'Instant Digital Access'}</span>
            </button>

            <p className="text-[12px] text-[#6B5E52] text-center pt-1">
              {isVi 
                ? 'Chúng tôi tôn trọng quyền riêng tư của bạn. Không thư rác. Hủy đăng ký bất cứ lúc nào.' 
                : 'We respect your privacy. No spam. Unsubscribe at any time.'}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
