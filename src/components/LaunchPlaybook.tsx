import React from 'react';
import { Language } from '../types';
import { Rocket, ShieldAlert, CheckCircle2, Zap, Server, Smartphone, Globe, CreditCard } from 'lucide-react';

interface LaunchPlaybookProps {
  language: Language;
}

export const LaunchPlaybook: React.FC<LaunchPlaybookProps> = ({ language }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-8">
      {/* Title */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Rocket className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {language === 'hinglish'
              ? '48 घंटे में ₹0 खर्चे में लॉन्च करने की गाइड (Playbook)'
              : 'The 48-Hour Zero-Budget Launch Masterclass'}
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          {language === 'hinglish'
            ? 'आपका सवाल: "App बनाऊं या Vercel पर? खर्चा न आए और 10 करोड़ तक पहुंच जाए?" — जानिए पूरी सच्चाई।'
            : 'Answers your critical dilemma: Mobile APK vs Web App on Vercel, UPI integration, and zero hosting costs.'}
        </p>
      </div>

      {/* Comparison: Vercel PWA vs Play Store APK */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          {language === 'hinglish'
            ? 'निर्णय: Play Store ऐप बनाएं या Vercel पर वेब ऐप (PWA)?'
            : 'Critical Decision: Google Play Store App vs Vercel Web App (PWA)?'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Card 1: Vercel Web App (Recommended) */}
          <div className="bg-emerald-950/20 border-2 border-emerald-500/50 rounded-2xl p-5 relative">
            <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
              Recommended (100% Zero Cost)
            </div>
            <h4 className="font-extrabold text-base text-emerald-300 mb-3 flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span>Vercel / Cloudflare PWA (वेब ऐप)</span>
            </h4>
            <ul className="space-y-2.5 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>होस्टिंग खर्च ₹0:</strong> Vercel और Netlify पर स्टैटिक रिएक्ट ऐप हमेशा के लिए 100% फ्री है। 50 लाख लोग भी आएं तो ₹1 बिल नहीं आएगा।
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Google को 30% टैक्स नहीं देना:</strong> प्ले स्टोर पर गूगल इन-ऐप परचेस से 30% काट लेता है (₹10 में से आपको सिर्फ ₹7 मिलते)। वेब पर PhonePe/UPI से पूरे ₹10 आपकी जेब में!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>डाउनलोड का झंझट नहीं:</strong> WhatsApp पर लिंक क्लिक करते ही ऐप 1 सेकंड में खुलता है। कोई 40MB डाउनलोड नहीं, कोई स्टोरेज फुल का बहाना नहीं।
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Add to Home Screen:</strong> यूजर 1 क्लिक में अपने फोन स्क्रीन पर ऐप का आइकन सेव कर सकता है जो बिल्कुल नॉर्मल ऐप जैसा खुलता है।
                </span>
              </li>
            </ul>
          </div>

          {/* Card 2: Play Store Native APK */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 opacity-90">
            <div className="text-rose-400 text-[10px] font-bold uppercase mb-1">High Friction & Costs</div>
            <h4 className="font-extrabold text-base text-slate-200 mb-3 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-slate-400" />
              <span>Google Play Store APK (नेटिव ऐप)</span>
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li className="flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>$25 (लगभग ₹2,100) फीस:</strong> गूगल प्ले कंसोल अकाउंट बनाने के लिए ही पैसे लगते हैं और पैन/पासपोर्ट वेरिफिकेशन चाहिए।
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>30% Google Cut:</strong> डिजिटल सर्विसेज पर गूगल अपना बिलिंग सिस्टम अनिवार्य करता है, जिससे आपका मुनाफा घट जाता है।
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>80% ड्रॉप-ऑफ:</strong> ग्रामीण व कस्बाई यूज़र्स 40MB का ऐप डाउनलोड करने में हिचकिचाते हैं।
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step by Step Zero Cost Architecture */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
          <Server className="w-4 h-4" />
          {language === 'hinglish' ? '3 गोल्डन रूल्स: जिससे 1 पैसे का भी सर्वर बिल न आए' : '3 Golden Architectural Rules for ₹0 Server Bills'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4">
            <span className="font-extrabold text-amber-400 text-sm block mb-1">1. 100% Canvas Rendering</span>
            <p className="text-slate-300 leading-relaxed">
              कभी भी इमेज जनरेट करने के लिए बैकएंड पायथन सर्वर या महंगा GPU मत लगाएं। ब्राउज़र के HTML5 Canvas से 0.05 सेकंड में मोबाइल पर इमेज बनती है।
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4">
            <span className="font-extrabold text-sky-400 text-sm block mb-1">2. Local JSON Data</span>
            <p className="text-slate-300 leading-relaxed">
              सरकारी योजनाओं के नियम या सुविचार कोट्स को डेटाबेस के बजाय सीधे कोड में JSON अरे में रखें। डेटाबेस के पैसे बचेंगे और स्पीड सुपरफास्ट होगी।
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4">
            <span className="font-extrabold text-emerald-400 text-sm block mb-1">3. Direct UPI Intent Link</span>
            <p className="text-slate-300 leading-relaxed">
              `upi://pay?pa=yourUpi&pn=YourApp&am=10` का उपयोग करें। यूजर बटन दबाते ही सीधे GPay/PhonePe में पहुँच जाता है।
            </p>
          </div>
        </div>
      </div>

      {/* Monetization & UPI Setup */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-3 text-xs">
        <h4 className="font-bold text-sm text-white flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-amber-400" />
          {language === 'hinglish' ? '₹10 पेमेंट कलेक्ट कैसे करें? (UPI Setup)' : 'How to Collect ₹10 UPI Micro-Payments:'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
          <div>
            <strong className="text-white block mb-0.5">विकल्प 1: भारत QR कोड (Day 1 - Zero Setup)</strong>
            <p className="text-slate-400">
              ऐप में एक पॉपअप खोलें जिसमें आपका Google Pay/PhonePe का QR कोड दिखे और ₹10 लिखा हो। यूजर स्कैन करके स्क्रीनशॉट अपलोड कर दे या UTR नंबर डाल दे।
            </p>
          </div>
          <div>
            <strong className="text-white block mb-0.5">विकल्प 2: PhonePe / Razorpay Payment Gateway (Scale)</strong>
            <p className="text-slate-400">
              PhonePe Payment Gateway या Cashfree ऑटोमैटिक ₹10/माह UPI AutoPay सपोर्ट करते हैं, जिसमें हर महीने ग्राहक के खाते से ₹10 ऑटो-कट होकर आपके बैंक में आ जाते हैं।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
