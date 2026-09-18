export type Language = 'en' | 'vi';

export type PageId = 
  | 'home'
  | 'furniture'
  | 'collections'
  | 'collection-detail'
  | 'product-detail'
  | 'materials'
  | 'sustainability'
  | 'design'
  | 'story'
  | 'care'
  | 'trade'
  | 'showrooms'
  | 'how-to-buy'
  | 'news'
  | 'help-center'
  | 'catalog'
  | '3d-showroom'
  | 'admin';

export type MainCategory = 'dining' | 'lounging';

export type DiningSubCategory = 'tables' | 'chairs' | 'bar';

export type LoungingSubCategory =
  | 'deep-seating'
  | 'chaise-lounges'
  | 'accessory-tables'
  | 'adirondack'
  | 'garden-benches'
  | 'steamer';

export type SubCategory = DiningSubCategory | LoungingSubCategory;

export interface Product {
  id: string;
  name: string;
  nameVi?: string;
  collection: string;
  category: 'dining' | 'deep-seating' | 'chaises' | 'tables' | 'accessories';
  subCategory?: SubCategory;
  material: '100% FSC Ipe' | 'Ipe & Woven Viro' | 'Ipe & Aluminum' | 'Powder-coated aluminum & woven cord' | 'Powder-coated steel & teak' | 'Molded FRP composite' | 'Powder-coated aluminum';
  materialVi?: string;
  sku: string;
  dimensions: {
    width: string;
    depth: string;
    height: string;
    seatHeight?: string;
    weight?: string;
  };
  description: string;
  descriptionVi?: string;
  features: string[];
  featuresVi?: string[];
  imageUrl: string;
  lifestyleImageUrl: string;
  secondaryImages: string[];
  availableFabrics?: string[];
  cadAvailable: boolean;
  designer?: string;
  inStock: boolean;
  price?: number;
  priceRange?: string;
  basePrice?: number;
  cushionPriceRange?: string;
  lifestyleImagesList?: string[];
}

export interface CuratedEnsemble {
  id: string;
  name: string;
  nameVi?: string;
  tagline: string;
  taglineVi?: string;
  pieceCount: number;
  image: string;
  idealSpace: string;
  idealSpaceVi?: string;
  includedProductIds: string[];
}

export interface Collection {
  id: string;
  name: string;
  nameVi?: string;
  tagline: string;
  taglineVi?: string;
  description: string;
  descriptionVi?: string;
  story?: string;
  storyVi?: string;
  designer: string;
  designerBio?: string;
  designerBioVi?: string;
  primaryMaterial: string;
  primaryMaterialVi?: string;
  heroImage: string;
  lifestyleImages?: string[];
  itemCount: number;
  highlightSpecs: string[];
  highlightSpecsVi?: string[];
  yearIntroduced?: string;
  curatedEnsembles?: CuratedEnsemble[];
}

export interface FabricSwatch {
  id: string;
  name: string;
  nameVi?: string;
  code: string;
  colorHex: string;
  texture: string;
  textureVi?: string;
  materialType: string;
  materialTypeVi?: string;
}

export interface Retailer {
  id: string;
  name: string;
  type: 'Premier Flagship' | 'Authorized Design Center' | 'Stocking Dealer';
  city: string;
  state: string;
  zip: string;
  address: string;
  phone: string;
  website: string;
  hours: string;
  featuredCollections: string[];
}

export interface TradeInquiry {
  firmName: string;
  contactName: string;
  email: string;
  phone: string;
  projectType: 'Residential Estate' | 'Luxury Hospitality' | 'Commercial / Club' | 'Yacht / Marine';
  projectCity: string;
  estimatedTimeline: string;
  selectedProducts: string[];
  notes?: string;
}
