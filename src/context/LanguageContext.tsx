import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isHindiMode: boolean; // true if hindi or hinglish
}

const STORAGE_KEY = 'dukaan_brand_language';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  hinglish: {
    // Header & Brand
    appTitle: 'DukaanBrand',
    posterMakerBadge: 'Poster Maker',
    headerTagline: 'Apni dukaan ka WhatsApp status poster 10 second me banayein',
    proUnlocked: 'VIP Pro Active',
    unlockPro: '⭐ VIP Pro (₹10)',
    ownerAdmin: 'Admin Login',

    // Nav Tabs
    tabPoster: '1. Poster',
    tabDesign: '2. Design',
    tabCustomize: '3. Words',
    tabStore: '4. Dukaan',
    tabVip: '5. VIP Pro',

    // Action Buttons
    downloadHd: 'HD Poster Download Karein',
    copyPoster: 'Poster Copy Karein',
    shareWhatsApp: 'WhatsApp Pe Turant Bhejein',
    customizeWords: 'Shabd Badlein (Customize)',
    selectDesign: 'Design Chunein',
    enterAdmin: 'Admin Me Login Karein',
    logout: 'Logout',
    customerView: 'Customer View',

    // Sections
    salesTipsTitle: 'Dukaandar Bikri Trick',
    dailyGoalTitle: 'Aaj Ka Sales & Share Goal',
    templatesTitle: 'Viral Poster Designs',
    storeDetailsTitle: 'Dukaan Ki Details',
    vipTitle: 'VIP Pro Features',

    // Goal Tracker
    goalShares: 'Shares',
    goalIncrement: '+1 Share Badhayein',
    goalReset: 'Reset',
    goalCongratulation: 'Badhai ho! Aaj ka share goal poora hua!',

    // Poster Customizer
    headerLabel: 'Upar Ka Title (Banner Tag):',
    quoteLabel: 'Mukhya Sandesh (Main Quote):',
    subQuoteLabel: 'Neeche Ki Line (Subtitle):',
    accentColorLabel: 'Border & Theme Color:',
    resetDefault: 'Pehle Jaisa Karein (Reset)',
    quickSuggestions: 'Ready-to-use Sandesh:',

    // Shop Profile Form
    sizeSelector: 'Poster Ka Size (Format):',
    statusSize: '9:16 WhatsApp Status',
    squareSize: '1:1 Square Post / DP',
    shopNameLabel: 'Dukaan Ka Naam:',
    ownerNameLabel: 'Malik Ka Naam:',
    phoneLabel: 'Mobile / WhatsApp Number:',
    cityLabel: 'Dukaan Ka Pata / Market:',
    taglineLabel: 'Dukaan Ki Tagline (Slogan):',
    specialOfferLabel: 'Aaj Ka Special Offer:',
    homeDeliveryLabel: 'Free Home Delivery Uplabdh Hai',
    upiQrLabel: 'Poster Pe Apna Google Pay/PhonePe QR Lagayein (VIP)',
    verifiedBadgeLabel: 'Verified Gold Merchant Badge Lagayein (VIP)',

    // WhatsApp Flow
    automatedWhatsAppTitle: 'Automatic WhatsApp Message Generator',
    oneClickSend: 'WhatsApp Pe Turant Bhejein (1-Click)',
    copyMessage: 'Message Copy Karein',
    messageCopied: 'Message Copy Ho Gaya!',
    offerSale: '🔥 Maha Discount',
    offerStock: '📦 Naya Stock',
    offerDelivery: '🚚 Free Delivery',
    offerFestival: '🪔 Parv / Festival',

    // Admin Portal
    ownerPortalTitle: 'Malik Surakshit Admin Portal',
    miniDashboardTab: '1. Mini Dashboard (Shares & Templates)',
    fullAnalyticsTab: '2. Live Analytics (Visitors & Growth)',
    profitCalcTab: '3. Profit Calculator',
    upiSettingsTab: '4. UPI & Pricing Settings',
    vipGeneratorTab: '5. Single-Use VIP Codes',
    subscribersTab: '6. Customers Ledger',
    auditLogTab: '7. Security Audit Log',
    securityLockTab: '8. Password & Site Lock',
  },
  hindi: {
    // Header & Brand
    appTitle: 'दुकान ब्रांड',
    posterMakerBadge: 'पोस्टर मेकर',
    headerTagline: 'अपनी दुकान का नाम व मोबाइल नंबर वाला WhatsApp स्टेटस 10 सेकंड में बनाएं',
    proUnlocked: 'वीआईपी प्रो सक्रिय',
    unlockPro: '⭐ वीआईपी प्रो (₹10)',
    ownerAdmin: 'मालिक लॉगिन',

    // Nav Tabs
    tabPoster: '1. पोस्टर',
    tabDesign: '2. डिज़ाइन',
    tabCustomize: '3. शब्द',
    tabStore: '4. दुकान',
    tabVip: '5. वीआईपी प्रो',

    // Action Buttons
    downloadHd: 'एचडी पोस्टर डाउनलोड करें',
    copyPoster: 'पोस्टर कॉपी करें',
    shareWhatsApp: 'व्हाट्सएप पर तुरंत भेजें',
    customizeWords: 'शब्द बदलें (कस्टमाइज़)',
    selectDesign: 'डिज़ाइन चुनें',
    enterAdmin: 'एडमिन में प्रवेश करें',
    logout: 'लॉगआउट',
    customerView: 'ग्राहक व्यू',

    // Sections
    salesTipsTitle: 'दुकानदार बिक्री ट्रिक',
    dailyGoalTitle: 'आज का दैनिक बिक्री व शेयर लक्ष्य',
    templatesTitle: 'वायरल पोस्टर डिज़ाइन',
    storeDetailsTitle: 'दुकान का विवरण',
    vipTitle: 'वीआईपी प्रो फीचर्स',

    // Goal Tracker
    goalShares: 'शेयर',
    goalIncrement: '+1 शेयर बढ़ाएं',
    goalReset: 'रीसेट',
    goalCongratulation: 'बधाई हो! आज का शेयर लक्ष्य पूरा हुआ!',

    // Poster Customizer
    headerLabel: 'शीर्ष शीर्षक (बैनर टैग):',
    quoteLabel: 'मुख्य संदेश (मुख्य उद्धरण):',
    subQuoteLabel: 'निचली पंक्ति (उपशीर्षक):',
    accentColorLabel: 'बॉर्डर व थीम रंग:',
    resetDefault: 'रीसेट करें',
    quickSuggestions: 'तैयार सुझाव:',

    // Shop Profile Form
    sizeSelector: 'पोस्टर का आकार (साइज):',
    statusSize: '9:16 व्हाट्सएप स्टेटस',
    squareSize: '1:1 चौकोर पोस्ट / डीपी',
    shopNameLabel: 'दुकान का नाम:',
    ownerNameLabel: 'मालिक का नाम:',
    phoneLabel: 'मोबाइल / व्हाट्सएप नंबर:',
    cityLabel: 'दुकान का पता / शहर:',
    taglineLabel: 'दुकान का स्लोगन (टैगलाइन):',
    specialOfferLabel: 'आज का विशेष ऑफर:',
    homeDeliveryLabel: 'फ्री होम डिलीवरी उपलब्ध है',
    upiQrLabel: 'पोस्टर पर असली गूगल पे/फोनपे क्यूआर लगाएं (वीआईपी)',
    verifiedBadgeLabel: 'गोल्डन वेरिफाइड मर्चेंट मोहर लगाएं (वीआईपी)',

    // WhatsApp Flow
    automatedWhatsAppTitle: 'ऑटोमैटिक व्हाट्सएप संदेश जनरेटर',
    oneClickSend: 'व्हाट्सएप पर तुरंत भेजें (1-क्लिक)',
    copyMessage: 'संदेश कॉपी करें',
    messageCopied: 'संदेश कॉपी हो गया!',
    offerSale: '🔥 महा डिस्काउंट',
    offerStock: '📦 नया स्टॉक',
    offerDelivery: '🚚 फ्री डिलीवरी',
    offerFestival: '🪔 पर्व व त्योहार',

    // Admin Portal
    ownerPortalTitle: 'मालिक सुरक्षित एडमिन पोर्टल',
    miniDashboardTab: '1. मिनी डैशबोर्ड (शेयर व टेम्पलेट्स)',
    fullAnalyticsTab: '2. लाइव एनालिटिक्स (विजिटर्स व ग्रोथ)',
    profitCalcTab: '3. प्रॉफिट कैलकुलेटर',
    upiSettingsTab: '4. यूपीआई व पेमेंट सेटिंग्स',
    vipGeneratorTab: '5. सिंगल-यूज़ वीआईपी कोड',
    subscribersTab: '6. ग्राहक खाता लेजर',
    auditLogTab: '7. सुरक्षा ऑडिट लॉग',
    securityLockTab: '8. पासवर्ड व साइट लॉक',
  },
  english: {
    // Header & Brand
    appTitle: 'DukaanBrand',
    posterMakerBadge: 'Poster Maker',
    headerTagline: 'Create WhatsApp status posters for your shop in 10 seconds',
    proUnlocked: 'VIP Pro Active',
    unlockPro: '⭐ Unlock VIP (₹10)',
    ownerAdmin: 'Admin Login',

    // Nav Tabs
    tabPoster: '1. Poster',
    tabDesign: '2. Design',
    tabCustomize: '3. Words',
    tabStore: '4. Store',
    tabVip: '5. VIP Pro',

    // Action Buttons
    downloadHd: 'Download HD Poster',
    copyPoster: 'Copy Poster Image',
    shareWhatsApp: 'Send to WhatsApp',
    customizeWords: 'Edit Custom Words',
    selectDesign: 'Select Design',
    enterAdmin: 'Enter Admin Portal',
    logout: 'Logout',
    customerView: 'Customer View',

    // Sections
    salesTipsTitle: 'Shop Growth Tip',
    dailyGoalTitle: 'Daily Sales & Share Goal',
    templatesTitle: 'Viral Poster Designs',
    storeDetailsTitle: 'Store Profile',
    vipTitle: 'VIP Pro Features',

    // Goal Tracker
    goalShares: 'Shares',
    goalIncrement: '+1 Count Share',
    goalReset: 'Reset',
    goalCongratulation: 'Congratulations! Today share goal achieved!',

    // Poster Customizer
    headerLabel: 'Banner Header Title:',
    quoteLabel: 'Main Message / Headline:',
    subQuoteLabel: 'Bottom Subtitle:',
    accentColorLabel: 'Border & Theme Accent:',
    resetDefault: 'Reset to Default',
    quickSuggestions: 'Ready Suggestions:',

    // Shop Profile Form
    sizeSelector: 'Select Poster Size:',
    statusSize: '9:16 WhatsApp Story',
    squareSize: '1:1 Square Post',
    shopNameLabel: 'Shop Name:',
    ownerNameLabel: 'Owner Name:',
    phoneLabel: 'Phone / WhatsApp Number:',
    cityLabel: 'Shop Address / City:',
    taglineLabel: 'Tagline / Slogan:',
    specialOfferLabel: 'Today Special Offer:',
    homeDeliveryLabel: 'Free Home Delivery Available',
    upiQrLabel: 'Embed Genuine Payment QR on Poster (VIP)',
    verifiedBadgeLabel: 'Gold Verified Merchant Stamp (VIP)',

    // WhatsApp Flow
    automatedWhatsAppTitle: 'Automated WhatsApp Message Flow',
    oneClickSend: 'Send to WhatsApp (1-Click)',
    copyMessage: 'Copy Message Text',
    messageCopied: 'Message Copied to Clipboard!',
    offerSale: '🔥 Mega Discount',
    offerStock: '📦 Fresh Stock',
    offerDelivery: '🚚 Free Delivery',
    offerFestival: '🪔 Festive Special',

    // Admin Portal
    ownerPortalTitle: 'Owner Private Admin Portal',
    miniDashboardTab: '1. Mini Dashboard (Shares & Templates)',
    fullAnalyticsTab: '2. Detailed Analytics (Traffic & Growth)',
    profitCalcTab: '3. Profit Calculator',
    upiSettingsTab: '4. UPI & Pricing Settings',
    vipGeneratorTab: '5. Single-Use VIP Codes',
    subscribersTab: '6. Customers Ledger',
    auditLogTab: '7. Security Audit Log',
    securityLockTab: '8. Password & Site Lock',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'hinglish' || saved === 'hindi' || saved === 'english') {
        return saved;
      }
    }
    return 'hinglish';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLang);
    }
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.hinglish;
    return dict[key] || TRANSLATIONS.hinglish[key] || key;
  };

  const isHindiMode = language === 'hindi' || language === 'hinglish';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isHindiMode }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback if called outside provider
    return {
      language: 'hinglish',
      setLanguage: () => {},
      t: (key: string) => TRANSLATIONS.hinglish[key] || key,
      isHindiMode: true,
    };
  }
  return context;
};
