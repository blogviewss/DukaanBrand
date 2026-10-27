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

  // HTML5 File API and FileReader: reads shop logo from device and stores Base64 string in profile state
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate that user selected an image file
    if (!file.type.startsWith('image/')) {
      alert(language === 'english' ? 'Please select a valid image file (PNG/JPG)' : 'कृपया सही फोटो (PNG/JPG) चुनें');
      return;
    }

    // HTML5 FileReader to read file as Base64 Data URL
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange({ logoUrl: reader.result });
      }
    };
    reader.onerror = (err) => {
      console.error('FileReader failed to read image file:', err);
    };
    reader.readAsDataURL(file);

    // Reset input so re-selecting same file triggers onChange
    e.target.value = '';
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

  const isEn = language === 'english';
  const isHi = language === 'hindi';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4 text-white shadow-xl">
      {/* 1. Size Selection: 9:16 Status vs 1:1 Square */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
          {isEn ? 'Select Poster Size:' : isHi ? 'पोस्टर का आकार (साइज):' : 'Poster Ka Size (Format):'}
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
            <span>{isEn ? 'WhatsApp Status (9:16)' : isHi ? 'व्हाट्सएप स्टेटस (9:16)' : 'WhatsApp Status (9:16)'}</span>
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
            <span>{isEn ? 'Square Post / DP (1:1)' : isHi ? 'चौकोर डीपी / पोस्ट (1:1)' : 'Square Post / DP (1:1)'}</span>
          </button>
        </div>
      </div>

      {/* 2. Quick 1-Tap Category Presets */}
      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
        <label className="block text-[11px] font-black uppercase text-amber-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {isEn
              ? '1-Click Auto-Fill Store Type:'
              : isHi
              ? '1-क्लिक में दुकान प्रकार चुनें (ऑटो-फिल):'
              : '1-Click Me Dukaan Chunein (Auto-Fill):'}
          </span>
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
            <span>{isEn ? 'Shop or Business Name *' : isHi ? 'दुकान या व्यापार का नाम *' : 'Dukaan Ka Naam *'}</span>
          </label>
          <input
            type="text"
            value={profile.shopName}
            onChange={(e) => onChange({ shopName: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-bold"
            placeholder={isEn ? 'e.g. Balaji Provisions & Grocery' : 'उदा. श्री बालाजी किराना स्टोर'}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{isEn ? 'WhatsApp / Phone Number *' : isHi ? 'व्हाट्सएप / फोन नंबर *' : 'WhatsApp / Mobile Number *'}</span>
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
              <span>{isEn ? 'Owner Name (Optional)' : isHi ? 'मालिक का नाम (वैकल्पिक)' : 'Malik Ka Naam (Optional)'}</span>
            </label>
            <input
              type="text"
              value={profile.ownerName}
              onChange={(e) => onChange({ ownerName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder={isEn ? 'e.g. Ramesh Kumar' : 'उदा. रमेश कुमार जी'}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>{isEn ? 'Shop Address & Market' : isHi ? 'दुकान का पता व बाजार' : 'Dukaan Ka Pata / Market'}</span>
          </label>
          <input
            type="text"
            value={profile.city}
            onChange={(e) => onChange({ city: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            placeholder={isEn ? 'Main Market, City Center' : 'मेन मार्केट, चौक बाजार, शहर'}
          />
        </div>

        {/* 4. KILLER PRO JUGAD: UPI QR Code on Poster */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-amber-300 flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>
                {isEn
                  ? 'Embed Google Pay / PhonePe QR on Poster (VIP)'
                  : isHi
                  ? 'पोस्टर पर असली गूगल पे/फोनपे क्यूआर लगाएं (वीआईपी)'
                  : 'Poster Pe Google Pay / PhonePe QR Lagayein (VIP)'}
              </span>
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
            {isEn
              ? 'When you post to WhatsApp status, customers can scan this QR code directly to pay you!'
              : isHi
              ? 'जब आप व्हाट्सएप पर स्टेटस लगाएंगे, तो ग्राहक सीधे पोस्टर का क्यूआर कोड स्कैन करके आपको पैसे भेज सकेंगे!'
              : 'Jab aap WhatsApp pe status lagayenge, to customer direct poster ka QR scan karke payment kar sakenge!'}
          </p>

          {(profile.showUpiQr || isPro) && (
            <div>
              <input
                type="text"
                value={profile.upiId || ''}
                onChange={(e) => onChange({ upiId: e.target.value, showUpiQr: true })}
                className="w-full bg-slate-900 border border-amber-500/50 rounded-xl px-3 py-2 text-xs text-amber-200 focus:outline-none font-mono"
                placeholder={isEn ? 'e.g. yourname@okaxis or 98xxxx@paytm' : 'उदा. yourname@okaxis या 98xxxx@paytm'}
              />
            </div>
          )}
        </div>

        {/* 5. Special Offer / Discount Banner (Pro Feature) */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-orange-400" />
            <span>
              {isEn
                ? "Today's Special Offer / Discount (Optional)"
                : isHi
                ? 'आज का विशेष ऑफर या छूट (वैकल्पिक)'
                : 'Aaj Ka Special Offer / Discount (Optional)'}
            </span>
          </label>
          <input
            type="text"
            value={profile.specialOffer || ''}
            onChange={(e) => onChange({ specialOffer: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            placeholder={
              isEn
                ? 'e.g. Flat 15% Off on all Grocery / Free Home Delivery'
                : isHi
                ? 'उदा. सभी सामानों पर 10% की भारी छूट! / फ्री होम डिलीवरी'
                : 'उदा. Sabhi saaman par 10% discount! / Free Home Delivery'
            }
          />
        </div>

        {/* 6. HTML5 File API & FileReader: Shop Logo / Photo Upload */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
          <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>
                {isEn
                  ? 'Shop Logo / Owner Photo (Device Upload):'
                  : isHi
                  ? 'दुकान का लोगो या फोटो (डिवाइस से अपलोड करें):'
                  : 'Dukaan Ka Logo / Photo (Device Se Upload):'}
              </span>
            </span>
            {profile.logoUrl && (
              <button
                type="button"
                onClick={() => onChange({ logoUrl: null })}
                className="text-rose-400 hover:text-rose-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{isEn ? 'Remove' : isHi ? 'हटाएं' : 'Hatayein'}</span>
              </button>
            )}
          </label>

          <p className="text-[11px] text-slate-400">
            {isEn
              ? 'Upload your shop logo or photo from device to display inside a gold circular ring on the poster.'
              : isHi
              ? 'फोन या कंप्यूटर से दुकान का लोगो अपलोड करें — यह सीधे पोस्टर पर सुनहरे गोल फ्रेम में दिखेगा।'
              : 'Phone se dukaan ka logo upload karein — poster par ye golden frame me chamkega.'}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className={`w-full border-2 border-dashed rounded-2xl p-4 flex items-center justify-center gap-3 cursor-pointer transition-all ${
              profile.logoUrl
                ? 'border-emerald-500/50 bg-emerald-950/20 hover:bg-emerald-950/30'
                : 'border-slate-700 hover:border-amber-400 bg-slate-900/60 hover:bg-slate-900'
            }`}
          >
            {profile.logoUrl ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <img
                    src={profile.logoUrl}
                    alt="Shop Logo"
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-md ring-2 ring-emerald-500/40"
                  />
                  <div>
                    <span className="text-xs text-emerald-400 font-bold block flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {isEn ? '✓ Logo Active on Poster' : isHi ? '✓ लोगो पोस्टर पर सक्रिय' : '✓ Logo Poster Par Active'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {isEn ? 'Click to change logo from device' : 'लोगो बदलने के लिए यहाँ क्लिक करें'}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/30">
                  {isEn ? 'Change' : 'बदलें'}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-2 text-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1.5">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white">
                  {isEn ? 'Choose Logo / Photo from Device' : 'डिवाइस या गैलरी से लोगो चुनें'}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {isEn ? 'Supports PNG, JPG, WebP (Instant Base64 Preview)' : 'PNG, JPG या कैमरा फोटो (HTML5 File Upload)'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
