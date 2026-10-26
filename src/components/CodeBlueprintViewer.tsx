import React, { useState } from 'react';
import { Language } from '../types';
import { Code2, Copy, Check, Terminal, FileCode, CheckCircle2 } from 'lucide-react';

interface CodeBlueprintViewerProps {
  language: Language;
}

export const CodeBlueprintViewer: React.FC<CodeBlueprintViewerProps> = ({ language }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const MASTER_AI_PROMPT = `You are an elite frontend architect. Build a 100% client-side Progressive Web App (PWA) in React + Vite + Tailwind CSS called "VyaparPoster".

Target Users: Indian shopkeepers (kirana, clothing, repair, tuition, doctors).
Core Value: Generate high-resolution daily morning motivational quotes (सुविचार) and festival greetings with the shop's name, phone number, address, and tagline in 5 seconds.

Key Requirements:
1. 100% Client-Side HTML5 Canvas rendering (zero backend server cost, zero GPU API fees).
2. 8 Pre-designed beautiful Indian festive and morning motivational templates with decorative borders.
3. Live reactive input fields: Shop Name, Phone, Address, Tagline, Logo upload.
4. Export buttons: "Download HD Image (JPG/PNG)" and "Share directly on WhatsApp".
5. Growth Engine: Free version includes a discreet viral footer line: "⚡ अपनी दुकान का फ्री पोस्टर बनाएं: VyaparPoster.in".
6. Sachet Monetization Modal: "Pay ₹10/month via UPI to remove watermark & unlock 200+ HD festival designs". Shows dynamic UPI payment link and QR.
7. Mobile-first, offline-ready, responsive, and ultra-fast.`;

  const CANVAS_SNIPPET = `// Zero-Cost Client-Side Canvas Engine (Runs in user's browser for ₹0 hosting cost)
export function generateShopPoster(
  canvas: HTMLCanvasElement, 
  shopName: string, 
  phone: string, 
  address: string, 
  quote: string, 
  isPro: boolean
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  canvas.width = 1080;
  canvas.height = 1350; // 4:5 Instagram/WhatsApp portrait

  // 1. Rich Gradient
  const grad = ctx.createLinearGradient(0, 0, 1080, 1350);
  grad.addColorStop(0, '#f97316');
  grad.addColorStop(1, '#991b1b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1350);

  // 2. Central Suvichar / Blessing
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(quote, 540, 600);

  // 3. Shop Branding Card (Bottom Ribbon)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(80, 850, 920, 420, 24);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 48px sans-serif';
  ctx.fillText(shopName, 540, 930);

  ctx.fillStyle = '#0284c7';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('📞 WhatsApp: ' + phone, 540, 1000);

  ctx.fillStyle = '#64748b';
  ctx.font = '24px sans-serif';
  ctx.fillText('📍 ' + address, 540, 1060);

  // 4. Viral Watermark Loop
  if (!isPro) {
    ctx.fillStyle = '#ea580c';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('⚡ अपनी दुकान का फ्री स्टेटस पोस्टर बनाएं: VyaparPoster.in', 540, 1220);
  }
}`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {language === 'hinglish'
              ? 'AI से तुरंत बनवाने का मास्टर प्रॉम्प्ट व कोड'
              : 'Master AI Prompt & Production Boilerplate'}
          </h3>
        </div>
        <p className="text-sm text-slate-400">
          {language === 'hinglish'
            ? 'इसे कॉपी करके किसी भी AI टूल में पेस्ट करें और 5 मिनट में अपना वायरल ऐप तैयार करके Vercel पर फ्री में पब्लिश करें!'
            : 'Copy this prompt to build your standalone product on Vercel in minutes.'}
        </p>
      </div>

      {/* Prompt Box */}
      <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Terminal className="w-4 h-4" />
            Master System Prompt (AI को देने के लिए)
          </span>
          <button
            onClick={() => handleCopy('prompt', MASTER_AI_PROMPT)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 border border-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {copiedId === 'prompt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'prompt' ? 'कॉपी हो गया!' : 'प्रॉम्प्ट कॉपी करें'}</span>
          </button>
        </div>
        <pre className="text-xs font-mono text-slate-300 bg-slate-900 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-64 overflow-y-auto">
          {MASTER_AI_PROMPT}
        </pre>
      </div>

      {/* Canvas Engine Code Snippet */}
      <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <FileCode className="w-4 h-4" />
            Core Client-Side Canvas Engine (Zero-Cost Secret)
          </span>
          <button
            onClick={() => handleCopy('code', CANVAS_SNIPPET)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-sky-300 border border-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {copiedId === 'code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'code' ? 'कॉपी हो गया!' : 'कोड कॉपी करें'}</span>
          </button>
        </div>
        <pre className="text-xs font-mono text-slate-300 bg-slate-900 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-64 overflow-y-auto">
          {CANVAS_SNIPPET}
        </pre>
      </div>
    </div>
  );
};
