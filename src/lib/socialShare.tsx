/**
 * AAKASH EYE CLINIC & OPTICAL - Social Sharing Engine
 * Supports:
 * 1. WhatsApp (Status & Chat)
 * 2. Instagram (Stories & Feed Post)
 * 3. Direct 1080×1350 High-Resolution Download
 * 4. Native OS Web Share Sheet (iOS / Android)
 */

import React from 'react';
import {
  dataUrlToJpegBlob,
  downloadFramedPhoto,
  DEFAULT_DOWNLOAD_FILENAME,
} from '@/lib/download';
import { SHOP_CONFIG } from '@/config/shop';

export type SharePlatformTab = 'whatsapp' | 'instagram-story' | 'instagram-post';

export interface SocialShareResult {
  success: boolean;
  method: 'web_share' | 'whatsapp_web' | 'instagram_guide' | 'download_fallback';
  message: string;
  error?: string;
}

export const DEFAULT_SHARE_CAPTION =
  `Loving my new eyewear style from ${SHOP_CONFIG.brandName}! 👓✨ #AakashOpticals #ClearVision #EyewearStyle #NewSpecs`;

/**
 * Checks if the current browser environment can share image files via Web Share API
 */
export function canShareFiles(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  if (!navigator.share || !navigator.canShare) return false;

  try {
    const testFile = new File(['x'], 'test.jpg', { type: 'image/jpeg' });
    return navigator.canShare({ files: [testFile] });
  } catch {
    return false;
  }
}

/**
 * Share directly to WhatsApp Status or Chat
 * On mobile devices with Web Share API, opens native share sheet directly to WhatsApp.
 * On desktop or unsupported browsers, downloads the photo and opens WhatsApp Web with pre-filled message.
 */
export async function shareToWhatsApp(
  photoDataUrl: string,
  caption = DEFAULT_SHARE_CAPTION
): Promise<SocialShareResult> {
  const filename = DEFAULT_DOWNLOAD_FILENAME;

  // 1. Try Native Web Share API with File (Works on iOS Safari & Android Chrome)
  if (canShareFiles()) {
    try {
      const blob = dataUrlToJpegBlob(photoDataUrl);
      const file = new File([blob], filename, { type: 'image/jpeg' });

      await navigator.share({
        files: [file],
        title: `${SHOP_CONFIG.brandName} - My Eyewear Look`,
        text: caption,
      });

      return {
        success: true,
        method: 'web_share',
        message: 'Shared successfully via WhatsApp!',
      };
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        // User closed the share sheet
        return {
          success: true,
          method: 'web_share',
          message: 'Share sheet dismissed.',
        };
      }
      console.warn('Native file share failed, falling back to WhatsApp Web link:', err);
    }
  }

  // 2. Fallback: Download high-res photo and launch WhatsApp with caption
  try {
    downloadFramedPhoto(photoDataUrl, filename);

    const encodedText = encodeURIComponent(
      `${caption}\n\n📍 ${SHOP_CONFIG.brandName} - ${SHOP_CONFIG.brandSubtitle}`
    );
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;

    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    return {
      success: true,
      method: 'whatsapp_web',
      message: 'Photo saved! Attach it to share in your WhatsApp Status or chat.',
    };
  } catch (err) {
    return {
      success: false,
      method: 'download_fallback',
      message: 'Could not open WhatsApp.',
      error: String(err),
    };
  }
}

/**
 * Share directly to Instagram Stories or Feed Post
 * On mobile, opens native share sheet with Instagram Stories / Feed.
 * On desktop/fallbacks, downloads the 1080×1350 portrait (ideal 4:5 Instagram aspect ratio)
 * and copies the caption to clipboard.
 */
export async function shareToInstagram(
  photoDataUrl: string,
  caption = DEFAULT_SHARE_CAPTION
): Promise<SocialShareResult> {
  const filename = DEFAULT_DOWNLOAD_FILENAME;

  // 1. Try Native Web Share API with File
  if (canShareFiles()) {
    try {
      const blob = dataUrlToJpegBlob(photoDataUrl);
      const file = new File([blob], filename, { type: 'image/jpeg' });

      await navigator.share({
        files: [file],
        title: `${SHOP_CONFIG.brandName} - Eyewear Look`,
        text: caption,
      });

      return {
        success: true,
        method: 'web_share',
        message: 'Opened share menu! Choose Instagram Stories or Post.',
      };
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        return {
          success: true,
          method: 'web_share',
          message: 'Share sheet dismissed.',
        };
      }
      console.warn('Native share to Instagram failed, falling back to download guide:', err);
    }
  }

  // 2. Fallback: Download 4:5 photo and copy caption to clipboard
  try {
    downloadFramedPhoto(photoDataUrl, filename);

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(caption);
      } catch {
        // Ignore clipboard failure
      }
    }

    return {
      success: true,
      method: 'instagram_guide',
      message: 'Photo saved to your gallery! Open Instagram > (+) New Story or Post > select your photo.',
    };
  } catch (err) {
    return {
      success: false,
      method: 'download_fallback',
      message: 'Could not prepare photo for Instagram.',
      error: String(err),
    };
  }
}

// ────────────────────────────────────────────────────────────────────────
// Vector Brand Icons for Social Platforms
// ────────────────────────────────────────────────────────────────────────

/**
 * Official WhatsApp Vector Icon
 */
export function WhatsAppIcon({
  className = 'size-4',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.09 7.4 8.87 7.65C8.65 7.89 8.02 8.48 8.02 9.7C8.02 10.91 8.91 12.08 9.03 12.24C9.16 12.4 10.74 14.84 13.16 15.89C13.74 16.14 14.18 16.28 14.54 16.4C15.12 16.58 15.64 16.55 16.06 16.49C16.53 16.42 17.5 15.9 17.7 15.33C17.91 14.76 17.91 14.28 17.85 14.17C17.79 14.07 17.63 14.01 17.38 13.88C17.14 13.76 15.92 13.16 15.69 13.08C15.47 12.99 15.3 12.95 15.14 13.2C14.97 13.44 14.5 14.01 14.36 14.17C14.22 14.34 14.08 14.36 13.83 14.24C13.59 14.11 12.56 13.78 11.34 12.69C10.39 11.84 9.75 10.79 9.61 10.55C9.47 10.31 9.6 10.17 9.72 10.05C9.83 9.94 9.97 9.75 10.1 9.6C10.22 9.46 10.27 9.35 10.35 9.19C10.43 9.03 10.39 8.89 10.33 8.76C10.27 8.64 9.76 7.39 9.53 7.34Z" />
    </svg>
  );
}

/**
 * Official Instagram Vector Glyph Icon
 */
export function InstagramIcon({
  className = 'size-4',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5.5" ry="5.5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2.5" />
    </svg>
  );
}
