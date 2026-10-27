import React, { useState, useMemo } from 'react';
import { ShopProfile } from '../types/dukaan';
import { Template } from '../data/templates';
import { Language } from '../types';
import { 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink, 
  ShoppingBag, 
  Truck, 
  Gift, 
  Globe, 
  Info,
  CheckCircle2
} from 'lucide-react';

interface WhatsAppShareFlowProps {
  profile: ShopProfile;
  template: Template;
  language?: Language;
  customHeader?: string;
  customQuote?: string;
  onShareSuccess?: () => void;
}

export const WhatsAppShareFlow: React.FC<WhatsAppShareFlowProps> = ({
  profile,
  template,
  language = 'hinglish',
  customHeader,
  customQuote,
  onShareSuccess,
}) => {
  const [offerType, setOfferType] = useState<'sale' | 'stock' | 'delivery' | 'festival'>('sale');
  const [copied, setCopied] = useState<boolean>(false);
  const [customNote, setCustomNote] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showDomainSettings, setShowDomainSettings] = useState<boolean>(false);

  // Default public domain that never asks customers for Google sign-in
  const DEFAULT_PUBLIC_DOMAIN = 'https://dukaan-brand.vercel.app';
  const [customDomain, setCustomDomain] = useState<string>(DEFAULT_PUBLIC_DOMAIN);

  const isEn = language === 'english';
  const isHi = language === 'hindi';
  const isHindi = language !== 'english';

  // Smart domain resolver: guarantees outside customers open public Vercel app without Google sign-in
  const publicBaseDomain = useMemo(() => {
    // If running in production browser on Vercel or custom domain (not an internal dev container)
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const isInternalDev = 
        origin.includes('ais-dev') || 
        origin.includes('run.app') || 
        origin.includes('localhost') || 
        origin.includes('127.0.0.1') || 
        origin.includes('google.com') ||
        origin.includes('aistudio');
      
      if (!isInternalDev && origin.startsWith('http')) {
        return origin;
      }
    }
    if (customDomain.trim() && !customDomain.includes('run.app') && !customDomain.includes('ais-dev')) {
      return customDomain.trim().replace(/\/$/, '');
    }
    return DEFAULT_PUBLIC_DOMAIN;
  }, [customDomain]);

  // Generate web link to view the poster / store
  const posterWebLink = useMemo(() => {
    const params = new URLSearchParams({
      shop: profile.shopName || '',
      phone: profile.phone || '',
      offer: customHeader || (isHindi ? template.titleHindi : template.titleEnglish) || '',
    });
    return `${publicBaseDomain}/?${params.toString()}`;
  }, [publicBaseDomain, profile.shopName, profile.phone, customHeader, isHindi, template.titleHindi, template.titleEnglish]);

  // Construct automated pre-filled WhatsApp message
  const generatedMessage = useMemo(() => {
    const shop = profile.shopName || (isHindi ? 'हमारी दुकान' : 'Our Store');
    const city = profile.city ? `\n📍 ${isHindi ? 'पता' : 'Address'}: ${profile.city}` : '';
    const phone = profile.phone ? `\n📞 ${isHindi ? 'संपर्क / WhatsApp ऑर्डर' : 'WhatsApp Order / Call'}: ${profile.phone}` : '';
    const upi = profile.showUpiQr && profile.upiId ? `\n💳 ${isHindi ? 'ऑनलाइन पेमेंट (UPI)' : 'Online Payment (UPI)'}: ${profile.upiId}` : '';
    const note = customNote.trim() ? `\n\n📌 ${isHindi ? 'विशेष सूचना' : 'Note'}: ${customNote.trim()}` : '';
    const specialOfferLine = profile.specialOffer ? `\n🎁 ${isHindi ? 'विशेष छूट' : 'Special Offer'}: ${profile.specialOffer}` : '';

    const effectiveTitle = customHeader || (isHindi ? template.titleHindi : template.titleEnglish);
    const effectiveQuote = customQuote || (isHindi ? template.mainQuoteHindi : template.mainQuoteEnglish);

    let intro = '';
    let body = '';

    if (isHindi) {
      if (offerType === 'sale') {
        intro = `🛍️ *${shop} का स्पेशल डिस्काउंट ऑफर!* 🔥`;
        body = `✨ *${effectiveTitle || 'धमाका सेल'}*\n🏷️ ${effectiveQuote || 'सर्वोत्तम क्वालिटी और सबसे कम दाम!'}${specialOfferLine}\n⚡ सीमित समय के लिए भारी छूट उपलब्ध है।`;
      } else if (offerType === 'stock') {
        intro = `📦 *${shop} पर नया फ्रेश स्टॉक आ गया है!* 🌟`;
        body = `✨ *ताज़ा माल व नया कलेक्शन!*\n🏷️ ${effectiveTitle || 'प्रीमियम क्वालिटी में नया सामान उपलब्ध'}\n🛒 आज ही दुकान पर पधारें या घर बैठे मंगवाएं।`;
      } else if (offerType === 'delivery') {
        intro = `🚚 *${shop} की फ्री होम डिलीवरी सेवा!* 📦`;
        body = `✨ *घर बैठे सामान मंगाएं!*\n🏷️ WhatsApp पर सामान की लिस्ट भेजें, सामान सीधे आपके दरवाजे पर।\n🛵 डिलीवरी एकदम सुरक्षित व तेज़।`;
      } else {
        intro = `🪔 *${shop} की ओर से हार्दिक शुभकामनाएं!* 🎁`;
        body = `✨ *त्योहार स्पेशल बचत ऑफर!*\n🏷️ ${effectiveTitle || 'हर खरीदारी पर विशेष उपहार और छूट'}\n🎉 अपने परिवार के साथ खुशियाँ मनाएं।`;
      }

      return `${intro}
${body}${city}${phone}${upi}${note}

👉 *हमारा ऑनलाइन डिजिटल पोस्टर व रेट लिस्ट यहाँ देखें (बिना किसी लॉगिन के):*
${posterWebLink}

🙏 _आपकी संतुष्टि ही हमारा विश्वास है! धन्यवाद!_`;
    } else {
      // English version
      if (offerType === 'sale') {
        intro = `🛍️ *Special Discount Offer from ${shop}!* 🔥`;
        body = `✨ *${effectiveTitle || 'Mega Sale'}*\n🏷️ ${effectiveQuote || 'Best Quality at Lowest Prices!'}${specialOfferLine}\n⚡ Heavy discounts available for a limited time.`;
      } else if (offerType === 'stock') {
        intro = `📦 *Fresh New Stock Arrived at ${shop}!* 🌟`;
        body = `✨ *Fresh Arrivals & New Collection!*\n🏷️ ${effectiveTitle || 'Premium quality products available'}\n🛒 Visit our store today or order from home.`;
      } else if (offerType === 'delivery') {
        intro = `🚚 *Free Home Delivery Service by ${shop}!* 📦`;
        body = `✨ *Order from the comfort of your home!*\n🏷️ Send your shopping list on WhatsApp, delivery right to your door.\n🛵 Safe, contactless, and quick delivery.`;
      } else {
        intro = `🪔 *Warm Greetings & Best Wishes from ${shop}!* 🎁`;
        body = `✨ *Festive Savings Special!*\n🏷️ ${effectiveTitle || 'Special gifts and discounts on every purchase'}\n🎉 Celebrate happiness with your family.`;
      }

      return `${intro}
${body}${city}${phone}${upi}${note}

👉 *View our Digital Poster & Store Catalog here:*
${posterWebLink}

🙏 _Your satisfaction is our pride! Thank you!_`;
    }
  }, [profile, template, offerType, customNote, posterWebLink, isHindi, customHeader, customQuote]);

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
              <span>{isHindi ? 'ऑटोमैटिक WhatsApp संदेश जनरेटर' : 'Automated WhatsApp Message'}</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                1-क्लिक शेयर
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {isHindi
                ? 'दुकान का नाम, ऑफर और सार्वजनिक पोस्टर लिंक पहले से तैयार हैं।'
                : 'Pre-filled with shop name, verified public link, and current offer.'}
            </p>
          </div>
        </div>

        {/* Public Domain Badge / Switcher */}
        <button
          type="button"
          onClick={() => setShowDomainSettings(!showDomainSettings)}
          className="text-[11px] text-sky-400 hover:text-sky-300 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span>{publicBaseDomain.replace('https://', '')}</span>
          <span className="text-[10px] text-emerald-400 font-bold">✓ पब्लिक</span>
        </button>
      </div>

      {/* Domain explanation / settings box */}
      {showDomainSettings && (
        <div className="p-3 rounded-2xl bg-slate-950 border border-sky-500/40 text-xs text-slate-300 space-y-2 animate-fadeIn">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-white block font-bold">
                {isHindi ? 'सार्वजनिक लिंक (Public Link Guarantee):' : 'Public Link Guarantee:'}
              </strong>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isHindi
                  ? 'ais-dev-... वाला लिंक केवल आपके Google खाते से खुलता है। ग्राहकों को भेजने के लिए हम हमेशा DukaanBrand Vercel लिंक का उपयोग करते हैं, जिससे कोई भी ग्राहक बिना किसी पासवर्ड या लॉगिन के तुरंत पोस्टर देख सके!'
                  : 'The ais-dev link requires your Google login. We use the public Vercel domain so any customer can open your poster without needing any login!'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="https://dukaan-brand.vercel.app"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-400 font-mono"
            />
            <button
              type="button"
              onClick={() => setCustomDomain(DEFAULT_PUBLIC_DOMAIN)}
              className="text-[11px] text-amber-400 hover:underline font-bold px-2"
            >
              रीसेट
            </button>
          </div>
        </div>
      )}

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
          <span>{isEn ? '🔥 Mega Discount' : isHi ? '🔥 महा डिस्काउंट' : '🔥 Maha Discount'}</span>
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
          <span>{isEn ? '📦 Fresh Stock' : isHi ? '📦 नया स्टॉक' : '📦 Naya Stock'}</span>
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
          <span>{isEn ? '🚚 Free Delivery' : isHi ? '🚚 फ्री डिलीवरी' : '🚚 Free Delivery'}</span>
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
          <span>{isEn ? '🪔 Festive' : isHi ? '🪔 पर्व व त्योहार' : '🪔 Parv / Festival'}</span>
        </button>
      </div>

      {/* Message Preview Box (Looks like WhatsApp Chat Bubble) */}
      <div className="relative rounded-2xl bg-[#0b141a] border border-emerald-900/40 p-3 sm:p-4 text-slate-200 text-xs sm:text-sm font-sans leading-relaxed shadow-inner">
        <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>{isHindi ? 'WhatsApp संदेश प्रीव्यू (Customer View)' : 'WhatsApp Message Preview'}</span>
          </span>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline text-[11px]"
          >
            {isEditing ? (isHindi ? '✓ हो गया' : 'Done') : (isHindi ? '✏️ अतिरिक्त रेट या लाइन जोड़ें' : '✏️ Add Custom Line')}
          </button>
        </div>

        {isEditing && (
          <div className="mb-2 p-2 rounded-xl bg-slate-900 border border-slate-700 animate-fadeIn">
            <label className="block text-[11px] text-slate-300 mb-1 font-bold">
              {isHindi ? 'अतिरिक्त लाइन (जैसे: चीनी ₹42/kg या शाम 8 बजे तक खुला है):' : 'Add custom note (e.g. Open till 9 PM or Rice ₹45/kg):'}
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder={isHindi ? 'उदा. आज शाम 7 बजे तक ही मान्य...' : 'e.g. Valid today only...'}
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
          <span>
            {isEn
              ? 'Send to WhatsApp (1-Click)'
              : isHi
              ? 'व्हाट्सएप पर तुरंत भेजें (1-क्लिक)'
              : 'WhatsApp Pe Turant Bhejein (1-Click)'}
          </span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 active:scale-98 transition-all cursor-pointer shadow-md"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-emerald-400">
                {isEn ? '✓ Message Copied!' : isHi ? '✓ संदेश कॉपी हो गया!' : '✓ Message Copy Ho Gaya!'}
              </span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {isEn ? 'Copy Message Text' : isHi ? 'संदेश कॉपी करें' : 'Message Copy Karein'}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
