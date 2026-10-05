export type NavCategory = 
  | 'home' 
  | 'collections-kurtas-and-suit-sets' 
  | 'products-gulabi-embroidered-chanderi-kurta-set' 
  | 'sarees-and-lehengas' 
  | 'festive-collection' 
  | 'occasion-wear' 
  | 'checkout'
  | 'lookbook';

export interface ColorOption {
  name: string;
  hex: string;
}

export interface DetailImage {
  id: string;
  label: string;
  url: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'kurtas-and-suit-sets' | 'sarees-and-lehengas' | 'festive-collection' | 'occasion-wear';
  subCategory?: string;
  fabric: string;
  type: string;
  price: number;
  originalPrice: number;
  discountPct: number;
  rating: number;
  reviewCount: number;
  image: string;
  detailImages?: DetailImage[];
  badge?: string;
  expressDispatch?: boolean;
  colors: ColorOption[];
  sizes: string[];
  description: string;
  artisanId?: string;
  craftDetails?: {
    top: string;
    bottom: string;
    dupatta: string;
  };
  specs?: {
    shell: string;
    lining: string;
    bottom: string;
    drape: string;
  };
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  bespokeAlteration?: boolean;
  bespokeNotes?: string;
}

export interface Accessory {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  description: string;
}

export interface StylistMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
}
