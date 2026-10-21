'use client';

import React, { useState } from 'react';
import {
  X,
  Check,
  Copy,
  ExternalLink,
  Download,
  Sparkles,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  WhatsAppIcon,
  InstagramIcon,
  DEFAULT_SHARE_CAPTION,
  SharePlatformTab,
} from '@/lib/socialShare';
import { downloadFramedPhoto, DEFAULT_DOWNLOAD_FILENAME } from '@/lib/download';
import { cn } from '@/lib/utils';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: SharePlatformTab;
  photoDataUrl: string | null;
}

export default function SocialShareModal({
  isOpen,
  onClose,
  initialTab = 'whatsapp',
  photoDataUrl,
}: SocialShareModalProps) {
  const [activeTab, setActiveTab] = useState<SharePlatformTab>(initialTab);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Sync initial tab when modal opens
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen || !photoDataUrl) return null;

  const handleCopyCaption = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(DEFAULT_SHARE_CAPTION).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  const handleManualDownload = () => {
    if (photoDataUrl) {
      const res = downloadFramedPhoto(photoDataUrl, DEFAULT_DOWNLOAD_FILENAME);
      if (res.success) {
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 3500);
      }
    }
  };

  const handleOpenApp = () => {
    if (activeTab === 'whatsapp') {
      const encoded = encodeURIComponent(DEFAULT_SHARE_CAPTION);
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    } else {
      window.open('https://www.instagram.com', '_blank');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-[400px] bg-white rounded-[26px] shadow-2xl border border-[#D6EAF0] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div
          className={cn(
            'px-5 py-3.5 flex items-center justify-between text-white transition-colors duration-300',
            activeTab === 'whatsapp'
              ? 'bg-[#25D366]'
              : 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]'
          )}
        >
          <div className="flex items-center gap-2">
            {activeTab === 'whatsapp' ? (
              <WhatsAppIcon className="size-5" color="#FFFFFF" />
            ) : (
              <InstagramIcon className="size-5" color="#FFFFFF" />
            )}
            <h2 id="share-modal-title" className="text-sm font-extrabold tracking-tight m-0">
              {activeTab === 'whatsapp'
                ? 'Share to WhatsApp Status & Chat'
                : activeTab === 'instagram-story'
                ? 'Share to Instagram Story'
                : 'Share to Instagram Feed Post'}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="size-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="size-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Tab Switcher: WhatsApp Status | Instagram Story | Instagram Post */}
        <div className="grid grid-cols-3 gap-1 p-2 bg-[#F1F7F9] border-b border-[#D6EAF0]">
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={cn(
              'py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer',
              activeTab === 'whatsapp'
                ? 'bg-white text-[#128C7E] shadow-xs border border-[#25D366]/30'
                : 'text-[#5B788E] hover:text-[#172B3A]'
            )}
          >
            <WhatsAppIcon className="size-3.5 shrink-0" color={activeTab === 'whatsapp' ? '#25D366' : '#5B788E'} />
            <span className="truncate">Status</span>
          </button>

          <button
            onClick={() => setActiveTab('instagram-story')}
            className={cn(
              'py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer',
              activeTab === 'instagram-story'
                ? 'bg-white text-[#C13584] shadow-xs border border-[#FD1D1D]/30'
                : 'text-[#5B788E] hover:text-[#172B3A]'
            )}
          >
            <InstagramIcon className="size-3.5 shrink-0" color={activeTab === 'instagram-story' ? '#FD1D1D' : '#5B788E'} />
            <span className="truncate">Story</span>
          </button>

          <button
            onClick={() => setActiveTab('instagram-post')}
            className={cn(
              'py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer',
              activeTab === 'instagram-post'
                ? 'bg-white text-[#833AB4] shadow-xs border border-[#833AB4]/30'
                : 'text-[#5B788E] hover:text-[#172B3A]'
            )}
          >
            <InstagramIcon className="size-3.5 shrink-0" color={activeTab === 'instagram-post' ? '#833AB4' : '#5B788E'} />
            <span className="truncate">Feed Post</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4.5 flex flex-col gap-3.5 overflow-y-auto max-h-[72vh]">
          {/* Framed Photo Mini Preview */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#EAF7FA]/50 border border-[#D6EAF0]">
            <div className="h-16 aspect-[9/16] rounded-xl overflow-hidden bg-black shrink-0 border border-[#075985]/20 shadow-xs">
              <img
                src={photoDataUrl}
                alt="Framed optical portrait"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[#075985] text-xs font-bold truncate">
                <Sparkles className="size-3.5 text-[#22A6BE]" />
                <span>1080×1920 Instagram Story</span>
              </div>
              <p className="text-[11px] text-[#5B788E] mt-0.5 leading-snug">
                {activeTab === 'whatsapp'
                  ? 'High-res vertical portrait optimized for your WhatsApp Status & personal chat.'
                  : activeTab === 'instagram-story'
                  ? 'Strict 9:16 vertical portrait formatted perfectly for Instagram Stories.'
                  : 'High-res 9:16 portrait ready for your Instagram profile feed.'}
              </p>
            </div>
          </div>

          {/* Dynamic Instructions per Tab */}
          <div className="flex flex-col gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs text-[#172B3A]">
            <span className="font-extrabold text-[#075985] text-[11px] uppercase tracking-wider">
              {activeTab === 'whatsapp'
                ? 'How to post on WhatsApp Status:'
                : activeTab === 'instagram-story'
                ? 'How to post on Instagram Story:'
                : 'How to share as Instagram Post:'}
            </span>

            {activeTab === 'whatsapp' && (
              <ol className="list-decimal pl-4 space-y-1.5 text-[11.5px] leading-relaxed text-[#5B788E] m-0">
                <li>
                  <strong className="text-[#172B3A]">Photo Saved:</strong> The 1080×1920 framed story photo is saved to your gallery / downloads.
                </li>
                <li>
                  <strong className="text-[#172B3A]">Open WhatsApp:</strong> Tap <em>Updates &gt; Status (+)</em> or tap the green button below.
                </li>
                <li>
                  <strong className="text-[#172B3A]">Set Status:</strong> Choose this photo from your gallery, add caption, and tap send!
                </li>
              </ol>
            )}

            {activeTab === 'instagram-story' && (
              <ol className="list-decimal pl-4 space-y-1.5 text-[11.5px] leading-relaxed text-[#5B788E] m-0">
                <li>
                  <strong className="text-[#172B3A]">Photo Saved:</strong> Photo has been downloaded in crisp 1080×1920 9:16 Story resolution.
                </li>
                <li>
                  <strong className="text-[#172B3A]">Open Instagram:</strong> Launch the app and tap <span className="font-bold text-[#075985]">(+) Your Story</span> at top left.
                </li>
                <li>
                  <strong className="text-[#172B3A]">Add to Story:</strong> Pick your framed photo, optionally add music or stickers, and publish!
                </li>
              </ol>
            )}

            {activeTab === 'instagram-post' && (
              <ol className="list-decimal pl-4 space-y-1.5 text-[11.5px] leading-relaxed text-[#5B788E] m-0">
                <li>
                  <strong className="text-[#172B3A]">Photo Saved:</strong> Formatted to the standard 4:5 Instagram vertical post standard.
                </li>
                <li>
                  <strong className="text-[#172B3A]">Create Post:</strong> Tap <span className="font-bold text-[#075985]">(+) Post</span> in Instagram and pick this photo.
                </li>
                <li>
                  <strong className="text-[#172B3A]">Paste Caption:</strong> Copy the caption below and paste it in the post description!
                </li>
              </ol>
            )}
          </div>

          {/* Caption Box with One-Click Copy */}
          <div className="p-3 rounded-2xl bg-white border border-[#D6EAF0] flex flex-col gap-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#5B788E] uppercase tracking-wider">
                Ready-to-use Caption &amp; Tags
              </span>
              <button
                onClick={handleCopyCaption}
                className="text-[11px] font-bold text-[#075985] hover:text-[#0284C7] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="size-3 text-emerald-600" />
                    <span className="text-emerald-600 font-extrabold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copy Caption</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-[#172B3A] italic leading-snug m-0 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              "{DEFAULT_SHARE_CAPTION}"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-1">
            {/* Primary Open App / Web button */}
            <Button
              onClick={handleOpenApp}
              className={cn(
                'w-full h-11 rounded-full font-bold text-xs text-white gap-2 shadow-sm cursor-pointer transition-all',
                activeTab === 'whatsapp'
                  ? 'bg-[#25D366] hover:bg-[#20ba59]'
                  : 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:brightness-105'
              )}
            >
              <ExternalLink className="size-3.5" />
              <span>
                {activeTab === 'whatsapp'
                  ? 'Open WhatsApp App / Web'
                  : activeTab === 'instagram-story'
                  ? 'Open Instagram Story'
                  : 'Open Instagram Post'}
              </span>
            </Button>

            {/* Direct Re-Download Option */}
            <Button
              variant="outline"
              onClick={handleManualDownload}
              className="w-full h-10.5 rounded-full border-[#D6EAF0] bg-white text-[#075985] hover:bg-[#EAF7FA] font-bold text-xs gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="size-3.5 text-[#0284C7]" />
              <span>
                {downloaded ? 'Saved to Device!' : 'Download Photo Again (1080×1920)'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
