import React from 'react';
import { ViralIdea, Language } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';

interface BlueprintGridProps {
  ideas: ViralIdea[];
  language: Language;
  onSelectIdea: (idea: ViralIdea) => void;
  onOpenLiveTool: (toolId: string) => void;
}

export const BlueprintGrid: React.FC<BlueprintGridProps> = ({
  ideas,
  language,
  onSelectIdea,
  onOpenLiveTool,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {language === 'hinglish' 
            ? 'शीर्ष 5 वायरल सचेत उत्पाद (Top 5 Blueprints)' 
            : 'Top 5 Viral Sachet SaaS Blueprints'}
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          {language === 'hinglish'
            ? 'जिन्हें आप AI से 100% फ्री में बनवा सकते हैं, Vercel पर ₹0 खर्च में होस्ट कर सकते हैं, और जो खुद WhatsApp पर फैलते हैं।'
            : 'Built with AI for free, hosted on Vercel at zero server cost, powered by organic WhatsApp loops.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => {
          const isToolInteractive = ['whatsapp-vyapar-poster', 'polite-udhar-receipt', 'sarkari-yojana-finder'].includes(idea.id);

          return (
            <div
              key={idea.id}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-xl group"
            >
              <div>
                {/* Top Meta info */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    ★ {idea.viralScore}/10 Viral Score
                  </span>
                  <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {idea.serverCost}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors mb-2">
                  {language === 'hinglish' ? idea.titleHinglish : idea.titleEnglish}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {language === 'hinglish' ? idea.taglineHinglish : idea.taglineEnglish}
                </p>

                {/* Target & Price stats */}
                <div className="space-y-2 py-3 border-t border-b border-slate-800 text-xs">
                  <div className="flex items-start gap-1.5 text-slate-300">
                    <span className="text-slate-500 font-medium shrink-0">🎯 टारगेट:</span>
                    <span className="line-clamp-2">
                      {language === 'hinglish' ? idea.targetAudienceHinglish : idea.targetAudienceEnglish}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500 font-medium">💰 मूल्य मॉडल:</span>
                    <span className="font-bold text-emerald-400">{idea.pricingModel}</span>
                  </div>
                </div>

                {/* Why it works snippet */}
                <div className="mt-4 bg-slate-800/50 rounded-xl p-3 text-xs text-slate-300/90">
                  <strong className="text-amber-400 block mb-1">
                    ⚡ {language === 'hinglish' ? 'वायरल लूप का राज:' : 'Viral Loop Secret:'}
                  </strong>
                  <p className="line-clamp-3 text-[11px] leading-relaxed">
                    {language === 'hinglish' ? idea.viralLoopMechanism.hinglish : idea.viralLoopMechanism.english}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => onSelectIdea(idea)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>{language === 'hinglish' ? 'पूरा ब्लूप्रिंट व प्रॉम्प्ट' : 'View Blueprint'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {isToolInteractive && (
                  <button
                    onClick={() => onOpenLiveTool(idea.id)}
                    className="px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Try live prototype"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{language === 'hinglish' ? 'टेस्ट करें' : 'Demo'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
