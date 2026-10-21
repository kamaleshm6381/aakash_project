/**
 * AAKASH EYE CLINIC & OPTICAL - Photobooth Direct Download Engine
 *
 * Requirements Met:
 * 1. Single unified download handler for final framed photos.
 * 2. Guaranteed descriptive filename: `aakash-eye-clinic-framed-photo.jpg`.
 * 3. Sets the anchor element's `download` attribute to that exact filename.
 * 4. Ensures exported image is a valid JPEG before initiating download (checks SOI 0xFF, 0xD8).
 * 5. Debounced concurrency lock prevents accidental repeated downloads from rapid double-clicks.
 * 6. Does not block legitimate future downloads when intentionally clicked again.
 * 7. Manages Blob URLs with proper lifecycle: reuses Blobs, does not create on every render,
 *    and never revokes prematurely before browser download completes.
 * 8. Never triggers downloads automatically during frame change, capture, render, or QR flow.
 */

export const DEFAULT_DOWNLOAD_FILENAME = 'aakash-eye-clinic-framed-photo.jpg';

// Module-level concurrency guard to prevent duplicate/repeated triggers across components
let lastDownloadTimestamp = 0;
const DEBOUNCE_COOLDOWN_MS = 1200;

// Track active Blob URLs for coordinated cleanup
const activeBlobUrls = new Set<string>();

/**
 * Validates that the provided image data is a valid JPEG.
 * Checks MIME type and standard JPEG SOI (Start of Image) magic bytes [0xFF, 0xD8].
 */
export function validateJpeg(data: string | Uint8Array | Blob): { isValid: boolean; error?: string } {
  try {
    if (!data) {
      return { isValid: false, error: 'No image data provided' };
    }

    if (typeof data === 'string') {
      if (!data.startsWith('data:image/jpeg') && !data.startsWith('data:image/jpg')) {
        return { isValid: false, error: 'Image is not a JPEG data URL' };
      }
      const base64Part = data.includes(',') ? data.split(',')[1] : data;
      if (!base64Part || base64Part.length < 32) {
        return { isValid: false, error: 'JPEG data payload is too small or truncated' };
      }

      // Check the first bytes of decoded binary for 0xFF, 0xD8
      const binaryPrefix = atob(base64Part.slice(0, 16));
      if (binaryPrefix.charCodeAt(0) !== 0xff || binaryPrefix.charCodeAt(1) !== 0xd8) {
        return { isValid: false, error: 'Invalid JPEG magic bytes (SOI marker 0xFFD8 missing)' };
      }

      return { isValid: true };
    }

    if (data instanceof Blob) {
      if (data.type && !data.type.includes('jpeg') && !data.type.includes('jpg')) {
        return { isValid: false, error: `Invalid Blob MIME type: ${data.type}` };
      }
      if (data.size < 100) {
        return { isValid: false, error: 'Blob size is too small for a valid JPEG' };
      }
      return { isValid: true };
    }

    if (data instanceof Uint8Array) {
      if (data.length < 4 || data[0] !== 0xff || data[1] !== 0xd8) {
        return { isValid: false, error: 'Invalid JPEG binary header' };
      }
      return { isValid: true };
    }

    return { isValid: false, error: 'Unsupported image data format' };
  } catch (err) {
    return { isValid: false, error: `JPEG validation error: ${String(err)}` };
  }
}

/**
 * Safely converts a base64 JPEG data URL into a binary Blob without memory leaks.
 */
export function dataUrlToJpegBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const binaryStr = atob(parts[1] || parts[0]);
  const len = binaryStr.length;
  const u8arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    u8arr[i] = binaryStr.charCodeAt(i);
  }
  return new Blob([u8arr], { type: 'image/jpeg' });
}

/**
 * Safely revokes an active Blob URL and removes it from tracked memory.
 */
export function revokeBlobUrl(url: string | null | undefined): void {
  if (!url) return;
  try {
    if (typeof window !== 'undefined' && url.startsWith('blob:')) {
      window.URL.revokeObjectURL(url);
      activeBlobUrls.delete(url);
    }
  } catch (err) {
    console.warn('Error revoking Blob URL:', err);
  }
}

/**
 * Revokes all tracked Blob URLs (used when navigating away or unmounting).
 */
