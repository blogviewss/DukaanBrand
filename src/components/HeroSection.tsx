import React from 'react';
import { Language } from '../types';
import { Sparkles, TrendingUp, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  onExploreIdeas: () => void;
  onTryLiveTool: () => void;
  onOpenCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExploreIdeas,
  onTryLiveTool,
  onOpenCalculator,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 border-b border-slate-800">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-amber-500/10 via-orange-500/10 to-rose-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {language === 'hinglish' 
                ? 'भारत का सबसे बड़ा अनसुलझा फॉर्मूला: ₹10 सचेत क्रांति' 
                : 'The ₹10 Bharat Micro-SaaS Blueprint & Playbook'}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {language === 'hinglish' ? (
              <>
                कम खर्चे में <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">₹10 का ऐसा ऐप</span> जो 1 से 10 करोड़ लोगों तक पहुंचे!
              </>
            ) : (
              <>
                Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">₹10 Micro-App</span> That Reaches 10M+ Users at Zero Cost!
              </>
            )}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
            {language === 'hinglish' ? (
              <>
                आपका सवाल: <em>"फ्री में AI से क्या बनवाऊं जो खुद वायरल हो, लोग ₹5-₹10 आसानी से दें, और मेरा सर्वर का खर्चा भी ₹0 आए?"</em> — यहाँ इसका 100% प्रैक्टिकल जवाब, लाइव वर्किंग प्रोटोटाइप्स और पूरा कोड ब्लूप्रिंट है।
              </>
            ) : (
              <>
                Your goal: <em>"What product can I build with AI for free that spreads organically on WhatsApp, charges ₹5–₹10 with zero hesitation, and incurs near-zero hosting costs?"</em> — Here is the proven playbook with live working tools.
              </>
            )}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onTryLiveTool}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-5 h-5 text-slate-950" />
              <span>{language === 'hinglish' ? 'लाइव टूल चला कर देखें' : 'Try Live Working Tool'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreIdeas}
              className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-white font-semibold text-sm sm:text-base border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{language === 'hinglish' ? '5 सबसे वायरल आइडिया' : 'Explore Top 5 Ideas'}</span>
            </button>

            <button
              onClick={onOpenCalculator}
              className="px-4 py-3.5 rounded-xl text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 font-semibold text-sm sm:text-base transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{language === 'hinglish' ? 'कमाई का गणित (Calculator)' : 'Revenue Calculator'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Pillars Grid: The Secret Formula */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80">
          {/* Card 1 */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-3">
              ₹10
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {language === 'hinglish' ? 'सचेत कीमत (Zero Friction)' : 'Sachet Pricing (Zero Friction)'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'hinglish'
                ? 'चाय से भी सस्ती ₹10 कीमत। UPI QR कोड स्कैन करने में भारतीय यूजर को 1 सेकंड भी नहीं सोचना पड़ता।'
                : 'Cheaper than tea. Paying ₹10 via UPI QR incurs zero mental resistance and massive conversion rates.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm mb-3">
              WA
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {language === 'hinglish' ? 'व्हाट्सएप वायरल लूप (फ्री ग्रोथ)' : 'WhatsApp Viral Loop'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'hinglish'
                ? 'हर पोस्टर या बिल पर "Created with YourApp" का वॉटरमार्क। 1 यूजर स्टेटस लगाएगा तो 200 लोग देखेंगे।'
                : 'Every poster or receipt carries a discreet viral watermark, turning every user into an organic marketing channel.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-3">
              ₹0
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {language === 'hinglish' ? 'क्लाइंट-साइड (सर्वर खर्च ₹0)' : 'Client-Side Canvas (₹0 Server)'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'hinglish'
                ? 'सारा इमेज और पीडीएफ यूजर के मोबाइल ब्राउज़र में बनता है। Vercel की फ्री टियर पर 1 करोड़ यूजर भी ₹0 में संभलेंगे!'
                : 'Rendering happens in browser via HTML5 Canvas. Zero GPU or cloud costs; runs 100% free on Vercel.'}
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm mb-3">
              10Cr
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {language === 'hinglish' ? 'विशाल मार्केट (10 करोड़ लोग)' : 'Massive Addressable Market'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'hinglish'
                ? '6 करोड़ छोटे दुकानदार + 30 करोड़ छात्र/ग्रामीण युवा। 1% भी पे करे तो ₹10 लाख से ₹1 करोड़ हर महीने!'
                : '60M MSMEs and 300M youth in India. Even a modest 100k subscriber base yields ₹10,00,000/month pure profit.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
