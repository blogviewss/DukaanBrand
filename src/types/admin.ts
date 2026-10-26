export interface PaymentRecord {
  id: string;
  phone: string;
  shopName: string;
  utrNumber: string;
  amount: number;
  date: string;
  status: 'active' | 'pending' | 'expired';
}

export interface AdminConfig {
  ownerUpiId: string;
  ownerName: string;
  monthlyPrice: number;
  vipPasscode: string;
  adminPin: string;
  watermarkText: string;
  freeDailyLimit: number;
}
