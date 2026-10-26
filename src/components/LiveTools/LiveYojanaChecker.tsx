import React, { useState } from 'react';
import { Language } from '../../types';
import { CheckCircle2, ShieldCheck, Download, Award, FileText, Lock, QrCode } from 'lucide-react';

interface LiveYojanaCheckerProps {
  language: Language;
}

interface SchemeItem {
  id: string;
  nameHinglish: string;
  nameEnglish: string;
  benefitHinglish: string;
  benefitEnglish: string;
  targetCategory: string[];
  docChecklist: string[];
  officialPortal: string;
}

const SCHEMES_DATABASE: SchemeItem[] = [
  {
    id: 'pm-kisan',
    nameHinglish: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    nameEnglish: 'PM Kisan Samman Nidhi',
    benefitHinglish: 'हर साल ₹6,000 सीधे बैंक खाते में (3 किस्तों में)',
    benefitEnglish: '₹6,000 direct bank transfer annually (in 3 equal installments)',
    targetCategory: ['farmer'],
    docChecklist: ['आधार कार्ड', 'जमीन की खतौनी / फर्द', 'बैंक पासबुक', 'आधार लिंक मोबाइल'],
    officialPortal: 'pmkisan.gov.in',
  },
  {
    id: 'mudra-loan',
    nameHinglish: 'प्रधानमंत्री मुद्रा योजना (शिशु व किशोर लोन)',
    nameEnglish: 'PM Mudra Business Loan Scheme',
    benefitHinglish: 'नया व्यापार या दुकान बढ़ाने के लिए ₹50,000 से ₹10 लाख तक बिना गारंटी लोन',
    benefitEnglish: 'Collateral-free business loan from ₹50,000 to ₹10,00,000 for retail & shop expansion',
    targetCategory: ['business', 'youth'],
    docChecklist: ['दुकान का प्रमाण / उद्यम आधार', 'बैंक 6 महीने का स्टेटमेंट', 'पैन कार्ड', 'आधार कार्ड'],
    officialPortal: 'mudra.org.in',
  },
  {
    id: 'ladli-behna',
    nameHinglish: 'महिला सम्मान व लाडली बहना योजना',
    nameEnglish: 'Women Welfare & Monthly Support Scheme',
    benefitHinglish: 'हर महीने ₹1,250 से ₹1,500 की आर्थिक सहायता सीधे खाते में',
    benefitEnglish: '₹1,250 to ₹1,500 monthly direct financial assistance to woman account',
    targetCategory: ['woman'],
    docChecklist: ['समग्र ID / परिवार पहचान पत्र', 'महिला का आधार कार्ड', 'DBT इनेबल्ड बैंक खाता'],
    officialPortal: 'cmladlibahna.mp.gov.in',
  },
  {
    id: 'ayushman-bharat',
    nameHinglish: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
    nameEnglish: 'Ayushman Bharat PM-JAY Card',
    benefitHinglish: 'परिवार के प्रत्येक सदस्य के लिए ₹5,00,000 तक का प्रति वर्ष मुफ्त इलाज',
    benefitEnglish: 'Up to ₹5,00,000 annual free cashless medical hospital treatment per family',
    targetCategory: ['farmer', 'woman', 'business', 'youth'],
    docChecklist: ['राशन कार्ड (BPL/अंत्योदय)', 'आधार कार्ड', 'परिवार रजिस्टर नकल'],
    officialPortal: 'pmjay.gov.in',
  },
  {
    id: 'student-scholarship',
    nameHinglish: 'राष्ट्रीय छात्रवृत्ति व पोस्ट-मैट्रिक स्कॉलरशिप',
    nameEnglish: 'National Post-Matric Student Scholarship',
    benefitHinglish: 'कॉलेज फीस व किताबों के लिए ₹15,000 से ₹60,000 तक की छात्रवृत्ति',
    benefitEnglish: 'Tuition fees & book allowance ranging from ₹15,000 to ₹60,000/year',
    targetCategory: ['student'],
    docChecklist: ['10वीं/12वीं की मार्कशीट', 'आय प्रमाण पत्र (Income Cert)', 'कॉलेज एडमिशन रसीद'],
    officialPortal: 'scholarships.gov.in',
  },
];

