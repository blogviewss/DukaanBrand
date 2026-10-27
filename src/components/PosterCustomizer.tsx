import React from 'react';
import { Template } from '../data/templates';
import { Language } from '../types';
import { Edit3, RotateCcw, Sparkles, Palette, Type, MessageCircle } from 'lucide-react';

interface PosterCustomizerProps {
  template: Template;
  customHeader: string;
  customQuote: string;
  customSubQuote: string;
  customAccent: string;
  language: Language;
  onUpdate: (field: 'header' | 'quote' | 'subQuote' | 'accent', value: string) => void;
  onReset: () => void;
}

export const PosterCustomizer: React.FC<PosterCustomizerProps> = ({
  template,
  customHeader,
  customQuote,
  customSubQuote,
  customAccent,
  language,
  onUpdate,
  onReset,
}) => {
  const isEn = language === 'english';
  const isHi = language === 'hindi';
  const isHindiText = language !== 'english';

  const defaultHeader = isEn ? template.headerTagEnglish : template.headerTagHindi;
  const defaultQuote = isEn ? template.mainQuoteEnglish : template.mainQuoteHindi;
  const defaultSubQuote = isEn ? template.subQuoteEnglish : template.subQuoteHindi;

  // Preset ready-to-use quick quotes for Indian shopkeepers
  const quickSuggestions = [
    {
      label: '🔥 महा सेल',
      header: isEn ? '॥ MEGA DISCOUNT SALE ॥' : isHi ? '॥ महा बचत सेल ॥' : '॥ Maha Bachat Sale ॥',
      quote: isEn ? 'Huge discount of 10% to 40% on all quality products!' : isHi ? 'सभी सामानों पर 10% से 40% तक की भारी छूट उपलब्ध है!' : 'Sabhi saaman par 10% se 40% tak discount available!',
      subQuote: isEn ? 'Limited time offer — visit our store today!' : isHi ? 'सीमित समय के लिए ऑफर — आज ही पधारें!' : 'Limited time offer — aaj hi dukaan visit karein!',
    },
    {
      label: '📦 नया माल',
      header: isEn ? '॥ FRESH NEW STOCK ॥' : isHi ? '॥ नया ताज़ा स्टॉक ॥' : '॥ Naya Taaza Stock ॥',
      quote: isEn ? 'Fresh new premium collection now in stock!' : isHi ? 'दुकान पर बिल्कुल नया और ताज़ा माल आ चुका है।' : 'Dukaan par bilkul naya aur fresh stock aa chuka hai.',
      subQuote: isEn ? 'Best quality guaranteed at reasonable rates.' : isHi ? 'सर्वोत्तम क्वालिटी और सबसे उचित दाम की गारंटी।' : 'Best quality aur sabse sahi rates ki guarantee.',
    },
    {
      label: '🚚 होम डिलीवरी',
      header: isEn ? '॥ FREE HOME DELIVERY ॥' : isHi ? '॥ फ्री होम डिलीवरी ॥' : '॥ Free Home Delivery ॥',
      quote: isEn ? 'Order grocery from home via WhatsApp, delivery free!' : isHi ? 'घर बैठे WhatsApp पर सामान मंगाएं, डिलीवरी बिल्कुल फ्री!' : 'Ghar baithe WhatsApp par order karein, delivery bilkul free!',
      subQuote: isEn ? 'Send your list on WhatsApp, quick delivery to your door.' : isHi ? 'WhatsApp पर लिस्ट भेजें और 30 मिनट में सामान पाएं।' : 'WhatsApp par list bhejein aur jaldi delivery paayein.',
    },
    {
      label: '🚫 उधार बंद',
      header: isEn ? '॥ IMPORTANT NOTICE ॥' : isHi ? '॥ जरूरी सूचना ॥' : '॥ Zaroori Suchna ॥',
      quote: isEn ? 'Cash today, credit never. Please do not ask for credit.' : isHi ? 'आज नगद कल उधार — कृपया उधारी मांग कर शर्मिंदा न करें।' : 'Aaj nagad kal udhar — kripya udhari na maangein.',
      subQuote: isEn ? 'Good relations and transparent cash business. Thank you!' : isHi ? 'प्यार से व्यापार, सिर्फ नगद व्यवहार। धन्यवाद!' : 'Pyar se vyapar, sirf nagad vyavahar. Dhanyawad!',
    },
    {
      label: '☀️ सुविचार',
      header: isEn ? '॥ GOOD MORNING ॥' : isHi ? '॥ शुभ प्रभात ॥' : '॥ Shubh Prabhat ॥',
      quote: isEn ? 'Honesty and hard work are the foundation of true success.' : isHi ? 'ईमानदारी और मेहनत ही व्यापार की सबसे बड़ी पूंजी है।' : 'Imaandari aur mehnat hi vyapar ki sabse badi poonji hai.',
      subQuote: isEn ? 'Wishing you a prosperous, joyous, and peaceful day ahead.' : isHi ? 'आपका आज का दिन सुखमय, मंगलमय और लाभकारी हो।' : 'Aapka aaj ka din shubh aur laabhkaari ho.',
    },
    {
      label: '🪔 पर्व/त्योहार',
      header: isEn ? '॥ FESTIVE GREETINGS ॥' : isHi ? '॥ हार्दिक शुभकामनाएं ॥' : '॥ Hardik Shubhkamnayein ॥',
      quote: isEn ? 'Wishing you and your family joy, peace, and abundance on this festival.' : isHi ? 'पर्व और त्योहार पर आपके परिवार में सुख, शांति और समृद्धि आए।' : 'Tyohar par aapke parivar me sukh aur samriddhi aaye.',
      subQuote: isEn ? 'Special festive gifts & discounts on every purchase.' : isHi ? 'हर खरीदारी पर विशेष उपहार और बंपर छूट उपलब्ध।' : 'Har khareedari par special gift aur discount uplabdh.',
    },
  ];

  // Palette color options
  const colorOptions = [
    { name: 'गोल्ड (Gold)', value: '#f59e0b', bgClass: 'bg-amber-500' },
    { name: 'केसरिया (Saffron)', value: '#f97316', bgClass: 'bg-orange-500' },
    { name: 'लाल (Crimson)', value: '#ef4444', bgClass: 'bg-red-500' },
    { name: 'हरा (Emerald)', value: '#10b981', bgClass: 'bg-emerald-500' },
    { name: 'नीला (Ocean)', value: '#0ea5e9', bgClass: 'bg-sky-500' },
    { name: 'गुलाबी (Rose)', value: '#ec4899', bgClass: 'bg-pink-500' },
  ];

  const hasCustomEdits =
    customHeader.trim() !== '' ||
    customQuote.trim() !== '' ||
    customSubQuote.trim() !== '' ||
    customAccent !== '';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4 text-white shadow-xl">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold shrink-0">
            <Edit3 className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
              <span>
                {isEn
                  ? 'Customize Poster (Edit Text & Colors)'
                  : isHi
                  ? 'पोस्टर कस्टमाइज़ करें (अपनी मर्जी से लिखें)'
                  : 'Poster Customize Karein (Apni Marzi Se Likhein)'}
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              {isEn
                ? 'Edit headline, main offer quote, or accent colors in real-time'
                : isHi
                ? 'पोस्टर पर लिखे शब्द, रेट या ऑफर अपनी दुकान अनुसार बदलें'
                : 'Poster par likhe shabd, rate ya offer apni dukaan mutabik badlein'}
            </p>
          </div>
        </div>

        {hasCustomEdits && (
          <button
            type="button"
            onClick={onReset}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-bold flex items-center gap-1 cursor-pointer border border-rose-500/30 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isEn ? 'Reset to Default' : isHi ? 'डिफ़ॉल्ट रीसेट करें' : 'Reset Karein'}</span>
          </button>
        )}
      </div>

      {/* 1-Tap Quick Suggestions */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase text-amber-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {isEn
              ? '1-Click Ready Messages (Auto-Fill):'
              : isHi
              ? '1-क्लिक रेडीमेड संदेश (ऑटो-फिल):'
              : '1-Click Ready Messages (Auto-Fill):'}
          </span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {quickSuggestions.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onUpdate('header', item.header);
                onUpdate('quote', item.quote);
                onUpdate('subQuote', item.subQuote);
              }}
              className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-amber-400/50 transition-colors cursor-pointer active:scale-95"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text Inputs */}
      <div className="space-y-3 pt-1">
        {/* Top Header Tag */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEn ? 'Top Banner Title (Tag):' : isHi ? 'ऊपर का बैनर शीर्षक:' : 'Upar Ka Banner Title (Tag):'}</span>
          </label>
          <input
            type="text"
            value={customHeader !== '' ? customHeader : defaultHeader}
            onChange={(e) => onUpdate('header', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 font-bold"
            placeholder={defaultHeader}
          />
        </div>

        {/* Main Quote / Announcement */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {isEn
                ? 'Main Announcement / Offer Quote:'
                : isHi
                ? 'पोस्टर का मुख्य संदेश / ऑफर:'
                : 'Poster Ka Mukhya Sandesh / Offer:'}
            </span>
          </label>
          <textarea
            rows={2}
            value={customQuote !== '' ? customQuote : defaultQuote}
            onChange={(e) => onUpdate('quote', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 resize-none font-medium leading-relaxed"
            placeholder={defaultQuote}
          />
        </div>

        {/* Sub-quote / Additional note */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{isEn ? 'Sub-headline / Extra Note:' : isHi ? 'अतिरिक्त लाइन या उपशीर्षक:' : 'Extra Line / Subtitle:'}</span>
          </label>
          <input
            type="text"
            value={customSubQuote !== '' ? customSubQuote : defaultSubQuote}
            onChange={(e) => onUpdate('subQuote', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            placeholder={defaultSubQuote}
          />
        </div>

        {/* Accent Color Picker */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-orange-400" />
            <span>{isEn ? 'Select Highlight Accent Color:' : isHi ? 'बॉर्डर व हाइलाइट का रंग चुनें:' : 'Border Aur Theme Color Chunein:'}</span>
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {colorOptions.map((c) => {
              const activeColor = customAccent || template.accentColor;
              const isSelected = activeColor.toLowerCase() === c.value.toLowerCase();
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => onUpdate('accent', c.value)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                    isSelected
                      ? 'border-white bg-slate-800 text-white shadow-md'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${c.bgClass} inline-block shadow-sm`} />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
