import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShopProfile, CanvasFormat, CategoryFilter } from './types/dukaan';
import { TEMPLATES_DATA, Template } from './data/templates';
import { Language } from './types';
import { AdminConfig, PaymentRecord, SecurityAuditLog } from './types/admin';
import { DukaanHeader } from './components/DukaanHeader';
import { ShopProfileForm } from './components/ShopProfileForm';
import { TemplateSelector } from './components/TemplateSelector';
import { CanvasRenderer } from './components/CanvasRenderer';
import { ProCheckoutModal } from './components/ProCheckoutModal';
import { AdminPortal } from './components/AdminPortal';
import { SiteAccessGatekeeper } from './components/SiteAccessGatekeeper';
import { SalesTipsCard } from './components/SalesTipsCard';
import { DailyGoalTracker } from './components/DailyGoalTracker';
import { WhatsAppShareFlow } from './components/WhatsAppShareFlow';
import { PosterCustomizer } from './components/PosterCustomizer';
import { 
  Sparkles, 
  Crown, 
  Lock, 
  AlertOctagon, 
  Clock, 
  Store, 
  Palette, 
  Eye, 
  Share2, 
  Download, 
  QrCode, 
  CheckCircle2, 
  Zap,
  Edit3
} from 'lucide-react';

export default function App() {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dukaan_brand_language');
      if (saved === 'hinglish' || saved === 'hindi' || saved === 'english') {
        return saved as Language;
      }
    }
    return 'hinglish';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dukaan_brand_language', newLang);
    }
  };

  const isEn = language === 'english';
  const isHi = language === 'hindi';
  const isHinglish = language === 'hinglish';
  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer');
  const [isPro, setIsPro] = useState<boolean>(false);
  const [format, setFormat] = useState<CanvasFormat>('story');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES_DATA[0]);

  // Poster Customization State (Allows editing headers, quotes, subquotes, and accent colors)
  const [customHeader, setCustomHeader] = useState<string>('');
  const [customQuote, setCustomQuote] = useState<string>('');
  const [customSubQuote, setCustomSubQuote] = useState<string>('');
  const [customAccent, setCustomAccent] = useState<string>('');

  const handleCustomizerUpdate = (field: 'header' | 'quote' | 'subQuote' | 'accent', value: string) => {
    if (field === 'header') setCustomHeader(value);
    if (field === 'quote') setCustomQuote(value);
    if (field === 'subQuote') setCustomSubQuote(value);
    if (field === 'accent') setCustomAccent(value);
  };

  const handleCustomizerReset = () => {
    setCustomHeader('');
    setCustomQuote('');
    setCustomSubQuote('');
    setCustomAccent('');
  };

  // Mobile navigation tab: 'preview' | 'templates' | 'customize' | 'details' | 'pro'
  const [mobileTab, setMobileTab] = useState<'preview' | 'templates' | 'customize' | 'details' | 'pro'>('preview');

  // Sitewide Access Protection State
  const [isSiteUnlocked, setIsSiteUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('dukaan_site_unlocked') === 'true';
  });

  // Daily Sales & Share Goal State (Auto-resets on new day)
  const [dailyGoalCount, setDailyGoalCount] = useState<number>(() => {
    const today = new Date().toISOString().slice(0, 10);
    const savedDate = localStorage.getItem('dukaan_goal_date');
    if (savedDate !== today) {
      localStorage.setItem('dukaan_goal_date', today);
      localStorage.setItem('dukaan_goal_count', '0');
      return 0;
    }
    const savedCount = localStorage.getItem('dukaan_goal_count');
    return savedCount ? parseInt(savedCount, 10) || 0 : 0;
  });

  const handleIncrementGoal = useCallback(() => {
    setDailyGoalCount((prev) => {
      const next = prev + 1;
      localStorage.setItem('dukaan_goal_count', next.toString());
      return next;
    });
  }, []);

  const handleResetGoal = useCallback(() => {
    setDailyGoalCount(0);
    localStorage.setItem('dukaan_goal_count', '0');
  }, []);

  // Admin Config with LocalStorage Persistence
  const [adminConfig, setAdminConfig] = useState<AdminConfig>(() => {
    const saved = localStorage.getItem('dukaan_admin_config');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return {
          ownerUpiId: parsed.ownerUpiId || 'jitenderjagga3@okaxis',
          ownerName: parsed.ownerName || 'DukaanBrand Pro',
          monthlyPrice: parsed.monthlyPrice || 10,
          vipPasscode: parsed.vipPasscode || 'VIP786',
          adminPassword: parsed.adminPassword || 'Admin@2026',
          securityRecoveryKey: parsed.securityRecoveryKey || 'DK-9921-XQ47-Z810',
          watermarkText: parsed.watermarkText || '⚡ अपनी दुकान का फ्री स्टेटस बनाएं: DukaanBrand.in',
          freeDailyLimit: parsed.freeDailyLimit || 3,
          isSiteLocked: parsed.isSiteLocked ?? false,
          siteAccessKey: parsed.siteAccessKey || 'BHARAT2026',
          dynamicTokens: parsed.dynamicTokens || [],
        };
      } catch (e) { /* fallback */ }
    }
    return {
      ownerUpiId: 'jitenderjagga3@okaxis',
      ownerName: 'DukaanBrand Pro',
      monthlyPrice: 10,
      vipPasscode: 'VIP786',
      adminPassword: 'Admin@2026',
      securityRecoveryKey: 'DK-9921-XQ47-Z810',
      watermarkText: '⚡ अपनी दुकान का फ्री स्टेटस बनाएं: DukaanBrand.in',
      freeDailyLimit: 3,
      isSiteLocked: false,
      siteAccessKey: 'BHARAT2026',
      dynamicTokens: [],
    };
  });

  // Payment Records Ledger with LocalStorage Persistence
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('dukaan_payment_records');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      {
        id: 'pay-1',
        phone: '9812345678',
        shopName: 'गुप्ता प्रोविजन स्टोर',
        utrNumber: '428901928374',
        amount: 10,
        date: '26 Oct 2026, 11:15 AM',
        status: 'active',
      },
      {
        id: 'pay-2',
        phone: '9789012345',
        shopName: 'श्री कृष्णा गारमेंट्स',
        utrNumber: '428901928375',
        amount: 10,
        date: '26 Oct 2026, 10:40 AM',
        status: 'active',
      },
    ];
  });

  // Security Audit Logs with LocalStorage Persistence
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>(() => {
    const saved = localStorage.getItem('dukaan_security_audit_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      {
        id: 'log-1',
        timestamp: '26 Oct 2026, 11:30:15 AM',
        event: 'LOGIN_SUCCESS',
        details: 'मालिक ने सफलतापूर्वक मास्टर पासवर्ड से लॉगिन किया',
        maskedIp: '103.212.xx.xx',
        deviceInfo: 'Chrome / Windows 11',
        severity: 'success',
      },
    ];
  });

  // Security & Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutTime, setLockoutTime] = useState<number>(0);
  const [sessionExpiredToast, setSessionExpiredToast] = useState<boolean>(false);

  // Inactivity Auto-Logout Timer (10 minutes = 600 seconds)
  const SESSION_DURATION = 600;
  const [sessionRemainingSeconds, setSessionRemainingSeconds] = useState<number>(SESSION_DURATION);

  // Modals state
  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);

  // Customer Shop Profile State (Pre-filled with friendly defaults)
  const [profile, setProfile] = useState<ShopProfile>({
    shopName: 'श्री बालाजी किराना व जनरल स्टोर',
    ownerName: 'रमेश कुमार जी',
    phone: '98765-43210',
    city: 'मेन बाजार, चौक मार्केट',
    tagline: 'शुद्धता और भरोसे का 25 वर्षों का सफर',
    logoUrl: null,
    upiId: 'shreebalaji@okaxis',
    showUpiQr: false,
    showVerifiedBadge: false,
    specialOffer: '',
    homeDelivery: true,
  });

  // Helper: Append a new security audit log
  const logSecurityEvent = useCallback(
    (event: SecurityAuditLog['event'], details: string, severity: SecurityAuditLog['severity'] = 'info') => {
      const now = new Date();
      const timestamp = now.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const newLog: SecurityAuditLog = {
        id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        timestamp,
        event,
        details,
        maskedIp: '103.212.xx.xx',
        deviceInfo: navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Browser',
        severity,
      };

      setAuditLogs((prev) => {
        const updated = [newLog, ...prev.slice(0, 99)];
        localStorage.setItem('dukaan_security_audit_logs', JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  // Inactivity Auto-Logout Timer Hook
  const resetSessionTimer = useCallback(() => {
    setSessionRemainingSeconds(SESSION_DURATION);
  }, [SESSION_DURATION]);

  useEffect(() => {
    if (!isAdminAuthenticated) return;

    const interval = setInterval(() => {
      setSessionRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsAdminAuthenticated(false);
          setViewMode('customer');
          setSessionExpiredToast(true);
          logSecurityEvent('AUTO_LOGOUT', '10 मिनट की निष्क्रियता के बाद ऑटोमैटिक लॉगआउट हुआ', 'warning');
          setTimeout(() => setSessionExpiredToast(false), 6000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    const handleUserActivity = () => {
      setSessionRemainingSeconds(SESSION_DURATION);
    };

    activityEvents.forEach((evt) => window.addEventListener(evt, handleUserActivity, { passive: true }));

    return () => {
      clearInterval(interval);
      activityEvents.forEach((evt) => window.removeEventListener(evt, handleUserActivity));
    };
  }, [isAdminAuthenticated, SESSION_DURATION, logSecurityEvent]);

  // Handle owner manual logout
  const handleOwnerLogout = () => {
    setIsAdminAuthenticated(false);
    setViewMode('customer');
    logSecurityEvent('LOGOUT', 'मालिक ने मैन्युअल रूप से सत्र बंद (Logout) किया', 'info');
  };

  // Handle Save config from Admin Portal
  const handleSaveConfig = (updated: AdminConfig) => {
    setAdminConfig(updated);
    localStorage.setItem('dukaan_admin_config', JSON.stringify(updated));
    logSecurityEvent('CONFIG_CHANGED', 'मालिक ने UPI, मूल्य या पासकोड सेटिंग्स अपडेट कीं', 'info');
  };

  // Handle Payment status update
  const handleUpdatePaymentStatus = (id: string, status: 'active' | 'expired' | 'pending') => {
    const updated = paymentRecords.map((p) => (p.id === id ? { ...p, status } : p));
    setPaymentRecords(updated);
    localStorage.setItem('dukaan_payment_records', JSON.stringify(updated));
  };

  // Handle Add manual subscriber from admin
  const handleAddManualSubscriber = (phone: string, shopName: string) => {
    const newRecord: PaymentRecord = {
      id: 'pay-' + Date.now(),
      phone,
      shopName: shopName || 'दुकानदार VIP',
      utrNumber: 'MANUAL-CASH-' + Math.floor(Math.random() * 89999 + 10000),
      amount: adminConfig.monthlyPrice,
      date: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      status: 'active',
    };
    const updated = [newRecord, ...paymentRecords];
    setPaymentRecords(updated);
    localStorage.setItem('dukaan_payment_records', JSON.stringify(updated));
  };

  // Handle Delete payment record
  const handleDeletePayment = (id: string) => {
    const updated = paymentRecords.filter((p) => p.id !== id);
    setPaymentRecords(updated);
    localStorage.setItem('dukaan_payment_records', JSON.stringify(updated));
  };

  // Clear Audit Logs
  const handleClearAuditLogs = () => {
    setAuditLogs([]);
    localStorage.removeItem('dukaan_security_audit_logs');
  };

  // Handle Customer UTR submission
  const handleSubmitPaymentClaim = (customerPhone: string, utr: string, customerShopName: string) => {
    const newRecord: PaymentRecord = {
      id: 'pay-' + Date.now(),
      phone: customerPhone,
      shopName: customerShopName || profile.shopName || 'दुकान ग्राहक',
      utrNumber: utr,
      amount: adminConfig.monthlyPrice,
      date: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      status: 'active',
    };
    const updated = [newRecord, ...paymentRecords];
    setPaymentRecords(updated);
    localStorage.setItem('dukaan_payment_records', JSON.stringify(updated));
  };

  // Admin Login Submission
  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime > Date.now()) {
      const waitMinutes = Math.ceil((lockoutTime - Date.now()) / 60000);
      setPasswordError(`सुरक्षा लॉक: 3 गलत प्रयासों के कारण खाता लॉक है। कृपया ${waitMinutes} मिनट प्रतीक्षा करें।`);
      return;
    }

    if (adminPasswordInput.trim() === adminConfig.adminPassword) {
      setIsAdminAuthenticated(true);
      setViewMode('admin');
      setShowAdminModal(false);
      setPasswordError('');
      setAdminPasswordInput('');
      setFailedAttempts(0);
      resetSessionTimer();
      logSecurityEvent('LOGIN_SUCCESS', 'मालिक ने सफलतापूर्वक मास्टर पासवर्ड से लॉगिन किया', 'success');
    } else {
      const nextFailed = failedAttempts + 1;
      setFailedAttempts(nextFailed);
      logSecurityEvent('LOGIN_FAILED', `अमान्य पासवर्ड से लॉगिन का असफल प्रयास (प्रयास #${nextFailed})`, 'danger');

      if (nextFailed >= 3) {
        const lockUntil = Date.now() + 5 * 60 * 1000;
        setLockoutTime(lockUntil);
        setPasswordError('सुरक्षा अलर्ट: 3 गलत प्रयासों के कारण लॉगिन 5 मिनट के लिए लॉक कर दिया गया है!');
      } else {
        setPasswordError(`गलत पासवर्ड! (शेष प्रयास: ${3 - nextFailed})`);
      }
    }
  };

  // Global secret shortcut listener (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminAuthenticated) {
          setViewMode('admin');
        } else {
          setShowAdminModal(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated]);

  // Check URL hash #owner
  useEffect(() => {
    if (window.location.hash === '#owner') {
      setShowAdminModal(true);
    }
  }, []);

  // 1. If Sitewide Password Lock is Enabled and user hasn't entered key:
  if (adminConfig.isSiteLocked && !isSiteUnlocked && viewMode !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950">
        <SiteAccessGatekeeper
          expectedKey={adminConfig.siteAccessKey}
          ownerUpi={adminConfig.ownerUpiId}
          onUnlockSite={() => {
            setIsSiteUnlocked(true);
            localStorage.setItem('dukaan_site_unlocked', 'true');
          }}
          onOpenOwnerLogin={() => setShowAdminModal(true)}
          language={language}
        />
        {showAdminModal && renderAdminLoginModal()}
      </div>
    );
  }

  // 2. If in Admin Mode, Render Admin Dashboard
  if (viewMode === 'admin' && isAdminAuthenticated) {
    return (
      <AdminPortal
        config={adminConfig}
        onSaveConfig={handleSaveConfig}
        payments={paymentRecords}
        auditLogs={auditLogs}
        onClearAuditLogs={handleClearAuditLogs}
        onUpdatePaymentStatus={handleUpdatePaymentStatus}
        onAddManualSubscriber={handleAddManualSubscriber}
        onDeletePayment={handleDeletePayment}
        onExitToCustomerView={() => setViewMode('customer')}
        onLogout={handleOwnerLogout}
        sessionRemainingSeconds={sessionRemainingSeconds}
        onResetSessionTimer={resetSessionTimer}
        language={language}
      />
    );
  }

  // Master Admin Password Modal (WITHOUT ANY PASSWORD HINT!)
  function renderAdminLoginModal() {
    const isLocked = lockoutTime > Date.now();
    return (
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-white shadow-2xl relative text-center animate-fadeIn">
          <button
            onClick={() => {
              setShowAdminModal(false);
              setPasswordError('');
              setAdminPasswordInput('');
            }}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            ✕
          </button>

          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-500/20">
            <Lock className="w-7 h-7" />
          </div>

          <h4 className="font-black text-xl text-white mb-1">
            मालिक सुरक्षित लॉगिन (Owner Login)
          </h4>
          <p className="text-xs text-slate-400 mb-4">
            यह केवल ऐप के मालिक के लिए है। अपना गुप्त मास्टर पासवर्ड दर्ज करें।
          </p>

          <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={adminPasswordInput}
                onChange={(e) => {
                  setAdminPasswordInput(e.target.value);
                  setPasswordError('');
                }}
                disabled={isLocked}
                placeholder="मास्टर पासवर्ड दर्ज करें"
                autoComplete="off"
                autoCorrect="off"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-center text-sm font-mono tracking-widest text-white focus:outline-none focus:border-rose-400 disabled:opacity-50"
                autoFocus
                required
              />
            </div>

            {passwordError && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLocked}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-black text-sm cursor-pointer shadow-lg active:scale-95 transition-all disabled:opacity-50"
            >
              सुरक्षित एडमिन में प्रवेश करें →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. Render Pure, Simple, Mobile-First Customer View
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 pb-20 lg:pb-8">
      {/* Session Expired Toast */}
      {sessionExpiredToast && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <Clock className="w-4 h-4 text-slate-950" />
          <span>सुरक्षा सूचना: 10 मिनट की निष्क्रियता के बाद आपका एडमिन सत्र समाप्त हो गया।</span>
        </div>
      )}

      {/* Top Mobile Header */}
      <DukaanHeader
        language={language}
        onLanguageChange={setLanguage}
        isPro={isPro}
        onOpenProModal={() => setIsProModalOpen(true)}
        onOpenAdmin={() => {
          if (isAdminAuthenticated) {
            setViewMode('admin');
          } else {
            setShowAdminModal(true);
          }
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-6 w-full space-y-4">
        {/* Daily Shop Sales Tip Banner (दुकानदार कमाई टिप) */}
        <SalesTipsCard shopName={profile.shopName} language={language} />

        {/* Daily Sales & Share Goal Tracker (दुकानदार डेली शेयर लक्ष्य) */}
        <DailyGoalTracker
          currentCount={dailyGoalCount}
          onIncrement={handleIncrementGoal}
          onReset={handleResetGoal}
          language={language}
        />

        {/* Mobile Navigation Tabs (Super clear 5 buttons for mobile shopkeepers) */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-5 gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg text-[10px] sm:text-[11px] font-black">
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                mobileTab === 'preview'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isEn ? '1. Poster' : isHi ? '1. पोस्टर' : '1. Poster'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab('templates')}
              className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                mobileTab === 'templates'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{isEn ? '2. Design' : isHi ? '2. डिज़ाइन' : '2. Design'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab('customize')}
              className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                mobileTab === 'customize'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-amber-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEn ? '3. Text' : isHi ? '3. शब्द' : '3. Customize'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab('details')}
              className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                mobileTab === 'details'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>{isEn ? '4. Store' : isHi ? '4. दुकान' : '4. Dukaan'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab('pro')}
              className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                mobileTab === 'pro'
                  ? 'bg-gradient-to-tr from-amber-500 to-rose-500 text-slate-950 shadow-md font-black'
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>{isEn ? '5. VIP Pro' : isHi ? '5. वीआईपी' : '5. VIP Pro'}</span>
            </button>
          </div>
        </div>

        {/* ================= MOBILE VIEW SCREENS ================= */}
        <div className="block lg:hidden">
          {/* Tab 1: Live Poster Preview Screen (Immediate satisfaction!) */}
          {mobileTab === 'preview' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {language === 'english' 
                      ? 'Live Poster Ready (Created in 10 seconds):' 
                      : 'लाइव स्टेटस तैयार है (10 सेकंड में बनाएं):'}
                  </span>
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  ✓ HD Ready
                </span>
              </div>

              <CanvasRenderer
                profile={profile}
                template={selectedTemplate}
                format={format}
                isPro={isPro}
                watermarkText={adminConfig.watermarkText}
                language={language}
                customHeader={customHeader}
                customQuote={customQuote}
                customSubQuote={customSubQuote}
                customAccent={customAccent}
                onOpenProModal={() => setIsProModalOpen(true)}
                onShareSuccess={handleIncrementGoal}
              />

              {/* Automated WhatsApp Message Flow (1-Click Share) */}
              <WhatsAppShareFlow
                profile={profile}
                template={selectedTemplate}
                language={language}
                customHeader={customHeader}
                customQuote={customQuote}
                onShareSuccess={handleIncrementGoal}
              />

              {/* Quick shortcut buttons beneath poster */}
              <div className="grid grid-cols-3 gap-1.5 pt-2">
                <button
                  type="button"
                  onClick={() => setMobileTab('templates')}
                  className="py-2.5 px-2 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow"
                >
                  <Palette className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{language === 'english' ? 'Templates' : 'डिज़ाइन →'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMobileTab('customize')}
                  className="py-2.5 px-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{language === 'english' ? 'Edit Words' : 'कस्टमाइज़ →'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMobileTab('details')}
                  className="py-2.5 px-2 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow"
                >
                  <Store className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{language === 'english' ? 'Shop Info' : 'दुकान नाम →'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Template Selection Screen */}
          {mobileTab === 'templates' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-amber-400" />
                  <span>आज का सुविचार या त्योहार चुनें:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileTab('preview')}
                  className="text-xs text-amber-400 font-bold underline"
                >
                  पोस्टर देखें →
                </button>
              </div>

              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={(t) => {
                  setSelectedTemplate(t);
                  setMobileTab('preview');
                }}
                language={language}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          )}

          {/* Tab: Customize Poster Words, Quotes & Colors */}
          {mobileTab === 'customize' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4 text-amber-400" />
                  <span>
                    {language === 'english'
                      ? 'Customize Poster Text & Colors:'
                      : 'पोस्टर पर अपनी बात व रंग लिखें:'}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileTab('preview')}
                  className="text-xs text-amber-400 font-bold underline cursor-pointer"
                >
                  {language === 'english' ? 'View Poster →' : 'पोस्टर देखें →'}
                </button>
              </div>

              <PosterCustomizer
                template={selectedTemplate}
                customHeader={customHeader}
                customQuote={customQuote}
                customSubQuote={customSubQuote}
                customAccent={customAccent}
                language={language}
                onUpdate={handleCustomizerUpdate}
                onReset={handleCustomizerReset}
              />

              <button
                type="button"
                onClick={() => setMobileTab('preview')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                {language === 'english'
                  ? '✓ Done! View Live Poster & Share →'
                  : '✓ तैयार! लाइव पोस्टर देखें व शेयर करें →'}
              </button>
            </div>
          )}

          {/* Tab 3: Shop Details Screen */}
          {mobileTab === 'details' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-emerald-400" />
                  <span>अपनी दुकान की जानकारी भरें:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileTab('preview')}
                  className="text-xs text-amber-400 font-bold underline"
                >
                  पोस्टर देखें →
                </button>
              </div>

              <ShopProfileForm
                profile={profile}
                onChange={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
                format={format}
                onFormatChange={setFormat}
                language={language}
                isPro={isPro}
                onOpenProModal={() => setIsProModalOpen(true)}
              />

              <button
                type="button"
                onClick={() => setMobileTab('preview')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm shadow-lg active:scale-95 transition-all"
              >
                ✓ तैयार! पोस्टर देखें व स्टेटस लगाएं →
              </button>
            </div>
          )}

          {/* Tab 4: VIP Pro Jugad Perks Screen */}
          {mobileTab === 'pro' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-5 text-white shadow-xl space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-2 font-black text-xl">
                    👑
                  </div>
                  <h3 className="font-black text-lg text-white">
                    VIP Pro से दुकान की बिक्री बढ़ाएं
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    सिर्फ वॉटरमार्क हटाना नहीं — ग्राहक पोस्टर देखकर सीधे पैसे भेजेंगे!
                  </p>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <strong className="block text-white">पोस्टर पर असली UPI QR कोड</strong>
                      <span className="text-[11px] text-slate-400">ग्राहक स्कैन करके सीधे खाते में पेमेंट भेजेंगे।</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="block text-white">गोल्डन 'Verified Dukaan' बैज</strong>
                      <span className="text-[11px] text-slate-400">100% शुद्धता व पक्का बिल का भरोसा स्टैम्प।</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <strong className="block text-white">दुकान की फोटो + महासेल ऑफर</strong>
                      <span className="text-[11px] text-slate-400">20% छूट या फ्री होम डिलीवरी का चमकदार बैनर।</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsProModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-black text-sm shadow-xl active:scale-95 transition-all"
                >
                  सिर्फ ₹{adminConfig.monthlyPrice} में अभी अनलॉक करें →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= DESKTOP VIEW (2 COLUMNS) ================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Inputs & Template Selection - 6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step 1: Shop Profile */}
            <section className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="font-extrabold text-base text-white">
                  {isEn ? 'Step 1: Fill Store Profile' : isHi ? 'चरण 1: दुकान की जानकारी भरें' : 'Step 1: Dukaan Ki Details Bharein'}
                </h3>
              </div>
              <ShopProfileForm
                profile={profile}
                onChange={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
                format={format}
                onFormatChange={setFormat}
                language={language}
                isPro={isPro}
                onOpenProModal={() => setIsProModalOpen(true)}
              />
            </section>

            {/* Step 2: Choose Template */}
            <section className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="font-extrabold text-base text-white">
                  {isEn ? 'Step 2: Choose Poster Design' : isHi ? 'चरण 2: पोस्टर व सुविचार डिज़ाइन चुनें' : 'Step 2: Poster & Suvichar Design Chunein'}
                </h3>
              </div>
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
                language={language}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </section>
            {/* Step 3: Customize Text, Quotes & Colors */}
            <section className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="font-extrabold text-base text-white">
                  {language === 'english' ? 'Customize Poster Words & Accent Color' : 'पोस्टर कस्टमाइज़ करें (अपनी मर्जी से लिखें)'}
                </h3>
              </div>
              <PosterCustomizer
                template={selectedTemplate}
                customHeader={customHeader}
                customQuote={customQuote}
                customSubQuote={customSubQuote}
                customAccent={customAccent}
                language={language}
                onUpdate={handleCustomizerUpdate}
                onReset={handleCustomizerReset}
              />
            </section>
          </div>

          {/* Right Column (Canvas Preview & Export - 6 cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  4
                </span>
                <h3 className="font-extrabold text-base text-white">
                  {language === 'english' ? 'Live Poster Preview & Download' : 'लाइव पोस्टर प्रिव्यू व डाउनलोड'}
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                ✓ 100% Free Client-Side
              </span>
            </div>

            <CanvasRenderer
              profile={profile}
              template={selectedTemplate}
              format={format}
              isPro={isPro}
              watermarkText={adminConfig.watermarkText}
              language={language}
              customHeader={customHeader}
              customQuote={customQuote}
              customSubQuote={customSubQuote}
              customAccent={customAccent}
              onOpenProModal={() => setIsProModalOpen(true)}
              onShareSuccess={handleIncrementGoal}
            />

            {/* Automated WhatsApp Message Flow (1-Click Share) */}
            <WhatsAppShareFlow
              profile={profile}
              template={selectedTemplate}
              language={language}
              customHeader={customHeader}
              customQuote={customQuote}
              onShareSuccess={handleIncrementGoal}
            />
          </div>
        </div>
      </main>

      {/* Pro Checkout Modal with Real Dynamic Owner UPI and UTR entry */}
      <ProCheckoutModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        onUnlockPro={() => setIsPro(true)}
        config={adminConfig}
        onSubmitPaymentClaim={handleSubmitPaymentClaim}
        language={language}
      />

      {/* Master Admin Password Verification Modal */}
      {showAdminModal && renderAdminLoginModal()}

      {/* Discreet Footer (Secret owner access disguised) */}
      <footer className="border-t border-slate-900 bg-slate-950 py-5 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">दुकान ब्रांड (DukaanBrand)</span>
            <span>·</span>
            <span>भारत का 10-सेकंड WhatsApp पोस्टर मेकर</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-slate-600 text-[11px]">
              © 2026 DukaanBrand
            </span>
            {/* Secret disguised dot button for owner */}
            <button
              onClick={() => {
                if (isAdminAuthenticated) {
                  setViewMode('admin');
                } else {
                  setShowAdminModal(true);
                }
              }}
              className="text-slate-800 hover:text-slate-600 p-1 cursor-pointer select-none transition-colors"
              title="Owner Portal"
            >
              •
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
