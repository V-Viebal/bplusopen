import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, TreePine, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StoryVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadStory: () => void;
}

export const StoryVideoModal: React.FC<StoryVideoModalProps> = ({
  isOpen,
  onClose,
  onReadStory,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

  if (!isOpen) return null;

  const chapters = [
    {
      time: '0:00 - 0:45',
      title: isVi ? '1. Rừng Nhiệt Đới Bolivia' : '1. The Bolivian Dry Forest',
      desc: isVi
        ? 'Bảo tồn hơn 2 triệu mẫu rừng tự nhiên với chu kỳ khai thác chọn lọc 30 năm nghiêm ngặt.'
        : 'Protecting over 2 million acres through a 30-year selective harvest cycle in Eastern Bolivia.',
    },
    {
      time: '0:46 - 1:30',
      title: isVi ? '2. Điêu Khắc & Khớp Mộng Thủ Công' : '2. Heritage Joinery & Craft',
      desc: isVi
        ? 'Mộng ghép mộng rãnh truyền thống, không đinh ốc lộ thiên, tôi luyện bởi nghệ nhân bậc thầy.'
        : 'Mortise-and-tenon craftsmanship without exposed fasteners, sculpted by master guild artisans.',
    },
    {
      time: '1:31 - 2:15',
      title: isVi ? '3. Vẻ Đẹp Vĩnh Cửu Bên Gia Đình' : '3. Living Beyond Walls',
      desc: isVi
        ? 'Nội thất gia bảo vượt qua giông bão thời tiết, trường tồn cùng nhiều thế hệ gia đình.'
        : 'Heirloom furnishings designed to dissolve boundaries between home and nature for generations.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#1C140F] text-white max-w-4xl w-full rounded-sm overflow-hidden shadow-2xl border border-white/15 relative flex flex-col max-h-[90vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#160F0B]">
          <div className="flex items-center gap-2">
            <TreePine className="w-4 h-4 text-[#9B522E]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#EADBCE]">
              {isVi ? 'Phim Tài Liệu B+Open • From Our Forest to Your Family' : 'B+Open Documentary • From Our Forest to Your Family'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video simulation viewport */}
        <div className="relative aspect-video bg-black overflow-hidden group">
          <img
            src={
              activeChapter === 0
                ? 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1600&q=80'
                : activeChapter === 1
                ? 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=80'
                : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
            }
            alt="Bolivian Forest and Craft Documentary"
            className={`w-full h-full object-cover transition-all duration-1000 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Center Play/Pause indicator */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-white/30 transition-all shadow-xl">
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
            </div>
          </button>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-[#9B522E] cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-[#9B522E] cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="font-mono text-[11px] text-white/70">
                {activeChapter === 0 ? '0:28 / 2:15' : activeChapter === 1 ? '1:12 / 2:15' : '1:58 / 2:15'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-[#4A7C59] text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs">
                100% FSC® Certified
              </span>
              <span className="text-[11px] text-[#9B522E] font-mono">4K UHD</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-[#9B522E] transition-all duration-300"
              style={{
                width: activeChapter === 0 ? '30%' : activeChapter === 1 ? '65%' : '95%',
              }}
            />
          </div>
        </div>

        {/* Chapters & Story Context */}
        <div className="p-5 sm:p-6 bg-[#160F0B] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChapter(idx)}
                className={`p-3 text-left rounded-xs border transition-all cursor-pointer ${
                  activeChapter === idx
                    ? 'bg-white/10 border-[#9B522E] text-white'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                <div className="text-[10px] font-mono text-[#9B522E] uppercase mb-0.5">{ch.time}</div>
                <div className="font-serif text-sm font-medium mb-1">{ch.title}</div>
                <div className="text-[11px] text-white/60 leading-snug">{ch.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/10">
            <div className="text-xs text-white/70">
              <span className="text-[#9B522E] font-semibold">{isVi ? 'Cam Kết 30 Năm:' : '30-Year Rotation:'}</span>{' '}
              {isVi
                ? 'Không chặt trắng. Chỉ khai thác những cây già đã đạt chu kỳ và nuôi dưỡng cây mẹ.'
                : 'Zero clear-cutting. We selectively harvest mature canopy trees while safeguarding seed-bearing parent timber.'}
            </div>
            <button
              onClick={() => {
                onClose();
                onReadStory();
              }}
              className="px-5 py-2.5 bg-[#9B522E] hover:bg-[#D8BEA0] text-[#1C140F] text-xs font-semibold uppercase tracking-[0.15em] flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <span>{isVi ? 'Đọc Toàn Bộ Câu Chuyện' : 'Read Our Full Story'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
