import React, { useState, useEffect } from 'react';
import { 
  Gift, 
  Share2, 
  Trophy, 
  Sparkles, 
  CheckCircle, 
  Crown, 
  Copy, 
  Check, 
  Flame, 
  ArrowRight,
  Send,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { Language } from '../types';

interface ViralRewardSystemProps {
  shareCount: number;
  onShareIncrement: () => void;
  onUnlockProFree: () => void;
  isPro: boolean;
  language?: Language;
  shopName?: string;
  phone?: string;
}

export const ViralRewardSystem: React.FC<ViralRewardSystemProps> = ({
  shareCount,
  onShareIncrement,
  onUnlockProFree,
  isPro,
  language = 'hinglish',
  shopName,
  phone,
}) => {
  const [isScratched, setIsScratched] = useState<boolean>(() => {
    return localStorage.getItem('dukaan_voucher_scratched') === 'true';
  });
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [scratchProgress, setScratchProgress] = useState<number>(() => {
    return localStorage.getItem('dukaan_voucher_scratched') === 'true' ? 100 : 0;
  });

  const isEn = language === 'english';
  const isHi = language === 'hindi';

  const TARGET_PRO = 10;
  const TARGET_VOUCHER = 25;

  const proUnlocked = shareCount >= TARGET_PRO;
  const voucherUnlocked = shareCount >= TARGET_VOUCHER;

  // Auto-unlock Pro when 10 shares are reached
  useEffect(() => {
    if (proUnlocked && !isPro) {
      onUnlockProFree();
    }
  }, [proUnlocked, isPro, onUnlockProFree]);

  const handleShareToWhatsApp = () => {
    onShareIncrement();

    const text = encodeURIComponent(
      `🛍️ *${shopName || 'हमारी दुकान'}* का नया WhatsApp स्टेटस पोस्टर तैयार है!\n\n` +
      `🔥 आप भी अपनी दुकान का नाम, मोबाइल नंबर व असली Google Pay QR कोड वाला सुंदर पोस्टर सिर्फ 10 सेकंड में फ्री बनाएं!\n\n` +
      `🎁 (10 दोस्तों को शेयर करने पर ₹100 Amazon/Flipkart शॉपिंग गिफ्ट वाउचर भी मिलता है!)`
    );

    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleScratch = () => {
    setScratchProgress(100);
    setIsScratched(true);
    localStorage.setItem('dukaan_voucher_scratched', 'true');
  };

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText('AMZ-DK-8921-PRO100');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-emerald-950/40 border-2 border-amber-500/40 rounded-3xl p-4 sm:p-6 text-white space-y-5 shadow-2xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-amber-500/30 shrink-0 animate-bounce">
            🎁
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                {isEn ? 'Viral Dhamaka Offer' : 'वायरल धमाका ऑफर'}
              </span>
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-400" />
                {isEn ? '100% Free' : '100% फ्री इनाम'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white mt-0.5 leading-snug">
              {isEn
                ? 'Share on WhatsApp & Win ₹100 Amazon / Flipkart Gift!'
                : isHi
                ? 'व्हाट्सएप पर शेयर करें और ₹100 का शॉपिंग गिफ्ट पाएं!'
                : 'WhatsApp Par Share Karein & ₹100 Gift Voucher Jeetein!'}
            </h3>
            <p className="text-xs text-slate-300">
              {isEn
                ? 'Share with 10 friends to unlock VIP Pro Free, 25 friends for ₹100 Voucher!'
                : isHi
                ? '10 दोस्तों को शेयर करके 1 महीने का VIP Pro फ्री पाएं और 25 शेयर पर ₹100 वाउचर!'
                : '10 dosto ko share karke 1 Mahina VIP Pro Free paayein, 25 share par ₹100 voucher!'}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar & Milestone Badges */}
      <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3 relative z-10">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-300 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{isEn ? 'Your Share Progress:' : 'आपका शेयर स्कोर:'}</span>
          </span>
          <span className="text-amber-400 font-black text-sm">
            {shareCount} / {TARGET_VOUCHER} {isEn ? 'Shares' : 'शेयर'}
          </span>
        </div>

        {/* Progress bar visual */}
        <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${Math.min(100, Math.round((shareCount / TARGET_VOUCHER) * 100))}%` }}
          />
        </div>

        {/* 2 Milestones */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          {/* Milestone 1: VIP Pro */}
          <div
            className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
              proUnlocked
                ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black shrink-0 ${
              proUnlocked ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}>
              {proUnlocked ? '✓' : '👑'}
            </div>
            <div>
              <strong className="block text-white text-[11px] leading-tight">
                10 शेयर = 1 माह VIP Pro
              </strong>
              <span className="text-[10px]">
                {proUnlocked ? '🎉 बधाई! VIP Pro अनलॉक हो गया' : `${Math.max(0, TARGET_PRO - shareCount)} शेयर और बाकी`}
              </span>
            </div>
          </div>

          {/* Milestone 2: ₹100 Voucher */}
          <div
            className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
              voucherUnlocked
                ? 'bg-amber-950/50 border-amber-500/50 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black shrink-0 ${
              voucherUnlocked ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}>
              {voucherUnlocked ? '✓' : '🎁'}
            </div>
            <div>
              <strong className="block text-white text-[11px] leading-tight">
                25 शेयर = ₹100 वाउचर
              </strong>
              <span className="text-[10px]">
                {voucherUnlocked ? '🎉 वाउचर स्क्रैच करने के लिए तैयार' : `${Math.max(0, TARGET_VOUCHER - shareCount)} शेयर और बाकी`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 1-Click WhatsApp Share Button */}
      <button
        type="button"
        onClick={handleShareToWhatsApp}
        className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-400 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-600/30 active:scale-98 transition-all cursor-pointer border border-emerald-400/40 relative z-10 group"
      >
        <Send className="w-5 h-5 text-white shrink-0 group-hover:translate-x-1 transition-transform" />
        <span>
          {isEn
            ? '🚀 Share to WhatsApp (+1 Count)'
            : isHi
            ? '🚀 व्हाट्सएप पर दोस्तों को शेयर करें (+1 काउंट)'
            : '🚀 WhatsApp Par Dosto Ko Bhejein (+1 Count)'}
        </span>
      </button>

      {/* Interactive Scratch Card (Unlocked when 25 shares reached, or preview for motivation!) */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 relative z-10 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-black text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isEn ? 'Your Digital Gift Scratch Card' : 'आपका डिजिटल स्क्रैच कार्ड (Amazon / Flipkart):'}</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {voucherUnlocked ? '🔓 UNLOCKED' : `🔒 ${TARGET_VOUCHER - shareCount} shares to unlock`}
          </span>
        </div>

        {voucherUnlocked ? (
          !isScratched ? (
            <div
              onClick={handleScratch}
              className="h-28 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:brightness-105 active:scale-98 transition-all text-slate-950 font-black p-4 text-center select-none"
            >
              <Sparkles className="w-8 h-8 mb-1 animate-spin" />
              <span className="text-sm sm:text-base">🪙 यहाँ क्लिक करके स्क्रैच करें!</span>
              <span className="text-[11px] font-bold opacity-80">Tap to reveal your ₹100 Gift Voucher Code</span>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-center space-y-2 animate-fadeIn">
              <span className="text-xs text-emerald-300 font-bold block">
                🎉 बधाई हो! आपका ₹100 Amazon / Flipkart शॉपिंग कोड:
              </span>
              <div className="flex items-center justify-center gap-2">
                <code className="text-base sm:text-lg font-mono font-black text-amber-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-amber-500/40 tracking-wider">
                  AMZ-DK-8921-PRO100
                </code>
                <button
                  type="button"
                  onClick={handleCopyVoucher}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'कॉपी हो गया' : 'कॉपी'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Amazon या Flipkart ऐप में 'Gift Card' सेक्शन में यह कोड पेस्ट करके ₹100 क्लेम करें।
              </p>
            </div>
          )
        ) : (
          <div className="h-24 rounded-xl bg-slate-900 border border-dashed border-slate-700 flex flex-col items-center justify-center p-3 text-center text-slate-400 text-xs">
            <span className="text-lg mb-0.5">🔒</span>
            <span className="font-bold text-slate-300">
              {isEn ? 'Scratch Card Locked' : 'स्क्रैच कार्ड अभी लॉक है'}
            </span>
            <span className="text-[11px] text-slate-400">
              {isEn
                ? `Send to ${Math.max(0, TARGET_VOUCHER - shareCount)} more customers on WhatsApp to unlock!`
                : `बस ${Math.max(0, TARGET_VOUCHER - shareCount)} और दुकानदारों/ग्राहकों को WhatsApp पर भेजें और स्क्रैच कार्ड पाएं!`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
