import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Sparkles, 
  Target, 
  Award, 
  Zap, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  AreaChart, 
  Area 
} from 'recharts';

interface ProfitPotentialCalculatorProps {
  currentMonthlyPrice: number;
  currentActiveSubscribers: number;
}

export const ProfitPotentialCalculator: React.FC<ProfitPotentialCalculatorProps> = ({
  currentMonthlyPrice = 10,
  currentActiveSubscribers = 2,
}) => {
  const [proUsers, setProUsers] = useState<number>(500);
  const [pricePerMonth, setPricePerMonth] = useState<number>(currentMonthlyPrice || 10);
  const [organicGrowthPercent, setOrganicGrowthPercent] = useState<number>(15);

  // Financial calculations
  const monthlyRevenue = useMemo(() => proUsers * pricePerMonth, [proUsers, pricePerMonth]);
  const annualRevenue = useMemo(() => monthlyRevenue * 12, [monthlyRevenue]);
  const dailyPassiveIncome = useMemo(() => Math.round(monthlyRevenue / 30), [monthlyRevenue]);
  const serverCost = 0; // 100% client-side free static architecture
  const netProfitMonthly = monthlyRevenue - serverCost;
  const profitMarginPercent = 100;

  // 12-Month Growth Projection Chart Data
  const projectionData = useMemo(() => {
    const data = [];
    let runningUsers = proUsers;
    const monthlyMultiplier = 1 + organicGrowthPercent / 100;

    for (let month = 1; month <= 12; month++) {
      const rev = Math.round(runningUsers * pricePerMonth);
      data.push({
        month: `महीना ${month}`,
        users: Math.round(runningUsers),
        revenue: rev,
        profit: rev,
      });
      runningUsers = runningUsers * monthlyMultiplier;
    }
    return data;
  }, [proUsers, pricePerMonth, organicGrowthPercent]);

  // Preset user count buttons
  const userPresets = [100, 250, 500, 1000, 2500, 5000];
  const pricePresets = [9, 10, 29, 49, 99];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-sky-500/15 border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>प्रॉफिट पोटेंशियल व रेवेन्यू ट्रैकर (Profit Potential Tool)</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% शुद्ध मुनाफा
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                भारत का ₹10 माइक्रो-सास मॉडल: जानिए 500 से 5,000 सक्रिय दुकानों से आपकी कितनी मासिक व सालाना कमाई होगी।
              </p>
            </div>
          </div>

          <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-right shrink-0">
            <span className="text-[11px] text-slate-400 block">वर्तमान एक्टिव मेंबर्स</span>
            <span className="text-sm font-black text-emerald-400">{currentActiveSubscribers} दुकानें (₹{currentActiveSubscribers * currentMonthlyPrice}/माह)</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
          <div className="text-[11px] font-black uppercase text-amber-400 tracking-wider mb-1 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" />
            <span>मासिक अनुमानित आय</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            ₹{monthlyRevenue.toLocaleString('en-IN')}
            <span className="text-xs text-slate-400 font-bold"> /महीना</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold block mt-1">
            ✓ {proUsers.toLocaleString('en-IN')} दुकानें × ₹{pricePerMonth}
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
          <div className="text-[11px] font-black uppercase text-emerald-400 tracking-wider mb-1 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>सालाना कुल कमाई (ARR)</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            ₹{annualRevenue.toLocaleString('en-IN')}
            <span className="text-xs text-slate-400 font-bold"> /साल</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">
            12 महीने का कुल आवर्ती राजस्व
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
          <div className="text-[11px] font-black uppercase text-sky-400 tracking-wider mb-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            <span>दैनिक पैसिव इनकम</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-400">
            ₹{dailyPassiveIncome.toLocaleString('en-IN')}
            <span className="text-xs text-slate-400 font-bold"> /दिन</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">
            बिना किसी अतिरिक्त काम के रोज़ाना आय
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
          <div className="text-[11px] font-black uppercase text-rose-400 tracking-wider mb-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>सर्वर लागत (Server Cost)</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            ₹0
            <span className="text-xs text-emerald-400 font-bold"> (100% Free)</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold block mt-1">
            शुद्ध प्रॉफिट मार्जिन: {profitMarginPercent}%
          </span>
        </div>
      </div>

      {/* Interactive Controls & Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Controls (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-6 shadow-xl">
          <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
            <h4 className="font-black text-sm sm:text-base text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>पैरामीटर सेट करें (Adjust Values)</span>
            </h4>
            <span className="text-[11px] text-slate-400">लाइव अपडेट</span>
          </div>

          {/* Control 1: Number of Active Pro Users */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-300">
                सक्रिय प्रो दुकानें (Subscribed Shops):
              </label>
              <span className="font-mono font-black text-amber-400 text-sm">
                {proUsers.toLocaleString('en-IN')} दुकानें
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={5000}
              step={10}
              value={proUsers}
              onChange={(e) => setProUsers(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {userPresets.map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setProUsers(u)}
                  className={`text-[11px] font-bold px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                    proUsers === u
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Control 2: Monthly Price */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-300">
                मासिक शुल्क प्रति दुकान (Monthly Price):
              </label>
              <span className="font-mono font-black text-emerald-400 text-sm">
                ₹{pricePerMonth} /माह
              </span>
            </div>

            <input
              type="range"
              min={5}
              max={199}
              step={1}
              value={pricePerMonth}
              onChange={(e) => setPricePerMonth(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {pricePresets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPricePerMonth(p)}
                  className={`text-[11px] font-bold px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                    pricePerMonth === p
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  ₹{p}
                </button>
              ))}
            </div>
          </div>

          {/* Control 3: Monthly Organic Growth Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-300">
                मासिक वायरल रेफरल बढ़त (Growth Rate %):
              </label>
              <span className="font-mono font-black text-sky-400 text-sm">
                +{organicGrowthPercent}% हर महीने
              </span>
            </div>

            <input
              type="range"
              min={5}
              max={50}
              step={5}
              value={organicGrowthPercent}
              onChange={(e) => setOrganicGrowthPercent(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
            <span className="text-[10px] text-slate-400 block">
              जब एक दुकानदार स्टेटस लगाएगा, तो उसके 3-5 व्यापारी दोस्त भी ऐप इस्तेमाल करना शुरू करेंगे।
            </span>
          </div>

          {/* Quick Real-Life Comparison */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <span className="text-amber-400 font-bold block">💡 वास्तविक उदाहरण (Real Bharat Case):</span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              अगर आपके शहर या कस्बे के सिर्फ <strong>500 दुकानदार</strong> रोज़ाना स्टेटस बनाने के लिए ₹{pricePerMonth}/माह देते हैं, तो आपको हर महीने सीधे आपके PhonePe / बैंक खाते में <strong>₹{monthlyRevenue.toLocaleString('en-IN')}</strong> मिलेंगे, बिना किसी डिलीवरी या झंझट के!
            </p>
          </div>
        </div>

        {/* Right: Projected Revenue Chart & Growth Milestones (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Chart Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-800">
              <div>
                <h4 className="font-black text-sm sm:text-base text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>12-महीने का अनुमानित विकास ग्राफ (12-Month Projections)</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  +{organicGrowthPercent}% मासिक वायरल लूप के आधार पर राजस्व वृद्धि
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
                Month 12: ₹{projectionData[11]?.revenue.toLocaleString('en-IN') || 0}
              </span>
            </div>

            {/* Recharts Chart */}
            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false}
                    tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#334155', 
                      borderRadius: '16px',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                    formatter={(val: any, name: any) => [`₹${Number(val).toLocaleString('en-IN')}`, name === 'revenue' ? 'मासिक शुद्ध आय' : name]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#profitGrad)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Growth Milestones Ladder */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3">
            <h4 className="font-black text-sm sm:text-base text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>बिज़नेस माइलस्टोन्स लक्ष्य (Growth Milestones)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className={`p-3 rounded-2xl border transition-all ${
                proUsers >= 100 ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>🎯 स्टेज 1: 100 दुकानें</span>
                  <span className="text-white font-mono">₹{100 * pricePerMonth}/माह</span>
                </div>
                <p className="text-[11px] opacity-80">
                  चाय-नाश्ता व मोबाइल इंटरनेट का पूरा खर्च फ्री।
                </p>
              </div>

              <div className={`p-3 rounded-2xl border transition-all ${
                proUsers >= 500 ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>🚀 स्टेज 2: 500 दुकानें</span>
                  <span className="text-white font-mono">₹{500 * pricePerMonth}/माह</span>
                </div>
                <p className="text-[11px] opacity-80">
                  दुकान या ऑफिस का किराया आसानी से निकल आएगा।
                </p>
              </div>

              <div className={`p-3 rounded-2xl border transition-all ${
                proUsers >= 2000 ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>⭐ स्टेज 3: 2,000 दुकानें</span>
                  <span className="text-white font-mono">₹{2000 * pricePerMonth}/माह</span>
                </div>
                <p className="text-[11px] opacity-80">
                  सरकारी नौकरी के बराबर स्थाई पैसिव आय।
                </p>
              </div>

              <div className={`p-3 rounded-2xl border transition-all ${
                proUsers >= 5000 ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>👑 स्टेज 4: 5,000 दुकानें</span>
                  <span className="text-amber-300 font-mono font-black">₹{5000 * pricePerMonth}/माह</span>
                </div>
                <p className="text-[11px] opacity-80">
                  सफल भारतीय माइक्रो-सास बिज़नेस का निर्माण!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
