import React, { useState } from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { JensenLeafLogo } from './JensenLeafLogo';
import { VirtualShowroomModal } from './VirtualShowroomModal';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Calendar, 
  ExternalLink, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Maximize2,
  ChevronRight,
  Info,
  Car,
  UserCheck
} from 'lucide-react';

interface DesignShowroomDetailProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string; productId?: string }) => void;
  onOpenCatalogModal?: () => void;
  onOpenTradeModal?: () => void;
}

interface ShowroomData {
  id: string;
  name: string;
  nameVi: string;
  city: string;
  badge: string;
  badgeVi: string;
  building: string;
  suite: string;
  address: string;
  hours: string;
  hoursVi: string;
  phone: string;
  email: string;
  concierge: string;
  conciergeTitle: string;
  conciergeTitleVi: string;
  description: string;
  descriptionVi: string;
  parkingInfo: string;
  parkingInfoVi: string;
  heroImage: string;
  galleryImages: {
    url: string;
    caption: string;
    captionVi: string;
    tag: string;
  }[];
  displayedCollections: {
    id: string;
    name: string;
    category: string;
    categoryVi: string;
    description: string;
    descriptionVi: string;
    image: string;
    specs: string[];
    specsVi: string[];
  }[];
  amenities: {
    title: string;
    titleVi: string;
    desc: string;
    descVi: string;
  }[];
}

