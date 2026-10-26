export interface ShopProfile {
  shopName: string;
  ownerName: string;
  phone: string;
  city: string;
  tagline: string;
  logoUrl: string | null;
}

export type CanvasFormat = 'story' | 'square';

export type CategoryFilter = 'all' | 'morning' | 'festival' | 'offers' | 'udhar' | 'card' | 'night';
