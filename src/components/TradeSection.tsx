import React, { useState } from 'react';
import { Layers, CheckCircle2, ShieldCheck, Mail, ArrowRight, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TradeSectionProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
}

export const TradeSection: React.FC<TradeSectionProps> = ({ isOpenModal, onCloseModal }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firmName: '',
    contactName: '',
    email: '',
    phone: '',
    role: 'Interior Designer',
    projectType: 'High-End Residential',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onCloseModal();
    }, 3000);
  };

  return (
    <>
      <section id="trade" className="py-20 sm:py-28 bg-[#F3EEE6] border-y border-[#EAE3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C5535]">
                  {isVi ? 'Đối Tác Kiến Trúc & Thiết Kế' : 'Architecture & Design Partners'}
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1A17] tracking-tight mt-1">
                  {isVi ? 'Chương Trình Đối Tác B+Open (Trade Program)' : 'The B+Open Trade Program'}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#6B5E52] leading-relaxed">
                {isVi
                  ? 'Được thiết kế chuyên biệt cho các kiến trúc sư, nhà thiết kế nội thất, đơn vị phát triển khu nghỉ dưỡng cao cấp, câu lạc bộ tư nhân và biệt thự sân vườn. Chúng tôi cung cấp hồ sơ kỹ thuật chuyên sâu, hỗ trợ tận tâm và độ bền di sản cho các dự án thương mại cũng như nhà ở cao cấp.'
                  : 'Tailored exclusively for licensed interior designers, landscape architects, luxury resorts, private clubs, and estate developers. We provide technical assets, white-glove support, and heirloom durability for demanding commercial and residential installations.'}
              </p>

              {/* Trade Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-[#EAE3DA] rounded-xs space-y-1">
                  <div className="flex items-center gap-2 text-[#5C3822] font-semibold text-xs uppercase tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>{isVi ? 'Thư Viện 2D/3D CAD & Revit' : '2D/3D CAD & Revit'}</span>
                  </div>
                  <p className="text-xs text-[#6B5E52]">
                    {isVi 
                      ? 'Tải ngay các file BIM, DWG, SketchUp chuẩn xác sẵn sàng cho phối cảnh render dự án.' 
                      : 'Complete downloadable BIM, DWG, and SketchUp models ready for immediate client rendering.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3DA] rounded-xs space-y-1">
                  <div className="flex items-center gap-2 text-[#5C3822] font-semibold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isVi ? 'Bảo Hành Thương Mại Dự Án' : 'Commercial Warranty'}</span>
                  </div>
                  <p className="text-xs text-[#6B5E52]">
                    {isVi 
                      ? 'Gỗ Ipe nguyên khối chống cháy Hạng A được gia cố để chịu tải mật độ khách lưu trú cao.' 
                      : 'Class A fire-rated solid Ipe engineered to withstand high-volume hospitality and coastal winds.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3DA] rounded-xs space-y-1">
                  <div className="flex items-center gap-2 text-[#5C3822] font-semibold text-xs uppercase tracking-wider">
                    <Building2 className="w-4 h-4" />
                    <span>{isVi ? 'Chính Sách Giá Dự Án Ưu Đãi' : 'Tiered Trade Pricing'}</span>
                  </div>
                  <p className="text-xs text-[#6B5E52]">
                    {isVi 
                      ? 'Chiết khấu theo khối lượng, ưu tiên giữ năng lực sản xuất và xuất container tận chân công trình.' 
                      : 'Volume discounts, reserved production allocations, and direct container drop-shipping.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3DA] rounded-xs space-y-1">
                  <div className="flex items-center gap-2 text-[#5C3822] font-semibold text-xs uppercase tracking-wider">
                    <Mail className="w-4 h-4" />
                    <span>{isVi ? 'Hộp Mẫu Vật Liệu Miễn Phí' : 'Complimentary Swatches'}</span>
                  </div>
                  <p className="text-xs text-[#6B5E52]">
                    {isVi 
                      ? 'Hộp mẫu gồm thanh gỗ Ipe thực tế, mẫu vải Sunbrella và mẫu dầu Penofin gửi tận văn phòng.' 
                      : 'Curated physical boxes containing Bolivian Ipe samples, Sunbrella swatches, and Penofin oils.'}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  id="trade-apply-btn"
                  onClick={() => {
                    const el = document.getElementById('trade-quick-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-3.5 px-8 bg-[#2A1D15] hover:bg-[#5C3822] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{isVi ? 'Đăng Ký Tài Khoản Đối Tác' : 'Apply for Trade Membership'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Quick Inquiry Card */}
            <div id="trade-quick-form" className="lg:col-span-5 bg-white border border-[#EAE3DA] p-6 sm:p-8 rounded-sm shadow-md">
              <div className="mb-4 pb-3 border-b border-[#F0EBE3]">
                <span className="text-[10px] uppercase tracking-wider text-[#8C5535] font-bold">
                  {isVi ? 'Đăng Ký Thành Viên Thiết Kế' : 'Direct Trade Registration'}
                </span>
                <h3 className="font-serif text-2xl text-[#1C1A17] mt-0.5">
                  {isVi ? 'Nhận Tài Liệu Dự Án & File CAD' : 'Request Trade Access & CAD Library'}
                </h3>
                <p className="text-xs text-[#6B5E52] mt-1">
                  {isVi 
                    ? 'Điền thông tin công ty để xác thực quyền lợi đối tác và nhận bảng chiết khấu dự án.' 
                    : 'Submit your firm details for immediate verification and trade discount tiering.'}
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#4A7C59] mx-auto" />
                  <h4 className="font-serif text-xl text-[#1C1A17]">
                    {isVi ? 'Đã Tiếp Nhận Hồ Sơ' : 'Application Received'}
                  </h4>
                  <p className="text-xs text-[#6B5E52]">
                    {isVi
                      ? 'Cảm ơn bạn. Đội ngũ Quản lý Dự án Kiến trúc của chúng tôi sẽ liên hệ phê duyệt và kích hoạt tài khoản CAD trong vòng 1 ngày làm việc.'
                      : 'Thank you. Our Architectural Project Management team in Virginia will review your credentials and issue your CAD access pass within one business day.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#2A1D15] font-semibold uppercase tracking-wider mb-1">
                      {isVi ? 'Tên Công Ty / Văn Phòng Thiết Kế' : 'Firm / Company Name'}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.firmName}
                      onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                      placeholder={isVi ? 'Ví dụ: Studio Arc West' : 'e.g. Studio Arc West'}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs focus:outline-none focus:border-[#5C3822]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#2A1D15] font-semibold uppercase tracking-wider mb-1">
                        {isVi ? 'Người Liên Hệ' : 'Contact Name'}
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder={isVi ? 'Nguyễn Văn A' : 'Sarah Jenkins'}
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs focus:outline-none focus:border-[#5C3822]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#2A1D15] font-semibold uppercase tracking-wider mb-1">
                        {isVi ? 'Vai Trò Chuyên Môn' : 'Professional Role'}
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs focus:outline-none focus:border-[#5C3822] cursor-pointer"
                      >
                        <option value="Interior Designer">{isVi ? 'Nhà Thiết Kế Nội Thất' : 'Interior Designer'}</option>
                        <option value="Landscape Architect">{isVi ? 'Kiến Trúc Sư Cảnh Quan' : 'Landscape Architect'}</option>
                        <option value="Architect">{isVi ? 'Kiến Trúc Sư Công Trình' : 'Architect'}</option>
                        <option value="Hospitality Developer">{isVi ? 'Chủ Đầu Tư Khách Sạn / Resort' : 'Hospitality Developer'}</option>
                        <option value="General Contractor">{isVi ? 'Tổng Thầu Thi Công' : 'General Contractor'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#2A1D15] font-semibold uppercase tracking-wider mb-1">
                      {isVi ? 'Email Doanh Nghiệp' : 'Professional Work Email'}
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="design@firm.com"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs focus:outline-none focus:border-[#5C3822]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2A1D15] font-semibold uppercase tracking-wider mb-1">
                      {isVi ? 'Quy Mô Dự Án & Ghi Chú' : 'Current Project Scope & Notes'}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={isVi ? 'Ví dụ: Resort ven biển 20 biệt thự tại Phú Quốc, quan tâm bàn ghế ăn & giường tắm nắng...' : 'e.g. 12-suite coastal resort in Maui, specifying dining & loungers...'}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs focus:outline-none focus:border-[#5C3822]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#5C3822] hover:bg-[#2A1D15] text-white font-semibold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    {isVi ? 'Gửi Hồ Sơ Đăng Ký' : 'Submit Trade Application'}
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Pop-up modal if triggered from header */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-sm shadow-2xl border border-[#EAE3DA] relative">
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer text-base"
            >
              ✕
            </button>

            <div className="mb-4 pb-2 border-b border-[#F0EBE3]">
              <span className="text-[10px] uppercase tracking-widest text-[#8C5535] font-bold">
                {isVi ? 'Chương Trình Đối Tác B+Open' : 'B+Open Trade Program'}
              </span>
              <h3 className="font-serif text-2xl text-[#1C1A17] mt-1">
                {isVi ? 'Đăng Ký Tài Khoản & Yêu Cầu Hộp Mẫu' : 'Trade Account & Sample Box Request'}
              </h3>
              <p className="text-xs text-[#6B5E52] mt-1">
                {isVi
                  ? 'Hưởng chiết khấu đặc quyền, hỗ trợ quản lý dự án chuyên nghiệp và tải thư viện file 3D CAD/BIM.'
                  : 'Enjoy tiered wholesale pricing, white glove project management, and high-resolution 3D CAD/BIM downloads.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#2A1D15] font-semibold uppercase tracking-wider mb-1">
                  {isVi ? 'Tên Công Ty / Văn Phòng' : 'Firm Name'}
                </label>
                <input
                  required
                  type="text"
                  placeholder={isVi ? 'Công ty TNHH Thiết Kế' : 'Design Firm LLC'}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs focus:outline-none focus:border-[#5C3822]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#2A1D15] font-semibold uppercase tracking-wider mb-1">
                    {isVi ? 'Người Liên Hệ' : 'Contact Name'}
                  </label>
                  <input
                    required
                    type="text"
                    placeholder={isVi ? 'Họ và tên' : 'Full Name'}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs focus:outline-none focus:border-[#5C3822]"
                  />
                </div>
                <div>
                  <label className="block text-[#2A1D15] font-semibold uppercase tracking-wider mb-1">
                    {isVi ? 'Điện Thoại' : 'Phone'}
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="(028) 0000 0000"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs focus:outline-none focus:border-[#5C3822]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#2A1D15] font-semibold uppercase tracking-wider mb-1">
                  {isVi ? 'Email Doanh Nghiệp' : 'Professional Email'}
                </label>
                <input
                  required
                  type="email"
                  placeholder="name@firm.com"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#EAE3DA] rounded-xs focus:outline-none focus:border-[#5C3822]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#5C3822] hover:bg-[#2A1D15] text-white font-semibold uppercase tracking-widest transition-colors cursor-pointer"
              >
                {isVi ? 'Gửi Yêu Cầu' : 'Send Request'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
