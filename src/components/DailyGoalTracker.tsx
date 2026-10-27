import React, { useState, useEffect } from 'react';
import { Target, Trophy, Flame, Plus, CheckCircle, RotateCcw, ChevronDown, ChevronUp, Share2, Sparkles } from 'lucide-react';

interface DailyGoalTrackerProps {
  onShareTriggered?: () => void;
  currentCount: number;
  onIncrement: () => void;
  onReset: () => void;
  language?: 'hinglish' | 'english';
}

export const DailyGoalTracker: React.FC<DailyGoalTrackerProps> = ({
  currentCount,
  onIncrement,
  onReset,
  language = 'hinglish',
}) => {
  const isHindi = language === 'hinglish';
  const [goal, setGoal] = useState<number>(() => {
    const saved = localStorage.getItem('dukaan_daily_goal_target');
    return saved ? parseInt(saved, 10) || 50 : 50;
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Update target in localStorage
  const handleSetGoal = (newGoal: number) => {
    setGoal(newGoal);
    localStorage.setItem('dukaan_daily_goal_target', newGoal.toString());
  };

  const percentage = Math.min(100, Math.round((currentCount / goal) * 100));
  const isGoalReached = currentCount >= goal;

  // Trigger celebration effect when reaching goal
  useEffect(() => {
    if (isGoalReached && currentCount > 0) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isGoalReached, currentCount]);

  // SVG circular progress calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 p-3 sm:p-4 shadow-xl">
      {/* Celebration Banner */}
      {showCelebration && (
        <div className="absolute inset-0 z-20 bg-emerald-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center animate-fadeIn">
          <Trophy className="w-12 h-12 text-amber-400 animate-bounce mb-1" />
          <h4 className="text-base sm:text-lg font-black text-amber-300">
            {isHindi ? `🎉 बधाई हो! आज का ${goal} शेयर का लक्ष्य पूरा हुआ!` : `🎉 Congratulations! Today's goal of ${goal} shares reached!`}
          </h4>
          <p className="text-xs text-emerald-200 mt-1">
            {isHindi ? 'आपने आज दुकान के ऑफर्स सफलता से पहुँचाए हैं। इससे आज ग्राहकों की भीड़ बढ़ेगी!' : 'You successfully reached your shoppers today. Expect a boost in store footfall!'}
          </p>
          <button
            type="button"
            onClick={() => setShowCelebration(false)}
            className="mt-3 px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer shadow-md"
          >
            {isHindi ? 'बहुत बढ़िया! आगे बढ़ें →' : 'Awesome! Continue →'}
          </button>
        </div>
      )}

      {/* Main Bar */}
      <div className="flex items-center justify-between gap-3">
        {/* Left: Interactive Progress Ring */}
        <div className="relative flex-shrink-0 w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 96 96">
            {/* Background Track */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-800"
              fill="transparent"
            />
            {/* Progress Bar with vibrant gradient */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="url(#goalProgressGradient)"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
              fill="transparent"
            />
            <defs>
              <linearGradient id="goalProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Text inside ring */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-sm sm:text-base font-black text-white leading-tight">
              {currentCount}
              <span className="text-[10px] text-slate-400 font-normal">/{goal}</span>
            </span>
            <span className="text-[10px] font-bold text-amber-400 leading-tight">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Center: Title & Motivation message */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center gap-1 text-amber-400 font-black text-xs sm:text-sm">
              <Target className="w-4 h-4 text-amber-400" />
              <span>{isHindi ? 'आज का डेली शेयर लक्ष्य (Daily Goal)' : 'Daily WhatsApp Share Goal'}</span>
            </div>
            {isGoalReached ? (
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <CheckCircle className="w-3 h-3" /> {isHindi ? 'लक्ष्य पूरा!' : 'Goal Met!'}
              </span>
            ) : (
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-amber-400" /> {isHindi ? 'चालू है' : 'Active'}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-300 mt-1 truncate sm:whitespace-normal font-medium">
            {isHindi ? (
              <>
                {currentCount === 0 && '🎯 आज कम से कम 50 ग्राहकों को WhatsApp पर पोस्टर भेजें।'}
                {currentCount > 0 && currentCount < goal && `🔥 बढ़िया! ${currentCount} ग्राहकों तक पहुंचा, केवल ${goal - currentCount} और बाकी!`}
                {isGoalReached && '🏆 शानदार! आज का लक्ष्य हासिल हो गया। अब बिक्री में भारी उछाल आएगा!'}
              </>
            ) : (
              <>
                {currentCount === 0 && `🎯 Send your poster to at least ${goal} customers on WhatsApp today.`}
                {currentCount > 0 && currentCount < goal && `🔥 Great! Sent to ${currentCount} customers, only ${goal - currentCount} remaining!`}
                {isGoalReached && '🏆 Amazing! Daily target achieved. More walk-in orders await!'}
              </>
            )}
          </p>

          {/* Quick Increment & Preset Buttons */}
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={onIncrement}
              className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-black text-xs flex items-center gap-1 shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>{isHindi ? '+1 शेयर किया' : '+1 Shared'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="py-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
            >
              <span>{isHindi ? 'लक्ष्य बदलें' : 'Change Goal'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Setting Panel */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-800 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400">दुकान का टारगेट चुनें:</span>
              {[20, 50, 100].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleSetGoal(preset)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    goal === preset
                      ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {preset} ग्राहक
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onReset}
              className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>आज की गिनती रीसेट करें</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            💡 टिप: जब भी आप नीचे "WhatsApp पर शेयर करें" या "गैलरी में सेव करें" दबाएंगे, यह गिनती खुद ब खुद +1 बढ़ जाएगी।
          </p>
        </div>
      )}
    </div>
  );
};
