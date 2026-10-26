import React, { useState } from 'react';
import { Lock, Key, ArrowRight, ShieldCheck, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface SiteAccessGatekeeperProps {
  expectedKey: string;
  ownerUpi: string;
  onUnlockSite: () => void;
  onOpenOwnerLogin: () => void;
  language: Language;
}

export const SiteAccessGatekeeper: React.FC<SiteAccessGatekeeperProps> = ({
  expectedKey,
  ownerUpi,
  onUnlockSite,
  onOpenOwnerLogin,
  language,
}) => {
  const [inputKey, setInputKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputKey.trim().toUpperCase();
    const cleanExpected = expectedKey.trim().toUpperCase();

    if (cleanInput === cleanExpected) {
      setErrorMsg('');
      onUnlockSite();
    } else {
      setAttempts((prev) => prev + 1);
      setErrorMsg('अमान्य एक्सेस की (Invalid Key)! कृपया सही की दर्ज करें या ओनर से WhatsApp पर संपर्क करें।');
    }
  };

  const handleRequestKeyWhatsApp = () => {
    const text = encodeURIComponent(
      `नमस्ते! मुझे "दुकान ब्रांड" ऐप की एक्सेस की (Access Key) चाहिए। कृपया मुझे इनवाइट लिंक या की भेजें।`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 text-white relative overflow-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-orange-500/10 to-rose-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6 animate-fadeIn">
        {/* Brand Badge */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/25 border border-amber-400/30">
            <Lock className="w-8 h-8 text-slate-950 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-4">
            दुकान ब्रांड <span className="text-amber-400">DukaanBrand</span>
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>प्राइवेट एक्सक्लूसिव एक्सेस (Invite Only)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed pt-1">
            यह ऐप केवल अधिकृत दुकानदारों व इनवाइटेड सदस्यों के लिए सुरक्षित है। जारी रखने के लिए अपनी <strong>एक्सेस की (Access Key)</strong> दर्ज करें।
          </p>
        </div>

        {/* Access Form Card */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>एक्सेस की (Access Key) दर्ज करें:</span>
              </label>
              <input
                type="text"
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="उदा. BHARAT2026"
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-2xl px-4 py-3.5 text-center text-lg font-mono font-black tracking-widest text-amber-400 focus:outline-none uppercase placeholder:text-slate-600 transition-colors"
                autoFocus
                required
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center flex items-center justify-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>अनलॉक करें व ऐप में जाएं</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </form>

          {/* Request Key on WhatsApp */}
          <div className="pt-4 border-t border-slate-800 text-center space-y-3">
            <span className="text-xs text-slate-400 block">
              यदि आपके पास एक्सेस की नहीं है:
            </span>
            <button
              type="button"
              onClick={handleRequestKeyWhatsApp}
              className="w-full py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp पर ओनर से एक्सेस की मांगें</span>
            </button>
          </div>
        </div>

        {/* Secret Owner Link */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onOpenOwnerLogin}
            className="text-xs text-slate-500 hover:text-amber-400 transition-colors flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            <span>क्या आप इस ऐप के मालिक हैं? गुप्त एडमिन लॉगिन करें</span>
          </button>
        </div>
      </div>
    </div>
  );
};
