import React, { useState } from 'react';
import { Lightbulb, Sparkles, RefreshCw, TrendingUp } from 'lucide-react';
import { Language } from '../types';

interface SalesTipsCardProps {
  shopName?: string;
  language?: Language;
}

const SALES_TIPS_HINDI = [
  {
    category: 'WhatsApp ट्रिक',
    tip: 'रोजाना सुबह 8 बजे WhatsApp स्टेटस पर "सुप्रभात + आज का स्पेशल ऑफर" लगाएं, 30% ग्राहक स्टेटस देखकर सीधे ऑर्डर देते हैं।',
  },
  {
    category: 'काउंटर जुगाड़',
    tip: 'काउंटर पर दुकान का QR कोड और "फ्री होम डिलीवरी" बोर्ड लगाएं, महिलाएं घर बैठे WhatsApp पर लिस्ट भेजेंगी।',
  },
  {
    category: 'ग्राहक का भरोसा',
    tip: 'हर ₹500 से ऊपर की खरीदारी पर ₹5 की टॉफी या छोटा बिस्कुट गिफ्ट दें, ग्राहक बार-बार आपकी ही दुकान पर आएगा।',
  },
  {
    category: 'फेस्टिवल बिक्री',
    tip: 'त्योहार से 3 दिन पहले नियमित ग्राहकों को पर्सनल WhatsApp शुभकामना संदेश भेजें, इससे बिक्री दोगुनी हो जाती है।',
  },
  {
    category: 'डिस्प्ले सीक्रेट',
    tip: 'दुकान के बाहर सबसे ज्यादा बिकने वाला माल सजाकर रखें, आने-जाने वाले लोगों की नजर पड़ते ही बिक्री बढ़ती है।',
  },
  {
    category: 'उधारी का हल',
    tip: 'उधार मांगने वाले ग्राहक से मुस्कुराकर कहें - "भैया UPI से पेमेंट कर दीजिए, आपको ₹10 का विशेष डिस्काउंट मिलेगा"।',
  },
  {
    category: 'नया स्टॉक अलर्ट',
    tip: 'दुकान में कोई भी नया सामान आते ही उसका 10-सेकंड पोस्टर बनाकर स्टेटस लगाएं, शाम तक आधा माल बिक जाएगा।',
  },
  {
    category: 'संडे ऑफर',
    tip: 'रविवार की शाम को कॉम्बो पैक (जैसे चायपत्ती + चीनी + बिस्कुट) का ₹15 सस्ता ऑफर स्टेटस पर लगाएं।',
  },
  {
    category: 'कस्टमर लिस्ट',
    tip: 'ग्राहकों का नंबर डायरी में सेव करके "Dukaan VIP" WhatsApp ब्रॉडकास्ट ग्रुप बनाएं और हफ्ते में 2 बार ऑफर भेजें।',
  },
  {
    category: 'दुकान माहौल',
    tip: 'दुकान में सुबह और शाम धीमी आवाज में मधुर भजन या भक्ति संगीत बजाएं, इससे ग्राहक शांति से ज्यादा खरीदारी करते हैं।',
  },
];

const SALES_TIPS_ENGLISH = [
  {
    category: 'WhatsApp Trick',
    tip: 'Post a "Good Morning + Today Special Offer" status at 8 AM daily; 30% of customers order directly upon viewing!',
  },
  {
    category: 'Counter Setup',
    tip: 'Keep your store QR code and a "Free Home Delivery" board on counter so neighborhood families order easily via WhatsApp.',
  },
  {
    category: 'Customer Loyalty',
    tip: 'Offer a complimentary small treat or discount on purchases above ₹500 to turn one-time buyers into loyal regulars.',
  },
  {
    category: 'Festival Rush',
    tip: 'Send personalized festival greetings with your branded poster 3 days early to double your seasonal sales volume.',
  },
  {
    category: 'Display Trick',
    tip: 'Showcase popular daily-need items near store entrance to catch immediate shopper attention and boost walk-in orders.',
  },
  {
    category: 'No-Credit Trick',
    tip: 'Politely inform customers: "Pay via UPI today and enjoy an instant ₹10 cash discount on your total bill".',
  },
  {
    category: 'New Stock Alert',
    tip: 'Whenever fresh inventory arrives, share a 10-second branded status to sell out half the stock before evening.',
  },
  {
    category: 'Sunday Combo',
    tip: 'Promote bundle packs on Sunday afternoons (e.g. Tea + Sugar + Snacks) at bundled savings to clear inventory.',
  },
  {
    category: 'Customer Group',
    tip: 'Save customer phone numbers to a WhatsApp Broadcast list and send updates twice a week for consistent footfall.',
  },
  {
    category: 'Store Ambience',
    tip: 'Maintain clean shelves and gentle background music so shoppers enjoy browsing longer and buy more.',
  },
];

export const SalesTipsCard: React.FC<SalesTipsCardProps> = ({ language = 'hinglish' }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const tips = language === 'english' ? SALES_TIPS_ENGLISH : SALES_TIPS_HINDI;

  const nextTip = () => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
      setIsRotating(false);
    }, 150);
  };

  const current = tips[currentTipIndex];

  return (
    <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/30 rounded-2xl p-3 sm:p-4 shadow-lg backdrop-blur-sm transition-all hover:border-amber-500/50">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
            <Lightbulb className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                {language === 'english' ? `Store Sales Tip #${currentTipIndex + 1}` : `दुकानदार कमाई टिप #${currentTipIndex + 1}`}
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                {current.category}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-100 mt-0.5 leading-snug">
              {current.tip}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={nextTip}
          className="shrink-0 flex items-center gap-1 text-[11px] font-black text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1.5 rounded-xl border border-amber-500/30 transition-all cursor-pointer active:scale-95"
          title={language === 'english' ? 'View Next Tip' : 'अगला टिप देखें'}
        >
          <RefreshCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{language === 'english' ? 'Next Tip' : 'अगला टिप'}</span>
        </button>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1 text-slate-400">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>{language === 'english' ? 'Try this actionable tip at your shop today' : 'इस टिप को अपनी दुकान में आज ही आजमाएं'}</span>
        </span>
        <button
          type="button"
          onClick={nextTip}
          className="text-amber-400/80 hover:text-amber-300 underline font-semibold text-[10px] sm:hidden"
        >
          {language === 'english' ? 'Next Tip →' : 'बदलें (Next) →'}
        </button>
      </div>
    </div>
  );
};
