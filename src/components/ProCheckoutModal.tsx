import React from 'react';
import { X, QrCode, Check, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface ProCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockPro: () => void;
  language: Language;
}

export const ProCheckoutModal: React.FC<ProCheckoutModalProps> = ({
  isOpen,
  onClose,
  onUnlockPro,
  language,
}) => {
  if (!isOpen) return null;

  const upiDeepLink = "upi://pay?pa=dukaanbrand@okaxis&pn=DukaanBrandPro&am=10&cu=INR&tn=DukaanBrand_Pro_Sub";

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-2 font-black text-xl shadow-lg shadow-orange-500/10">
            ₹10
          </div>
          <h3 className="font-extrabold text-xl text-white">
            {language === 'hinglish' ? 'दुकान ब्रांड VIP Pro अनलॉक करें' : 'Unlock DukaanBrand VIP Pro'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'hinglish' ? 'चाय से भी सस्ती ₹10 कीमत • एक महीने के लिए अनलिमिटेड पोस्टर' : 'Cheaper than tea • Unlimited posters for 30 days'}
          </p>
        </div>

        {/* Dynamic QR Code Box */}
        <div className="py-5 text-center space-y-4">
          <div className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-amber-400">
            <QrCode className="w-32 h-32 text-slate-900" />
            <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase mt-1">
              GPay / PhonePe / Paytm / BHIM
            </span>
          </div>

          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-sm">
            {language === 'hinglish' ? 'मात्र ₹10 / महीना' : 'Just ₹10 / Month'}
          </div>

          {/* Benefits */}
          <ul className="text-left text-xs text-slate-300 space-y-2.5 max-w-xs mx-auto pt-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'hinglish' ? 'सभी पोस्टरों से वाटरमार्क हमेशा के लिए गायब' : 'Remove all watermarks permanently'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'hinglish' ? 'दुकान का 100% वेरीफाइड गोल्ड ट्रस्ट बैज' : 'Verified Merchant gold trust seal on poster'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'hinglish' ? '200+ VIP त्योहार, सेल व सुविचार डिज़ाइन' : 'Unlock 200+ premium festival & sale designs'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'hinglish' ? 'फुल 4K अल्ट्रा-क्लियर डाउनलोड स्पीड' : 'Ultra-clear 4K export quality'}</span>
            </li>
          </ul>

          {/* 1-Click UPI Intent Link */}
          <a
            href={upiDeepLink}
            className="block w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold text-xs border border-sky-500/30 transition-colors"
          >
            📱 {language === 'hinglish' ? 'सीधे PhonePe / GPay ऐप में खोलें' : 'Open in PhonePe / GPay directly'}
          </a>

          {/* Simulate unlock button */}
          <button
            onClick={() => {
              onUnlockPro();
              onClose();
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{language === 'hinglish' ? 'सफलतापूर्वक प्रो अनलॉक करें (Simulate)' : 'Simulate Successful ₹10 Payment'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