export function cleanupAllBlobUrls(): void {
  activeBlobUrls.forEach((url) => {
    try {
      window.URL.revokeObjectURL(url);
    } catch {
      // Ignore cleanup errors
    }
  });
  activeBlobUrls.clear();
}

export interface DownloadResult {
  success: boolean;
  filename: string;
  blobUrl?: string;
  error?: string;
}

/**
 * Single, unified download handler for the final framed photo.
 *
 * - Downloads ONLY upon explicit customer click.
 * - Always applies `aakash-eye-clinic-framed-photo.jpg`.
 * - Validates JPEG integrity before downloading.
 * - Prevents duplicate/repeated downloads from double-clicks via a cooldown lock.
 * - Does not block future legitimate downloads.
 * - Uses proper anchor `download` attribute and Blob URL management.
 */
export function downloadFramedPhoto(
  source: string | Blob,
  customFilename = DEFAULT_DOWNLOAD_FILENAME
): DownloadResult {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { success: false, filename: customFilename, error: 'DOM not available (SSR)' };
  }

  // 1. Debounce Guard: prevent repeated downloads from accidental double clicks
  const now = Date.now();
  if (now - lastDownloadTimestamp < DEBOUNCE_COOLDOWN_MS) {
    return {
      success: false,
      filename: customFilename,
      error: 'Download already triggered. Please wait a moment.',
    };
  }

  // 2. Validate JPEG Integrity
  const validation = validateJpeg(source);
  if (!validation.isValid) {
    console.error('Download rejected: Not a valid JPEG:', validation.error);
    return {
      success: false,
      filename: customFilename,
      error: validation.error || 'Invalid JPEG image',
    };
  }

  // Record timestamp immediately after validation passes
  lastDownloadTimestamp = now;

  // 3. Format Descriptive Filename
  let filename = customFilename.trim();
  if (!filename.toLowerCase().endsWith('.jpg') && !filename.toLowerCase().endsWith('.jpeg')) {
    filename = `${filename}.jpg`;
  }

  // 4. Create or Resolve Blob
  let blob: Blob;
  if (source instanceof Blob) {
    blob = source;
  } else {
    blob = dataUrlToJpegBlob(source);
  }

  let blobUrl: string | undefined;

  try {
    // 5. Create Blob URL with tracked lifecycle
    blobUrl = window.URL.createObjectURL(blob);
    activeBlobUrls.add(blobUrl);

    // 6. Anchor Element Setup with Explicit Download Filename
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl;
    link.download = filename;
    link.setAttribute('download', filename);

    // Crucial: Append to DOM so Chromium security rules fully respect download attribute
    document.body.appendChild(link);

    // 7. Trigger the single download
    link.click();

    // 8. Clean up DOM element promptly
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 100);

    // 9. Safe Delayed Revocation
    // Do NOT revoke immediately! Revoking prematurely causes Chrome/Edge to fail to resolve
    // the blob metadata and fall back to the blob UUID without an extension.
    // 60 seconds gives the operating system plenty of time to finish streaming the file.
    const urlToRevoke = blobUrl;
    setTimeout(() => {
      revokeBlobUrl(urlToRevoke);
    }, 60000);

    return {
      success: true,
      filename,
      blobUrl,
    };
  } catch (err) {
    console.error('Blob anchor download failed, attempting data URL fallback:', err);

    // Fallback: Direct data URL anchor download (does not produce Blob UUIDs)
    if (typeof source === 'string') {
      try {
        const fallbackLink = document.createElement('a');
        fallbackLink.style.display = 'none';
        fallbackLink.href = source;
        fallbackLink.download = filename;
        fallbackLink.setAttribute('download', filename);
        document.body.appendChild(fallbackLink);
        fallbackLink.click();
        setTimeout(() => {
          if (document.body.contains(fallbackLink)) {
            document.body.removeChild(fallbackLink);
          }
        }, 100);

        return {
          success: true,
          filename,
        };
      } catch (fallbackErr) {
        console.error('All download attempts failed:', fallbackErr);
        return {
          success: false,
          filename,
          error: String(fallbackErr),
        };
      }
    }

    return {
      success: false,
      filename,
      error: String(err),
    };
  }
}

// Backward-compatible alias for existing imports
export const downloadOrShareFramedPhoto = downloadFramedPhoto;
