import React, { useState } from 'react';
import { X, QrCode, Check, ShieldCheck, Zap, Sparkles, Key, Send, Phone } from 'lucide-react';
import { Language } from '../types';
import { AdminConfig } from '../types/admin';

interface ProCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockPro: (customerPhone: string) => void;
  config: AdminConfig;
  onSubmitPaymentClaim: (phone: string, utr: string, shopName: string) => void;
  language: Language;
}

export const ProCheckoutModal: React.FC<ProCheckoutModalProps> = ({
  isOpen,
  onClose,
  onUnlockPro,
  config,
  onSubmitPaymentClaim,
  language,
}) => {
  const [tab, setTab] = useState<'qr' | 'passcode'>('qr');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [submittedClaim, setSubmittedClaim] = useState(false);

  if (!isOpen) return null;

  // Real UPI deep link based on owner's live config
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(config.ownerUpiId)}&pn=${encodeURIComponent(config.ownerName)}&am=${config.monthlyPrice}&cu=INR&tn=DukaanBrand_Pro_Sub`;

  // Handle Passcode verification (Magic Key)
  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toUpperCase() === config.vipPasscode.trim().toUpperCase()) {
      onUnlockPro(phone || 'DirectVIP');
      onClose();
    } else {
      setPasscodeError('गलत पासकोड! कृपया सही कोड डालें या QR कोड से ₹10 पे करें।');
    }
  };

  // Handle UTR submission
  const handleSubmitUtr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    onSubmitPaymentClaim(phone.trim(), utrNumber.trim() || 'UPI-REF-' + Math.floor(Math.random() * 89999 + 10000), shopName.trim());
    setSubmittedClaim(true);
    // Automatically unlock VIP for customer
    setTimeout(() => {
      onUnlockPro(phone.trim());
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative animate-fadeIn max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-2 font-black text-xl shadow-lg shadow-orange-500/10">
            ₹{config.monthlyPrice}
          </div>
          <h3 className="font-extrabold text-xl text-white">
            {language === 'hinglish' ? 'VIP Pro अपग्रेड करें' : 'Upgrade to VIP Pro'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'hinglish' 
              ? `चाय से भी सस्ती ₹${config.monthlyPrice} कीमत • वॉटरमार्क हमेशा के लिए गायब` 
              : `Just ₹${config.monthlyPrice}/month • Permanent Watermark Removal`}
          </p>
        </div>

        {/* Tab switchers: QR Code vs Secret Passcode */}
        <div className="grid grid-cols-2 gap-2 my-4 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setTab('qr')}
            className={`py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              tab === 'qr' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>1. UPI QR से पे करें (₹{config.monthlyPrice})</span>
          </button>

          <button
            type="button"
            onClick={() => setTab('passcode')}
            className={`py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              tab === 'passcode' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>2. VIP पासकोड डालें</span>
          </button>
        </div>

        {tab === 'qr' ? (
          <div className="space-y-4 text-center">
            {/* Owner UPI QR Code */}
            <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-amber-400">
              <QrCode className="w-36 h-36 text-slate-900" />
              <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase mt-1">
                Scan with GPay / PhonePe / Paytm
              </span>
            </div>

            <div className="text-xs text-slate-300">
              <span>UPI ID: </span>
              <strong className="text-emerald-400 font-mono select-all font-bold">
                {config.ownerUpiId}
              </strong>
            </div>

            {/* Direct UPI Link for mobile */}
            <a
              href={upiDeepLink}
              className="block w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold text-xs border border-sky-500/30 transition-colors"
            >
              📱 सीधे PhonePe / GPay ऐप में खोलें (₹{config.monthlyPrice})
            </a>

            {/* Submission Form */}
            {submittedClaim ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 text-xs space-y-1.5 animate-fadeIn">
                <Check className="w-6 h-6 text-emerald-400 mx-auto" />
                <strong className="block text-sm">भुगतान विवरण प्राप्त हुआ!</strong>
                <p className="text-[11px] text-slate-300">
                  आपका VIP Pro 1 महीने के लिए एक्टिवेट हो गया है! सभी पोस्टरों से वाटरमार्क हटा दिया गया है।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitUtr} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left space-y-2.5 text-xs">
                <span className="font-bold text-amber-400 block mb-1">
                  पेमेंट के बाद अपना विवरण भरें:
                </span>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">
                    आपका WhatsApp मोबाइल नंबर:
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="उदा. 9876543210"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">
                    UPI 12-अंकों का UTR / Ref नंबर (GPay/PhonePe रसीद से):
                  </label>
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="उदा. 428901234567"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                >
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>पेमेंट सबमिट करें व Pro अनलॉक करें</span>
                </button>
              </form>
            )}
          </div>
        ) : (
          /* VIP Passcode Tab */
          <form onSubmit={handleVerifyPasscode} className="space-y-4 py-3 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <span className="font-bold text-white block">
                मालिक द्वारा दिया गया VIP पासकोड दर्ज करें:
              </span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                यदि आपने मालिक को सीधे नकद या WhatsApp पर ₹{config.monthlyPrice} भेजे हैं, तो उन्होंने आपको एक गुप्त 4-6 अंकों का पासकोड दिया होगा।
              </p>

              <input
                type="text"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError('');
                }}
                placeholder="उदा. VIP786"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-3 text-center text-lg font-mono font-bold tracking-widest text-sky-400 focus:border-sky-400 focus:outline-none uppercase"
                required
              />

              {passcodeError && (
                <span className="text-rose-400 text-[11px] block text-center font-semibold">
                  {passcodeError}
                </span>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
              >
                पासकोड सत्यापित करें (Activate VIP)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
