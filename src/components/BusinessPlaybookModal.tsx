import React from 'react';
import { X, TrendingUp, CheckCircle2, Server, Globe, DollarSign, Rocket, Users, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface BusinessPlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const BusinessPlaybookModal: React.FC<BusinessPlaybookModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl relative my-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-6 flex items-start justify-between z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>₹10 Bharat Sachet Mastery</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {language === 'hinglish'
                ? 'इस दुकान ब्रांड ऐप से ₹10 लाख/महीना कैसे कमाएं?'
                : 'How to scale DukaanBrand to ₹10 Lakhs/month at Zero Cost'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {language === 'hinglish'
                ? 'आपका सपना: "फ्री में AI से बन जाए, Vercel पर ₹0 खर्च आए, और लोग खुद एक-दूसरे को बताएं"'
                : 'The blueprint to run this app with your own UPI ID on Vercel at zero server cost.'}
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
        <div className="p-6 space-y-6 text-sm">
          {/* Card 1: Why DukaanBrand is the Absolute #1 Best Idea */}
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 space-y-2">
            <h4 className="font-extrabold text-amber-400 flex items-center gap-2">
              <Users className="w-4 h-4" />
              {language === 'hinglish' ? '1. यह आइडिया सबसे बेस्ट क्यों है?' : '1. Why this is the ultimate viral product:'}
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {language === 'hinglish' ? (
                <>
                  भारत में <strong>6 करोड़ से अधिक छोटे दुकानदार</strong> हैं। हर दुकानदार की सबसे बड़ी इच्छा है कि लोग उसकी दुकान को जानें। सुबह उठते ही वह अपने ग्राहकों को WhatsApp Status पर "शुभ प्रभात / सुविचार" या त्योहार का पोस्टर भेजना चाहता है। पहले वह डिजाइनर को ₹200 देता था या बिना नाम का पोस्टर भेजता था। इस ऐप से <strong>सिर्फ 10 सेकंड में उसकी दुकान का ब्रांडेड पोस्टर</strong> तैयार हो जाता है।
                </>
              ) : (
                <>
                  Over 60M shopkeepers in India post good morning and festive quotes on WhatsApp status daily. Getting 30 custom branded posters with their shop name & phone for just ₹10/month eliminates 100% of purchase hesitation.
                </>
              )}
            </p>
          </div>

          {/* Card 2: The Zero-Cost Server Secret (Vercel) */}
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 space-y-2">
            <h4 className="font-extrabold text-emerald-400 flex items-center gap-2">
              <Server className="w-4 h-4" />
              {language === 'hinglish' ? '2. सर्वर का खर्च ₹0 कैसे रहेगा?' : '2. How server costs remain strictly ₹0:'}
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {language === 'hinglish' ? (
                <>
                  इस ऐप का सारा कोड <strong>100% Client-Side HTML5 Canvas</strong> में लिखा गया है। इसका मतलब है कि इमेज जनरेट करने का काम आपके किसी महंगे सर्वर पर नहीं, बल्कि <strong>यूजर के मोबाइल ब्राउज़र के अंदर</strong> होता है! आप इसे <strong>Vercel</strong> पर होस्ट करें। Vercel पर <strong>50 लाख लोग</strong> भी आएं तो भी आपका सर्वर बिल <strong>₹0 (शून्य रुपये)</strong> रहेगा!
                </>
              ) : (
                <>
                  100% Client-Side Canvas rendering. The heavy lifting of composing fonts, gradients, and images occurs in the customer mobile browser. Vercel simply serves static files, keeping hosting bills at ₹0.
                </>
              )}
            </p>
          </div>

          {/* Card 3: The WhatsApp Watermark Viral Loop */}
          <div className="bg-gradient-to-br from-amber-950/30 to-orange-950/20 rounded-2xl p-5 border border-amber-500/30 space-y-2">
            <h4 className="font-extrabold text-amber-300 flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              {language === 'hinglish' ? '3. लोग खुद एक-दूसरे को कैसे बताएंगे? (Viral Loop)' : '3. The Organic WhatsApp Billboard Engine:'}
            </h4>
            <p className="text-amber-100/90 leading-relaxed text-xs sm:text-sm">
              {language === 'hinglish' ? (
                <>
                  जब 1 दुकानदार पोस्टर बनाकर अपने WhatsApp Status पर लगाता है, तो उसके <strong>200 ग्राहक और 15 अन्य दुकानदार दोस्त</strong> उस स्टेटस को देखते हैं। पोस्टर के नीचे लिखा होता है:  
                  <span className="block mt-1 font-mono font-bold text-amber-300 bg-slate-900/80 p-2 rounded-lg border border-amber-500/30">
                    ⚡ अपनी दुकान का फ्री स्टेटस बनाएं: DukaanBrand.in
                  </span>
                  उसे देखकर बाकी 5 दुकानदार भी अपनी दुकान का पोस्टर बनाने आ जाते हैं। आपको फेसबुक या गूगल को <strong>₹1 भी विज्ञापन (Ad) का नहीं देना पड़ता!</strong>
                </>
              ) : (
                <>
                  Every poster shared on WhatsApp Status acts as a free billboard. Friends and fellow shopkeepers see the discreet attribution and immediately click to make their own.
                </>
              )}
            </p>
          </div>

          {/* Card 4: Revenue Numbers */}
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 space-y-3">
            <h4 className="font-extrabold text-sky-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              {language === 'hinglish' ? '4. कमाई का गणित (Pure Profit):' : '4. Pure Profit Mathematics:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">1,000 दुकानदार</span>
                <span className="text-base font-extrabold text-white">₹10,000 / महीना</span>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">10,000 दुकानदार</span>
                <span className="text-base font-extrabold text-amber-400">₹1,00,000 / महीना</span>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">1,00,000 दुकानदार</span>
                <span className="text-base font-extrabold text-emerald-400">₹10,00,000 / महीना!</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'hinglish'
                ? '* कोई ऑफिस नहीं, कोई कर्मचारी नहीं, 98% से अधिक शुद्ध मुनाफा सीधे आपके बैंक खाते में।'
                : '* Zero overhead, zero payroll, >98% pure recurring profit straight to your bank account.'}
            </p>
          </div>

          {/* Card 5: 3-Step Action Plan */}
          <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-white">
              {language === 'hinglish' ? '🚀 आप कल से क्या करें (Next Steps):' : 'Action Steps to Launch Tomorrow:'}
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
              <li>अपनी खुद की UPI ID (Google Pay / PhonePe) पेमेंट लिंक में डालें।</li>
              <li>इस कोड को Vercel पर फ्री में 5 मिनट में लाइव कर दें।</li>
              <li>अपने इलाके के 20 दुकानदारों को उनके नाम का पोस्टर फ्री में बनाकर WhatsApp पर भेजें।</li>
              <li>उनसे कहें: "भैया इसे स्टेटस पर लगा लो, दुकान की सेल बढ़ेगी!"</li>
              <li>बाकी दुकानदार खुद लिंक देखकर आएंगे और ₹10 Pro पे करेंगे।</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 p-4 sm:p-6 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm cursor-pointer transition-colors"
          >
            {language === 'hinglish' ? 'समझ आ गया, पोस्टर बनाएं' : 'Got it! Create Poster'}
          </button>
        </div>
      </div>
    </div>
  );
};
