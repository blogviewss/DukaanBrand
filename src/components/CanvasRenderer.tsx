import React, { useRef, useEffect, useState } from 'react';
import { ShopProfile, CanvasFormat } from '../types/dukaan';
import { Template } from '../data/templates';
import { Language } from '../types';
import { Download, Share2, Sparkles, Check, Crown, QrCode, ShieldCheck, Flame, PhoneCall } from 'lucide-react';

interface CanvasRendererProps {
  profile: ShopProfile;
  template: Template;
  format: CanvasFormat;
  isPro: boolean;
  language: Language;
  watermarkText?: string;
  onOpenProModal: () => void;
}

export const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  profile,
  template,
  format,
  isPro,
  language,
  watermarkText,
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

    // Load assets: Shop Logo/Photo and UPI QR Code (if enabled)
    let logoImage: HTMLImageElement | null = null;
    let qrImage: HTMLImageElement | null = null;
    let pendingLoads = 0;

    const checkAndDraw = () => {
      if (pendingLoads <= 0) {
        drawScene(ctx, width, height, logoImage, qrImage);
      }
    };

    if (profile.logoUrl) {
      pendingLoads++;
      logoImage = new Image();
      logoImage.crossOrigin = 'anonymous';
      logoImage.src = profile.logoUrl;
      logoImage.onload = () => {
        pendingLoads--;
        checkAndDraw();
      };
      logoImage.onerror = () => {
        pendingLoads--;
        logoImage = null;
        checkAndDraw();
      };
    }

    if (profile.showUpiQr && profile.upiId) {
      pendingLoads++;
      qrImage = new Image();
      qrImage.crossOrigin = 'anonymous';
      const cleanUpi = profile.upiId.trim();
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=4&data=${encodeURIComponent(
        `upi://pay?pa=${cleanUpi}&pn=${encodeURIComponent(profile.shopName || 'Shop')}&cu=INR`
      )}`;
      qrImage.src = qrUrl;
      qrImage.onload = () => {
        pendingLoads--;
        checkAndDraw();
      };
      qrImage.onerror = () => {
        pendingLoads--;
        qrImage = null;
        checkAndDraw();
      };
    }

    if (pendingLoads === 0) {
      drawScene(ctx, width, height, null, null);
    }

    function drawScene(
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
      logo: HTMLImageElement | null,
      qr: HTMLImageElement | null
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
      const circleCenterY = format === 'story' ? 560 : 340;
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

      // 4. Top Header Banner Ribbon
      const bannerY = format === 'story' ? 85 : 65;
      const bannerH = 72;
      context.save();
      context.fillStyle = 'rgba(0, 0, 0, 0.5)';
      context.beginPath();
      context.roundRect(110, bannerY, w - 220, bannerH, 18);
      context.fill();
      context.strokeStyle = template.accentColor;
      context.lineWidth = 2.5;
      context.stroke();

      context.fillStyle = template.accentColor;
      context.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(
        language === 'hinglish' ? template.headerTagHindi : template.headerTagEnglish,
        w / 2,
        bannerY + bannerH / 2
      );
      context.restore();

      // 5. PRO FEATURE: Gold Verified Merchant Stamp (If Pro or Verified enabled)
      if (isPro || profile.showVerifiedBadge) {
        context.save();
        const stampX = w - 160;
        const stampY = bannerY + 36;
        context.fillStyle = '#f59e0b';
        context.beginPath();
        context.roundRect(stampX - 70, stampY - 20, 140, 40, 10);
        context.fill();
        context.fillStyle = '#0f172a';
        context.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('★ VERIFIED ★', stampX, stampY);
        context.restore();
      }

      // 6. Central Auspicious Motif / Icon Aura
      const iconY = format === 'story' ? 330 : 210;
      context.save();
      context.beginPath();
      context.arc(w / 2, iconY, format === 'story' ? 95 : 75, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255, 255, 255, 0.12)';
      context.fill();
      context.strokeStyle = template.accentColor;
      context.lineWidth = 4;
      context.stroke();

      context.fillStyle = '#ffffff';
      context.font = format === 'story' ? 'bold 50px "Plus Jakarta Sans"' : 'bold 40px "Plus Jakarta Sans"';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(template.ornamentSymbol, w / 2, iconY);
      context.restore();

      // 7. Main Quote Text (Hindi/English)
      const textStartY = format === 'story' ? 510 : 340;
      const maxTextWidth = w - 200;
      const lineHeight = format === 'story' ? 66 : 50;

      context.save();
      context.fillStyle = '#ffffff';
      context.font = format === 'story' ? 'bold 46px "Plus Jakarta Sans", sans-serif' : 'bold 36px "Plus Jakarta Sans", sans-serif';
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
      context.font = format === 'story' ? '600 32px "Plus Jakarta Sans", sans-serif' : '600 26px "Plus Jakarta Sans", sans-serif';
      const subQuoteToDisplay = language === 'hinglish' ? template.subQuoteHindi : template.subQuoteEnglish;
      wrapText(subQuoteToDisplay, w / 2, nextY + 12, maxTextWidth, format === 'story' ? 44 : 34);
      context.restore();

      // 8. PRO FEATURE: Special Offer Ribbon (Mahabachat / 20% Off)
      if (profile.specialOffer) {
        const offerY = format === 'story' ? 880 : 540;
        context.save();
        context.fillStyle = '#dc2626';
        context.beginPath();
        context.roundRect(140, offerY, w - 280, 54, 14);
        context.fill();
        context.strokeStyle = '#fef08a';
        context.lineWidth = 2;
        context.stroke();

        context.fillStyle = '#ffffff';
        context.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(`🔥 विशेष ऑफर: ${profile.specialOffer}`, w / 2, offerY + 27);
        context.restore();
      }

      // 9. SHOP BRANDING FOOTER CARD
      const cardHeight = format === 'story' ? 570 : 420;
      const cardY = h - cardHeight - 65;

      context.save();
      context.shadowColor = 'rgba(0, 0, 0, 0.45)';
      context.shadowBlur = 35;
      context.shadowOffsetY = 15;
      context.fillStyle = '#ffffff';
      context.beginPath();
      context.roundRect(65, cardY, w - 130, cardHeight, 32);
      context.fill();
      context.restore();

      // Inner card contents
      context.save();
      let contentStartY = cardY + 35;

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

      // Shop Name (Prominent & Clear)
      context.fillStyle = '#0f172a';
      context.font = format === 'story' ? 'bold 50px "Plus Jakarta Sans", sans-serif' : 'bold 38px "Plus Jakarta Sans", sans-serif';
      context.textAlign = 'center';
      context.fillText(profile.shopName || 'आपकी दुकान का नाम', w / 2, contentStartY + 25);

      // Tagline
      if (profile.tagline) {
        context.fillStyle = '#d97706';
        context.font = format === 'story' ? 'bold 26px "Plus Jakarta Sans", sans-serif' : 'bold 20px "Plus Jakarta Sans", sans-serif';
        context.fillText(`★ ${profile.tagline} ★`, w / 2, contentStartY + 68);
      }

      // Proprietor Name (if entered)
      if (profile.ownerName) {
        context.fillStyle = '#475569';
        context.font = format === 'story' ? '600 28px "Plus Jakarta Sans", sans-serif' : '600 22px "Plus Jakarta Sans", sans-serif';
        context.fillText(`प्रो: ${profile.ownerName}`, w / 2, contentStartY + 106);
      }

      // Pro QR Code vs Standard Phone Layout
      if (qr && qr.complete && profile.showUpiQr) {
        // Layout with Real UPI QR Code!
        const qrSize = format === 'story' ? 160 : 130;
        const qrX = 110;
        const qrY = contentStartY + (format === 'story' ? 140 : 120);

        // QR Box
        context.save();
        context.fillStyle = '#f8fafc';
        context.strokeStyle = '#0284c7';
        context.lineWidth = 2;
        context.beginPath();
        context.roundRect(qrX, qrY, qrSize, qrSize, 16);
        context.fill();
        context.stroke();

        // Draw the QR Code image
        context.drawImage(qr, qrX + 10, qrY + 10, qrSize - 20, qrSize - 20);

        // Text beside QR Code
        const textX = qrX + qrSize + 25;
        context.textAlign = 'left';
        context.fillStyle = '#0369a1';
        context.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
        context.fillText('📲 ऑनलाइन पेमेंट करें (Scan QR)', textX, qrY + 35);

        context.fillStyle = '#0f172a';
        context.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
        context.fillText(`📞 WhatsApp: ${profile.phone || '98765-XXXXX'}`, textX, qrY + 80);

        context.fillStyle = '#475569';
        context.font = '500 24px "Plus Jakarta Sans", sans-serif';
        context.fillText(`📍 ${profile.city || 'दुकान का पता व शहर'}`, textX, qrY + 120);
        context.restore();
      } else {
        // Standard WhatsApp Pill Layout
        const phonePillY = contentStartY + (format === 'story' ? 145 : 125);
        const pillW = format === 'story' ? 580 : 480;
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
        context.fillText(`📍 ${profile.city || 'दुकान का पता व शहर'}`, w / 2, phonePillY + pillH + (format === 'story' ? 52 : 40));
      }

      // 10. Watermark or Verified Seal
      const watermarkY = cardY + cardHeight - 24;
      if (!isPro) {
        context.fillStyle = '#ea580c';
        context.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
        context.textAlign = 'center';
        context.fillText(watermarkText || '⚡ अपनी दुकान का फ्री स्टेटस बनाएं: DukaanBrand.in', w / 2, watermarkY);
      } else {
        context.fillStyle = '#16a34a';
        context.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
        context.textAlign = 'center';
        context.fillText('★ 100% शुद्धता व भरोसे की दुकान • Verified Dukaan ★', w / 2, watermarkY);
      }

      context.restore();
    }
  }, [profile, template, format, isPro, language, watermarkText]);

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
      setTimeout(() => setDownloadSuccess(false), 5000);
    }, 200);
  };

  // WhatsApp share
  const handleShareWhatsApp = async () => {
    const canvas = canvasRef.current;
    const shareText = `*${profile.shopName || 'हमारी दुकान'}* की ओर से हार्दिक शुभकामनाएं!\n\n${template.mainQuoteHindi}\n\n📞 संपर्क: ${profile.phone}\n📍 पता: ${profile.city}\n\n_10 सेकंड में अपनी दुकान का स्टेटस बनाएं: DukaanBrand_`;

    if (canvas && navigator.canShare) {
      try {
        canvas.toBlob(async (blob) => {
          if (blob && navigator.canShare({ files: [new File([blob], 'dukaan_status.jpg', { type: 'image/jpeg' })] })) {
            const file = new File([blob], 'dukaan_status.jpg', { type: 'image/jpeg' });
            await navigator.share({
              title: profile.shopName || 'दुकान स्टेटस',
              text: shareText,
              files: [file],
            });
            return;
          }
          // Fallback if file sharing not permitted
          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
        }, 'image/jpeg', 0.95);
        return;
      } catch (err) {
        // Fallback
      }
    }

    // Default web whatsapp fallback
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Mobile Frame Container */}
      <div className="relative bg-slate-900/90 p-3 sm:p-4 rounded-3xl border border-slate-800 shadow-2xl max-w-[360px] sm:max-w-[420px] w-full flex flex-col items-center">
        {/* Aspect Ratio container with crisp render */}
        <div
          className="w-full relative rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-800 bg-slate-950"
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
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="py-3.5 px-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-slate-950 shrink-0" />
              <span>{isDownloading ? 'तैयार हो रहा...' : (language === 'hinglish' ? 'डाउनलोड HD' : 'Download HD')}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="py-3.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 shrink-0" />
              <span>{language === 'hinglish' ? 'WhatsApp स्टेटस' : 'Share Status'}</span>
            </button>
          </div>

          {/* Pro Jugad Teaser */}
          {!isPro ? (
            <div
              onClick={onOpenProModal}
              className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-rose-500/15 hover:from-amber-500/25 border border-amber-500/40 flex items-center justify-between text-xs cursor-pointer transition-all shadow-md group"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-amber-300 block">
                    ⭐ VIP फीचर्स: पोस्टर पर Google Pay QR लगाएं!
                  </span>
                  <span className="text-[11px] text-slate-300">
                    दुकान की फोटो + असली QR कोड + ₹10 में
                  </span>
                </div>
              </div>
              <span className="font-black text-amber-400 underline shrink-0 text-sm">₹10 →</span>
            </div>
          ) : (
            <div className="p-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>VIP Pro अनलॉक है: असली QR कोड + साफ HD पोस्टर!</span>
            </div>
          )}

          {downloadSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold animate-fadeIn">
              ✓ पोस्टर फोन गैलरी में सेव हो गया! अब WhatsApp खोलकर स्टेटस लगाएं।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
