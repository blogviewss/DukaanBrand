import React, { useState } from 'react';
import { Language } from '../../types';
import { Send, Copy, Check, MessageSquare, Receipt, Sparkles, AlertCircle } from 'lucide-react';

interface LiveUdharStudioProps {
  language: Language;
}

type ToneType = 'gentle' | 'professional' | 'urgent';

export const LiveUdharStudio: React.FC<LiveUdharStudioProps> = ({ language }) => {
  const [personName, setPersonName] = useState('राहुल जी');
  const [amount, setAmount] = useState('2,400');
  const [purpose, setPurpose] = useState('ट्यूशन व स्टडी नोट्स फीस (अक्टूबर माह)');
  const [dueDate, setDueDate] = useState('25 अक्टूबर');
  const [myUpi, setMyUpi] = useState('teacher.rahul@okaxis');
  const [senderName, setSenderName] = useState('अमित सर (मैथ्स ट्यूशन)');
  const [tone, setTone] = useState<ToneType>('gentle');
  const [copied, setCopied] = useState(false);

  // Generate polite WhatsApp message based on tone
  const getGeneratedMessage = () => {
    const cleanAmt = amount.replace(/,/g, '');
    const upiLink = `upi://pay?pa=${encodeURIComponent(myUpi)}&pn=${encodeURIComponent(senderName)}&am=${encodeURIComponent(cleanAmt)}&cu=INR`;

    if (tone === 'gentle') {
      return `नमस्ते *${personName}* 🙏\nआशा है आप और परिवार में सब सकुशल होंगे।\n\nयह एक छोटा सा विनम्र संदेश है कि *${purpose}* का *₹${amount}* का भुगतान *${dueDate}* तक अपेक्षित था। व्यस्त दिनचर्या में कभी-कभी ध्यान नहीं रहता, इसलिए बस याद दिलाने हेतु भेजा है।\n\nसुविधा अनुसार आप नीचे दिए लिंक से सीधे PhonePe/GPay पर ट्रांसफर कर सकते हैं:\n🔗 UPI: ${myUpi}\n👉 सीधे पे करने के लिए क्लिक करें: ${upiLink}\n\nकोई असुविधा हो तो कृपया सूचित करें। बहुत-बहुत धन्यवाद!\n— *${senderName}*`;
    }

    if (tone === 'professional') {
      return `आदरणीय *${personName}*,\n\n*माहवारी हिसाब व रसीद विवरण:*\n• सेवा/विवरण: *${purpose}*\n• कुल बकाया राशि: *₹${amount}*\n• अंतिम देय तिथि: *${dueDate}*\n\nकृपया रिकॉर्ड को सुचारू रखने हेतु यथाशीघ्र भुगतान सुनिश्चित करें।\n\n📱 *UPI ID:* ${myUpi}\n💳 *Direct 1-Click Pay:* ${upiLink}\n\nभुगतान पश्चात कृपया स्क्रीनशॉट साझा कर दें। धन्यवाद।\n— *${senderName}*`;
    }

    // Urgent / Final polite notice
    return `नमस्ते *${personName}* जी,\n\nयह *${purpose}* के बकाया *₹${amount}* के संदर्भ में अंतिम विनम्र रिमाइंडर है, जिसकी देय तिथि *${dueDate}* बीत चुकी है।\n\nमहीने के अंत में हिसाब क्लियर रखने हेतु आपसे सविनय अनुरोध है कि आज ही इसका भुगतान कर दें:\n\n📱 UPI: ${myUpi}\n👉 1-Click UPI Payment: ${upiLink}\n\nयदि आप पहले ही ट्रांसफर कर चुके हैं, तो कृपया स्क्रीनशॉट भेज दें।\n— *${senderName}*`;
  };

  const messageText = getGeneratedMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {language === 'hinglish'
              ? 'लाइव प्रोटोटाइप #2: नम्र WhatsApp उधारी व हिसाब रिमाइंडर'
              : 'Live Prototype #2: Polite WhatsApp Payment Reminder & Mini-Receipt'}
          </h3>
        </div>
        <p className="text-sm text-slate-400">
          {language === 'hinglish'
            ? 'बिना रिश्ता खराब किए नम्रता से अटके पैसे वापस पाने का टूल। ट्यूशन, दूधवाले, टिफिन, मकान मालिक और किराना के लिए वरदान!'
            : 'Gentle, zero-awkwardness payment reminders with dynamic 1-click UPI links for teachers, vendors & landlords.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              {language === 'hinglish' ? 'हिसाब का विवरण' : 'Bill Details'}
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {language === 'hinglish' ? 'ग्राहक / छात्र का नाम' : 'Client / Student Name'}
                </label>
                <input
                  type="text"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                  placeholder="राहुल जी"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {language === 'hinglish' ? 'बकाया राशि (₹)' : 'Due Amount (₹)'}
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400 font-bold text-amber-400"
                  placeholder="2400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {language === 'hinglish' ? 'किस बात के पैसे हैं?' : 'Purpose / Description'}
              </label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                placeholder="ट्यूशन फीस / टिफिन सर्विस / दुकान उधारी"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {language === 'hinglish' ? 'आपकी UPI ID' : 'Your UPI ID'}
                </label>
                <input
                  type="text"
                  value={myUpi}
                  onChange={(e) => setMyUpi(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                  placeholder="yourname@upi"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {language === 'hinglish' ? 'आपका नाम / संस्था' : 'Your Name / Org'}
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
                  placeholder="अमित सर (कोचिंग)"
                />
              </div>
            </div>
          </div>

          {/* Tone Selector */}
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {language === 'hinglish' ? 'बात करने का लहज़ा (Tone)' : 'Select Message Tone'}
            </h4>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTone('gentle')}
                className={`p-2.5 rounded-xl text-center text-xs border transition-all cursor-pointer ${
                  tone === 'gentle'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400'
                }`}
              >
                🌱 {language === 'hinglish' ? 'अत्यंत नम्र' : 'Gentle'}
              </button>

              <button
                onClick={() => setTone('professional')}
                className={`p-2.5 rounded-xl text-center text-xs border transition-all cursor-pointer ${
                  tone === 'professional'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400'
                }`}
              >
                👔 {language === 'hinglish' ? 'प्रोफेशनल' : 'Official'}
              </button>

              <button
                onClick={() => setTone('urgent')}
                className={`p-2.5 rounded-xl text-center text-xs border transition-all cursor-pointer ${
                  tone === 'urgent'
                    ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400'
                }`}
              >
                ⏰ {language === 'hinglish' ? 'अंतिम सूचना' : 'Urgent'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-inner">
            {/* WhatsApp simulated chat header */}
            <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
                WA
              </div>
              <div>
                <span className="font-bold text-sm text-white block">{personName || 'ग्राहक'}</span>
                <span className="text-[11px] text-emerald-400">Online • WhatsApp Preview</span>
              </div>
            </div>

            {/* Simulated Chat Bubble */}
            <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-2xl rounded-tl-sm p-4 text-xs sm:text-sm text-emerald-100/90 whitespace-pre-line font-sans leading-relaxed shadow">
              {messageText}
            </div>

            {/* Bottom mini receipt card */}
            <div className="mt-4 bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-sky-400" />
                <span className="text-slate-300">
                  {language === 'hinglish' ? 'डिजिटल रसीद कोड' : 'Digital Receipt Token'}: #UD-{Math.floor(Math.random() * 89999 + 10000)}
                </span>
              </div>
              <span className="font-bold text-amber-400">₹{amount} (Pending)</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={handleCopy}
              className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'कॉपी हो गया!' : 'मैसेज कॉपी करें'}</span>
            </button>

            <button
              onClick={handleSendWhatsApp}
              className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'hinglish' ? 'WhatsApp पर भेजें' : 'Send via WhatsApp'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
