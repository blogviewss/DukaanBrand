import React from 'react';
import { Language } from '../types';
import { Sparkles, Zap, Calculator, Rocket, Layers } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl text-white">₹10</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  Bharat Viral SaaS
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Zero-Cost Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {language === 'hinglish' 
                  ? 'कम खर्चे में 1-10 करोड़ लोगों तक पहुँचने वाला फॉर्मूला' 
                  : 'Playbook for ₹5-₹10 Mass Viral Apps in India'}
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('ideas')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeSection === 'ideas' 
                  ? 'bg-slate-800 text-amber-400' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              {language === 'hinglish' ? '5 वायरल आइडिया' : '5 Viral Ideas'}
            </button>

            <button
              onClick={() => onNavigate('live-tools')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeSection === 'live-tools' 
                  ? 'bg-slate-800 text-amber-400' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              {language === 'hinglish' ? 'लाइव टूल चला कर देखें' : 'Try Live Prototypes'}
            </button>

            <button
              onClick={() => onNavigate('calculator')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeSection === 'calculator' 
                  ? 'bg-slate-800 text-amber-400' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calculator className="w-4 h-4" />
              {language === 'hinglish' ? 'कमाई कैलकुलेटर' : 'Revenue Math'}
            </button>

            <button
              onClick={() => onNavigate('playbook')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeSection === 'playbook' 
                  ? 'bg-slate-800 text-amber-400' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Rocket className="w-4 h-4" />
              {language === 'hinglish' ? '48 घंटे में लॉन्च' : 'Launch Guide'}
            </button>
          </nav>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex items-center text-xs font-medium">
              <button
                onClick={() => onLanguageChange('hinglish')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  language === 'hinglish'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                हिंदी / Hinglish
              </button>
              <button
                onClick={() => onLanguageChange('english')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  language === 'english'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
