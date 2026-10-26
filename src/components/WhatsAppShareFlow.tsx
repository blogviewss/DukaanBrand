import React, { useState, useMemo } from 'react';
import { ShopProfile } from '../types/dukaan';
import { Template } from '../data/templates';
import { MessageSquare, Send, Copy, Check, Sparkles, ExternalLink, RefreshCw, ShoppingBag, Truck, Gift } from 'lucide-react';

interface WhatsAppShareFlowProps {
  profile: ShopProfile;
  template: Template;
  onShareSuccess?: () => void;
}

export const WhatsAppShareFlow: React.FC<WhatsAppShareFlowProps> = ({
  profile,
  template,
  onShareSuccess,
}) => {
  const [offerType, setOfferType] = useState<'sale' | 'stock' | 'delivery' | 'festival'>('sale');
  const [copied, setCopied] = useState<boolean>(false);
  const [customNote, setCustomNote] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Generate web link to view the poster / store
  const posterWebLink = useMemo(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const params = new URLSearchParams({
        shop: profile.shopName || '',
        phone: profile.phone || '',
        offer: template.titleHindi || '',
      });
      return `${origin}/?${params.toString()}`;
    }
    return 'https://dukaanbrand.vercel.app';
  }, [profile.shopName, profile.phone, template.titleHindi]);

  // Construct automated pre-filled WhatsApp message
  const generatedMessage = useMemo(() => {
    const shop = profile.shopName || 'हमारी दुकान';
    const city = profile.city ? `\n📍 पता: ${profile.city}` : '';
    const phone = profile.phone ? `\n📞 संपर्क / WhatsApp ऑर्डर: ${profile.phone}` : '';
    const upi = profile.showUpiQr && profile.upiId ? `\n💳 ऑनलाइन पेमेंट (UPI): ${profile.upiId}` : '';
    const note = customNote.trim() ? `\n\n📌 विशेष सूचना: ${customNote.trim()}` : '';
    const specialOfferLine = profile.specialOffer ? `\n🎁 विशेष छूट: ${profile.specialOffer}` : '';

    let intro = '';
    let body = '';

    if (offerType === 'sale') {
      intro = `🛍️ *${shop} का स्पेशल डिस्काउंट ऑफर!* 🔥`;
      body = `✨ *${template.titleHindi || 'धमाका सेल'}*\n🏷️ ${template.mainQuoteHindi || 'सर्वोत्तम क्वालिटी और सबसे कम दाम!'}${specialOfferLine}\n⚡ सीमित समय के लिए भारी छूट उपलब्ध है।`;
    } else if (offerType === 'stock') {
      intro = `📦 *${shop} पर नया फ्रेश स्टॉक आ गया है!* 🌟`;
      body = `✨ *ताज़ा माल व नया कलेक्शन!*\n🏷️ ${template.titleHindi || 'प्रीमियम क्वालिटी में नया सामान उपलब्ध'}\n🛒 आज ही दुकान पर पधारें या घर बैठे मंगवाएं।`;
    } else if (offerType === 'delivery') {
      intro = `🚚 *${shop} की फ्री होम डिलीवरी सेवा!* 📦`;
      body = `✨ *घर बैठे सामान मंगाएं!*\n🏷️ WhatsApp पर सामान की लिस्ट भेजें, सामान सीधे आपके दरवाजे पर।\n🛵 डिलीवरी एकदम सुरक्षित व तेज़।`;
    } else {
      intro = `🪔 *${shop} की ओर से हार्दिक शुभकामनाएं!* 🎁`;
      body = `✨ *त्योहार स्पेशल बचत ऑफर!*\n🏷️ ${template.titleHindi || 'हर खरीदारी पर विशेष उपहार और छूट'}\n🎉 अपने परिवार के साथ खुशियाँ मनाएं।`;
    }

    return `${intro}
${body}${city}${phone}${upi}${note}

👉 *हमारा ऑनलाइन डिजिटल पोस्टर व रेट लिस्ट यहाँ देखें:*
${posterWebLink}

🙏 _आपकी संतुष्टि ही हमारा विश्वास है! धन्यवाद!_`;
  }, [profile, template, offerType, customNote, posterWebLink]);

  // Handle Send to WhatsApp
  const handleSendWhatsApp = () => {
    const encoded = encodeURIComponent(generatedMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    if (onShareSuccess) {
      onShareSuccess();
    }
  };

  // Handle Copy to Clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage).then(() => {
      setCopied(true);
      if (onShareSuccess) {
        onShareSuccess();
      }
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/30 p-4 sm:p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold shrink-0">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
              <span>ऑटोमैटिक WhatsApp संदेश जनरेटर</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                1-क्लिक शेयर
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              दुकान का नाम, ऑफर और पोस्टर लिंक पहले से तैयार हैं। सीधे ग्राहकों को भेजें।
            </p>
          </div>
        </div>
      </div>

      {/* Offer Type Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => setOfferType('sale')}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
            offerType === 'sale'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>🔥 महा डिस्काउंट</span>
        </button>

        <button
          type="button"
          onClick={() => setOfferType('stock')}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
            offerType === 'stock'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>📦 नया स्टॉक</span>
        </button>

        <button
          type="button"
          onClick={() => setOfferType('delivery')}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
            offerType === 'delivery'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>🚚 फ्री डिलीवरी</span>
        </button>

        <button
          type="button"
          onClick={() => setOfferType('festival')}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
            offerType === 'festival'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>🪔 पर्व/त्योहार</span>
        </button>
      </div>

      {/* Message Preview Box (Looks like WhatsApp Chat Bubble) */}
      <div className="relative rounded-2xl bg-[#0b141a] border border-emerald-900/40 p-3 sm:p-4 text-slate-200 text-xs sm:text-sm font-sans leading-relaxed shadow-inner">
        <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 mb-1.5 flex items-center justify-between">
          <span>WhatsApp संदेश प्रीव्यू (Customer View)</span>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline text-[11px]"
          >
            {isEditing ? '✓ हो गया' : '✏️ अतिरिक्त रेट या लाइन जोड़ें'}
          </button>
        </div>

        {isEditing && (
          <div className="mb-2 p-2 rounded-xl bg-slate-900 border border-slate-700 animate-fadeIn">
            <label className="block text-[11px] text-slate-300 mb-1 font-bold">
              अतिरिक्त लाइन (जैसे: चीनी ₹42/kg या शाम 8 बजे तक खुला है):
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="उदा. आज शाम 7 बजे तक ही मान्य..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        )}

        <div className="whitespace-pre-wrap font-sans text-xs sm:text-[13px] bg-[#1f2c34] p-3 rounded-xl border border-emerald-500/20 text-emerald-50 select-text">
          {generatedMessage}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <button
          type="button"
          onClick={handleSendWhatsApp}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-98 transition-all cursor-pointer border border-emerald-400/40"
        >
          <Send className="w-4 h-4 text-white shrink-0" />
          <span>WhatsApp पर तुरंत भेजें (1-Click)</span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 active:scale-98 transition-all cursor-pointer shadow-md"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-emerald-400">✓ संदेश कॉपी हो गया!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-amber-400 shrink-0" />
              <span>संदेश कॉपी करें (Copy Text)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
