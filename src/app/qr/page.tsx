'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Download,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Info,
  Camera,
  RotateCcw,
  Eye as EyeIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import VisionCraftLogo from '@/components/VisionCraftLogo';
import { downloadFramedPhoto, revokeBlobUrl, DEFAULT_DOWNLOAD_FILENAME } from '@/lib/download';
import {
  WhatsAppIcon,
  InstagramIcon,
  shareToWhatsApp,
  shareToInstagram,
  SharePlatformTab,
} from '@/lib/socialShare';
import SocialShareModal from '@/components/SocialShareModal';
import { SHOP_CONFIG } from '@/config/shop';

// Authentic Optical Store Vector QR Code Pattern Component
function OpticalQrCodeGraphic({ className }: { className?: string }) {
  // Pre-computed authentic QR matrix dots for a high-fidelity visual
  const modules = [
    // Row 0-6: Finder patterns top-left & top-right
    [1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,1,1,0,1,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,0,1,0,1,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,1,0,1,0,0,1,1,1,0,1,1,0,1,0,0,1,1,0,1,1],
    [0,1,1,0,1,1,0,0,1,0,0,1,1,0,1,0,0,1,1,0,1],
    [1,0,1,0,1,0,1,1,0,0,0,0,1,1,0,1,0,1,0,1,1],
    [0,1,0,1,1,0,0,1,1,0,0,1,0,1,1,0,1,0,1,1,0],
    [1,1,1,0,0,1,1,0,1,1,1,0,1,0,0,1,1,1,0,1,0],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,1,1,1],
    [1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,0,1,0,1,0,0],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,1,1,1,0,1,1,1,0],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,0,1,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,0,0,1,1,0,1,1,0,1,0],
    [1,0,1,1,1,0,1,0,0,0,1,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,0,1,1,0,0,1,0,1,1,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,0,1,1,1,0,1,0,1,1],
  ];

  const size = modules.length;
  const cellSize = 8;
  const totalPx = size * cellSize;

  return (
    <div className={cn('relative flex items-center justify-center p-3 bg-white rounded-2xl shadow-xs border border-[#D6EAF0]', className)}>
      <svg
        viewBox={`0 0 ${totalPx} ${totalPx}`}
        className="size-44 sm:size-48"
        shapeRendering="crispEdges"
        aria-label="QR Code graphic"
        role="img"
      >
        <rect width={totalPx} height={totalPx} fill="#FFFFFF" />
        {modules.map((row, r) =>
          row.map((cell, c) =>
            cell === 1 ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize - 0.5}
                height={cellSize - 0.5}
                rx={1}
                fill="#075985"
              />
            ) : null
          )
        )}
      </svg>

      {/* Central VisionCraft Eye Emblem Badge */}
      <div
        className="absolute size-9 rounded-xl flex items-center justify-center shadow-md border-2 border-[#22A6BE]"
        style={{ background: 'linear-gradient(135deg, #075985, #0284C7)' }}
        aria-hidden="true"
      >
        <EyeIcon className="size-5" />
      </div>
    </div>
  );
}

