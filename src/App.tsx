import React, { useState, useEffect } from 'react';
import { ShopProfile, CanvasFormat, CategoryFilter } from './types/dukaan';
import { TEMPLATES_DATA, Template } from './data/templates';
import { Language } from './types';
import { AdminConfig, PaymentRecord } from './types/admin';
import { DukaanHeader } from './components/DukaanHeader';
import { ShopProfileForm } from './components/ShopProfileForm';
import { TemplateSelector } from './components/TemplateSelector';
import { CanvasRenderer } from './components/CanvasRenderer';
import { ProCheckoutModal } from './components/ProCheckoutModal';
import { BusinessPlaybookModal } from './components/BusinessPlaybookModal';
import { HostingGuideModal } from './components/HostingGuideModal';
import { RevenueCalculator } from './components/RevenueCalculator';
import { AdminPortal } from './components/AdminPortal';
import { Sparkles, Calculator, ShieldCheck, Key, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('hinglish');
  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer');
  const [isPro, setIsPro] = useState<boolean>(false);
  const [format, setFormat] = useState<CanvasFormat>('story');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES_DATA[0]);

  // Admin Config with LocalStorage Persistence
  const [adminConfig, setAdminConfig] = useState<AdminConfig>(() => {
    const saved = localStorage.getItem('dukaan_admin_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      ownerUpiId: 'jitenderjagga3@okaxis',
      ownerName: 'DukaanBrand Pro',
      monthlyPrice: 10,
      vipPasscode: 'VIP786',
      adminPin: '1234',
      watermarkText: '⚡ अपनी दुकान का फ्री स्टेटस बनाएं: DukaanBrand.in',
      freeDailyLimit: 3,
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

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [showPinModal, setShowPinModal] = useState<boolean>(false);

  // Modals state
  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);
  const [isPlaybookOpen, setIsPlaybookOpen] = useState<boolean>(false);
  const [isHostingGuideOpen, setIsHostingGuideOpen] = useState<boolean>(false);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);

  // Customer Shop Profile State
  const [profile, setProfile] = useState<ShopProfile>({
    shopName: 'श्री बालाजी किराना व सुपर स्टोर',
    ownerName: 'रमेश कुमार जी',
    phone: '98765-43210',
    city: 'मेन बाजार, चौक मार्केट, दिल्ली',
    tagline: 'शुद्धता और भरोसे का 25 वर्षों का सफर',
    logoUrl: null,
  });

  // Save config changes
  const handleSaveConfig = (updated: AdminConfig) => {
    setAdminConfig(updated);
    localStorage.setItem('dukaan_admin_config', JSON.stringify(updated));
  };

  // Payment Record Status Handler
  const handleUpdatePaymentStatus = (id: string, status: 'active' | 'expired' | 'pending') => {
    const updated = paymentRecords.map((p) => (p.id === id ? { ...p, status } : p));
    setPaymentRecords(updated);
    localStorage.setItem('dukaan_payment_records', JSON.stringify(updated));
  };

  // Add Manual Subscriber
  const handleAddManualSubscriber = (phone: string, shopName: string) => {
    const newRecord: PaymentRecord = {
      id: 'pay-' + Date.now(),
      phone,
      shopName,
      utrNumber: 'MANUAL-ADMIN-' + Math.floor(Math.random() * 8999 + 1000),
      amount: adminConfig.monthlyPrice,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      status: 'active',
    };
    const updated = [newRecord, ...paymentRecords];
    setPaymentRecords(updated);
    localStorage.setItem('dukaan_payment_records', JSON.stringify(updated));
  };

  // Delete Payment
  const handleDeletePayment = (id: string) => {
    const updated = paymentRecords.filter((p) => p.id !== id);
    setPaymentRecords(updated);
    localStorage.setItem('dukaan_payment_records', JSON.stringify(updated));
  };

  // Customer Submits Payment Claim (from Checkout Modal)
  const handleSubmitPaymentClaim = (phone: string, utr: string, shopName: string) => {
    const newRecord: PaymentRecord = {
      id: 'pay-' + Date.now(),
      phone,
      shopName: shopName || profile.shopName,
      utrNumber: utr,
      amount: adminConfig.monthlyPrice,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      status: 'active',
    };
    const updated = [newRecord, ...paymentRecords];
    setPaymentRecords(updated);
    localStorage.setItem('dukaan_payment_records', JSON.stringify(updated));
  };

  // Handle Admin Access verification
  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPinInput.trim() === adminConfig.adminPin.trim()) {
      setIsAdminAuthenticated(true);
      setShowPinModal(false);
      setViewMode('admin');
      setPinError('');
      setAdminPinInput('');
    } else {
      setPinError('गलत एडमिन पिन! (डिफ़ॉल्ट पिन: 1234)');
    }
  };

  // Check URL hash for direct admin access
  useEffect(() => {
    if (window.location.hash === '#admin') {
      setShowPinModal(true);
    }
  }, []);

  // If in Admin Mode, Render Admin Dashboard
  if (viewMode === 'admin' && isAdminAuthenticated) {
    return (
      <AdminPortal
        config={adminConfig}
        onSaveConfig={handleSaveConfig}
        payments={paymentRecords}
        onUpdatePaymentStatus={handleUpdatePaymentStatus}
        onAddManualSubscriber={handleAddManualSubscriber}
        onDeletePayment={handleDeletePayment}
        onExitToCustomerView={() => setViewMode('customer')}
        language={language}
      />
    );
  }

  // Otherwise, Render Customer View (What general public sees)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <DukaanHeader
        language={language}
        onLanguageChange={setLanguage}
        isPro={isPro}
        onOpenProModal={() => setIsProModalOpen(true)}
        onOpenPlaybook={() => setIsPlaybookOpen(true)}
        onOpenHostingGuide={() => setIsHostingGuideOpen(true)}
        onOpenAdmin={() => {
          if (isAdminAuthenticated) {
            setViewMode('admin');
          } else {
            setShowPinModal(true);
          }
        }}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 w-full">
        {/* Top Announcement / Value Strip */}
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-amber-300">
                {language === 'hinglish' ? 'ग्राहक पोर्टल (Customer View):' : 'Customer View:'}
              </span>
              <span className="text-slate-300 ml-1">
                {language === 'hinglish'
                  ? 'दुकानदार का नाम, फोटो व मोबाइल नंबर वाला रोज़ाना WhatsApp स्टेटस पोस्टर 10 सेकंड में!'
                  : 'Daily custom WhatsApp status posters with shop name & phone in 10s!'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaybookOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/30 transition-colors cursor-pointer"
            >
              {language === 'hinglish' ? '💡 यह बिज़नेस कैसे काम करता है?' : '💡 Business Blueprint'}
            </button>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>{showCalculator ? 'कैलकुलेटर छिपाएं' : 'कमाई कैलकुलेटर'}</span>
            </button>
          </div>
        </div>

        {/* Conditional Revenue Calculator */}
        {showCalculator && (
          <div className="animate-fadeIn">
            <RevenueCalculator language={language} />
          </div>
        )}

        {/* Main Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Inputs & Template Selection - 6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step 1: Shop Profile */}
            <section className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="font-extrabold text-base text-white">
                  {language === 'hinglish' ? 'दुकान की जानकारी भरें' : 'Enter Shop Details'}
                </h3>
              </div>
              <ShopProfileForm
                profile={profile}
                onChange={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
                format={format}
                onFormatChange={setFormat}
                language={language}
              />
            </section>

            {/* Step 2: Choose Template */}
            <section className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="font-extrabold text-base text-white">
                  {language === 'hinglish' ? 'पोस्टर व सुविचार डिज़ाइन चुनें' : 'Select Poster Theme'}
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
          </div>

          {/* Right Column (Canvas Preview & Export - 6 cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="font-extrabold text-base text-white">
                  {language === 'hinglish' ? 'लाइव पोस्टर प्रिव्यू व डाउनलोड' : 'Live Preview & Instant Download'}
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ✓ 100% Client-Side Canvas
              </span>
            </div>

            <CanvasRenderer
              profile={profile}
              template={selectedTemplate}
              format={format}
              isPro={isPro}
              watermarkText={adminConfig.watermarkText}
              language={language}
              onOpenProModal={() => setIsProModalOpen(true)}
            />

            {/* Why This Works (Educational Note) */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 space-y-2">
              <strong className="text-amber-400 block font-bold">
                🚀 {language === 'hinglish' ? 'फ्री बनाम ₹10 VIP Pro नियम:' : 'Free vs VIP Pro Rules:'}
              </strong>
              <p className="leading-relaxed text-[11px]">
                {language === 'hinglish'
                  ? 'फ्री यूज़र्स के पोस्टर पर नीचे आपकी वेबसाइट का वॉटरमार्क रहेगा। जब वे ₹10 UPI से पे करेंगे या VIP पासकोड डालेंगे, तभी वॉटरमार्क गायब होगा। इससे कोई भी फ्री में आपकी प्रो सर्विस नहीं ले सकता!'
                  : 'Free posters always carry your viral branding watermark. Watermark removal and VIP HD frames require paying ₹10 via UPI or entering the owner VIP passcode.'}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Pro Checkout Modal with Real Dynamic Owner UPI and UTR entry */}
      <ProCheckoutModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        onUnlockPro={(phone) => setIsPro(true)}
        config={adminConfig}
        onSubmitPaymentClaim={handleSubmitPaymentClaim}
        language={language}
      />

      {/* Business Blueprint Playbook Modal */}
      <BusinessPlaybookModal
        isOpen={isPlaybookOpen}
        onClose={() => setIsPlaybookOpen(false)}
        language={language}
      />

      {/* Hosting & Live URL Guide Modal */}
      <HostingGuideModal
        isOpen={isHostingGuideOpen}
        onClose={() => setIsHostingGuideOpen(false)}
        language={language}
      />

      {/* Owner PIN Verification Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-white shadow-2xl relative text-center">
            <button
              onClick={() => {
                setShowPinModal(false);
                setPinError('');
                setAdminPinInput('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>

            <h4 className="font-extrabold text-lg text-white mb-1">
              मालिक एडमिन लॉगिन (Owner Login)
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              यह केवल आपके लिए है। अपना 4-अंकों का गुप्त एडमिन पिन दर्ज करें (डिफ़ॉल्ट पिन: <strong>1234</strong>)
            </p>

            <form onSubmit={handleAdminAuthSubmit} className="space-y-3">
              <input
                type="password"
                maxLength={6}
                value={adminPinInput}
                onChange={(e) => {
                  setAdminPinInput(e.target.value);
                  setPinError('');
                }}
                placeholder="पिन दर्ज करें (1234)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-center text-xl font-mono tracking-widest text-white focus:outline-none focus:border-rose-400"
                autoFocus
              />

              {pinError && (
                <span className="text-rose-400 text-xs font-bold block">
                  {pinError}
                </span>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-extrabold text-sm cursor-pointer shadow-lg active:scale-95 transition-all"
              >
                एडमिन पोर्टल में प्रवेश करें →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">दुकान ब्रांड (DukaanBrand)</span>
            <span>·</span>
            <span>Customer Portal</span>
          </div>
          
          <button
            onClick={() => {
              if (isAdminAuthenticated) {
                setViewMode('admin');
              } else {
                setShowPinModal(true);
              }
            }}
            className="text-slate-500 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>मालिक पोर्टल (Admin Login - PIN: 1234)</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
