import React, { useState } from 'react';
import { ShopProfile, CanvasFormat, CategoryFilter } from './types/dukaan';
import { TEMPLATES_DATA, Template } from './data/templates';
import { Language } from './types';
import { DukaanHeader } from './components/DukaanHeader';
import { ShopProfileForm } from './components/ShopProfileForm';
import { TemplateSelector } from './components/TemplateSelector';
import { CanvasRenderer } from './components/CanvasRenderer';
import { ProCheckoutModal } from './components/ProCheckoutModal';
import { BusinessPlaybookModal } from './components/BusinessPlaybookModal';
import { HostingGuideModal } from './components/HostingGuideModal';
import { RevenueCalculator } from './components/RevenueCalculator';
import { Sparkles, Zap, Calculator, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('hinglish');
  const [isPro, setIsPro] = useState<boolean>(false);
  const [format, setFormat] = useState<CanvasFormat>('story');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES_DATA[0]);

  // Modals state
  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);
  const [isPlaybookOpen, setIsPlaybookOpen] = useState<boolean>(false);
  const [isHostingGuideOpen, setIsHostingGuideOpen] = useState<boolean>(false);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);

  // Shop Profile State
  const [profile, setProfile] = useState<ShopProfile>({
    shopName: 'श्री बालाजी किराना व सुपर स्टोर',
    ownerName: 'रमेश कुमार जी',
    phone: '98765-43210',
    city: 'मेन बाजार, चौक मार्केट, दिल्ली',
    tagline: 'शुद्धता और भरोसे का 25 वर्षों का सफर',
    logoUrl: null,
  });

  const handleProfileChange = (updated: Partial<ShopProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <DukaanHeader
        language={language}
        onLanguageChange={setLanguage}
        isPro={isPro}
        onOpenProModal={() => setIsProModalOpen(true)}
        onOpenPlaybook={() => setIsPlaybookOpen(true)}
        onOpenHostingGuide={() => setIsHostingGuideOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 w-full">
        {/* Top Announcement / Value Strip */}
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-amber-300">
                {language === 'hinglish' ? 'नंबर 1 सबसे आसान व अधिक बिकने वाला वायरल ऐप:' : 'The #1 Easiest & Most High-Converting Viral App:'}
              </span>
              <span className="text-slate-300 ml-1">
                {language === 'hinglish'
                  ? 'दुकानदार का नाम, फोटो व मोबाइल नंबर वाला रोज़ाना WhatsApp स्टेटस पोस्टर 10 सेकंड में!'
                  : 'Daily custom WhatsApp status posters with shop name & phone in 10s!'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaybookOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/30 transition-colors cursor-pointer"
            >
              {language === 'hinglish' ? '💡 यह बिज़नेस कैसे काम करता है?' : '💡 How this business works'}
            </button>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>{showCalculator ? 'कैलकुलेटर छिपाएं' : 'कमाई कैलकुलेटर'}</span>
            </button>
          </div>
        </div>

        {/* Conditional Revenue Calculator */}
        {showCalculator && (
          <div className="animate-fadeIn">
            <RevenueCalculator language={language} />
          </div>
        )}

        {/* Main Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Inputs & Template Selection - 6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step 1: Shop Profile */}
            <section className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="font-extrabold text-base text-white">
                  {language === 'hinglish' ? 'दुकान की जानकारी भरें' : 'Enter Shop Details'}
                </h3>
              </div>
              <ShopProfileForm
                profile={profile}
                onChange={handleProfileChange}
                format={format}
                onFormatChange={setFormat}
                language={language}
              />
            </section>

            {/* Step 2: Choose Template */}
            <section className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="font-extrabold text-base text-white">
                  {language === 'hinglish' ? 'पोस्टर व सुविचार डिज़ाइन चुनें' : 'Select Poster Theme'}
                </h3>
              </div>
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
                language={language}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </section>
          </div>

          {/* Right Column (Canvas Preview & Export - 6 cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="font-extrabold text-base text-white">
                  {language === 'hinglish' ? 'लाइव पोस्टर प्रिव्यू व डाउनलोड' : 'Live Preview & Instant Download'}
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ✓ 100% Client-Side Canvas
              </span>
            </div>

            <CanvasRenderer
              profile={profile}
              template={selectedTemplate}
              format={format}
              isPro={isPro}
              language={language}
              onOpenProModal={() => setIsProModalOpen(true)}
            />

            {/* Why This Works (Educational Note) */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 space-y-2">
              <strong className="text-amber-400 block font-bold">
                🚀 {language === 'hinglish' ? 'वायरल होने का सीक्रेट:' : 'The Viral Mechanism:'}
              </strong>
              <p className="leading-relaxed">
                {language === 'hinglish'
                  ? 'जब दुकानदार यह पोस्टर डाउनलोड करके अपने WhatsApp Status पर लगाएगा, तो उसके 200+ ग्राहक व साथी दुकानदार नीचे लिखा लिंक देखेंगे और वे भी फ्री में अपना पोस्टर बनाने आपकी वेबसाइट पर आएंगे। आपका सर्वर खर्च 0 रुपये है क्योंकि सब कुछ यूजर के फोन में रेंडर होता है!'
                  : 'When the shopkeeper posts this on WhatsApp status, 200+ contacts see it with your subtle attribution footer. Friends ask to make theirs, creating an organic compound growth loop at zero server cost!'}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Pro Checkout Modal */}
      <ProCheckoutModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        onUnlockPro={() => setIsPro(true)}
        language={language}
      />

      {/* Business Blueprint Playbook Modal */}
      <BusinessPlaybookModal
        isOpen={isPlaybookOpen}
        onClose={() => setIsPlaybookOpen(false)}
        language={language}
      />

      {/* Hosting & Live URL Guide Modal */}
      <HostingGuideModal
        isOpen={isHostingGuideOpen}
        onClose={() => setIsHostingGuideOpen(false)}
        language={language}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">दुकान ब्रांड (DukaanBrand)</span>
            <span>·</span>
            <span>₹10 Sachet WhatsApp Poster SaaS</span>
          </div>
          <p className="text-slate-400">
            {language === 'hinglish'
              ? '100% क्लाइंट-साइड HTML5 Canvas • Vercel पर ₹0 होस्टिंग खर्च'
              : '100% Client-Side Canvas • ₹0 Hosting on Vercel'}
          </p>
        </div>
      </footer>
    </div>
  );
}
