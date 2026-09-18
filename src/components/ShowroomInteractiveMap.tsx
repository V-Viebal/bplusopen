import React, { useState } from 'react';
import { MapPin, Navigation, ZoomIn, ZoomOut, RotateCcw, ExternalLink, Phone, Clock, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface MapLocation {
  id: string;
  number: number;
  name: string;
  address: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  contactPerson?: string;
  hours?: string;
  hoursVi?: string;
  lat: number; // approximate latitude for plotting
  lng: number; // approximate longitude for plotting
  type: 'showroom' | 'retailer';
}

interface ShowroomInteractiveMapProps {
  locations: MapLocation[];
  selectedId: string | null;
  onSelectLocation: (id: string) => void;
  onBookAppointment?: (location: MapLocation) => void;
}

export const ShowroomInteractiveMap: React.FC<ShowroomInteractiveMapProps> = ({
  locations,
  selectedId,
  onSelectLocation,
  onBookAppointment,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  const [zoom, setZoom] = useState<number>(1);
  const [mapTheme, setMapTheme] = useState<'blueprint' | 'satellite'>('blueprint');

  // Convert lat/lng to SVG percentage coordinates (USA projection bounding box roughly: lat 24 to 50, lng -125 to -66)
  const getCoordinates = (lat: number, lng: number) => {
    // If it's HCMC Vietnam (lat ~10.8, lng ~106.7), we can plot it in an inset or international corner
    if (lng > 0) {
      return { x: 88, y: 82, isInternational: true };
    }
    const minLng = -125;
    const maxLng = -68;
    const minLat = 24.5;
    const maxLat = 49.5;

    const x = Math.max(8, Math.min(92, ((lng - minLng) / (maxLng - minLng)) * 100));
    // y is inverted (higher lat = lower y in SVG)
    const y = Math.max(10, Math.min(90, ((maxLat - lat) / (maxLat - minLat)) * 100));

    return { x, y, isInternational: false };
  };

  const selectedLoc = locations.find((l) => l.id === selectedId) || null;

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] bg-[#EAE5DE] border-r border-[#E0D8CE] overflow-hidden select-none">
      
      {/* Background Graphic Pattern: Architectural Grid & Continent Silhouette */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          mapTheme === 'blueprint' 
            ? 'bg-[#EFECE6] opacity-100' 
            : 'bg-[#1E252B] opacity-100'
        }`}
      >
        {/* Subtle grid lines */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${mapTheme === 'blueprint' ? '#6B5E52' : '#8C9BAE'} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Stylized US Outline Vector Graphic */}
        <svg 
          viewBox="0 0 1000 600" 
          className={`w-full h-full object-cover transition-colors duration-300 ${
            mapTheme === 'blueprint' ? 'text-[#DFD7CE] opacity-85' : 'text-[#2C3742] opacity-70'
          }`}
          fill="currentColor"
        >
          {/* US Landmass Contour */}
          <path d="M120,80 L200,90 L260,85 L320,80 L400,90 L480,85 L560,95 L620,110 L700,95 L780,120 L840,110 L910,130 L930,160 L920,200 L880,240 L840,260 L800,290 L790,340 L820,380 L840,430 L800,470 L760,490 L720,430 L660,420 L610,410 L560,420 L520,440 L480,480 L430,510 L380,490 L340,430 L280,410 L220,420 L160,390 L120,340 L100,280 L90,200 L100,130 Z" />
          
          {/* State Dividing Lines (Subtle) */}
          <path 
            d="M320,80 L320,430 M560,95 L560,420 M700,95 L700,430 M220,90 L220,420 M120,200 L910,200 M120,320 L840,320" 
            stroke={mapTheme === 'blueprint' ? '#C9BFB4' : '#3E4D5B'} 
            strokeWidth="1.5" 
            strokeDasharray="4 4"
            fill="none" 
          />
        </svg>
      </div>

      {/* Top Map Controls: Theme Switcher & Reset */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-white/95 backdrop-blur-xs border border-[#D5CCC2] rounded-xs shadow-xs p-1 flex items-center gap-1 text-[11px] font-semibold text-[#1C1A17]">
          <button
            onClick={() => setMapTheme('blueprint')}
            className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
              mapTheme === 'blueprint' ? 'bg-[#1C1A17] text-white' : 'hover:bg-[#F2ECE4]'
            }`}
          >
            {isVi ? 'Bản Đồ Kiến Trúc' : 'Architectural Map'}
          </button>
          <button
            onClick={() => setMapTheme('satellite')}
            className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
              mapTheme === 'satellite' ? 'bg-[#1C1A17] text-white' : 'hover:bg-[#F2ECE4]'
            }`}
          >
            {isVi ? 'Vệ Tinh' : 'Satellite'}
          </button>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-6 left-4 z-20 flex flex-col gap-1 bg-white/95 backdrop-blur-xs border border-[#D5CCC2] rounded-xs shadow-md p-1">
        <button
          onClick={() => setZoom((z) => Math.min(1.5, z + 0.15))}
          className="p-2 hover:bg-[#F2ECE4] text-[#1C1A17] rounded-xs transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.85, z - 0.15))}
          className="p-2 hover:bg-[#F2ECE4] text-[#1C1A17] rounded-xs transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setZoom(1);
          }}
          className="p-2 hover:bg-[#F2ECE4] text-[#1C1A17] rounded-xs transition-colors cursor-pointer border-t border-[#DED9CD]"
          title="Reset View"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#6B5E52]" />
        </button>
      </div>

      {/* Scale & Compass Marker */}
      <div className="absolute bottom-6 right-4 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-xs px-2.5 py-1 text-[10px] text-[#6B5E52] border border-[#D5CCC2] rounded-xs">
        <Navigation className="w-3 h-3 text-[#1C1A17]" />
        <span>N • USA / GLOBAL DIRECTORY</span>
      </div>

      {/* International Flagship Inset (TP. Hồ Chí Minh) */}
      <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-xs border border-[#D5CCC2] rounded-xs shadow-xs p-2 text-[10px]">
        <div className="font-bold text-[#1C1A17] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#C5A574]" />
          <span>Global Flagship Gallery:</span>
        </div>
        <div className="text-[#6B5E52]">TP. Hồ Chí Minh, VN</div>
      </div>

      {/* Interactive Map Pins Container with Zoom Scale */}
      <div 
        className="absolute inset-0 transition-transform duration-300 origin-center pointer-events-auto"
        style={{ transform: `scale(${zoom})` }}
      >
        {locations.map((loc) => {
          const { x, y } = getCoordinates(loc.lat, loc.lng);
          const isSelected = selectedId === loc.id;

          return (
            <div
              key={loc.id}
              className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group transition-all duration-200 z-10"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => onSelectLocation(loc.id)}
            >
              {/* Pin Icon with Number Badge */}
              <div className="relative flex flex-col items-center">
                
                {/* Number Badge */}
                <div 
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform duration-200 group-hover:scale-115 ${
                    isSelected
                      ? 'bg-[#1C1A17] text-[#9B522E] ring-4 ring-[#C5A574]/60 scale-120'
                      : 'bg-[#1C1A17] text-white border-2 border-white'
                  }`}
                >
                  {loc.number}
                </div>

                {/* Pin Tip Triangle */}
                <div 
                  className={`w-0 h-0 border-x-4 border-x-transparent border-t-[7px] -mt-0.5 ${
                    isSelected ? 'border-t-[#1C1A17]' : 'border-t-[#1C1A17]'
                  }`}
                />

                {/* Pulse Ring when Selected */}
                {isSelected && (
                  <span className="absolute -bottom-1 w-4 h-2 bg-[#C5A574] rounded-full animate-ping opacity-75" />
                )}

                {/* Hover Tooltip Preview */}
                <div className="hidden group-hover:block absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1C1A17] text-white text-[11px] px-2.5 py-1 rounded-xs shadow-md pointer-events-none z-30">
                  <span className="font-bold">{loc.name}</span>
                  <span className="block text-[9.5px] text-[#C5A574]">{loc.city}, {loc.state}</span>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Selected Card Details Overlay (Matching Jensen Outdoor Experience) */}
      {selectedLoc && (
        <div className="absolute bottom-6 left-16 right-16 sm:left-auto sm:right-6 sm:max-w-sm z-30 bg-white border border-[#D5CCC2] p-4 sm:p-5 rounded-xs shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1C1A17] text-white flex items-center justify-center text-[10px] font-bold">
                {selectedLoc.number}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#9B522E] bg-[#F8F6F2] px-2 py-0.5 border border-[#DED9CD]">
                {selectedLoc.type === 'showroom' ? (isVi ? 'Design Showroom' : 'Design Showroom') : (isVi ? 'Đại Lý Ủy Quyền' : 'Authorized Retailer')}
              </span>
            </div>
            <button
              onClick={() => onSelectLocation('')}
              className="text-[#8C7A6B] hover:text-[#1C1A17] text-xs font-bold p-1 cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1A17] leading-snug mb-1">
            {selectedLoc.name}
          </h4>

          <div className="space-y-1.5 text-xs text-[#5C5046] my-3">
            <div className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8C7A6B] shrink-0 mt-0.5" />
              <span>
                {selectedLoc.address}
                {selectedLoc.suite && `, ${selectedLoc.suite}`}
                <br />
                {selectedLoc.city}, {selectedLoc.state} {selectedLoc.zip}
              </span>
            </div>

            {selectedLoc.contactPerson && (
              <div className="flex items-center gap-1.5 font-medium text-[#1C1A17]">
                <span>Concierge:</span>
                <span>{selectedLoc.contactPerson}</span>
              </div>
            )}

            {selectedLoc.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#8C7A6B] shrink-0" />
                <a href={`tel:${selectedLoc.phone.replace(/[^0-9]/g, '')}`} className="hover:underline">
                  {selectedLoc.phone}
                </a>
              </div>
            )}

            {selectedLoc.hours && (
              <div className="flex items-center gap-1.5 text-[11px] text-[#6B5E52]">
                <Clock className="w-3.5 h-3.5 text-[#8C7A6B] shrink-0" />
                <span>{isVi && selectedLoc.hoursVi ? selectedLoc.hoursVi : selectedLoc.hours}</span>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#F0EBE3]">
            {onBookAppointment && (
              <button
                onClick={() => onBookAppointment(selectedLoc)}
                className="flex-1 py-2 px-3 bg-[#1C1A17] hover:bg-[#38332E] text-white text-[11px] font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A574]" />
                <span>{isVi ? 'Đặt Lịch Hẹn' : 'By Appointment'}</span>
              </button>
            )}

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${selectedLoc.name} ${selectedLoc.address} ${selectedLoc.city} ${selectedLoc.state}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-[#F8F6F2] hover:bg-[#EAE4D9] text-[#1C1A17] border border-[#D5CCC2] text-[11px] font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1"
            >
              <span>{isVi ? 'Chỉ Đường' : 'Directions'}</span>
              <ExternalLink className="w-3 h-3 text-[#7A6B5F]" />
            </a>
          </div>
        </div>
      )}

    </div>
  );
};