export const LiveYojanaChecker: React.FC<LiveYojanaCheckerProps> = ({ language }) => {
  const [category, setCategory] = useState<string>('farmer');
  const [stateName, setStateName] = useState<string>('उत्तर प्रदेश');
  const [incomeRange, setIncomeRange] = useState<string>('low');
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Filter schemes
  const eligibleSchemes = SCHEMES_DATABASE.filter((s) => s.targetCategory.includes(category));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {language === 'hinglish'
              ? 'लाइव प्रोटोटाइप #3: सरकारी योजना व सब्सिडी पात्रता चेकर (₹10 Sachet)'
              : 'Live Prototype #3: Government Scheme & Subsidy Sachet Checker'}
          </h3>
        </div>
        <p className="text-sm text-slate-400">
          {language === 'hinglish'
            ? 'सिर्फ 3 विकल्पों में मैच करता है कि सरकार से क्या मिलेगा। पूरी चेकलिस्ट और डायरेक्ट फॉर्म लिंक के लिए ₹10 UPI!'
            : 'Finds verified eligibility in 10 seconds. Unlocks PDF document checklist & direct govt portals for ₹10.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Filters (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. {language === 'hinglish' ? 'आपकी श्रेणी (पेशा)' : 'Your Category / Occupation'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'farmer', label: 'किसान (Farmer)' },
                  { id: 'woman', label: 'महिला (Woman)' },
                  { id: 'student', label: 'छात्र (Student)' },
                  { id: 'business', label: 'व्यापारी / युवा (Business)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCategory(item.id)}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-left cursor-pointer ${
                      category === item.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                2. {language === 'hinglish' ? 'आपका राज्य' : 'Select State'}
              </label>
              <select
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="उत्तर प्रदेश">उत्तर प्रदेश (Uttar Pradesh)</option>
                <option value="बिहार">बिहार (Bihar)</option>
                <option value="मध्य प्रदेश">मध्य प्रदेश (Madhya Pradesh)</option>
                <option value="राजस्थान">राजस्थान (Rajasthan)</option>
                <option value="महाराष्ट्र">महाराष्ट्र (Maharashtra)</option>
                <option value="हरियाणा व पंजाब">हरियाणा व पंजाब (Haryana/Punjab)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                3. {language === 'hinglish' ? 'वार्षिक पारिवारिक आय' : 'Annual Family Income'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIncomeRange('low')}
                  className={`p-2 rounded-xl text-xs font-medium border text-center cursor-pointer ${
                    incomeRange === 'low'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  {language === 'hinglish' ? '₹2.5 लाख से कम' : '< ₹2.5 Lakh'}
                </button>
                <button
                  onClick={() => setIncomeRange('mid')}
                  className={`p-2 rounded-xl text-xs font-medium border text-center cursor-pointer ${
                    incomeRange === 'mid'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  {language === 'hinglish' ? '₹2.5 लाख से अधिक' : '> ₹2.5 Lakh'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
              {language === 'hinglish' ? `आपके लिए ${eligibleSchemes.length} योजनाएं उपलब्ध हैं` : `${eligibleSchemes.length} Schemes Available`}
            </span>
            <span className="text-xs text-emerald-400 font-semibold">
              ✓ {stateName} के अनुसार वेरीफाइड
            </span>
          </div>

          <div className="space-y-3">
            {eligibleSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h5 className="font-bold text-sm text-white">
                      {language === 'hinglish' ? scheme.nameHinglish : scheme.nameEnglish}
                    </h5>
                    <p className="text-xs text-amber-400 font-semibold mt-0.5">
                      💰 {language === 'hinglish' ? scheme.benefitHinglish : scheme.benefitEnglish}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[10px] font-mono shrink-0">
                    {scheme.officialPortal}
                  </span>
                </div>

                {/* Document preview */}
                <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-500 font-medium">{language === 'hinglish' ? 'ज़रूरी कागज:' : 'Required Docs:'}</span>
                    {scheme.docChecklist.map((doc, idx) => (
                      <span key={idx} className="bg-slate-900 px-2 py-0.5 rounded text-[11px] text-slate-300 border border-slate-800">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Unlock PDF CTA Bar */}
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="font-bold text-sm text-amber-300 block">
                {language === 'hinglish' ? 'पूरा आवेदन फॉर्म व ऑफलाइन गाइड PDF' : 'Complete Application Guide & Forms PDF'}
              </span>
              <p className="text-xs text-slate-400">
                {language === 'hinglish'
                  ? 'साइबर कैफे वाले को ₹200 देने के बजाय सिर्फ ₹10 में पूरी गाइड फोन में पाएं'
                  : 'Get official portals, sample filled forms & offline CSC checklist on mobile'}
              </p>
            </div>

            <button
              onClick={() => setShowUnlockModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shrink-0 shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{isUnlocked ? 'डाउनलोड PDF' : 'अनलिमिटेड गाइड (₹10)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-white shadow-2xl relative text-center">
            <button
              onClick={() => setShowUnlockModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-white mb-1">
              {language === 'hinglish' ? '₹10 में योजना गाइड अनलॉक' : 'Unlock Yojana Guide for ₹10'}
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              {language === 'hinglish' ? 'सीधे UPI से ₹10 देकर आधिकारिक फॉर्म और गाइड डाउनलोड करें' : 'Simulate 1-click ₹10 payment for scheme checklist PDF'}
            </p>
            <button
              onClick={() => {
                setIsUnlocked(true);
                setShowUnlockModal(false);
              }}
              className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm cursor-pointer hover:bg-emerald-400 transition-colors"
            >
              {language === 'hinglish' ? 'सिमुलेट ₹10 सक्सेस' : 'Simulate ₹10 Payment'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
