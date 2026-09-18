import React, { useState } from 'react';
import { X, Eye, Compass, RotateCw, MapPin, Calendar, Check, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VirtualShowroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToShowrooms: () => void;
}

export const VirtualShowroomModal: React.FC<VirtualShowroomModalProps> = ({
  isOpen,
  onClose,
  onNavigateToShowrooms,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const [activeZone, setActiveZone] = useState<'terrace' | 'dining' | 'poolside'>('terrace');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  if (!isOpen) return null;

  const zones = {
    terrace: {
      name: isVi ? 'Khu Vực Hiên Sân Vườn Biệt Thự' : 'Estate Veranda & Lounge',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      hotspots: [
        {
          id: 1,
          x: '38%',
          y: '58%',
          title: 'Lumino Sectional Sofa',
          desc: isVi ? 'Nan gỗ Ipe nguyên khối 100% FSC®, đệm bọc vải Sunbrella® Cast Linen.' : '100% FSC® Bolivian Ipe solid slats with Sunbrella® Cast Linen tailored box cushions.',
        },
        {
          id: 2,
          x: '62%',
          y: '65%',
          title: 'LUMA Coffee Table 2',
          desc: isVi ? 'Mặt bàn nan gỗ teak, khung thép sơn tĩnh điện RAL.' : 'Teak slat tabletop with a RAL powder-coated steel frame.',
        },
      ],
    },
    dining: {
      name: isVi ? 'Không Gian Bàn Ăn Đại Tiệc' : 'Grand Pavilion Dining',
      image: '/luma/scene-18.webp',
      hotspots: [
        {
          id: 3,
          x: '48%',
          y: '62%',
          title: 'LUMA Dining Table 2',
          desc: isVi ? 'Bàn ăn 2600 × 1000 × 750 mm, mặt teak, khung thép sơn tĩnh điện.' : '2600 × 1000 × 750 mm dining table, teak top and powder-coated steel frame.',
        },
        {
          id: 4,
          x: '28%',
          y: '68%',
          title: 'LUMA Dining Chair',
          desc: isVi ? 'Khung nhôm sơn tĩnh điện, tựa đan dây và đệm thoát nước nhanh.' : 'Powder-coated aluminum, woven cord backrest and quick-dry cushions.',
        },
      ],
    },
    poolside: {
      name: isVi ? 'Sân Thượng Hồ Bơi & Tắm Nắng' : 'Poolside Solarium & Cabana',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85',
      hotspots: [
        {
          id: 5,
          x: '52%',
          y: '55%',
          title: 'Bloom Wheeled Chaise Lounger',
          desc: isVi ? 'Bánh xe đồng thau bọc cao su chịu lực, 5 nấc ngả tựa từ đọc sách tới nằm phẳng.' : 'Solid brass rubber-tread wheels, 5-position reclining backrest for restorative sun lounging.',
        },
      ],
    },
  };

  const currentZone = zones[activeZone];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#1C140F] text-white max-w-5xl w-full rounded-sm overflow-hidden shadow-2xl border border-white/15 relative flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#160F0B]">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#C4A482]" />
            <div>
              <div className="font-serif text-lg font-medium text-white">
                {isVi ? 'Showroom 3D Thực Tế Ảo B+Open' : 'B+Open Interactive 3D Showroom'}
              </div>
              <div className="text-[10px] text-[#C4A482] uppercase tracking-wider">
                {isVi ? 'Tham quan không gian thiết kế ảo 360°' : 'Tour our design center & virtual showcases'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onNavigateToShowrooms();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C4A482] hover:bg-[#D8BEA0] text-[#1C140F] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isVi ? 'Tìm Showroom Gần Bạn' : 'Locate Physical Showroom'}</span>
            </button>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white p-1 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport with interactive hotspots */}
        <div className="relative flex-1 bg-black overflow-hidden min-h-[380px] sm:min-h-[480px]">
          <img
            src={currentZone.image}
            alt={currentZone.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />

          {/* Hotspots */}
          {currentZone.hotspots.map((spot) => (
            <div
              key={spot.id}
              style={{ left: spot.x, top: spot.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                className="relative group cursor-pointer"
              >
                <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-[#C4A482] opacity-75"></span>
                <div className="relative inline-flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#1C140F] font-bold text-xs shadow-xl border-2 border-[#C4A482] hover:scale-110 transition-transform">
                  +
                </div>
              </button>

              {/* Tooltip Card */}
              {activeHotspot === spot.id && (
                <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-64 bg-white text-[#1C1A17] p-3.5 rounded-sm shadow-2xl border border-[#EAE3DA] animate-in zoom-in-95 duration-150 z-30">
                  <div className="flex items-start justify-between">
                    <h4 className="font-serif font-semibold text-sm text-[#1C1A17]">{spot.title}</h4>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="text-gray-400 hover:text-black cursor-pointer ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-[#6B5E52] mt-1 leading-relaxed">{spot.desc}</p>
                  <div className="mt-2 text-[10px] text-[#8C5535] font-semibold uppercase tracking-wider">
                    100% FSC® Bolivian Ipe
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Current Zone Label */}
          <div className="absolute top-4 left-6 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xs border border-white/20 text-xs font-serif text-white">
            {currentZone.name}
          </div>

          <div className="absolute bottom-4 right-6 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xs border border-white/20 text-[10px] uppercase tracking-widest text-[#EADBCE] flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#C4A482]" />
            <span>{isVi ? 'Bấm vào dấu + để xem chi tiết sản phẩm' : 'Click + hotspots for specifications'}</span>
          </div>
        </div>

        {/* Zone Selector Bar */}
        <div className="px-6 py-4 bg-[#160F0B] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-white/50 mr-2">
              {isVi ? 'Khu Vực:' : 'Environments:'}
            </span>
            <button
              onClick={() => {
                setActiveZone('terrace');
                setActiveHotspot(null);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-xs transition-colors cursor-pointer font-medium ${
                activeZone === 'terrace'
                  ? 'bg-[#C4A482] text-[#1C140F] font-semibold'
                  : 'bg-white/10 text-white/80 hover:bg-white/15'
              }`}
            >
              {isVi ? 'Hiên Sân Vườn' : 'Veranda Lounge'}
            </button>
            <button
              onClick={() => {
                setActiveZone('dining');
                setActiveHotspot(null);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-xs transition-colors cursor-pointer font-medium ${
                activeZone === 'dining'
                  ? 'bg-[#C4A482] text-[#1C140F] font-semibold'
                  : 'bg-white/10 text-white/80 hover:bg-white/15'
              }`}
            >
              {isVi ? 'Bàn Ăn Đại Tiệc' : 'Grand Dining'}
            </button>
            <button
              onClick={() => {
                setActiveZone('poolside');
                setActiveHotspot(null);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-xs transition-colors cursor-pointer font-medium ${
                activeZone === 'poolside'
                  ? 'bg-[#C4A482] text-[#1C140F] font-semibold'
                  : 'bg-white/10 text-white/80 hover:bg-white/15'
              }`}
            >
              {isVi ? 'Hồ Bơi Nghỉ Dưỡng' : 'Poolside'}
            </button>
          </div>

          <div className="text-[11px] text-white/60 flex items-center gap-2">
            <span>B+Open Atlanta Design Center & Virtual Pavilion</span>
          </div>
        </div>
      </div>
    </div>
  );
};
