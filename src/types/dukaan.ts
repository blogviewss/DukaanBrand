export interface ShopProfile {
  shopName: string;
  ownerName: string;
  phone: string;
  city: string;
  tagline: string;
  logoUrl: string | null;
  // Killer Pro Features (Real business value for shopkeepers)
  upiId?: string;
  showUpiQr?: boolean;
  showVerifiedBadge?: boolean;
  specialOffer?: string;
  homeDelivery?: boolean;
}

export type CanvasFormat = 'story' | 'square';

export type CategoryFilter = 'all' | 'morning' | 'festival' | 'offers' | 'udhar' | 'card' | 'night';
