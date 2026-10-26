import React, { useRef } from 'react';
import { ShopProfile, CanvasFormat } from '../types/dukaan';
import { SHOP_PRESETS } from '../data/templates';
import { Store, User, Phone, MapPin, Sparkles, Upload, Image as ImageIcon, X, Smartphone, Square } from 'lucide-react';
import { Language } from '../types';

interface ShopProfileFormProps {
  profile: ShopProfile;
  onChange: (updated: Partial<ShopProfile>) => void;
  format: CanvasFormat;
  onFormatChange: (format: CanvasFormat) => void;
  language: Language;
}

export const ShopProfileForm: React.FC<ShopProfileFormProps> = ({
  profile,
  onChange,
  format,
  onFormatChange,
  language,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onChange({ logoUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handlePresetSelect = (preset: typeof SHOP_PRESETS[0]) => {
    onChange({
      shopName: preset.shopName,
      ownerName: preset.owner,
      phone: preset.phone,
      city: preset.city,
      tagline: preset.tagline,
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 text-white shadow-xl">
      {/* Format Selector: 9:16 vs 1:1 */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          {language === 'hinglish' ? 'पोस्टर का आकार चुनें (Size)' : 'Select Poster Dimensions'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onFormatChange('story')}
            className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
              format === 'story'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>{language === 'hinglish' ? 'WhatsApp स्टेटस (9:16)' : 'WhatsApp Status (9:16)'}</span>
          </button>

          <button
            type="button"
            onClick={() => onFormatChange('square')}
            className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
              format === 'square'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Square className="w-4 h-4 text-sky-400" />
            <span>{language === 'hinglish' ? 'स्क्वेयर DP व पोस्ट (1:1)' : 'Square Feed / DP (1:1)'}</span>
          </button>
        </div>
      </div>

      {/* Quick 1-Click Sample Presets */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{language === 'hinglish' ? 'त्वरित दुकान सैंपल भरें (1-क्लिक)' : 'Quick Sample Presets'}</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SHOP_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePresetSelect(preset)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-amber-500/40 transition-colors cursor-pointer"
            >
              + {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'hinglish' ? 'दुकान या व्यापार का नाम' : 'Shop / Business Name'}</span>
          </label>
          <input
            type="text"
            value={profile.shopName}
            onChange={(e) => onChange({ shopName: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-semibold"
            placeholder="उदा. श्री बालाजी किराना स्टोर"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>{language === 'hinglish' ? 'मालिक / प्रोप्राइटर' : 'Proprietor Name'}</span>
            </label>
            <input
              type="text"
              value={profile.ownerName}
              onChange={(e) => onChange({ ownerName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="उदा. रमेश कुमार जी"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'hinglish' ? 'WhatsApp / फोन नंबर' : 'Phone / WhatsApp'}</span>
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-mono"
              placeholder="98765-43210"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>{language === 'hinglish' ? 'दुकान का पता व शहर' : 'Shop Address & City'}</span>
          </label>
          <input
            type="text"
            value={profile.city}
            onChange={(e) => onChange({ city: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
            placeholder="मेन बाजार, चौक मार्केट, दिल्ली"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            {language === 'hinglish' ? 'टैगलाइन या मुख्य विशेषता' : 'Tagline or Specialty'}
          </label>
          <input
            type="text"
            value={profile.tagline}
            onChange={(e) => onChange({ tagline: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
            placeholder="शुद्धता और भरोसे का 25 वर्षों का सफर"
          />
        </div>

        {/* Logo / Shop Photo Upload */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'hinglish' ? 'दुकान की फोटो या लोगो (वैकल्पिक)' : 'Shop Logo or Photo (Optional)'}</span>
            </span>
            {profile.logoUrl && (
              <button
                type="button"
                onClick={() => onChange({ logoUrl: null })}
                className="text-rose-400 hover:text-rose-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>{language === 'hinglish' ? 'हटाएं' : 'Remove'}</span>
              </button>
            )}
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-slate-700 hover:border-amber-400/80 rounded-2xl p-3 flex items-center justify-center gap-3 cursor-pointer bg-slate-950 hover:bg-slate-800/40 transition-colors"
          >
            {profile.logoUrl ? (
              <div className="flex items-center gap-3">
                <img
                  src={profile.logoUrl}
                  alt="Shop Logo"
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow"
                />
                <span className="text-xs text-emerald-400 font-bold">
                  ✓ {language === 'hinglish' ? 'फोटो अपलोड हो गई (बदलने के लिए क्लिक करें)' : 'Photo uploaded (Click to change)'}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>{language === 'hinglish' ? 'गैलरी से फोटो/लोगो चुनें' : 'Upload photo from phone/PC'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
