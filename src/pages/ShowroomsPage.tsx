import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { JensenLeafLogo } from '../components/JensenLeafLogo';
import { DesignShowroomDetail } from '../components/DesignShowroomDetail';
import { ShowroomInteractiveMap, MapLocation } from '../components/ShowroomInteractiveMap';
import { ContractHospitalityForm } from '../components/ContractHospitalityForm';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Calendar, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Search,
  ChevronRight,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

interface ShowroomsPageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string; tab?: 'retailers' | 'design-showrooms' | 'contract-hospitality' }) => void;
  onOpenCatalogModal?: () => void;
  onOpenTradeModal?: () => void;
  initialTab?: 'retailers' | 'design-showrooms' | 'contract-hospitality';
}

// 1. DESIGN SHOWROOMS DATA (Matching Screenshot 3)
const DESIGN_SHOWROOMS: MapLocation[] = [
  {
    id: 'atlanta',
    number: 1,
    name: 'AmericasMart Atlanta, Bldg 1',
    address: '24 John Portman Blvd NW, Floor 4, Suite A4',
    suite: 'Floor 4, Suite A4',
    city: 'Atlanta',
    state: 'GA',
    zip: '30303',
    contactPerson: 'Meghan Crandall',
    phone: '(800) 403-0403 x3',
    hours: 'By Appointment / Mon-Fri 10a-4p',
    hoursVi: 'Theo Lịch Hẹn / Thứ 2 - Thứ 6: 10:00 - 16:00',
    lat: 33.7602,
    lng: -84.3880,
    type: 'showroom'
  },
  {
    id: 'costa-mesa',
    number: 2,
    name: 'Designers Resource Collection',
    address: '2915 Red Hill Avenue, Building E',
    suite: 'Building E',
    city: 'Costa Mesa',
    state: 'CA',
    zip: '92626',
    contactPerson: 'Pamela Kellogg',
    phone: '(714) 754-1577',
    hours: 'By Appointment / Mon-Fri 10a-5p',
    hoursVi: 'Theo Lịch Hẹn / Thứ 2 - Thứ 6: 10:00 - 17:00',
    lat: 33.6784,
    lng: -117.8860,
    type: 'showroom'
  },
  {
    id: 'dallas',
    number: 3,
    name: "Designer's Patio at World Trade Center",
    address: '2050 N. Stemmons Freeway, Suite 9009',
    suite: 'Suite 9009',
    city: 'Dallas',
    state: 'TX',
    zip: '75207',
    contactPerson: 'Trade Concierge Team',
    phone: '(214) 748-4338',
    hours: 'By Appointment / Mon-Fri 9a-5p',
    hoursVi: 'Theo Lịch Hẹn / Thứ 2 - Thứ 6: 9:00 - 17:00',
    lat: 32.8021,
    lng: -96.8285,
    type: 'showroom'
  },
  {
    id: 'chicago',
    number: 4,
    name: 'theMART Chicago (Casual Market)',
    address: '222 W Merchandise Mart Plaza, Suite 15-110',
    suite: 'Suite 15-110',
    city: 'Chicago',
    state: 'IL',
    zip: '60654',
    contactPerson: 'Valerie Waidele',
    phone: '(312) 527-4141',
    hours: 'By Appointment / Mon-Fri 9a-5p',
    hoursVi: 'Theo Lịch Hẹn / Thứ 2 - Thứ 6: 9:00 - 17:00',
    lat: 41.8885,
    lng: -87.6354,
    type: 'showroom'
  },
  {
    id: 'high-point',
    number: 5,
    name: 'High Point Market Showroom',
    address: '210 E Commerce Ave, IHFC Space G-582',
    suite: 'IHFC Space G-582',
    city: 'High Point',
    state: 'NC',
    zip: '27260',
    contactPerson: 'Market Hospitality Concierge',
    phone: '(336) 887-3400',
    hours: 'Open Markets & By Appointment',
    hoursVi: 'Mở cửa các kỳ triển lãm & theo hẹn',
    lat: 35.9557,
    lng: -80.0053,
    type: 'showroom'
  },
  {
    id: 'hcmc',
    number: 6,
    name: 'B+Open Flagship Gallery HCMC',
    address: 'Thảo Điền Design Quarter, TP. Thủ Đức',
    suite: 'Level 2 & Outdoor Terrace',
    city: 'TP. Hồ Chí Minh',
    state: 'VN',
    zip: '700000',
    contactPerson: 'B+Open Architecture Team',
    phone: '+84 (0) 28 3744 5678',
    hours: 'Mon-Sat 8:30a-6:30p',
    hoursVi: 'Thứ 2 - Thứ 7: 8:30 - 18:30',
    lat: 10.8030,
    lng: 106.7320,
    type: 'showroom'
  }
];

