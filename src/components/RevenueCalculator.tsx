import React, { useState } from 'react';
import { Language } from '../types';
import { Calculator, TrendingUp, IndianRupee, Server, Users, Sparkles, CheckCircle2 } from 'lucide-react';

interface RevenueCalculatorProps {
  language: Language;
}

export const RevenueCalculator: React.FC<RevenueCalculatorProps> = ({ language }) => {
  const [totalUsers, setTotalUsers] = useState<number>(500000); // 5 Lakhs default
  const [conversionRate, setConversionRate] = useState<number>(3.5); // 3.5%
  const [monthlyPrice, setMonthlyPrice] = useState<number>(10); // ₹10
  const [isClientSide, setIsClientSide] = useState<boolean>(true);

  // Calculations
  const payingUsers = Math.round((totalUsers * conversionRate) / 100);
  const monthlyGrossRevenue = payingUsers * monthlyPrice;
  const annualGrossRevenue = monthlyGrossRevenue * 12;

  // Server & Gateway Costs
  // UPI gateway fee is typically 1.2% - 1.8% or flat ₹0 for P2P/low tier UPI QR
  const paymentGatewayFee = Math.round(monthlyGrossRevenue * 0.018); // 1.8%
  // If client-side (Canvas/PWA on Vercel): ₹0 server cost!
  // If cloud-server (GPU/Python/Node rendering): roughly ₹40,000 to ₹1,50,000 per 500k users
  const serverCost = isClientSide ? 0 : Math.round((totalUsers / 10000) * 1500);

  const monthlyNetProfit = Math.max(0, monthlyGrossRevenue - paymentGatewayFee - serverCost);
  const annualNetProfit = monthlyNetProfit * 12;
  const profitMargin = monthlyGrossRevenue > 0 ? Math.round((monthlyNetProfit / monthlyGrossRevenue) * 100) : 0;

  // Formatter in Indian Lakhs/Crores
  const formatIndianCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} करोड़ (Crore)`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} लाख (Lakh)`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {language === 'hinglish' 
                ? '₹10 सचेत मॉडल का कमाई व खर्च सिम्युलेटर' 
                : '₹10 Sachet Revenue & Zero-Cost Profit Simulator'}
            </h3>
          </div>
          <p className="text-sm text-slate-400">
            {language === 'hinglish'
              ? 'स्लाइडर हिलाकर देखें कि सिर्फ ₹10 महीने से 1 लाख से 1 करोड़ यूज़र्स पर कितनी कमाई होगी और सर्वर खर्च कैसे ₹0 रहेगा।'
              : 'Simulate monthly revenue, UPI fees, server costs, and pure profit margins at mass scale.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{language === 'hinglish' ? 'आर्किटेक्चर:' : 'Architecture:'}</span>
          <button
            onClick={() => setIsClientSide(!isClientSide)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isClientSide
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>{isClientSide ? 'Client-Side (₹0 Hosting)' : 'Heavy Backend Server'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Sliders (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Slider 1: Total Users */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                {language === 'hinglish' ? 'कुल मासिक एक्टिव यूज़र्स (MAU)' : 'Total Monthly Active Users'}
              </label>
              <span className="text-base font-extrabold text-amber-400">
                {totalUsers >= 10000000
                  ? `${(totalUsers / 10000000).toFixed(1)} करोड़`
                  : totalUsers >= 100000
                  ? `${(totalUsers / 100000).toFixed(1)} लाख`
                  : totalUsers.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="10000000"
              step="50000"
              value={totalUsers}
              onChange={(e) => setTotalUsers(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
              <span>10,000</span>
              <span>5 लाख</span>
              <span>25 लाख</span>
              <span>50 लाख</span>
              <span>1 करोड़</span>
            </div>
          </div>

          {/* Slider 2: Conversion Rate */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-sky-400" />
                {language === 'hinglish' ? 'पे करने वाले यूज़र्स (Conversion %)' : 'Paying User Conversion %'}
              </label>
              <span className="text-base font-extrabold text-sky-400">
                {conversionRate.toFixed(1)}% ({payingUsers.toLocaleString('en-IN')} लोग)
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
            <p className="text-[11px] text-slate-400 mt-2">
              {language === 'hinglish'
                ? '₹10 जैसी छोटी कीमत में भारतीय ऐप्स में 2% से 5% तक कन्वर्शन आराम से मिल जाता है।'
                : 'With ₹10 micro-pricing, conversion rates easily hover around 2% to 5%.'}
            </p>
          </div>

          {/* Slider 3: Price */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-emerald-400" />
                {language === 'hinglish' ? 'मासिक सब्सक्रिप्शन शुल्क (Price)' : 'Monthly Sachet Price'}
              </label>
              <span className="text-base font-extrabold text-emerald-400">
                ₹{monthlyPrice} / महीना
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[5, 10, 19, 29].map((p) => (
                <button
                  key={p}
                  onClick={() => setMonthlyPrice(p)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    monthlyPrice === p
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  ₹{p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {language === 'hinglish' ? 'अनुमानित शुद्ध मासिक लाभ (Net Profit)' : 'Estimated Net Monthly Profit'}
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 mb-1">
              {formatIndianCurrency(monthlyNetProfit)} / माह
            </div>
            <span className="text-xs text-slate-400">
              वार्षिक (Yearly): <strong className="text-white">{formatIndianCurrency(annualNetProfit)}</strong>
            </span>

            {/* Financial Breakdown */}
            <div className="mt-6 pt-5 border-t border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>{language === 'hinglish' ? 'सकल कमाई (Gross Revenue):' : 'Gross Monthly Revenue:'}</span>
                <span className="font-semibold text-white">₹{monthlyGrossRevenue.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>{language === 'hinglish' ? 'UPI गेटवे शुल्क (~1.8%):' : 'UPI Payment Gateway (~1.8%):'}</span>
                <span className="text-rose-400 font-medium">- ₹{paymentGatewayFee.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1">
                  {language === 'hinglish' ? 'सर्वर / होस्टिंग खर्च:' : 'Cloud Server / Hosting Cost:'}
                  {isClientSide && (
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      Vercel Free Tier
                    </span>
                  )}
                </span>
                <span className={isClientSide ? 'text-emerald-400 font-bold' : 'text-rose-400 font-semibold'}>
                  {isClientSide ? '₹0 (Zero Hosting Cost)' : `- ₹${serverCost.toLocaleString('en-IN')}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300 pt-2 border-t border-slate-800">
                <span>{language === 'hinglish' ? 'शुद्ध प्रॉफिट मार्जिन:' : 'Net Profit Margin:'}</span>
                <span className="text-emerald-400 font-bold text-sm">{profitMargin}%</span>
              </div>
            </div>
          </div>

          {/* Golden Takeaway Box */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200/90 leading-relaxed">
            <strong className="text-amber-300 block mb-1">
              🚀 {language === 'hinglish' ? 'इस गणित की असली ताकत समझें:' : 'The True Power of Sachet Math:'}
            </strong>
            {language === 'hinglish' ? (
              <>
                यदि आप सिर्फ <strong>1 लाख दुकानदारों</strong> को भी ₹10/महीने पर जोड़ लेते हैं, तो आपकी जेब में हर महीने <strong>₹10,00,000 (दस लाख रुपये)</strong> आएंगे! और क्योंकि कोड Vercel पर 100% क्लाइंट-साइड चल रहा है, आपको न तो ऑफिस चाहिए, न कर्मचारी, और न ही सर्वर बिल!
              </>
            ) : (
              <>
                Even capturing just <strong>100,000 active users</strong> at ₹10/month generates <strong>₹10,00,000/month</strong> net recurring income with zero employees, zero office, and zero server bills!
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
