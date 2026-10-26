import React, { useState } from 'react';
import { X, QrCode, Check, ShieldCheck, Zap, Sparkles, Key, Send, Phone, Crown, Store, Tag } from 'lucide-react';
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
  const [tab, setTab] = useState<'benefits' | 'qr' | 'passcode'>('benefits');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [submittedClaim, setSubmittedClaim] = useState(false);

  if (!isOpen) return null;

  // Real UPI deep link based on owner's live config
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(config.ownerUpiId)}&pn=${encodeURIComponent(config.ownerName)}&am=${config.monthlyPrice}&cu=INR&tn=DukaanBrand_Pro_Sub`;

  // Handle Passcode verification (with Anti-Sharing Phone Binding)
  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPasscode = passcode.trim().toUpperCase();
    const cleanPhone = phone.trim().replace(/\D/g, '');

    // Check dynamic phone-bound tokens first
    const dynamicTokens = config.dynamicTokens || [];
    const matchedDynamic = dynamicTokens.find((t) => t.token.toUpperCase() === cleanPasscode);

    if (matchedDynamic) {
      if (!cleanPhone) {
        setPasscodeError('कृपया अपना WhatsApp नंबर दर्ज करें जिसके लिए यह कोड जारी किया गया है।');
        return;
      }
      if (cleanPhone !== matchedDynamic.targetPhone && !matchedDynamic.targetPhone.endsWith(cleanPhone)) {
        setPasscodeError(`सुरक्षा त्रुटि: यह VIP कोड केवल पंजीकृत मोबाइल नंबर +91-${matchedDynamic.targetPhone} के लिए मान्य है! इसे किसी अन्य फोन पर साझा नहीं किया जा सकता।`);
        return;
      }
      onUnlockPro(cleanPhone);
      onClose();
      return;
    }

    // Check Global backup passcode
    if (cleanPasscode === config.vipPasscode.trim().toUpperCase()) {
      onUnlockPro(cleanPhone || 'DirectVIP');
      onClose();
      return;
    }

    setPasscodeError('अमान्य पासकोड! कृपया सही कोड दर्ज करें या QR कोड से ₹' + config.monthlyPrice + ' पे करें।');
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
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-5 sm:p-6 text-white shadow-2xl relative animate-fadeIn max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-3 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black mb-2">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>VIP Pro प्लान • सिर्फ ₹{config.monthlyPrice} महीना</span>
          </div>
          <h3 className="font-black text-xl text-white">
            दुकान की बिक्री बढ़ाने वाले VIP फीचर्स
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            सिर्फ वाटरमार्क हटाना नहीं — आपकी दुकान का असली पेमेंट QR व ब्रांडिंग!
          </p>
        </div>

        {/* 3 Steps Navigation */}
        <div className="grid grid-cols-3 gap-1.5 my-3 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setTab('benefits')}
            className={`py-2 px-1 rounded-xl transition-colors cursor-pointer text-center ${
              tab === 'benefits' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⭐ क्या मिलेगा?
          </button>

          <button
            type="button"
            onClick={() => setTab('qr')}
            className={`py-2 px-1 rounded-xl transition-colors cursor-pointer text-center ${
              tab === 'qr' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            📲 QR से पे करें (₹{config.monthlyPrice})
          </button>

          <button
            type="button"
            onClick={() => setTab('passcode')}
            className={`py-2 px-1 rounded-xl transition-colors cursor-pointer text-center ${
              tab === 'passcode' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔑 VIP पासकोड
          </button>
        </div>

        {/* Tab 1: Killer Pro Features (Real business value) */}
        {tab === 'benefits' && (
          <div className="space-y-3.5 py-1">
            <div className="bg-slate-950 rounded-2xl p-3 border border-amber-500/30 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold">
                  📲
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-white">
                    1. पोस्टर पर आपका असली Google Pay / PhonePe QR कोड
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    ग्राहक WhatsApp स्टेटस देखकर सीधे QR स्कैन करेंगे और आपके खाते में पैसे भेजेंगे!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                  👑
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-white">
                    2. 'Verified Dukaan' का गोल्डन भरोसा टिक
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    पोस्टर पर सरकारी व प्रोफेशनल जैसा 'प्रमाणित व 100% पक्का बिल' का सुनहरा स्टैम्प।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 font-bold">
                  📸
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-white">
                    3. दुकान की असली फोटो या मालिक की फोटो
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    गैलरी से अपनी दुकान का बोर्ड या अपनी मुस्कुराती फोटो पोस्टर के बीच में लगाएं।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold">
                  🏷️
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-white">
                    4. आज का महासेल / डिस्काउंट ऑफर बैनर
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    'आज 20% तक की भारी छूट' या 'फ्री होम डिलीवरी' का चमकदार रेड रिबन।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 font-bold">
                  ⚡
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-white">
                    5. साफ़ HD क्वालिटी + कोई वॉटरमार्क नहीं
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    पोस्टर ऐसा दिखेगा जैसे ₹500 देकर किसी ग्राफिक डिज़ाइनर से बनवाया हो!
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTab('qr')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer active:scale-95 transition-all"
            >
              <span>सिर्फ ₹{config.monthlyPrice} में अभी अनलॉक करें →</span>
            </button>
          </div>
        )}

        {/* Tab 2: Pay via UPI QR */}
        {tab === 'qr' && (
          <div className="space-y-3.5 text-center py-1">
            <div className="w-44 h-44 mx-auto bg-white p-2.5 rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-amber-400">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=2&data=${encodeURIComponent(upiDeepLink)}`}
                alt="UPI QR Code"
                className="w-36 h-36 object-contain"
              />
              <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase">
                BHARAT UPI QR • ₹{config.monthlyPrice}
              </span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400">मालिक का UPI ID: </span>
              <span className="text-amber-300 font-mono font-bold select-all">{config.ownerUpiId}</span>
            </div>

            {/* Mobile Instant UPI App Launch */}
            <a
              href={upiDeepLink}
              className="block sm:hidden w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors shadow"
            >
              📲 PhonePe / GPay / Paytm से पे करें (₹{config.monthlyPrice})
            </a>

            {/* UTR Form */}
            <form onSubmit={handleSubmitUtr} className="space-y-2.5 text-left pt-2 border-t border-slate-800">
              <h5 className="font-bold text-xs text-amber-300">
                पेमेंट के बाद तुरंत एक्टिवेट करें:
              </h5>

              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="आपका WhatsApp मोबाइल नंबर *"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />

              <input
                type="text"
                required
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                placeholder="12-अंकों का UPI Ref / UTR No. (उदा. 429182910283)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer active:scale-95 transition-all shadow-md"
              >
                ✓ पेमेंट सबमिट करें व VIP चालू करें
              </button>
            </form>

            {submittedClaim && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-fadeIn">
                ✓ आपका अनुरोध प्राप्त हो गया! VIP Pro एक्टिवेट हो रहा है...
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Enter Passcode */}
        {tab === 'passcode' && (
          <form onSubmit={handleVerifyPasscode} className="space-y-3.5 text-left py-2">
            <p className="text-xs text-slate-300">
              यदि आपने मालिक से WhatsApp पर पर्सनल VIP कोड प्राप्त किया है, तो यहाँ दर्ज करें:
            </p>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                पंजीकृत WhatsApp नंबर:
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPasscodeError('');
                }}
                placeholder="उदा. 9812345678"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                VIP पासकोड:
              </label>
              <input
                type="text"
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError('');
                }}
                placeholder="उदा. VIP-4921-9982"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono uppercase tracking-wider focus:outline-none focus:border-amber-400 font-bold"
              />
            </div>

            {passcodeError && (
              <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                {passcodeError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer active:scale-95 transition-all shadow-md"
            >
              सत्यापित करें व VIP अनलॉक करें →
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
