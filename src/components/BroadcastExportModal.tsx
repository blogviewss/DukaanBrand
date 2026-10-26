import React, { useState } from 'react';
import { PaymentRecord } from '../types/admin';
import { 
  Download, 
  Send, 
  Copy, 
  Check, 
  X, 
  Users, 
  FileSpreadsheet, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  CheckCircle2 
} from 'lucide-react';

interface BroadcastExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscribers: PaymentRecord[];
}

export const BroadcastExportModal: React.FC<BroadcastExportModalProps> = ({
  isOpen,
  onClose,
  subscribers,
}) => {
  const [campaignType, setCampaignType] = useState<'festival' | 'new_feature' | 'renewal' | 'custom'>('festival');
  const [copiedNumbers, setCopiedNumbers] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [customText, setCustomText] = useState('');

  if (!isOpen) return null;

  // Clean list of numbers
  const phoneNumbersList = subscribers.map((s) => s.phone.replace(/\D/g, '')).filter(Boolean);
  const commaSeparatedPhones = phoneNumbersList.join(', ');

  // Generate Broadcast Message
  const generateBroadcastText = () => {
    const publicUrl = 'https://dukaan-brand.vercel.app';

    if (campaignType === 'festival') {
      return `🪔 *नमस्ते दुकानदार भाई!* 🙏

दुकान ब्रांड (DukaanBrand) पर *आगामी त्योहार के नए आकर्षक WhatsApp स्टेटस पोस्टर्स* लाइव हो चुके हैं! ✨

👉 *अपनी दुकान का नाम व मोबाइल नंबर वाला पोस्टर 10 सेकंड में बनाएं:*
${publicUrl}

✅ 1-क्लिक में WhatsApp स्टेटस पर लगाएं
✅ ग्राहकों को स्पेशल डिस्काउंट व बधाई भेजें
✅ दुकान की बिक्री 30% तक बढ़ाएं!

— *टीम दुकान ब्रांड*`;
    } else if (campaignType === 'new_feature') {
      return `🚀 *दुकानदार भाइयों के लिए बड़ी खुशखबरी!* 🛍️

दुकान ब्रांड पर अब आप *पोस्टर में अपनी मर्जी से कोई भी रेट, ऑफर या सुविचार लिख सकते हैं!* 

👉 *अभी अपना नया पोस्टर बनाएं:*
${publicUrl}

⭐ पोस्टर पर अपना असली Google Pay / PhonePe QR कोड लगाएं
⭐ शुद्धता व भरोसे का Verified Dukaan बैज पाएं!

— *दुकान ब्रांड*`;
    } else if (campaignType === 'renewal') {
      return `⏰ *VIP Pro रिन्यूअल अलर्ट* 👑

प्रिय दुकानदार भाई, आपकी दुकान का VIP Pro प्लान रिन्यूअल के लिए उपलब्ध है। बिना किसी वॉटरमार्क के HD पोस्टर बनाते रहने और ऑनलाइन पेमेंट QR चालू रखने के लिए आज ही रिन्यू करें:

👉 *यहाँ से रिन्यू करें (सिर्फ ₹10/माह):*
${publicUrl}

धन्यवाद! — *दुकान ब्रांड सपोर्ट*`;
    } else {
      return customText.trim()
        ? `${customText.trim()}\n\n👉 अपनी दुकान का पोस्टर बनाएं: ${publicUrl}`
        : `नमस्ते! अपनी दुकान का नया स्टेटस पोस्टर बनाएं: ${publicUrl}`;
    }
  };

  const broadcastMessage = generateBroadcastText();

  // Export CSV with UTF-8 BOM for Excel
  const handleExportCSV = () => {
    const headers = [
      'Shop Name',
      'Phone Number',
      'Status',
      'Amount Paid (INR)',
      'Registration Date',
      'UTR Reference',
    ];

    const rows = subscribers.map((sub) => [
      `"${(sub.shopName || 'Shopkeeper').replace(/"/g, '""')}"`,
      `"${sub.phone}"`,
      `"${sub.status}"`,
      `"${sub.amount}"`,
      `"${sub.date}"`,
      `"${sub.utrNumber || 'N/A'}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dukaan_registered_shops_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyNumbers = () => {
    navigator.clipboard.writeText(commaSeparatedPhones).then(() => {
      setCopiedNumbers(true);
      setTimeout(() => setCopiedNumbers(false), 2500);
    });
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(broadcastMessage).then(() => {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-5 sm:p-7 text-white shadow-2xl relative space-y-5 animate-fadeIn my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold shrink-0">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>दुकानदार ब्रॉडकास्ट व CSV एक्सपोर्ट (Broadcast & Outreach)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {subscribers.length} दुकानें
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              त्योहारों व नए ऑफर्स के समय सभी पंजीकृत दुकानदारों को WhatsApp पर संदेश भेजें और एक्सेल फाइल डाउनलोड करें।
            </p>
          </div>
        </div>

        {/* Section 1: CSV Export */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>एक्सेल / गूगल शीट्स CSV एक्सपोर्ट</span>
            </div>
            <p className="text-[11px] text-slate-400">
              दुकान का नाम, मोबाइल नंबर, शहर और पेमेंट स्थिति सहित पूरी स्प्रेडशीट डाउनलोड करें।
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>CSV डाउनलोड करें (.csv)</span>
          </button>
        </div>

        {/* Section 2: WhatsApp Broadcast List Formatter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ब्रॉडकास्ट कैंपेन चुनें:</span>
            </label>
            <button
              type="button"
              onClick={handleCopyNumbers}
              className="text-[11px] text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 cursor-pointer bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-lg"
            >
              {copiedNumbers ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedNumbers ? '✓ नंबर कॉपी हुए!' : 'सभी नंबर कॉपी करें'}</span>
            </button>
          </div>

          {/* Campaign Selector Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setCampaignType('festival')}
              className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                campaignType === 'festival'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              🪔 त्योहार स्पेशल
            </button>
            <button
              type="button"
              onClick={() => setCampaignType('new_feature')}
              className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                campaignType === 'new_feature'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              🚀 नया फीचर
            </button>
            <button
              type="button"
              onClick={() => setCampaignType('renewal')}
              className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                campaignType === 'renewal'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              ⏰ VIP रिन्यूअल
            </button>
            <button
              type="button"
              onClick={() => setCampaignType('custom')}
              className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                campaignType === 'custom'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              ✏️ खुद लिखें
            </button>
          </div>

          {campaignType === 'custom' && (
            <textarea
              rows={2}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="दुकानदारों के लिए अपना व्यक्तिगत संदेश लिखें..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          )}

          {/* Broadcast Message Preview */}
          <div className="bg-[#0b141a] border border-emerald-900/40 p-3.5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold">
              <span>WhatsApp ब्रॉडकास्ट संदेश प्रीव्यू:</span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-bold"
              >
                {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMessage ? '✓ कॉपी हुआ!' : 'संदेश कॉपी करें'}</span>
              </button>
            </div>

            <div className="bg-[#1f2c34] p-3 rounded-xl border border-emerald-500/20 text-emerald-50 text-xs font-sans whitespace-pre-wrap leading-relaxed select-text">
              {broadcastMessage}
            </div>
          </div>
        </div>

        {/* Section 3: Registered Shops Quick Launcher List */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
            <span>पंजीकृत दुकानें ({subscribers.length}):</span>
            <span className="text-[11px] text-slate-500">1-क्लिक में अलग-अलग WhatsApp खोलें</span>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
            {subscribers.map((sub) => {
              const cleanPhone = sub.phone.replace(/\D/g, '');
              const encoded = encodeURIComponent(broadcastMessage);
              const waUrl = `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encoded}`;

              return (
                <div
                  key={sub.id}
                  className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{sub.shopName}</span>
                    <span className="text-slate-400 font-mono text-[11px]">📱 {sub.phone}</span>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                  >
                    <Send className="w-3 h-3" />
                    <span>WhatsApp भेजें</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
