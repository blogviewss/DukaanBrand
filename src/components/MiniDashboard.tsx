import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Share2,
  TrendingUp,
  Award,
  Sparkles,
  Smartphone,
  Download,
  Calendar,
  MessageCircle,
  Eye,
  CheckCircle,
  Flame,
  ArrowUpRight,
} from 'lucide-react';
import { Language } from '../types';

interface MiniDashboardProps {
  language?: Language;
}

interface ShareDataPoint {
  date: string;
  whatsappShares: number;
  imageDownloads: number;
  totalShares: number;
}

interface TemplatePopularity {
  name: string;
  category: string;
  shares: number;
  viralityScore: number;
  color: string;
}

const DATA_7_DAYS: ShareDataPoint[] = [
  { date: '20 Oct', whatsappShares: 650, imageDownloads: 320, totalShares: 970 },
  { date: '21 Oct', whatsappShares: 890, imageDownloads: 460, totalShares: 1350 },
  { date: '22 Oct', whatsappShares: 1240, imageDownloads: 630, totalShares: 1870 },
  { date: '23 Oct', whatsappShares: 1780, imageDownloads: 910, totalShares: 2690 },
  { date: '24 Oct', whatsappShares: 2450, imageDownloads: 1220, totalShares: 3670 },
  { date: '25 Oct', whatsappShares: 3620, imageDownloads: 1850, totalShares: 5470 },
  { date: '26 Oct', whatsappShares: 5120, imageDownloads: 2640, totalShares: 7760 },
];

const DATA_14_DAYS: ShareDataPoint[] = [
  { date: '13 Oct', whatsappShares: 310, imageDownloads: 140, totalShares: 450 },
  { date: '14 Oct', whatsappShares: 390, imageDownloads: 180, totalShares: 570 },
  { date: '15 Oct', whatsappShares: 440, imageDownloads: 210, totalShares: 650 },
  { date: '16 Oct', whatsappShares: 490, imageDownloads: 240, totalShares: 730 },
  { date: '17 Oct', whatsappShares: 540, imageDownloads: 280, totalShares: 820 },
  { date: '18 Oct', whatsappShares: 590, imageDownloads: 300, totalShares: 890 },
  { date: '19 Oct', whatsappShares: 620, imageDownloads: 310, totalShares: 930 },
  ...DATA_7_DAYS,
];

const POPULAR_TEMPLATES: TemplatePopularity[] = [
  { name: 'शुभ प्रभात (Morning Suvichar)', category: 'Suvichar', shares: 14820, viralityScore: 9.8, color: '#f59e0b' },
  { name: 'दुकान महा सेल (Mega Offer)', category: 'Offers', shares: 9640, viralityScore: 9.2, color: '#10b981' },
  { name: 'पावन त्योहार (Festive Wishes)', category: 'Festivals', shares: 8230, viralityScore: 8.9, color: '#ec4899' },
  { name: 'उधारी बंद (Cash Business)', category: 'Udhar', shares: 4890, viralityScore: 8.1, color: '#3b82f6' },
  { name: 'फ्री होम डिलीवरी (Free Delivery)', category: 'Utility', shares: 4120, viralityScore: 7.6, color: '#8b5cf6' },
  { name: 'नया ताज़ा स्टॉक (Fresh Stock)', category: 'Business', shares: 3250, viralityScore: 7.2, color: '#06b6d4' },
];

const RECENT_SHARE_FEED = [
  { shop: 'श्री बालाजी प्रोविजन', action: 'WhatsApp पर शेयर किया', template: 'महा सेल (Mega Offer)', time: '1 मिनट पहले' },
  { shop: 'गुप्ता गारमेंट्स', action: 'HD पोस्टर डाउनलोड किया', template: 'शुभ प्रभात (Morning)', time: '3 मिनट पहले' },
  { shop: 'चौधरी मिष्ठान भंडार', action: 'WhatsApp स्टेटस लगाया', template: 'पावन त्योहार (Festive)', time: '6 मिनट पहले' },
  { shop: 'जय हिंद किराना स्टोर', action: '1-क्लिक शेयर किया', template: 'उधारी बंद (Cash)', time: '9 मिनट पहले' },
  { shop: 'अग्रवाल मेडिकल स्टोर', action: 'HD पोस्टर डाउनलोड किया', template: 'फ्री होम डिलीवरी', time: '14 मिनट पहले' },
];

