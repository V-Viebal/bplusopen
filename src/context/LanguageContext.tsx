import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar
    'top.announcement': '100% FSC®-Certified Bolivian Ipe Timber • Heirloom Craftsmanship Since 1994',
    'top.lookbook': '2026 Lookbook',
    'top.retailer': 'Find a Retailer',
    'top.trade': 'Trade Program',

    // Main Navigation
    'nav.furniture': 'Furniture',
    'nav.collections': 'Collections',
    'nav.materials': 'Materials & Ipe',
    'nav.sustainability': 'Sustainability',
    'nav.care': 'Care Guide',
    'nav.trade': 'Trade',
    'nav.showrooms': 'Showrooms',
    'nav.projectSpec': 'Project Spec',
    'nav.viewFullCatalog': 'View Full Master Catalog →',
    'nav.exploreStory': 'Explore Collection Story →',
    'nav.browseByCategory': 'BROWSE BY CATEGORY',
    'nav.signatureCollections': 'SIGNATURE TIMBER COLLECTIONS',
    'nav.allIpeGuarantee': 'All collections crafted from 100% FSC® Ipe',

    // Categories dropdown & list
    'cat.dining.name': 'Dining',
    'cat.dining.desc': 'Extendable tables, armchairs, benches',
    'cat.deep-seating.name': 'Deep Seating',
    'cat.deep-seating.desc': 'Plush sofas, club chairs, sectionals',
    'cat.chaises.name': 'Chaises & Pool',
    'cat.chaises.desc': 'Adjustable loungers & daybeds',
    'cat.tables.name': 'Occasional & Fire',
    'cat.tables.desc': 'Cocktail tables, fire pits & consoles',
    'cat.accessories.name': 'Heritage & Accents',
    'cat.accessories.desc': 'Adirondacks, garden benches & planters',

    // Hero
    'hero.badge': 'B+Open • Living Beyond Walls • 100% FSC® Bolivian Ipe',
    'hero.titleLine1': 'Living Beyond Walls,',
    'hero.titleLine2': 'Sustainable Luxury in Bolivian Ipe.',
    'hero.title1': 'Living Beyond Walls,',
    'hero.title2': 'Sustainable Luxury in Bolivian Ipe.',
    'hero.desc': 'Heirloom outdoor furnishings hand-sculpted from 100% FSC®-certified Bolivian Ipe hardwood. Designed to dissolve boundaries between architecture and nature, engineered to endure decades without compromise.',
    'hero.description': 'Heirloom outdoor furnishings hand-sculpted from 100% FSC®-certified Bolivian Ipe hardwood. Designed to dissolve boundaries between architecture and nature, engineered to endure decades without compromise.',
    'hero.exploreBtn': 'Explore The Collections',
    'hero.ctaExplore': 'Explore The Collections',
    'hero.materialsBtn': 'The Ipe Difference',
    'hero.ctaMaterials': 'The Ipe Difference',
    'hero.pillar1.title': 'Janka Hardness',
    'hero.pillar1.desc': 'Over 3× harder than traditional teak',
    'hero.pillar2.title': 'Certified Bolivian Timber',
    'hero.pillar2.desc': 'Zero chemicals, pure natural oils',
    'hero.pillar3.title': 'Forest Rotation',
    'hero.pillar3.desc': '2M+ acres preserved in Eastern Bolivia',
    'hero.pillar4.value': 'Heirloom',
    'hero.pillar4.title': 'Lifetime Weathering',
    'hero.pillar4.desc': 'Patina to silver or maintain chocolate luster',
    'hero.stat1.val': '3,680',
    'hero.stat1.label': 'Janka Hardness',
    'hero.stat1.sub': 'Over 3× harder than traditional teak',
    'hero.stat2.val': '100% FSC®',
    'hero.stat2.label': 'Certified Bolivian Timber',
    'hero.stat2.sub': 'Zero chemicals, pure natural oils',
    'hero.stat3.val': '30-Year',
    'hero.stat3.label': 'Forest Rotation',
    'hero.stat3.sub': '2M+ acres preserved in Eastern Bolivia',
    'hero.stat4.val': 'Heirloom',
    'hero.stat4.label': 'Lifetime Weathering',
    'hero.stat4.sub': 'Patina to silver or maintain chocolate luster',

    // CategoryNav
    'taxonomy.tag': 'Furniture Taxonomy',
    'taxonomy.title': 'Shop by Living Space',
    'taxonomy.subtitle': 'Select a category to explore curated configurations handcrafted for coastal estates, desert villas, and mountain retreats.',
    'taxonomy.browse': 'Browse',
    'taxonomy.active': 'Active View',
    'taxonomy.reset': 'Reset filter & view all furniture categories',

    // CollectionsGrid
    'collections.tag': 'Signature Ensembles',
    'collections.title': 'Award-Winning Collections',
    'collections.subtitle': 'Conceived in partnership with renowned American and European industrial designers, each collection harnesses the unmatched structural grace of mature Bolivian timber.',
    'collections.viewAll': 'View All 85+ Designs',
    'collections.designedBy': 'Designed by',
    'collections.pieces': 'Pieces',
    'collections.explore': 'Explore',

    // CatalogSection
    'catalog.tag': 'Master Furniture Catalog',
    'catalog.title': 'Explore Handcrafted Furnishings',
    'catalog.subtitle': 'Filter by living space, signature collection, or materials to configure the perfect outdoor retreat.',
    'catalog.searchPlaceholder': 'Search by piece name, collection, or SKU...',
    'catalog.clear': 'Clear',
    'catalog.sort': 'Sort:',
    'catalog.sortFeatured': 'Featured Curations',
    'catalog.sortName': 'Alphabetical (A - Z)',
    'catalog.sortMaterial': 'Primary Material',
    'catalog.reset': 'Reset',
    'catalog.filterLiving': 'Living Category',
    'catalog.filterCol': 'Signature Collection',
    'catalog.filterMat': 'Timber & Material Pairing',
    'catalog.allPieces': 'All Pieces',
    'catalog.allCollections': 'All Collections',
    'catalog.allMaterials': 'All Materials',
    'catalog.showing': 'Showing',
    'catalog.designs': 'handcrafted designs',
    'catalog.savedInSpec': 'pieces saved to your Project Spec Sheet',
    'catalog.noResults': 'No Furniture Matching Selected Filters',
    'catalog.noResultsSub': 'Try adjusting your search criteria or resetting filters to browse our complete collection.',
    'catalog.resetFilters': 'Reset All Filters',
    'catalog.cadReady': 'CAD Ready',
    'catalog.viewSpecs': 'View Specifications',
    'catalog.dimensions': 'Dimensions:',
    'catalog.fscCertified': '100% FSC® Certified',
    'catalog.details': 'Details →',

    // ProductModal
    'modal.timberOption': 'Timber Finish Option',
    'modal.chocolateFinish': 'Chocolate Amber',
    'modal.chocolateDesc': 'Wood Shield + Penofin Treated',
    'modal.silverFinish': 'Silver Patina',
    'modal.silverDesc': 'Naturally Weathered 9-12 mos',
    'modal.fabricsTitle': 'Sunbrella® Performance Cushion Fabrics',
    'modal.dimensionsTitle': 'Technical Dimensions',
    'modal.width': 'Width:',
    'modal.depth': 'Depth:',
    'modal.height': 'Height:',
    'modal.seatHeight': 'Seat Height:',
    'modal.weight': 'Approximate Weight:',
    'modal.craftsmanshipTitle': 'Engineering & Sustainability',
    'modal.fscBullet': 'Harvested from 100% FSC®-certified Bolivian dry-tropical forest',
    'modal.addToSpec': 'Add to Project Spec Sheet',
    'modal.savedToSpec': 'Item Added to Project Spec Sheet',
    'modal.locateDealer': 'Locate at Authorized Dealer',
    'modal.printSpec': 'Print / Save Architecture Spec Sheet',

    // MaterialsExplorer
    'materials.tag': 'Botanical Excellence',
    'materials.title': 'The Science & Beauty of Bolivian Ipe',
    'materials.desc': 'Ipe (pronounced "ee-pay") is nature’s masterwork. Sourced exclusively from certified dry tropical forests in Eastern Bolivia, it is dense enough to sink in water and so naturally fortified that it requires zero chemical preservatives.',
    'materials.pillar1.title': 'Class A Fire Rated',
    'materials.pillar1.desc': 'Ipe possesses the same flame-spread rating as poured concrete and steel, meeting the strictest coastal and mountain wildland urban interface codes.',
    'materials.pillar2.title': 'Impervious to Rot',
    'materials.pillar2.desc': 'Natural essential tannins and microscopic silica crystals guard against moisture penetration, termites, fungal spores, and poolside chlorine splash.',
    'materials.pillar3.title': '3,680 Janka Hardness',
    'materials.pillar3.desc': 'More than three times the density of teak. Resists gouges, chair-scuffs, dog claws, and high winds with immovable estate authority.',
    'materials.pillar4.title': '100-Year Maturity',
    'materials.pillar4.desc': 'We selectively harvest only mature century-old trees, allowing the surrounding canopy and younger saplings 30 years of uninterrupted regeneration.',
    'materials.patina.tag': 'Interactive Weathering Experience',
    'materials.patina.titleLine1': 'Two Distinct Aesthetics.',
    'materials.patina.titleLine2': 'One Indestructible Core.',
    'materials.patina.desc': 'B+Open furniture can be celebrated in two distinct stages. The structural strength never diminishes — the choice of surface finish is purely yours.',
    'materials.patina.modeChocolate': 'Deep Chocolate Luster',
    'materials.patina.modeSilver': 'Silver Gray Patina',
    'materials.patina.chocolateTitle': 'Preserving The Rich Amber Tone',
    'materials.patina.chocolateText': 'Maintained by applying B+Open Wood Shield once or twice per season. For deep revitalization after years, the Penofin Verde Oil treatment restores the deep chocolate-brown warmth instantly.',
    'materials.patina.silverTitle': 'Embracing Coastal Driftwood Silver',
    'materials.patina.silverText': 'Left untreated to the sun and coastal rains, Ipe gently oxidizes over 9 to 12 months into a breathtaking silver-gray patina without splintering or checking. Can be easily restored to chocolate whenever desired.',
    'materials.janka.tag': 'Structural Benchmarks',
    'materials.janka.title': 'Janka Hardness Index Comparison',
    'materials.janka.desc': 'The Janka hardness test measures the force required to embed an 11.28mm steel ball halfway into a piece of wood. Higher values mean superior resistance to wear, warping, and weathering.',
    'materials.goldStandard': 'Industry Gold Standard',

    // Sustainability
    'sustain.tag': 'FSC® Certificate C009849',
    'sustain.titleLine1': 'Stewardship of the Bolivian Forest.',
    'sustain.titleLine2': 'Rooted in 30-Year Rotations.',
    'sustain.desc': 'In 1995, B+Open became one of the first outdoor furniture makers in the world to earn Forest Stewardship Council (FSC®) certification. We don’t just harvest timber; we cultivate a multi-generational legacy of conservation across 2 million acres of dry-tropical forest in Eastern Bolivia.',
    'sustain.card1.title': 'Century-Old Selective Harvesting',
    'sustain.card1.desc': 'Ipe trees grow slowly, requiring nearly a century to attain structural maturity. We never clear-cut. Master foresters hand-select only mature 100-year-old trees, leaving younger, seed-bearing trees intact to replenish the canopy.',
    'sustain.card2.title': '30-Year Rest & Renewal Cycle',
    'sustain.card2.desc': 'Our concession land is divided into thirty distinct sectors. Once a sector is selectively harvested, it is completely protected from human entry for 30 consecutive years, allowing wildlife corridors and soil flora to naturally regenerate.',
    'sustain.card3.title': 'Complete Chain of Custody',
    'sustain.card3.desc': 'Every timber beam is barcoded in the forest, milled by local artisans in Bolivia with zero waste, and directly shipped to our Virginia distribution facility with audited tracking guaranteed by the Forest Stewardship Council.',
    'sustain.community.tag': 'Community & Ethical Prosperity',
    'sustain.community.title': 'Empowering Bolivian Woodcraft Guilds',
    'sustain.community.desc': 'By locating our processing and master joinery workshops in Bolivia adjacent to the forest, we invest directly in indigenous craftsman careers, safe working conditions, fair living wages, and educational infrastructure for rural families.',
    'sustain.statAcres': 'Acres Protected',
    'sustain.statRotation': 'Harvest Interval',

    // Care
    'care.tag': 'Heirloom Longevity',
    'care.title': 'Care & Maintenance Guide',
    'care.desc': 'Due to the extraordinary density and natural oils of Bolivian Ipe, B+Open furniture requires surprisingly little effort to remain in pristine condition for decades.',
    'care.tab1': '1. Routine Seasonal Care',
    'care.tab2': '2. Restoring to Chocolate Amber',
    'care.tab3': '3. Sunbrella® & Viro® Fiber',

    // Retailers
    'retailer.tag': 'Authorized Presence',
    'retailer.title': 'Find a Retailer & Design Gallery',
    'retailer.desc': 'Experience the reassuring weight and silken texture of Bolivian Ipe in person at our premier authorized partner showrooms across North America.',
    'retailer.searchPlaceholder': 'Search by city, state (e.g. CA, FL), or ZIP...',
    'retailer.allShowrooms': 'All Showrooms',
    'retailer.flagships': 'Premier Flagships',
    'retailer.designCenters': 'Design Centers',
    'retailer.onFloor': 'On Floor Display',
    'retailer.bookVisit': 'Book Visit',
    'retailer.directions': 'Directions',

    // Trade
    'trade.tag': 'Architecture & Design Partners',
    'trade.title': 'The B+Open Trade Program',
    'trade.desc': 'Tailored exclusively for licensed interior designers, landscape architects, luxury resorts, private clubs, and estate developers. We provide technical assets, white-glove support, and heirloom durability for demanding commercial and residential installations.',
    'trade.applyBtn': 'Apply for Trade Membership',

    // Project Spec Drawer
    'spec.tag': 'Architectural Spec Sheet',
    'spec.title': 'Project Specification',
    'spec.itemsSaved': 'Design Items Saved',
    'spec.emptyTitle': 'Your Spec Sheet is Empty',
    'spec.emptyDesc': 'Explore our collections and click the bookmark button on any piece to compile a custom design project spec sheet.',
    'spec.requestQuote': 'Request Dealer Price Quote',
    'spec.exportPdf': 'Export / Print Spec Sheet (PDF)',
    'spec.clearAll': 'Clear all items',

    // Footer
    'footer.journal': 'The B+Open Journal • Living Beyond Walls',
    'footer.receiveLookbook': 'Receive the 2026 Seasonal Lookbook',
    'footer.journalDesc': 'Be the first to explore new designer collections, seasonal outdoor living concepts, and architectural timber care insights.',
    'footer.subscribe': 'Subscribe',
    'footer.distribution': 'Distribution: Richmond, Virginia',
    'footer.forestOrigin': 'Forest Stewardship: Eastern Bolivia',
  },
  vi: {
    // Top Bar
    'top.announcement': '100% Gỗ Ipe Bolivia Đạt Chuẩn FSC® • Nghệ Thuật Chế Tác Gia Bảo Từ Năm 1994',
    'top.lookbook': 'Lookbook 2026',
    'top.retailer': 'Tìm Showroom',
    'top.trade': 'Chương Trình Trade',

    // Main Navigation
    'nav.furniture': 'Nội Thất',
    'nav.collections': 'Bộ Sưu Tập',
    'nav.materials': 'Chất Liệu & Gỗ Ipe',
    'nav.sustainability': 'Phát Triển Bền Vững',
    'nav.care': 'Bảo Dưỡng',
    'nav.trade': 'Đối Tác Trade',
    'nav.showrooms': 'Phòng Trưng Bày',
    'nav.projectSpec': 'Hồ Sơ Dự Án',
    'nav.viewFullCatalog': 'Xem Toàn Bộ Danh Mục Sản Phẩm →',
    'nav.exploreStory': 'Khám Phá Câu Chuyện Bộ Sưu Tập →',
    'nav.browseByCategory': 'DANH MỤC KHÔNG GIAN SỐNG',
    'nav.signatureCollections': 'CÁC BỘ SƯU TẬP GỖ IPE ĐẶC TRƯNG',
    'nav.allIpeGuarantee': 'Mọi bộ sưu tập chế tác từ 100% gỗ Ipe chứng nhận FSC®',

    // Categories dropdown & list
    'cat.dining.name': 'Bàn Ghế Ăn Ngoài Trời',
    'cat.dining.desc': 'Bàn mở rộng cánh bướm, ghế bành tay vịn, ghế băng dài',
    'cat.deep-seating.name': 'Sofa & Ghế Bành Thư Giãn',
    'cat.deep-seating.desc': 'Sofa êm ái, ghế bành đơn, sofa góc đệm Sunbrella',
    'cat.chaises.name': 'Ghế Tắm Nắng & Hồ Bơi',
    'cat.chaises.desc': 'Ghế nằm đa nấc có bánh xe & giường đôi hồ bơi',
    'cat.tables.name': 'Bàn Lửa Sưởi & Bàn Trà',
    'cat.tables.desc': 'Bàn cocktail gỗ Ipe, lò sưởi gas ấm áp & bàn phụ',
    'cat.accessories.name': 'Ghế Băng & Điểm Nhấn Sân Vườn',
    'cat.accessories.desc': 'Ghế Adirondack biểu tượng, ghế băng Anh & chậu cây',

    // Hero
    'hero.badge': 'B+Open • Living Beyond Walls • 100% Gỗ Ipe Bolivia FSC®',
    'hero.titleLine1': 'Living Beyond Walls,',
    'hero.titleLine2': 'Đẳng Cấp Ngoại Thất Gỗ Ipe Bolivia.',
    'hero.title1': 'Living Beyond Walls,',
    'hero.title2': 'Đẳng Cấp Ngoại Thất Gỗ Ipe Bolivia.',
    'hero.desc': 'Nội thất ngoài trời gia bảo được điêu khắc thủ công từ 100% gỗ cứng Ipe Bolivia chứng nhận FSC®. Xóa nhòa ranh giới giữa kiến trúc và thiên nhiên, kiên cường vượt qua nắng mưa nhiệt đới và gió biển ngàn năm.',
    'hero.description': 'Nội thất ngoài trời gia bảo được điêu khắc thủ công từ 100% gỗ cứng Ipe Bolivia chứng nhận FSC®. Xóa nhòa ranh giới giữa kiến trúc và thiên nhiên, kiên cường vượt qua nắng mưa nhiệt đới và gió biển ngàn năm.',
    'hero.exploreBtn': 'Khám Phá Các Bộ Sưu Tập',
    'hero.ctaExplore': 'Khám Phá Các Bộ Sưu Tập',
    'hero.materialsBtn': 'Sự Khác Biệt Của Gỗ Ipe',
    'hero.ctaMaterials': 'Sự Khác Biệt Của Gỗ Ipe',
    'hero.pillar1.title': 'Độ Cứng Janka',
    'hero.pillar1.desc': 'Cứng hơn gấp 3 lần gỗ Teak truyền thống',
    'hero.pillar2.title': 'Gỗ Bolivia Chứng Nhận',
    'hero.pillar2.desc': 'Không hoá chất bảo quản, tinh dầu tự nhiên',
    'hero.pillar3.title': 'Chu Kỳ Tái Sinh Rừng',
    'hero.pillar3.desc': 'Bảo tồn hơn 2 triệu mẫu rừng Đông Bolivia',
    'hero.pillar4.value': 'Gia Bảo',
    'hero.pillar4.title': 'Vẻ Đẹp Vĩnh Cửu',
    'hero.pillar4.desc': 'Lên màu bạc phong trần hoặc giữ ánh nâu sô-cô-la',
    'hero.stat1.val': '3.680',
    'hero.stat1.label': 'Độ Cứng Janka',
    'hero.stat1.sub': 'Cứng hơn gấp 3 lần gỗ Teak truyền thống',
    'hero.stat2.val': '100% FSC®',
    'hero.stat2.label': 'Gỗ Bolivia Chứng Nhận',
    'hero.stat2.sub': 'Không hoá chất bảo quản, tinh dầu tự nhiên',
    'hero.stat3.val': '30 Năm',
    'hero.stat3.label': 'Chu Kỳ Tái Sinh Rừng',
    'hero.stat3.sub': 'Bảo tồn hơn 2 triệu mẫu rừng Đông Bolivia',
    'hero.stat4.val': 'Gia Bảo',
    'hero.stat4.label': 'Vẻ Đẹp Vĩnh Cửu',
    'hero.stat4.sub': 'Lên màu bạc phong trần hoặc giữ ánh nâu sô-cô-la',

    // CategoryNav
    'taxonomy.tag': 'Phân Loại Không Gian',
    'taxonomy.title': 'Mua Sắm Theo Không Gian Sống',
    'taxonomy.subtitle': 'Chọn không gian để khám phá các mẫu thiết kế thủ công tinh tế dành riêng cho biệt thự biển, villa nghỉ dưỡng và dinh thự đồi.',
    'taxonomy.browse': 'Khám Phá',
    'taxonomy.active': 'Đang Xem',
    'taxonomy.reset': 'Đặt lại bộ lọc & xem tất cả không gian',

    // CollectionsGrid
    'collections.tag': 'Tuyệt Tác Bộ Sưu Tập',
    'collections.title': 'Các Bộ Sưu Tập Đoạt Giải Thưởng',
    'collections.subtitle': 'Được đồng sáng tạo cùng các nhà thiết kế công nghiệp danh tiếng của Mỹ và Châu Âu, từng bộ sưu tập tôn vinh vẻ đẹp kiến trúc và độ bền phi thường của gỗ Ipe trăm tuổi.',
    'collections.viewAll': 'Xem Tất Cả 85+ Mẫu Thiết Kế',
    'collections.designedBy': 'Thiết kế bởi',
    'collections.pieces': 'Món Đồ',
    'collections.explore': 'Khám Phá',

    // CatalogSection
    'catalog.tag': 'Danh Mục Sản Phẩm Toàn Diện',
    'catalog.title': 'Khám Phá Nội Thất Thủ Công Cao Cấp',
    'catalog.subtitle': 'Lọc theo không gian sống, bộ sưu tập hoặc sự kết hợp chất liệu để hoàn thiện không gian sống thư thái hoàn hảo.',
    'catalog.searchPlaceholder': 'Tìm theo tên sản phẩm, bộ sưu tập hoặc mã SKU...',
    'catalog.clear': 'Xoá',
    'catalog.sort': 'Sắp xếp:',
    'catalog.sortFeatured': 'Gợi Ý Nổi Bật',
    'catalog.sortName': 'Theo Thứ Tự Bảng Chữ Cái (A - Z)',
    'catalog.sortMaterial': 'Theo Chất Liệu Chính',
    'catalog.reset': 'Đặt Lại',
    'catalog.filterLiving': 'Không Gian Sống',
    'catalog.filterCol': 'Bộ Sưu Tập Tiêu Biểu',
    'catalog.filterMat': 'Chất Liệu & Kết Hợp Gỗ',
    'catalog.allPieces': 'Tất Cả Sản Phẩm',
    'catalog.allCollections': 'Tất Cả Bộ Sưu Tập',
    'catalog.allMaterials': 'Tất Cả Chất Liệu',
    'catalog.showing': 'Đang hiển thị',
    'catalog.designs': 'thiết kế thủ công',
    'catalog.savedInSpec': 'món đồ đã lưu vào Hồ Sơ Dự Án của bạn',
    'catalog.noResults': 'Không Có Sản Phẩm Nào Phù Hợp Bộ Lọc',
    'catalog.noResultsSub': 'Vui lòng thay đổi từ khoá tìm kiếm hoặc bấm đặt lại bộ lọc để xem toàn bộ danh mục.',
    'catalog.resetFilters': 'Đặt Lại Tất Cả Bộ Lọc',
    'catalog.cadReady': 'Sẵn Sàng File CAD',
    'catalog.viewSpecs': 'Xem Chi Tiết & Thông Số',
    'catalog.dimensions': 'Kích thước:',
    'catalog.fscCertified': 'Chứng nhận 100% FSC®',
    'catalog.details': 'Chi Tiết →',

    // ProductModal
    'modal.timberOption': 'Tuỳ Chọn Màu Sắc Hoàn Thiện Gỗ',
    'modal.chocolateFinish': 'Nâu Hổ Phách Sô-cô-la',
    'modal.chocolateDesc': 'Bảo dưỡng Wood Shield + Dầu Penofin',
    'modal.silverFinish': 'Bạc Phong Hoá Tự Nhiên',
    'modal.silverDesc': 'Phong hoá tự nhiên dưới nắng mưa 9-12 tháng',
    'modal.fabricsTitle': 'Bảng Vải Đệm Cao Cấp Kháng Thời Tiết Sunbrella®',
    'modal.dimensionsTitle': 'Thông Số Kỹ Thuật Chi Tiết',
    'modal.width': 'Chiều Rộng:',
    'modal.depth': 'Chiều Sâu:',
    'modal.height': 'Chiều Cao:',
    'modal.seatHeight': 'Độ Cao Mặt Ghế:',
    'modal.weight': 'Trọng Lượng Ước Tính:',
    'modal.craftsmanshipTitle': 'Kỹ Thuật Mộng Ghép & Tính Bền Vững',
    'modal.fscBullet': 'Khai thác từ 100% rừng nhiệt đới khô Bolivia đạt chứng nhận FSC®',
    'modal.addToSpec': 'Lưu Vào Hồ Sơ Dự Án',
    'modal.savedToSpec': 'Đã Lưu Vào Hồ Sơ Dự Án',
    'modal.locateDealer': 'Tìm Tại Showroom Ủy Quyền Gần Nhất',
    'modal.printSpec': 'In / Xuất Bản Thông Số Kỹ Thuật (PDF)',

    // MaterialsExplorer
    'materials.tag': 'Kỳ Quan Thực Vật Học',
    'materials.title': 'Khoa Học & Vẻ Đẹp Của Gỗ Ipe Bolivia',
    'materials.desc': 'Ipe (phát âm là "ee-pay") là kiệt tác của thiên nhiên. Được khai thác độc quyền từ các cánh rừng nhiệt đới khô tại Đông Bolivia, loại gỗ này đặc đến mức chìm trong nước và có khả năng tự vệ tự nhiên đến mức hoàn toàn không cần hoá chất tẩm sấy độc hại.',
    'materials.pillar1.title': 'Chống Cháy Cấp A (Class A)',
    'materials.pillar1.desc': 'Gỗ Ipe có chỉ số lan truyền lửa tương đương với bê tông cốt thép và kim loại, đáp ứng những tiêu chuẩn xây dựng chống cháy khắt khe nhất tại các khu biệt thự đồi và vùng ven biển.',
    'materials.pillar2.title': 'Bất Khả Xâm Phạm Với Mối Mọt',
    'materials.pillar2.desc': 'Hàm lượng tannin đậm đặc và tinh thể silica vi mô tự nhiên ngăn chặn sự xâm nhập của hơi ẩm, mối mọt, nấm mốc và hoá chất clo từ hồ bơi.',
    'materials.pillar3.title': 'Độ Cứng Janka 3.680',
    'materials.pillar3.desc': 'Độ cứng cao hơn gấp ba lần so với gỗ Teak thông thường. Chống trầy xước, va đập, vết cào móng vuốt thú cưng và đứng vững trước bão biển.',
    'materials.pillar4.title': 'Độ Tuổi Khai Thác 100 Năm',
    'materials.pillar4.desc': 'Chúng tôi chỉ tuyển chọn những cây gỗ cổ thụ đã đạt chu kỳ trưởng thành một thế kỷ, để nguyên tán rừng non 30 năm tái sinh không gián đoạn.',
    'materials.patina.tag': 'Trải Nghiệm Phong Hoá Tương Tác',
    'materials.patina.titleLine1': 'Hai Sắc Thái Vẻ Đẹp.',
    'materials.patina.titleLine2': 'Một Cốt Lõi Bất Hoại.',
    'materials.patina.desc': 'Nội thất B+Open có thể được thưởng lãm qua hai giai đoạn thẩm mỹ độc đáo. Kết cấu chịu lực không bao giờ suy suyển — việc chọn diện mạo nào hoàn toàn phụ thuộc vào sở thích của quý khách.',
    'materials.patina.modeChocolate': 'Sắc Nâu Hổ Phách Sâu',
    'materials.patina.modeSilver': 'Sắc Bạc Phong Trần',
    'materials.patina.chocolateTitle': 'Bảo Tồn Tông Nâu Ấm Áp Sáng Bóng',
    'materials.patina.chocolateText': 'Duy trì bằng cách lau dầu B+Open Wood Shield một hoặc hai lần mỗi mùa. Sau nhiều năm, bộ dầu Penofin Verde Oil sẽ lập tức đánh thức ánh nâu sô-cô-la ấm áp ban đầu.',
    'materials.patina.silverTitle': 'Đón Nhận Màu Bạc Phong Hoá Coastal Silver',
    'materials.patina.silverText': 'Khi để tự nhiên dưới ánh nắng và mưa sương, bề mặt gỗ Ipe sẽ chuyển hoá nhẹ nhàng sau 9 đến 12 tháng thành màu xám bạc ánh kim uy nghi mà không hề nứt nẻ hay xơ dăm. Bất cứ khi nào muốn, quý khách đều có thể phục hồi lại sắc nâu óng ả.',
    'materials.janka.tag': 'Tiêu Chuẩn Đo Lường Vật Liệu',
    'materials.janka.title': 'So Sánh Thang Đo Độ Cứng Janka',
    'materials.janka.desc': 'Thử nghiệm Janka đo lực cần thiết để nhấn ngập một nửa viên bi thép 11,28mm vào thớ gỗ. Giá trị càng cao thể hiện độ bền bỉ, chống cong vênh và độ chịu lực càng vượt trội.',
    'materials.goldStandard': 'Tiêu Chuẩn Vàng Của Ngành',

    // Sustainability
    'sustain.tag': 'Chứng Nhận FSC® Số C009849',
    'sustain.titleLine1': 'Bảo Tồn Rừng Nhiệt Đới Bolivia.',
    'sustain.titleLine2': 'Chu Trình Tái Sinh 30 Năm.',
    'sustain.desc': 'Từ năm 1995, B+Open đã trở thành một trong những nhà sản xuất nội thất đầu tiên trên thế giới đạt chứng nhận Quản lý Rừng Hội đồng FSC®. Chúng tôi không chỉ khai thác gỗ, chúng tôi nuôi dưỡng di sản bảo tồn trên 2 triệu mẫu rừng nhiệt đới khô tại Đông Bolivia.',
    'sustain.card1.title': 'Khai Thác Chọn Lọc Cổ Thụ Trăm Năm',
    'sustain.card1.desc': 'Cây Ipe phát triển rất chậm, cần gần một thế kỷ để hoàn thiện phẩm chất thớ gỗ. Chúng tôi không bao giờ chặt trắng; các chuyên gia lâm nghiệp chỉ chọn lọc 1-2 cây già mỗi héc-ta, giữ lại những cây mẹ sinh sản để nuôi dưỡng tán rừng.',
    'sustain.card2.title': 'Chu Kỳ Tĩnh Dưỡng 30 Năm Nghiêm Ngặt',
    'sustain.card2.desc': 'Khu vực quản lý được chia thành 30 phân khu biệt lập. Sau khi thu hoạch chọn lọc, phân khu đó được bảo vệ tuyệt đối không cho con người can thiệp trong 30 năm liên tục để động thực vật hoang dã tự do hồi sinh.',
    'sustain.card3.title': 'Minh Bạch Chuỗi Hành Trình (Chain of Custody)',
    'sustain.card3.desc': 'Mỗi thân cây gỗ đều được gắn mã vạch ngay tại rừng, xẻ sấy bởi những người thợ thủ công Bolivia lành nghề và vận chuyển trực tiếp đến kho Virginia với quy trình kiểm định FSC® nghiêm ngặt.',
    'sustain.community.tag': 'Cộng Đồng & Thịnh Vượng Đạo Đức',
    'sustain.community.title': 'Tôn Vinh Phường Thợ Mộc Bolivia Bản Địa',
    'sustain.community.desc': 'Đặt xưởng mộc gia công ngay sát vùng nguyên liệu tại Bolivia, chúng tôi tạo công ăn việc làm ổn định, điều kiện lao động an toàn, thu nhập thỏa đáng và cơ sở trường học cho gia đình các nghệ nhân mộc bản địa.',
    'sustain.statAcres': 'Mẫu Rừng Được Bảo Tồn',
    'sustain.statRotation': 'Chu Kỳ Luân Canh Rừng',

    // Care
    'care.tag': 'Trường Tồn Đa Thế Hệ',
    'care.title': 'Hướng Dẫn Chăm Sóc & Bảo Dưỡng',
    'care.desc': 'Nhờ mật độ thớ gỗ cực kỳ đặc chắc và lượng tinh dầu dồi dào, nội thất B+Open đòi hỏi rất ít công sức để duy trì trạng thái hoàn hảo trong suốt nhiều thập kỷ.',
    'care.tab1': '1. Vệ Sinh Định Kỳ Hằng Mùa',
    'care.tab2': '2. Phục Hồi Về Sắc Nâu Sô-cô-la',
    'care.tab3': '3. Vải Sunbrella® & Sợi Đan Viro®',

    // Retailers
    'retailer.tag': 'Mạng Lưới Ủy Quyền',
    'retailer.title': 'Tìm Đại Lý & Showroom Trưng Bày',
    'retailer.desc': 'Trải nghiệm trực tiếp sức nặng vững chãi và cảm giác mịn màng như lụa của gỗ Ipe Bolivia tại các phòng trưng bày đối tác cao cấp của chúng tôi.',
    'retailer.searchPlaceholder': 'Tìm theo thành phố, tiểu bang hoặc mã ZIP...',
    'retailer.allShowrooms': 'Tất Cả Showroom',
    'retailer.flagships': 'Showroom Flagship',
    'retailer.designCenters': 'Trung Tâm Thiết Kế',
    'retailer.onFloor': 'Đang Trưng Bày Trên Sàn',
    'retailer.bookVisit': 'Đặt Lịch Xem',
    'retailer.directions': 'Chỉ Đường',

    // Trade
    'trade.tag': 'Đối Tác Kiến Trúc & Thiết Kế',
    'trade.title': 'Chương Trình Đối Tác B+Open Trade',
    'trade.desc': 'Dành riêng cho các kiến trúc sư cảnh quan, nhà thiết kế nội thất, khu nghỉ dưỡng sang trọng và các nhà phát triển dự án biệt thự. Chúng tôi cung cấp tư liệu kỹ thuật, bảo hành thương mại 10 năm và chính sách chiết khấu bậc thang ưu việt.',
    'trade.applyBtn': 'Đăng Ký Thành Viên Trade',

    // Project Spec Drawer
    'spec.tag': 'Hồ Sơ Kỹ Thuật Kiến Trúc',
    'spec.title': 'Hồ Sơ Thiết Kế Dự Án',
    'spec.itemsSaved': 'Món Đồ Đã Lưu',
    'spec.emptyTitle': 'Hồ Sơ Dự Án Đang Trống',
    'spec.emptyDesc': 'Khám phá các bộ sưu tập và nhấp vào biểu tượng bookmark để tạo bảng tổng hợp thông số thiết kế riêng cho dự án của bạn.',
    'spec.requestQuote': 'Yêu Cầu Báo Giá Đại Lý',
    'spec.exportPdf': 'Xuất / In Hồ Sơ Thông Số (PDF)',
    'spec.clearAll': 'Xoá tất cả sản phẩm',

    // Footer
    'footer.journal': 'Tập San B+Open • Living Beyond Walls',
    'footer.receiveLookbook': 'Đăng Ký Nhận Lookbook Mùa Mới 2026',
    'footer.journalDesc': 'Cập nhật sớm nhất về các bộ sưu tập nhà thiết kế mới, xu hướng bài trí ngoại thất và kiến thức bảo dưỡng gỗ chuyên sâu.',
    'footer.subscribe': 'Đăng Ký Ngay',
    'footer.distribution': 'Phân phối & Kho vận: Richmond, Virginia (Mỹ)',
    'footer.forestOrigin': 'Nguồn gốc gỗ: Rừng khô Đông Bolivia',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bopen_language') || localStorage.getItem('jensen_language');
    return (saved === 'vi' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bopen_language', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'vi' : 'en';
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    const dict = translations[language] || translations['en'];
    return dict[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
