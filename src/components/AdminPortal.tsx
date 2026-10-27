import React, { useState, useEffect } from 'react';
import { AdminConfig, PaymentRecord, SecurityAuditLog, DynamicVipToken } from '../types/admin';
import { Language } from '../types';
import { AdminAnalytics } from './AdminAnalytics';
import { MiniDashboard } from './MiniDashboard';
import { ProfitPotentialCalculator } from './ProfitPotentialCalculator';
import { BroadcastExportModal } from './BroadcastExportModal';
import { 
  ShieldCheck, 
  Users, 
  DollarSign, 
  QrCode, 
  Key, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Save, 
  Eye, 
  Plus, 
  ArrowLeft,
  Smartphone,
  Trash2,
  Lock,
  BarChart3,
  Download,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  Send,
  HelpCircle,
  FileText,
  Copy,
  Check,
  TrendingUp,
  FileSpreadsheet,
  Share2
} from 'lucide-react';

interface AdminPortalProps {
  config: AdminConfig;
  onSaveConfig: (updated: AdminConfig) => void;
  payments: PaymentRecord[];
  auditLogs: SecurityAuditLog[];
  onClearAuditLogs: () => void;
  onUpdatePaymentStatus: (id: string, status: 'active' | 'expired' | 'pending') => void;
  onAddManualSubscriber: (phone: string, shopName: string) => void;
  onDeletePayment: (id: string) => void;
  onExitToCustomerView: () => void;
  onLogout: () => void;
  sessionRemainingSeconds: number;
  onResetSessionTimer: () => void;
  language: Language;
}

type AdminTab = 'mini_dashboard' | 'analytics' | 'profit_calculator' | 'upi' | 'vip_generator' | 'subscribers' | 'audit_log' | 'security';

