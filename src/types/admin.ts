export interface PaymentRecord {
  id: string;
  phone: string;
  shopName: string;
  utrNumber: string;
  amount: number;
  date: string;
  status: 'active' | 'pending' | 'expired';
  boundDeviceId?: string;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  event: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'AUTO_LOGOUT' | 'LOGOUT' | 'CONFIG_CHANGED' | 'PASSWORD_CHANGED';
  details: string;
  maskedIp: string;
  deviceInfo: string;
  severity: 'success' | 'danger' | 'warning' | 'info';
}

export interface DynamicVipToken {
  token: string;
  targetPhone: string;
  createdAt: string;
  isUsed: boolean;
  expiresInDays: number;
}

export interface AdminConfig {
  ownerUpiId: string;
  ownerName: string;
  monthlyPrice: number;
  vipPasscode: string;
  adminPassword: string; // Master Owner Password
  securityRecoveryKey: string;
  watermarkText: string;
  freeDailyLimit: number;
  isSiteLocked: boolean;
  siteAccessKey: string;
  dynamicTokens: DynamicVipToken[];
}

export interface DailyMetric {
  date: string;
  visitors: number;
  postersGenerated: number;
  proConversions: number;
  revenue: number;
}

export interface CategoryMetric {
  name: string;
  posters: number;
  sharePercentage: number;
  color: string;
}
