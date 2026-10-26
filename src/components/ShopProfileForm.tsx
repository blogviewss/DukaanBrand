import React, { useRef } from 'react';
import { ShopProfile, CanvasFormat } from '../types/dukaan';
import { SHOP_PRESETS } from '../data/templates';
import { Store, User, Phone, MapPin, Sparkles, Upload, Image as ImageIcon, X, Smartphone, Square, QrCode, Crown, Tag } from 'lucide-react';
import { Language } from '../types';

interface ShopProfileFormProps {
  profile: ShopProfile;
  onChange: (updated: Partial<ShopProfile>) => void;
  format: CanvasFormat;
  onFormatChange: (format: CanvasFormat) => void;
  language: Language;
  isPro?: boolean;
  onOpenProModal?: () => void;
}

export const ShopProfileForm: React.FC<ShopProfileFormProps> = ({
  profile,
  onChange,
  format,
  onFormatChange,
  language,
  isPro = false,
  onOpenProModal,
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
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4 text-white shadow-xl">
      {/* 1. Size Selection: 9:16 Status vs 1:1 Square */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
          {language === 'hinglish' ? 'पोस्टर का आकार (Size):' : 'Select Poster Size:'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onFormatChange('story')}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-black transition-all cursor-pointer ${
              format === 'story'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>WhatsApp स्टेटस (9:16)</span>
          </button>

          <button
            type="button"
            onClick={() => onFormatChange('square')}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-black transition-all cursor-pointer ${
              format === 'square'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Square className="w-4 h-4 text-sky-400" />
            <span>चौकोर DP / पोस्ट (1:1)</span>
          </button>
        </div>
      </div>

      {/* 2. Quick 1-Tap Category Presets (For illiterate or busy shopkeepers) */}
      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
        <label className="block text-[11px] font-black uppercase text-amber-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>1-क्लिक में दुकान चुनें (Auto-Fill):</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SHOP_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePresetSelect(preset)}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-amber-400/50 transition-colors cursor-pointer active:scale-95"
            >
              + {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Essential Shop Details */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
            <Store className="w-4 h-4 text-amber-400" />
            <span>दुकान या व्यापार का नाम *</span>
          </label>
          <input
            type="text"
            value={profile.shopName}
            onChange={(e) => onChange({ shopName: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-bold"
            placeholder="उदा. श्री बालाजी किराना स्टोर"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp / फोन नंबर *</span>
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-mono font-bold"
              placeholder="98765-43210"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <User className="w-4 h-4 text-sky-400" />
              <span>मालिक / प्रोप्राइटर (वैकल्पिक)</span>
            </label>
            <input
              type="text"
              value={profile.ownerName}
              onChange={(e) => onChange({ ownerName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="उदा. रमेश कुमार जी"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>दुकान का पता व शहर</span>
          </label>
          <input
            type="text"
            value={profile.city}
            onChange={(e) => onChange({ city: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            placeholder="मेन मार्केट, चौक बाजार, शहर"
          />
        </div>

        {/* 4. KILLER PRO JUGAD: UPI QR Code on Poster */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-amber-300 flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>पोस्टर पर Google Pay / PhonePe QR लगाएं</span>
            </label>
            <input
              type="checkbox"
              id="showUpiQr"
              checked={profile.showUpiQr || false}
              onChange={(e) => {
                if (!isPro && e.target.checked && onOpenProModal) {
                  onOpenProModal();
                  return;
                }
                onChange({ showUpiQr: e.target.checked });
              }}
              className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
            />
          </div>

          <p className="text-[11px] text-slate-400">
            जब आप WhatsApp पर स्टेटस लगाएंगे, तो ग्राहक सीधे पोस्टर का QR कोड स्कैन करके आपको पैसे भेज सकेंगे!
          </p>

          {(profile.showUpiQr || isPro) && (
            <div>
              <input
                type="text"
                value={profile.upiId || ''}
                onChange={(e) => onChange({ upiId: e.target.value, showUpiQr: true })}
                className="w-full bg-slate-900 border border-amber-500/50 rounded-xl px-3 py-2 text-xs text-amber-200 focus:outline-none font-mono"
                placeholder="उदा. yourname@okaxis या 98xxxx@paytm"
              />
            </div>
          )}
        </div>

        {/* 5. Special Offer / Discount Banner (Pro Feature) */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-orange-400" />
            <span>आज का स्पेशल ऑफर या छूट (वैकल्पिक)</span>
          </label>
          <input
            type="text"
            value={profile.specialOffer || ''}
            onChange={(e) => onChange({ specialOffer: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            placeholder="उदा. सभी सामानों पर 10% की भारी छूट! / फ्री होम डिलीवरी"
          />
        </div>

        {/* 6. Shop Photo / Owner Photo Upload */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>दुकान या मालिक की फोटो (वैकल्पिक)</span>
            </span>
            {profile.logoUrl && (
              <button
                type="button"
                onClick={() => onChange({ logoUrl: null })}
                className="text-rose-400 hover:text-rose-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>हटाएं</span>
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
            className="w-full border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-2xl p-3 flex items-center justify-center gap-3 cursor-pointer bg-slate-950 hover:bg-slate-800/40 transition-colors"
          >
            {profile.logoUrl ? (
              <div className="flex items-center gap-3">
                <img
                  src={profile.logoUrl}
                  alt="Shop Logo"
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow"
                />
                <span className="text-xs text-emerald-400 font-bold">
                  ✓ फोटो जुड़ गई (बदलने के लिए क्लिक करें)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>गैलरी से फोटो चुनें</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