export const AdminPortal: React.FC<AdminPortalProps> = ({
  config,
  onSaveConfig,
  payments,
  auditLogs,
  onClearAuditLogs,
  onUpdatePaymentStatus,
  onAddManualSubscriber,
  onDeletePayment,
  onExitToCustomerView,
  onLogout,
  sessionRemainingSeconds,
  onResetSessionTimer,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('mini_dashboard');
  const [formData, setFormData] = useState<AdminConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [newShopName, setNewShopName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  // New Password State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');

  // Single-Use Phone-Bound VIP Token Generator State
  const [targetPhoneInput, setTargetPhoneInput] = useState('');
  const [generatedTokenOutput, setGeneratedTokenOutput] = useState<DynamicVipToken | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  // Stats
  const activeSubscribers = payments.filter((p) => p.status === 'active');
  const pendingApprovals = payments.filter((p) => p.status === 'pending');
  const totalRevenue = activeSubscribers.length * config.monthlyPrice;

  const successfulLoginsCount = auditLogs.filter((l) => l.event === 'LOGIN_SUCCESS').length;
  const failedAttemptsCount = auditLogs.filter((l) => l.event === 'LOGIN_FAILED').length;

  const formatSeconds = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordChangeError('पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordChangeError('दोनों पासवर्ड मेल नहीं खा रहे हैं!');
      return;
    }
    const updated = { ...formData, adminPassword: newPassword };
    setFormData(updated);
    onSaveConfig(updated);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordChangeError('');
    setPasswordChangeSuccess('✓ नया मास्टर पासवर्ड सुरक्षित रूप से अपडेट हो गया!');
    setTimeout(() => setPasswordChangeSuccess(''), 3500);
  };

  const handleAddSubscriberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhone.trim()) return;
    onAddManualSubscriber(newPhone.trim(), newShopName.trim() || 'दुकानदार');
    setNewPhone('');
    setNewShopName('');
    setShowAddModal(false);
  };

  // Generate Single-Use Phone-Bound VIP Token
  const handleGeneratePhoneBoundToken = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = targetPhoneInput.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) return;

    const randomSuffix = Math.floor(Math.random() * 8999 + 1000);
    const tokenString = `VIP-${cleanPhone.slice(-4)}-${randomSuffix}`;

    const newToken: DynamicVipToken = {
      token: tokenString,
      targetPhone: cleanPhone,
      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      isUsed: false,
      expiresInDays: 30,
    };

    const existingTokens = config.dynamicTokens || [];
    const updatedTokens = [newToken, ...existingTokens];
    const updatedConfig = { ...formData, dynamicTokens: updatedTokens };

    setFormData(updatedConfig);
    onSaveConfig(updatedConfig);
    setGeneratedTokenOutput(newToken);
  };

  // Share generated token to customer via WhatsApp
  const handleShareTokenWhatsApp = (tokenObj: DynamicVipToken) => {
    const message = encodeURIComponent(
      `नमस्ते! आपका ₹10 का भुगतान सफलतापूर्वक प्राप्त हो गया है 🙏\n\nआपका व्यक्तिगत 1-महीने का VIP पासकोड है:\n🔑 *${tokenObj.token}*\n\n⚠️ *सुरक्षा सूचना:* यह कोड केवल आपके पंजीकृत मोबाइल नंबर *+91-${tokenObj.targetPhone}* पर काम करेगा। इसे ऐप के Pro अनलॉक में डालें और वॉटरमार्क हमेशा के लिए हटाएं!\n— *DukaanBrand Pro*`
    );
    window.open(`https://api.whatsapp.com/send?phone=91${tokenObj.targetPhone}&text=${message}`, '_blank');
  };

  // Export Data as JSON
  const handleExportData = () => {
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      config: {
        ownerUpiId: config.ownerUpiId,
        ownerName: config.ownerName,
        monthlyPrice: config.monthlyPrice,
        siteAccessKey: config.siteAccessKey,
        isSiteLocked: config.isSiteLocked,
      },
      subscribersCount: payments.length,
      subscribers: payments,
      auditLogsCount: auditLogs.length,
      auditLogs: auditLogs,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dukaan_brand_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>मालिक सुरक्षित एडमिन पोर्टल (Owner Control Room)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% Encrypted & Private
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                सुरक्षित ओनर डैशबोर्ड • सामान्य ग्राहकों से 100% गुप्त
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls & Auto-Logout Timer */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Live Inactivity Auto-Logout Timer */}
          <div 
            onClick={onResetSessionTimer}
            title="10 मिनट निष्क्रियता पर ऑटो-लॉगआउट। टाइमर रीसेट करने के लिए क्लिक करें।"
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-mono cursor-pointer hover:border-slate-700 transition-colors"
          >
            <Clock className={`w-3.5 h-3.5 ${sessionRemainingSeconds < 120 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
            <span className="text-slate-400 text-[11px]">ऑटो-लॉगआउट:</span>
            <span className={`font-bold ${sessionRemainingSeconds < 120 ? 'text-rose-400' : 'text-white'}`}>
              {formatSeconds(sessionRemainingSeconds)}
            </span>
          </div>

          <button
            onClick={handleExportData}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-800"
            title="Download Customer & Audit Database"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>बैकअप (JSON)</span>
          </button>

          <button
            onClick={onExitToCustomerView}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>ग्राहक व्यू (Customer View)</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
            title="लॉगआउट"
          >
            <span>लॉगआउट</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
          <button
            onClick={() => setActiveTab('mini_dashboard')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'mini_dashboard'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4 text-slate-950" />
            <span>1. मिनी डैशबोर्ड (Shares & Templates)</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>2. विस्तृत एनालिटिक्स (Visitors)</span>
          </button>

          <button
            onClick={() => setActiveTab('profit_calculator')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'profit_calculator'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>3. प्रॉफिट कैलकुलेटर (Profit Tool)</span>
          </button>

          <button
            onClick={() => setActiveTab('upi')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'upi'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>4. UPI सेटिंग्स (Owner UPI)</span>
          </button>

          <button
            onClick={() => setActiveTab('vip_generator')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'vip_generator'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 font-black'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>5. सिंगल-यूज़ VIP कोड (Anti-Share)</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'subscribers'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>6. ग्राहक लेजर ({payments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('audit_log')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'audit_log'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-black'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>7. सुरक्षा ऑडिट लॉग ({auditLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'security'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-black'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>8. पासवर्ड व साइट लॉक (Lock & Key)</span>
          </button>
        </div>

        {/* TAB 0: MINI DASHBOARD (Visualizing daily share counts and popular templates via Recharts) */}
        {activeTab === 'mini_dashboard' && (
          <MiniDashboard language={language} />
        )}

        {/* TAB 1: ANALYTICS (Recharts Interactive Visualizations) */}
        {activeTab === 'analytics' && (
          <AdminAnalytics />
        )}

        {/* TAB: PROFIT POTENTIAL CALCULATOR */}
        {activeTab === 'profit_calculator' && (
          <ProfitPotentialCalculator
            currentMonthlyPrice={config.monthlyPrice}
            currentActiveSubscribers={activeSubscribers.length}
          />
        )}

        {/* TAB 2: OWNER UPI SETTINGS */}
        {activeTab === 'upi' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-w-3xl shadow-xl animate-fadeIn">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-amber-400" />
                <span>आपकी PhonePe / Google Pay UPI ID (पैसे सीधे आपके बैंक में)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                यहाँ जो UPI ID डालेंगे, ग्राहक जब ऐप में ₹10 पे करेगा तो वही QR कोड और लिंक उसके फोन पर खुलेगा।
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  आपकी व्यक्तिगत UPI ID (PhonePe / GPay / Paytm):
                </label>
                <input
                  type="text"
                  value={formData.ownerUpiId}
                  onChange={(e) => setFormData({ ...formData, ownerUpiId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-base text-emerald-400 font-mono font-bold focus:outline-none focus:border-amber-400"
                  placeholder="उदा. 9876543210@paytm या yourname@okaxis"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  खाताधारक / व्यापार का नाम (Payee Name):
                </label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  placeholder="उदा. Jitender Jagga / DukaanBrand"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    मासिक प्रो शुल्क (₹ Price):
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyPrice}
                    onChange={(e) => setFormData({ ...formData, monthlyPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-amber-400 font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    ग्लोबल VIP पासकोड (बैकअप):
                  </label>
                  <input
                    type="text"
                    value={formData.vipPasscode}
                    onChange={(e) => setFormData({ ...formData, vipPasscode: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-sky-400 font-mono font-bold focus:outline-none focus:border-amber-400 uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  फ्री पोस्टर पर दिखने वाला वायरल वॉटरमार्क टेक्स्ट:
                </label>
                <input
                  type="text"
                  value={formData.watermarkText}
                  onChange={(e) => setFormData({ ...formData, watermarkText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-orange-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
              >
                <Save className="w-4 h-4 text-slate-950" />
                <span>UPI सेटिंग्स सेव करें (Save Settings)</span>
              </button>

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold">
                  ✓ सेटिंग्स सफलतापूर्वक सेव हो गईं!
                </div>
              )}
            </form>
          </div>
        )}

        {/* TAB 3: SINGLE-USE PHONE-BOUND VIP GENERATOR (Anti-Code Sharing Solution!) */}
        {activeTab === 'vip_generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left Generator Box (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl">
              <div className="pb-3 border-b border-slate-800">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>कोड शेयरिंग रोकथाम सिस्टम (Anti-Sharing)</span>
                </div>
                <h3 className="text-base font-black text-white">
                  सिंगल-यूज़ फोन-बाउंड VIP कोड जनरेटर
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  आपके सवाल का हल: <em>"अगर कोई VIP कोड दूसरे को दे देगा तो क्या होगा?"</em> — यह कोड केवल ग्राहक के उसी एक मोबाइल नंबर पर काम करेगा! कोई दूसरा व्यक्ति इसे इस्तेमाल नहीं कर सकता।
                </p>
              </div>

              <form onSubmit={handleGeneratePhoneBoundToken} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    ग्राहक का WhatsApp मोबाइल नंबर (जिसने ₹10 पे किए हैं):
                  </label>
                  <input
                    type="tel"
                    value={targetPhoneInput}
                    onChange={(e) => setTargetPhoneInput(e.target.value)}
                    placeholder="उदा. 9812345678"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono font-bold focus:outline-none focus:border-sky-400"
                    required
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    सिस्टम इस नंबर को लॉक कर देगा ताकि कोड किसी अन्य फोन पर न चले।
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>फोन-बाउंड VIP पासकोड जनरेट करें</span>
                </button>
              </form>

              {/* Generated Token Result Card */}
              {generatedTokenOutput && (
                <div className="bg-slate-950 border-2 border-sky-500/50 rounded-2xl p-4 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">नंबर: <strong className="text-white font-mono">+91-{generatedTokenOutput.targetPhone}</strong></span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active 30 Days</span>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-lg font-mono font-black text-sky-400 tracking-wider">
                      {generatedTokenOutput.token}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedTokenOutput.token);
                        setCopiedToken(true);
                        setTimeout(() => setCopiedToken(false), 2500);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1"
                    >
                      {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedToken ? 'कॉपी' : 'कॉपी'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleShareTokenWhatsApp(generatedTokenOutput)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>WhatsApp पर ग्राहक को यह कोड भेजें</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Explanation Card: How Payment Detection Works in Real World (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl">
              <div className="pb-3 border-b border-slate-800">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  <span>सिस्टम को पेमेंट का कैसे पता चलता है? (Payment Architecture)</span>
                </h3>
              </div>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <strong className="text-amber-400 text-sm block">
                    1. तरीका 1: 12-अंकों का UPI UTR (Zero Cost - अभी चालू है)
                  </strong>
                  <p>
                    जब ग्राहक आपके PhonePe / GPay पर ₹10 भेजता है, तो बैंक की रसीद में 12-अंकों का <strong>UTR / Ref No.</strong> (जैसे: <code>428901234567</code>) मिलता है। आपके फोन में तुरंत बैंक या PhonePe का ₹10 का SMS/नोटिफिकेशन आता है।
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    ग्राहक जब ऐप में वही 12-अंकों का UTR डालता है, तो आपके एडमिन पोर्टल के <strong>"ग्राहक लेजर"</strong> में उसकी एंट्री दिख जाती है। आप UTR मिलाकर 1 सेकंड में VIP अप्रूव कर देते हैं।
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <strong className="text-emerald-400 text-sm block">
                    2. तरीका 2: ऑटोमैटिक वेबहुक (Automated Payment Gateway)
                  </strong>
                  <p>
                    जब आपका बिज़नेस बढ़ जाए, तब आप <strong>Cashfree या PhonePe Payment Gateway</strong> जोड़ सकते हैं। उसमें जैसे ही ग्राहक ₹10 देता है, पेमेंट गेटवे का सर्वर वेबहुक ऐप को 0.1 सेकंड में सिग्नल भेजकर ऑटोमैटिक VIP अनलॉक कर देता है बिना किसी मानवीय हस्तक्षेप के!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUBSCRIBERS LEDGER */}
        {activeTab === 'subscribers' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span>ग्राहक पेमेंट रिकॉर्ड व VIP स्वीकृति लेजर</span>
                </h3>
                <span className="text-xs text-slate-400">
                  कुल {payments.length} ग्राहक रिकॉर्ड्स • {activeSubscribers.length} सक्रिय VIP मेंबर्स
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                  title="CSV Export & WhatsApp Broadcast"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>📢 CSV व WhatsApp ब्रॉडकास्ट ({payments.length})</span>
                </button>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया VIP मेंबर जोड़ें</span>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {payments.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-xs">
                  अभी तक कोई पेमेंट रिकॉर्ड नहीं आया है। जब ग्राहक QR स्कैन करके UTR डालेगा, यहाँ दिखाई देगा।
                </div>
              ) : (
                payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-extrabold text-white text-sm">
                          {payment.shopName || 'दुकानदार'}
                        </span>
                        <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          📱 {payment.phone}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-2 flex-wrap">
                        <span>UTR/Ref: <strong className="text-slate-200 font-mono">{payment.utrNumber || 'N/A'}</strong></span>
                        <span>•</span>
                        <span>{payment.date}</span>
                        <span>•</span>
                        <span className="text-amber-400 font-bold">₹{payment.amount}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {payment.status === 'active' ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center gap-1 border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>VIP सक्रिय</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => onUpdatePaymentStatus(payment.id, 'active')}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>VIP अप्रूव करें</span>
                        </button>
                      )}

                      <button
                        onClick={() => onDeletePayment(payment.id)}
                        className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-900 border border-transparent hover:border-rose-500/30 transition-colors cursor-pointer"
                        title="हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: SECURITY AUDIT LOG (Tracks IP, Timestamps & Unauthorized Attempts) */}
        {activeTab === 'audit_log' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-emerald-400" />
                  <span>सुरक्षा ऑडिट लॉग (Security Access Log)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  एडमिन में प्रवेश के सभी प्रयासों, मास्क किए गए IP पतों, टाइमस्टैम्प्स और असफल लॉगिन का रिकॉर्ड
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-emerald-400 font-bold">
                  ✓ {successfulLoginsCount} सफल लॉगिन
                </span>
                <span className="text-xs text-rose-400 font-bold">
                  ⚠️ {failedAttemptsCount} असफल प्रयास
                </span>
                <button
                  onClick={onClearAuditLogs}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs border border-slate-700 transition-colors cursor-pointer"
                >
                  लॉग साफ़ करें
                </button>
              </div>
            </div>

            {/* Logs Table / List */}
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {auditLogs.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-xs">
                  कोई सुरक्षा लॉग उपलब्ध नहीं है।
                </div>
              ) : (
                auditLogs.map((log) => {
                  let badgeBg = 'bg-slate-800 text-slate-300';
                  if (log.severity === 'success') badgeBg = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
                  if (log.severity === 'danger') badgeBg = 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
                  if (log.severity === 'warning') badgeBg = 'bg-amber-500/20 text-amber-300 border border-amber-500/30';

                  return (
                    <div
                      key={log.id}
                      className="bg-slate-950 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${badgeBg}`}>
                            {log.event}
                          </span>
                          <span className="font-semibold text-white">{log.details}</span>
                        </div>
                        <div className="text-slate-400 text-[11px] flex items-center gap-2">
                          <span>डिवाइस: <strong className="text-slate-300">{log.deviceInfo}</strong></span>
                          <span>•</span>
                          <span>मास्क IP: <strong className="text-sky-400 font-mono">{log.maskedIp}</strong></span>
                        </div>
                      </div>

                      <div className="text-right text-slate-400 text-[11px] font-mono shrink-0">
                        {log.timestamp}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 6: SECURITY SHIELD & SITEWIDE PASSWORD PROTECTION */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Sitewide Access Key Protection (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl">
              <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Key className="w-5 h-5 text-amber-400" />
                    <span>साइट-वाइड पासवर्ड सुरक्षा (Access Key)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    पूरी वेबसाइट को पासवर्ड से लॉक करें ताकि सिर्फ इनवाइटेड लोग ही ऐप खोल सकें
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                {/* Toggle Switch */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <strong className="text-white block text-sm">
                      {formData.isSiteLocked ? '🔒 साइट-वाइड लॉक चालू है (Site is Locked)' : '🌐 साइट खुली है (Public Access)'}
                    </strong>
                    <span className="text-slate-400 text-[11px]">
                      {formData.isSiteLocked 
                        ? 'कोई भी नया यूजर तब तक ऐप नहीं चला सकता जब तक एक्सेस की न डाले।' 
                        : 'कोई भी यूजर सीधे ऐप में आकर फ्री पोस्टर बना सकता है।'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...formData, isSiteLocked: !formData.isSiteLocked };
                      setFormData(updated);
                      onSaveConfig(updated);
                    }}
                    className={`p-2 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                      formData.isSiteLocked
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <span>{formData.isSiteLocked ? 'ON (सुरक्षित)' : 'OFF (पब्लिक)'}</span>
                  </button>
                </div>

                {/* Set Custom Access Key */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    साइट एक्सेस की (Site Access Key):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.siteAccessKey}
                      onChange={(e) => setFormData({ ...formData, siteAccessKey: e.target.value.toUpperCase() })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-base font-mono font-black tracking-widest text-amber-400 focus:outline-none focus:border-amber-400 uppercase"
                      placeholder="उदा. BHARAT2026"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onSaveConfig(formData);
                        setSavedSuccess(true);
                        setTimeout(() => setSavedSuccess(false), 3000);
                      }}
                      className="px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shrink-0 cursor-pointer"
                    >
                      अपडेट
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    आप जिस ग्राहक को यह की देंगे, सिर्फ वही ऐप के अंदर जा सकेगा।
                  </span>
                </div>
              </div>
            </div>

            {/* Owner Master Password & Anti-Hack Shield (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl">
              <div className="pb-3 border-b border-slate-800">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>मालिक मास्टर पासवर्ड बदलें (Owner Credentials)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  एडमिन में प्रवेश करने के लिए अपना सुरक्षित मास्टर पासवर्ड सेट करें
                </p>
              </div>

              <form onSubmit={handlePasswordUpdate} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    नया मास्टर पासवर्ड (New Password):
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="नया पासवर्ड दर्ज करें (कम से कम 6 अक्षर)"
                    autoComplete="new-password"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    पासवर्ड दोबारा दर्ज करें (Confirm Password):
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="पुष्टि हेतु दोबारा टाइप करें"
                    autoComplete="new-password"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                {passwordChangeError && (
                  <span className="text-rose-400 text-xs font-bold block">
                    {passwordChangeError}
                  </span>
                )}

                {passwordChangeSuccess && (
                  <span className="text-emerald-400 text-xs font-bold block">
                    {passwordChangeSuccess}
                  </span>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>मास्टर पासवर्ड अपडेट करें</span>
                </button>
              </form>

              {/* Secret Recovery Code */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-wider">
                  आपातकालीन रिकवरी की (Emergency Recovery Key):
                </span>
                <span className="font-mono text-xs font-bold text-sky-400 select-all block">
                  {config.securityRecoveryKey || 'DK-9921-XQ47-Z810'}
                </span>
                <p className="text-[10px] text-slate-500">
                  यदि आप अपना पासवर्ड भूल जाएं, तो इस कोड को सुरक्षित अपनी डायरी में लिख लें।
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Manual Add VIP Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-white shadow-2xl relative">
            <h4 className="font-bold text-base mb-4 text-amber-400">
              नया ग्राहक मैन्युअल रूप से VIP करें
            </h4>
            <form onSubmit={handleAddSubscriberSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">ग्राहक का WhatsApp नंबर:</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">दुकान का नाम:</label>
                <input
                  type="text"
                  value={newShopName}
                  onChange={(e) => setNewShopName(e.target.value)}
                  placeholder="श्री गणेश स्टोर"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl cursor-pointer"
                >
                  VIP एक्टिवेट करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Broadcast & CSV Export Modal */}
      <BroadcastExportModal
        isOpen={showBroadcastModal}
        onClose={() => setShowBroadcastModal(false)}
        subscribers={payments}
      />
    </div>
  );
};
