import { LUMA_COLLECTION, LUMA_PRODUCTS } from './lumaData';
import { LUMINO_PROFILE_COLLECTION, LUMINO_PROFILE_PRODUCTS, POLY_BLOOM_COLLECTION, POLY_BLOOM_PRODUCTS } from './catalogCollectionsData';
import { Product, Collection, FabricSwatch, Retailer } from '../types';

export const COLLECTIONS: Collection[] = [
  LUMINO_PROFILE_COLLECTION,
  LUMA_COLLECTION,
  POLY_BLOOM_COLLECTION,
  {
    id: 'serenity',
    name: 'SERENITY Collection',
    nameVi: 'Bộ Sưu Tập SERENITY',
    tagline: 'Peaceful Scandinavian clarity with floating slatted rhythm',
    taglineVi: 'Sự tĩnh tại Bắc Âu thuần khiết với nhịp điệu nan lượn bồng bềnh',
    description: 'Conceived for meditative terrace and garden sanctuaries, SERENITY features floating steam-bent slats, heritage garden benches, linear fire tables, and classic Adirondacks that invite effortless peace.',
    descriptionVi: 'Được sáng tạo cho những không gian sân vườn an tĩnh, SERENITY sở hữu các nan gỗ uốn cong bồng bềnh, ghế băng di sản, bàn lửa sưởi và ghế Adirondack kinh điển khơi gợi sự an yên bất tận.',
    story: 'Designed with the timeless purity of Scandinavian modernism and American garden history, SERENITY focuses on steam-bending woodcraft. Master artisans soften mature Ipe planks with boiling steam before hand-clamping them into custom jigs to achieve the signature undulating backrest curve. In addition to iconic garden seating, SERENITY introduces integrated CSA-certified linear fire tables that emit clean, smokeless warmth, transforming cool autumn evenings into prolonged meditations.',
    storyVi: 'Lấy cảm hứng từ sự thanh khiết của chủ nghĩa tối giản Bắc Âu và nét hoài cổ của những khu vườn điền trang nước Mỹ, SERENITY khai thác kỹ thuật uốn nan gỗ bằng hơi nước đỉnh cao. Từng thanh nan Ipe già dặn được hấp hơi nước sôi trước khi gò trên dưỡng mộc định hình, tạo nên độ cong tựa lưng mềm mại nâng đỡ cơ thể. Bên cạnh các mẫu ghế sân vườn biểu tượng, SERENITY còn tích hợp bàn sưởi lửa tuyến tính đạt chuẩn CSA không khói, biến những đêm đông se lạnh thành khoảnh khắc thưởng trà an yên.',
    designer: 'John Caldwell & B+Open Archive',
    designerBio: 'Renowned American furniture designer John Caldwell paired with B+Open timber archivists to recreate historic garden proportion in indestructible Bolivian Ipe.',
    designerBioVi: 'Nhà thiết kế gạo cội John Caldwell kết hợp cùng các chuyên gia lưu trữ B+Open nhằm tái sinh tỷ lệ sân vườn cổ điển trên nền gỗ Ipe Bolivia bất tử.',
    primaryMaterial: '100% FSC®-Certified Bolivian Ipe',
    primaryMaterialVi: '100% Gỗ Ipe Bolivia Chứng Nhận FSC®',
    heroImage: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    lifestyleImages: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1200&q=80'
    ],
    itemCount: 20,
    yearIntroduced: '2023 Heritage Line',
    highlightSpecs: ['Curved steam-bent backrests', 'Integrated linear fire burners', 'All-weather heirloom stability', 'Continuous ergonomic waterfall seat'],
    highlightSpecsVi: ['Tựa lưng uốn cong bằng hơi nước', 'Bếp sưởi lửa tuyến tính tích hợp', 'Độ bền gia bảo trước mọi thời tiết', 'Mặt ghế lượn thác nước nâng niu'],
    curatedEnsembles: [
      {
        id: 'serenity-fireside-circle',
        name: 'The Fireside Gathering Ensemble',
        nameVi: 'Bộ Sưởi Ấm Quây Quần SERENITY',
        tagline: 'Linear 60" Ipe fire table encircled by 4 contoured Adirondack armchairs.',
        taglineVi: 'Bàn lửa sưởi 1,52m tích hợp bếp gas bao quanh bởi 4 ghế Adirondack êm ái.',
        pieceCount: 5,
        image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
        idealSpace: 'Mountain terraces, lakeside docks, evening courtyard gardens',
        idealSpaceVi: 'Sân thượng biệt thự đồi, bến tàu ven hồ, sân vườn trung tâm lúc về đêm',
        includedProductIds: ['serenity-fire-table', 'serenity-adirondack']
      }
    ]
  }
];

