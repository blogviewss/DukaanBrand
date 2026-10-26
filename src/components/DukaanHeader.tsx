import React from 'react';
import { Sparkles, ShieldCheck, Crown, HelpCircle, TrendingUp } from 'lucide-react';
import { Language } from '../types';

interface DukaanHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isPro: boolean;
  onOpenProModal: () => void;
  onOpenPlaybook: () => void;
  onOpenHostingGuide: () => void;
}

export const DukaanHeader: React.FC<DukaanHeaderProps> = ({
  language,
  onLanguageChange,
  isPro,
  onOpenProModal,
  onOpenPlaybook,
  onOpenHostingGuide,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="font-black text-2xl text-slate-950">द</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  दुकान ब्रांड <span className="text-amber-400 font-bold text-sm sm:text-base">DukaanBrand</span>
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ₹10 Sachet App
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {language === 'hinglish'
                  ? 'दुकानदार का नाम, फोटो व मोबाइल नंबर वाला रोज़ाना WhatsApp स्टेटस पोस्टर 10 सेकंड में'
                  : 'Daily WhatsApp status posters for shopkeepers in 10 seconds'}
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Hosting Guide Button */}
            <button
              onClick={onOpenHostingGuide}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{language === 'hinglish' ? '🌐 लाइव लिंक व होस्टिंग' : 'Live URL & Host'}</span>
            </button>

            {/* Business Playbook Button */}
            <button
              onClick={onOpenPlaybook}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer hidden md:flex"
            >
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'hinglish' ? 'कमाई गाइड' : 'Earn Guide'}
              </span>
            </button>

            {/* Pro Status / Unlock Button */}
            {isPro ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">₹10 Pro Unlocked</span>
                <span className="sm:hidden">Pro</span>
              </div>
            ) : (
              <button
                onClick={onOpenProModal}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Crown className="w-4 h-4 text-slate-950" />
                <span>{language === 'hinglish' ? 'वाटरमार्क हटाएं (₹10)' : 'VIP Pro (₹10)'}</span>
              </button>
            )}

            {/* Language Toggle */}
            <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex items-center text-xs font-bold">
              <button
                onClick={() => onLanguageChange('hinglish')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  language === 'hinglish' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => onLanguageChange('english')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  language === 'english' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
