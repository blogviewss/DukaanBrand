import React from 'react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { DailyMetric, CategoryMetric } from '../types/admin';
import { TrendingUp, Users, Image as ImageIcon, IndianRupee, Sparkles, ArrowUpRight, ShieldCheck } from 'lucide-react';

const SAMPLE_DAILY_DATA: DailyMetric[] = [
  { date: '20 Oct', visitors: 1120, postersGenerated: 2450, proConversions: 42, revenue: 420 },
  { date: '21 Oct', visitors: 1480, postersGenerated: 3100, proConversions: 58, revenue: 580 },
  { date: '22 Oct', visitors: 1950, postersGenerated: 4200, proConversions: 79, revenue: 790 },
  { date: '23 Oct', visitors: 2600, postersGenerated: 5800, proConversions: 104, revenue: 1040 },
  { date: '24 Oct', visitors: 3400, postersGenerated: 7400, proConversions: 138, revenue: 1380 },
  { date: '25 Oct', visitors: 4600, postersGenerated: 9900, proConversions: 184, revenue: 1840 },
  { date: '26 Oct', visitors: 5820, postersGenerated: 12400, proConversions: 242, revenue: 2420 },
];

const CATEGORY_POPULARITY: CategoryMetric[] = [
  { name: 'शुभ प्रभात (Morning Quotes)', posters: 18400, sharePercentage: 42, color: '#f59e0b' },
  { name: 'पावन त्योहार (Festivals)', posters: 14200, sharePercentage: 32, color: '#e11d48' },
  { name: 'दुकान सेल व ऑफर (Offers)', posters: 6500, sharePercentage: 15, color: '#0d9488' },
  { name: 'उधारी व बिल रसीद (Udhar)', posters: 3800, sharePercentage: 7, color: '#0284c7' },
  { name: 'विजिटिंग कार्ड (Cards)', posters: 1900, sharePercentage: 4, color: '#8b5cf6' },
];

export const AdminAnalytics: React.FC = () => {
  const totalVisitors = SAMPLE_DAILY_DATA.reduce((acc, curr) => acc + curr.visitors, 0);
  const totalPosters = SAMPLE_DAILY_DATA.reduce((acc, curr) => acc + curr.postersGenerated, 0);
  const totalConversions = SAMPLE_DAILY_DATA.reduce((acc, curr) => acc + curr.proConversions, 0);
  const totalRev = SAMPLE_DAILY_DATA.reduce((acc, curr) => acc + curr.revenue, 0);
  const avgConversionRate = ((totalConversions / totalVisitors) * 100).toFixed(2);

  return (
    <div className="space-y-8 animate-fadeIn text-white">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>7-दिन के कुल विजिटर्स</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalVisitors.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +38.5% WhatsApp वायरल लूप से वृद्धि
          </span>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>कुल जनरेटेड पोस्टर्स</span>
            <ImageIcon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {totalPosters.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400">
            100% Client-Side रेंडर (₹0 सर्वर खर्च)
          </span>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>₹10 VIP Pro कन्वर्शन दर</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            {avgConversionRate}%
          </div>
          <span className="text-[11px] text-slate-400">
            {totalConversions} दुकानदारों ने ₹10 दिए
          </span>
        </div>

        {/* KPI 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>सप्ताह की कुल कमाई</span>
            <IndianRupee className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            ₹{totalRev.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-400 font-bold">
            100% शुद्ध मुनाफा (Direct Bank UPI)
          </span>
        </div>
      </div>

      {/* Chart 1: Daily Visitors & Posters Trend */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <h4 className="font-extrabold text-base text-white">
              दैनिक विजिटर्स व पोस्टर जनरेशन ग्राफ (Daily Growth)
            </h4>
            <p className="text-xs text-slate-400">
              दुकानदार रोज़ सुबह WhatsApp Status लगाते हैं, जिससे नए लोग खुद-ब-खुद जुड़ते हैं
            </p>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 self-start sm:self-auto">
            ⚡ Viral K-Factor: 1.34x
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SAMPLE_DAILY_DATA}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPosters" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="visitors" name="दैनिक विजिटर्स (Visitors)" stroke="#38bdf8" fillOpacity={1} fill="url(#colorVisitors)" />
              <Area type="monotone" dataKey="postersGenerated" name="बनाए गए पोस्टर्स (Posters Created)" stroke="#f59e0b" fillOpacity={1} fill="url(#colorPosters)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Charts: Pro Conversions & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Chart 2: Daily ₹10 Pro Revenue (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="pb-2 border-b border-slate-800">
            <h4 className="font-extrabold text-base text-white">
              दैनिक ₹10 VIP Pro भुगतान (Daily Revenue)
            </h4>
            <p className="text-xs text-slate-400">
              प्रत्येक दिन कितने दुकानदारों ने ₹10 देकर वॉटरमार्क हटाया
            </p>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SAMPLE_DAILY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#ffffff' }}
                />
                <Bar dataKey="revenue" name="दैनिक कमाई (₹ Revenue)" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Category Popularity Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="pb-2 border-b border-slate-800">
            <h4 className="font-extrabold text-base text-white">
              सबसे लोकप्रिय कैटेगरीज (Top Categories)
            </h4>
            <p className="text-xs text-slate-400">
              दुकानदार सबसे ज़्यादा कौन से पोस्टर्स बना रहे हैं
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            {CATEGORY_POPULARITY.map((cat, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-semibold">{cat.name}</span>
                  <span className="font-bold text-amber-400">{cat.sharePercentage}% ({cat.posters.toLocaleString('en-IN')})</span>
                </div>
                {/* Visual bar */}
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${cat.sharePercentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-relaxed mt-4">
            💡 <strong>बिज़नेस इनसाइट:</strong> 74% दुकानदार रोज़ सुबह सुविचार और त्योहारों के पोस्टर बनाते हैं। सुबह 7:00 AM से 9:00 AM के बीच सबसे ज़्यादा ट्रैफिक आता है।
          </div>
        </div>
      </div>
    </div>
  );
};
