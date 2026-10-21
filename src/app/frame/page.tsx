'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Camera,
  Sparkles,
  Check,
  Layers,
  Glasses,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import VisionCraftLogo from '@/components/VisionCraftLogo';
import { OpticalFrameOverlay, drawOpticalFrameCanvas } from '@/components/OpticalFrames';
import { SHOP_CONFIG, FrameId } from '@/config/shop';
import {
  WhatsAppIcon,
  InstagramIcon,
  shareToWhatsApp,
  shareToInstagram,
  SharePlatformTab,
} from '@/lib/socialShare';
import SocialShareModal from '@/components/SocialShareModal';
import { downloadFramedPhoto, DEFAULT_DOWNLOAD_FILENAME } from '@/lib/download';

export default function FrameGalleryPage() {
  const router = useRouter();
  const [selectedFrame, setSelectedFrame] = useState<FrameId>('classic-vision');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  // Download & Share states
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sharePlatform, setSharePlatform] = useState<SharePlatformTab>('whatsapp');
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [compositePhoto, setCompositePhoto] = useState<string | null>(null);

  const logoImgRef = useRef<HTMLImageElement | null>(null);

  // Pre-load brand logo
  useEffect(() => {
    const img = new Image();
    img.src = '/aakash-eye-logo.png';
    img.onload = () => {
      logoImgRef.current = img;
    };
  }, []);

  // Check if user previously captured a photo in this session
  useEffect(() => {
    try {
      const stored =
        sessionStorage.getItem('visioncraft_captured_photo') ||
        sessionStorage.getItem('greenleaf_captured_photo') ||
        sessionStorage.getItem('visioncraft_final_framed_photo');
      if (stored) {
        setUserPhoto(stored);
      }
    } catch (e) {
      console.warn('Could not read photo from sessionStorage:', e);
    }
  }, []);

  // Generate 1080x1920 Instagram Story composite canvas
  const generateComposite = useCallback(
    async (frameId: FrameId): Promise<string | null> => {
      const photoSrc = userPhoto || '/demo-model.jpg';
      return new Promise<string | null>((resolve) => {
        const photoImg = new Image();
        photoImg.crossOrigin = 'anonymous';
        photoImg.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 1080;
          canvas.height = 1920;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(null);

          // Draw photo cover
          const sRatio = photoImg.naturalWidth / photoImg.naturalHeight;
          const tRatio = 1080 / 1920;
          let sx = 0, sy = 0, sw = photoImg.naturalWidth, sh = photoImg.naturalHeight;
          if (sRatio > tRatio) {
            sw = photoImg.naturalHeight * tRatio;
            sx = (photoImg.naturalWidth - sw) / 2;
          } else {
            sh = photoImg.naturalWidth / tRatio;
            sy = (photoImg.naturalHeight - sh) / 2;
          }
          ctx.drawImage(photoImg, sx, sy, sw, sh, 0, 0, 1080, 1920);

          // Draw optical frame overlay
          drawOpticalFrameCanvas(ctx, 1080, 1920, frameId, logoImgRef.current);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
          resolve(dataUrl);
        };
        photoImg.onerror = () => resolve(null);
        photoImg.src = photoSrc;
      });
    },
    [userPhoto]
  );

  const handleUseFrame = () => {
    router.push(`/camera?frame=${selectedFrame}`);
  };

  const handleDownloadPhoto = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadError(null);
    try {
      const composite = await generateComposite(selectedFrame);
      if (!composite) throw new Error('Could not render photo');
      const res = downloadFramedPhoto(composite, DEFAULT_DOWNLOAD_FILENAME);
      if (res.success) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 4500);
      } else {
        setDownloadError(res.error || 'Download failed');
        setTimeout(() => setDownloadError(null), 4000);
      }
    } catch {
      setDownloadError('Could not download photo.');
      setTimeout(() => setDownloadError(null), 4000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareWhatsApp = async () => {
    if (isSharing) return;
    setIsSharing(true);
    try {
      const composite = await generateComposite(selectedFrame);
      if (!composite) throw new Error('Could not render photo');
      setCompositePhoto(composite);
      const res = await shareToWhatsApp(composite);
      if (res.method === 'whatsapp_web' || res.method === 'download_fallback') {
        setSharePlatform('whatsapp');
        setShareModalOpen(true);
      } else if (res.success && res.message) {
        setShareToast(res.message);
        setTimeout(() => setShareToast(null), 4000);
      }
    } catch {
      setDownloadError('Could not share to WhatsApp.');
      setTimeout(() => setDownloadError(null), 4000);
    } finally {
      setIsSharing(false);
    }
  };

  const handleShareInstagram = async () => {
    if (isSharing) return;
    setIsSharing(true);
    try {
      const composite = await generateComposite(selectedFrame);
      if (!composite) throw new Error('Could not render photo');
      setCompositePhoto(composite);
      const res = await shareToInstagram(composite);
      if (res.method === 'instagram_guide' || res.method === 'download_fallback') {
        setSharePlatform('instagram-story');
        setShareModalOpen(true);
      } else if (res.success && res.message) {
        setShareToast(res.message);
        setTimeout(() => setShareToast(null), 4000);
      }
    } catch {
      setDownloadError('Could not share to Instagram.');
      setTimeout(() => setDownloadError(null), 4000);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="mobile-card flex flex-col justify-between relative overflow-hidden bg-[#EAF7FA]/50 min-h-screen sm:min-h-[780px] sm:max-h-[920px]">
        {/* ── Top Header ────────────────────────────────────────────── */}
        <header className="flex items-center justify-between px-5 pt-3.5 pb-2 z-20 shrink-0 bg-white/80 backdrop-blur-xs border-b border-[#D6EAF0]">
          <button
            id="frame-back-btn"
            onClick={() => router.push('/camera')}
            aria-label="Back to camera"
            className="size-10 rounded-full bg-white shadow-xs border border-[#D6EAF0] flex items-center justify-center text-[#075985] hover:bg-[#EAF7FA] active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="size-5" strokeWidth={2} />
          </button>

          <VisionCraftLogo
            size="sm"
            showText={true}
            tagline="OPTICAL FRAMES"
          />

          <div className="size-10 rounded-full bg-white shadow-xs border border-[#D6EAF0] flex items-center justify-center text-[#075985]">
            <Glasses className="size-5" strokeWidth={2} />
          </div>
        </header>

        {/* ── Main Viewport: Frame Showcase with Model/User Preview ── */}
        <main className="flex-1 flex flex-col px-4 py-2 relative min-h-0 overflow-y-auto">
          {/* Header Title & Eyebrow */}
          <div className="text-center mb-2">
            <Badge
              variant="secondary"
              className="bg-[#EAF7FA] text-[#075985] border border-[#D6EAF0] text-[10px] font-bold px-2.5 py-0.5 rounded-full"
            >
              <Sparkles className="size-3 text-[#22A6BE]" />
              Signature Optical Collection
            </Badge>
            <h1 className="text-lg font-extrabold text-[#172B3A] tracking-tight mt-1">
              Select Your Spectacles Frame
            </h1>
            <p className="text-xs text-[#5B788E]">
              Every photo is framed in our high-resolution 1080×1920 Instagram Story layout.
            </p>
          </div>

          {/* Interactive Frame Preview (Strict 9:16 Instagram Story aspect ratio) */}
          <div className="flex justify-center w-full my-1">
            <div className="relative h-[44vh] max-h-[460px] aspect-[9/16] w-auto max-w-full rounded-[24px] overflow-hidden bg-black/95 shadow-xl border-0 mx-auto">
              <img
                src={userPhoto || '/demo-model.jpg'}
                alt="Preview with optical frame"
                className="w-full h-full object-cover"
              />
              {/* Live Optical Frame Overlay - Face & spectacles remain 100% unobstructed */}
              <OpticalFrameOverlay frameId={selectedFrame} />
            </div>
          </div>

          {/* Feedback Notices */}
          {downloadSuccess && (
            <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 text-[#075985] text-xs flex items-center justify-center gap-1.5 animate-in fade-in my-1">
              <CheckCircle2 className="size-4 text-[#0284C7]" />
              <span>Saved as <strong>{DEFAULT_DOWNLOAD_FILENAME}</strong>!</span>
            </div>
          )}

          {downloadError && (
            <div className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs text-center my-1">
              {downloadError}
            </div>
          )}

          {shareToast && (
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-1.5 animate-in fade-in my-1">
              <CheckCircle2 className="size-4 text-emerald-600" />
              <span>{shareToast}</span>
            </div>
          )}

          {/* Frame Selector Options */}
          <div className="flex flex-col gap-2 mt-2 w-full max-w-[380px] mx-auto pb-2">
            {SHOP_CONFIG.frames.map((frame) => {
              const isSelected = selectedFrame === frame.id;

              let iconBg = '#EAF7FA';
              let iconColor = 'text-[#075985]';
              let badgeClass = 'bg-sky-50 text-[#075985] border-sky-200';

              if (frame.id === 'modern-teal') {
                iconBg = 'linear-gradient(135deg, #0284C7, #22A6BE)';
                iconColor = 'text-white';
                badgeClass = 'bg-teal-50 text-[#0f766e] border-teal-200';
              } else if (frame.id === 'premium-eyewear') {
                iconBg = 'linear-gradient(135deg, #061826, #075985)';
                iconColor = 'text-[#FCF6BA]';
                badgeClass = 'bg-[#061826] text-[#FCF6BA] border-[#D4AF37]';
              }

              return (
                <button
                  key={frame.id}
                  id={`frame-card-${frame.id}`}
                  onClick={() => setSelectedFrame(frame.id)}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-2xl border transition-all text-left cursor-pointer shadow-xs',
                    isSelected
                      ? 'bg-white border-[#075985] shadow-md ring-2 ring-[#075985]/30 scale-[1.01]'
                      : 'bg-white/90 border-[#D6EAF0] hover:bg-white hover:border-[#0284C7]'
                  )}
                  aria-label={`Select ${frame.name} frame`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="size-9 rounded-xl flex items-center justify-center shrink-0 border border-black/5 shadow-2xs"
                      style={{ background: iconBg }}
                    >
                      <Layers className={cn('size-4.5', iconColor)} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-[#172B3A] tracking-tight truncate">
                          {frame.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className={cn('text-[9px] px-1.5 py-0 font-bold', badgeClass)}
                        >
                          {frame.badge}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-[#5B788E] truncate mt-0.5">
                        {frame.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'size-5 rounded-full flex items-center justify-center shrink-0 border ml-2 transition-all shadow-2xs',
                      isSelected
                        ? 'bg-[#075985] border-[#075985] text-white scale-110'
                        : 'border-[#CBD5E1] bg-white'
                    )}
                  >
                    {isSelected && <Check className="size-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </main>

        {/* ── Bottom Action Buttons & Social Sharing ────────────────── */}
        <footer className="px-5 pt-2.5 pb-4 bg-white/95 backdrop-blur-xs border-t border-[#D6EAF0] flex flex-col items-center gap-2 shrink-0">
          <div className="w-full max-w-[360px] flex flex-col gap-2">
            {/* Primary Action Button */}
            {userPhoto ? (
              <Button
                id="frame-download-btn"
                onClick={handleDownloadPhoto}
                disabled={isDownloading}
                className={cn(
                  "w-full h-11.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#075985] via-[#0284C7] to-[#22A6BE] text-white shadow-md hover:brightness-105 active:scale-98 transition-all gap-2 cursor-pointer",
                  isDownloading && "opacity-80 cursor-not-allowed"
                )}
              >
                <Download className={cn("size-4", isDownloading && "animate-bounce")} strokeWidth={2.4} />
                <span>{isDownloading ? 'Saving Story Photo...' : 'Download Story Photo (1080×1920)'}</span>
              </Button>
            ) : (
              <Button
                id="use-frame-btn"
                onClick={handleUseFrame}
                className="w-full h-11.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#075985] via-[#0284C7] to-[#22A6BE] text-white shadow-md hover:brightness-105 active:scale-98 transition-all gap-2 cursor-pointer"
              >
                <Camera className="size-4" strokeWidth={2.4} />
                <span>Use This Frame &amp; Open Camera</span>
              </Button>
            )}

            {/* Direct Social Share Buttons: WhatsApp Status & Instagram Story/Post */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {/* WhatsApp Status Button */}
              <button
                id="frame-whatsapp-btn"
                onClick={handleShareWhatsApp}
                disabled={isSharing}
                className="h-10.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 transition-all text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-emerald-600/30 px-3"
                aria-label="Share photo on WhatsApp Status and Chat"
              >
                <WhatsAppIcon className="size-4.5 shrink-0" color="#FFFFFF" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-xs font-black tracking-tight">WhatsApp</span>
                  <span className="text-[9px] font-semibold text-emerald-100 opacity-95">Status &amp; Chat</span>
                </div>
              </button>

              {/* Instagram Story & Post Button */}
              <button
                id="frame-instagram-btn"
                onClick={handleShareInstagram}
                disabled={isSharing}
                className="h-10.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:brightness-105 active:scale-95 transition-all text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-rose-400/30 px-3"
                aria-label="Share photo to Instagram Story and Post"
              >
                <InstagramIcon className="size-4.5 shrink-0" color="#FFFFFF" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-xs font-black tracking-tight">Instagram</span>
                  <span className="text-[9px] font-semibold text-rose-100 opacity-95">Story &amp; Post</span>
                </div>
              </button>
            </div>

            {userPhoto && (
              <Button
                variant="outline"
                onClick={handleUseFrame}
                className="w-full h-9 rounded-full border-[#D6EAF0] text-[#075985] text-xs font-bold gap-1.5 cursor-pointer bg-white shadow-2xs hover:bg-[#EAF7FA]"
              >
                <Camera className="size-3.5" />
                <span>Open Camera / Take New Photo</span>
              </Button>
            )}
          </div>
        </footer>
      </div>

      {/* Social Share Guided Modal */}
      <SocialShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        initialTab={sharePlatform}
        photoDataUrl={compositePhoto || userPhoto || '/demo-model.jpg'}
      />
    </div>
  );
}