export const MiniDashboard: React.FC<MiniDashboardProps> = ({ language = 'hinglish' }) => {
  const [timeframe, setTimeframe] = useState<'7d' | '14d'>('7d');
  const activeData = timeframe === '7d' ? DATA_7_DAYS : DATA_14_DAYS;

  const totalWhatsApp = activeData.reduce((acc, curr) => acc + curr.whatsappShares, 0);
  const totalDownloads = activeData.reduce((acc, curr) => acc + curr.imageDownloads, 0);
  const grandTotal = totalWhatsApp + totalDownloads;
  const todayShares = activeData[activeData.length - 1]?.totalShares || 0;
  const whatsappPercentage = Math.round((totalWhatsApp / grandTotal) * 100);

  const isEn = language === 'english';
  const isHi = language === 'hindi';

  return (
    <div className="space-y-6 text-white animate-fadeIn">
      {/* Top Banner / Timeframe Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black text-white">
              {isEn
                ? 'Mini Dashboard: Daily Share Counts & Template Popularity'
                : isHi
                ? 'मिनी डैशबोर्ड: दैनिक शेयर गणना व लोकप्रिय टेम्पलेट्स'
                : 'Mini Dashboard: Daily Share Counts & Popular Templates'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEn
              ? 'Realtime visualization of WhatsApp status shares and poster downloads'
              : 'दुकानदारों द्वारा रोज़ WhatsApp पर शेयर और डाउनलोड किए जा रहे पोस्टर्स का लाइव डेटा'}
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setTimeframe('7d')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeframe === '7d'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEn ? 'Last 7 Days' : 'पिछले 7 दिन'}
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('14d')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeframe === '14d'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEn ? 'Last 14 Days' : 'पिछले 14 दिन'}
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Today Shares */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>{isEn ? 'Today Shares' : isHi ? 'आज के कुल शेयर' : 'Aaj Ke Total Shares'}</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {todayShares.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +41.8% {isEn ? 'vs yesterday' : 'कल के मुकाबले वृद्धि'}
          </span>
        </div>

        {/* KPI 2: WhatsApp Share Rate */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>{isEn ? 'WhatsApp Share %' : isHi ? 'व्हाट्सएप शेयर दर' : 'WhatsApp Share Rate'}</span>
            <MessageCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            {whatsappPercentage}%
          </div>
          <span className="text-[11px] text-slate-400">
            {totalWhatsApp.toLocaleString('en-IN')} {isEn ? 'direct WhatsApp clicks' : 'डायरेक्ट WhatsApp शेयर्स'}
          </span>
        </div>

        {/* KPI 3: Total Exports */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>{isEn ? 'Total Exports' : isHi ? 'कुल पोस्टर निर्यात' : 'Total Poster Exports'}</span>
            <Download className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-400">
            {grandTotal.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400">
            {totalDownloads.toLocaleString('en-IN')} {isEn ? 'HD gallery downloads' : 'गैलरी में सेव'}
          </span>
        </div>

        {/* KPI 4: Top Template */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>{isEn ? 'Most Viral Category' : isHi ? 'सर्वाधिक वायरल श्रेणी' : 'Sabse Viral Category'}</span>
            <Award className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-lg sm:text-xl font-black text-white truncate">
            {POPULAR_TEMPLATES[0].category}
          </div>
          <span className="text-[11px] text-amber-300 font-semibold">
            ⭐ {POPULAR_TEMPLATES[0].shares.toLocaleString('en-IN')} {isEn ? 'shares' : 'शेयर्स'}
          </span>
        </div>
      </div>

      {/* Two Column Charts: Daily Shares & Popular Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Chart 1: Daily Share Counts (WhatsApp vs Downloads) - 7 cols */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                <span>{isEn ? 'Daily Share Counts Over Time' : isHi ? 'दैनिक शेयर गणना व वृद्धि ग्राफ' : 'Daily Share Counts Graph'}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Recharts Live
                </span>
              </h4>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Comparing direct 1-click WhatsApp shares vs HD gallery downloads'
                  : 'WhatsApp 1-क्लिक शेयर और HD डाउनलोड्स की दैनिक तुलना'}
              </p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWhatsApp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  }}
                  itemStyle={{ color: '#ffffff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area
                  type="monotone"
                  dataKey="whatsappShares"
                  name={isEn ? 'WhatsApp Shares' : 'WhatsApp शेयर्स'}
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorWhatsApp)"
                />
                <Area
                  type="monotone"
                  dataKey="imageDownloads"
                  name={isEn ? 'HD Downloads' : 'HD डाउनलोड्स'}
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorDownloads)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
            <span className="font-semibold">
              ⚡ <strong>{isEn ? 'Key Takeaway:' : 'मुख्य निष्कर्ष:'}</strong> {isEn ? '66% of users share directly to WhatsApp status without downloading first!' : '66% दुकानदार डाउनलोड करने के बजाय सीधे WhatsApp स्टेटस पर 1-क्लिक शेयर करते हैं!'}
            </span>
          </div>
        </div>

        {/* Chart 2: Popular Templates Ranking (Horizontal/Vertical Bar Chart) - 5 cols */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="pb-3 border-b border-slate-800">
            <h4 className="font-extrabold text-base text-white flex items-center justify-between">
              <span>{isEn ? 'Popular Templates Ranking' : isHi ? 'सर्वाधिक लोकप्रिय टेम्पलेट्स रैंकिंग' : 'Popular Templates Ranking'}</span>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                Top 6
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              {isEn ? 'Ranked by total shares and user engagement' : 'कुल शेयर व दुकानदारों के जुड़ाव के आधार पर'}
            </p>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={POPULAR_TEMPLATES}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis
                  dataKey="category"
                  type="category"
                  stroke="#94a3b8"
                  tick={{ fontSize: 11, fontWeight: 700 }}
                  width={75}
                />
                <Tooltip
                  formatter={(val: any) => [`${Number(val).toLocaleString('en-IN')} shares`, 'कुल शेयर्स']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                  }}
                  itemStyle={{ color: '#fbbf24', fontSize: '12px' }}
                />
                <Bar
                  dataKey="shares"
                  name={isEn ? 'Total Shares' : 'कुल शेयर्स'}
                  fill="#f59e0b"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-1">
            {POPULAR_TEMPLATES.slice(0, 3).map((tpl, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <span className="font-semibold text-slate-200">{tpl.name}</span>
                </div>
                <span className="font-bold text-amber-400">{tpl.shares.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Recent Share Stream Feed & Peak Times */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Live Feed (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h4 className="font-black text-sm sm:text-base text-white">
                {isEn ? 'Live Recent Share Feed' : isHi ? 'लाइव हालिया शेयर गतिविधि' : 'Live Recent Share Feed'}
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">
              {isEn ? 'Realtime Shopkeeper Stream' : 'दुकानदारों की लाइव गतिविधि'}
            </span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {RECENT_SHARE_FEED.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">{item.shop}</span>
                    <span className="text-[11px] text-slate-400">
                      {item.action} • <span className="text-amber-400">{item.template}</span>
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0 font-mono">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Sharing Hours Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="pb-3 border-b border-slate-800">
            <h4 className="font-black text-sm sm:text-base text-white">
              ⏰ {isEn ? 'Peak Sharing Windows' : isHi ? 'शेयरिंग के सबसे व्यस्त समय' : 'Peak Sharing Windows'}
            </h4>
            <p className="text-xs text-slate-400">
              {isEn ? 'When Indian shopkeepers post on WhatsApp' : 'दुकानदार किस समय सबसे ज्यादा WhatsApp स्टेटस लगाते हैं'}
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-amber-300">🌅 7:00 AM - 9:30 AM (दुकान खोलते समय)</span>
                <span className="font-extrabold text-amber-400">48%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '48%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-emerald-300">🌙 7:00 PM - 9:30 PM (शाम की सेल)</span>
                <span className="font-extrabold text-emerald-400">28%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-sky-300">☀️ 1:00 PM - 3:00 PM (दोपहर का समय)</span>
                <span className="font-extrabold text-sky-400">16%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '16%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-purple-300">✨ अन्य समय (Midnight / Early)</span>
                <span className="font-extrabold text-purple-400">8%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '8%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 leading-relaxed">
            💡 <strong>मालिक के लिए टिप:</strong> सुबह 7:30 बजे दुकानदारों को नए 'शुभ प्रभात' पोस्टर का पुश/ब्रॉडकास्ट भेजें। इस समय कन्वर्शन सबसे अधिक होता है!
          </div>
        </div>
      </div>
    </div>
  );
};