// 2. AUTHORIZED RETAILERS DATA (Matching Screenshot 4)
const RETAILERS_LIST: MapLocation[] = [
  {
    id: 'ret-1',
    number: 1,
    name: "STAUFFER'S OF KISSEL HILL (ROHRERSTOWN)",
    address: '301 Rohrerstown Road',
    city: 'Lancaster',
    state: 'PA',
    zip: '17603',
    phone: '(717) 397-4718',
    hours: 'Mon-Sat: 8:00 AM - 7:00 PM, Sun: 9:00 AM - 5:00 PM',
    hoursVi: 'Thứ 2-7: 8:00 - 19:00, CN: 9:00 - 17:00',
    lat: 40.0543,
    lng: -76.3533,
    type: 'retailer'
  },
  {
    id: 'ret-2',
    number: 2,
    name: 'STICKLEY FURNITURE (WHITE PLAINS)',
    address: '50 Tarrytown Road',
    city: 'White Plains',
    state: 'NY',
    zip: '10607',
    phone: '(914) 948-6333',
    hours: 'Mon-Sat: 10:00 AM - 6:00 PM, Sun: 12:00 PM - 5:00 PM',
    hoursVi: 'Thứ 2-7: 10:00 - 18:00, CN: 12:00 - 17:00',
    lat: 41.0375,
    lng: -73.7842,
    type: 'retailer'
  },
  {
    id: 'ret-3',
    number: 3,
    name: 'THE GREAT ESCAPE (SCHAUMBURG)',
    address: '1850 W. Irving Pk. Rd',
    city: 'Schaumburg',
    state: 'IL',
    zip: '60193',
    phone: '(847) 923-6890',
    hours: 'Mon-Fri: 10:00 AM - 8:00 PM, Sat-Sun: 10:00 AM - 6:00 PM',
    hoursVi: 'Thứ 2-6: 10:00 - 20:00, Thứ 7-CN: 10:00 - 18:00',
    lat: 41.9868,
    lng: -88.1187,
    type: 'retailer'
  },
  {
    id: 'ret-4',
    number: 4,
    name: 'AUTHENTEAK LUXURY OUTDOOR LIVING',
    address: '1098 Huff Rd NW, Suite 100',
    city: 'Atlanta',
    state: 'GA',
    zip: '30318',
    phone: '(404) 479-7988',
    hours: 'Mon-Sat: 10:00 AM - 6:00 PM',
    hoursVi: 'Thứ 2-7: 10:00 - 18:00',
    lat: 33.7865,
    lng: -84.4282,
    type: 'retailer'
  },
  {
    id: 'ret-5',
    number: 5,
    name: "EMIGH'S OUTDOOR LIVING",
    address: '3535 El Camino Ave',
    city: 'Sacramento',
    state: 'CA',
    zip: '95821',
    phone: '(916) 482-1900',
    hours: 'Mon-Sat: 9:00 AM - 6:00 PM, Sun: 10:00 AM - 5:00 PM',
    hoursVi: 'Thứ 2-7: 9:00 - 18:00, CN: 10:00 - 17:00',
    lat: 38.6111,
    lng: -121.3780,
    type: 'retailer'
  },
  {
    id: 'ret-6',
    number: 6,
    name: 'PATIO PRODUCTIONS SHOWROOM',
    address: '2161 Hancock St',
    city: 'San Diego',
    state: 'CA',
    zip: '92111',
    phone: '(888) 947-4449',
    hours: 'Mon-Sun: 9:30 AM - 5:30 PM',
    hoursVi: 'Thứ 2-CN: 9:30 - 17:30',
    lat: 32.7486,
    lng: -117.1950,
    type: 'retailer'
  },
  {
    id: 'ret-7',
    number: 7,
    name: 'FLORIDA BACKYARD DESIGN GALLERY',
    address: '5565 Taylor Rd',
    city: 'Naples',
    state: 'FL',
    zip: '34109',
    phone: '(239) 594-8809',
    hours: 'Mon-Sat: 10:00 AM - 5:00 PM',
    hoursVi: 'Thứ 2-7: 10:00 - 17:00',
    lat: 26.2301,
    lng: -81.7770,
    type: 'retailer'
  },
  {
    id: 'ret-8',
    number: 8,
    name: 'CHRISTY SPORTS OUTDOOR LIVING',
    address: '8688 E Raintree Dr',
    city: 'Scottsdale',
    state: 'AZ',
    zip: '85255',
    phone: '(480) 585-7800',
    hours: 'Mon-Sat: 10:00 AM - 6:00 PM, Sun: 11:00 AM - 5:00 PM',
    hoursVi: 'Thứ 2-7: 10:00 - 18:00, CN: 11:00 - 17:00',
    lat: 33.6190,
    lng: -111.8940,
    type: 'retailer'
  }
];

