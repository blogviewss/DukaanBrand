import React, { useState } from 'react';
import { X, Globe, Copy, Check, ExternalLink, Terminal, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface HostingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const HostingGuideModal: React.FC<HostingGuideModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedUpiSnippet, setCopiedUpiSnippet] = useState(false);

  if (!isOpen) return null;

  // The live app URL provided in metadata
  const liveSharedUrl = "https://ais-pre-oawryfsudhykaq6xjtl7mn-517701296038.asia-southeast1.run.app";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveSharedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleCopyUpiSnippet = () => {
    navigator.clipboard.writeText('const upiDeepLink = "upi://pay?pa=YOUR_UPI_ID@okaxis&pn=DukaanBrand&am=10&cu=INR";');
    setCopiedUpiSnippet(true);
    setTimeout(() => setCopiedUpiSnippet(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl relative my-auto animate-fadeIn">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-6 flex items-start justify-between z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'hinglish' ? 'होस्टिंग व लाइव लिंक गाइड' : 'Hosting & Live URL Guide'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {language === 'hinglish' ? 'इस ऐप को लाइव कैसे चलाएं व Vercel पर होस्ट करें?' : 'How to Host & Launch DukaanBrand Live?'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-xs sm:text-sm">
          {/* Section 1: It's ALREADY LIVE right now! */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 border-2 border-emerald-500/50 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'hinglish' 
                  ? 'खुशखबरी: यह ऐप अभी इसी वक्त इंटरनेट पर 100% लाइव है!' 
                  : 'Great News: Your app is ALREADY LIVE right now!'}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {language === 'hinglish'
                ? 'आपको कहीं जाने की ज़रूरत नहीं है! यह सिर्फ चैट में नहीं है, बल्कि नीचे दिए गए लिंक पर दुनिया के किसी भी फोन या कंप्यूटर पर अभी खुल रहा है। इसे अपने फोन में खोलकर टेस्ट करें:'
                : 'This app is not just inside this chat. It is deployed and publicly accessible right now at this URL:'}
            </p>

            {/* Live URL Box */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
              <span className="font-mono text-emerald-400 text-xs truncate select-all">
                {liveSharedUrl}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-bold border border-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'कॉपी हो गया' : 'कॉपी लिंक'}</span>
                </button>
                <a
                  href={liveSharedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Section 2: How to host on Vercel with your OWN Domain & UPI */}
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 space-y-4">
            <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              {language === 'hinglish'
                ? 'Vercel पर अपने नाम से 100% फ्री में कैसे होस्ट करें (5 मिनट का काम):'
                : 'Deploy to your own free Vercel account in 5 minutes:'}
            </h4>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 block">
                  स्टेप 1: कोड डाउनलोड या GitHub पर पुश करें
                </span>
                <p className="text-slate-300 text-xs">
                  AI Studio के ऊपरी दाएं कोने में <strong>"Download Code"</strong> या <strong>"Export to GitHub"</strong> बटन दबाएं। इससे सारा कोड आपकी ज़िप फाइल या GitHub में आ जाएगा।
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 block">
                  स्टेप 2: अपना खुद का UPI ID जोड़ें (पैसे आपके खाते में आने के लिए)
                </span>
                <p className="text-slate-300 text-xs mb-1.5">
                  फाइल <code>src/components/ProCheckoutModal.tsx</code> खोलें और अपनी Google Pay / PhonePe UPI ID लिख दें:
                </p>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-[11px] font-mono text-sky-300">
                  <span className="truncate">pa=YOUR_UPI_ID@okaxis&pn=DukaanBrand&am=10</span>
                  <button
                    onClick={handleCopyUpiSnippet}
                    className="text-slate-400 hover:text-white shrink-0 ml-2"
                  >
                    {copiedUpiSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 block">
                  स्टेप 3: Vercel.com पर फ्री अकाउंट बनाएं
                </span>
                <p className="text-slate-300 text-xs">
                  <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline font-bold">
                    vercel.com
                  </a> पर जाएं और 'Sign Up with GitHub' करें। <strong>"Add New Project"</strong> दबाकर अपना प्रोजेक्ट सेलेक्ट करें और <strong>"Deploy"</strong> पर क्लिक करें।
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 block">
                  ✓ बधाई हो! आपकी वेबसाइट लाइव हो गई!
                </span>
                <p className="text-slate-300 text-xs">
                  आपको Vercel से <code>https://dukaanbrand.vercel.app</code> जैसा फ्री लिंक मिल जाएगा। आप चाहें तो GoDaddy से ₹499 में <code>.in</code> डोमेन खरीदकर 1 क्लिक में जोड़ सकते हैं।
                </p>
              </div>
            </div>

            {/* Error Fix Box for npm install error */}
            <div className="mt-3 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-2">
              <strong className="text-rose-300 font-bold text-xs flex items-center gap-1.5">
                <span>⚠️ अगर Vercel पर "Command npm install exited with 1" एरर आए:</span>
              </strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                यह React 19 के कारण होता है। <strong>1 सेकंड का फिक्स:</strong> Vercel डैशबोर्ड में <strong>Settings &gt; Build &amp; Development Settings &gt; Install Command</strong> को "Override" ऑन करें और वहां यह लिख दें:
              </p>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400 font-bold flex items-center justify-between">
                <span>npm install --legacy-peer-deps</span>
              </div>
              <p className="text-[10px] text-slate-400">
                *(नोट: हमने आपके प्रोजेक्ट में <code>vercel.json</code> और <code>.npmrc</code> पहले से जोड़ दिया है जो इसे अपने आप ठीक कर देता है!)*
              </p>
            </div>
          </div>

          {/* Section 3: Zero Cost Guarantee */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200/90 leading-relaxed">
            <strong className="text-amber-300 block mb-1">
              🔒 क्या Vercel कभी पैसे मांगेगा?
            </strong>
            {language === 'hinglish' ? (
              <>
                बिल्कुल नहीं! क्योंकि यह ऐप <strong>100% Client-Side React</strong> है (कोई भारी पायथन या डेटाबेस नहीं है), Vercel का फ्री टियर हर महीने <strong>100 GB फ्री बैंडविड्थ</strong> देता है, जो <strong>लाखों यूज़र्स</strong> के लिए पर्याप्त है। आपका सर्वर खर्च हमेशा <strong>₹0</strong> ही रहेगा!
              </>
            ) : (
              <>
                No. Because all poster generation runs client-side in the browser, Vercel free tier easily handles millions of visits without charging a single penny.
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 p-4 sm:p-6 flex items-center justify-between">
          <a
            href={liveSharedUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-emerald-400 font-bold flex items-center gap-1 hover:underline"
          >
            <span>लाइव लिंक पर जाएं</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm cursor-pointer transition-colors"
          >
            {language === 'hinglish' ? 'समझ आ गया' : 'Close Guide'}
          </button>
        </div>
      </div>
    </div>
  );
};
