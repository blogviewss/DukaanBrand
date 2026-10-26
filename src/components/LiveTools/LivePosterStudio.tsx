import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../../types';
import { Download, Share2, Sparkles, Check, QrCode, Lock, ShieldCheck, RefreshCw } from 'lucide-react';

interface LivePosterStudioProps {
  language: Language;
}

interface TemplateOption {
  id: string;
  nameHinglish: string;
  nameEnglish: string;
  category: string;
  quoteHindi: string;
  quoteEnglish: string;
  subQuoteHindi: string;
  subQuoteEnglish: string;
  bgGradient: [string, string];
  accentColor: string;
  bannerTag: string;
}

const TEMPLATES: TemplateOption[] = [
  {
    id: 'morning-suvichar',
    nameHinglish: 'शुभ प्रभात सुविचार (Daily Morning)',
    nameEnglish: 'Daily Morning Suvichar',
    category: 'Daily',
    quoteHindi: 'कर्म ही पूजा है और ईमानदारी ही सबसे बड़ा व्यापार है।',
    quoteEnglish: 'Honesty is the greatest business asset. Have a blessed day!',
    subQuoteHindi: 'आपका हर दिन नई उम्मीद और सफलता लेकर आए।',
    subQuoteEnglish: 'May every sunrise bring peace and prosperity to your home.',
    bgGradient: ['#f97316', '#b91c1c'], // Orange to red
    accentColor: '#fef08a',
    bannerTag: '॥ ॐ श्री गणेशाय नमः ॥',
  },
  {
    id: 'festival-greeting',
    nameHinglish: 'त्योहार की शुभकामनाएं (Festival)',
    nameEnglish: 'Festival Celebration Poster',
    category: 'Festival',
    quoteHindi: 'पावन पर्व की आप सभी को सपरिवार हार्दिक बधाई व शुभकामनाएं!',
    quoteEnglish: 'Heartiest greetings of prosperity and joy to you and your family!',
    subQuoteHindi: 'मां लक्ष्मी की कृपा आप और आपके व्यापार पर सदैव बनी रहे।',
    subQuoteEnglish: 'May health, wealth, and boundless joy illuminate your lives.',
    bgGradient: ['#831843', '#4c0519'], // Deep crimson
    accentColor: '#facc15',
    bannerTag: '॥ शुभ दीपावली व धनतेरस ॥',
  },
  {
    id: 'special-discount',
    nameHinglish: 'दुकान का स्पेशल ऑफर (Store Sale)',
    nameEnglish: 'Store Mega Discount Offer',
    category: 'Business',
    quoteHindi: 'धमाका ऑफर! सभी सामानों पर 10% से 40% तक की भारी छूट!',
    quoteEnglish: 'Mega Festival Sale! Exclusive discount on all fresh arrivals!',
    subQuoteHindi: 'आज ही पधारें और बेहतरीन क्वालिटी का फायदा उठाएं।',
    subQuoteEnglish: 'Visit today for genuine quality and guaranteed best prices in town.',
    bgGradient: ['#0f766e', '#042f2e'], // Emerald teal
    accentColor: '#6ee7b7',
    bannerTag: '★ लिमिटेड टाइम महा-ऑफर ★',
  },
  {
    id: 'trust-quality',
    nameHinglish: 'भरोसा और शुद्धता (Trust & Quality)',
    nameEnglish: 'Customer Trust & Quality',
    category: 'Branding',
    quoteHindi: 'ग्राहकों का अटूट विश्वास ही हमारी असली पूंजी है।',
    quoteEnglish: 'Your trust is our greatest milestone. Serving with pure quality.',
    subQuoteHindi: 'हमेशा शुद्ध, असली और किफायती सामान आपके लिए।',
    subQuoteEnglish: 'Always authentic, affordable, and crafted with love.',
    bgGradient: ['#1e1b4b', '#312e81'], // Indigo night
    accentColor: '#93c5fd',
    bannerTag: '॥ विश्वास का 25 वर्षों का सफर ॥',
  },
];

