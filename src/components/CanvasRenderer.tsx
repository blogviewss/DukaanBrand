import React, { useRef, useEffect, useState } from 'react';
import { ShopProfile, CanvasFormat } from '../types/dukaan';
import { Template } from '../data/templates';
import { Language } from '../types';
import { Download, Share2, Sparkles, Check, Crown, RefreshCw } from 'lucide-react';

interface CanvasRendererProps {
  profile: ShopProfile;
  template: Template;
  format: CanvasFormat;
  isPro: boolean;
  language: Language;
  onOpenProModal: () => void;
}

export const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  profile,
  template,
  format,
  isPro,
  language,
  onOpenProModal,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Re-draw canvas whenever profile, template, format, or isPro changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions:
    // Story: 1080 x 1920 (9:16 WhatsApp Status)
    // Square: 1080 x 1080 (1:1 DP / Post)
    const width = 1080;
    const height = format === 'story' ? 1920 : 1080;
    canvas.width = width;
    canvas.height = height;

    // Load logo if exists
    let logoImage: HTMLImageElement | null = null;
    if (profile.logoUrl) {
      logoImage = new Image();
      logoImage.crossOrigin = 'anonymous';
      logoImage.src = profile.logoUrl;
      logoImage.onload = () => drawScene(ctx, width, height, logoImage);
    } else {
      drawScene(ctx, width, height, null);
    }

    function drawScene(
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
      logo: HTMLImageElement | null
    ) {
      // 1. Rich Background Gradient
      const grad = context.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, template.bgColors[0]);
      grad.addColorStop(0.5, template.bgColors[1]);
      grad.addColorStop(1, template.bgColors[2]);
      context.fillStyle = grad;
      context.fillRect(0, 0, w, h);

      // 2. Ornate Sacred Mandala / Concentric Rings Background Pattern
      context.save();
      const circleCenterY = format === 'story' ? 580 : 360;
      for (let r = 160; r <= (format === 'story' ? 620 : 420); r += 60) {
        context.beginPath();
        context.arc(w / 2, circleCenterY, r, 0, Math.PI * 2);
        context.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        context.lineWidth = 2;
        context.stroke();
      }
      context.restore();

      // 3. Ornate Golden Border Frame
      context.save();
      context.strokeStyle = template.accentColor;
      context.lineWidth = 4;
      context.strokeRect(36, 36, w - 72, h - 72);

      // Inner thin border
      context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      context.lineWidth = 1.5;
      context.strokeRect(48, 48, w - 96, h - 96);

      // Corner traditional motifs
      const drawCorner = (x: number, y: number) => {
        context.fillStyle = template.accentColor;
        context.fillRect(x - 6, y - 6, 12, 12);
        context.beginPath();
        context.arc(x, y, 16, 0, Math.PI * 2);
        context.strokeStyle = template.accentColor;
        context.lineWidth = 2;
        context.stroke();
      };
      drawCorner(48, 48);
      drawCorner(w - 48, 48);
      drawCorner(48, h - 48);
      drawCorner(w - 48, h - 48);
      context.restore();

      // 4. Auspicious Top Header Banner Ribbon
      const bannerY = format === 'story' ? 100 : 75;
      const bannerH = 76;
      context.save();
      context.fillStyle = 'rgba(0, 0, 0, 0.45)';
      context.beginPath();
      context.roundRect(100, bannerY, w - 200, bannerH, 18);
      context.fill();
      context.strokeStyle = template.accentColor;
      context.lineWidth = 2.5;
      context.stroke();

      context.fillStyle = template.accentColor;
      context.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(
        language === 'hinglish' ? template.headerTagHindi : template.headerTagEnglish,
        w / 2,
        bannerY + bannerH / 2
      );
      context.restore();

      // 5. Central Auspicious Motif / Icon Aura
      const iconY = format === 'story' ? 360 : 230;
      context.save();
      context.beginPath();
      context.arc(w / 2, iconY, format === 'story' ? 100 : 80, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255, 255, 255, 0.12)';
      context.fill();
      context.strokeStyle = template.accentColor;
      context.lineWidth = 4;
      context.stroke();

      context.fillStyle = '#ffffff';
      context.font = format === 'story' ? 'bold 54px "Plus Jakarta Sans"' : 'bold 44px "Plus Jakarta Sans"';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(template.ornamentSymbol, w / 2, iconY);
      context.restore();

      // 6. Main Quote Text (Hindi/English) with Elegant Line Wrapping
      const textStartY = format === 'story' ? 560 : 380;
      const maxTextWidth = w - 220;
      const lineHeight = format === 'story' ? 68 : 54;

      context.save();
      context.fillStyle = '#ffffff';
      context.font = format === 'story' ? 'bold 48px "Plus Jakarta Sans", sans-serif' : 'bold 38px "Plus Jakarta Sans", sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'top';

      const wrapText = (text: string, x: number, startY: number, maxWidth: number, lHeight: number) => {
        const words = text.split(' ');
        let line = '';
        let y = startY;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = context.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            context.fillText(line.trim(), x, y);
            line = words[n] + ' ';
            y += lHeight;
          } else {
            line = testLine;
          }
        }
        context.fillText(line.trim(), x, y);
        return y + lHeight;
      };

      const quoteToDisplay = language === 'hinglish' ? template.mainQuoteHindi : template.mainQuoteEnglish;
      const nextY = wrapText(quoteToDisplay, w / 2, textStartY, maxTextWidth, lineHeight);

      // Sub-quote / Blessing
      context.fillStyle = template.accentColor;
      context.font = format === 'story' ? '500 34px "Plus Jakarta Sans", sans-serif' : '500 28px "Plus Jakarta Sans", sans-serif';
      const subQuoteToDisplay = language === 'hinglish' ? template.subQuoteHindi : template.subQuoteEnglish;
      wrapText(subQuoteToDisplay, w / 2, nextY + 16, maxTextWidth, format === 'story' ? 48 : 38);
      context.restore();

      // 7. Divider Ribbon
      const dividerY = format === 'story' ? 950 : 580;
      context.save();
      context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(180, dividerY);
      context.lineTo(w - 180, dividerY);
      context.stroke();

      // Little diamond in the middle of divider
      context.fillStyle = template.accentColor;
      context.beginPath();
      context.arc(w / 2, dividerY, 8, 0, Math.PI * 2);
      context.fill();
      context.restore();

      // 8. SHOP BRANDING FOOTER CARD (The Game-Changing Merchant Identity!)
      const cardHeight = format === 'story' ? 520 : 380;
      const cardY = h - cardHeight - 80;

      context.save();
      context.shadowColor = 'rgba(0, 0, 0, 0.45)';
      context.shadowBlur = 35;
      context.shadowOffsetY = 15;
      context.fillStyle = '#ffffff';
      context.beginPath();
      context.roundRect(70, cardY, w - 140, cardHeight, 32);
      context.fill();
      context.restore();

      // Inner card contents
      context.save();
      let contentStartY = cardY + 45;

      // Draw shop logo / photo if provided
      if (logo && logo.complete) {
        const logoSize = format === 'story' ? 120 : 90;
        const logoX = w / 2 - logoSize / 2;
        const logoY = cardY - logoSize / 2;

        context.save();
        context.shadowColor = 'rgba(0,0,0,0.3)';
        context.shadowBlur = 20;
        context.beginPath();
        context.arc(w / 2, cardY, logoSize / 2, 0, Math.PI * 2);
        context.clip();
        context.drawImage(logo, logoX, logoY, logoSize, logoSize);
        context.restore();

        // Logo gold border
        context.beginPath();
        context.arc(w / 2, cardY, logoSize / 2, 0, Math.PI * 2);
        context.strokeStyle = '#f59e0b';
        context.lineWidth = 5;
        context.stroke();

        contentStartY += 45;
      }

      // Shop Name
      context.fillStyle = '#0f172a';
      context.font = format === 'story' ? 'bold 50px "Plus Jakarta Sans", sans-serif' : 'bold 40px "Plus Jakarta Sans", sans-serif';
      context.textAlign = 'center';
      context.fillText(profile.shopName || 'आपकी दुकान का नाम', w / 2, contentStartY + 20);

      // Tagline
      if (profile.tagline) {
        context.fillStyle = '#d97706';
        context.font = format === 'story' ? 'bold 26px "Plus Jakarta Sans", sans-serif' : 'bold 22px "Plus Jakarta Sans", sans-serif';
        context.fillText(`★ ${profile.tagline} ★`, w / 2, contentStartY + 64);
      }

      // Proprietor Name (if entered)
      if (profile.ownerName) {
        context.fillStyle = '#475569';
        context.font = format === 'story' ? '600 28px "Plus Jakarta Sans", sans-serif' : '600 22px "Plus Jakarta Sans", sans-serif';
        context.fillText(`प्रो: ${profile.ownerName}`, w / 2, contentStartY + 104);
      }

      // WhatsApp / Phone Pill Badge
      const phonePillY = contentStartY + (format === 'story' ? 145 : 125);
      const pillW = format === 'story' ? 560 : 480;
      const pillH = format === 'story' ? 76 : 64;

      context.fillStyle = '#f0fdf4';
      context.beginPath();
      context.roundRect(w / 2 - pillW / 2, phonePillY, pillW, pillH, 20);
      context.fill();
      context.strokeStyle = '#16a34a';
      context.lineWidth = 2.5;
      context.stroke();

      context.fillStyle = '#15803d';
      context.font = format === 'story' ? 'bold 34px "Plus Jakarta Sans", sans-serif' : 'bold 28px "Plus Jakarta Sans", sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(`📞 WhatsApp / Call: ${profile.phone || '98765-XXXXX'}`, w / 2, phonePillY + pillH / 2);

      // Address
      context.fillStyle = '#334155';
      context.font = format === 'story' ? '500 28px "Plus Jakarta Sans", sans-serif' : '500 22px "Plus Jakarta Sans", sans-serif';
      context.textBaseline = 'alphabetic';
      context.fillText(`📍 ${profile.city || 'दुकान का पता व शहर'}`, w / 2, phonePillY + pillH + (format === 'story' ? 50 : 38));

      // 9. VIRAL WATERMARK LOOP vs PRO VERIFIED BADGE
      const watermarkY = cardY + cardHeight - 24;
      if (!isPro) {
        // Free tier viral link
        context.fillStyle = '#ea580c';
        context.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
        context.textAlign = 'center';
        context.fillText('⚡ अपनी दुकान का फ्री स्टेटस बनाएं: DukaanBrand.in', w / 2, watermarkY);
      } else {
        // Pro VIP badge
        context.fillStyle = '#16a34a';
        context.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
        context.textAlign = 'center';
        context.fillText('✓ 100% Verified Quality Business • Trusted Local Store', w / 2, watermarkY);
      }

      context.restore();
    }
  }, [profile, template, format, isPro, language]);

  // Download high-res PNG/JPG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDownloading(true);
    setTimeout(() => {
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${(profile.shopName || 'Dukaan').replace(/\s+/g, '_')}_Daily_Status.jpg`;
      link.click();

      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 200);
  };

  // WhatsApp share
  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(
      `*${profile.shopName || 'हमारी दुकान'}* की ओर से हार्दिक शुभकामनाएं!\n\n${template.mainQuoteHindi}\n${template.subQuoteHindi}\n\n📞 संपर्क: ${profile.phone}\n📍 पता: ${profile.city}\n\n_बनाया गया: DukaanBrand.in पर सिर्फ 10 सेकंड में_`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center">
      {/* Canvas Container with realistic mobile preview frame */}
      <div className="relative bg-slate-950 p-4 rounded-3xl border border-slate-800 shadow-2xl max-w-[360px] sm:max-w-[420px] w-full flex flex-col items-center">
        {/* Aspect Ratio container */}
        <div
          className="w-full relative rounded-2xl overflow-hidden shadow-inner border border-slate-800 bg-slate-900"
          style={{
            aspectRatio: format === 'story' ? '1080 / 1920' : '1080 / 1080',
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block object-contain"
          />
        </div>

        {/* Action Controls underneath preview */}
        <div className="w-full space-y-3 mt-4">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>{isDownloading ? 'तैयार हो रहा है...' : (language === 'hinglish' ? 'डाउनलोड HD पोस्टर' : 'Download HD')}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{language === 'hinglish' ? 'WhatsApp स्टेटस' : 'Share Status'}</span>
            </button>
          </div>

          {/* Watermark notice & Pro trigger */}
          {!isPro ? (
            <div
              onClick={onOpenProModal}
              className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center justify-between text-xs cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-200">
                  {language === 'hinglish' ? 'वाटरमार्क हटाएं व VIP फ्रेम पाएं' : 'Remove watermark & unlock VIP'}
                </span>
              </div>
              <span className="font-extrabold text-amber-400 underline">सिर्फ ₹10 →</span>
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs text-center font-bold">
              ✓ {language === 'hinglish' ? 'VIP Pro एक्टिवेटेड (वाटरमार्क हटा दिया गया)' : 'VIP Pro Activated (Clean HD)'}
            </div>
          )}

          {downloadSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold">
              ✓ {language === 'hinglish' ? 'पोस्टर गैलरी में सेव हो गया! अब WhatsApp स्टेटस पर लगाएं।' : 'Saved to gallery! Post it on WhatsApp status now.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