export const DesignShowroomDetail: React.FC<DesignShowroomDetailProps> = ({
  onNavigate,
  onOpenCatalogModal,
  onOpenTradeModal,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // Active showroom tab: default to 'atlanta' (Jensen Outdoor Flagship Showroom)
  const [activeShowroomId, setActiveShowroomId] = useState<string>('atlanta');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [isVirtualModalOpen, setIsVirtualModalOpen] = useState<boolean>(false);

  // Appointment Modal State
  const [isAppointmentOpen, setIsAppointmentOpen] = useState<boolean>(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    firm: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: 'Morning (10:00 AM - 12:00 PM)',
    visitType: 'Specification Consultation & Swatches',
    guestCount: '1 - 2 Guests',
    notes: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const SHOWROOMS: ShowroomData[] = [
    {
      id: 'atlanta',
      name: 'AmericasMart Atlanta Flagship Showroom',
      nameVi: 'Showroom Flagship AmericasMart Atlanta',
      city: 'Atlanta, GA',
      badge: "World's Largest Collection",
      badgeVi: 'Bộ Sưu Tập Lớn Nhất Thế Giới',
      building: 'AmericasMart Atlanta, Building 1',
      suite: 'Floor 4, Suite 4-A-4',
      address: '24 John Portman Blvd NW, Atlanta, GA 30303',
      hours: 'Monday – Friday: 9:00 AM – 5:00 PM EST (Open Daily to the Trade & by Appointment)',
      hoursVi: 'Thứ 2 – Thứ 6: 9:00 – 17:00 (Mở cửa hàng ngày cho giới thiết kế & theo lịch hẹn)',
      phone: '(800) 403-0403 ext. 3',
      email: 'showrooms@jensenoutdoor.com',
      concierge: 'Valerie Waidele',
      conciergeTitle: 'Flagship Showroom Director & Trade Concierge',
      conciergeTitleVi: 'Giám Đốc Showroom Flagship & Quản Lý Đối Tác Trade',
      description: 'Opened as our premier global flagship, the AmericasMart Atlanta showroom hosts the world’s most extensive permanent display of B+Open heirloom timber furniture. Spanning over 6,500 square feet of curated outdoor environments, interior designers, landscape architects, and hospitality procurers can touch the silken grain of 100% FSC®-certified Bolivian Ipe, explore our floor-to-ceiling Sunbrella® textile library, and conduct private client consultations.',
      descriptionVi: 'Khai trương với tư cách là showroom flagship toàn cầu, không gian tại AmericasMart Atlanta lưu giữ bộ sưu tập nội thất gỗ gia bảo B+Open lớn nhất thế giới. Trải rộng hơn 600m² với các không gian sắp đặt sân vườn thực tế, các kiến trúc sư, nhà thiết kế nội thất và chủ đầu tư resort có thể trực tiếp chạm vào thớ gỗ Ipe Bolivia 100% FSC® mịn như lụa, trải nghiệm thư viện vải Sunbrella® chạm trần và tổ chức các buổi thuyết trình dự án riêng tư cho khách hàng.',
      parkingInfo: 'Valet and covered self-parking available directly adjacent at the AmericasMart Building 1 Deck on Ted Turner Dr NW. Express elevator bank provides direct access to Floor 4.',
      parkingInfoVi: 'Dịch vụ valet và bãi đỗ xe có mái che ngay sát cạnh tại Tòa nhà AmericasMart Building 1 (đường Ted Turner Dr NW). Hệ thống thang máy tốc hành đưa thẳng lên Tầng 4.',
      heroImage: 'https://www.jensenoutdoor.com/wp-content/uploads/2020/10/forte-68400-68420-68710-68720-h-1.jpg',
      galleryImages: [
        {
          url: 'https://www.jensenoutdoor.com/wp-content/uploads/2020/10/forte-68400-68420-68710-68720-h-1.jpg',
          caption: 'Forte Lounge Vignette with Low-slung Ipe Seating and Plinth Coffee Table',
          captionVi: 'Không gian phòng khách ngoài trời Forte với sofa gỗ Ipe và bàn trà đá nguyên khối',
          tag: 'Living Pavilion'
        },
        {
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
          caption: 'Lumino Deep Seating Sectional with Tailored Sunbrella® Cast Linen Cushions',
          captionVi: 'Bộ sofa góc Lumino bản rộng với đệm may đo chuẩn mực chất liệu Sunbrella® Cast Linen',
          tag: 'Veranda Suite'
        },
        {
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
          caption: 'Tempo 10-Person Extending Dining Table and Contoured Woven Armchairs',
          captionVi: 'Bàn ăn mở rộng Tempo 10 chỗ ngồi cùng ghế ăn đan sợi mây thủ công đạt giải Lilly Award',
          tag: 'Grand Dining'
        },
        {
          url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85',
          caption: 'Opal & Bloom Poolside Cabana Setting with Wheeled Chaise Loungers',
          captionVi: 'Không gian tắm nắng hồ bơi Opal & Bloom với giường nằm gắn bánh xe tiện lợi',
          tag: 'Poolside & Solarium'
        },
        {
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
          caption: 'Designers Workspace & Sunbrella® Floor-to-Ceiling Textile Swatch Wall',
          captionVi: 'Khu vực làm việc kiến trúc sư và bức tường trưng bày mẫu vải Sunbrella® toàn bộ mã màu',
          tag: 'Materials Library'
        }
      ],
      displayedCollections: [
        {
          id: 'forte',
          name: 'Forte Deep Seating',
          category: 'Outdoor Lounge',
          categoryVi: 'Phòng Khách Sân Vườn',
          description: 'Substantial rectangular timber frames, wide plank arms that double as drinks perches, and plush multi-layer outdoor cushioning.',
          descriptionVi: 'Khung gỗ Ipe chữ nhật bề thế, tay vịn nan rộng kiêm bàn đặt ly cocktail và đệm bọt biển đàn hồi kháng nước đa tầng.',
          image: 'https://www.jensenoutdoor.com/wp-content/uploads/2020/10/forte-68400-68420-68710-68720-h-1.jpg',
          specs: ['100% FSC® Bolivian Ipe', 'Sunbrella® Rain Fabric Available', 'Blind Mortise Joinery'],
          specsVi: ['100% Gỗ Ipe Bolivia FSC®', 'Tùy chọn vải Sunbrella® kháng mưa', 'Mộng ghép âm kín']
        },
        {
          id: 'lumino',
          name: 'Lumino Sectional',
          category: 'Modular Seating',
          categoryVi: 'Sofa Góc Module',
          description: 'Architectural horizontal cadence with pronounced shadowlines, anchoring contemporary estate terraces and seaside decks.',
          descriptionVi: 'Nhịp điệu kiến trúc nan ngang tối giản với đường viền bóng đổ sâu, tôn vinh hiên nhà biệt thự và sàn ban công hướng biển.',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          specs: ['Modular Configurations', '3,680 Janka Timber', 'Concealed Fasteners'],
          specsVi: ['Đa dạng phương án ghép góc', 'Độ cứng Janka 3.680', 'Phụ kiện inox 316 ẩn']
        },
        {
          id: 'tempo',
          name: 'Tempo Dining Suite',
          category: 'Extendable Dining',
          categoryVi: 'Bàn Ăn',
          description: 'Recipient of the Casual Furniture World Best of Show and Lilly Award. Combines precision Ipe timber with hand-plaited all-weather cord.',
          descriptionVi: 'Đạt giải Best of Show và Giải thưởng Lilly danh giá. Kết hợp gỗ Ipe chuẩn xác cùng sợi đan dây dù chịu thời tiết.',
          image: '/luma/scene-18.webp',
          specs: ['Butterfly Leaf Mechanism', 'Seats 8 to 12 Guests', 'Lilly Design Award Winner'],
          specsVi: ['Cơ cấu cánh bướm tự động', 'Mở rộng 8 - 12 chỗ ngồi', 'Giải thưởng thiết kế Lilly']
        },
        {
          id: 'opal',
          name: 'Opal Sun Loungers',
          category: 'Poolside & Chaise',
          categoryVi: 'Giường Nằm Bể Bơi',
          description: 'Gentle organic curves sculpted from dense timber, fitted with rubber-tread solid brass wheels and multi-position recline hardware.',
          descriptionVi: 'Đường cong sinh học mềm mại điêu khắc từ gỗ Ipe đầm chắc, trang bị bánh xe đồng bọc cao su và 5 nấc ngả tựa lưng.',
          image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
          specs: ['5-Position Ratchet Back', 'Solid Brass Inlaid Wheels', 'Quick-Drain Core'],
          specsVi: ['5 nấc điều chỉnh ngả lưng', 'Bánh xe đồng thau bọc cao su', 'Lõi mút thoát nước siêu tốc']
        }
      ],
      amenities: [
        {
          title: 'Complimentary Swatch & Finish Box',
          titleVi: 'Hộp Mẫu Vật Liệu Miễn Phí',
          desc: 'Pick up or order your studio sample box containing smooth and weathered Bolivian Ipe wood blocks and Sunbrella® fabric rings.',
          descVi: 'Nhận trực tiếp tại showroom hoặc yêu cầu chuyển phát hộp mẫu gỗ Ipe hoàn thiện tự nhiên/lên màu patina kèm xấp vải Sunbrella®.'
        },
        {
          title: 'Private Designer Conference Suite',
          titleVi: 'Phòng Họp & Thuyết Trình Riêng',
          desc: 'Reserve a dedicated space with 4K display monitors, Wi-Fi, and material presentation tables to host your residential or hospitality clients.',
          descVi: 'Đặt trước phòng họp riêng biệt trang bị màn hình trình chiếu 4K, Wi-Fi tốc độ cao và bàn trải mẫu vật liệu để tiếp khách hàng tư gia/dự án.'
        },
        {
          title: 'Direct Quoting & Trade Accounts',
          titleVi: 'Báo Giá Dự Án & Chiết Khấu Trade',
          desc: 'Receive immediate tiered trade pricing, reserve warehouse inventory, and review custom cushion lead times directly with our director.',
          descVi: 'Nhận ngay bảng giá chiết khấu thương mại, giữ chỗ số lượng tồn kho và xác nhận tiến độ may đo đệm Sunbrella với giám đốc showroom.'
        },
        {
          title: '2D CAD & 3D BIM Spec Station',
          titleVi: 'Trạm Kỹ Thuật Số CAD & 3D BIM',
          desc: 'Access our high-speed specification library with 3D Revit, SketchUp, and AutoCAD files ready for immediate drag-and-drop into your project plans.',
          descVi: 'Truy cập kho dữ liệu số hóa hoàn chỉnh với file Revit, SketchUp và AutoCAD chuẩn xác để đưa ngay vào bản vẽ thiết kế dự án của bạn.'
        }
      ]
    },
    {
      id: 'high-point',
      name: 'High Point Market Showroom',
      nameVi: 'Showroom Triển Lãm High Point Market',
      city: 'High Point, NC',
      badge: 'Interhall 308 • Market Hub',
      badgeVi: 'Không Gian Interhall 308',
      building: 'IHFC Design Center, Space Interhall 308',
      suite: 'Interhall Floor 3, Booth 308',
      address: '210 E Commerce Ave, High Point, NC 27260',
      hours: 'Open for Spring & Fall Markets, and Year-Round by Appointment for Trade Specifiers',
      hoursVi: 'Mở cửa các kỳ Triển lãm Mùa Xuân & Mùa Thu, và mở quanh năm theo lịch hẹn cho giới thiết kế',
      phone: '(336) 887-3400',
      email: 'highpoint@jensenoutdoor.com',
      concierge: 'High Point Trade Team',
      conciergeTitle: 'Market Operations & Contract Liaison',
      conciergeTitleVi: 'Điều Hành Thị Trường & Hỗ Trợ Dự Án Thương Mại',
      description: 'Nestled in the prestigious Interhall section of the International Home Furnishings Center (IHFC), this showroom debuts our newest seasonal design collaborations. It serves as the primary meeting ground for North American interior designers and residential retail buyers looking to preview prototype releases and test ergonomics.',
      descriptionVi: 'Tọa lạc tại khu vực Interhall danh giá của Trung tâm Nội thất Quốc tế IHFC, showroom này là nơi ra mắt các bộ sưu tập thiết kế mùa mới nhất. Đây là điểm hẹn thường niên của các nhà thiết kế nội thất Bắc Mỹ và đại diện bán lẻ cao cấp để chiêm ngưỡng các mẫu sản phẩm mới nhất.',
      parkingInfo: 'IHFC Market parking shuttles and dedicated downtown High Point valet parking throughout market weeks.',
      parkingInfoVi: 'Xe bus đưa đón nội khu IHFC và bãi đỗ xe valet trung tâm High Point trong các tuần lễ diễn ra triển lãm.',
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      galleryImages: [
        {
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
          caption: 'High Point IHFC Interhall 308 Exhibition Entrance',
          captionVi: 'Khu vực trưng bày chính tại Interhall 308, IHFC High Point',
          tag: 'Market Space'
        },
        {
          url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
          caption: 'Soleo Sofa & Architectural Occasional Tables Setting',
          captionVi: 'Bộ sofa Soleo kết hợp bàn trà kiến trúc nan gỗ Ipe',
          tag: 'Designer Spotlight'
        },
        {
          url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1600&q=80',
          caption: 'Raw Timber Joinery and Material Cut-Sheet Exhibition',
          captionVi: 'Triển lãm cấu trúc mộng gỗ Ipe nguyên bản và quy trình xử lý',
          tag: 'Craftsmanship'
        }
      ],
      displayedCollections: [
        {
          id: 'lumino',
          name: 'Lumino Collection',
          category: 'Deep Seating',
          categoryVi: 'Sofa Cao Cấp',
          description: 'Architectural lines engineered with 100% FSC® Bolivian Ipe timber and Sunbrella® performance fabrics.',
          descriptionVi: 'Đường nét kiến trúc thanh thoát từ gỗ Ipe Bolivia 100% FSC® cùng vải ngoài trời Sunbrella®.',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          specs: ['3-Seat Sofa', 'Club Armchair', 'Cocktail Plinth'],
          specsVi: ['Sofa 3 chỗ', 'Ghế bành đơn', 'Bàn trà vuông']
        },
        {
          id: 'luma',
          name: 'Luma Dining Table',
          category: 'Dining',
          categoryVi: 'Bàn Ăn',
          description: 'LUMA dining table with a teak slat top and powder-coated steel frame.',
          descriptionVi: 'Bàn ăn LUMA mặt nan gỗ teak, khung thép sơn tĩnh điện.',
          image: '/luma/scene-18.webp',
          specs: ['Teak tabletop', 'Powder-coated steel', 'Woven dining chairs'],
          specsVi: ['Mặt bàn teak', 'Khung thép sơn tĩnh điện', 'Ghế ăn đan dây']
        }
      ],
      amenities: [
        {
          title: 'Market Previews & Prototyping',
          titleVi: 'Xem Trước Sản Phẩm Mới',
          desc: 'Preview upcoming seasonal releases and provide direct feedback to our design engineering team.',
          descVi: 'Trải nghiệm sớm các mẫu thiết kế sắp ra mắt và trao đổi trực tiếp với đội ngũ kỹ sư thiết kế.'
        },
        {
          title: 'Direct Market Ordering',
          titleVi: 'Đặt Hàng Trực Tiếp Tại Triển Lãm',
          desc: 'Take advantage of special Market program terms and guaranteed container shipping priority.',
          descVi: 'Hưởng chính sách ưu đãi đặc quyền mùa Market và ưu tiên giữ container xuất xưởng sớm nhất.'
        }
      ]
    },
    {
      id: 'chicago',
      name: 'theMART Chicago Design Center',
      nameVi: 'Trung Tâm Thiết Kế theMART Chicago',
      city: 'Chicago, IL',
      badge: 'theMART Suite 15-110',
      badgeVi: 'Suite 15-110 theMART',
      building: 'The Merchandise Mart (theMART)',
      suite: 'Floor 15, Suite 15-110',
      address: '222 W Merchandise Mart Plaza, Chicago, IL 60654',
      hours: 'Monday – Friday: 9:00 AM – 5:00 PM CST (By Appointment & Casual Market)',
      hoursVi: 'Thứ 2 – Thứ 6: 9:00 – 17:00 (Theo lịch hẹn & các kỳ Casual Market)',
      phone: '(312) 527-4141',
      email: 'chicago@jensenoutdoor.com',
      concierge: 'Midwest Regional Concierge',
      conciergeTitle: 'Midwest Design Representative',
      conciergeTitleVi: 'Đại Diện Thiết Kế Khu Vực Trung Tây Hoa Kỳ',
      description: 'Located inside the legendary Merchandise Mart along the Chicago River, our Midwestern gallery showcases complete residential living suites, custom finish displays, and contract grade hospitality sets tailored for lakehouse estates and urban rooftop verandas.',
      descriptionVi: 'Tọa lạc bên bờ sông Chicago trong tòa nhà huyền thoại The Merchandise Mart, không gian trưng bày mang đến các bộ sưu tập phòng khách, bàn ăn ngoài trời và giải pháp nội thất nghỉ dưỡng cho các biệt thự ven hồ và sân thượng đô thị.',
      parkingInfo: 'Mart Parc Orleans and Kinzie parking garages with covered pedestrian walkway into theMart.',
      parkingInfoVi: 'Nhà xe Mart Parc Orleans và Kinzie với lối đi bộ có mái che kết nối thẳng vào theMART.',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      galleryImages: [
        {
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
          caption: 'theMART Gallery Floor with Lumino Living Vignette',
          captionVi: 'Không gian trưng bày bộ sưu tập Lumino tại theMART Chicago',
          tag: 'Midwest Hub'
        },
        {
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
          caption: 'LUMA Dining and Fabric Customization Studio',
          captionVi: 'Studio phối màu vải và bàn ăn LUMA',
          tag: 'Textile Studio'
        }
      ],
      displayedCollections: [
        {
          id: 'tempo',
          name: 'Tempo Dining Collection',
          category: 'Dining',
          categoryVi: 'Bàn Ăn Đạt Giải',
          description: 'Lillian B. Westchester "Best of Show" Award winner at Casual Market Chicago.',
          descriptionVi: 'Đạt giải Lillian B. Westchester "Best of Show" tại kỳ Casual Market Chicago.',
          image: '/luma/scene-18.webp',
          specs: ['Extending Table', 'Woven Cord Arms', 'Marine Hardware'],
          specsVi: ['Bàn mở rộng', 'Tay vịn đan dây', 'Inox chuẩn hàng hải']
        }
      ],
      amenities: [
        {
          title: 'Private Client Specifying',
          titleVi: 'Tư Vấn Thiết Kế Khách Hàng',
          desc: 'Work with your clients in a serene design-center atmosphere with full access to finish rings.',
          descVi: 'Làm việc cùng khách hàng trong không gian yên tĩnh và chuyên nghiệp với đầy đủ bảng mẫu hoàn thiện.'
        }
      ]
    },
    {
      id: 'richmond',
      name: 'Richmond Trade & Contract Studio',
      nameVi: 'Showroom & Trung Tâm Thương Mại Richmond',
      city: 'Richmond, VA',
      badge: 'Mid-Atlantic Trade Hub',
      badgeVi: 'Trung Tâm Dự Án Mid-Atlantic',
      building: 'B+Open East Coast Headquarters',
      suite: 'Design Center & Logistics Campus',
      address: 'Richmond Design District, Richmond, VA 23230',
      hours: 'Monday – Friday: 8:30 AM – 4:30 PM EST (By Appointment)',
      hoursVi: 'Thứ 2 – Thứ 6: 8:30 – 16:30 (Theo lịch hẹn trước)',
      phone: '(800) 403-0403',
      email: 'trade@jensenoutdoor.com',
      concierge: 'Mid-Atlantic Trade Operations',
      conciergeTitle: 'Contract Logistics & Commercial Specifier Team',
      conciergeTitleVi: 'Đội Ngũ Quản Lý Hợp Đồng & Dự Án Thương Mại',
      description: 'Our East Coast hub provides architectural specifiers, hospitality developers, and landscape designers with direct access to physical inventory checks, custom cushion shop tours, and massive raw timber weathering test racks.',
      descriptionVi: 'Trung tâm Bờ Đông của chúng tôi hỗ trợ các kiến trúc sư dự án, chủ đầu tư khách sạn và nhà thiết kế cảnh quan kiểm tra thực tế hàng hóa, tham quan xưởng may đệm may đo và xem các giàn kiểm tra độ phong hóa tự nhiên của gỗ Ipe.',
      parkingInfo: 'Complimentary private on-site parking at our Richmond design center facility.',
      parkingInfoVi: 'Bãi đỗ xe riêng miễn phí trong khuôn viên trung tâm thiết kế Richmond.',
      heroImage: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1600&q=80',
      galleryImages: [
        {
          url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1600&q=80',
          caption: 'Bolivian Ipe Weathering Racks & Finish Comparison Laboratory',
          captionVi: 'Khu vực kiểm tra độ bền phong hóa và so sánh màu hoàn thiện gỗ Ipe',
          tag: 'Testing Lab'
        },
        {
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
          caption: 'Contract Hospitality Mockup Lounge',
          captionVi: 'Không gian dựng mẫu thử cho dự án resort và khách sạn',
          tag: 'Contract Hub'
        }
      ],
      displayedCollections: [
        {
          id: 'richmond',
          name: 'Richmond Classic Benches & Dining',
          category: 'Estate Architecture',
          categoryVi: 'Kiến Trúc Sân Vườn',
          description: 'Substantial garden benches, monumental refectory tables, and heirloom garden accessories.',
          descriptionVi: 'Ghế băng vườn cổ điển vững chãi, bàn tiệc dài truyền thống và phụ kiện sân vườn gia bảo.',
          image: '/luma/scene-18.webp',
          specs: ['Traditional Joinery', 'Solid Timber Planks', 'Heavy Commercial Grade'],
          specsVi: ['Mộng ghép truyền thống', 'Nan gỗ dày nguyên khối', 'Chuẩn dự án thương mại']
        }
      ],
      amenities: [
        {
          title: 'Direct Warehouse & Logistics Access',
          titleVi: 'Kết Nối Trực Tiếp Kho & Vận Chuyển',
          desc: 'Coordinate freight delivery, consolidated shipping, and white-glove installation nationwide.',
          descVi: 'Phối hợp vận chuyển hàng công trình, gom đơn hàng và dịch vụ lắp đặt tận nơi trên toàn quốc.'
        }
      ]
    },
    {
      id: 'vietnam-hcm',
      name: 'B+Open Flagship Gallery HCMC',
      nameVi: 'Không Gian Trưng Bày Flagship TP. Hồ Chí Minh',
      city: 'Ho Chi Minh City, VN',
      badge: 'Southeast Asia Flagship',
      badgeVi: 'Flagship Đông Nam Á',
      building: 'Thảo Điền Design Quarter',
      suite: 'Villa Design Pavilion',
      address: 'Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh, Việt Nam',
      hours: 'Thứ 2 – Thứ 7: 8:30 – 18:30 (Mở cửa tự do & Đặt hẹn tư vấn)',
      hoursVi: 'Thứ 2 – Thứ 7: 8:30 – 18:30 (Mở cửa tự do & Đặt hẹn tư vấn)',
      phone: '+84 (0) 28 3744 5678',
      email: 'concierge@bopen.vn',
      concierge: 'B+Open Concierge Team',
      conciergeTitle: 'Senior Architectural Consultant',
      conciergeTitleVi: 'Chuyên Viên Tư Vấn Kiến Trúc Cao Cấp',
      description: 'Set within an airy tropical villa garden in Thảo Điền, our flagship gallery in Vietnam immerses visitors in the beauty of 100% FSC® Bolivian Ipe under tropical sunlight and monsoon-resilient craftsmanship.',
      descriptionVi: 'Nằm giữa khu biệt thự vườn rợp bóng mát tại Thảo Điền, không gian gallery tại Việt Nam giúp khách hàng cảm nhận chân thực vẻ đẹp của gỗ Ipe Bolivia dưới ánh nắng nhiệt đới và khả năng chống chịu mưa bão tuyệt đối.',
      parkingInfo: 'Chỗ đỗ xe ô tô rộng rãi ngay tại sân trước của gallery.',
      parkingInfoVi: 'Chỗ đỗ xe ô tô rộng rãi ngay tại sân trước của gallery.',
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      galleryImages: [
        {
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
          caption: 'Tropical Veranda Display in Thảo Điền Garden',
          captionVi: 'Không gian trưng bày hiên nhà nhiệt đới giữa vườn Thảo Điền',
          tag: 'Tropical Living'
        },
        {
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
          caption: 'Living Lounge & Tea Area under Pergola',
          captionVi: 'Phòng khách ngoài trời dưới giàn pergola gỗ Ipe',
          tag: 'Villa Lounge'
        }
      ],
      displayedCollections: [
        {
          id: 'lumino',
          name: 'Lumino Living Suite',
          category: 'Deep Seating',
          categoryVi: 'Phòng Khách Biệt Thự',
          description: 'Generous dimensions suited for tropical estates and high-end coastal villas.',
          descriptionVi: 'Kích thước bề thế, thích hợp cho biệt thự sân vườn và căn hộ penthouse cao cấp.',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          specs: ['Tropical Weathering', 'Sunbrella Marine Core', 'Solid Ipe Planks'],
          specsVi: ['Chịu khí hậu nhiệt đới', 'Đệm hàng hải Sunbrella', 'Gỗ Ipe đặc khối']
        }
      ],
      amenities: [
        {
          title: 'Direct Architectural Consultation',
          titleVi: 'Tư Vấn Kiến Trúc Trực Tiếp',
          desc: 'Sit down with our furniture engineers to review floor plans and landscape architecture integration.',
          descVi: 'Trực tiếp ngồi cùng kỹ sư nội thất để xem mặt bằng và phối hợp cảnh quan sân vườn thực tế.'
        }
      ]
    }
  ];

  const activeShowroom = SHOWROOMS.find((s) => s.id === activeShowroomId) || SHOWROOMS[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsAppointmentOpen(false);
      setBookingForm({
        name: '',
        firm: '',
        email: '',
        phone: '',
        date: '',
        timeSlot: 'Morning (10:00 AM - 12:00 PM)',
        visitType: 'Specification Consultation & Swatches',
        guestCount: '1 - 2 Guests',
        notes: '',
      });
    }, 2800);
  };

  return (
    <div id="design-showroom-detail-section" className="bg-[#F8F6F2] text-[#1C1A17] scroll-mt-20">
      
      {/* 1. SHOWROOM HEADER BAR: Distinctive Gold & Timber Identity */}
      <div className="bg-[#181512] text-white border-b border-white/10 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#C5A574] mb-3">
                <JensenLeafLogo className="w-3.5 h-5 text-[#C5A574]" />
                <span>{isVi ? 'HỆ THỐNG SHOWROOM THIẾT KẾ THƯỜNG TRỰC' : 'PERMANENT TRADE DESIGN SHOWROOMS'}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
                {isVi ? 'Không Gian Trưng Bày Cho Giới Thiết Kế' : 'Dedicated Design Showrooms'}
              </h1>
              <p className="mt-4 text-xs sm:text-sm text-white/80 max-w-3xl leading-relaxed font-light">
                {isVi
                  ? 'Nơi các kiến trúc sư, nhà thiết kế nội thất và chủ đầu tư có thể trực tiếp chạm vào thớ gỗ Ipe nguyên khối, kiểm tra cấu trúc mộng mộc, trải nghiệm trọn vẹn thư viện vải Sunbrella® và nhận hỗ trợ tận tâm từ chuyên viên.'
                  : 'Curated environments crafted exclusively for interior designers, landscape architects, and hospitality specifiers to experience the reassuring weight and silken texture of 100% FSC® Bolivian Ipe timber in person.'}
              </p>
            </div>

            {/* Quick action buttons in header */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setIsVirtualModalOpen(true)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[#C5A574]" />
                <span>{isVi ? 'Tham Quan Ảo 3D' : 'Launch 3D Tour'}</span>
              </button>
              <button
                onClick={() => setIsAppointmentOpen(true)}
                className="px-5 py-2.5 bg-[#C5A574] hover:bg-[#B6935E] text-[#1C1A17] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{isVi ? 'Đặt Lịch Hẹn Riêng' : 'Book Private Visit'}</span>
              </button>
            </div>
          </div>

          {/* 2. MULTI-LOCATION SELECTOR TABS */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
            {SHOWROOMS.map((showroom) => {
              const isActive = showroom.id === activeShowroomId;
              return (
                <button
                  key={showroom.id}
                  onClick={() => {
                    setActiveShowroomId(showroom.id);
                    setActiveGalleryIndex(0);
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-xs text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#C5A574] text-[#1C1A17] shadow-md font-bold'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Building2 className={`w-3.5 h-3.5 ${isActive ? 'text-[#1C1A17]' : 'text-[#C5A574]'}`} />
                  <span>{showroom.city}</span>
                  {showroom.id === 'atlanta' && (
                    <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded-xs font-bold ml-1 ${
                      isActive ? 'bg-black text-[#C5A574]' : 'bg-[#C5A574] text-black'
                    }`}>
                      FLAGSHIP
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 3. SHOWROOM HERO & GALLERY SHOWCASE */}
      <section className="bg-[#F8F6F2] py-12 sm:py-16 border-b border-[#DED9CD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Active Showroom Identity Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-[#E5E0D8] gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] bg-[#14232C] text-white px-2.5 py-0.5 rounded-xs">
                  {isVi ? activeShowroom.badgeVi : activeShowroom.badge}
                </span>
                <span className="text-xs font-semibold text-[#9B522E]">
                  {activeShowroom.building}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1A17] font-normal">
                {isVi ? activeShowroom.nameVi : activeShowroom.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[#6B5E52] mt-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#9B522E] shrink-0" />
                <span>{activeShowroom.suite}, {activeShowroom.address}</span>
              </div>
            </div>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`tel:${activeShowroom.phone.replace(/[^0-9+]/g, '')}`}
                className="px-3.5 py-2 bg-white hover:bg-[#F8F6F2] border border-[#DED9CD] text-xs font-semibold text-[#1C1A17] rounded-xs transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#9B522E]" />
                <span>{activeShowroom.phone}</span>
              </a>
              <a
                href={`mailto:${activeShowroom.email}?subject=${encodeURIComponent(`Showroom Inquiry - ${activeShowroom.name}`)}`}
                className="px-3.5 py-2 bg-white hover:bg-[#F8F6F2] border border-[#DED9CD] text-xs font-semibold text-[#1C1A17] rounded-xs transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Mail className="w-3.5 h-3.5 text-[#9B522E]" />
                <span>{activeShowroom.email}</span>
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${activeShowroom.name} ${activeShowroom.address}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#14232C] hover:bg-[#203440] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5"
              >
                <span>{isVi ? 'Chỉ Đường' : 'Directions'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Interactive Photo Gallery with Main View & Thumbnail Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Left (8 cols): Main Large Showcase */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative h-[360px] sm:h-[480px] rounded-sm overflow-hidden bg-black shadow-lg border border-[#DED9CD] group">
                <img
                  src={activeShowroom.galleryImages[activeGalleryIndex]?.url || activeShowroom.heroImage}
                  alt={activeShowroom.galleryImages[activeGalleryIndex]?.caption || activeShowroom.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Tag pill top left */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-[#C5A574] uppercase tracking-wider rounded-xs border border-white/10">
                  {activeShowroom.galleryImages[activeGalleryIndex]?.tag || 'Showroom Vignette'}
                </div>

                {/* 3D Virtual tour launch button floating top right */}
                <button
                  onClick={() => setIsVirtualModalOpen(true)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#1C1A17] px-3 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-[#9B522E]" />
                  <span>{isVi ? '3D Tour Ảo' : 'Explore 3D'}</span>
                </button>

                {/* Caption bottom bar */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm sm:text-base font-serif font-light text-white/95">
                    {isVi
                      ? activeShowroom.galleryImages[activeGalleryIndex]?.captionVi
                      : activeShowroom.galleryImages[activeGalleryIndex]?.caption}
                  </p>
                  <div className="text-[11px] text-[#C5A574] tracking-wider uppercase font-semibold mt-1">
                    {activeShowroom.name} • {activeShowroom.city}
                  </div>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {activeShowroom.galleryImages.map((img, idx) => {
                  const isSelected = idx === activeGalleryIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative w-24 sm:w-28 h-16 sm:h-20 shrink-0 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C5A574] ring-2 ring-[#C5A574]/30 scale-102'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/15" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gallery Right (4 cols): Showroom Fact Sheet & Concierge Card */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Showroom Director & Concierge Card */}
              <div className="bg-white border border-[#DED9CD] p-6 rounded-sm shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#F8F6F2] border border-[#DED9CD] flex items-center justify-center text-[#9B522E] font-serif font-bold text-lg">
                    {activeShowroom.concierge.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#9B522E]">
                      {isVi ? activeShowroom.conciergeTitleVi : activeShowroom.conciergeTitle}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1C1A17]">
                      {activeShowroom.concierge}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-[#6B5E52] leading-relaxed border-t border-[#F0EBE3] pt-3">
                  {isVi
                    ? activeShowroom.descriptionVi
                    : activeShowroom.description}
                </p>

                {/* Operating details */}
                <div className="space-y-2.5 text-xs text-[#5C5046] pt-3 border-t border-[#F0EBE3]">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#9B522E] shrink-0 mt-0.5" />
                    <span className="leading-snug">{isVi ? activeShowroom.hoursVi : activeShowroom.hours}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Car className="w-4 h-4 text-[#9B522E] shrink-0 mt-0.5" />
                    <span className="leading-snug">{isVi ? activeShowroom.parkingInfoVi : activeShowroom.parkingInfo}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <UserCheck className="w-4 h-4 text-[#9B522E] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      {isVi 
                        ? 'Mở cửa cho giới thiết kế (Interior Designers, Architects, Builders, Hospitality Buyers). Khách hàng gia đình vui lòng liên hệ trước.' 
                        : 'Open to the trade daily. Residential clients are welcome accompanied by their designer or with advance appointment.'}
                    </span>
                  </div>
                </div>

                {/* Primary CTA: Schedule Visit */}
                <div className="pt-3 border-t border-[#F0EBE3] space-y-2">
                  <button
                    onClick={() => setIsAppointmentOpen(true)}
                    className="w-full py-3 bg-[#C5A574] hover:bg-[#B6935E] text-[#1C1A17] font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{isVi ? 'Đăng Ký Tham Quan Showroom' : 'Schedule Showroom Visit'}</span>
                  </button>
                  <button
                    onClick={() => onOpenTradeModal && onOpenTradeModal()}
                    className="w-full py-2.5 bg-transparent hover:bg-[#F8F6F2] text-[#9B522E] border border-[#DED9CD] font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#9B522E]" />
                    <span>{isVi ? 'Đăng Ký Tài Khoản Trade' : 'Apply For Trade Account'}</span>
                  </button>
                </div>
              </div>

              {/* Resource Download Box */}
              <div className="bg-[#F8F6F2] border border-[#DED9CD] p-5 rounded-sm space-y-3">
                <div className="flex items-center gap-2 text-[#9B522E]">
                  <Download className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {isVi ? 'Tài Liệu Showroom Dành Cho KTS' : 'Showroom Designer Pack'}
                  </span>
                </div>
                <p className="text-[11px] text-[#6B5E52] leading-relaxed">
                  {isVi
                    ? 'Tải tập sách hướng dẫn quy chuẩn kích thước, bảng mã màu vải Sunbrella® và biểu giá dự án công trình.'
                    : 'Download the comprehensive showroom specification tearsheet binder and full Sunbrella® outdoor finish guide.'}
                </p>
                <button
                  onClick={() => onOpenCatalogModal && onOpenCatalogModal()}
                  className="text-xs font-bold text-[#9B522E] hover:text-[#1C1A17] flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span>{isVi ? 'Tải Catalogue & Spec Sheet (PDF)' : 'Download Architectural Lookbook (PDF)'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. DESIGNER AMENITIES & CONCIERGE SERVICES AT THIS SHOWROOM */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#DED9CD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#9B522E]">
              {isVi ? 'ĐẶC QUYỀN TẠI SHOWROOM' : 'TRADE SPECIFIER PRIVILEGES'}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#1C1A17] tracking-tight mt-2">
              {isVi ? 'Dịch Vụ Hỗ Trợ Độc Quyền Dành Cho Giới Thiết Kế' : 'Designer Services & Showroom Amenities'}
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#6B5E52] leading-relaxed">
              {isVi
                ? 'Không chỉ là không gian trưng bày, showroom của chúng tôi là trạm làm việc chuyên nghiệp được trang bị mọi công cụ để hiện thực hóa đồ án sân vườn của bạn.'
                : 'Beyond showcasing finished furniture, our design showrooms function as full-service studio extensions equipped with physical samples, digital CAD assets, and private client lounges.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeShowroom.amenities.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#F8F6F2] border border-[#DED9CD] p-6 rounded-sm hover:border-[#C5A574] transition-all hover:shadow-xs group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#EAE4D9] flex items-center justify-center text-[#9B522E] mb-5 group-hover:bg-[#C5A574] group-hover:text-white transition-colors">
                    {idx === 0 && <Layers className="w-5 h-5" />}
                    {idx === 1 && <Building2 className="w-5 h-5" />}
                    {idx === 2 && <ShieldCheck className="w-5 h-5" />}
                    {idx === 3 && <Compass className="w-5 h-5" />}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1C1A17] mb-2">
                    {isVi ? item.titleVi : item.title}
                  </h3>
                  <p className="text-xs text-[#6B5E52] leading-relaxed">
                    {isVi ? item.descVi : item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#DED9CD] flex items-center text-[11px] font-bold text-[#9B522E] uppercase tracking-wider">
                  <span>{isVi ? 'Bao Gồm Miễn Phí' : 'Complimentary'}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. ON FLOOR COLLECTIONS: WHAT TO SEE & EXPERIENCE IN PERSON */}
      <section className="py-16 sm:py-24 bg-[#F5F2ED] border-b border-[#DED9CD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#9B522E]">
                {isVi ? 'BỘ SƯU TẬP TRƯNG BÀY THỰC TẾ' : 'CURRENTLY ON DISPLAY'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#1C1A17] tracking-tight mt-2">
                {isVi ? `Trải Nghiệm Tại ${activeShowroom.city}` : `Featured Collections in ${activeShowroom.city}`}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#6B5E52]">
                {isVi
                  ? 'Những bộ sưu tập tiêu biểu đang được bài trí thành các không gian sống ngoài trời hoàn chỉnh tại showroom.'
                  : 'Curated outdoor lifestyle vignettes available for immediate sit-testing, tactile review, and dimension validation.'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('collections')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9B522E] hover:text-[#1C1A17] cursor-pointer"
            >
              <span>{isVi ? 'Xem Tất Cả Bộ Sưu Tập' : 'Browse All Collections'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeShowroom.displayedCollections.map((col) => (
              <div
                key={col.id}
                className="bg-white border border-[#DED9CD] rounded-sm overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-black/5">
                    <img
                      src={col.image}
                      alt={col.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                      {isVi ? col.categoryVi : col.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-[#1C1A17]">
                      {col.name}
                    </h3>
                    <p className="text-xs text-[#6B5E52] leading-relaxed line-clamp-3">
                      {isVi ? col.descriptionVi : col.description}
                    </p>

                    <div className="pt-2 border-t border-[#F0EBE3] space-y-1">
                      {(isVi ? col.specsVi : col.specs).map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-1.5 text-[11px] text-[#8C7A6B]">
                          <CheckCircle2 className="w-3 h-3 text-[#9B522E] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onNavigate('collection-detail', { collection: col.id })}
                    className="w-full py-2.5 px-3 bg-[#F8F6F2] hover:bg-[#C5A574] hover:text-[#1C1A17] text-[#9B522E] border border-[#DED9CD] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{isVi ? 'Xem Chi Tiết Kỹ Thuật' : 'View Specifications'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. SHOWROOM BOOKING APPOINTMENT MODAL */}
      {isAppointmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white max-w-xl w-full p-6 sm:p-8 rounded-sm shadow-2xl relative border border-[#DED9CD] max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsAppointmentOpen(false)}
              className="absolute top-4 right-4 text-[#8C7A6B] hover:text-[#1C1A17] text-xl font-bold p-1 cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#E8F5E9] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#1C1A17]">
                  {isVi ? 'Đã Nhận Lịch Hẹn Showroom!' : 'Private Visit Requested!'}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5E52] max-w-md mx-auto leading-relaxed">
                  {isVi
                    ? `Cảm ơn bạn. Chuyên viên ${activeShowroom.concierge} tại ${activeShowroom.name} sẽ liên hệ qua email và điện thoại trong vòng 24 giờ làm việc để hoàn tất thủ tục đón tiếp và chuẩn bị tài liệu dự án cho bạn.`
                    : `Thank you. ${activeShowroom.concierge} at the ${activeShowroom.name} will review your request and confirm your scheduled visit and building access credentials within 24 business hours.`}
                </p>
                <div className="pt-4 border-t border-[#DED9CD]">
                  <div className="inline-block text-left text-xs bg-[#F8F6F2] p-4 rounded-xs border border-[#DED9CD] space-y-1">
                    <div><strong>{isVi ? 'Địa Điểm:' : 'Location:'}</strong> {activeShowroom.name}</div>
                    <div><strong>{isVi ? 'Địa Chỉ:' : 'Address:'}</strong> {activeShowroom.suite}, {activeShowroom.address}</div>
                    <div><strong>{isVi ? 'Người Phụ Trách:' : 'Director:'}</strong> {activeShowroom.concierge} ({activeShowroom.phone})</div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 border-b border-[#DED9CD] pb-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#9B522E] mb-1">
                    <JensenLeafLogo className="w-3.5 h-4.5 text-[#9B522E]" />
                    <span>{isVi ? 'ĐẶT HẸN TRẢI NGHIỆM SHOWROOM' : 'BOOK A PRIVATE SHOWROOM VISIT'}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
                    {isVi ? activeShowroom.nameVi : activeShowroom.name}
                  </h3>
                  <p className="text-xs text-[#6B5E52] mt-1">
                    {activeShowroom.suite}, {activeShowroom.address} • {activeShowroom.concierge}
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  
                  {/* Row 1: Name & Firm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                        {isVi ? 'Họ Và Tên *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        placeholder={isVi ? 'KTS. Nguyễn Văn A' : 'Jane Doe'}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E] bg-[#F8F6F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                        {isVi ? 'Công Ty / Studio Thiết Kế' : 'Design Firm / Studio'}
                      </label>
                      <input
                        type="text"
                        value={bookingForm.firm}
                        onChange={(e) => setBookingForm({ ...bookingForm, firm: e.target.value })}
                        placeholder="Studio Design Associates"
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E] bg-[#F8F6F2]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                        {isVi ? 'Email Liên Hệ *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        placeholder="designer@firm.com"
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E] bg-[#F8F6F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                        {isVi ? 'Số Điện Thoại *' : 'Phone Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E] bg-[#F8F6F2]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                        {isVi ? 'Ngày Dự Kiến Ghé Thăm *' : 'Preferred Date *'}
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E] bg-[#F8F6F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                        {isVi ? 'Khung Giờ Phù Hợp' : 'Preferred Time Window'}
                      </label>
                      <select
                        value={bookingForm.timeSlot}
                        onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E] bg-[#F8F6F2]"
                      >
                        <option value="Morning (9:30 AM - 11:30 AM)">Morning (9:30 AM - 11:30 AM)</option>
                        <option value="Midday (11:30 AM - 1:30 PM)">Midday (11:30 AM - 1:30 PM)</option>
                        <option value="Afternoon (1:30 PM - 3:30 PM)">Afternoon (1:30 PM - 3:30 PM)</option>
                        <option value="Late Afternoon (3:30 PM - 5:00 PM)">Late Afternoon (3:30 PM - 5:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Visit Purpose & Headcount */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                        {isVi ? 'Mục Đích Buổi Ghé Thăm' : 'Nature of Visit'}
                      </label>
                      <select
                        value={bookingForm.visitType}
                        onChange={(e) => setBookingForm({ ...bookingForm, visitType: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E] bg-[#F8F6F2]"
                      >
                        <option value="Specification Consultation & Swatches">Specification Consultation & Swatches</option>
                        <option value="Client Walkthrough & Presentation">Client Walkthrough & Presentation</option>
                        <option value="Order Placement & Line Quoting">Order Placement & Line Quoting</option>
                        <option value="General Trade Introduction">General Trade Introduction</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                        {isVi ? 'Số Lượng Người Tham Dự' : 'Party Size'}
                      </label>
                      <select
                        value={bookingForm.guestCount}
                        onChange={(e) => setBookingForm({ ...bookingForm, guestCount: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E] bg-[#F8F6F2]"
                      >
                        <option value="Just Myself">Just Myself</option>
                        <option value="1 - 2 Guests (Designer + Client)">1 - 2 Guests (Designer + Client)</option>
                        <option value="3 - 5 Guests (Design Team / Project Group)">3 - 5 Guests (Design Team / Project Group)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-1">
                      {isVi ? 'Bộ Sưu Tập Hoặc Yêu Cầu Cần Chuẩn Bị Trước' : 'Collections of Interest or Specific Inquiries'}
                    </label>
                    <textarea
                      rows={2}
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      placeholder={isVi ? 'Ví dụ: Cần xem bộ Forte Deep Seating, chuẩn bị hộp mẫu gỗ Ipe và bảng giá chiết khấu Trade...' : 'E.g., Interested in Forte and Tempo sets, require Ipe sample box and trade spec sheets...'}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-[#DED9CD] rounded-xs focus:outline-none focus:border-[#9B522E] bg-[#F8F6F2]"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#DED9CD] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAppointmentOpen(false)}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6B5E52] hover:text-[#1C1A17] cursor-pointer"
                    >
                      {isVi ? 'Đóng' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#C5A574] hover:bg-[#B6935E] text-[#1C1A17] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-md cursor-pointer"
                    >
                      {isVi ? 'Xác Nhận Đặt Hẹn' : 'Confirm Appointment Request'}
                    </button>
                  </div>

                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 7. VIRTUAL SHOWROOM 3D MODAL */}
      <VirtualShowroomModal
        isOpen={isVirtualModalOpen}
        onClose={() => setIsVirtualModalOpen(false)}
        onNavigateToShowrooms={() => {
          setIsVirtualModalOpen(false);
          setIsAppointmentOpen(true);
        }}
      />

    </div>
  );
};
