'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Camera,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  RotateCcw,
  CheckCircle2,
  Download,
  QrCode,
  ImageIcon,
  Upload,
  Layers,
  Timer,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import VisionCraftLogo from '@/components/VisionCraftLogo';
import { OpticalFrameOverlay, drawOpticalFrameCanvas } from '@/components/OpticalFrames';
import { downloadFramedPhoto, revokeBlobUrl, DEFAULT_DOWNLOAD_FILENAME } from '@/lib/download';
import {
  WhatsAppIcon,
  InstagramIcon,
  shareToWhatsApp,
  shareToInstagram,
  SharePlatformTab,
} from '@/lib/socialShare';
import SocialShareModal from '@/components/SocialShareModal';
import { SHOP_CONFIG, FrameId } from '@/config/shop';

interface CameraScreenProps {
  onBack: () => void;
  onContinue?: () => void;
  initialFrameId?: FrameId;
}

type FacingMode = 'user' | 'environment';

interface CameraErrorState {
  title: string;
  message: string;
  canRetry: boolean;
}

export default function CameraScreen({ onBack, initialFrameId = 'classic-vision' }: CameraScreenProps) {
  const router = useRouter();

  // Selected frame state (selectable before photo capture)
  const [selectedFrame, setSelectedFrame] = useState<FrameId>(initialFrameId);

  // User uploaded photo fallback state
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  // Camera & Stream states
  const [facingMode, setFacingMode] = useState<FacingMode>('user');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [error, setError] = useState<CameraErrorState | null>(null);

  // Capture & Countdown states (3s, 5s, 10s selectable)
  const [countdown, setCountdown] = useState<number | null>(null);
  const [countdownDuration, setCountdownDuration] = useState<3 | 5 | 10>(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isCapturingAnimation, setIsCapturingAnimation] = useState(false);
  const [showStoryGuides, setShowStoryGuides] = useState(false);
  // Raw 1080 × 1920 Instagram Story photo (captured without baked-in frame, so frame can be dynamically switched post-capture)
  const [rawPhoto, setRawPhoto] = useState<string | null>(null);
  // Baked 1080 × 1920 framed photo composite (matching download pixel-for-pixel)
  const [finalFramedPhoto, setFinalFramedPhoto] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Social Share states
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sharePlatform, setSharePlatform] = useState<SharePlatformTab>('whatsapp');
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [compositeForModal, setCompositeForModal] = useState<string | null>(null);

  // References
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isMountedRef = useRef(true);
  const requestIdRef = useRef(0);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const activeBlobUrlRef = useRef<string | null>(null);

  // Pre-load the official brand eye logo for canvas rendering
  useEffect(() => {
    const img = new Image();
    img.src = '/aakash-eye-logo.png';
    img.onload = () => {
      logoImgRef.current = img;
    };
  }, []);

  // Helper to safely stop all active media tracks
  const stopCurrentStream = useCallback(() => {
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      } catch (err) {
        console.warn('Error stopping media tracks:', err);
      }
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  // Handle navigating back safely
  const handleBack = useCallback(() => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    stopCurrentStream();
    onBack();
  }, [stopCurrentStream, onBack]);

  // Start camera stream with progressive fallbacks
  const startCamera = useCallback(
    async (mode: FacingMode) => {
      const requestId = ++requestIdRef.current;
      stopCurrentStream();
      setIsLoading(true);
      setError(null);
      setUserPhoto(null);

      if (typeof window === 'undefined' || !navigator?.mediaDevices?.getUserMedia) {
        setIsLoading(false);
        setIsSwitching(false);
        setError({
          title: 'Camera Not Supported',
          message:
            'Camera access is not supported on this browser. You can tap Gallery to upload a photo of your spectacles.',
          canRetry: false,
        });
        return;
      }

      try {
        let stream: MediaStream | null = null;

        // Attempt 1: Ideal facingMode and standard resolution
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              facingMode: { ideal: mode },
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
          });
        } catch {
          // Attempt 2: Simple facingMode
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: { facingMode: mode },
            });
          } catch {
            // Attempt 3: Any available video stream
            stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: true,
            });
          }
        }

        if (!isMountedRef.current || requestId !== requestIdRef.current) {
          if (stream) stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current && stream) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true');
          videoRef.current.muted = true;

          const markActive = () => {
            if (isMountedRef.current && requestId === requestIdRef.current) {
              setIsStreaming(true);
              setIsLoading(false);
              setIsSwitching(false);
              setError(null);
            }
          };

          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().then(markActive).catch(markActive);
          };

          videoRef.current.play().then(markActive).catch(markActive);
        }
      } catch (err: unknown) {
        if (!isMountedRef.current || requestId !== requestIdRef.current) return;

        setIsLoading(false);
        setIsSwitching(false);

        let title = 'Camera Access Needed';
        let message =
          'Please allow camera permissions in your browser to take your photo, or tap Gallery to choose a photo.';
        let canRetry = true;

        if (err instanceof DOMException) {
          if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            title = 'Camera Permission Blocked';
            message =
              'Camera permission was not granted. Please allow camera access in your browser settings, or tap Gallery to upload.';
          } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            title = 'No Camera Detected';
            message = 'We could not detect a camera. You can tap Gallery to upload a photo of your eyewear look.';
            canRetry = false;
          }
        }

        setError({ title, message, canRetry });
      }
    },
    [stopCurrentStream]
  );

  // Initialize camera on mount
  useEffect(() => {
    isMountedRef.current = true;
    startCamera('user');

    return () => {
      isMountedRef.current = false;
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
      if (activeBlobUrlRef.current) {
        revokeBlobUrl(activeBlobUrlRef.current);
        activeBlobUrlRef.current = null;
      }
      stopCurrentStream();
    };
  }, [startCamera, stopCurrentStream]);

  // Switch between front and rear camera
  const handleSwitchCamera = useCallback(() => {
    if (rawPhoto) {
      setRawPhoto(null);
      const nextMode: FacingMode = facingMode === 'user' ? 'environment' : 'user';
      setFacingMode(nextMode);
      startCamera(nextMode);
      return;
    }
    if (userPhoto) {
      setUserPhoto(null);
      startCamera(facingMode);
      return;
    }
    if (isLoading || isSwitching || isCountingDown) return;
    setIsSwitching(true);
    const nextMode: FacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    startCamera(nextMode);
  }, [facingMode, isLoading, isSwitching, isCountingDown, rawPhoto, startCamera, userPhoto]);

  // Handle file input for Gallery button
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setUserPhoto(result);
          stopCurrentStream();
          setError(null);
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  // Helper to draw an image maintaining 9:16 center crop without distortion
  const drawImageCrop = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    targetW = 1080,
    targetH = 1920
  ) => {
    const vw = img.naturalWidth || img.width;
    const vh = img.naturalHeight || img.height;
    const targetRatio = targetW / targetH;
    const imgRatio = vw / vh;

    let sx = 0,
      sy = 0,
      sw = vw,
      sh = vh;
    if (imgRatio > targetRatio) {
      sw = vh * targetRatio;
      sh = vh;
      sx = (vw - sw) / 2;
      sy = 0;
    } else {
      sw = vw;
      sh = vw / targetRatio;
      sx = 0;
      sy = (vh - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
  };

  // Capture at exact 9:16 center crop and export raw photo at exactly 1080 × 1920
  const captureRawPhoto = useCallback(async (): Promise<string | null> => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context unavailable');

      // Case 1: User uploaded photo from gallery
      if (userPhoto) {
        const uImg = new Image();
        uImg.src = userPhoto;
        await new Promise((resolve) => {
          if (uImg.complete) resolve(true);
          else {
            uImg.onload = () => resolve(true);
            uImg.onerror = () => resolve(false);
          }
        });
        drawImageCrop(ctx, uImg, 1080, 1920);
      }
      // Case 2: Live camera video stream
      else if (isStreaming && videoRef.current && videoRef.current.videoWidth) {
        const video = videoRef.current;
        const vw = video.videoWidth;
        const vh = video.videoHeight;
        const targetRatio = 1080 / 1920;
        const videoRatio = vw / vh;

        let sx = 0,
          sy = 0,
          sw = vw,
          sh = vh;
        if (videoRatio > targetRatio) {
          sw = vh * targetRatio;
          sh = vh;
          sx = (vw - sw) / 2;
          sy = 0;
        } else {
          sw = vw;
          sh = vw / targetRatio;
          sx = 0;
          sy = (vh - sh) / 2;
        }

        // Draw camera image (mirrored if front selfie camera)
        ctx.save();
        if (facingMode === 'user') {
          ctx.translate(1080, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, 1080, 1920);
        ctx.restore();
      } else {
        // Fallback: Elegant optical store blue gradient
        const grad = ctx.createLinearGradient(0, 0, 0, 1920);
        grad.addColorStop(0, '#075985');
        grad.addColorStop(0.5, '#0284C7');
        grad.addColorStop(1, '#22A6BE');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1080, 1920);
      }

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      return dataUrl;
    } catch (err) {
      console.error('Failed to capture raw photo:', err);
      setError({
        title: 'Capture Error',
        message: 'Could not process photo. Please try again.',
        canRetry: true,
      });
      return null;
    }
  }, [facingMode, isStreaming, userPhoto]);

  // Dynamically composite photo with the chosen frame at full 1080 × 1920 Instagram Story resolution
  const generateFramedComposite = useCallback(
    async (frameIdToRender: FrameId, sourcePhoto?: string): Promise<string | null> => {
      const photoToUse = sourcePhoto || rawPhoto;
      if (!photoToUse) return null;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D context unavailable');

        const img = new Image();
        img.src = photoToUse;
        await new Promise((resolve) => {
          if (img.complete) resolve(true);
          else {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          }
        });
        ctx.drawImage(img, 0, 0, 1080, 1920);

        // Draw the exact optical frame canvas graphics for 1080 × 1920
        drawOpticalFrameCanvas(ctx, 1080, 1920, frameIdToRender, logoImgRef.current);

        return canvas.toDataURL('image/jpeg', 0.95);
      } catch (err) {
        console.error('Failed to generate framed composite:', err);
        return null;
      }
    },
    [rawPhoto]
  );

  // Frame selection handler: switches frame and immediately generates baked composite preview
  const handleSelectFrame = useCallback(
    async (frameId: FrameId) => {
      setSelectedFrame(frameId);
      if (rawPhoto) {
        const composite = await generateFramedComposite(frameId, rawPhoto);
        if (composite) {
          setFinalFramedPhoto(composite);
          try {
            sessionStorage.setItem('visioncraft_final_framed_photo', composite);
          } catch (e) {
            console.warn('Could not save to sessionStorage:', e);
          }
        }
      }
    },
    [rawPhoto, generateFramedComposite]
  );

  // Keep sessionStorage in sync whenever raw photo is captured or selected frame changes
  useEffect(() => {
    if (!rawPhoto) return;
    let isCancelled = false;
    generateFramedComposite(selectedFrame, rawPhoto).then((composite) => {
      if (!isCancelled && composite) {
        setFinalFramedPhoto(composite);
        try {
          sessionStorage.setItem('visioncraft_final_framed_photo', composite);
        } catch (e) {
          console.warn('Could not save to sessionStorage:', e);
        }
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [rawPhoto, selectedFrame, generateFramedComposite]);

  // Start Selectable Countdown (3s, 5s, 10s) and capture
  const handleStartCountdown = useCallback(() => {
    if (isCountingDown || !!rawPhoto) {
      return;
    }

    setIsCountingDown(true);
    setCountdown(countdownDuration);

    let current = countdownDuration;
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    countdownTimerRef.current = setInterval(async () => {
      current -= 1;
      if (current > 0) {
        setCountdown(current);
      } else {
        if (countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;
        }
        setCountdown(null);
        setIsCountingDown(false);

        // Shutter flash animation
        setIsCapturingAnimation(true);
        setTimeout(() => setIsCapturingAnimation(false), 260);

        // Capture raw photo at 1080 × 1920
        const photo = await captureRawPhoto();
        if (photo) {
          stopCurrentStream();
          // Generate baked framed composite immediately so what we click is what we get with zero flash
          const composite = await generateFramedComposite(selectedFrame, photo);
          setRawPhoto(photo);
          if (composite) {
            setFinalFramedPhoto(composite);
            try {
              sessionStorage.setItem('visioncraft_final_framed_photo', composite);
            } catch (e) {
              console.warn(e);
            }
          }
          try {
            sessionStorage.setItem('visioncraft_captured_photo', photo);
          } catch (e) {
            console.warn(e);
          }
        }
      }
    }, 1000);
  }, [isCountingDown, rawPhoto, countdownDuration, captureRawPhoto, stopCurrentStream, generateFramedComposite, selectedFrame]);

  // Retake photo handler: clean up obsolete image resources and active Blob URLs
  const handleRetake = useCallback(() => {
    if (activeBlobUrlRef.current) {
      revokeBlobUrl(activeBlobUrlRef.current);
      activeBlobUrlRef.current = null;
    }
    setRawPhoto(null);
    setFinalFramedPhoto(null);
    setDownloadSuccess(false);
    setDownloadError(null);
    setIsDownloading(false);
    if (!userPhoto) {
      startCamera(facingMode);
    }
  }, [startCamera, facingMode, userPhoto]);

  // Single direct file download handler
  const handleDownloadFinalPhoto = useCallback(async () => {
    if (!rawPhoto && !finalFramedPhoto) return;
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadError(null);

    try {
      const composite = finalFramedPhoto || (await generateFramedComposite(selectedFrame));
      if (!composite) {
        throw new Error('Failed to generate framed photo for download');
      }

      const res = downloadFramedPhoto(
        composite,
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
      // Cooldown timer allows legitimate future clicks while blocking accidental duplicate clicks
      setTimeout(() => {
        setIsDownloading(false);
      }, 1200);
    }
  }, [rawPhoto, finalFramedPhoto, selectedFrame, isDownloading, generateFramedComposite]);

  // Share to WhatsApp (Status & Chat)
  const handleShareWhatsApp = useCallback(async () => {
    if (!rawPhoto && !finalFramedPhoto) return;
    if (isSharing) return;
    setIsSharing(true);
    setDownloadError(null);

    try {
      const composite = finalFramedPhoto || (await generateFramedComposite(selectedFrame));
      if (!composite) throw new Error('Could not generate framed photo');
      setCompositeForModal(composite);

      const res = await shareToWhatsApp(composite);
      if (res.method === 'whatsapp_web' || res.method === 'download_fallback') {
        setSharePlatform('whatsapp');
        setShareModalOpen(true);
      } else if (res.success && res.message) {
        setShareToast(res.message);
        setTimeout(() => setShareToast(null), 4000);
      }
    } catch (err) {
      console.error('WhatsApp share error:', err);
      setDownloadError('Could not share to WhatsApp. Please try downloading directly.');
      setTimeout(() => setDownloadError(null), 4000);
    } finally {
      setIsSharing(false);
    }
  }, [rawPhoto, finalFramedPhoto, selectedFrame, isSharing, generateFramedComposite]);

  // Share to Instagram (Story & Post)
  const handleShareInstagram = useCallback(async () => {
    if (!rawPhoto && !finalFramedPhoto) return;
    if (isSharing) return;
    setIsSharing(true);
    setDownloadError(null);

    try {
      const composite = finalFramedPhoto || (await generateFramedComposite(selectedFrame));
      if (!composite) throw new Error('Could not generate framed photo');
      setCompositeForModal(composite);

      const res = await shareToInstagram(composite);
      if (res.method === 'instagram_guide' || res.method === 'download_fallback') {
        setSharePlatform('instagram-story');
        setShareModalOpen(true);
      } else if (res.success && res.message) {
        setShareToast(res.message);
        setTimeout(() => setShareToast(null), 4000);
      }
    } catch (err) {
      console.error('Instagram share error:', err);
      setDownloadError('Could not share to Instagram. Please try downloading directly.');
      setTimeout(() => setDownloadError(null), 4000);
    } finally {
      setIsSharing(false);
    }
  }, [rawPhoto, finalFramedPhoto, selectedFrame, isSharing, generateFramedComposite]);

  // Navigate to QR code page
  const handleGoToQr = useCallback(async () => {
    if (finalFramedPhoto) {
      try {
        sessionStorage.setItem('visioncraft_final_framed_photo', finalFramedPhoto);
      } catch (e) {
        console.warn('Could not save to sessionStorage:', e);
      }
    } else if (rawPhoto) {
      try {
        const composite = await generateFramedComposite(selectedFrame);
        if (composite) {
          sessionStorage.setItem('visioncraft_final_framed_photo', composite);
        }
      } catch (e) {
        console.warn('Could not save to sessionStorage:', e);
      }
    }
    router.push('/qr');
  }, [finalFramedPhoto, rawPhoto, selectedFrame, generateFramedComposite, router]);

  const hasPhotoFeed = isStreaming || !!userPhoto;

  return (
    <div className="page-shell">
      {/* Hidden file input for Gallery button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      <div className="mobile-card flex flex-col justify-between relative overflow-hidden bg-[#FFFFFF] h-[100dvh] sm:h-[min(820px,calc(100vh-1.5rem))]">
        {/* ── Top Header ────────────────────────────────────────────── */}
        <header className="flex items-center justify-between px-5 pt-3 pb-1.5 z-30 shrink-0 bg-white border-b border-[#D6EAF0]">
          {/* Circular Back button */}
          <button
            id="camera-back-btn"
            onClick={handleBack}
            aria-label="Back to home"
            className="size-10 rounded-full bg-white shadow-xs border border-[#D6EAF0] flex items-center justify-center text-[#075985] hover:bg-[#EAF7FA] active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="size-5" strokeWidth={2.2} />
          </button>

          {/* VisionCraft Opticals Brand Header */}
          <VisionCraftLogo size="sm" />

          {/* Circular Camera Switch / Flip button */}
          <button
            id="camera-switch-top-btn"
            onClick={handleSwitchCamera}
            disabled={isCountingDown}
            aria-label="Switch camera"
            className="size-10 rounded-full bg-white shadow-xs border border-[#D6EAF0] flex items-center justify-center text-[#075985] hover:bg-[#EAF7FA] active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Camera className="size-5" strokeWidth={2} />
          </button>
        </header>

        {/* ── Frame Selection Toolbar (Always visible: before AND after photo capture!) ──── */}
        <div className="flex flex-col items-center justify-center gap-1 px-3 pt-2 pb-1 z-20 shrink-0">
          <div className="flex items-center justify-center gap-2">
            {SHOP_CONFIG.frames.map((frame) => {
              const isSelected = selectedFrame === frame.id;

              // Tailored luxury active styling for each of the 3 boutique themes
              let activeThemeClass = 'bg-[#075985] text-white border-[#075985] shadow-sm scale-105 ring-2 ring-[#075985]/25';
              let iconColor = 'text-white';

              if (isSelected) {
                if (frame.id === 'modern-teal') {
                  activeThemeClass = 'bg-gradient-to-r from-[#0284C7] to-[#22A6BE] text-white border-[#22A6BE] shadow-sm scale-105 ring-2 ring-[#22A6BE]/35';
                  iconColor = 'text-white';
                } else if (frame.id === 'premium-eyewear') {
                  activeThemeClass = 'bg-gradient-to-r from-[#061826] to-[#075985] text-[#FCF6BA] border-[#D4AF37] shadow-sm scale-105 ring-2 ring-[#D4AF37]/45';
                  iconColor = 'text-[#FCF6BA]';
                }
              } else {
                iconColor = frame.id === 'premium-eyewear' ? 'text-[#075985]' : frame.id === 'modern-teal' ? 'text-[#22A6BE]' : 'text-[#075985]';
              }

              return (
                <button
                  key={frame.id}
                  id={`frame-select-btn-${frame.id}`}
                  onClick={() => handleSelectFrame(frame.id)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-[11px] font-extrabold transition-all flex items-center gap-1.5 cursor-pointer border',
                    isSelected
                      ? activeThemeClass
                      : 'bg-white/90 text-[#172B3A] border-[#D6EAF0] hover:bg-[#EAF7FA] hover:border-[#0284C7]'
                  )}
                  aria-label={`Select ${frame.name} frame`}
                >
                  <Layers className={cn('size-3.5 shrink-0', iconColor)} />
                  <span className="tracking-tight">{frame.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Viewport: Strict Vertical 9:16 Instagram Story Portrait Card ─────────────── */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-1 relative min-h-0 overflow-hidden">
          <div
            className={cn(
              // Strict 9:16 Instagram Story portrait frame (Height drives width at exact 9:16 ratio)
              'relative h-full max-h-[50vh] sm:max-h-[55vh] aspect-[9/16] w-auto max-w-full rounded-[24px] overflow-hidden bg-black shadow-2xl border-2 border-[#D6EAF0] mx-auto',
              'transition-all duration-300'
            )}
            role="region"
            aria-label={
              rawPhoto
                ? 'Captured 9:16 Instagram Story photo with selected frame'
                : 'Live 9:16 Instagram Story camera preview with selected frame overlay'
            }
          >
            {/* View 1: Baked Framed photo (100% pixel-for-pixel matches downloaded file) */}
            {finalFramedPhoto ? (
              <img
                src={finalFramedPhoto}
                alt="Final framed eyewear photo"
                className="w-full h-full object-contain"
              />
            ) : rawPhoto ? (
              <>
                <img
                  src={rawPhoto}
                  alt="Captured eyewear photo"
                  className="w-full h-full object-contain"
                />
                <OpticalFrameOverlay frameId={selectedFrame} showStoryGuides={false} />
              </>
            ) : (
              /* View 2: Live Video or Uploaded Image */
              <>
                {/* Live Video Element */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={cn(
                    'w-full h-full object-cover',
                    // Mirror front selfie camera
                    facingMode === 'user' ? 'scale-x-[-1]' : 'scale-x-100',
                    (!isStreaming || isLoading || !!userPhoto) && 'hidden'
                  )}
                />

                {/* User's uploaded photo from gallery */}
                {userPhoto && (
                  <img
                    src={userPhoto}
                    alt="Your uploaded photo"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* ── Live Optical Frame Overlay (Keeps face & glasses clear!) ── */}
                <OpticalFrameOverlay frameId={selectedFrame} showStoryGuides={showStoryGuides} />
              </>
            )}

            {/* Shutter flash animation overlay */}
            {isCapturingAnimation && (
              <div
                className="absolute inset-0 bg-white/95 z-40 pointer-events-none animate-out fade-out duration-260"
                aria-hidden="true"
              />
            )}

            {/* Loading Camera State */}
            {!rawPhoto && isLoading && !error && !userPhoto && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#075985]/90 text-white p-6 text-center z-20 backdrop-blur-xs">
                <div className="size-12 rounded-full border-3 border-white/20 border-t-white animate-spin flex items-center justify-center">
                  <Camera className="size-5 text-white/90" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold tracking-tight">
                    Starting Eyewear Camera...
                  </p>
                  <p className="text-xs text-white/80 max-w-[240px]">
                    Please click <strong>Allow</strong> if prompted by your browser.
                  </p>
                </div>
                <button
                  onClick={handleGalleryClick}
                  className="mt-2 px-3.5 py-1.5 rounded-full bg-white text-[#075985] text-xs font-bold shadow-xs hover:bg-[#EAF7FA] cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="size-3.5" />
                  <span>Upload Photo From Gallery</span>
                </button>
              </div>
            )}

            {/* Camera Permission / Error State */}
            {!rawPhoto && error && !userPhoto && (
              <div className="absolute inset-0 p-5 flex flex-col items-center justify-center bg-[#EAF7FA] z-20 text-center">
                <div className="size-12 rounded-full bg-sky-100 text-[#075985] flex items-center justify-center mx-auto mb-2 border border-[#D6EAF0]">
                  <Camera className="size-6" strokeWidth={2} />
                </div>
                <h2 className="text-base font-bold text-[#172B3A]">
                  {error.title}
                </h2>
                <p className="text-xs text-[#5B788E] mt-1 max-w-[260px] leading-relaxed">
                  {error.message}
                </p>

                <div className="flex flex-col gap-2 mt-4 w-full max-w-[250px]">
                  <Button
                    onClick={handleGalleryClick}
                    className="w-full h-10 rounded-full bg-[#075985] hover:bg-[#0369a1] text-white text-xs font-bold gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Upload className="size-3.5" />
                    <span>Upload Photo From Device</span>
                  </Button>

                  {error.canRetry && (
                    <Button
                      variant="outline"
                      onClick={() => startCamera(facingMode)}
                      className="w-full h-9 rounded-full border-[#D6EAF0] text-xs font-semibold text-[#075985] gap-1.5 cursor-pointer bg-white"
                    >
                      <RefreshCw className="size-3" />
                      <span>Retry Camera Permission</span>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Download Success Notice */}
          {downloadSuccess && (
            <div
              role="status"
              aria-live="polite"
              className="mt-1.5 p-2 rounded-xl bg-sky-50 border border-sky-200 text-[#075985] text-xs flex items-center justify-center gap-2 animate-in fade-in"
            >
              <CheckCircle2 className="size-4 shrink-0 text-[#0284C7]" />
              <span>
                Saved as <strong>{DEFAULT_DOWNLOAD_FILENAME}</strong>!
              </span>
            </div>
          )}

          {/* Download Error Notice */}
          {downloadError && (
            <div
              role="status"
              className="mt-1.5 p-2 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-center gap-2 animate-in fade-in"
            >
              <span>{downloadError}</span>
            </div>
          )}

          {/* Social Share Toast Notice */}
          {shareToast && (
            <div
              role="status"
              aria-live="polite"
              className="mt-1.5 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2 animate-in fade-in"
            >
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
              <span>{shareToast}</span>
            </div>
          )}
        </main>

        {/* ── Status Pill ────────────────────────────────────────────── */}
        <div className="flex justify-center my-1 z-20 shrink-0">
          <div className="px-5 py-1.5 rounded-full bg-[#075985] text-white text-xs font-semibold tracking-wide shadow-xs flex items-center gap-1.5">
            {isCountingDown ? (
              <>
                <span>Get ready...</span>
                <span className="font-extrabold text-[#22A6BE] text-sm ml-1 animate-pulse">
                  {countdown}
                </span>
              </>
            ) : rawPhoto ? (
              <>
                <Sparkles className="size-3.5 text-[#22A6BE]" />
                <span>Tap frames above or share below!</span>
              </>
            ) : userPhoto ? (
              <span>Photo Loaded! Tap Shutter to Save Frame</span>
            ) : (
              <span>Get ready... 3 &nbsp;2 &nbsp;1</span>
            )}
          </div>
        </div>

        {/* ── Controls Area: Shutter & Action Buttons ────────────────── */}
        {rawPhoto ? (
          /* ── View 1: Final Photo Screen Actions ────────────────────── */
          <div className="flex flex-col items-center gap-2 px-5 pb-3 w-full max-w-[380px] mx-auto z-20">
            {/* 1. Primary Action: Download Final Story Photo (1080x1920) */}
            <Button
              id="preview-download-btn"
              onClick={handleDownloadFinalPhoto}
              disabled={isDownloading}
              className={cn(
                "w-full h-11.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#075985] via-[#0284C7] to-[#22A6BE] text-white shadow-md hover:brightness-105 active:scale-[0.98] transition-all gap-2 cursor-pointer",
                isDownloading && "opacity-80 cursor-not-allowed"
              )}
            >
              <Download className={cn("size-4", isDownloading && "animate-bounce")} strokeWidth={2.4} />
              <span>{isDownloading ? 'Saving Story Photo...' : 'Download Story Photo (1080×1920)'}</span>
            </Button>

            {/* 2. Direct Social Share: WhatsApp Status & Instagram Story/Post */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {/* WhatsApp Status Button */}
              <button
                id="preview-whatsapp-btn"
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
                id="preview-instagram-btn"
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

            {/* 3. Auxiliary Actions: QR Access & Retake Photo */}
            <div className="flex items-center gap-2 w-full">
              {/* QR Code Share Button */}
              <Button
                id="preview-qr-btn"
                variant="outline"
                onClick={handleGoToQr}
                className="flex-1 h-9.5 rounded-full border border-[#D6EAF0] bg-white text-[#075985] hover:bg-[#EAF7FA] active:scale-95 transition-all text-xs font-bold gap-1.5 shadow-2xs cursor-pointer"
              >
                <QrCode className="size-3.5 text-[#0284C7]" />
                <span>QR Access</span>
              </Button>

              {/* Retake Photo Button */}
              <Button
                id="preview-retake-btn"
                variant="outline"
                onClick={handleRetake}
                className="flex-1 h-9.5 rounded-full border border-[#D6EAF0] bg-white text-[#5B788E] hover:text-[#172B3A] hover:bg-[#EAF7FA] active:scale-95 transition-all text-xs font-semibold gap-1.5 shadow-2xs cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>Retake Photo</span>
              </Button>
            </div>
          </div>
        ) : (
          /* ── View 2: Live Camera Actions ────────────────────────────── */
          <div className="bg-white rounded-b-[24px] px-5 pt-1.5 pb-3 z-20 shrink-0 flex flex-col items-center gap-2.5">
            {/* Top Toolbar: Countdown Selector & Safe Margin Toggle */}
            <div className="flex items-center justify-between w-full max-w-[340px] px-1">
              {/* Countdown Duration Selector: 3s | 5s | 10s */}
              <div className="flex items-center gap-1 bg-[#EAF7FA] border border-[#D6EAF0] px-2.5 py-1 rounded-full shadow-2xs">
                <Timer className="size-3 text-[#075985]" />
                <span className="text-[10px] font-bold text-[#075985] mr-0.5">Timer:</span>
                {[3, 5, 10].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setCountdownDuration(sec as 3 | 5 | 10)}
                    disabled={isCountingDown}
                    className={cn(
                      'px-2 py-0.5 rounded-full text-[10.5px] font-black transition-all cursor-pointer',
                      countdownDuration === sec
                        ? 'bg-[#075985] text-white shadow-2xs scale-105'
                        : 'text-[#5B788E] hover:text-[#075985]'
                    )}
                  >
                    {sec}s
                  </button>
                ))}
              </div>

              {/* Story Safe Margin Guide Toggle */}
              <button
                type="button"
                onClick={() => setShowStoryGuides((prev) => !prev)}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer shadow-2xs',
                  showStoryGuides
                    ? 'bg-[#075985] text-white border-[#075985]'
                    : 'bg-[#EAF7FA] text-[#075985] border-[#D6EAF0] hover:bg-white'
                )}
                title="Toggle Instagram Story Safe Zone Guidelines"
              >
                <Eye className="size-3" />
                <span>{showStoryGuides ? 'Safe Guides: ON' : 'Safe Guides'}</span>
              </button>
            </div>

            {/* Large Visible Capture Photo Button */}
            <Button
              id="camera-capture-large-btn"
              onClick={handleStartCountdown}
              disabled={isCountingDown}
              className="w-full max-w-[320px] h-12 rounded-full font-black text-sm bg-gradient-to-r from-[#075985] via-[#0284C7] to-[#22A6BE] text-white shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              aria-label="Capture Instagram Story Photo"
            >
              <Camera className="size-5 shrink-0" strokeWidth={2.4} />
              <span>
                {isCountingDown
                  ? `Capturing in ${countdown}...`
                  : `Capture Photo (${countdownDuration}s)`}
              </span>
            </Button>

            {/* Quick Secondary Controls: Flip Camera, Shutter Ring, Gallery */}
            <div className="flex items-center justify-around w-full max-w-[320px] pt-0.5">
              {/* Left Button: Switch Camera (Flip) */}
              <div className="flex flex-col items-center gap-1">
                <button
                  id="camera-flip-btn"
                  onClick={handleSwitchCamera}
                  disabled={isLoading || isSwitching || isCountingDown}
                  className="size-11 rounded-full bg-white border border-[#D6EAF0] shadow-2xs flex items-center justify-center text-[#075985] hover:bg-[#EAF7FA] active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                  aria-label="Switch camera front/rear"
                >
                  <RefreshCw
                    className={cn('size-4 text-[#075985]', isSwitching && 'animate-spin')}
                    strokeWidth={2}
                  />
                </button>
                <span className="text-[10px] font-bold text-[#5B788E]">
                  Flip
                </span>
              </div>

              {/* Center Shutter Ring Button */}
              <div className="flex flex-col items-center">
                <button
                  id="camera-capture-btn"
                  onClick={handleStartCountdown}
                  disabled={isCountingDown}
                  className="size-14 rounded-full border-[3px] border-[#075985] p-1 bg-white flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer"
                  aria-label="Take Photo Shutter"
                >
                  <div className="size-full rounded-full bg-gradient-to-br from-[#075985] to-[#0284C7] flex items-center justify-center transition-all active:brightness-90">
                    {isCountingDown ? (
                      <span className="text-base font-black text-white">
                        {countdown}
                      </span>
                    ) : (
                      <Camera className="size-5 text-white" strokeWidth={2.2} />
                    )}
                  </div>
                </button>
              </div>

              {/* Right Button: Gallery Upload */}
              <div className="flex flex-col items-center gap-1">
                <button
                  id="camera-gallery-btn"
                  onClick={handleGalleryClick}
                  className="size-11 rounded-full bg-white border border-[#D6EAF0] shadow-2xs flex items-center justify-center text-[#075985] hover:bg-[#EAF7FA] active:scale-95 transition-all cursor-pointer"
                  aria-label="Choose photo from Gallery"
                >
                  <ImageIcon className="size-4 text-[#075985]" strokeWidth={2} />
                </button>
                <span className="text-[10px] font-bold text-[#5B788E]">
                  Gallery
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── Deep Ocean Blue Bottom Base Bar ──────────────────────── */}
        <div className="bg-[#075985] px-4 py-3 text-center text-white/90 text-xs font-medium leading-relaxed shrink-0">
          <p className="m-0 font-semibold tracking-wide">
            {rawPhoto
              ? 'Tap any frame above to switch styles'
              : 'Position yourself and tap the shutter'}
          </p>
          <p className="m-0 text-[#D6EAF0] text-[11px]">
            {rawPhoto
              ? 'Then download or share below'
              : 'to capture your spectacles look'}
          </p>
        </div>
      </div>

      {/* Social Share Guided Modal */}
      <SocialShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        initialTab={sharePlatform}
        photoDataUrl={compositeForModal || rawPhoto}
      />
    </div>
  );
}
