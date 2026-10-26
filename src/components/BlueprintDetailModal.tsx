import React, { useState } from 'react';
import { ViralIdea, Language } from '../types';
import { X, Copy, Check, Sparkles, Zap, ShieldCheck, ArrowRight, Terminal } from 'lucide-react';

interface BlueprintDetailModalProps {
  idea: ViralIdea | null;
  language: Language;
  onClose: () => void;
  onOpenLiveTool: (toolId: string) => void;
}

export const BlueprintDetailModal: React.FC<BlueprintDetailModalProps> = ({
  idea,
  language,
  onClose,
  onOpenLiveTool,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!idea) return null;

  const isInteractive = ['whatsapp-vyapar-poster', 'polite-udhar-receipt', 'sarkari-yojana-finder'].includes(idea.id);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(idea.samplePromptForAI);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl relative my-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-6 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                ★ {idea.viralScore}/10 Viral Probability
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {idea.serverCost}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {language === 'hinglish' ? idea.titleHinglish : idea.titleEnglish}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {language === 'hinglish' ? idea.taglineHinglish : idea.taglineEnglish}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Section 1: The Core Pain Point */}
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
              🚨 {language === 'hinglish' ? 'समस्या (The Core Pain Point):' : 'The Core Problem:'}
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {language === 'hinglish' ? idea.theCorePainPoint.hinglish : idea.theCorePainPoint.english}
            </p>
          </div>

          {/* Section 2: Why People Gladly Pay ₹10 */}
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              💰 {language === 'hinglish' ? 'लोग ₹10 बिना सोचे क्यों दे देते हैं?' : 'Why People Pay ₹10 With Zero Friction:'}
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {language === 'hinglish' ? idea.whyPeoplePay10Rs.hinglish : idea.whyPeoplePay10Rs.english}
            </p>
          </div>

          {/* Section 3: The WhatsApp Viral Loop (Free Growth) */}
          <div className="bg-gradient-to-br from-amber-950/30 to-orange-950/20 rounded-2xl p-5 border border-amber-500/30">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              ⚡ {language === 'hinglish' ? 'बिना ₹1 का विज्ञापन दिए कैसे फैलेगा? (The Viral Engine)' : 'How it Spreads with Zero Ad Spend:'}
            </h4>
            <p className="text-sm text-amber-100/90 leading-relaxed mb-3">
              {language === 'hinglish' ? idea.viralLoopMechanism.hinglish : idea.viralLoopMechanism.english}
            </p>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs text-amber-300 font-mono">
              Formula: 1 User Shares on WhatsApp → 200 Contacts View → 5 New Users Sign Up (K-Factor = 1.35x Organic Compound Growth)
            </div>
          </div>

          {/* Section 4: Zero Hosting Cost Architecture */}
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
              ☁️ {language === 'hinglish' ? 'सर्वर का ₹0 खर्चा कैसे होगा? (Tech Architecture)' : 'How Hosting Stays ₹0 on Vercel:'}
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {language === 'hinglish' ? idea.zeroCostTechSecret.hinglish : idea.zeroCostTechSecret.english}
            </p>
          </div>

          {/* Section 5: Step-by-Step Launch Roadmap */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              📅 {language === 'hinglish' ? '48 घंटे में लॉन्च करने का प्लान:' : 'Step-by-Step Execution Plan:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {idea.growthRoadmap.map((item, idx) => (
                <div key={idx} className="bg-slate-800/40 border border-slate-800 rounded-xl p-3 text-xs">
                  <span className="font-bold text-amber-400 block mb-1">{item.step}</span>
                  <span className="text-slate-300">
                    {language === 'hinglish' ? item.descHinglish : item.descEnglish}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Copy-Paste AI Prompt */}
          <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-amber-400" />
                {language === 'hinglish' ? 'AI से बनवाने का रेडीमेड प्रॉम्प्ट (Copy-Paste Prompt)' : 'Ready-to-Use AI Prompt'}
              </span>
              <button
                onClick={handleCopyPrompt}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 border border-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? 'कॉपी हो गया!' : 'प्रॉम्प्ट कॉपी करें'}</span>
              </button>
            </div>
            <pre className="text-xs font-mono text-slate-300 bg-slate-900 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
              {idea.samplePromptForAI}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 p-4 sm:p-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
          >
            {language === 'hinglish' ? 'बंद करें' : 'Close'}
          </button>

          {isInteractive && (
            <button
              onClick={() => {
                onClose();
                onOpenLiveTool(idea.id);
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>{language === 'hinglish' ? 'लाइव टूल चला कर देखें' : 'Launch Working Prototype'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
