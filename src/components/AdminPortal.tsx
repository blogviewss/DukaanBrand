import React, { useState } from 'react';
import { AdminConfig, PaymentRecord } from '../types/admin';
import { Language } from '../types';
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
  Lock
} from 'lucide-react';

interface AdminPortalProps {
  config: AdminConfig;
  onSaveConfig: (updated: AdminConfig) => void;
  payments: PaymentRecord[];
  onUpdatePaymentStatus: (id: string, status: 'active' | 'expired' | 'pending') => void;
  onAddManualSubscriber: (phone: string, shopName: string) => void;
  onDeletePayment: (id: string) => void;
  onExitToCustomerView: () => void;
  language: Language;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  config,
  onSaveConfig,
  payments,
  onUpdatePaymentStatus,
  onAddManualSubscriber,
  onDeletePayment,
  onExitToCustomerView,
  language,
}) => {
  const [formData, setFormData] = useState<AdminConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [newShopName, setNewShopName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Stats
  const activeSubscribers = payments.filter((p) => p.status === 'active');
  const pendingApprovals = payments.filter((p) => p.status === 'pending');
  const totalRevenue = activeSubscribers.length * config.monthlyPrice;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddSubscriberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhone.trim()) return;
    onAddManualSubscriber(newPhone.trim(), newShopName.trim() || 'दुकानदार');
    setNewPhone('');
    setNewShopName('');
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>मालिक एडमिन पोर्टल (Owner Control Room)</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            यहाँ से आप अपने ग्राहकों के ₹10 भुगतानों को नियंत्रित कर सकते हैं और अपनी खुद की UPI ID सेट कर सकते हैं।
          </p>
        </div>

        <button
          onClick={onExitToCustomerView}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-md"
        >
          <Eye className="w-4 h-4" />
          <span>ग्राहक व्यू देखें (Customer View)</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Revenue */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
              कुल एकत्रित कमाई (Total Earned)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-500">
              {activeSubscribers.length} सक्रिय पेड ग्राहक × ₹{config.monthlyPrice}
            </span>
          </div>

          {/* Card 2: Active Subscribers */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
              सक्रिय VIP सदस्य (Active VIPs)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {activeSubscribers.length}
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">
              बिना वॉटरमार्क अनलिमिटेड डाउनलोड
            </span>
          </div>

          {/* Card 3: Pending Approvals */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
              नए ₹10 पेमेंट (Pending Approvals)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              {pendingApprovals.length}
            </div>
            <span className="text-[11px] text-slate-500">
              सत्यापन हेतु ग्राहकों द्वारा सबमिट UTR
            </span>
          </div>

          {/* Card 4: VIP Passcode */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
              मास्टर VIP पासकोड (Magic Key)
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-sky-400">
              {config.vipPasscode}
            </div>
            <span className="text-[11px] text-slate-400">
              यह कोड ग्राहक को WhatsApp पर दे सकते हैं
            </span>
          </div>
        </div>

        {/* Two Column Section: UPI Settings & VIP Passcode */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Owner's UPI & Payment Settings (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-amber-400" />
                <span>आपकी UPI ID सेटिंग्स (पैसे पाने के लिए)</span>
              </h3>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  आपकी PhonePe / Google Pay / Paytm UPI ID:
                </label>
                <input
                  type="text"
                  value={formData.ownerUpiId}
                  onChange={(e) => setFormData({ ...formData, ownerUpiId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-emerald-400 font-mono font-bold focus:outline-none focus:border-amber-400"
                  placeholder="उदा. 9876543210@paytm या yourname@okaxis"
                  required
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  ग्राहक जब ऐप में "Pay ₹10" दबाएगा, तो इसी UPI ID पर पैसे आएंगे।
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  खाताधारक / व्यापार का नाम (Payee Name):
                </label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  placeholder="उदा. DukaanBrand Pro"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    मासिक शुल्क (₹):
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyPrice}
                    onChange={(e) => setFormData({ ...formData, monthlyPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-amber-400 font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    VIP सीक्रेट पासकोड:
                  </label>
                  <input
                    type="text"
                    value={formData.vipPasscode}
                    onChange={(e) => setFormData({ ...formData, vipPasscode: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-sky-400 font-mono font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  फ्री पोस्टर पर दिखने वाला वाटरमार्क टेक्स्ट:
                </label>
                <input
                  type="text"
                  value={formData.watermarkText}
                  onChange={(e) => setFormData({ ...formData, watermarkText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-orange-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
              >
                <Save className="w-4 h-4 text-slate-950" />
                <span>सेटिंग्स सेव करें (Save All Changes)</span>
              </button>

              {savedSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold">
                  ✓ सेटिंग्स सफलतापूर्वक सेव हो गईं!
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Subscribers & Payment Ledger (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span>ग्राहक पेमेंट रिकॉर्ड व VIP स्वीकृति</span>
                </h3>
                <span className="text-[11px] text-slate-400">
                  जिन्होंने ₹10 दिए हैं, उन्हें यहाँ से एक क्लिक में VIP अप्रूव करें
                </span>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>नया VIP जोड़ें</span>
              </button>
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {payments.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  अभी तक कोई पेमेंट रिकॉर्ड नहीं आया है। जब ग्राहक ऐप में QR स्कैन करके UTR डालेगा, यहाँ दिखेगा।
                </div>
              ) : (
                payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {payment.shopName || 'दुकानदार'}
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">
                          📱 {payment.phone}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-2">
                        <span>UTR/Ref: <strong className="text-slate-200">{payment.utrNumber || 'N/A'}</strong></span>
                        <span>•</span>
                        <span>{payment.date}</span>
                        <span>•</span>
                        <span className="text-amber-400 font-bold">₹{payment.amount}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {payment.status === 'active' ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          सक्रिय (VIP Active)
                        </span>
                      ) : (
                        <button
                          onClick={() => onUpdatePaymentStatus(payment.id, 'active')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>VIP अप्रूव करें</span>
                        </button>
                      )}

                      <button
                        onClick={() => onDeletePayment(payment.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
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
        </div>
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
                  className="px-3 py-2 text-slate-400 hover:text-white"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl"
                >
                  VIP एक्टिवेट करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
