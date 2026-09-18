import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Download, Send, Phone, Mail, Building2, ShieldCheck } from 'lucide-react';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

const COUNTRIES = [
  'United States',
  'Vietnam',
  'Canada',
  'United Kingdom',
  'Mexico',
  'Australia',
  'Germany',
  'France',
  'Singapore',
  'United Arab Emirates',
  'Other International'
];

export const ContractHospitalityForm: React.FC = () => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    purposeOfInquiry: '',
    workEmail: '',
    phone: '',
    country: 'United States',
    zipCode: '',
    usState: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: '',
      lastName: '',
      company: '',
      purposeOfInquiry: '',
      workEmail: '',
      phone: '',
      country: 'United States',
      zipCode: '',
      usState: '',
      message: '',
    });
  };

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-[#DED9CD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title & Subtitle Matching Screenshot 1 */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-[#1C1A17] tracking-tight uppercase">
            {isVi ? 'BIỂU MẪU DỰ ÁN THƯƠNG MẠI & NGHỈ DƯỠNG' : 'CONTRACT / HOSPITALITY FORM'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A4036] max-w-2xl mx-auto font-light">
            {isVi
              ? 'Để nhận sự hỗ trợ trực tiếp từ đại diện kinh doanh thương mại khu vực của chúng tôi, vui lòng điền vào biểu mẫu dưới đây.'
              : 'To have your regional commercial sales representative get in touch, please fill in the form below.'}
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-[#F8F6F2] border border-[#DED9CD] p-8 sm:p-12 rounded-sm text-center max-w-2xl mx-auto space-y-6 shadow-sm animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-[#E8F5E9] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#9B522E]">
                {isVi ? 'YÊU CẦU ĐÃ ĐƯỢC CHUYỂN TIẾP' : 'INQUIRY RECEIVED'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1A17] mt-1">
                {isVi ? 'Cảm Ơn Bạn Đã Kết Nối' : 'Thank You For Reaching Out'}
              </h3>
              <p className="text-sm text-[#6B5E52] mt-2 max-w-md mx-auto">
                {isVi
                  ? `Yêu cầu hợp tác cho dự án của ${formData.company || 'công ty bạn'} đã được chuyển tới Giám Đốc Kinh Doanh Thương Mại phụ trách khu vực ${formData.usState || formData.country}. Đại diện của chúng tôi sẽ liên hệ qua ${formData.workEmail} trong vòng 24 giờ làm việc.`
                  : `Your project inquiry for ${formData.company || 'your firm'} has been routed to the regional commercial sales representative for ${formData.usState || formData.country}. We will be in touch via ${formData.workEmail} within 24 business hours.`}
              </p>
            </div>

            {/* Regional Sales Representative Information Box */}
            <div className="bg-white border border-[#DED9CD] p-5 rounded-xs text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="font-bold text-[#1C1A17] uppercase tracking-wider text-[11px]">
                {isVi ? 'Đại Diện Thương Mại Khu Vực Phụ Trách:' : 'Your Regional Commercial Representative:'}
              </div>
              <div className="text-sm font-semibold text-[#1C1A17]">Meghan Crandall & Valerie Waidele</div>
              <div className="text-[#6B5E52]">B+Open Commercial & Hospitality Division</div>
              <div className="flex items-center gap-2 text-[#1C1A17] pt-1">
                <Phone className="w-3.5 h-3.5 text-[#9B522E]" />
                <span>(800) 403-0403 ext. 3</span>
              </div>
              <div className="flex items-center gap-2 text-[#1C1A17]">
                <Mail className="w-3.5 h-3.5 text-[#9B522E]" />
                <span>contract@jensenoutdoor.com</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#38332E] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                {isVi ? 'Gửi Yêu Cầu Khác' : 'Submit Another Inquiry'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: First Name * | Last Name * */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1A17] uppercase tracking-wider mb-1.5">
                  {isVi ? 'Tên *' : 'First Name'} <span className="text-[#C53030]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3.5 py-3 text-sm bg-[#F8F6F2] border border-[#D5CCC2] focus:border-[#1C1A17] focus:bg-white focus:outline-none transition-colors rounded-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1A17] uppercase tracking-wider mb-1.5">
                  {isVi ? 'Họ *' : 'Last Name'} <span className="text-[#C53030]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3.5 py-3 text-sm bg-[#F8F6F2] border border-[#D5CCC2] focus:border-[#1C1A17] focus:bg-white focus:outline-none transition-colors rounded-xs"
                />
              </div>
            </div>

            {/* Row 2: Company * | Purpose of Inquiry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1A17] uppercase tracking-wider mb-1.5">
                  {isVi ? 'Tên Công Ty / Tổ Chức *' : 'Company'} <span className="text-[#C53030]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-3 text-sm bg-[#F8F6F2] border border-[#D5CCC2] focus:border-[#1C1A17] focus:bg-white focus:outline-none transition-colors rounded-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1A17] uppercase tracking-wider mb-1.5">
                  {isVi ? 'Mục Đích Liên Hệ' : 'Purpose of Inquiry'}
                </label>
                <div className="relative">
                  <select
                    value={formData.purposeOfInquiry}
                    onChange={(e) => setFormData({ ...formData, purposeOfInquiry: e.target.value })}
                    className="w-full px-3.5 py-3 text-sm bg-[#F8F6F2] border border-[#D5CCC2] focus:border-[#1C1A17] focus:bg-white focus:outline-none appearance-none rounded-xs pr-10"
                  >
                    <option value="">{isVi ? '- Chọn Một Mục -' : '- Select an Option -'}</option>
                    <option value="Hospitality / Resort Project">{isVi ? 'Dự Án Khách Sạn & Khu Nghỉ Dưỡng' : 'Hospitality / Resort Project'}</option>
                    <option value="Commercial / Country Club">{isVi ? 'Sân Golf & Câu Lạc Bộ Thể Thao' : 'Commercial / Country Club'}</option>
                    <option value="Multi-Family & Residential Estate">{isVi ? 'Khu Căn Hộ Cao Cấp & Biệt Thự' : 'Multi-Family & Residential Estate'}</option>
                    <option value="Architectural Specification & CAD">{isVi ? 'Hồ Sơ Thiết Kế & File CAD/BIM' : 'Architectural Specification & CAD'}</option>
                    <option value="Trade Account & Pricing">{isVi ? 'Đăng Ký Tài Khoản Thương Mại' : 'Trade Account & Pricing'}</option>
                    <option value="Material & Swatch Samples">{isVi ? 'Yêu Cầu Mẫu Gỗ Ipe & Vải' : 'Material & Swatch Samples'}</option>
                    <option value="Other">{isVi ? 'Khác' : 'Other'}</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#5C5046]">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Work Email * | Phone * */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1A17] uppercase tracking-wider mb-1.5">
                  {isVi ? 'Email Công Việc *' : 'Work Email'} <span className="text-[#C53030]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  className="w-full px-3.5 py-3 text-sm bg-[#F8F6F2] border border-[#D5CCC2] focus:border-[#1C1A17] focus:bg-white focus:outline-none transition-colors rounded-xs placeholder:text-[#9E9285]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1A17] uppercase tracking-wider mb-1.5">
                  {isVi ? 'Số Điện Thoại *' : 'Phone'} <span className="text-[#C53030]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 555-5555"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-3 text-sm bg-[#F8F6F2] border border-[#D5CCC2] focus:border-[#1C1A17] focus:bg-white focus:outline-none transition-colors rounded-xs placeholder:text-[#9E9285]"
                />
              </div>
            </div>

            {/* Row 4: Country * | Zip / Postal Code * */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1A17] uppercase tracking-wider mb-1.5">
                  {isVi ? 'Quốc Gia *' : 'Country'} <span className="text-[#C53030]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-3 text-sm bg-[#F8F6F2] border border-[#D5CCC2] focus:border-[#1C1A17] focus:bg-white focus:outline-none appearance-none rounded-xs pr-10"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#5C5046]">
                    ▼
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1A17] uppercase tracking-wider mb-1.5">
                  {isVi ? 'Mã Bưu Điện (Zip/Postal) *' : 'Zip / Postal Code'} <span className="text-[#C53030]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="w-full px-3.5 py-3 text-sm bg-[#F8F6F2] border border-[#D5CCC2] focus:border-[#1C1A17] focus:bg-white focus:outline-none transition-colors rounded-xs"
                />
              </div>
            </div>

            {/* Row 5: US States * (When Country is US) */}
            <div>
              <label className="block text-xs font-bold text-[#1C1A17] uppercase tracking-wider mb-1.5">
                {isVi ? 'Bang Tại Hoa Kỳ (US States) *' : 'US States'} <span className="text-[#C53030]">*</span>
              </label>
              <div className="relative">
                <select
                  required={formData.country === 'United States'}
                  value={formData.usState}
                  onChange={(e) => setFormData({ ...formData, usState: e.target.value })}
                  className="w-full px-3.5 py-3 text-sm bg-[#F8F6F2] border border-[#D5CCC2] focus:border-[#1C1A17] focus:bg-white focus:outline-none appearance-none rounded-xs pr-10"
                >
                  <option value="">{isVi ? '- Chọn Bang -' : '- Select State -'}</option>
                  {US_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#5C5046]">
                  ▼
                </div>
              </div>
            </div>

            {/* Row 6: Message for your contract / hospitality sales representative */}
            <div>
              <label className="block text-xs font-bold text-[#1C1A17] uppercase tracking-wider mb-1.5">
                {isVi
                  ? 'Nội Dung Tin Nhắn Gửi Đại Diện Thương Mại / Nghỉ Dưỡng'
                  : 'Message for your contract / hospitality sales representative'}
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3.5 text-sm bg-[#F8F6F2] border border-[#D5CCC2] focus:border-[#1C1A17] focus:bg-white focus:outline-none transition-colors rounded-xs resize-y"
              />
            </div>

            {/* Submit Button Matching Screenshot 2 */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-[#2E2C29] hover:bg-[#1C1A17] active:bg-[#000000] text-white text-sm font-semibold tracking-wider uppercase rounded-xs transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (isVi ? 'Đang gửi...' : 'Submitting...') : (isVi ? 'Gửi Đi' : 'Submit')}
              </button>
            </div>

            {/* Privacy Disclaimer Matching Screenshot 2 */}
            <p className="text-xs sm:text-[13px] text-[#5C5046] leading-relaxed pt-4 border-t border-[#DED9CD]">
              {isVi
                ? 'Để giúp đại diện kinh doanh thiết kế ủy quyền của B+Open tại khu vực của bạn liên hệ theo phương thức thuận tiện nhất, chúng tôi sẽ chia sẻ thông tin bạn cung cấp ở trên. Để biết thêm chi tiết, vui lòng xem chính sách bảo mật của chúng tôi.'
                : 'To help the authorized B+Open design sales representative in your area contact you in the manner most convenient for you, we will be sharing the information you submit above. For more details, please see our privacy policy.'}
            </p>

          </form>
        )}

      </div>
    </section>
  );
};
