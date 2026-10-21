'use client';

import React from 'react';
import { EyeIcon, SpectaclesIcon } from '@/components/VisionCraftLogo';
import { SHOP_CONFIG, FrameId } from '@/config/shop';

interface OpticalFrameOverlayProps {
  frameId: FrameId;
}

/**
 * High-Aesthetic Optical Frame Overlays for AAKASH Eye Clinic & Optical:
 * - 100% borderless: Unobstructed central view so face, eyes, glasses, and hair remain crystal-clear.
 * - Attractive, high-fashion boutique typography & multi-layer accents:
 *   1. Classic Vision: Timeless Artisan White Boutique card with crisp art-deco corner accents,
 *      "CLEAR VISION • BRIGHTER TOMORROW", and spectacles line art.
 *   2. Modern Teal: Dynamic multi-tier Ocean & Turquoise Teal curved wave ribbons,
 *      "SEE BETTER • LOOK BRIGHTER", and fluid coastal aesthetic.
 *   3. Premium Eyewear: Haute Couture Midnight Obsidian Navy & Metallic Champagne Gold,
 *      "PREMIUM EYEWEAR • FOR A CLEARER YOU", diagonal facets and gold pinstripes.
 */
export function OpticalFrameOverlay({ frameId }: OpticalFrameOverlayProps) {
  // ── 1. CLASSIC VISION FRAME ──────────────────────────────────────────
  if (frameId === 'classic-vision') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between overflow-hidden select-none">
        {/* Top Header: Pristine Studio White with Precision Art-Deco Corners */}
        <div className="relative w-full h-12 bg-white/98 backdrop-blur-xs px-3.5 flex items-center justify-between shadow-xs">
          {/* Top-Left Art-Deco Corner Bracket */}
          <div className="absolute top-0 left-0 w-5 h-5 pointer-events-none">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <polygon points="0,0 24,0 0,24" fill="#075985" />
              <line x1="0" y1="24" x2="24" y2="0" stroke="#0284C7" strokeWidth="1.6" />
            </svg>
          </div>

          {/* Top-Right Art-Deco Corner Bracket */}
          <div className="absolute top-0 right-0 w-5 h-5 pointer-events-none">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <polygon points="24,0 0,0 24,24" fill="#075985" />
              <line x1="0" y1="0" x2="24" y2="24" stroke="#0284C7" strokeWidth="1.6" />
            </svg>
          </div>

          {/* Left Spectacles Icon */}
          <div className="flex items-center pl-3">
            <SpectaclesIcon className="w-7.5 h-4.5 drop-shadow-xs" color="#075985" />
          </div>

          {/* Attractive Top Editorial Typography */}
          <div className="flex flex-col text-right pr-3">
            <div className="flex items-center justify-end gap-1">
              <span className="w-2.5 h-[1.5px] bg-[#0284C7] rounded-full" />
              <span className="text-[10.5px] font-black tracking-[0.18em] text-[#075985] leading-tight">
                CLEAR VISION
              </span>
              <span className="w-2.5 h-[1.5px] bg-[#0284C7] rounded-full" />
            </div>
            <span className="text-[7.5px] font-extrabold tracking-[0.14em] text-[#0284C7] leading-none mt-0.5 uppercase">
              ✦ Brighter Tomorrow ✦
            </span>
          </div>

          {/* Bottom Dual Accent Border (Deep Ocean Blue to Sky Blue) */}
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#075985] via-[#0284C7] to-[#075985]" />
        </div>

        {/* Center Live Photo Area: Completely Borderless & Unobstructed */}
        <div className="flex-1" />

        {/* Bottom Banner: Clean Boutique Polaroid Card with Subtle Curved Bevel */}
        <div className="relative w-full z-20">
          {/* Subtle Curved Bevel on Top of Bottom Card */}
          <div className="w-full h-3 overflow-hidden -mb-0.5">
            <svg viewBox="0 0 400 16" preserveAspectRatio="none" className="w-full h-full drop-shadow-xs">
              <path d="M 0,16 Q 200,2 400,16 L 400,16 L 0,16 Z" fill="#FFFFFF" />
              <path d="M 0,16 Q 200,2 400,16" fill="none" stroke="#0284C7" strokeWidth="1.5" />
            </svg>
          </div>

          {/* White Bottom Studio Card */}
          <div className="relative bg-white/98 backdrop-blur-xs pt-1 pb-2.5 px-3 shadow-lg flex items-center justify-between border-t border-[#D6EAF0]/50">
            {/* Bottom-Left Art-Deco Corner Bracket */}
            <div className="absolute bottom-0 left-0 w-5 h-5 pointer-events-none">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <polygon points="0,24 24,24 0,0" fill="#075985" />
                <line x1="0" y1="0" x2="24" y2="24" stroke="#0284C7" strokeWidth="1.6" />
              </svg>
            </div>

            {/* Bottom-Right Art-Deco Corner Bracket */}
            <div className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <polygon points="24,24 0,24 24,0" fill="#075985" />
                <line x1="0" y1="24" x2="24" y2="0" stroke="#0284C7" strokeWidth="1.6" />
              </svg>
            </div>

            {/* Left Balance Spacer */}
            <div className="w-8 shrink-0" />

            {/* Centered Brand Emblem */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8.5 h-5 mb-0.5 drop-shadow-xs">
                <EyeIcon className="w-full h-full" />
              </div>
              <span className="text-[12.5px] font-black text-[#075985] tracking-tight leading-none">
                {SHOP_CONFIG.brandName}
              </span>
              <span className="text-[7.5px] font-bold text-[#075985] tracking-tight leading-none mt-0.5">
                {SHOP_CONFIG.brandSubtitle}
              </span>
              <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#EAF7FA] border border-[#D6EAF0] shadow-2xs">
                <span className="text-[6.5px] font-extrabold text-[#0284C7] tracking-[0.16em] uppercase">
                  ✦ {SHOP_CONFIG.brandTagline} ✦
                </span>
              </div>
            </div>

            {/* Right Spectacles Line Art with Temple Wire */}
            <div className="w-8 shrink-0 flex justify-end pr-1 opacity-90">
              <SpectaclesIcon className="w-8 h-4.5 drop-shadow-xs" color="#075985" showTemples={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── 2. MODERN TEAL FRAME ─────────────────────────────────────────────
  if (frameId === 'modern-teal') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between overflow-hidden select-none">
        {/* Top Header: Sweeping Ocean-to-Teal Multi-Layer Waves */}
        <div className="relative w-full h-12.5 bg-white/98 backdrop-blur-xs px-3.5 flex items-center justify-between shadow-xs">
          {/* Top-Left Dynamic Fluid Arc Graphic */}
          <div className="absolute top-0 left-0 w-38 h-12.5 pointer-events-none">
            <svg viewBox="0 0 160 65" preserveAspectRatio="none" className="w-full h-full drop-shadow-xs">
              <defs>
                <linearGradient id="mt-top-teal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22A6BE" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>
              <path d="M 0,0 Q 90,0 140,42 Q 70,65 0,28 Z" fill="#075985" />
              <path d="M 0,0 Q 110,8 150,52 Q 95,62 0,35 Z" fill="#0284C7" opacity="0.85" />
              <path d="M 0,0 Q 125,15 160,65 Q 120,65 0,44 Z" fill="url(#mt-top-teal)" opacity="0.95" />
            </svg>
          </div>

          {/* Center-Right Dynamic Typography */}
          <div className="z-10 ml-28 flex flex-col text-left">
            <span className="text-[10.5px] font-black tracking-[0.16em] text-[#22A6BE] leading-tight flex items-center gap-1 drop-shadow-2xs">
              SEE BETTER
            </span>
            <span className="text-[8.5px] font-black tracking-[0.12em] text-[#075985] leading-none mt-0.5">
              LOOK BRIGHTER
            </span>
          </div>

          {/* Right Cyan Spectacles Icon */}
          <div className="z-10 flex items-center pr-1">
            <SpectaclesIcon className="w-8 h-4.5 drop-shadow-xs" color="#22A6BE" />
          </div>

          {/* Bottom Accent Gradient Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#22A6BE] via-[#0284C7] to-transparent" />
        </div>

        {/* Center Live Photo Area: Completely Borderless */}
        <div className="flex-1" />

        {/* Bottom Banner: Asymmetric Curved Wave Cut with Flowing Teal/Navy Ribbons */}
        <div className="relative w-full z-20 overflow-hidden">
          {/* Asymmetric Wave Cut over bottom of photo */}
          <div className="w-full h-5 overflow-hidden -mb-0.5">
            <svg viewBox="0 0 400 30" preserveAspectRatio="none" className="w-full h-full drop-shadow-sm">
              <path d="M 0,30 Q 140,8 270,24 Q 340,32 400,28 L 400,30 L 0,30 Z" fill="#FFFFFF" />
              <path d="M 0,30 Q 140,8 270,24 Q 340,32 400,28" fill="none" stroke="#22A6BE" strokeWidth="2" />
            </svg>
          </div>

          {/* White Card Base with Sweeping Multi-Tier Teal/Blue Waves on Bottom-Right */}
          <div className="relative bg-white/98 backdrop-blur-xs pt-1 pb-2.5 px-3 shadow-lg flex items-center justify-between">
            {/* Left/Center Brand Crest */}
            <div className="flex flex-col items-center z-10 pl-6">
              <div className="w-8.5 h-5 mb-0.5 drop-shadow-xs">
                <EyeIcon className="w-full h-full" />
              </div>
              <span className="text-[12.5px] font-black text-[#075985] tracking-tight leading-none">
                {SHOP_CONFIG.brandName}
              </span>
              <span className="text-[7.5px] font-bold text-[#075985] tracking-tight leading-none mt-0.5">
                {SHOP_CONFIG.brandSubtitle}
              </span>
              <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#22A6BE]/10 border border-[#22A6BE]/30 shadow-2xs">
                <span className="text-[6.5px] font-extrabold text-[#22A6BE] tracking-[0.16em] uppercase">
                  ✦ {SHOP_CONFIG.brandTagline} ✦
                </span>
              </div>
            </div>

            {/* Right Flowing Teal/Blue Dynamic Ribbons */}
            <div className="absolute right-0 bottom-0 top-0 w-38 pointer-events-none">
              <svg viewBox="0 0 150 75" preserveAspectRatio="none" className="w-full h-full">
                <path d="M 150,0 Q 80,10 50,42 Q 20,70 0,75 L 150,75 Z" fill="#22A6BE" opacity="0.95" />
                <path d="M 150,15 Q 90,22 65,48 Q 40,70 15,75 L 150,75 Z" fill="#0284C7" opacity="0.9" />
                <path d="M 150,30 Q 100,35 80,55 Q 60,70 35,75 L 150,75 Z" fill="#075985" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── 3. PREMIUM EYEWEAR FRAME ─────────────────────────────────────────
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between overflow-hidden select-none">
      {/* Top Header: Haute Couture Deep Midnight Blue + Metallic Gold Pinstripes */}
      <div className="relative w-full h-12.5 bg-gradient-to-r from-[#061826] via-[#075985] to-[#061826] px-3.5 flex items-center justify-between shadow-md">
        {/* Top-Left Diagonal Metallic Gold Pinstripes */}
        <div className="absolute top-0 left-0 w-16 h-12.5 pointer-events-none">
          <svg viewBox="0 0 70 55" preserveAspectRatio="none" className="w-full h-full">
            <line x1="0" y1="18" x2="35" y2="0" stroke="#F6E27A" strokeWidth="2.6" />
            <line x1="0" y1="30" x2="55" y2="0" stroke="#D4AF37" strokeWidth="1.6" />
          </svg>
        </div>

        {/* Top Gold Spectacles Icon */}
        <div className="z-10 pl-4 flex items-center">
          <SpectaclesIcon className="w-8 h-4.5 drop-shadow-sm" color="#F6E27A" />
        </div>

        {/* Attractive Top Typography in Pure White & Metallic Gold */}
        <div className="z-10 flex flex-col text-right pr-2">
          <span className="text-[10.5px] font-black tracking-[0.18em] text-white leading-tight drop-shadow-xs">
            PREMIUM EYEWEAR
          </span>
          <span className="text-[7.5px] font-extrabold tracking-[0.16em] text-[#F6E27A] leading-none mt-0.5 uppercase">
            ✦ For A Clearer You ✦
          </span>
        </div>

        {/* Bottom Metallic Gold Divider Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F]" />
      </div>

      {/* Center Live Photo Area: Completely Borderless */}
      <div className="flex-1" />

      {/* Bottom Sharp Geometric Faceted Banner with Metallic Gold Inlay */}
      <div className="relative w-full z-20 overflow-hidden">
        {/* Sharp Diagonal Angle Cut over Photo */}
        <div className="w-full h-4.5 overflow-hidden -mb-0.5">
          <svg viewBox="0 0 400 22" preserveAspectRatio="none" className="w-full h-full drop-shadow-sm">
            <path d="M 0,22 L 290,4 L 400,22 Z" fill="#FFFFFF" />
            <line x1="0" y1="22" x2="290" y2="4" stroke="#D4AF37" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Bottom Banner: Crisp White Left Facet + Dark Midnight Navy Right Facet */}
        <div className="relative bg-white pt-1 pb-2.5 px-3 shadow-xl flex items-center justify-between">
          {/* Left/Center Brand Crest on Crisp White Surface */}
          <div className="flex flex-col items-center z-10 pl-6">
            <div className="w-8.5 h-5 mb-0.5 drop-shadow-xs">
              <EyeIcon className="w-full h-full" />
            </div>
            <span className="text-[12.5px] font-black text-[#075985] tracking-tight leading-none">
              {SHOP_CONFIG.brandName}
            </span>
            <span className="text-[7.5px] font-bold text-[#075985] tracking-tight leading-none mt-0.5">
              {SHOP_CONFIG.brandSubtitle}
            </span>
            <div className="mt-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#075985] to-[#0284C7] shadow-2xs">
              <span className="text-[6.5px] font-black text-[#FCF6BA] tracking-[0.18em] uppercase">
                ✦ {SHOP_CONFIG.brandTagline} ✦
              </span>
            </div>
          </div>

          {/* Right Dark Navy Angled Facet with Gold Pinstripes & Gold Spectacles */}
          <div
            className="absolute right-0 bottom-0 top-0 w-38 bg-gradient-to-bl from-[#061826] to-[#075985] flex items-center justify-center pl-6 pr-3 overflow-hidden shadow-inner"
            style={{ clipPath: 'polygon(30px 0, 100% 0, 100% 100%, 0 100%)' }}
          >
            {/* Metallic Gold Diagonal Pinstripes */}
            <div className="absolute inset-0 pointer-events-none">
              <svg viewBox="0 0 140 75" preserveAspectRatio="none" className="w-full h-full">
                <line x1="30" y1="0" x2="0" y2="75" stroke="#F6E27A" strokeWidth="3" />
                <line x1="42" y1="0" x2="12" y2="75" stroke="#BF953F" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="z-10">
              <SpectaclesIcon className="w-9 h-5 drop-shadow-sm" color="#FCF6BA" showTemples={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 2D CANVAS DRAWING ENGINE (For 1080 × 1350 High-Resolution JPEG Export)
// ────────────────────────────────────────────────────────────────────────

/**
 * Draws the AAKASH Eye Logo directly to Canvas
 */
function drawAakashEyeCanvas(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale = 1,
  color = '#075985'
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // 7 Radiating Eyelashes on Top
  ctx.strokeStyle = color;
  ctx.lineWidth = 4.5;
  ctx.lineCap = 'round';

  const lashes = [
    [-36, -19, -42, -32],
    [-24, -24, -29, -36],
    [-12, -27, -14, -39],
    [0, -28, 0, -40],
    [12, -27, 14, -39],
    [24, -24, 29, -36],
    [36, -19, 42, -32],
  ];
  lashes.forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  // Upper Eyelid Arch
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-50, 0);
  ctx.quadraticCurveTo(0, -25, 50, 0);
  ctx.stroke();

  // Lower Eyelid Arch
  ctx.beginPath();
  ctx.moveTo(-50, 0);
  ctx.quadraticCurveTo(0, 25, 50, 0);
  ctx.stroke();

  // Iris Circle with Concentric Depth
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, 16.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0284C7';
  ctx.beginPath();
  ctx.arc(0, 0, 13.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, 9.5, 0, Math.PI * 2);
  ctx.fill();

  // Specular Pupil Highlight
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(-4, -4, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Draws Spectacles Line-Art Icon to Canvas
 */
function drawSpectaclesCanvas(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color = '#075985',
  showTemples = true
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = w * 0.038;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const lensW = w * 0.38;
  const lensH = h * 0.65;
  const r = lensH * 0.28;
  const bridgeW = w * 0.12;

  // Left Lens Rounded Rect
  ctx.beginPath();
  ctx.roundRect(x, y + h * 0.18, lensW, lensH, r);
  ctx.stroke();

  // Right Lens Rounded Rect
  ctx.beginPath();
  ctx.roundRect(x + lensW + bridgeW, y + h * 0.18, lensW, lensH, r);
  ctx.stroke();

  // Center Nose Bridge
  ctx.beginPath();
  ctx.moveTo(x + lensW, y + h * 0.35);
  ctx.quadraticCurveTo(x + lensW + bridgeW / 2, y + h * 0.25, x + lensW + bridgeW, y + h * 0.35);
  ctx.stroke();

  // Outer Temple Lugs
  ctx.beginPath();
  ctx.moveTo(x, y + h * 0.3);
  ctx.lineTo(x - w * 0.08, y + h * 0.3);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + lensW * 2 + bridgeW, y + h * 0.3);
  ctx.lineTo(x + lensW * 2 + bridgeW + w * 0.08, y + h * 0.3);
  ctx.stroke();

  if (showTemples) {
    ctx.lineWidth = w * 0.026;
    ctx.beginPath();
    ctx.moveTo(x - w * 0.08, y + h * 0.3);
    ctx.quadraticCurveTo(x - w * 0.12, y + h * 0.32, x - w * 0.1, y + h * 0.65);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + lensW * 2 + bridgeW + w * 0.08, y + h * 0.3);
    ctx.quadraticCurveTo(x + lensW * 2 + bridgeW + w * 0.12, y + h * 0.32, x + lensW * 2 + bridgeW + w * 0.1, y + h * 0.65);
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Composite the selected optical frame onto the 1080 × 1350 canvas.
 * Exactly matches the live preview:
 * - 100% Borderless over the photo.
 * - Attractive, boutique styled typography.
 * - Rich vector graphics for Classic Vision, Modern Teal, and Premium Eyewear.
 */
export function drawOpticalFrameCanvas(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  frameId: FrameId,
  logoImg?: HTMLImageElement | null
) {
  ctx.save();

  // ── 1. CLASSIC VISION CANVAS ─────────────────────────────────────────
  if (frameId === 'classic-vision') {
    // Top White Header Bar (sleek height: 90px)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, 90);

    // Deep blue + Cyan gradient divider line under top bar
    const topGrad = ctx.createLinearGradient(0, 0, w, 0);
    topGrad.addColorStop(0, '#075985');
    topGrad.addColorStop(0.5, '#0284C7');
    topGrad.addColorStop(1, '#075985');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 86, w, 4);

    // Top-Left & Top-Right Art-Deco Geometric Corner Tabs
    ctx.fillStyle = '#075985';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(44, 0);
    ctx.lineTo(0, 44);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 44);
    ctx.lineTo(44, 0);
    ctx.stroke();

    ctx.fillStyle = '#075985';
    ctx.beginPath();
    ctx.moveTo(w, 0);
    ctx.lineTo(w - 44, 0);
    ctx.lineTo(w, 44);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w - 44, 0);
    ctx.lineTo(w, 44);
    ctx.stroke();

    // Top Spectacles Icon on Left
    drawSpectaclesCanvas(ctx, 55, 23, 85, 44, '#075985', false);

    // Attractive Top Editorial Typography on Right
    ctx.fillStyle = '#075985';
    ctx.font = 'bold 24px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('— CLEAR VISION —', w - 55, 42);

    ctx.fillStyle = '#0284C7';
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillText('✦ BRIGHTER TOMORROW ✦', w - 55, 70);

    // Bottom Banner: Clean Boutique Polaroid Card with Subtle Curved Bevel (Height: 155px)
    ctx.beginPath();
    ctx.moveTo(0, h - 146);
    ctx.quadraticCurveTo(w / 2, h - 158, w, h - 146);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Subtle Cyan Bevel Line
    ctx.beginPath();
    ctx.moveTo(0, h - 146);
    ctx.quadraticCurveTo(w / 2, h - 158, w, h - 146);
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Bottom-Left & Bottom-Right Art-Deco Geometric Corner Tabs
    ctx.fillStyle = '#075985';
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(44, h);
    ctx.lineTo(0, h - 44);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, h - 44);
    ctx.lineTo(44, h);
    ctx.stroke();

    ctx.fillStyle = '#075985';
    ctx.beginPath();
    ctx.moveTo(w, h);
    ctx.lineTo(w - 44, h);
    ctx.lineTo(w, h - 44);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w - 44, h);
    ctx.lineTo(w, h - 44);
    ctx.stroke();

    // Centered Aakash Eye Logo & Brand Typography
    if (logoImg && logoImg.complete) {
      ctx.drawImage(logoImg, w / 2 - 38, h - 138, 76, 52);
    } else {
      drawAakashEyeCanvas(ctx, w / 2, h - 110, 0.62, '#075985');
    }

    ctx.fillStyle = '#075985';
    ctx.font = 'bold 31px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(SHOP_CONFIG.brandName, w / 2, h - 58);

    ctx.fillStyle = '#075985';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText(SHOP_CONFIG.brandSubtitle, w / 2, h - 36);

    // Pill Badge for Tagline
    ctx.fillStyle = '#EAF7FA';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 140, h - 26, 280, 20, 10);
    ctx.fill();
    ctx.strokeStyle = '#D6EAF0';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#0284C7';
    ctx.font = 'bold 12px "Inter", sans-serif';
    ctx.fillText(`✦ ${SHOP_CONFIG.brandTagline} ✦`, w / 2, h - 12);

    // Spectacles Drawing on Bottom Right
    drawSpectaclesCanvas(ctx, w - 165, h - 85, 105, 52, '#075985', true);
  }

  // ── 2. MODERN TEAL CANVAS ────────────────────────────────────────────
  else if (frameId === 'modern-teal') {
    // Top White Header Bar (sleek height: 92px)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, 92);

    // Top-Left Sweeping Wave Ribbons (3-tier dynamic flow)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(200, 0, 310, 68);
    ctx.quadraticCurveTo(170, 105, 0, 40);
    ctx.closePath();
    ctx.fillStyle = '#075985';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(240, 12, 340, 84);
    ctx.quadraticCurveTo(220, 100, 0, 54);
    ctx.closePath();
    ctx.fillStyle = 'rgba(2, 132, 199, 0.88)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(270, 20, 370, 100);
    ctx.quadraticCurveTo(260, 105, 0, 68);
    ctx.closePath();
    ctx.fillStyle = 'rgba(34, 166, 190, 0.95)';
    ctx.fill();

    // Attractive Center-Right Dynamic Typography
    ctx.fillStyle = '#22A6BE';
    ctx.font = 'bold 26px "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('SEE BETTER', 390, 42);

    ctx.fillStyle = '#075985';
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillText('LOOK BRIGHTER', 390, 70);

    // Right Cyan Spectacles Icon
    drawSpectaclesCanvas(ctx, w - 150, 23, 90, 46, '#22A6BE', false);

    // Cyan accent divider line under top bar
    const tealGrad = ctx.createLinearGradient(0, 0, w, 0);
    tealGrad.addColorStop(0, '#22A6BE');
    tealGrad.addColorStop(0.7, '#0284C7');
    tealGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = tealGrad;
    ctx.fillRect(0, 88, w, 4);

    // Bottom Banner: Asymmetric Curved Wave Cut (Height: 155px)
    ctx.beginPath();
    ctx.moveTo(0, h - 146);
    ctx.quadraticCurveTo(w * 0.35, h - 170, w * 0.68, h - 142);
    ctx.quadraticCurveTo(w * 0.85, h - 128, w, h - 138);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, h - 146);
    ctx.quadraticCurveTo(w * 0.35, h - 170, w * 0.68, h - 142);
    ctx.quadraticCurveTo(w * 0.85, h - 128, w, h - 138);
    ctx.strokeStyle = '#22A6BE';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Sweeping Wave Ribbons on Bottom Right
    ctx.beginPath();
    ctx.moveTo(w, h - 138);
    ctx.quadraticCurveTo(w - 200, h - 120, w - 280, h);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = '#22A6BE';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(w, h - 110);
    ctx.quadraticCurveTo(w - 170, h - 98, w - 230, h);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = '#0284C7';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(w, h - 80);
    ctx.quadraticCurveTo(w - 125, h - 68, w - 175, h);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = '#075985';
    ctx.fill();

    // Centered Aakash Eye Logo & Brand Typography
    if (logoImg && logoImg.complete) {
      ctx.drawImage(logoImg, w * 0.36 - 38, h - 138, 76, 52);
    } else {
      drawAakashEyeCanvas(ctx, w * 0.36, h - 110, 0.62, '#075985');
    }

    ctx.fillStyle = '#075985';
    ctx.font = 'bold 31px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(SHOP_CONFIG.brandName, w * 0.36, h - 58);

    ctx.fillStyle = '#075985';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText(SHOP_CONFIG.brandSubtitle, w * 0.36, h - 36);

    // Pill Badge for Tagline
    ctx.fillStyle = 'rgba(34, 166, 190, 0.12)';
    ctx.beginPath();
    ctx.roundRect(w * 0.36 - 140, h - 26, 280, 20, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(34, 166, 190, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#22A6BE';
    ctx.font = 'bold 12px "Inter", sans-serif';
    ctx.fillText(`✦ ${SHOP_CONFIG.brandTagline} ✦`, w * 0.36, h - 12);
  }

  // ── 3. PREMIUM EYEWEAR CANVAS ────────────────────────────────────────
  else {
    // Top Dark Midnight Gradient Header Bar (sleek height: 92px)
    const midnightGrad = ctx.createLinearGradient(0, 0, w, 0);
    midnightGrad.addColorStop(0, '#061826');
    midnightGrad.addColorStop(0.5, '#075985');
    midnightGrad.addColorStop(1, '#061826');
    ctx.fillStyle = midnightGrad;
    ctx.fillRect(0, 0, w, 92);

    // Metallic Gold Divider line under top bar
    const goldGrad = ctx.createLinearGradient(0, 0, w, 0);
    goldGrad.addColorStop(0, '#BF953F');
    goldGrad.addColorStop(0.25, '#FCF6BA');
    goldGrad.addColorStop(0.5, '#B38728');
    goldGrad.addColorStop(0.75, '#FBF5B7');
    goldGrad.addColorStop(1, '#AA771C');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 88, w, 4);

    // Diagonal Metallic Gold Stripes on Top-Left Corner
    ctx.strokeStyle = '#F6E27A';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 36);
    ctx.lineTo(72, 0);
    ctx.stroke();

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 60);
    ctx.lineTo(120, 0);
    ctx.stroke();

    // Top Golden Spectacles Icon
    drawSpectaclesCanvas(ctx, 145, 23, 85, 44, '#F6E27A', false);

    // Attractive Top Typography in White & Metallic Gold on Right
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('PREMIUM EYEWEAR', w - 55, 42);

    ctx.fillStyle = '#F6E27A';
    ctx.font = 'bold 18px "Inter", sans-serif';
    ctx.fillText('✦ FOR A CLEARER YOU ✦', w - 55, 70);

    // Bottom Banner: Sharp Diagonal Angle Cut over Photo (Height: 155px)
    ctx.beginPath();
    ctx.moveTo(0, h - 155);
    ctx.lineTo(w * 0.72, h - 118);
    ctx.lineTo(w * 0.62, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Metallic Gold Diagonal Dividing Pinstripes
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(0, h - 155);
    ctx.lineTo(w * 0.72, h - 118);
    ctx.stroke();

    // Right Dark Midnight Obsidian Polygon Facet
    const darkFacetGrad = ctx.createLinearGradient(w * 0.62, h - 118, w, h);
    darkFacetGrad.addColorStop(0, '#061826');
    darkFacetGrad.addColorStop(1, '#075985');
    ctx.beginPath();
    ctx.moveTo(w * 0.72, h - 118);
    ctx.lineTo(w, h - 118);
    ctx.lineTo(w, h);
    ctx.lineTo(w * 0.62, h);
    ctx.closePath();
    ctx.fillStyle = darkFacetGrad;
    ctx.fill();

    // Metallic Gold Diagonal Stripes on Dark Facet
    ctx.strokeStyle = '#F6E27A';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w * 0.72, h - 118);
    ctx.lineTo(w * 0.62, h);
    ctx.stroke();

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.76, h - 118);
    ctx.lineTo(w * 0.66, h);
    ctx.stroke();

    // Gold Spectacles in Right Dark Facet
    drawSpectaclesCanvas(ctx, w - 165, h - 85, 105, 52, '#FCF6BA', true);

    // Centered Aakash Eye Logo & Brand Typography on Left White Surface
    if (logoImg && logoImg.complete) {
      ctx.drawImage(logoImg, w * 0.35 - 38, h - 138, 76, 52);
    } else {
      drawAakashEyeCanvas(ctx, w * 0.35, h - 110, 0.62, '#075985');
    }

    ctx.fillStyle = '#075985';
    ctx.font = 'bold 31px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(SHOP_CONFIG.brandName, w * 0.35, h - 58);

    ctx.fillStyle = '#075985';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText(SHOP_CONFIG.brandSubtitle, w * 0.35, h - 36);

    // Luxury Pill Badge with Deep Navy & Gold Tagline
    const badgeGrad = ctx.createLinearGradient(w * 0.35 - 140, 0, w * 0.35 + 140, 0);
    badgeGrad.addColorStop(0, '#061826');
    badgeGrad.addColorStop(0.5, '#075985');
    badgeGrad.addColorStop(1, '#061826');
    ctx.fillStyle = badgeGrad;
    ctx.beginPath();
    ctx.roundRect(w * 0.35 - 140, h - 26, 280, 20, 10);
    ctx.fill();

    ctx.fillStyle = '#FCF6BA';
    ctx.font = 'bold 12px "Inter", sans-serif';
    ctx.fillText(`✦ ${SHOP_CONFIG.brandTagline} ✦`, w * 0.35, h - 12);
  }

  ctx.restore();
}
