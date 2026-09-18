import React, { useState, useMemo } from 'react';
import { RETAILERS } from '../data/furnitureData';
import { Retailer } from '../types';
import { MapPin, Phone, Clock, ExternalLink, Search, CheckCircle2, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const RetailerLocator: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [appointmentModalRetailer, setAppointmentModalRetailer] = useState<Retailer | null>(null);
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);

  const { language } = useLanguage();
  const isVi = language === 'vi';

  const filteredRetailers = useMemo(() => {
    return RETAILERS.filter((r) => {
      if (selectedType !== 'all' && r.type !== selectedType) {
        return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesCity = r.city.toLowerCase().includes(q);
        const matchesState = r.state.toLowerCase().includes(q);
        const matchesZip = r.zip.includes(q);
        const matchesName = r.name.toLowerCase().includes(q);
        if (!matchesCity && !matchesState && !matchesZip && !matchesName) {
          return false;
        }
      }
      return true;
    });
  }, [searchTerm, selectedType]);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentSubmitted(true);
    setTimeout(() => {
      setAppointmentSubmitted(false);
      setAppointmentModalRetailer(null);
    }, 2500);
  };

  return (
    <section id="retailers" className="py-20 sm:py-28 bg-[#F8F6F2] border-t border-[#DED9CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#9B522E]">
            {isVi ? 'Hệ Thống Phân Phối Ủy Quyền' : 'Authorized Presence'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1A17] tracking-tight mt-1">
            {isVi ? 'Tìm Showroom & Đại Lý Thiết Kế' : 'Find a Retailer & Design Gallery'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6B5E52]">
            {isVi
              ? 'Trực tiếp trải nghiệm trọng lượng đầm chắc và cảm giác thớ gỗ Ipe Bolivia mịn như lụa tại các showroom đối tác ủy quyền hàng đầu của chúng tôi.'
              : 'Experience the reassuring weight and silken texture of Bolivian Ipe in person at our premier authorized partner showrooms across North America.'}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-[#DED9CD] p-4 sm:p-6 mb-8 rounded-sm shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A6B]" />
            <input
              id="retailer-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isVi ? 'Tìm theo thành phố, bang (CA, FL), mã ZIP hoặc tên...' : 'Search by city, state (e.g. CA, FL), or ZIP...'}
              className="w-full min-h-[48px] pl-10 pr-4 py-3 bg-[#F8F6F2] border border-[#DED9CD] rounded-xs text-[14px] sm:text-[15px] text-[#1C1A17] placeholder:text-[#8C7A6B] focus:outline-none focus:border-[#9B522E]"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedType('all')}
              className={`min-h-[42px] px-4 py-2 text-[13px] rounded-xs font-bold transition-colors cursor-pointer ${
                selectedType === 'all'
                  ? 'bg-[#9B522E] text-white shadow-xs'
                  : 'bg-[#F8F6F2] text-[#443D36] border border-[#DED9CD] hover:bg-[#EAE4D9]'
              }`}
            >
              {isVi ? 'Tất Cả Showroom' : 'All Showrooms'}
            </button>
            <button
              onClick={() => setSelectedType('Premier Flagship')}
              className={`min-h-[42px] px-4 py-2 text-[13px] rounded-xs font-bold transition-colors cursor-pointer ${
                selectedType === 'Premier Flagship'
                  ? 'bg-[#9B522E] text-white shadow-xs'
                  : 'bg-[#F8F6F2] text-[#443D36] border border-[#DED9CD] hover:bg-[#EAE4D9]'
              }`}
            >
              {isVi ? 'Showroom Flagship' : 'Premier Flagships'}
            </button>
            <button
              onClick={() => setSelectedType('Authorized Design Center')}
              className={`min-h-[42px] px-4 py-2 text-[13px] rounded-xs font-bold transition-colors cursor-pointer ${
                selectedType === 'Authorized Design Center'
                  ? 'bg-[#9B522E] text-white shadow-xs'
                  : 'bg-[#F8F6F2] text-[#443D36] border border-[#DED9CD] hover:bg-[#EAE4D9]'
              }`}
            >
              {isVi ? 'Trung Tâm Thiết Kế' : 'Design Centers'}
            </button>
          </div>
        </div>

        {/* Retailer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRetailers.map((retailer) => (
            <div
              key={retailer.id}
              id={`retailer-card-${retailer.id}`}
              className="bg-white border border-[#DED9CD] p-6 rounded-sm shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#9B522E] bg-[#F8F6F2] px-2.5 py-1 border border-[#DED9CD] rounded-xs">
                    {retailer.type === 'Premier Flagship' 
                      ? (isVi ? 'Flagship Cao Cấp' : 'Premier Flagship') 
                      : (isVi ? 'Trung Tâm Thiết Kế' : 'Authorized Design Center')}
                  </span>
                  <span className="text-[13px] font-bold text-[#1C1A17]">
                    {retailer.city}, {retailer.state}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1A17] mb-3">
                  {retailer.name}
                </h3>

                <div className="space-y-2.5 text-[14px] text-[#443D36] mb-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#9B522E] shrink-0 mt-0.5" />
                    <span>{retailer.address}, {retailer.city}, {retailer.state} {retailer.zip}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#737D5A] shrink-0" />
                    <span className="font-bold text-[#1C1A17]">{retailer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#798E9D] shrink-0" />
                    <span>{retailer.hours}</span>
                  </div>
                </div>

                {/* Display collections */}
                <div className="pt-3 border-t border-[#F0EBE3] mb-4">
                  <span className="text-[11px] uppercase tracking-wider text-[#6B5E52] font-bold block mb-1.5">
                    {isVi ? 'Bộ Sưu Tập Trưng Bày Thực Tế' : 'On Floor Display'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {retailer.featuredCollections.map((col, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-[#F8F6F2] text-[#2A1D15] px-2.5 py-1 rounded-xs border border-[#DED9CD]"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-[#F0EBE3] grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setAppointmentModalRetailer(retailer)}
                  className="min-h-[44px] py-2.5 px-3 bg-[#9B522E] hover:bg-[#854524] text-white text-[12px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-xs shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isVi ? 'Đặt Lịch Hẹn' : 'Book Visit'}</span>
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${retailer.name} ${retailer.address} ${retailer.city} ${retailer.state}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] py-2.5 px-3 bg-[#F8F6F2] hover:bg-[#EAE4D9] text-[#1C1A17] border border-[#DED9CD] text-[12px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 rounded-xs"
                >
                  <span>{isVi ? 'Chỉ Đường' : 'Directions'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6B5E52]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Appointment Booking Modal */}
        {appointmentModalRetailer && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full p-6 sm:p-8 rounded-sm shadow-2xl border border-[#DED9CD] relative">
              <button
                onClick={() => setAppointmentModalRetailer(null)}
                className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-[#6B5E52] hover:text-[#1C1A17] hover:bg-[#F3EEE6] rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="mb-4">
                <span className="text-[11px] uppercase tracking-widest text-[#9B522E] font-bold">
                  {isVi ? 'Tư Vấn Riêng Biệt' : 'Private Consultation'}
                </span>
                <h3 className="font-serif text-2xl text-[#1C1A17] mt-1">
                  {isVi ? 'Lên Lịch Tham Quan Showroom' : 'Schedule Showroom Visit'}
                </h3>
                <p className="text-[14px] text-[#554C42] mt-1.5 leading-relaxed">
                  {isVi 
                    ? `Kết nối trực tiếp với chuyên viên nội thất ngoại thất tại ${appointmentModalRetailer.name}.`
                    : `Connect with a dedicated outdoor furniture specialist at ${appointmentModalRetailer.name}.`}
                </p>
              </div>

              {appointmentSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#737D5A] mx-auto" />
                  <h4 className="font-serif text-xl text-[#1C1A17]">
                    {isVi ? 'Đã Gửi Yêu Cầu Thành Công' : 'Appointment Requested'}
                  </h4>
                  <p className="text-[14px] text-[#554C42]">
                    {isVi
                      ? `Đội ngũ showroom tại ${appointmentModalRetailer.name} sẽ sớm liên hệ xác nhận khung giờ đón tiếp riêng biệt.`
                      : `The showroom team at ${appointmentModalRetailer.name} will contact you shortly to confirm your private viewing time.`}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookAppointment} className="space-y-3.5">
                  <div>
                    <label className="block text-[13px] text-[#1C1A17] font-bold uppercase tracking-wider mb-1">
                      {isVi ? 'Họ và Tên' : 'Full Name'}
                    </label>
                    <input
                      required
                      type="text"
                      placeholder={isVi ? 'Nguyễn Thị B' : 'Jane Doe'}
                      className="w-full min-h-[48px] p-3 text-[15px] bg-[#F8F6F2] border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#1C1A17] font-bold uppercase tracking-wider mb-1">
                      {isVi ? 'Địa Chỉ Email' : 'Email Address'}
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full min-h-[48px] p-3 text-[15px] bg-[#F8F6F2] border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#1C1A17] font-bold uppercase tracking-wider mb-1">
                      {isVi ? 'Ngày & Giờ Dự Kiến' : 'Preferred Date & Time'}
                    </label>
                    <input
                      required
                      type="text"
                      placeholder={isVi ? 'Ví dụ: Sáng thứ Ba tuần tới' : 'e.g. Next Tuesday morning'}
                      className="w-full min-h-[48px] p-3 text-[15px] bg-[#F8F6F2] border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#1C1A17] font-bold uppercase tracking-wider mb-1">
                      {isVi ? 'Bộ Sưu Tập Quan Tâm' : 'Collections of Interest'}
                    </label>
                    <input
                      type="text"
                      placeholder={isVi ? 'Ví dụ: Lumino Sofa, Luma Bàn Ăn, Bloom' : 'e.g. Lumino Sofa, Luma Dining, Bloom'}
                      className="w-full min-h-[48px] p-3 text-[15px] bg-[#F8F6F2] border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full min-h-[48px] py-3.5 mt-2 bg-[#9B522E] hover:bg-[#854524] text-white text-[13px] font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-xs shadow-sm"
                  >
                    {isVi ? 'Xác Nhận Đặt Lịch' : 'Confirm Showroom Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
