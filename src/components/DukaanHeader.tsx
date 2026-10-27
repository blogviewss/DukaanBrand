import React from 'react';
import { Crown, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface DukaanHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isPro: boolean;
  onOpenProModal: () => void;
  onOpenPlaybook?: () => void;
  onOpenHostingGuide?: () => void;
  onOpenAdmin: () => void;
}

export const DukaanHeader: React.FC<DukaanHeaderProps> = ({
  language,
  onLanguageChange,
  isPro,
  onOpenProModal,
  onOpenAdmin,
}) => {
  const [clickCount, setClickCount] = React.useState(0);
  const clickTimerRef = React.useRef<any>(null);

  const handleSecretLogoClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        onOpenAdmin();
        return 0;
      }
      return next;
    });

    clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      setClickCount(0);
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-18">
          {/* Logo & Tagline (Secret 3-click on logo triggers Owner Login) */}
          <div className="flex items-center gap-2.5">
            <div
              onClick={handleSecretLogoClick}
              title="दुकान ब्रांड"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/20 cursor-pointer select-none active:scale-95 transition-transform"
            >
              <span className="font-black text-xl sm:text-2xl text-slate-950">द</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-base sm:text-lg tracking-tight text-white">
                  {language === 'hindi' ? 'दुकान ब्रांड' : 'DukaanBrand'}
                </h1>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {language === 'hindi' ? 'पोस्टर मेकर' : language === 'hinglish' ? 'Poster Maker' : 'Poster Maker'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {language === 'hindi'
                  ? 'अपनी दुकान का नाम व मोबाइल नंबर वाला WhatsApp स्टेटस 10 सेकंड में बनाएं'
                  : language === 'hinglish'
                  ? 'Apni dukaan ka WhatsApp status poster 10 second me banayein'
                  : 'Create WhatsApp status posters for your shop in 10 seconds'}
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* 3-Language Switcher Pill: Hinglish / Hindi / English */}
            <div className="bg-slate-950 p-0.5 rounded-xl border border-slate-800 flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => onLanguageChange('hinglish')}
                title="Hinglish (बोलचाल की भाषा)"
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                  language === 'hinglish'
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Hinglish
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hindi')}
                title="शुद्ध हिन्दी (Pure Hindi)"
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                  language === 'hindi'
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('english')}
                title="English"
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                  language === 'english'
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>

            {/* Pro Status / Unlock Button */}
            {isPro ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">
                  {language === 'hindi' ? 'वीआईपी प्रो सक्रिय' : 'VIP Pro Active'}
                </span>
                <span className="sm:hidden">VIP</span>
              </div>
            ) : (
              <button
                onClick={onOpenProModal}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                <span>VIP Pro (₹10)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
