import { Product, Collection } from '../types';
export type LumaProduct = Product & { sourcePage: number; specImage: string; sourceNote?: string; sourceNoteVi?: string };
export const LUMA_PRODUCTS: LumaProduct[] = [
  {
    "id": "luma-coffee-table-1",
    "name": "LUMA Coffee Table 1",
    "nameVi": "LUMA Bàn trà 1",
    "collection": "luma",
    "category": "tables",
    "subCategory": "accessory-tables",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-COFFEE-TABLE-1",
    "dimensions": {
      "width": "1000",
      "depth": "1000",
      "height": "350"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/coffee-table-1.webp",
    "lifestyleImageUrl": "/luma/scene-3.webp",
    "secondaryImages": [
      "/luma/spec-5.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 5,
    "specImage": "/luma/spec-5.webp"
  },
  {
    "id": "luma-armchair",
    "name": "LUMA Armchair",
    "nameVi": "LUMA Ghế bành",
    "collection": "luma",
    "category": "deep-seating",
    "subCategory": "deep-seating",
    "material": "Powder-coated aluminum & woven cord",
    "materialVi": "Nhôm sơn tĩnh điện & dây đan",
    "sku": "LUMA-ARMCHAIR",
    "dimensions": {
      "width": "810",
      "depth": "810",
      "height": "780",
      "seatHeight": "440"
    },
    "description": "Powder-coated aluminum frame with woven cord detailing, quick-dry foam and factory-standard upholstery.",
    "descriptionVi": "Khung nhôm ống bo tròn sơn tĩnh điện, tựa lưng và tay vịn đan dây. Đệm mút thoát nước nhanh, bọc vải theo tiêu chuẩn nhà máy.",
    "features": [
      "Powder-coated aluminum frame with woven cord detailing, quick-dry foam and factory-standard upholstery.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung nhôm ống bo tròn sơn tĩnh điện, tựa lưng và tay vịn đan dây. Đệm mút thoát nước nhanh, bọc vải theo tiêu chuẩn nhà máy.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/armchair.webp",
    "lifestyleImageUrl": "/luma/scene-6.webp",
    "secondaryImages": [
      "/luma/spec-8.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 8,
    "specImage": "/luma/spec-8.webp"
  },
  {
    "id": "luma-sofa",
    "name": "LUMA Sofa",
    "nameVi": "LUMA Sofa",
    "collection": "luma",
    "category": "deep-seating",
    "subCategory": "deep-seating",
    "material": "Powder-coated aluminum & woven cord",
    "materialVi": "Nhôm sơn tĩnh điện & dây đan",
    "sku": "LUMA-SOFA",
    "dimensions": {
      "width": "1510",
      "depth": "810",
      "height": "780",
      "seatHeight": "440"
    },
    "description": "Powder-coated aluminum frame with woven cord detailing, quick-dry foam and factory-standard upholstery.",
    "descriptionVi": "Khung nhôm ống bo tròn sơn tĩnh điện, tựa lưng và tay vịn đan dây. Đệm mút thoát nước nhanh, bọc vải theo tiêu chuẩn nhà máy.",
    "features": [
      "Powder-coated aluminum frame with woven cord detailing, quick-dry foam and factory-standard upholstery.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung nhôm ống bo tròn sơn tĩnh điện, tựa lưng và tay vịn đan dây. Đệm mút thoát nước nhanh, bọc vải theo tiêu chuẩn nhà máy.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/sofa.webp",
    "lifestyleImageUrl": "/luma/scene-11.webp",
    "secondaryImages": [
      "/luma/spec-10.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 10,
    "specImage": "/luma/spec-10.webp"
  },
  {
    "id": "luma-coffee-table-2",
    "name": "LUMA Coffee Table 2",
    "nameVi": "LUMA Bàn trà 2",
    "collection": "luma",
    "category": "tables",
    "subCategory": "accessory-tables",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-COFFEE-TABLE-2",
    "dimensions": {
      "width": "800",
      "depth": "800",
      "height": "350"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/coffee-table-2.webp",
    "lifestyleImageUrl": "/luma/scene-11.webp",
    "secondaryImages": [
      "/luma/spec-13.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 13,
    "specImage": "/luma/spec-13.webp"
  },
  {
    "id": "luma-side-table-1",
    "name": "LUMA Side Table 1",
    "nameVi": "LUMA Bàn phụ 1",
    "collection": "luma",
    "category": "tables",
    "subCategory": "accessory-tables",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-SIDE-TABLE-1",
    "dimensions": {
      "width": "330",
      "depth": "330",
      "height": "350"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/side-table-1.webp",
    "lifestyleImageUrl": "/luma/scene-11.webp",
    "secondaryImages": [
      "/luma/spec-14.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 14,
    "specImage": "/luma/spec-14.webp"
  },
  {
    "id": "luma-side-table-2",
    "name": "LUMA Side Table 2",
    "nameVi": "LUMA Bàn phụ 2",
    "collection": "luma",
    "category": "tables",
    "subCategory": "accessory-tables",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-SIDE-TABLE-2",
    "dimensions": {
      "width": "500",
      "depth": "500",
      "height": "500"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/side-table-2.webp",
    "lifestyleImageUrl": "/luma/scene-15.webp",
    "secondaryImages": [
      "/luma/spec-17.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 17,
    "specImage": "/luma/spec-17.webp"
  },
  {
    "id": "luma-dining-chair",
    "name": "LUMA Dining Chair",
    "nameVi": "LUMA Ghế ăn",
    "collection": "luma",
    "category": "dining",
    "subCategory": "chairs",
    "material": "Powder-coated aluminum & woven cord",
    "materialVi": "Nhôm sơn tĩnh điện & dây đan",
    "sku": "LUMA-DINING-CHAIR",
    "dimensions": {
      "width": "650",
      "depth": "600",
      "height": "780",
      "seatHeight": "450"
    },
    "description": "Powder-coated aluminum frame with woven cord detailing, quick-dry foam and factory-standard upholstery.",
    "descriptionVi": "Khung nhôm ống bo tròn sơn tĩnh điện, tựa lưng và tay vịn đan dây. Đệm mút thoát nước nhanh, bọc vải theo tiêu chuẩn nhà máy.",
    "features": [
      "Powder-coated aluminum frame with woven cord detailing, quick-dry foam and factory-standard upholstery.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung nhôm ống bo tròn sơn tĩnh điện, tựa lưng và tay vịn đan dây. Đệm mút thoát nước nhanh, bọc vải theo tiêu chuẩn nhà máy.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/dining-chair.webp",
    "lifestyleImageUrl": "/luma/scene-18.webp",
    "secondaryImages": [
      "/luma/spec-20.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 20,
    "specImage": "/luma/spec-20.webp"
  },
  {
    "id": "luma-dining-table-1",
    "name": "LUMA Dining Table 1",
    "nameVi": "LUMA Bàn ăn 1",
    "collection": "luma",
    "category": "dining",
    "subCategory": "tables",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-DINING-TABLE-1",
    "dimensions": {
      "width": "2000",
      "depth": "900",
      "height": "750"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/dining-table-1.webp",
    "lifestyleImageUrl": "/luma/scene-18.webp",
    "secondaryImages": [
      "/luma/spec-22.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 22,
    "specImage": "/luma/spec-22.webp"
  },
  {
    "id": "luma-dining-table-2",
    "name": "LUMA Dining Table 2",
    "nameVi": "LUMA Bàn ăn 2",
    "collection": "luma",
    "category": "dining",
    "subCategory": "tables",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-DINING-TABLE-2",
    "dimensions": {
      "width": "2600",
      "depth": "1000",
      "height": "750"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/dining-table-2.webp",
    "lifestyleImageUrl": "/luma/scene-18.webp",
    "secondaryImages": [
      "/luma/spec-24.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 24,
    "specImage": "/luma/spec-24.webp"
  },
  {
    "id": "luma-dining-table-3",
    "name": "LUMA Dining Table 3",
    "nameVi": "LUMA Bàn ăn 3",
    "collection": "luma",
    "category": "dining",
    "subCategory": "tables",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-DINING-TABLE-3",
    "dimensions": {
      "width": "3000",
      "depth": "1000",
      "height": "750"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/dining-table-3.webp",
    "lifestyleImageUrl": "/luma/scene-18.webp",
    "secondaryImages": [
      "/luma/spec-26.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 26,
    "specImage": "/luma/spec-26.webp"
  },
  {
    "id": "luma-bar-table-round-600",
    "name": "LUMA Bar Table T600",
    "nameVi": "LUMA Bàn bar T600",
    "collection": "luma",
    "category": "dining",
    "subCategory": "bar",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-BAR-TABLE-ROUND-600",
    "dimensions": {
      "width": "600",
      "depth": "600",
      "height": "1050"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/bar-table-round-600.webp",
    "lifestyleImageUrl": "/luma/scene-37.webp",
    "secondaryImages": [
      "/luma/spec-28.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 28,
    "specImage": "/luma/spec-28.webp"
  },
  {
    "id": "luma-bar-stool",
    "name": "LUMA Bar Stool",
    "nameVi": "LUMA Ghế bar",
    "collection": "luma",
    "category": "dining",
    "subCategory": "bar",
    "material": "Powder-coated aluminum & woven cord",
    "materialVi": "Nhôm sơn tĩnh điện & dây đan",
    "sku": "LUMA-BAR-STOOL",
    "dimensions": {
      "width": "550",
      "depth": "580",
      "height": "1030",
      "seatHeight": "750"
    },
    "description": "Powder-coated aluminum frame with woven cord detailing, quick-dry foam and factory-standard upholstery.",
    "descriptionVi": "Khung nhôm ống bo tròn sơn tĩnh điện, tựa lưng và tay vịn đan dây. Đệm mút thoát nước nhanh, bọc vải theo tiêu chuẩn nhà máy.",
    "features": [
      "Powder-coated aluminum frame with woven cord detailing, quick-dry foam and factory-standard upholstery.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung nhôm ống bo tròn sơn tĩnh điện, tựa lưng và tay vịn đan dây. Đệm mút thoát nước nhanh, bọc vải theo tiêu chuẩn nhà máy.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/bar-stool.webp",
    "lifestyleImageUrl": "/luma/scene-37.webp",
    "secondaryImages": [
      "/luma/spec-30.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 30,
    "specImage": "/luma/spec-30.webp"
  },
  {
    "id": "luma-bar-table-t800",
    "name": "LUMA Bar Table T800",
    "nameVi": "LUMA Bàn bar T800",
    "collection": "luma",
    "category": "dining",
    "subCategory": "bar",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-BAR-TABLE-T800",
    "dimensions": {
      "width": "800",
      "depth": "800",
      "height": "1050"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/bar-table-t800.webp",
    "lifestyleImageUrl": "/luma/scene-37.webp",
    "secondaryImages": [
      "/luma/spec-32.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 32,
    "specImage": "/luma/spec-32.webp"
  },
  {
    "id": "luma-bar-table-v600",
    "name": "LUMA Bar Table V600",
    "nameVi": "LUMA Bàn bar V600",
    "collection": "luma",
    "category": "dining",
    "subCategory": "bar",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-BAR-TABLE-V600",
    "dimensions": {
      "width": "600",
      "depth": "600",
      "height": "1050"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/bar-table-v600.webp",
    "lifestyleImageUrl": "/luma/scene-37.webp",
    "secondaryImages": [
      "/luma/spec-34.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 34,
    "specImage": "/luma/spec-34.webp"
  },
  {
    "id": "luma-table-t800",
    "name": "LUMA Table T800",
    "nameVi": "LUMA Bàn T800",
    "collection": "luma",
    "category": "dining",
    "subCategory": "tables",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-TABLE-T800",
    "dimensions": {
      "width": "800",
      "depth": "800",
      "height": "750"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/table-t800.webp",
    "lifestyleImageUrl": "/luma/scene-37.webp",
    "secondaryImages": [
      "/luma/spec-36.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 36,
    "specImage": "/luma/spec-36.webp"
  },
  {
    "id": "luma-table-t600",
    "name": "LUMA Table T600",
    "nameVi": "LUMA Bàn T600",
    "collection": "luma",
    "category": "dining",
    "subCategory": "tables",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-TABLE-T600",
    "dimensions": {
      "width": "600",
      "depth": "600",
      "height": "750"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/table-t600.webp",
    "lifestyleImageUrl": "/luma/scene-37.webp",
    "secondaryImages": [
      "/luma/spec-39.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 39,
    "specImage": "/luma/spec-39.webp"
  },
  {
    "id": "luma-table-v600",
    "name": "LUMA Table V600",
    "nameVi": "LUMA Bàn V600",
    "collection": "luma",
    "category": "dining",
    "subCategory": "tables",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-TABLE-V600",
    "dimensions": {
      "width": "600",
      "depth": "600",
      "height": "750"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/table-v600.webp",
    "lifestyleImageUrl": "/luma/scene-37.webp",
    "secondaryImages": [
      "/luma/spec-40.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 40,
    "specImage": "/luma/spec-40.webp"
  },
  {
    "id": "luma-four-seater-table",
    "name": "LUMA Four-Seater Table",
    "nameVi": "LUMA Bàn liền ghế 4 chỗ",
    "collection": "luma",
    "category": "dining",
    "subCategory": "tables",
    "material": "Powder-coated steel & teak",
    "materialVi": "Thép sơn tĩnh điện & gỗ teak",
    "sku": "LUMA-FOUR-SEATER-TABLE",
    "dimensions": {
      "width": "1100",
      "depth": "1450",
      "height": "750",
      "seatHeight": "450"
    },
    "description": "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
    "descriptionVi": "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
    "features": [
      "RAL powder-coated steel frame with a naturally sun-dried teak slat tabletop. The frame is designed for assembly and disassembly.",
      "Frame color customizable to project requirements.",
      "Catalog 2026 · B+ Furniture"
    ],
    "featuresVi": [
      "Khung và chân thép sơn tĩnh điện màu RAL, mặt bàn ghép nan gỗ teak phơi khô tự nhiên. Kết cấu hỗ trợ tháo lắp để vận chuyển và lắp đặt.",
      "Màu khung tùy chỉnh theo yêu cầu dự án.",
      "Catalog 2026 · B+ Furniture"
    ],
    "imageUrl": "/luma/four-seater-table.webp",
    "lifestyleImageUrl": "/luma/scene-41.webp",
    "secondaryImages": [
      "/luma/spec-44.webp"
    ],
    "cadAvailable": false,
    "inStock": false,
    "sourcePage": 44,
    "specImage": "/luma/spec-44.webp",
    "sourceNote": "The catalog cover page gives a 750 mm height, while the technical specification on page 44 lists 730 mm. The web listing follows the 750 mm drawing value; confirm before ordering.",
    "sourceNoteVi": "Trang mẫu ghi chiều cao 750 mm, trong khi phần thông số kỹ thuật trang 44 ghi 730 mm. Web dùng 750 mm theo bản vẽ; cần xác nhận trước khi đặt hàng."
  }
];
export const LUMA_COLLECTION: Collection = {
  "id": "luma",
  "name": "LUMA Collection",
  "nameVi": "Bộ Sưu Tập LUMA",
  "tagline": "Natural materials. Contemporary outdoor living.",
  "taglineVi": "Chất liệu tự nhiên. Nhịp sống ngoài trời đương đại.",
  "description": "LUMA pairs powder-coated metal frames with teak, woven cord and quick-dry cushions across lounge seating, dining and bar furniture.",
  "descriptionVi": "LUMA kết hợp khung kim loại sơn tĩnh điện với gỗ teak, dây đan và đệm thoát nước nhanh, từ sofa thư giãn đến bàn ăn và bàn bar.",
  "story": "The 2026 B+ Furniture catalog presents a coordinated outdoor collection with customizable frame colors and Vietkai fabric references.",
  "storyVi": "Bộ sưu tập ngoài trời 2026 của B+ Furniture mang đến hệ sản phẩm đồng bộ, màu khung tùy chỉnh và các lựa chọn vải Vietkai trong catalog.",
  "designer": "B+ Furniture",
  "primaryMaterial": "Powder-coated metal, teak & woven cord",
  "primaryMaterialVi": "Kim loại sơn tĩnh điện, gỗ teak & dây đan",
  "heroImage": "/luma/scene-3.webp",
  "lifestyleImages": [
    "/luma/scene-6.webp",
    "/luma/scene-11.webp",
    "/luma/scene-15.webp",
    "/luma/scene-18.webp",
    "/luma/scene-37.webp",
    "/luma/scene-41.webp"
  ],
  "itemCount": 18,
  "yearIntroduced": "2026",
  "highlightSpecs": [
    "RAL powder-coated frames",
    "Naturally sun-dried teak tabletops",
    "Woven cord seating",
    "Quick-dry foam cushions"
  ],
  "highlightSpecsVi": [
    "Khung sơn tĩnh điện màu RAL",
    "Mặt bàn teak phơi khô tự nhiên",
    "Ghế tựa đan dây",
    "Đệm mút thoát nước nhanh"
  ]
};