export default function QrCodeScreenPage() {
  const router = useRouter();

  const [framedPhoto, setFramedPhoto] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const activeBlobUrlRef = useRef<string | null>(null);

  // Social Share states
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sharePlatform, setSharePlatform] = useState<SharePlatformTab>('whatsapp');
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  // Load final framed photo from sessionStorage
  useEffect(() => {
    try {
      const stored =
        sessionStorage.getItem('visioncraft_final_framed_photo') ||
        sessionStorage.getItem('greenleaf_final_framed_photo');
      if (stored) {
        setFramedPhoto(stored);
      } else {
        const base =
          sessionStorage.getItem('visioncraft_captured_photo') ||
          sessionStorage.getItem('greenleaf_captured_photo');
        if (base) {
          setFramedPhoto(base);
        }
      }
    } catch (e) {
      console.warn('Could not read framed photo from sessionStorage:', e);
    }

    return () => {
      if (activeBlobUrlRef.current) {
        revokeBlobUrl(activeBlobUrlRef.current);
        activeBlobUrlRef.current = null;
      }
    };
  }, []);

  // Single direct file download handler
  const handleDownloadFinalPhoto = useCallback(() => {
    if (!framedPhoto || isDownloading) return;

    setIsDownloading(true);
    setDownloadError(null);

    try {
      const res = downloadFramedPhoto(
        framedPhoto,
        DEFAULT_DOWNLOAD_FILENAME
      );

      if (res.success) {
        if (res.blobUrl) {
          activeBlobUrlRef.current = res.blobUrl;
        }
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 4500);
      } else if (res.error && !res.error.includes('already triggered')) {
        setDownloadError(res.error);
        setTimeout(() => setDownloadError(null), 4000);
      }
    } catch (err) {
      console.error('Download error:', err);
      setDownloadError('Could not download photo. Please try again.');
      setTimeout(() => setDownloadError(null), 4000);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 1200);
    }
  }, [framedPhoto, isDownloading]);

  // Share to WhatsApp (Status & Chat)
  const handleShareWhatsApp = useCallback(async () => {
    if (!framedPhoto || isSharing) return;
    setIsSharing(true);
    setDownloadError(null);

    try {
      const res = await shareToWhatsApp(framedPhoto);
      if (res.method === 'whatsapp_web' || res.method === 'download_fallback') {
        setSharePlatform('whatsapp');
        setShareModalOpen(true);
      } else if (res.success && res.message) {
        setShareToast(res.message);
        setTimeout(() => setShareToast(null), 4000);
      }
    } catch (err) {
      console.error('WhatsApp share error:', err);
      setDownloadError('Could not share to WhatsApp. Please use direct download.');
      setTimeout(() => setDownloadError(null), 4000);
    } finally {
      setIsSharing(false);
    }
  }, [framedPhoto, isSharing]);

  // Share to Instagram (Story & Post)
  const handleShareInstagram = useCallback(async () => {
    if (!framedPhoto || isSharing) return;
    setIsSharing(true);
    setDownloadError(null);

    try {
      const res = await shareToInstagram(framedPhoto);
      if (res.method === 'instagram_guide' || res.method === 'download_fallback') {
        setSharePlatform('instagram-story');
        setShareModalOpen(true);
      } else if (res.success && res.message) {
        setShareToast(res.message);
        setTimeout(() => setShareToast(null), 4000);
      }
    } catch (err) {
      console.error('Instagram share error:', err);
      setDownloadError('Could not share to Instagram. Please use direct download.');
      setTimeout(() => setDownloadError(null), 4000);
    } finally {
      setIsSharing(false);
    }
  }, [framedPhoto, isSharing]);

  return (
    <div className="page-shell">
      <div className="mobile-card h-[100dvh] sm:h-auto sm:min-h-[700px] sm:max-h-[880px] flex flex-col justify-between relative overflow-hidden bg-white">
        {/* ── Top Header ────────────────────────────────────────────── */}
        <header className="flex items-center justify-between px-4 pt-4 pb-2 z-10 shrink-0 border-b border-[#D6EAF0]">
          <Button
            id="qr-back-btn"
            variant="ghost"
            size="sm"
            onClick={() => router.push('/camera')}
            aria-label="Back to camera screen"
            className="rounded-full px-3 gap-1.5 text-[#075985] hover:bg-[#EAF7FA] active:scale-95 transition-all"
          >
            <ArrowLeft className="size-4 shrink-0" strokeWidth={2.5} />
            <span className="text-xs font-bold">Back</span>
          </Button>

          <VisionCraftLogo
            size="sm"
            showText={true}
            tagline="QR PHOTO ACCESS"
          />

          <Badge
            variant="secondary"
            className="bg-[#EAF7FA] text-[#075985] border border-[#D6EAF0] text-[10px] font-bold px-2 py-0.5 rounded-full"
          >
            Ready
          </Badge>
        </header>

        {/* ── Main Viewport: QR Code & Final Photo Preview ──────────── */}
        <main className="flex-1 flex flex-col px-4 py-2 relative min-h-0 overflow-y-auto bg-[#EAF7FA]/30">
          {framedPhoto ? (
            <div className="flex flex-col gap-3 max-w-[370px] mx-auto w-full">
              {/* Heading Section */}
              <div className="text-center pt-1">
                <Badge
                  variant="secondary"
                  className="bg-[#EAF7FA] text-[#075985] border border-[#D6EAF0] text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-1"
                >
                  <Sparkles className="size-3 text-[#22A6BE]" />
                  Your Optical Style Look
                </Badge>
                <h1 className="text-xl font-extrabold text-[#172B3A] tracking-tight m-0">
                  Your Photo Is Ready!
                </h1>
                <p className="text-xs text-[#5B788E] mt-0.5 leading-snug">
                  Save your branded eyewear photo directly or review access options below.
                </p>
              </div>

              {/* Final Framed Photo Thumbnail Preview */}
              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-[#D6EAF0] shadow-xs">
                <div className="size-16 rounded-xl overflow-hidden bg-black shrink-0 border border-[#075985]/20 shadow-xs">
                  <img
                    src={framedPhoto}
                    alt="Final framed spectacles photo thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-[#075985] flex items-center gap-1 truncate">
                    <CheckCircle2 className="size-3.5 text-[#0284C7] shrink-0" />
                    Signature Framed Portrait
                  </span>
                  <p className="text-[11px] text-[#5B788E] mt-0.5 leading-tight truncate">
                    High-resolution 1080×1350 JPEG with applied optical frame.
                  </p>
                </div>
              </div>

              {/* QR Code Container Area */}
              <Card className="rounded-[22px] border border-[#D6EAF0] bg-white shadow-xs p-4 flex flex-col items-center text-center">
                {/* Instructional Text */}
                <p className="text-xs font-bold text-[#075985] mb-2 leading-tight">
                  Scan this QR code to access your photobooth session.
                </p>

                {/* QR Code Graphic Box with optical frame */}
                <div className="relative">
                  <OpticalQrCodeGraphic />

                  {/* Chic Corner Blue/Teal Brackets on QR Box */}
                  <span className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#0284C7]" />
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#0284C7]" />
                  <span className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#22A6BE]" />
                  <span className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#22A6BE]" />
                </div>

                {/* Clearly Labeled Status Badge */}
                <Badge
                  variant="outline"
                  className="mt-2.5 bg-sky-50 text-[#075985] border-[#D6EAF0] text-[10px] font-semibold gap-1 px-2.5 py-0.5 rounded-full"
                >
                  <Info className="size-3 text-[#0284C7] shrink-0" />
                  <span>On-Device Privacy Mode</span>
                </Badge>
              </Card>

              {/* Clear Message Explaining Cross-Device Access Requirements */}
              <div className="p-3 rounded-2xl bg-white border border-[#D6EAF0] shadow-xs text-left">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="size-4 text-[#075985] shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed text-[#172B3A]">
                    <p className="font-bold text-[#075985]">
                      Photo Privacy &amp; Access Details
                    </p>
                    <p className="text-[#5B788E] mt-0.5">
                      Your photo is rendered completely in your browser and is not uploaded to any remote server.
                    </p>
                    <p className="text-[#172B3A] mt-1 pt-1.5 border-t border-[#D6EAF0]">
                      <strong>Cross-device scanning note:</strong> Opening this photo on another device via QR code requires cloud photo storage, which is not currently connected. To keep your picture, please tap <strong>Download Final Photo</strong> below to save it directly to this device!
                    </p>
                  </div>
                </div>
              </div>

              {/* Download Success Notice */}
              {downloadSuccess && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-[#075985] text-xs flex items-center gap-2 animate-in fade-in"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-[#0284C7]" />
                  <span>
                    Saved successfully as <strong>{DEFAULT_DOWNLOAD_FILENAME}</strong>!
                  </span>
                </div>
              )}

              {/* Download Error Notice */}
              {downloadError && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <Info className="size-4 shrink-0 text-red-600" />
                  <span>{downloadError}</span>
                </div>
              )}

              {/* Social Share Toast Notice */}
              {shareToast && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                  <span>{shareToast}</span>
                </div>
              )}
            </div>
          ) : (
            /* No framed photo found state */
            <div className="w-full aspect-[3/4] max-h-[38vh] rounded-[22px] bg-white border-2 border-dashed border-[#D6EAF0] flex flex-col items-center justify-center p-6 text-center mx-auto my-auto">
              <Camera className="size-10 text-[#075985]/40 mb-2" />
              <p className="text-xs font-bold text-[#075985]">
                No framed photo found
              </p>
              <p className="text-[11px] text-[#5B788E] mt-1 max-w-[220px]">
                Please take and frame a photo in the photobooth first.
              </p>
              <Button
                onClick={() => router.push('/camera')}
                className="mt-3 h-9 px-4 rounded-full bg-[#075985] hover:bg-[#0284C7] text-white text-xs font-bold"
              >
                Start Photobooth
              </Button>
            </div>
          )}
        </main>

        {/* ── Bottom Controls Bar ────────────────────────────────────── */}
        <footer className="px-5 pt-2.5 pb-5 bg-white/95 backdrop-blur-md border-t border-[#D6EAF0] rounded-t-[28px] shadow-[0_-4px_20px_rgba(7,89,133,0.06)] flex flex-col items-center gap-2 shrink-0">
          {framedPhoto ? (
            <div className="w-full max-w-[360px] flex flex-col gap-2">
              {/* Primary Download Final Photo button */}
              <Button
                id="qr-download-btn"
                onClick={handleDownloadFinalPhoto}
                disabled={isDownloading}
                aria-label="Download final framed photo"
                className={cn(
                  "w-full h-11.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#075985] via-[#0284C7] to-[#22A6BE] text-white shadow-md hover:brightness-105 active:scale-[0.98] transition-all gap-2 cursor-pointer",
                  isDownloading && "opacity-80 cursor-not-allowed"
                )}
              >
                <Download className={cn("size-4", isDownloading && "animate-bounce")} strokeWidth={2.5} />
                <span>{isDownloading ? 'Saving Photo...' : 'Download Final Photo (1080×1350)'}</span>
              </Button>

              {/* Social Share Buttons: WhatsApp Status & Instagram Story/Post */}
              <div className="grid grid-cols-2 gap-2 w-full">
                {/* WhatsApp Status Button */}
                <button
                  id="qr-whatsapp-btn"
                  onClick={handleShareWhatsApp}
                  disabled={isSharing}
                  className="h-11 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 transition-all text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-emerald-600/30 px-3"
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
                  id="qr-instagram-btn"
                  onClick={handleShareInstagram}
                  disabled={isSharing}
                  className="h-11 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:brightness-105 active:scale-95 transition-all text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-rose-400/30 px-3"
                  aria-label="Share photo to Instagram Story and Post"
                >
                  <InstagramIcon className="size-4.5 shrink-0" color="#FFFFFF" />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-xs font-black tracking-tight">Instagram</span>
                    <span className="text-[9px] font-semibold text-rose-100 opacity-95">Story &amp; Post</span>
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Return to Photo Preview / Camera */}
                <Button
                  id="qr-return-camera-btn"
                  variant="outline"
                  onClick={() => router.push('/camera')}
                  className="flex-1 h-9.5 rounded-full border border-[#D6EAF0] bg-[#EAF7FA]/50 text-[#075985] hover:bg-[#EAF7FA] text-xs font-bold gap-1.5 shadow-2xs cursor-pointer"
                >
                  <ArrowLeft className="size-3.5 text-[#0284C7]" />
                  <span>Back to Photo</span>
                </Button>

                {/* Retake Photo with Camera */}
                <Button
                  id="qr-retake-btn"
                  variant="outline"
                  onClick={() => router.push('/camera')}
                  className="flex-1 h-9.5 rounded-full border border-[#D6EAF0] bg-white text-[#5B788E] hover:text-[#075985] hover:bg-[#EAF7FA] text-xs font-semibold gap-1.5 shadow-2xs cursor-pointer"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Retake Photo</span>
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => router.push('/')}
              className="w-full h-11 rounded-full bg-[#075985] text-white text-xs font-bold cursor-pointer"
            >
              Return to Store Home
            </Button>
          )}

          <p className="text-[11px] font-medium text-[#5B788E] text-center m-0 leading-tight">
            Thank you for visiting {SHOP_CONFIG.brandName} ✨
          </p>
        </footer>
      </div>

      {/* Social Share Guided Modal */}
      <SocialShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        initialTab={sharePlatform}
        photoDataUrl={framedPhoto}
      />
    </div>
  );
}