const LEGACY_PRODUCTS: Product[] = [
  ...LUMA_PRODUCTS,
  {
    id: 'lumino-deep-sofa',
    name: 'Lumino 3-Seat Deep Seating Sofa',
    nameVi: 'Sofa Thư Giãn Lumino 3 Chỗ Ngồi',
    collection: 'lumino',
    category: 'deep-seating',
    material: '100% FSC Ipe',
    materialVi: '100% Gỗ Ipe Chứng Nhận FSC®',
    sku: 'LU-DS-88',
    dimensions: {
      width: '2240 mm',
      depth: '910 mm',
      height: '790 mm',
      seatHeight: '430 mm'
    },
    description: 'An architectural statement piece offering generous seating depth and wide armrests perfect for resting a beverage or book. Crafted entirely from slow-growth Bolivian Ipe with plush, marine-grade Sunbrella cushions.',
    descriptionVi: 'Tác phẩm kiến trúc bề thế mang lại lòng ngồi sâu rộng rãi cùng tay vịn bản to tiện lợi đặt ly vang hay cuốn sách. Chế tác hoàn toàn từ gỗ Ipe sinh trưởng tự nhiên tại Bolivia cùng đệm Sunbrella cao cấp chuẩn hàng hải.',
    features: [
      'Precision mortise-and-tenon construction',
      'Naturally resistant to decay, mold, and termites',
      'Includes premium Sunbrella® all-weather cushions with water-shedding backing',
      'Solid 2" thick Ipe timber frame'
    ],
    featuresVi: [
      'Kết cấu mộng ghép mộng gỗ chuẩn xác tuyệt đối',
      'Kháng mục nát, nấm mốc và mối mọt tự nhiên không cần tẩm hoá chất',
      'Kèm bộ đệm Sunbrella® kháng thời tiết có lớp đáy thoát ẩm nhanh',
      'Khung gỗ Ipe nguyên khối dày 2 inch (5cm) siêu bền'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    availableFabrics: ['Cast Linen', 'Cast Slate', 'Canvas Granite', 'Navy Heather', 'Sandstone'],
    cadAvailable: true,
    designer: 'B+Open Design Studio',
    inStock: true
  },
  {
    id: 'lumino-lounge-chair',
    name: 'Lumino Deep Seating Lounge Chair',
    nameVi: 'Ghế Bành Thư Giãn Lumino Đơn',
    collection: 'lumino',
    category: 'deep-seating',
    material: '100% FSC Ipe',
    materialVi: '100% Gỗ Ipe Chứng Nhận FSC®',
    sku: 'LU-LC-34',
    dimensions: {
      width: '860 mm',
      depth: '910 mm',
      height: '790 mm',
      seatHeight: '430 mm'
    },
    description: 'Companion lounge chair to the Lumino deep seating collection. Features low-slung, balanced ergonomics and ultra-comfortable seat depth with wide plank Ipe slats.',
    descriptionVi: 'Ghế bành thư giãn đồng bộ trong bộ sưu tập Lumino. Thiết kế trọng tâm thấp vững chãi, công thái học hoàn hảo và nan gỗ Ipe dày dặn mang đến trải nghiệm nghỉ ngơi trọn vẹn.',
    features: [
      'Triple-sealed edge joins for extreme climate endurance',
      'Includes high-density box cushions',
      'Tested to withstand winds up to 60mph without moving'
    ],
    featuresVi: [
      'Khớp mộng gia cố 3 lớp chịu được khí hậu khắc nghiệt ven biển',
      'Bao gồm đệm mút khối tỷ trọng cao êm ái chống xẹp',
      'Trọng lượng đầm chắc, đã kiểm nghiệm chịu sức gió lên đến 60 dặm/giờ'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    availableFabrics: ['Cast Linen', 'Cast Slate', 'Canvas Granite', 'Sandstone'],
    cadAvailable: true,
    designer: 'B+Open Design Studio',
    inStock: true
  },
  {
    id: 'bloom-barrel-chair',
    name: 'Bloom Barrel Lounge Chair',
    nameVi: 'Ghế Thư Giãn Bloom Dáng Thùng',
    collection: 'bloom',
    category: 'deep-seating',
    material: 'Ipe & Woven Viro',
    materialVi: 'Gỗ Ipe & Sợi Đan Viro®',
    sku: 'BL-BC-32',
    dimensions: {
      width: '840 mm',
      depth: '860 mm',
      height: '760 mm',
      seatHeight: '420 mm'
    },
    description: 'An organic cocoon silhouette woven by hand in Solara Viro® fiber over a marine-grade aluminum frame, resting upon an architectural Ipe timber sled base with sculpted wood arm rests.',
    descriptionVi: 'Thiết kế dáng kén hữu cơ ôm trọn cơ thể, đan thủ công từ sợi Solara Viro® chịu thời tiết trên khung nhôm hàng hải, đặt trên đế trượt bằng gỗ Ipe và tay vịn gỗ đẽo bóng.',
    features: [
      'Hand-plaited weather-resistant Viro® all-weather fiber',
      'Smooth Ipe timber arm details that soften with touch',
      'Includes custom-fitted circular back pillow and seat cushion',
      'Designed by Jon & Chris Panichella'
    ],
    featuresVi: [
      'Sợi đan Viro® đan tay hoàn toàn, kháng tia cực tím và muối biển',
      'Tay vịn gỗ Ipe vát tròn mịn màng mang lại xúc cảm ấm áp',
      'Bao gồm gối tựa tròn và đệm ngồi cắt may chuẩn xác',
      'Thiết kế bởi Jon & Chris Panichella'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'
    ],
    availableFabrics: ['Cast Linen', 'Cast Slate', 'Terracotta'],
    cadAvailable: true,
    designer: 'Jon & Chris Panichella',
    inStock: true
  },
  {
    id: 'bloom-chaise-lounge',
    name: 'Bloom Multi-Position Chaise Lounge',
    nameVi: 'Ghế Tắm Nắng Đa Nấc Bloom',
    collection: 'bloom',
    category: 'chaises',
    material: 'Ipe & Aluminum',
    materialVi: 'Khung Nhôm & Gỗ Ipe',
    sku: 'BL-CL-80',
    dimensions: {
      width: '760 mm',
      depth: '2030 mm',
      height: '360 – 970 mm'
    },
    description: 'Clean architectural lines forged in matte charcoal powder-coated aluminum, balanced by rich FSC® Ipe timber accents and concealed rear wheels for effortless poolside mobility.',
    descriptionVi: 'Đường nét kiến trúc thanh thoát rèn từ nhôm sơn tĩnh điện màu than chì mờ, cân đối bởi các chi tiết gỗ Ipe FSC® ấm áp và bánh xe ẩn phía sau giúp di chuyển êm ru quanh bể bơi.',
    features: [
      '5-position ratcheting backrest including completely flat setting',
      'Concealed roller wheels with rubber tread for scratchless stone movement',
      'Weather-resistant batyline sling or Sunbrella plush cushion options',
      'Marine-grade anti-corrosion coating'
    ],
    featuresVi: [
      'Tựa lưng điều chỉnh 5 nấc bao gồm nấc nằm ngả phẳng hoàn toàn',
      'Bánh xe bọc cao su ẩn không làm trầy xước sàn đá cẩm thạch',
      'Tuỳ chọn đệm Sunbrella hoặc lưới Batyline thoáng khí thoát nước',
      'Lớp phủ chống ăn mòn tiêu chuẩn hàng hải chống hơi muối'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    availableFabrics: ['Cast Linen', 'Slate Gray', 'Navy Stripe'],
    cadAvailable: true,
    designer: 'Jon & Chris Panichella',
    inStock: true
  },
  {
    id: 'serenity-5ft-bench',
    name: 'SERENITY 5-Foot Garden Bench',
    nameVi: 'Ghế Băng Sân Vườn SERENITY 1,5m',
    collection: 'serenity',
    category: 'accessories',
    material: '100% FSC Ipe',
    materialVi: '100% Gỗ Ipe Chứng Nhận FSC®',
    sku: 'SR-BN-60',
    dimensions: {
      width: '1520 mm',
      depth: '660 mm',
      height: '890 mm',
      seatHeight: '430 mm'
    },
    description: 'An American classic. Inspired by tranquil historical estate gardens, the SERENITY Bench features gently rolled arms, a sculpted crest rail, and an ergonomically dished seat that requires no cushion.',
    descriptionVi: 'Vẻ đẹp điền trang thanh bình. Lấy cảm hứng từ những khu vườn lịch sử tĩnh tại, ghế băng SERENITY có tay cuộn tròn mềm mại, tựa lưng uốn vương miện và lòng ngồi cong không cần đệm.',
    features: [
      'Dished seat profile distributes pressure without cushion',
      'Ideal for courtyard focal points, pathways, and verandas',
      'Will weather into a breathtaking platinum silver patina over decades',
      'Solid, continuous Bolivian Ipe back crest'
    ],
    featuresVi: [
      'Lòng ngồi lõm nhẹ phân bổ áp lực êm ái mà không cần dùng đệm',
      'Điểm nhấn lý tưởng cho lối đi dạo sân vườn, tiểu cảnh và ban công',
      'Tự nhiên chuyển màu bạc ánh kim quý phái qua năm tháng',
      'Tựa lưng gỗ Ipe Bolivia nguyên khối tiện cong liền mạch'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    cadAvailable: true,
    designer: 'B+Open Heritage Archive',
    inStock: true
  },
  {
    id: 'serenity-fire-table',
    name: 'SERENITY 54" Linear Ipe & Concrete Fire Table',
    nameVi: 'Bàn Lửa Sưởi SERENITY Gỗ Ipe & Bê Tông 1,37m',
    collection: 'serenity',
    category: 'tables',
    material: '100% FSC Ipe',
    materialVi: '100% Gỗ Ipe Chứng Nhận FSC®',
    sku: 'SR-FT-54',
    dimensions: {
      width: '1370 mm',
      depth: '860 mm',
      height: '610 mm'
    },
    description: 'Combines the organic warmth of slatted Ipe wood with a central glass-fiber reinforced concrete fire burner. Delivers 60,000 BTUs of adjustable warmth for peaceful evening gatherings.',
    descriptionVi: 'Sự hòa quyện giữa độ ấm của nan gỗ Ipe tự nhiên với đầu đốt lửa bê tông cốt sợi thủy tinh siêu bền. Tỏa nhiệt lượng 60.000 BTU điều chỉnh linh hoạt cho các buổi tao ngộ an yên dưới bầu trời đêm.',
    features: [
      '60,000 BTU stainless steel burner with electronic push-button spark igniter',
      'Includes black lava rock media and flush Ipe burner lid for coffee table conversion',
      'Concealed internal slide-out tray holds standard 20lb propane tank',
      'FSC Ipe base with ventilated air flow design'
    ],
    featuresVi: [
      'Đầu đốt inox 304 công suất 60.000 BTU đánh lửa điện tử nút bấm',
      'Kèm đá nham thạch đen và nắp đậy gỗ Ipe biến thành bàn trà tiện dụng',
      'Khay trượt giấu kín bình gas propane tiêu chuẩn bên trong thân bàn',
      'Khung đế gỗ Ipe thông gió an toàn theo chuẩn quốc tế'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    cadAvailable: true,
    designer: 'John Caldwell',
    inStock: true
  },
  {
    id: 'lumino-cocktail-table',
    name: 'Lumino 48" Square Coffee Table',
    nameVi: 'Bàn Trà Vuông Lumino 1,22m',
    collection: 'lumino',
    category: 'tables',
    material: '100% FSC Ipe',
    materialVi: '100% Gỗ Ipe Chứng Nhận FSC®',
    sku: 'LU-CT-48',
    dimensions: {
      width: '1220 mm',
      depth: '1220 mm',
      height: '410 mm'
    },
    description: 'Wide timber planks create an expansive, low-profile cocktail surface designed to complement the Lumino modular sectional and lounge configurations.',
    descriptionVi: 'Mặt bàn ghép từ các phiến gỗ Ipe bản rộng tạo nên diện tích đặt ly nước và decor thênh thang, đồng điệu tuyệt đối cùng sofa văng và sofa góc Lumino.',
    features: [
      'Slight bevel on perimeter timber to repel standing water',
      'Robust cross-braced sub-structure prevents seasonal warping',
      'Naturally heavy to withstand coastal gusts'
    ],
    featuresVi: [
      'Mép gỗ vát nhẹ 2mm giúp nước mưa trôi nhanh không đọng vũng',
      'Khung giằng chịu lực chữ thập chống cong vênh qua các mùa',
      'Trọng lượng gỗ đặc tự nhiên đứng vững trước gió giật ven biển'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    cadAvailable: true,
    designer: 'B+Open Design Studio',
    inStock: true
  },
  {
    id: 'serenity-adirondack',
    name: 'SERENITY Classic Ipe Adirondack Chair',
    nameVi: 'Ghế Adirondack SERENITY Gỗ Ipe',
    collection: 'serenity',
    category: 'deep-seating',
    material: '100% FSC Ipe',
    materialVi: '100% Gỗ Ipe Chứng Nhận FSC®',
    sku: 'SR-AD-32',
    dimensions: {
      width: '810 mm',
      depth: '970 mm',
      height: '940 mm',
      seatHeight: '360 mm'
    },
    description: 'The pinnacle of peaceful outdoor leisure. Our master-crafted SERENITY Adirondack features an arched 7-slat backrest, wide paddle arms to hold wine glasses, and a deeply contoured waterfall seat.',
    descriptionVi: 'Biểu tượng tối thượng của nghệ thuật thư giãn an tĩnh ngoài trời. Ghế Adirondack thủ công SERENITY có tựa lưng vòm 7 nan, tay vịn mái chèo rộng rãi đặt ly vang đỏ và mặt ngồi thác nước ôm nhẹ khoeo chân.',
    features: [
      'Wide 6" armrests accommodate glasses, phones, and small plates',
      'Waterfall front edge reduces pressure on knees and thighs',
      'Optional matching footstool ottoman available',
      'Crafted entirely with 100-year mature Bolivian Ipe'
    ],
    featuresVi: [
      'Tay vịn rộng 15cm thoải mái đặt ly rượu, điện thoại và đĩa khai vị',
      'Mép trước lượn thác nước êm ái giảm thiểu áp lực lên gối và đùi',
      'Có tuỳ chọn đôn gác chân đồng bộ thư giãn tối đa',
      'Chế tác 100% từ gỗ Ipe Bolivia trăm năm tuổi'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    cadAvailable: true,
    designer: 'B+Open Heritage Archive',
    inStock: true
  },
  // --- LUMA COLLECTION EXTENSIONS ---
  // --- LUMINO COLLECTION EXTENSIONS ---
  {
    id: 'lumino-loveseat',
    name: 'Lumino 2-Seat Deep Seating Loveseat',
    nameVi: 'Sofa Đôi Lumino 2 Chỗ Ngồi',
    collection: 'lumino',
    category: 'deep-seating',
    material: '100% FSC Ipe',
    materialVi: '100% Gỗ Ipe Chứng Nhận FSC®',
    sku: 'LU-LS-62',
    dimensions: {
      width: '1570 mm',
      depth: '910 mm',
      height: '790 mm',
      seatHeight: '430 mm'
    },
    description: 'Compact 2-seat edition of the flagship Lumino sofa. Perfect for urban rooftop gardens, bedroom balconies, or paired across a fire table.',
    descriptionVi: 'Phiên bản 2 chỗ gọn gàng của sofa Lumino biểu tượng. Lý tưởng cho ban công biệt thự, sân thượng penthouse hoặc đặt đối xứng qua bàn sưởi.',
    features: [
      'Plush 6" Sunbrella all-weather cushions included',
      'Solid timber back with architectural floating shadowlines',
      'Concealed bracket joinery for clean profiles'
    ],
    featuresVi: [
      'Bao gồm đệm Sunbrella dày 15cm kháng thời tiết',
      'Lưng ghế nan gỗ Ipe tạo bóng đổ kiến trúc thanh lịch',
      'Khớp nối giấu kín giữ trọn diện mạo tinh tế'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    cadAvailable: true,
    designer: 'B+Open Design Studio',
    inStock: true
  },
  {
    id: 'lumino-chaise-lounge',
    name: 'Lumino Adjustable Hardwood Chaise Lounge',
    nameVi: 'Giường Nằm Hồ Bơi Lumino Có Bánh Xe',
    collection: 'lumino',
    category: 'chaises',
    material: '100% FSC Ipe',
    materialVi: '100% Gỗ Ipe Chứng Nhận FSC®',
    sku: 'LU-CL-78',
    dimensions: {
      width: '710 mm',
      depth: '1980 mm',
      height: '360 – 910 mm'
    },
    description: 'Heirloom pool lounger with integrated sliding drink tray, concealed rubberized wooden wheels, and 4-position reclining back.',
    descriptionVi: 'Giường tắm nắng hồ bơi gia bảo tích hợp khay trượt để ly nước, bánh xe gỗ bọc cao su êm ái và 4 nấc ngả lưng thư giãn.',
    features: [
      'Pull-out side slide tray holds books and beverages',
      'Discreet rear wheels allow effortless sun chasing',
      'Includes full-length Sunbrella lounger cushion'
    ],
    featuresVi: [
      'Khay trượt kéo ngang thông minh để sách và ly cocktail',
      'Bánh xe sau ẩn kín giúp dịch chuyển theo hướng nắng dễ dàng',
      'Bao gồm đệm nằm Sunbrella suốt chiều dài êm ái'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    cadAvailable: true,
    designer: 'B+Open Design Studio',
    inStock: true
  },
  {
    id: 'lumino-side-table',
    name: 'Lumino 24" Square End Table',
    nameVi: 'Bàn Góc Vuông Lumino 61cm',
    collection: 'lumino',
    category: 'tables',
    material: '100% FSC Ipe',
    materialVi: '100% Gỗ Ipe Chứng Nhận FSC®',
    sku: 'LU-ST-24',
    dimensions: {
      width: '610 mm',
      depth: '610 mm',
      height: '530 mm'
    },
    description: 'The essential accent companion table for placing beside Lumino sofas and loungers with slatted top and open bottom shelf.',
    descriptionVi: 'Bàn góc điểm nhấn đặt cạnh sofa hoặc ghế bành Lumino với mặt nan xẻ rãnh và đợt kệ dưới tiện để tạp chí.',
    features: [
      'Dual tier slatted surfaces for drinks and books',
      'Compact footprint fits tight spaces',
      'Weatherproof solid Ipe construction'
    ],
    featuresVi: [
      'Hai tầng nan gỗ tiện dụng cho cả ly nước và sách báo',
      'Kích thước gọn gàng phù hợp mọi góc hiên',
      'Kháng thời tiết trọn đời từ gỗ Ipe đặc khối'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    cadAvailable: true,
    designer: 'B+Open Design Studio',
    inStock: true
  },
  // --- BLOOM COLLECTION EXTENSIONS ---
  {
    id: 'bloom-dining-armchair',
    name: 'Bloom Woven Dining Armchair',
    nameVi: 'Ghế Ăn Đan Sợi Vòm Bloom',
    collection: 'bloom',
    category: 'dining',
    material: 'Ipe & Woven Viro',
    materialVi: 'Gỗ Ipe & Sợi Đan Solara',
    sku: 'BL-DAC-24',
    dimensions: {
      width: '610 mm',
      depth: '640 mm',
      height: '840 mm',
      seatHeight: '460 mm'
    },
    description: 'Tactile dining chair featuring a curved woven Solara fiber shell resting atop tapered Bolivian Ipe timber legs with teak tone cap details.',
    descriptionVi: 'Ghế ăn xúc cảm với vỏ đan sợi Solara ôm lưng đặt trên bốn chân gỗ Ipe thuôn nhọn thanh lịch và êm ái tuyệt đối.',
    features: [
      'Breathable, UV-stabilized weave resists heat build-up',
      'Includes slim Sunbrella seat cushion with non-slip base',
      'Tapered architectural Ipe legs with non-marking glides'
    ],
    featuresVi: [
      'Sợi đan thoáng khí kháng tia UV không bị hấp thụ nhiệt',
      'Kèm đệm ngồi Sunbrella mỏng với lớp đế chống trượt',
      'Chân gỗ Ipe thuôn nhọn kèm đệm cao su bảo vệ mặt sàn'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    cadAvailable: true,
    designer: 'Jon & Chris Panichella',
    inStock: true
  },
  {
    id: 'bloom-round-table',
    name: 'Bloom 28" Woven Pedestal Accent Table',
    nameVi: 'Bàn Tròn Điểm Nhấn Đan Mây Bloom 71cm',
    collection: 'bloom',
    category: 'tables',
    material: 'Ipe & Woven Viro',
    materialVi: 'Gỗ Ipe & Sợi Đan Solara',
    sku: 'BL-AT-28',
    dimensions: {
      width: '710 mm',
      depth: '710 mm',
      height: '510 mm'
    },
    description: 'Sculptural accent table pairing a solid Ipe plank top with an organic woven Solara fiber pedestal hourglass base.',
    descriptionVi: 'Bàn trà điêu khắc kết hợp mặt gỗ Ipe nguyên khối với thân đế đồng hồ cát đan sợi Solara tinh mỹ.',
    features: [
      'Solid chamfered Ipe timber top surface',
      'Hourglass woven pedestal adds warm organic texture',
      'Weighted interior prevents movement in coastal storms'
    ],
    featuresVi: [
      'Mặt gỗ Ipe vát mép tròn tinh xảo',
      'Chân đế đồng hồ cát đan sợi tạo chất cảm hữu cơ ấm cúng',
      'Gia trọng bên trong chống lật trước dông bão'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    cadAvailable: true,
    designer: 'Jon & Chris Panichella',
    inStock: true
  },
  // --- SERENITY COLLECTION EXTENSIONS ---
  {
    id: 'serenity-rocking-chair',
    name: 'SERENITY Contoured Porch Rocking Chair',
    nameVi: 'Ghế Bập Bênh Thư Giãn SERENITY',
    collection: 'serenity',
    category: 'deep-seating',
    material: '100% FSC Ipe',
    materialVi: '100% Gỗ Ipe Chứng Nhận FSC®',
    sku: 'SR-RC-30',
    dimensions: {
      width: '740 mm',
      depth: '860 mm',
      height: '1070 mm',
      seatHeight: '430 mm'
    },
    description: 'A timeless porch rocker featuring smooth radiused Ipe runners engineered for a balanced, calming gliding motion.',
    descriptionVi: 'Ghế bập bênh hiên nhà kinh điển với con lăn gỗ Ipe uốn cong tạo nhịp đu đưa êm ả thư thái tâm hồn.',
    features: [
      'Precision steam-bent runners provide soothing, quiet glide',
      'Contoured back slats support natural spinal alignment',
      'Broad armrests carved smooth to the touch'
    ],
    featuresVi: [
      'Thanh trượt uốn nhiệt chính xác tạo nhịp bập bênh êm ru tĩnh lặng',
      'Nan lưng lượn theo cột sống nâng niu cơ thể',
      'Tay vịn bản lớn mài nhẵn bóng mịn mời gọi chạm tay'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    cadAvailable: true,
    designer: 'John Caldwell',
    inStock: true
  },
  {
    id: 'serenity-coffee-table',
    name: 'SERENITY 44" Oval Slat Coffee Table',
    nameVi: 'Bàn Trà Elip SERENITY Nan Gỗ 1,12m',
    collection: 'serenity',
    category: 'tables',
    material: '100% FSC Ipe',
    materialVi: '100% Gỗ Ipe Chứng Nhận FSC®',
    sku: 'SR-CT-44',
    dimensions: {
      width: '1120 mm',
      depth: '610 mm',
      height: '460 mm'
    },
    description: 'Soft oval timber coffee table designed with rounded perimeter edges safe for children and serene outdoor flow.',
    descriptionVi: 'Bàn trà dáng elip mềm mại với mép bo tròn an toàn cho trẻ nhỏ và hòa quyện cùng nhịp chảy an nhiên ngoài trời.',
    features: [
      'Rounded oval geometry eliminates sharp corners',
      'Slotted open top drains standing water effortlessly',
      'Solid timber lower cross-stretcher for rock-solid stability'
    ],
    featuresVi: [
      'Thiết kế elip bo tròn loại bỏ hoàn toàn góc nhọn nguy hiểm',
      'Mặt nan thoáng thoát nước mưa nhẹ nhàng',
      'Thanh giằng đáy gỗ đặc tạo độ ổn định tuyệt đối'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1000&q=80',
    lifestyleImageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    cadAvailable: true,
    designer: 'John Caldwell',
    inStock: true
  }
];

export const PRODUCTS: Product[] = [
  ...LUMINO_PROFILE_PRODUCTS,
  ...POLY_BLOOM_PRODUCTS,
  ...LEGACY_PRODUCTS.filter((product) => product.collection !== 'lumino' && product.collection !== 'bloom'),
];

export const FABRIC_SWATCHES: FabricSwatch[] = [
  {
    id: 'linen-natural',
    name: 'Cast Linen',
    nameVi: 'Vải Đũi Cast Linen',
    code: 'SUN-40434',
    colorHex: '#EAE6DF',
    texture: 'Subtle woven linen texture with matte finish',
    textureVi: 'Bề mặt dệt đũi mộc tự nhiên với lớp hoàn thiện mờ tinh tế',
    materialType: 'Sunbrella® Marine Grade 100% Solution Dyed Acrylic',
    materialTypeVi: 'Vải Sunbrella® Nhuộm Dung Dịch 100% Chuẩn Hàng Hải'
  },
  {
    id: 'slate-charcoal',
    name: 'Cast Slate',
    nameVi: 'Xám Đá Slate',
    code: 'SUN-40433',
    colorHex: '#4A4C50',
    texture: 'Deep mineral slate with soft tactile weave',
    textureVi: 'Màu xám phiến đá khoáng trầm với sợi dệt mềm mại êm ái',
    materialType: 'Sunbrella® Marine Grade',
    materialTypeVi: 'Vải Sunbrella® Chuẩn Hàng Hải'
  },
  {
    id: 'canvas-granite',
    name: 'Canvas Granite',
    nameVi: 'Xám Đá Granite',
    code: 'SUN-5402',
    colorHex: '#7E8082',
    texture: 'Medium stone gray heather',
    textureVi: 'Vân đốm xám đá hoa cương sang trọng',
    materialType: 'Sunbrella® Canvas Performance',
    materialTypeVi: 'Vải Bạt Sunbrella® Hiệu Suất Cao'
  },
  {
    id: 'terracotta-clay',
    name: 'Terracotta Earth',
    nameVi: 'Đất Nung Terracotta',
    code: 'SUN-48092',
    colorHex: '#B2644D',
    texture: 'Warm Mediterranean sun-baked clay',
    textureVi: 'Sắc đất nung nồng ấm phong cách Địa Trung Hải',
    materialType: 'Sunbrella® Elements',
    materialTypeVi: 'Bộ Sưu Tập Sunbrella® Elements'
  },
  {
    id: 'navy-nautical',
    name: 'Harbor Navy',
    nameVi: 'Xanh Hải Quân Harbor',
    code: 'SUN-5439',
    colorHex: '#223048',
    texture: 'Deep oceanic navy with subtle sheen',
    textureVi: 'Xanh đại dương sâu thẳm với ánh mờ huyền bí',
    materialType: 'Sunbrella® Marine Performance',
    materialTypeVi: 'Vải Sunbrella® Hiệu Suất Hàng Hải'
  },
  {
    id: 'olive-sage',
    name: 'Olive Grove',
    nameVi: 'Xanh Rừng Olive',
    code: 'SUN-48028',
    colorHex: '#585E4E',
    texture: 'Botanical muted olive with earthy undertones',
    textureVi: 'Sắc xanh ô-liu trầm tĩnh hòa quyện cùng thiên nhiên',
    materialType: 'Sunbrella® Elements',
    materialTypeVi: 'Bộ Sưu Tập Sunbrella® Elements'
  }
];

export const RETAILERS: Retailer[] = [
  {
    id: 'ret-1',
    name: 'AuthenTEAK Luxury Outdoor Living',
    type: 'Premier Flagship',
    city: 'Atlanta',
    state: 'GA',
    zip: '30318',
    address: '1098 Huff Rd NW, Suite 100',
    phone: '(404) 479-7988',
    website: 'https://authenteak.com',
    hours: 'Mon-Sat: 10:00 AM - 6:00 PM',
    featuredCollections: ['Lumino', 'Luma', 'Bloom', 'SERENITY']
  },
  {
    id: 'ret-2',
    name: 'Patio Productions Showroom',
    type: 'Premier Flagship',
    city: 'San Diego',
    state: 'CA',
    zip: '92111',
    address: '2161 Hancock St',
    phone: '(888) 947-4449',
    website: 'https://patioproductions.com',
    hours: 'Mon-Sun: 9:30 AM - 5:30 PM',
    featuredCollections: ['Lumino', 'Bloom', 'SERENITY']
  },
  {
    id: 'ret-3',
    name: 'Florida Backyard Design Gallery',
    type: 'Authorized Design Center',
    city: 'Naples',
    state: 'FL',
    zip: '34109',
    address: '5565 Taylor Rd',
    phone: '(239) 594-8809',
    website: 'https://flbackyard.com',
    hours: 'Mon-Sat: 10:00 AM - 5:00 PM',
    featuredCollections: ['Luma', 'Lumino', 'SERENITY']
  },
  {
    id: 'ret-4',
    name: 'Christy Sports Outdoor Living',
    type: 'Stocking Dealer',
    city: 'Scottsdale',
    state: 'AZ',
    zip: '85255',
    address: '8688 E Raintree Dr',
    phone: '(480) 585-7800',
    website: 'https://christysports.com',
    hours: 'Mon-Sat: 10:00 AM - 6:00 PM, Sun: 11:00 AM - 5:00 PM',
    featuredCollections: ['Lumino', 'Bloom', 'Luma']
  },
  {
    id: 'ret-5',
    name: 'The Hamptons Garden & Terrace Gallery',
    type: 'Premier Flagship',
    city: 'Southampton',
    state: 'NY',
    zip: '11968',
    address: '42 Jobs Lane',
    phone: '(631) 283-4900',
    website: 'https://hamptonsdesigngallery.com',
    hours: 'Tue-Sat: 10:00 AM - 6:00 PM',
    featuredCollections: ['SERENITY', 'Lumino', 'Bloom']
  },
  {
    id: 'ret-6',
    name: 'Burlington Furniture Luxury Veranda',
    type: 'Authorized Design Center',
    city: 'Burlington',
    state: 'VT',
    zip: '05401',
    address: '747 Pine St',
    phone: '(802) 862-5056',
    website: 'https://burlingtonfurniture.us',
    hours: 'Mon-Sat: 10:00 AM - 5:30 PM',
    featuredCollections: ['Luma', 'SERENITY']
  }
];