export const ShowroomsPage: React.FC<ShowroomsPageProps> = ({ 
  onNavigate,
  onOpenCatalogModal,
  onOpenTradeModal,
  initialTab = 'design-showrooms'
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // Active view tab: 'retailers' | 'design-showrooms' | 'contract-hospitality'
  const [activeTab, setActiveTab] = useState<'retailers' | 'design-showrooms' | 'contract-hospitality'>(
    initialTab || 'design-showrooms'
  );

  // Synchronize activeTab whenever initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Selected map location
  const [selectedShowroomId, setSelectedShowroomId] = useState<string>('atlanta');
  const [selectedRetailerId, setSelectedRetailerId] = useState<string>('ret-1');

  // Address search query for retailers
  const [retailerSearchQuery, setRetailerSearchQuery] = useState<string>('');

  // Appointment modal state
  const [appointmentModalLocation, setAppointmentModalLocation] = useState<MapLocation | null>(null);
  const [appointmentSuccess, setAppointmentSuccess] = useState<boolean>(false);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: ''
  });

  // Sync hash on mount and on hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('contract') || hash.includes('hospitality')) {
        setActiveTab('contract-hospitality');
      } else if (hash.includes('design-showroom') || hash.includes('showroom')) {
        setActiveTab('design-showrooms');
      } else if (hash.includes('retailer')) {
        setActiveTab('retailers');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentSuccess(true);
    setTimeout(() => {
      setAppointmentSuccess(false);
      setAppointmentModalLocation(null);
      setAppointmentForm({ name: '', email: '', phone: '', date: '', notes: '' });
    }, 2500);
  };

  // Filter retailers based on search query
  const filteredRetailers = RETAILERS_LIST.filter((r) => {
    if (!retailerSearchQuery.trim()) return true;
    const query = retailerSearchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(query) ||
      r.city.toLowerCase().includes(query) ||
      r.state.toLowerCase().includes(query) ||
      r.zip.toLowerCase().includes(query) ||
      r.address.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-white text-[#1C1A17] selection:bg-[#5C3822] selection:text-white">
      
      {/* TOP NAVIGATION TABS: RETAILERS | DESIGN SHOWROOMS | CONTRACT / HOSPITALITY (Exact match to User Screenshot) */}
      <div id="how-to-buy-tabs" className="sticky top-[106px] sm:top-[118px] lg:top-[126px] z-30 bg-white border-b border-[#EAE3DA] shadow-xs">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-6 sm:gap-14 md:gap-20 pt-5 sm:pt-6 pb-0 text-xs sm:text-[13px] tracking-[0.16em] uppercase font-semibold">
          
          {/* Tab 1: RETAILERS */}
          <button
            id="tab-retailers"
            onClick={() => {
              setActiveTab('retailers');
              window.location.hash = 'retailers';
            }}
            className={`pb-4 transition-all relative cursor-pointer ${
              activeTab === 'retailers'
                ? 'text-[#1C1A17] font-bold border-b-2 border-black'
                : 'text-[#6B5E52] hover:text-[#1C1A17] border-b-2 border-transparent'
            }`}
          >
            {isVi ? 'ĐẠI LÝ (RETAILERS)' : 'RETAILERS'}
          </button>

          {/* Tab 2: DESIGN SHOWROOMS */}
          <button
            id="tab-design-showrooms"
            onClick={() => {
              setActiveTab('design-showrooms');
              window.location.hash = 'design-showrooms';
            }}
            className={`pb-4 transition-all relative cursor-pointer ${
              activeTab === 'design-showrooms'
                ? 'text-[#1C1A17] font-bold border-b-2 border-black'
                : 'text-[#6B5E52] hover:text-[#1C1A17] border-b-2 border-transparent'
            }`}
          >
            {isVi ? 'SHOWROOM THIẾT KẾ (DESIGN SHOWROOMS)' : 'DESIGN SHOWROOMS'}
          </button>

          {/* Tab 3: CONTRACT / HOSPITALITY */}
          <button
            id="tab-contract-hospitality"
            onClick={() => {
              setActiveTab('contract-hospitality');
              window.location.hash = 'contract-hospitality';
            }}
            className={`pb-4 transition-all relative cursor-pointer ${
              activeTab === 'contract-hospitality'
                ? 'text-[#1C1A17] font-bold border-b-2 border-black'
                : 'text-[#6B5E52] hover:text-[#1C1A17] border-b-2 border-transparent'
            }`}
          >
            {isVi ? 'DỰ ÁN / NGHỈ DƯỠNG (CONTRACT / HOSPITALITY)' : 'CONTRACT / HOSPITALITY'}
          </button>

        </div>
      </div>

      {/* 4. TAB 1 CONTENT: RETAILERS (Exact match to Screenshot 4) */}
      {activeTab === 'retailers' && (
        <section className="bg-white border-b border-[#EAE3DA]">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
            
            {/* Left Column: Interactive Map */}
            <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
              <ShowroomInteractiveMap
                locations={RETAILERS_LIST}
                selectedId={selectedRetailerId}
                onSelectLocation={(id) => setSelectedRetailerId(id)}
                onBookAppointment={(loc) => setAppointmentModalLocation(loc)}
              />
            </div>

            {/* Right Column: Search & Retailer Directory List */}
            <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 p-6 sm:p-8 bg-white overflow-y-auto max-h-[720px] border-l border-[#EAE3DA]">
              
              {/* Logo (Top Right as in Screenshot 4) */}
              <div className="mb-6 flex justify-start">
                <div className="bg-[#181818] p-2.5 rounded-xs inline-flex items-center">
                  <img
                    src="/logo-b-open.png"
                    alt="B+Open Logo"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Address Search Bar: [ENTER YOUR ADDRESS] [▲] */}
              <div className="mb-6">
                <div className="flex items-center border border-[#1C1A17] bg-white">
                  <input
                    type="text"
                    value={retailerSearchQuery}
                    onChange={(e) => setRetailerSearchQuery(e.target.value)}
                    placeholder={isVi ? 'NHẬP ĐỊA CHỈ HOẶC THÀNH PHỐ...' : 'ENTER YOUR ADDRESS'}
                    className="flex-1 px-3.5 py-3 text-xs tracking-wider uppercase font-semibold text-[#1C1A17] focus:outline-none placeholder:text-[#9E9285]"
                  />
                  <button
                    onClick={() => {}}
                    className="w-12 h-11 bg-[#1C1A17] hover:bg-[#38332E] text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Search"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] text-[#6B5E52]">
                  <span>{filteredRetailers.length} {isVi ? 'đại lý được ủy quyền' : 'authorized dealers found'}</span>
                  {retailerSearchQuery && (
                    <button
                      onClick={() => setRetailerSearchQuery('')}
                      className="text-[#8C5535] hover:underline cursor-pointer font-medium"
                    >
                      {isVi ? 'Xóa tìm kiếm' : 'Clear search'}
                    </button>
                  )}
                </div>
              </div>

              {/* Numbered Retailers List matching Screenshot 4 */}
              <div className="space-y-6">
                {filteredRetailers.map((ret) => {
                  const isSelected = selectedRetailerId === ret.id;
                  return (
                    <div
                      key={ret.id}
                      onClick={() => setSelectedRetailerId(ret.id)}
                      className={`p-3.5 border transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#1C1A17] bg-[#FAF8F5] shadow-xs' 
                          : 'border-transparent hover:border-[#EAE3DA] hover:bg-[#FAF8F5]/60'
                      }`}
                    >
                      {/* Name with Number */}
                      <h3 className="text-xs sm:text-[13px] font-bold text-[#1C1A17] tracking-wider uppercase flex items-start gap-1.5 mb-2">
                        <span>{ret.number}.</span>
                        <span>{ret.name}</span>
                      </h3>

                      {/* Address */}
                      <div className="flex items-start gap-2 text-xs text-[#5C5046] mb-1.5 pl-4">
                        <MapPin className="w-3.5 h-3.5 text-[#8C7A6B] shrink-0 mt-0.5" />
                        <span>{ret.address}, {ret.city}, {ret.state}, {ret.zip}, US</span>
                      </div>

                      {/* Phone */}
                      {ret.phone && (
                        <div className="flex items-center gap-2 text-xs text-[#5C5046] mb-3 pl-4">
                          <Phone className="w-3.5 h-3.5 text-[#8C7A6B] shrink-0" />
                          <a href={`tel:${ret.phone.replace(/[^0-9]/g, '')}`} className="hover:underline text-[#1C1A17] font-medium">
                            {ret.phone}
                          </a>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pl-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAppointmentModalLocation(ret);
                          }}
                          className="px-3 py-1.5 bg-[#1C1A17] hover:bg-[#38332E] text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          {isVi ? 'Đặt Lịch Hẹn' : 'Schedule Visit'}
                        </button>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(`${ret.name} ${ret.address} ${ret.city} ${ret.state}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1.5 bg-white hover:bg-[#FAF8F5] text-[#1C1A17] border border-[#D5CCC2] text-[10px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1"
                        >
                          <span>{isVi ? 'Chỉ Đường' : 'Directions'}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-[#8C7A6B]" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>
      )}

      {/* 5. TAB 2 CONTENT: DESIGN SHOWROOMS (Exact match to Screenshot 3 + Architectural Suite Details below) */}
      {activeTab === 'design-showrooms' && (
        <>
          <section className="bg-white border-b border-[#EAE3DA]">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
              
              {/* Left Column: Interactive Map */}
              <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
                <ShowroomInteractiveMap
                  locations={DESIGN_SHOWROOMS}
                  selectedId={selectedShowroomId}
                  onSelectLocation={(id) => setSelectedShowroomId(id)}
                  onBookAppointment={(loc) => setAppointmentModalLocation(loc)}
                />
              </div>

              {/* Right Column: Logo, DESIGN SHOWROOMS Banner, Subtitle & Numbered List (Matching Screenshot 3) */}
              <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 p-6 sm:p-8 bg-white overflow-y-auto max-h-[720px] border-l border-[#EAE3DA]">
                
                {/* Logo & B+ OPEN Badge matching user reference screenshot */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="border border-black px-2.5 py-1.5 inline-flex flex-col items-center justify-center leading-none select-none bg-white">
                    <span className="font-sans font-black text-sm tracking-tight text-black flex items-start">
                      B<span className="text-[10px] font-bold -mt-0.5 ml-0.5">+</span>
                    </span>
                    <span className="text-[8px] font-extrabold tracking-[0.25em] text-black uppercase mt-0.5">
                      OPEN
                    </span>
                  </div>
                  <div className="bg-[#181818] p-1.5 rounded-xs inline-flex items-center">
                    <img
                      src="/logo-b-open.png"
                      alt="B+Open Logo"
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Solid Black Banner: DESIGN SHOWROOMS */}
                <div className="bg-[#1C1A17] text-white py-3 px-4 text-center mb-3">
                  <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em]">
                    DESIGN SHOWROOMS
                  </span>
                </div>

                {/* Subtitle: OPEN BY APPOINTMENT TO THE TRADE */}
                <div className="text-center mb-6">
                  <p className="text-[11px] font-bold text-[#1C1A17] tracking-[0.18em] uppercase">
                    {isVi ? 'MỞ CỬA THEO LỊCH HẸN CHO GIỚI THIẾT KẾ CHUYÊN NGHIỆP' : 'OPEN BY APPOINTMENT TO THE TRADE'}
                  </p>
                </div>

                {/* Numbered Design Showrooms List matching Screenshot 3 */}
                <div className="space-y-6">
                  {DESIGN_SHOWROOMS.map((sr) => {
                    const isSelected = selectedShowroomId === sr.id;
                    return (
                      <div
                        key={sr.id}
                        onClick={() => setSelectedShowroomId(sr.id)}
                        className={`p-3.5 border transition-all cursor-pointer ${
                          isSelected 
                            ? 'border-[#1C1A17] bg-[#FAF8F5] shadow-xs' 
                            : 'border-transparent hover:border-[#EAE3DA] hover:bg-[#FAF8F5]/60'
                        }`}
                      >
                        {/* 1. Name with Number */}
                        <h3 className="text-xs sm:text-[13px] font-bold text-[#1C1A17] tracking-wider uppercase flex items-start gap-1.5 mb-2">
                          <span>{sr.number}.</span>
                          <span>{sr.name}</span>
                        </h3>

                        {/* 2. Address */}
                        <div className="flex items-start gap-2 text-xs text-[#5C5046] mb-1.5 pl-4">
                          <MapPin className="w-3.5 h-3.5 text-[#8C7A6B] shrink-0 mt-0.5" />
                          <div>
                            <div>{sr.address}</div>
                            {sr.suite && !sr.address.includes(sr.suite) && <div>{sr.suite}</div>}
                            <div>{sr.city}, {sr.state} {sr.zip}</div>
                          </div>
                        </div>

                        {/* 3. Contact Person & Phone */}
                        <div className="flex items-center gap-2 text-xs text-[#5C5046] mb-1.5 pl-4">
                          <Phone className="w-3.5 h-3.5 text-[#8C7A6B] shrink-0" />
                          <div>
                            {sr.contactPerson && <span className="font-semibold text-[#1C1A17]">{sr.contactPerson} / </span>}
                            <a href={`tel:${(sr.phone || '').replace(/[^0-9]/g, '')}`} className="hover:underline text-[#1C1A17]">
                              {sr.phone}
                            </a>
                          </div>
                        </div>

                        {/* 4. Hours & Appointment */}
                        {sr.hours && (
                          <div className="flex items-center gap-2 text-xs text-[#5C5046] mb-3 pl-4">
                            <Calendar className="w-3.5 h-3.5 text-[#8C7A6B] shrink-0" />
                            <span>{isVi && sr.hoursVi ? sr.hoursVi : sr.hours}</span>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 pl-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setAppointmentModalLocation(sr);
                            }}
                            className="px-3.5 py-1.5 bg-[#1C1A17] hover:bg-[#38332E] text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            {isVi ? 'Đặt Lịch Hẹn' : 'By Appointment'}
                          </button>
                          
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(`${sr.name} ${sr.address} ${sr.city} ${sr.state}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1.5 bg-white hover:bg-[#FAF8F5] text-[#1C1A17] border border-[#D5CCC2] text-[10px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1"
                          >
                            <span>{isVi ? 'Chỉ Đường' : 'Directions'}</span>
                            <ExternalLink className="w-2.5 h-2.5 text-[#8C7A6B]" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          </section>

          {/* Expanded Architectural Suite Showcase (Photos, Collections, 3D Virtual Tour, Amenities) */}
          <section className="scroll-mt-16">
            <DesignShowroomDetail
              onNavigate={onNavigate}
              onOpenCatalogModal={onOpenCatalogModal}
              onOpenTradeModal={onOpenTradeModal}
            />
          </section>
        </>
      )}

      {/* 6. TAB 3 CONTENT: CONTRACT / HOSPITALITY (Exact match to Screenshot 1 & 2) */}
      {activeTab === 'contract-hospitality' && (
        <ContractHospitalityForm />
      )}

      {/* 7. APPOINTMENT BOOKING MODAL */}
      {appointmentModalLocation && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 sm:p-8 rounded-sm shadow-2xl border border-[#EAE3DA] relative">
            <button
              onClick={() => setAppointmentModalLocation(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer font-bold text-lg"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="mb-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5535] font-bold">
                {isVi ? 'ĐẶT LỊCH THAM QUAN RIÊNG' : 'PRIVATE SHOWROOM CONSULTATION'}
              </span>
              <h3 className="font-serif text-2xl text-[#1C1A17] mt-1 font-normal">
                {appointmentModalLocation.name}
              </h3>
              <p className="text-xs text-[#6B5E52] mt-1.5">
                {appointmentModalLocation.address}, {appointmentModalLocation.city}, {appointmentModalLocation.state}
              </p>
            </div>

            {appointmentSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#2E7D32] mx-auto" />
                <h4 className="font-serif text-xl text-[#1C1A17]">
                  {isVi ? 'Đã Gửi Yêu Cầu Thành Công' : 'Appointment Confirmed'}
                </h4>
                <p className="text-xs text-[#6B5E52] max-w-xs mx-auto">
                  {isVi
                    ? `Đội ngũ quản lý showroom tại ${appointmentModalLocation.name} sẽ liên hệ lại qua email hoặc số điện thoại của bạn trong thời gian sớm nhất.`
                    : `The showroom team at ${appointmentModalLocation.name} will contact you shortly to confirm your reserved viewing time.`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookAppointment} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[#1C1A17] font-bold uppercase tracking-wider mb-1">
                    {isVi ? 'Họ và Tên *' : 'Full Name *'}
                  </label>
                  <input
                    required
                    type="text"
                    value={appointmentForm.name}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                    placeholder={isVi ? 'Nguyễn Văn A' : 'Jane Doe'}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CCC2] rounded-xs focus:outline-none focus:border-[#1C1A17]"
                  />
                </div>

                <div>
                  <label className="block text-[#1C1A17] font-bold uppercase tracking-wider mb-1">
                    {isVi ? 'Email *' : 'Email Address *'}
                  </label>
                  <input
                    required
                    type="email"
                    value={appointmentForm.email}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CCC2] rounded-xs focus:outline-none focus:border-[#1C1A17]"
                  />
                </div>

                <div>
                  <label className="block text-[#1C1A17] font-bold uppercase tracking-wider mb-1">
                    {isVi ? 'Số Điện Thoại *' : 'Phone *'}
                  </label>
                  <input
                    required
                    type="tel"
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                    placeholder="+1 (555) 555-5555"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CCC2] rounded-xs focus:outline-none focus:border-[#1C1A17]"
                  />
                </div>

                <div>
                  <label className="block text-[#1C1A17] font-bold uppercase tracking-wider mb-1">
                    {isVi ? 'Ngày Mong Muốn *' : 'Preferred Date *'}
                  </label>
                  <input
                    required
                    type="date"
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CCC2] rounded-xs focus:outline-none focus:border-[#1C1A17]"
                  />
                </div>

                <div>
                  <label className="block text-[#1C1A17] font-bold uppercase tracking-wider mb-1">
                    {isVi ? 'Ghi Chú Hoặc Bộ Sưu Tập Quan Tâm' : 'Notes / Specific Collections of Interest'}
                  </label>
                  <textarea
                    rows={2}
                    value={appointmentForm.notes}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                    placeholder={isVi ? 'Ví dụ: Forte, Lumino, lấy mẫu vải Sunbrella...' : 'e.g. Forte, Lumino, timber finish swatches...'}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CCC2] rounded-xs focus:outline-none focus:border-[#1C1A17]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1C1A17] hover:bg-[#38332E] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                  >
                    {isVi ? 'Xác Nhận Đặt Lịch Hẹn' : 'Request Appointment'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* 8. TRADE PROGRAM BANNER (Bottom) */}
      <section className="bg-[#1C1A17] text-white py-14 sm:py-20 relative overflow-hidden border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#C5A574] mb-3">
            <JensenLeafLogo className="w-3.5 h-5 text-[#C5A574]" />
            <span>{isVi ? 'DÀNH RIÊNG CHO GIỚI THIẾT KẾ CHUYÊN NGHIỆP' : 'TRADE & CONTRACT ADVANTAGE'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight leading-tight max-w-2xl mx-auto mb-4">
            {isVi ? 'Gia Nhập Chương Trình Thương Mại B+Open' : 'Partner with B+Open on Your Next Project'}
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl mx-auto mb-8 font-light">
            {isVi
              ? 'Nhận chính sách chiết khấu thương mại theo cấp bậc, bộ mẫu vật liệu gỗ Ipe và vải dệt Sunbrella miễn phí, cùng hỗ trợ kỹ thuật trực tiếp từ chuyên viên.'
              : 'Qualified residential designers, landscape architects, and hospitality procurement specialists enjoy exclusive pricing, swatch boxes, and dedicated account support.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('trade')}
              className="px-8 py-3.5 bg-[#C5A574] hover:bg-[#B6935E] text-[#1C1A17] font-semibold text-xs tracking-[0.18em] uppercase rounded-xs transition-colors cursor-pointer shadow-md"
            >
              {isVi ? 'ĐĂNG KÝ TÀI KHOẢN TRADE' : 'APPLY FOR TRADE PROGRAM'}
            </button>
            <button
              onClick={() => {
                setActiveTab('contract-hospitality');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/40 font-semibold text-xs tracking-[0.18em] uppercase rounded-xs transition-colors cursor-pointer"
            >
              {isVi ? 'BIỂU MẪU DỰ ÁN' : 'CONTRACT FORM'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