export const LivePosterStudio: React.FC<LivePosterStudioProps> = ({ language }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form states
  const [shopName, setShopName] = useState('श्री बालाजी किराना स्टोर');
  const [phone, setPhone] = useState('98765-43210');
  const [address, setAddress] = useState('मेन बाजार, चौक मार्केट, दिल्ली');
  const [tagline, setTagline] = useState('शुद्धता और भरोसे का एक नाम');
  const [selectedTemplateId, setSelectedTemplateId] = useState('morning-suvichar');
  const [isProUnlocked, setIsProUnlocked] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const selectedTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  // Draw on Canvas whenever state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions: 1080 x 1350 (4:5 optimal for WhatsApp Status & Instagram)
    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;

    // 1. Background gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, selectedTemplate.bgGradient[0]);
    grad.addColorStop(1, selectedTemplate.bgGradient[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative ornate pattern / subtle circles
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.arc(width / 2, 380, 250 + i * 80, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.stroke();
    }
    ctx.restore();

    // 2. Top Banner Ribbon
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(80, 70, width - 160, 70);
    ctx.strokeStyle = selectedTemplate.accentColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(80, 70, width - 160, 70);

    ctx.fillStyle = selectedTemplate.accentColor;
    ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(selectedTemplate.bannerTag, width / 2, 118);

    // 3. Central Graphic / Mandala Placeholder
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 30;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.arc(width / 2, 350, 140, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = selectedTemplate.accentColor;
    ctx.stroke();

    // Center icon representation
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ ॐ ✨', width / 2, 375);
    ctx.restore();

    // 4. Main Quote (Hindi / Inspiring message)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 46px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';

    // Wrap text utility
    const wrapText = (text: string, x: number, startY: number, maxWidth: number, lineHeight: number) => {
      const words = text.split(' ');
      let line = '';
      let y = startY;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
      return y;
    };

    const quoteY = wrapText(selectedTemplate.quoteHindi, width / 2, 570, 880, 64);

    // Sub-quote
    ctx.fillStyle = selectedTemplate.accentColor;
    ctx.font = '500 32px "Plus Jakarta Sans", sans-serif';
    wrapText(selectedTemplate.subQuoteHindi, width / 2, quoteY + 60, 840, 48);

    // Decorative divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(180, 780);
    ctx.lineTo(width - 180, 780);
    ctx.stroke();

    // 5. Shop Branding Footer Card (The Game Changer!)
    const footerY = 820;
    const footerHeight = 440;

    // Card background
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 40;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    // Rounded top card
    ctx.roundRect(70, footerY, width - 140, footerHeight, 28);
    ctx.fill();
    ctx.restore();

    // Shop name header
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 50px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(shopName || 'आपकी दुकान का नाम', width / 2, footerY + 80);

    // Tagline
    ctx.fillStyle = '#64748b';
    ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(tagline || 'विश्वास और सेवा का प्रतीक', width / 2, footerY + 130);

    // Phone badge
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(width / 2 - 280, footerY + 165, 560, 68, 16);
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`📞 WhatsApp / Call: ${phone || '98765-XXXXX'}`, width / 2, footerY + 210);

    // Address
    ctx.fillStyle = '#475569';
    ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`📍 ${address || 'दुकान का पता व शहर'}`, width / 2, footerY + 280);

    // 6. VIRAL WATERMARK (The core organic growth mechanism!)
    if (!isProUnlocked) {
      // Free version: Subtle viral prompt that gets other shopkeepers to join
      ctx.fillStyle = '#ea580c';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('⚡ अपनी दुकान का फ्री स्टेटस पोस्टर बनाएं: DukaanPoster.in', width / 2, footerY + 375);
    } else {
      // Pro version (₹10/mo): Premium trust badge
      ctx.fillStyle = '#16a34a';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('✓ Verified Shop Partner • 100% Quality Guaranteed', width / 2, footerY + 375);
    }
  }, [shopName, phone, address, tagline, selectedTemplate, isProUnlocked]);

  // Download Handler (100% Client-side!)
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = canvas.toDataURL('image/jpeg', 0.95);
    const link = document.createElement('a');
    link.href = image;
    link.download = `${shopName.replace(/\s+/g, '_')}_Daily_Status.jpg`;
    link.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  // WhatsApp Share handler
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*${shopName}* की ओर से आप सभी को हार्दिक शुभकामनाएं!\n\n${selectedTemplate.quoteHindi}\n\n📞 संपर्क: ${phone}\n📍 पता: ${address}\n\n_बनाया गया: DukaanPoster.in पर सिर्फ 5 सेकंड में_`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {language === 'hinglish' 
                ? 'लाइव प्रोटोटाइप #1: WhatsApp दुकान व सुविचार पोस्टर इंजन' 
                : 'Live Prototype #1: WhatsApp Merchant Poster & Suvichar Engine'}
            </h3>
          </div>
          <p className="text-sm text-slate-400">
            {language === 'hinglish'
              ? 'यह असली काम करने वाला इंजन है। आप अपनी दुकान का नाम डालें और तुरंत पोस्टर डाउनलोड करके देखें!'
              : 'This is a real working prototype. Enter shop details and generate a WhatsApp-ready poster instantly.'}
          </p>
        </div>

        {/* Pro toggle badge */}
        <div className="flex items-center gap-2">
          {isProUnlocked ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>₹10 Pro Activated (No Watermark)</span>
            </div>
          ) : (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold cursor-pointer transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{language === 'hinglish' ? 'वाटरमार्क हटाएं (₹10/माह)' : 'Remove Watermark (₹10/mo)'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Inputs Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {language === 'hinglish' ? '1. दुकान का विवरण भरें' : '1. Enter Shop Details'}
            </h4>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {language === 'hinglish' ? 'दुकान या व्यापार का नाम' : 'Shop / Business Name'}
              </label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="उदा. श्री बालाजी किराना स्टोर"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {language === 'hinglish' ? 'WhatsApp / फोन नंबर' : 'Phone / WhatsApp'}
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="98765-XXXXX"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {language === 'hinglish' ? 'टैगलाइन / स्लोगन' : 'Store Tagline'}
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="शुद्धता और भरोसे का एक नाम"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {language === 'hinglish' ? 'दुकान का पता व शहर' : 'Shop Address & City'}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="मेन बाजार, चौक मार्केट, दिल्ली"
              />
            </div>
          </div>

          {/* Template Selection */}
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              {language === 'hinglish' ? '2. टेम्पलेट चुनें' : '2. Select Template'}
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((tmpl) => {
                const isSelected = tmpl.id === selectedTemplateId;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplateId(tmpl.id)}
                    className={`p-3 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-white font-semibold shadow-md'
                        : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-200">
                        {language === 'hinglish' ? tmpl.nameHinglish.split(' ')[0] : tmpl.nameEnglish.split(' ')[0]}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <span className="text-[11px] text-slate-400 block line-clamp-1">
                      {language === 'hinglish' ? tmpl.nameHinglish : tmpl.nameEnglish}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Why this tool works info box */}
          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-2xl p-4 text-xs text-emerald-200/90 leading-relaxed">
            <span className="font-bold text-emerald-300 block mb-1">
              💡 {language === 'hinglish' ? 'यह क्यों वायरल होता है?' : 'Why does this go viral?'}
            </span>
            {language === 'hinglish'
              ? 'दुकानदार इसे अपने 200+ ग्राहकों को WhatsApp Status पर लगाता है। नीचे लिखे लिंक को देखकर बाकी दुकानदार भी फ्री में बनाने आ जाते हैं। आपका सर्वर खर्च 0 रुपये रहता है क्योंकि सब कुछ यूजर के फोन में रेंडर होता है!'
              : 'Shopkeepers post this to their status daily. Other local merchants see it and generate theirs. Since canvas runs in the browser, your server cost is strictly ₹0!'}
          </div>
        </div>

        {/* Right Canvas Preview Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-2xl flex flex-col items-center max-w-[380px] w-full">
            {/* Aspect Ratio Preview container */}
            <div className="w-full relative rounded-xl overflow-hidden shadow-inner border border-slate-800">
              <canvas
                ref={canvasRef}
                className="w-full h-auto block object-contain"
                style={{ aspectRatio: '1080 / 1350' }}
              />
            </div>

            {/* Action Buttons underneath preview */}
            <div className="w-full grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={handleDownload}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'hinglish' ? 'डाउनलोड पोस्टर' : 'Download JPG'}</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{language === 'hinglish' ? 'WhatsApp स्टेटस' : 'Share Status'}</span>
              </button>
            </div>

            {downloadSuccess && (
              <div className="w-full mt-3 p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-medium animate-fadeIn">
                ✓ {language === 'hinglish' ? 'पोस्टर सफलतापूर्वक डाउनलोड हो गया!' : 'Poster downloaded successfully!'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Simulated ₹10 UPI Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ₹10
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">
                    {language === 'hinglish' ? '₹10/महीना Pro अपग्रेड डेमो' : '₹10/Month Pro Upgrade Simulation'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {language === 'hinglish' ? 'लाइव UPI पेमेंट फ्लो कैसे काम करता है' : 'How the live UPI flow converts users'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-5 text-center">
              {/* QR Mockup */}
              <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center mb-4">
                <QrCode className="w-36 h-36 text-slate-900" />
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                  Scan with GPay / PhonePe / Paytm
                </span>
              </div>

              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-extrabold text-sm mb-3">
                {language === 'hinglish' ? 'सिर्फ ₹10 / महीना' : 'Just ₹10 / Month'}
              </div>

              <ul className="text-left text-xs text-slate-300 space-y-2 mb-6 max-w-xs mx-auto">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{language === 'hinglish' ? 'सभी पोस्टरों से वॉटरमार्क हमेशा के लिए गायब' : 'Remove all watermarks completely'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{language === 'hinglish' ? '200+ प्रीमियम HD त्योहार व ऑफर डिज़ाइन' : 'Unlock 200+ festive & business templates'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{language === 'hinglish' ? 'रोज़ सुबह 7 बजे ऑटोमैटिक WhatsApp डिलीवरी' : 'Daily morning automated WhatsApp status delivery'}</span>
                </li>
              </ul>

              <button
                onClick={() => {
                  setIsProUnlocked(true);
                  setShowPaymentModal(false);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
              >
                {language === 'hinglish' ? 'सफलतापूर्वक पे करें (सिमुलेट ₹10 UPI)' : 'Simulate Successful ₹10 UPI Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
