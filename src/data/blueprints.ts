import { ViralIdea } from '../types';

export const VIRAL_IDEAS: ViralIdea[] = [
  {
    id: 'whatsapp-vyapar-poster',
    titleHinglish: 'WhatsApp Vyapar & Daily Suvichar Poster Maker',
    titleEnglish: 'WhatsApp Business Daily Poster & Festival Card Maker',
    taglineHinglish: 'दुकानदार का नाम, फोटो और मोबाइल नंबर वाला रोज़ का स्टेटस पोस्टर 5 सेकंड में',
    taglineEnglish: 'Personalized Daily Good Morning & Festival status posters for small shopkeepers in 5s',
    category: 'business',
    difficulty: 'Easy',
    serverCost: '₹0 (100% Client-side)',
    viralScore: 9.8,
    pricingModel: '₹10/Month AutoPay',
    targetAudienceHinglish: '6+ करोड़ भारतीय दुकानदार: किराना, कपड़े वाले, मोबाइल रिपेयर, मेडिकल स्टोर, ऑटो वाले, रियल एस्टेट एजेंट',
    targetAudienceEnglish: '60M+ Indian MSMEs: Kirana stores, apparel shops, mobile repair, real estate brokers, service vendors',
    theCorePainPoint: {
      hinglish: 'हर दुकानदार रोज़ सुबह 7 बजे अपने WhatsApp Status और ग्राहकों को "शुभ प्रभात / सुविचार" या "त्योहार की बधाई" भेजना चाहता है। लेकिन Canva चलाना मुश्किल है और लोकल डिजाइनर ₹100-₹500 मांगता है।',
      english: 'Every shopkeeper wants to post a Good Morning or festival greeting on their WhatsApp status every morning with their shop name & phone. Canva is too complex and local graphic designers charge ₹200-₹500.',
    },
    whyPeoplePay10Rs: {
      hinglish: '₹10 प्रति महीना एक चाय से भी कम है! दुकानदार को लगता है कि सिर्फ ₹10 में उसकी दुकान की रोज़ाना फ्री में ब्रांडिंग हो रही है और ग्राहक उसे याद रख रहे हैं। ₹10 देने में कोई सोचता भी नहीं।',
      english: '₹10/month is cheaper than a cup of chai. For a shopkeeper, getting 30 customized branded festival and morning status posters for ₹10 feels like an unbelievable steal with zero mental resistance.',
    },
    viralLoopMechanism: {
      hinglish: '1 दुकानदार रोज़ अपने 200 ग्राहकों को WhatsApp Status पर पोस्टर दिखाता है। नीचे छोटा सा लिखा होता है: "फ्री में अपनी दुकान का पोस्टर बनाएं - Click DukaanPoster.in"। उसके 10 दुकानदार दोस्त देखकर तुरंत अपना पोस्टर बनाते हैं। K-Factor > 1.4!',
      english: 'When 1 shopkeeper shares the poster on WhatsApp status, 200+ contacts see it. A subtle footer note "Make your shop poster in 10s on DukaanPoster.in" drives 5-10 fellow shopkeepers to create theirs with zero ad spend.',
    },
    zeroCostTechSecret: {
      hinglish: 'सारा इमेज और टेक्स्ट रेंडरिंग यूजर के फोन के ब्राउज़र में HTML5 Canvas से होता है! कोई महंगा सर्वर या इमेज जनरेशन API नहीं चाहिए। Vercel की फ्री टियर पर 50 लाख यूजर भी ₹0 में संभल जाएंगे।',
      english: '100% Client-side HTML5 Canvas rendering. Fonts, stickers, and customer logos are composed in the user\'s mobile browser. Zero server compute, zero GPU bill, runs effortlessly on Vercel free tier for millions of visits.',
    },
    growthRoadmap: [
      {
        step: 'Day 1-2',
        descHinglish: 'HTML5 Canvas + 10 सुंदर हिंदी सुविचार और त्योहार के टेम्पलेट्स तैयार करें।',
        descEnglish: 'Build HTML5 Canvas engine with 10 vibrant Hindi Suvichar & festival greeting layouts.',
      },
      {
        step: 'Day 3-7',
        descHinglish: 'अपने इलाके के 10 दुकानदारों (किराना, चाय, सैलून) को उनके नाम का पोस्टर बनाकर WhatsApp पर भेजें।',
        descEnglish: 'Create 10 free custom posters for local shopkeepers and WhatsApp it to them directly.',
      },
      {
        step: 'Week 2',
        descHinglish: 'UPI QR कोड जोड़ें: "Watermark हटाने और Unlimited डाउनलोड के लिए सिर्फ ₹10/महीना दें"।',
        descEnglish: 'Integrate UPI QR or AutoPay: "Pay ₹10/month to remove watermark & unlock 200+ premium designs".',
      },
      {
        step: 'Month 1-3',
        descHinglish: 'WhatsApp ग्रुप्स और लोकल व्यापार मंडलों में वायरल फैलाव। 1 लाख एक्टिव यूज़र्स = ₹10 लाख/महीना!',
        descEnglish: 'Organic spread via WhatsApp status networks. 100k active subscribers = ₹10,00,000/month net profit!',
      },
    ],
    monetizationTriggerHinglish: 'फ्री में हर पोस्टर पर आपकी वेबसाइट का लिंक होगा। बिना वॉटरमार्क और HD डाउनलोड के लिए ₹10/महीना UPI AutoPay।',
    monetizationTriggerEnglish: 'Free version includes a tiny viral attribution line. ₹10/month removes it and enables 1-tap WhatsApp auto-post.',
    samplePromptForAI: `Build a mobile-first React PWA called "VyaparPoster". 
It has an HTML5 Canvas that overlays user shop name, phone number, and shop address on 15 pre-made festival and morning motivational Indian templates.
Include 1-click Download Image, 1-click Direct WhatsApp Share, and a UPI QR modal for ₹10/month Pro upgrade. All rendering must happen client-side in the browser.`,
  },
  {
    id: 'polite-udhar-receipt',
    titleHinglish: 'Polite WhatsApp Udhar & Hisab Receipt Generator',
    titleEnglish: 'Polite WhatsApp Payment Reminder & Clean Bill Receipt Maker',
    taglineHinglish: 'रिश्ता खराब किए बिना नम्रता से उधारी मांगने का 1-क्लिक WhatsApp मैसेज और बिल',
    taglineEnglish: 'Gentle, polite payment reminder messages & clean mini-invoices with UPI QR link',
    category: 'utility',
    difficulty: 'Very Easy',
    serverCost: '₹0 (100% Client-side)',
    viralScore: 9.6,
    pricingModel: '₹5 One-time per Export',
    targetAudienceHinglish: 'ट्यूशन टीचर, दूधवाले, टिफिन सर्विस, जिम ओनर, मकान मालिक, किराना स्टोर और फ्रीलांसर्स',
    targetAudienceEnglish: 'Tuition teachers, milk delivery, tiffin centers, gym trainers, house landlords, kirana stores, freelancers',
    theCorePainPoint: {
      hinglish: 'भारत में उधार या पेंडिंग फीस मांगना सबसे शर्मनाक काम माना जाता है। लोग झिझकते हैं कि ग्राहक या किरायेदार बुरा न मान जाए। फोन करने पर बहाने मिलते हैं।',
      english: 'Asking for pending dues, rent, tuition fees, or milk bills is socially awkward in India. People hate making uncomfortable phone calls and fear damaging personal relationships.',
    },
    whyPeoplePay10Rs: {
      hinglish: 'अगर किसी का ₹2,500 अटका हुआ है, तो ₹5-₹10 खर्च करके सभ्य और प्रोफेशनल तरीके से पैसे वापस पाना उसके लिए 100% फायदे का सौदा है।',
      english: 'If someone is waiting for ₹2,000 to ₹10,000 in overdue fees, spending ₹5 to ₹10 to send a hyper-polite, professional receipt with an instant UPI link is a no-brainer.',
    },
    viralLoopMechanism: {
      hinglish: 'जब कोई टीचर या टिफिन वाला दूसरे व्यक्ति को यह सुंदर बिल और नम्र संदेश भेजता है, तो प्राप्त करने वाला हैरान होता है कि "वाह, यह कितना बढ़िया सिस्टम है!" और वह खुद अपने काम के लिए इसका इस्तेमाल करने लगता है।',
      english: 'The recipient of the gentle payment reminder sees the professional, respectful format and immediately wants to use it for their own pending collections (landlords, coaches, vendors).',
    },
    zeroCostTechSecret: {
      hinglish: 'टेक्स्ट टेम्पलेट्स और बिल जनरेटर पूरी तरह क्लाइंट-साइड जावास्क्रिप्ट में चलते हैं। सीधे "whatsapp://send?text=..." URL स्कीमा से WhatsApp खुलता है। सर्वर का 1 पैसा भी खर्च नहीं।',
      english: 'Zero backend. Uses client-side JavaScript templates and native WhatsApp URI protocol (whatsapp://send?phone=...&text=...). Completely free to host on Vercel or GitHub Pages.',
    },
    growthRoadmap: [
      {
        step: 'Step 1',
        descHinglish: '3 टोन बनाएं: "अत्यंत नम्र (रिश्तेदार/दोस्त)", "प्रोफेशनल (फीस/किराया)", "फर्म (अंतिम रिमाइंडर)"।',
        descEnglish: 'Provide 3 emotional tones: "Ultra Gentle (Friends/Family)", "Professional (Fees/Rent)", "Urgent Final Notice".',
      },
      {
        step: 'Step 2',
        descHinglish: 'डायनेमिक UPI पेमेंट लिंक जनरेट करें (upi://pay?pa=YOUR_UPI&am=AMOUNT)।',
        descEnglish: 'Generate 1-click dynamic UPI payment links so the debtor can pay with Google Pay/PhonePe in 5 seconds.',
      },
      {
        step: 'Step 3',
        descHinglish: '₹5 प्रति 10 बिल या ₹10 प्रति महीना का सचेत पैक शुरू करें।',
        descEnglish: 'Charge ₹5 per batch of 10 receipts or ₹10/month for unlimited reminders with customer ledger tracking.',
      },
    ],
    monetizationTriggerHinglish: 'पहले 3 बिल मुफ्त। उसके बाद ₹10 में 1 महीने के लिए अनलिमिटेड बिलिंग और कस्टमाइज्ड रसीद।',
    monetizationTriggerEnglish: 'First 3 receipts are free. ₹10 unlocks unlimited polite reminders + PDF receipt maker for 30 days.',
    samplePromptForAI: `Create a single-page React app "PoliteUdhar". 
Allows entering debtor name, amount, purpose, due date, and user UPI ID. 
Provides 3 pre-written polite Hindi/English templates (e.g. gentle reminder for tuition fee / milk bill / rent).
Outputs a clean visual receipt and a 1-tap "Send on WhatsApp" button with embedded UPI payment link. 100% client side.`,
  },
  {
    id: 'sarkari-yojana-finder',
    titleHinglish: 'Sarkari Yojana & Subsidy 60-Second Eligibility Checker',
    titleEnglish: 'Government Scheme & Subsidy 60-Second Eligibility Checker',
    taglineHinglish: 'सिर्फ 4 सवालों में जानें कि सरकार से आपको कौन-कौन सी योजनाओं में ₹6,000 से ₹5 लाख मिल सकते हैं',
    taglineEnglish: 'Find eligible government schemes, subsidies, and scholarships in 60 seconds with simple checklist',
    category: 'schemes',
    difficulty: 'Easy',
    serverCost: '₹0 (100% Client-side)',
    viralScore: 9.5,
    pricingModel: '₹10/Month AutoPay',
    targetAudienceHinglish: 'छात्र, किसान, महिलाएं, छोटे व्यापारी और ग्रामीण/कस्बाई परिवार (30+ करोड़ लोग)',
    targetAudienceEnglish: 'Students, farmers, women, small shopkeepers, blue-collar workers across India (300M+ people)',
    theCorePainPoint: {
      hinglish: 'केंद्र और राज्य सरकारों की सैकड़ों योजनाएं हैं (लाडली बहना, पीएम किसान, मुद्रा लोन, स्कॉलरशिप, आयुष्मान), लेकिन आम आदमी को पता ही नहीं होता कि वह किसके पात्र है और कौन सा कागज चाहिए। साइबर कैफे वाला ₹100-₹200 ले लेता है।',
      english: 'There are 1,000+ state & central govt schemes (PM Kisan, Ladli Behna, Mudra loans, post-matric scholarships), but ordinary citizens do not know eligibility rules or document lists. Local CSC centers overcharge.',
    },
    whyPeoplePay10Rs: {
      hinglish: 'जब यूजर को दिखता है कि उसे ₹6,000 या ₹50,000 की सब्सिडी मिल सकती है, तो उसकी पूरी लिस्ट और ज़रूरी दस्तावेजों का फॉर्म सिर्फ ₹10 में डाउनलोड करने में वह 1 सेकंड भी नहीं सोचता।',
      english: 'When a user sees they qualify for a ₹6,000 annual grant or ₹50,000 business loan subsidy, paying ₹10 to download the exact document checklist & direct official link is an absolute bargain.',
    },
    viralLoopMechanism: {
      hinglish: 'लोग अपने परिवार, रिश्तेदारों और गांव के WhatsApp ग्रुप्स में लिंक शेयर करते हैं: "इस लिंक पर क्लिक करके देखो कि तुम्हारी मम्मी या दीदी को लाडली बहना / फ्री राशन का पैसा मिलेगा या नहीं"। यह जंगल की आग की तरह फैलता है।',
      english: 'Massive WhatsApp forwarding loop: "Check if your mother/sister is eligible for ₹1,250/month scheme". Relatives share in family and village WhatsApp groups.',
    },
    zeroCostTechSecret: {
      hinglish: 'सभी 50 मुख्य योजनाओं के नियम (उम्र, आय, पेशा, राज्य) एक सिंपल JSON फाइल में स्टोर होते हैं। कोई AI API कॉल नहीं लगती, फोन पर ही 0.1 सेकंड में मैचिंग हो जाती है।',
      english: 'All 50 major schemes are cataloged in a local JSON file with rule matching (age, state, income, gender). Runs instantly in browser without expensive LLM tokens.',
    },
    growthRoadmap: [
      {
        step: 'Phase 1',
        descHinglish: 'टॉप 25 सबसे लोकप्रिय योजनाओं (PM Kisan, Ladli Behna, Mudra, Ayushman, Free Tablet) का डाटा जोड़ें।',
        descEnglish: 'Curate the top 25 high-traffic schemes (PM Kisan, Ladli Behna, Mudra, Ayushman Bharat, E-Shram).',
      },
      {
        step: 'Phase 2',
        descHinglish: 'सिर्फ 4 सवाल पूछें: राज्य, उम्र, पेशा (किसान/छात्र/महिला), वार्षिक आय।',
        descEnglish: 'Ask just 4 simple questions: State, Age, Occupation (Student/Farmer/Woman), Annual Income.',
      },
      {
        step: 'Phase 3',
        descHinglish: 'रिजल्ट में पात्र योजनाएं दिखाएं। आधिकारिक आवेदन लिंक और डॉक्यूमेंट चेकलिस्ट PDF के लिए ₹10 UPI लें।',
        descEnglish: 'Show eligible schemes. Charge ₹10 UPI for the comprehensive application guide & document checklist PDF.',
      },
    ],
    monetizationTriggerHinglish: 'पात्र योजनाओं के नाम फ्री दिखेंगे। विस्तृत आवेदन गाइड और आवश्यक कागजों की लिस्ट PDF डाउनलोड करने के लिए ₹10।',
    monetizationTriggerEnglish: 'Free eligibility list. ₹10 to download the complete step-by-step application PDF with document checklist.',
    samplePromptForAI: `Build a React client-side app called "YojanaFinder". 
It asks 4 simple questions (State, Age, Category, Income) and matches them against a JSON array of 30 Indian government schemes.
Renders matching schemes with benefit amounts (e.g. ₹6,000/year). 
Includes a ₹10 UPI payment button to download the printable PDF document checklist and direct official apply portal links.`,
  },
  {
    id: 'whatsapp-biodata-maker',
    titleHinglish: 'WhatsApp Shaadi Biodata & Local Job Resume Maker',
    titleEnglish: 'WhatsApp Marriage Biodata & Quick Local Job CV Maker',
    taglineHinglish: '60 सेकंड में सुंदर शादी का बायोडाटा या दुकान/ड्राइवर/सेल्स जॉब का रिज्यूमे तैयार करें',
    taglineEnglish: 'Create elegant Hindu/Muslim wedding biodatas or blue-collar CVs in 60 seconds on mobile',
    category: 'social',
    difficulty: 'Easy',
    serverCost: '₹0 (100% Client-side)',
    viralScore: 9.3,
    pricingModel: '₹10/Month AutoPay',
    targetAudienceHinglish: 'शादी के लिए बायोडाटा बनाने वाले परिवार, स्थानीय नौकरियों (दुकान, सेल्स, ड्राइवर, डिलीवरी) के उम्मीदवार',
    targetAudienceEnglish: 'Families preparing matrimonial profiles, blue-collar job seekers (retail, driver, sales, helper)',
    theCorePainPoint: {
      hinglish: 'शादी के रिश्ते के लिए साफ और सुंदर बायोडाटा चाहिए होता है। कंप्यूटर कैफे वाला एक बायोडाटा टाइप करने के ₹50 से ₹100 लेता है और 2 घंटे बैठाता है।',
      english: 'Every marriage proposal in India requires a clean, traditional biodata. Local cyber cafes charge ₹50-₹100 and take hours. Mobile users struggle with Word docs.',
    },
    whyPeoplePay10Rs: {
      hinglish: 'शादी जीवन का सबसे बड़ा फैसला है। ₹50 कैफे में देने के बजाय घर बैठे फोन से सिर्फ ₹10 में 5 मिनट में सुंदर धार्मिक/मॉडर्न बॉर्डर वाला बायोडाटा मिल जाए तो कोई भी हंसते-हंसते ₹10 देगा।',
      english: 'Compared to ₹100 at a cyber cafe, paying ₹10 from home via UPI for a high-resolution, culturally styled matrimonial PDF or CV is an instant win.',
    },
    viralLoopMechanism: {
      hinglish: 'एक शादी का बायोडाटा कम से कम 20-30 रिश्तेदारों और बिचौलियों के WhatsApp पर फॉरवर्ड होता है। नीचे लिखा होता है: "Created with ShaadiBio.in (सिर्फ ₹10 में अपना बनाएं)"। हर शेयर से 5 नए ग्राहक मिलते हैं!',
      english: 'A marriage biodata is forwarded to 20-50 extended relatives and matchmakers on WhatsApp. The discreet footer attribution turns every proposal into a viral marketing billboard.',
    },
    zeroCostTechSecret: {
      hinglish: 'HTML + CSS Print / Canvas से मोबाइल पर ही सीधे PDF या इमेज तैयार हो जाती है। किसी सर्वर पर कोई फाइल स्टोर करने की जरूरत ही नहीं।',
      english: 'HTML-to-Canvas / native browser print to PDF. Generated completely on device. Zero storage costs, zero server computing.',
    },
    growthRoadmap: [
      {
        step: 'Templates',
        descHinglish: '5 सुंदर थीम: गणेश जी बॉर्डर, राधा-कृष्ण बॉर्डर, मिनिमल मॉडर्न, सिंपल जॉब रिज्यूमे।',
        descEnglish: 'Provide 5 culturally rich templates: Traditional Ganesha border, Radha Krishna, Modern minimal, Simple Job CV.',
      },
      {
        step: 'Form',
        descHinglish: 'आसान हिंदी फॉर्म: नाम, जन्मतिथि, गोत्र/जाति, शिक्षा, परिवार का विवरण और फोटो अपलोड।',
        descEnglish: 'Simple form: Name, DOB, height, education, family background, and 1-tap photo crop.',
      },
      {
        step: 'Monetization',
        descHinglish: 'वाटरमार्क के साथ फ्री प्रिव्यू। क्लियर HD PDF डाउनलोड के लिए ₹10 UPI।',
        descEnglish: 'Free preview with watermark. ₹10 instant UPI payment to unlock pristine high-resolution PDF.',
      },
    ],
    monetizationTriggerHinglish: 'स्क्रीनशॉट प्रिव्यू फ्री है। प्रिंटेबल HD PDF डाउनलोड करने के लिए ₹10 UPI स्कैन।',
    monetizationTriggerEnglish: 'Low-res preview is free. Instant ₹10 UPI unlock for 300DPI printable PDF without watermark.',
    samplePromptForAI: `Build a mobile-first React matrimonial biodata maker "ShaadiBio".
Allows uploading photo and entering personal, horoscope, and family details.
Offers 3 traditional Indian borders (Ganesh theme, Floral gold, Simple blue).
Generates a downloadable JPG/PDF. Includes a ₹10 UPI payment modal before downloading the un-watermarked high-res PDF.`,
  },
  {
    id: 'daily-rashifal-whatsapp',
    titleHinglish: 'Daily Rashifal, Kundli & Shubh Muhurat Card Generator',
    titleEnglish: 'Daily Horoscope, Shubh Muhurat & Lucky Color WhatsApp Status Card',
    taglineHinglish: 'हर राशि का आज का लकी रंग, नंबर और शुभ मुहूर्त का सुंदर WhatsApp स्टेटस कार्ड 1 क्लिक में',
    taglineEnglish: 'Daily personalized zodiac card with lucky color, number & shubh muhurat ready for WhatsApp status',
    category: 'devotion',
    difficulty: 'Very Easy',
    serverCost: '₹0 (100% Client-side)',
    viralScore: 9.7,
    pricingModel: '₹10/Month AutoPay',
    targetAudienceHinglish: 'भारत के 50+ करोड़ लोग जो रोज़ सुबह राशिफल, पंचांग, और शुभ मुहूर्त में विश्वास करते हैं',
    targetAudienceEnglish: '500M+ Indians who check daily horoscope, Panchang, and auspicious timings every morning',
    theCorePainPoint: {
      hinglish: 'अखबार या टीवी पर राशिफल देखना पड़ता है जिसे WhatsApp पर दोस्तों को शेयर करना मुश्किल होता है। लोग अपनी राशि का सुंदर स्टेटस लगाना चाहते हैं।',
      english: 'People read daily rashifal in newspapers or YouTube, but have no quick way to share an aesthetic daily card for their Rashi on their WhatsApp status.',
    },
    whyPeoplePay10Rs: {
      hinglish: 'धार्मिक और ज्योतिष सामग्री के लिए भारतीय समाज बहुत भावनात्मक है। महीने का ₹10 देकर रोज़ सुबह 6 बजे अपने WhatsApp पर व्यक्तिगत राशिफल कार्ड पाना किसी को भी महंगा नहीं लगता।',
      english: 'Astrology and spirituality evoke immense devotion and daily habit in India. ₹10/month for automated personalized daily blessings and lucky alerts is universally acceptable.',
    },
    viralLoopMechanism: {
      hinglish: 'लोग अपनी राशि (मेष, वृषभ, सिंह...) का कार्ड WhatsApp स्टेटस पर लगाते हैं। उनके दोस्त पूछते हैं: "भाई मेरी राशि का भी निकाल कर दे!" और लिंक मांगते हैं।',
      english: 'Users post their Rashi card on status. Friends and family seeing their zodiac insights immediately ask for their own sign, triggering exponential peer recommendations.',
    },
    zeroCostTechSecret: {
      hinglish: 'राशिफल के 12 राशियों के दैनिक कोट्स और पंचांग डाटा को क्लाइंट-साइड 30 दिन के रोटेशन से या फ्री पब्लिक RSS/APIs से चलाया जा सकता है।',
      english: 'Pre-computed daily planetary positions, lucky colors, and motivational remedies rotated client-side. Zero API cost, runs on static hosting.',
    },
    growthRoadmap: [
      {
        step: 'Feature 1',
        descHinglish: '12 राशियों के लिए रोज़ाना लकी नंबर, शुभ रंग, और 1-लाइन उपाय जनरेटर।',
        descEnglish: 'Daily lucky number, auspicious color, and 1-line Vedic remedy for all 12 zodiac signs.',
      },
      {
        step: 'Feature 2',
        descHinglish: 'आज का चौघड़िया और राहुकाल का समय दिखाने वाला 10-सेकंड कार्ड।',
        descEnglish: 'Instant Choghadiya & Rahukaal visual card for auspicious timing verification.',
      },
      {
        step: 'Feature 3',
        descHinglish: 'नाम और फोटो जोड़कर "व्यक्तिगत कुंडली कार्ड" बनाने का ₹10 फीचर।',
        descEnglish: 'Customizable card with user name & birth star for ₹10/month subscription.',
      },
    ],
    monetizationTriggerHinglish: 'साधारण राशिफल फ्री। व्यक्तिगत नाम और जन्म कुंडली स्टेटस कार्ड के लिए ₹10 प्रति महीना।',
    monetizationTriggerEnglish: 'General rashifal is free. Personal name + photo branded daily auspicious card for ₹10/month.',
    samplePromptForAI: `Build a daily Indian astrology status generator "DailyRashifal". 
Has 12 zodiac tabs (Mesh to Meen). Shows today's lucky number, lucky color, shubh muhurat, and positive quote.
Generates an Instagram story / WhatsApp status 9:16 vertical image card in HTML5 canvas with decorative temple motif.
Has a ₹10 UPI payment button to add personal photo and shop/family name.`,
  },
];

export const SACHET_ECONOMICS_EXPLANATION = {
  why10RupeesWorks: [
    {
      title: 'No Mental Friction (चाय से भी सस्ता)',
      descHinglish: '₹10 खर्च करते वक्त इंसान को सोचने की ज़रूरत नहीं पड़ती। जैसे लोग सड़क पर ₹10 का चिप्स या ₹10 की चाय ले लेते हैं, वैसे ही UPI से ₹10 सेकंड्स में ट्रांसफर हो जाता है।',
      descEnglish: 'Zero purchase friction. ₹10 is impulse territory in India—less than a cup of tea or a snack. No buyer remorse or second thoughts.',
    },
    {
      title: 'UPI Autopay & One-Click QR',
      descHinglish: 'क्रेडिट कार्ड की ज़रूरत नहीं! PhonePe, Google Pay, Paytm पर सिर्फ पिन डालकर या QR स्कैन करके 3 सेकंड में पेमेंट हो जाती है।',
      descEnglish: 'No credit card hurdles. Frictionless UPI Autopay or direct BharatQR scan completes in 3 seconds.',
    },
    {
      title: 'Sachet Revolution (सचेत क्रांति)',
      descHinglish: 'जिस तरह हिंदुस्तान यूनिलीवर ने ₹200 की शैम्पू की बोतल के बजाय ₹1 का पाउच बेचकर अरबों रुपये कमाए, डिजिटल दुनिया में ₹10 का सब्सक्रिप्शन वही क्रांति है।',
      descEnglish: 'Just as FMCG giants conquered India with ₹1 shampoo sachets instead of ₹200 bottles, ₹10 digital micro-subscriptions unlock the next 500M users.',
    },
  ],
  zeroCostSecrets: [
    {
      title: '100% Client-Side Computing (ब्राउज़र में काम)',
      descHinglish: 'इमेज, टेक्स्ट, पीडीएफ और कैलकुलेशन सब यूजर के फोन पर ही प्रोसेस होता है। आपका सर्वर सिर्फ एक हल्की HTML/JS फाइल भेजता है। 1 करोड़ यूजर भी आ जाएं तो सर्वर का बिल ₹0 ही रहेगा!',
      descEnglish: 'All image rendering, text formatting, and calculations execute inside the user mobile browser via Canvas/WASM. The server only serves static assets.',
    },
    {
      title: 'Free Hosting on Vercel or Cloudflare Pages',
      descHinglish: 'Vercel, Netlify या Cloudflare Pages पर स्टैटिक वेबसाइट्स की होस्टिंग पूरी तरह फ्री है। आपको ₹1 का भी क्लाउड बिल नहीं देना पड़ेगा।',
      descEnglish: 'Vercel and Cloudflare Pages provide generous free tiers for static frontend apps with unlimited or massive free bandwidth.',
    },
    {
      title: 'Watermark-Driven Viral Engine (फ्री मार्केटिंग)',
      descHinglish: 'हर उस इमेज, बिल, या कार्ड पर जो यूजर दूसरों को भेजेगा, नीचे आपकी वेबसाइट का लिंक होगा। आपको गूगल या फेसबुक को ₹1 भी विज्ञापन का नहीं देना होगा!',
      descEnglish: 'Every image, receipt, or status card generated carries a discrete viral attribution at the bottom. Users market your app for free to their entire contact list.',
    },
  ],
};
