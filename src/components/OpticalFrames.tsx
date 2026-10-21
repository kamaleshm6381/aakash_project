'use client';

import React from 'react';
import { SHOP_CONFIG, FrameId } from '@/config/shop';

interface OpticalFrameOverlayProps {
  frameId: FrameId;
  showStoryGuides?: boolean;
}

/**
 * Spectacles Vector Icon for 1080x1920 SVG overlays
 */
function SpectaclesSvg({
  x,
  y,
  w = 64,
  h = 30,
  color = '#075985',
  showTemples = true,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  color?: string;
  showTemples?: boolean;
}) {
  const strokeW = w * 0.052;
  const lensW = w * 0.38;
  const lensH = h * 0.65;
  const r = lensH * 0.28;
  const bridgeW = w * 0.12;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Left Lens */}
      <rect
        x={0}
        y={h * 0.18}
        width={lensW}
        height={lensH}
        rx={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Lens */}
      <rect
        x={lensW + bridgeW}
        y={h * 0.18}
        width={lensW}
        height={lensH}
        rx={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center Bridge */}
      <path
        d={`M ${lensW} ${h * 0.35} Q ${lensW + bridgeW / 2} ${h * 0.22} ${lensW + bridgeW} ${h * 0.35}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeW}
        strokeLinecap="round"
      />
      {/* Left Temple Lug */}
      <line
        x1={0}
        y1={h * 0.3}
        x2={-w * 0.08}
        y2={h * 0.3}
        stroke={color}
        strokeWidth={strokeW}
        strokeLinecap="round"
      />
      {/* Right Temple Lug */}
      <line
        x1={lensW * 2 + bridgeW}
        y1={h * 0.3}
        x2={lensW * 2 + bridgeW + w * 0.08}
        y2={h * 0.3}
        stroke={color}
        strokeWidth={strokeW}
        strokeLinecap="round"
      />
      {showTemples && (
        <>
          <path
            d={`M ${-w * 0.08} ${h * 0.3} Q ${-w * 0.12} ${h * 0.32} ${-w * 0.1} ${h * 0.65}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeW * 0.75}
            strokeLinecap="round"
          />
          <path
            d={`M ${lensW * 2 + bridgeW + w * 0.08} ${h * 0.3} Q ${lensW * 2 + bridgeW + w * 0.12} ${h * 0.32} ${lensW * 2 + bridgeW + w * 0.1} ${h * 0.65}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeW * 0.75}
            strokeLinecap="round"
          />
        </>
      )}
    </g>
  );
}

/**
 * Aakash Eye Vector Icon for SVG fallback
 */
function AakashEyeSvg({
  x,
  y,
  scale = 0.44,
  color = '#075985',
}: {
  x: number;
  y: number;
  scale?: number;
  color?: string;
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Eyelashes */}
      <g stroke={color} strokeWidth={4.5} strokeLinecap="round">
        <line x1={-36} y1={-19} x2={-42} y2={-32} />
        <line x1={-24} y1={-24} x2={-29} y2={-36} />
        <line x1={-12} y1={-27} x2={-14} y2={-39} />
        <line x1={0} y1={-28} x2={0} y2={-40} />
        <line x1={12} y1={-27} x2={14} y2={-39} />
        <line x1={24} y1={-24} x2={29} y2={-36} />
        <line x1={36} y1={-19} x2={42} y2={-32} />
      </g>
      {/* Upper Arch */}
      <path
        d="M -50 0 Q 0 -25 50 0"
        fill="none"
        stroke={color}
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      {/* Lower Arch */}
      <path
        d="M -50 0 Q 0 25 50 0"
        fill="none"
        stroke={color}
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      {/* Iris */}
      <circle cx={0} cy={0} r={16.5} fill={color} />
      <circle cx={0} cy={0} r={13.5} fill="#0284C7" />
      <circle cx={0} cy={0} r={9.5} fill={color} />
      <circle cx={-4} cy={-4} r={4} fill="#FFFFFF" />
    </g>
  );
}

/**
 * High-Aesthetic Optical Frame Overlays for AAKASH Eye Clinic & Optical:
 * - Scaled directly on 1080 × 1920 coordinate system for 100% pixel-for-pixel alignment with the downloaded photo.
 * - SPACIOUS TOP COVER: Generous 96px header bar with comfortable vertical breathing room.
 * - SPACIOUS FRAME COVER (Bottom Banner): 225px boutique card with elegant padding.
 * - ORIGINAL BRAND NAME PROPORTIONS:
 *   "AAKASH" in crisp, balanced 33px font + 16px subtitle + 13px tagline pill.
 * - Leaves 83.3% unobstructed central photo space (1600px height).
 * - What the customer sees live is identical to what they click and what is downloaded.
 */
export function OpticalFrameOverlay({ frameId, showStoryGuides = false }: OpticalFrameOverlayProps) {
  return (
    <svg
      viewBox="0 0 1080 1920"
      className="absolute inset-0 w-full h-full pointer-events-none z-10 select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="svg-classic-top-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#075985" />
          <stop offset="50%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        <linearGradient id="svg-teal-top-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22A6BE" />
          <stop offset="70%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#22A6BE" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="svg-midnight-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#061826" />
          <stop offset="50%" stopColor="#075985" />
          <stop offset="100%" stopColor="#061826" />
        </linearGradient>

        <linearGradient id="svg-gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#BF953F" />
          <stop offset="25%" stopColor="#FCF6BA" />
          <stop offset="50%" stopColor="#B38728" />
          <stop offset="75%" stopColor="#FBF5B7" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>

        <linearGradient id="svg-dark-facet" x1="610" y1="1720" x2="1080" y2="1920" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#061826" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>
      </defs>

      {/* ── Optional Instagram Story Safe Margin Guides ────────────────── */}
      {showStoryGuides && (
        <g strokeDasharray="8 8" opacity={0.75}>
          {/* Top Story Safe Margin (12% ~ 230px) */}
          <line x1={0} y1={230} x2={1080} y2={230} stroke="#38BDF8" strokeWidth={2} />
          <text x={24} y={220} fill="#38BDF8" fontSize={16} fontWeight="bold" fontFamily="sans-serif">
            Story Safe Top
          </text>

          {/* Central Eyewear Focal Area */}
          <rect
            x={108}
            y={672}
            width={864}
            height={576}
            rx={28}
            stroke="#FFFFFF"
            strokeWidth={1.5}
            strokeDasharray="12 12"
            fill="none"
            opacity={0.35}
          />
          <text x={540} y={960} textAnchor="middle" fill="#FFFFFF" fontSize={18} fontWeight="bold" opacity={0.4} fontFamily="sans-serif">
            EYEWEAR FOCUS ZONE
          </text>

          {/* Bottom Story Safe Margin (87% ~ 1670px) */}
          <line x1={0} y1={1670} x2={1080} y2={1670} stroke="#38BDF8" strokeWidth={2} />
          <text x={24} y={1660} fill="#38BDF8" fontSize={16} fontWeight="bold" fontFamily="sans-serif">
            Story Safe Bottom
          </text>
        </g>
      )}

      {/* ── 1. CLASSIC VISION OVERLAY (Strict 9:16) ────────────────────── */}
      {frameId === 'classic-vision' && (
        <g>
          {/* Top Spacious Header Bar (Height: 96px) */}
          <rect x={0} y={0} width={1080} height={96} fill="#FFFFFF" fillOpacity={0.98} />
          <line x1={0} y1={94} x2={1080} y2={94} stroke="url(#svg-classic-top-grad)" strokeWidth={3} />

          {/* Top-Left Art-Deco Corner Bracket */}
          <polygon points="0,0 36,0 0,36" fill="#075985" />
          <line x1={0} y1={36} x2={36} y2={0} stroke="#0284C7" strokeWidth={2.5} />

          {/* Top-Right Art-Deco Corner Bracket */}
          <polygon points="1080,0 1044,0 1080,36" fill="#075985" />
          <line x1={1044} y1={0} x2={1080} y2={36} stroke="#0284C7" strokeWidth={2.5} />

          {/* Left Spectacles Icon (72 × 34) */}
          <SpectaclesSvg x={44} y={31} w={72} h={34} color="#075985" showTemples={false} />

          {/* Right Sleek Typography */}
          <text x={1036} y={46} textAnchor="end" fill="#075985" fontFamily="Inter, sans-serif" fontWeight="900" fontSize={22} letterSpacing="0.08em">
            — CLEAR VISION —
          </text>
          <text x={1036} y={74} textAnchor="end" fill="#0284C7" fontFamily="Inter, sans-serif" fontWeight="800" fontSize={15} letterSpacing="0.1em">
            ✦ BRIGHTER TOMORROW ✦
          </text>

          {/* Bottom Spacious Frame Cover (Height: 225px, from Y = 1695 to 1920) */}
          <path d="M 0,1695 Q 540,1685 1080,1695 L 1080,1920 L 0,1920 Z" fill="#FFFFFF" fillOpacity={0.98} />
          <path d="M 0,1695 Q 540,1685 1080,1695" fill="none" stroke="#0284C7" strokeWidth={2.5} />

          {/* Bottom-Left Art-Deco Corner Bracket */}
          <polygon points="0,1920 36,1920 0,1884" fill="#075985" />
          <line x1={0} y1={1884} x2={36} y2={1920} stroke="#0284C7" strokeWidth={2.5} />

          {/* Bottom-Right Art-Deco Corner Bracket */}
          <polygon points="1080,1920 1044,1920 1080,1884" fill="#075985" />
          <line x1={1044} y1={1920} x2={1080} y2={1884} stroke="#0284C7" strokeWidth={2.5} />

          {/* Centered Brand Emblem (64 × 42 with comfortable padding) */}
          <image href="/aakash-eye-logo.png" x={508} y={1714} width={64} height={42} />

          {/* Original Brand Typography Proportions */}
          <text x={540} y={1782} textAnchor="middle" fill="#075985" fontFamily="Inter, sans-serif" fontWeight="900" fontSize={33} letterSpacing="0.08em">
            {SHOP_CONFIG.brandName}
          </text>
          <text x={540} y={1812} textAnchor="middle" fill="#075985" fontFamily="Inter, sans-serif" fontWeight="800" fontSize={16} letterSpacing="0.06em">
            {SHOP_CONFIG.brandSubtitle}
          </text>

          {/* Tagline Pill with spacious padding */}
          <rect x={395} y={1836} width={290} height={28} rx={14} fill="#EAF7FA" stroke="#D6EAF0" strokeWidth={1.5} />
          <text x={540} y={1855} textAnchor="middle" fill="#0284C7" fontFamily="Inter, sans-serif" fontWeight="800" fontSize={13} letterSpacing="0.06em">
            ✦ {SHOP_CONFIG.brandTagline} ✦
          </text>

          {/* Right Spectacles Line Art */}
          <SpectaclesSvg x={960} y={1785} w={72} h={34} color="#075985" showTemples={true} />
        </g>
      )}

      {/* ── 2. MODERN TEAL OVERLAY (Strict 9:16) ───────────────────────── */}
      {frameId === 'modern-teal' && (
        <g>
          {/* Top Spacious White Studio Bar (Height: 96px) */}
          <rect x={0} y={0} width={1080} height={96} fill="#FFFFFF" fillOpacity={0.98} />

          {/* Sweeping Ocean Wave Ribbons */}
          <path d="M 0,0 Q 180,0 300,58 Q 160,96 0,38 Z" fill="#075985" />
          <path d="M 0,0 Q 220,8 340,72 Q 180,96 0,48 Z" fill="#0284C7" fillOpacity={0.88} />
          <path d="M 0,0 Q 250,16 370,86 Q 220,96 0,58 Z" fill="#22A6BE" fillOpacity={0.95} />

          {/* Center-Left Typography */}
          <text x={390} y={46} textAnchor="start" fill="#22A6BE" fontFamily="Inter, sans-serif" fontWeight="900" fontSize={22} letterSpacing="0.08em">
            SEE BETTER
          </text>
          <text x={390} y={74} textAnchor="start" fill="#075985" fontFamily="Inter, sans-serif" fontWeight="800" fontSize={15} letterSpacing="0.06em">
            LOOK BRIGHTER
          </text>

          {/* Right Cyan Spectacles Icon */}
          <SpectaclesSvg x={970} y={31} w={72} h={34} color="#22A6BE" showTemples={false} />
          <line x1={0} y1={94} x2={1080} y2={94} stroke="url(#svg-teal-top-grad)" strokeWidth={3} />

          {/* Bottom Spacious Frame Cover (Height: 225px, from Y = 1695 to 1920) */}
          <path d="M 0,1695 Q 378,1680 734,1697 Q 918,1705 1080,1699 L 1080,1920 L 0,1920 Z" fill="#FFFFFF" fillOpacity={0.98} />
          <path d="M 0,1695 Q 378,1680 734,1697 Q 918,1705 1080,1699" fill="none" stroke="#22A6BE" strokeWidth={2.5} />

          {/* Sweeping Waves on Bottom Right */}
          <path d="M 1080,1699 Q 910,1725 850,1920 L 1080,1920 Z" fill="#22A6BE" opacity="0.95" />
          <path d="M 1080,1730 Q 940,1750 900,1920 L 1080,1920 Z" fill="#0284C7" opacity="0.9" />

          {/* Brand Crest (Positioned at X = 400) */}
          <image href="/aakash-eye-logo.png" x={368} y={1714} width={64} height={42} />
          <text x={400} y={1782} textAnchor="middle" fill="#075985" fontFamily="Inter, sans-serif" fontWeight="900" fontSize={33} letterSpacing="0.08em">
            {SHOP_CONFIG.brandName}
          </text>
          <text x={400} y={1812} textAnchor="middle" fill="#075985" fontFamily="Inter, sans-serif" fontWeight="800" fontSize={16} letterSpacing="0.06em">
            {SHOP_CONFIG.brandSubtitle}
          </text>

          {/* Tagline Pill */}
          <rect x={255} y={1836} width={290} height={28} rx={14} fill="#22A6BE" fillOpacity={0.12} stroke="#22A6BE" strokeWidth={1.5} strokeOpacity={0.35} />
          <text x={400} y={1855} textAnchor="middle" fill="#22A6BE" fontFamily="Inter, sans-serif" fontWeight="800" fontSize={13} letterSpacing="0.06em">
            ✦ {SHOP_CONFIG.brandTagline} ✦
          </text>
        </g>
      )}

      {/* ── 3. PREMIUM EYEWEAR OVERLAY (Strict 9:16) ───────────────────── */}
      {frameId === 'premium-eyewear' && (
        <g>
          {/* Top Spacious Dark Midnight Header Bar (Height: 96px) */}
          <rect x={0} y={0} width={1080} height={96} fill="url(#svg-midnight-grad)" />
          <line x1={0} y1={94} x2={1080} y2={94} stroke="url(#svg-gold-grad)" strokeWidth={3} />

          {/* Diagonal Metallic Gold Corner Stripes */}
          <line x1={0} y1={32} x2={64} y2={0} stroke="#F6E27A" strokeWidth={2.5} />
          <line x1={0} y1={56} x2={112} y2={0} stroke="#D4AF37" strokeWidth={2} />

          {/* Top Gold Spectacles */}
          <SpectaclesSvg x={96} y={31} w={72} h={34} color="#F6E27A" showTemples={false} />

          {/* Top Right Typography */}
          <text x={1036} y={46} textAnchor="end" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontWeight="900" fontSize={22} letterSpacing="0.08em">
            PREMIUM EYEWEAR
          </text>
          <text x={1036} y={74} textAnchor="end" fill="#F6E27A" fontFamily="Inter, sans-serif" fontWeight="800" fontSize={15} letterSpacing="0.1em">
            ✦ FOR A CLEARER YOU ✦
          </text>

          {/* Bottom Spacious Frame Cover (Height: 225px, from Y = 1695 to 1920) */}
          <polygon points="0,1695 770,1720 610,1920 0,1920" fill="#FFFFFF" fillOpacity={0.98} />
          <line x1={0} y1={1695} x2={770} y2={1720} stroke="#D4AF37" strokeWidth={3} />

          {/* Right Dark Midnight Obsidian Facet */}
          <polygon points="770,1720 1080,1720 1080,1920 610,1920" fill="url(#svg-dark-facet)" />
          <line x1={770} y1={1720} x2={610} y2={1920} stroke="#F6E27A" strokeWidth={2.5} />

          {/* Gold Spectacles in Dark Facet */}
          <SpectaclesSvg x={960} y={1785} w={72} h={34} color="#FCF6BA" showTemples={true} />

          {/* Brand Crest on Left Surface (Positioned at X = 390) */}
          <image href="/aakash-eye-logo.png" x={358} y={1714} width={64} height={42} />
          <text x={390} y={1782} textAnchor="middle" fill="#075985" fontFamily="Inter, sans-serif" fontWeight="900" fontSize={33} letterSpacing="0.08em">
            {SHOP_CONFIG.brandName}
          </text>
          <text x={390} y={1812} textAnchor="middle" fill="#075985" fontFamily="Inter, sans-serif" fontWeight="800" fontSize={16} letterSpacing="0.06em">
            {SHOP_CONFIG.brandSubtitle}
          </text>

          {/* Luxury Tagline Pill */}
          <rect x={245} y={1836} width={290} height={28} rx={14} fill="url(#svg-midnight-grad)" stroke="#D4AF37" strokeWidth={1.5} strokeOpacity={0.7} />
          <text x={390} y={1855} textAnchor="middle" fill="#FCF6BA" fontFamily="Inter, sans-serif" fontWeight="800" fontSize={13} letterSpacing="0.06em">
            ✦ {SHOP_CONFIG.brandTagline} ✦
          </text>
        </g>
      )}
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 2D CANVAS DRAWING ENGINE (For Strict 9:16 - 1080 × 1920 Instagram Story)
// ────────────────────────────────────────────────────────────────────────

/**
 * Draws the AAKASH Eye Logo directly to Canvas as vector fallback
 */
function drawAakashEyeCanvas(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale = 0.44,
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
  ctx.lineWidth = 4.5;
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
  w = 64,
  h = 30,
  color = '#075985',
  showTemples = true
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = w * 0.052;
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
  ctx.quadraticCurveTo(x + lensW + bridgeW / 2, y + h * 0.22, x + lensW + bridgeW, y + h * 0.35);
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
    ctx.lineWidth = w * 0.038;
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
 * Composite the selected optical frame onto the 1080 × 1920 Instagram Story canvas.
 * Exactly matches what the user clicks and what is displayed on-screen:
 * - Strict 9:16 aspect ratio (1080 × 1920)
 * - Spacious top cover (96px)
 * - Spacious frame cover (225px, from Y = 1695 to 1920)
 * - Original brand name proportions (AAKASH at 33px bold + 16px subtitle)
 * - Central open photo zone: 1600px (83.3%)
 */
export function drawOpticalFrameCanvas(
  ctx: CanvasRenderingContext2D,
  w = 1080,
  h = 1920,
  frameId: FrameId,
  logoImg?: HTMLImageElement | null
) {
  ctx.save();

  const bTop = h - 225; // Y = 1695

  // ── 1. CLASSIC VISION CANVAS (9:16 Instagram Story) ───────────────────
  if (frameId === 'classic-vision') {
    // Top Spacious White Studio Bar (height: 96px)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, 96);

    // Deep blue + Cyan gradient divider line under top bar
    const topGrad = ctx.createLinearGradient(0, 0, w, 0);
    topGrad.addColorStop(0, '#075985');
    topGrad.addColorStop(0.5, '#0284C7');
    topGrad.addColorStop(1, '#075985');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 93, w, 3);

    // Top-Left & Top-Right Art-Deco Geometric Corner Tabs
    ctx.fillStyle = '#075985';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(36, 0);
    ctx.lineTo(0, 36);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 36);
    ctx.lineTo(36, 0);
    ctx.stroke();

    ctx.fillStyle = '#075985';
    ctx.beginPath();
    ctx.moveTo(w, 0);
    ctx.lineTo(w - 36, 0);
    ctx.lineTo(w, 36);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(w - 36, 0);
    ctx.lineTo(w, 36);
    ctx.stroke();

    // Top Spectacles Icon on Left (72 × 34)
    drawSpectaclesCanvas(ctx, 44, 31, 72, 34, '#075985', false);

    // Attractive Top Editorial Typography on Right
    ctx.fillStyle = '#075985';
    ctx.font = '900 22px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('— CLEAR VISION —', w - 44, 46);

    ctx.fillStyle = '#0284C7';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText('✦ BRIGHTER TOMORROW ✦', w - 44, 74);

    // Bottom Spacious Frame Cover: Clean Boutique Card with Curved Bevel (Height: 225px, starts at Y: 1695)
    ctx.beginPath();
    ctx.moveTo(0, bTop);
    ctx.quadraticCurveTo(w / 2, bTop - 10, w, bTop);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Subtle Cyan Bevel Line
    ctx.beginPath();
    ctx.moveTo(0, bTop);
    ctx.quadraticCurveTo(w / 2, bTop - 10, w, bTop);
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Bottom-Left & Bottom-Right Art-Deco Geometric Corner Tabs
    ctx.fillStyle = '#075985';
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(36, h);
    ctx.lineTo(0, h - 36);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, h - 36);
    ctx.lineTo(36, h);
    ctx.stroke();

    ctx.fillStyle = '#075985';
    ctx.beginPath();
    ctx.moveTo(w, h);
    ctx.lineTo(w - 36, h);
    ctx.lineTo(w, h - 36);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(w - 36, h);
    ctx.lineTo(w, h - 36);
    ctx.stroke();

    // Centered Aakash Eye Logo (64 × 42 with comfortable padding)
    if (logoImg && logoImg.complete) {
      ctx.drawImage(logoImg, w / 2 - 32, bTop + 19, 64, 42);
    } else {
      drawAakashEyeCanvas(ctx, w / 2, bTop + 40, 0.48, '#075985');
    }

    // Original Brand Typography Proportions
    ctx.fillStyle = '#075985';
    ctx.font = '900 33px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(SHOP_CONFIG.brandName, w / 2, bTop + 87);

    ctx.fillStyle = '#075985';
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillText(SHOP_CONFIG.brandSubtitle, w / 2, bTop + 117);

    // Tagline Pill with comfortable vertical spacing (290 × 28)
    ctx.fillStyle = '#EAF7FA';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 145, bTop + 141, 290, 28, 14);
    ctx.fill();
    ctx.strokeStyle = '#D6EAF0';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#0284C7';
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillText(`✦ ${SHOP_CONFIG.brandTagline} ✦`, w / 2, bTop + 160);

    // Spectacles Drawing on Bottom Right (72 × 34)
    drawSpectaclesCanvas(ctx, w - 120, bTop + 90, 72, 34, '#075985', true);
  }

  // ── 2. MODERN TEAL CANVAS (9:16 Instagram Story) ─────────────────────
  else if (frameId === 'modern-teal') {
    // Top Spacious White Studio Bar (height: 96px)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, 96);

    // Top-Left Sweeping Wave Ribbons
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(180, 0, 300, 58);
    ctx.quadraticCurveTo(160, 96, 0, 38);
    ctx.closePath();
    ctx.fillStyle = '#075985';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(220, 8, 340, 72);
    ctx.quadraticCurveTo(180, 96, 0, 48);
    ctx.closePath();
    ctx.fillStyle = 'rgba(2, 132, 199, 0.88)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(250, 16, 370, 86);
    ctx.quadraticCurveTo(220, 96, 0, 58);
    ctx.closePath();
    ctx.fillStyle = 'rgba(34, 166, 190, 0.95)';
    ctx.fill();

    // Center-Left Dynamic Typography
    ctx.fillStyle = '#22A6BE';
    ctx.font = '900 22px "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('SEE BETTER', 390, 46);

    ctx.fillStyle = '#075985';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText('LOOK BRIGHTER', 390, 74);

    // Right Cyan Spectacles Icon (72 × 34)
    drawSpectaclesCanvas(ctx, w - 110, 31, 72, 34, '#22A6BE', false);

    // Cyan accent divider line under top bar
    const tealGrad = ctx.createLinearGradient(0, 0, w, 0);
    tealGrad.addColorStop(0, '#22A6BE');
    tealGrad.addColorStop(0.7, '#0284C7');
    tealGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = tealGrad;
    ctx.fillRect(0, 93, w, 3);

    // Bottom Spacious Frame Cover: Asymmetric Curved Wave Cut (Height: 225px, starts at Y: 1695)
    ctx.beginPath();
    ctx.moveTo(0, bTop);
    ctx.quadraticCurveTo(w * 0.35, bTop - 15, w * 0.68, bTop + 2);
    ctx.quadraticCurveTo(w * 0.85, bTop + 10, w, bTop + 4);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, bTop);
    ctx.quadraticCurveTo(w * 0.35, bTop - 15, w * 0.68, bTop + 2);
    ctx.quadraticCurveTo(w * 0.85, bTop + 10, w, bTop + 4);
    ctx.strokeStyle = '#22A6BE';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Sweeping Wave Ribbons on Bottom Right
    ctx.beginPath();
    ctx.moveTo(w, bTop + 4);
    ctx.quadraticCurveTo(w - 170, bTop + 30, w - 230, h);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = '#22A6BE';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(w, bTop + 35);
    ctx.quadraticCurveTo(w - 140, bTop + 55, w - 180, h);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = '#0284C7';
    ctx.fill();

    // Centered Aakash Eye Logo & Brand Typography (at X = 400)
    const crestX = 400;
    if (logoImg && logoImg.complete) {
      ctx.drawImage(logoImg, crestX - 32, bTop + 19, 64, 42);
    } else {
      drawAakashEyeCanvas(ctx, crestX, bTop + 40, 0.48, '#075985');
    }

    ctx.fillStyle = '#075985';
    ctx.font = '900 33px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(SHOP_CONFIG.brandName, crestX, bTop + 87);

    ctx.fillStyle = '#075985';
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillText(SHOP_CONFIG.brandSubtitle, crestX, bTop + 117);

    // Pill Badge for Tagline
    ctx.fillStyle = 'rgba(34, 166, 190, 0.12)';
    ctx.beginPath();
    ctx.roundRect(crestX - 145, bTop + 141, 290, 28, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(34, 166, 190, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#22A6BE';
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillText(`✦ ${SHOP_CONFIG.brandTagline} ✦`, crestX, bTop + 160);
  }

  // ── 3. PREMIUM EYEWEAR CANVAS (9:16 Instagram Story) ─────────────────
  else {
    // Top Spacious Dark Midnight Gradient Header Bar (height: 96px)
    const midnightGrad = ctx.createLinearGradient(0, 0, w, 0);
    midnightGrad.addColorStop(0, '#061826');
    midnightGrad.addColorStop(0.5, '#075985');
    midnightGrad.addColorStop(1, '#061826');
    ctx.fillStyle = midnightGrad;
    ctx.fillRect(0, 0, w, 96);

    // Metallic Gold Divider line under top bar
    const goldGrad = ctx.createLinearGradient(0, 0, w, 0);
    goldGrad.addColorStop(0, '#BF953F');
    goldGrad.addColorStop(0.25, '#FCF6BA');
    goldGrad.addColorStop(0.5, '#B38728');
    goldGrad.addColorStop(0.75, '#FBF5B7');
    goldGrad.addColorStop(1, '#AA771C');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 93, w, 3);

    // Diagonal Metallic Gold Stripes on Top-Left Corner
    ctx.strokeStyle = '#F6E27A';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 32);
    ctx.lineTo(64, 0);
    ctx.stroke();

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 56);
    ctx.lineTo(112, 0);
    ctx.stroke();

    // Top Golden Spectacles Icon (72 × 34)
    drawSpectaclesCanvas(ctx, 96, 31, 72, 34, '#F6E27A', false);

    // Attractive Top Typography in White & Metallic Gold on Right
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 22px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('PREMIUM EYEWEAR', w - 44, 46);

    ctx.fillStyle = '#F6E27A';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText('✦ FOR A CLEARER YOU ✦', w - 44, 74);

    // Bottom Spacious Frame Cover: Sharp Diagonal Angle Cut over Photo (Height: 225px, starts at Y: 1695)
    ctx.beginPath();
    ctx.moveTo(0, bTop);
    ctx.lineTo(770, bTop + 25);
    ctx.lineTo(610, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Metallic Gold Diagonal Dividing Pinstripes
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, bTop);
    ctx.lineTo(770, bTop + 25);
    ctx.stroke();

    // Right Dark Midnight Obsidian Polygon Facet
    const darkFacetGrad = ctx.createLinearGradient(610, bTop + 25, w, h);
    darkFacetGrad.addColorStop(0, '#061826');
    darkFacetGrad.addColorStop(1, '#075985');
    ctx.beginPath();
    ctx.moveTo(770, bTop + 25);
    ctx.lineTo(w, bTop + 25);
    ctx.lineTo(w, h);
    ctx.lineTo(610, h);
    ctx.closePath();
    ctx.fillStyle = darkFacetGrad;
    ctx.fill();

    // Metallic Gold Diagonal Stripes on Dark Facet
    ctx.strokeStyle = '#F6E27A';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(770, bTop + 25);
    ctx.lineTo(610, h);
    ctx.stroke();

    // Gold Spectacles in Right Dark Facet (72 × 34)
    drawSpectaclesCanvas(ctx, w - 120, bTop + 90, 72, 34, '#FCF6BA', true);

    // Centered Aakash Eye Logo & Brand Typography on Left White Surface
    const crestX = 390;
    if (logoImg && logoImg.complete) {
      ctx.drawImage(logoImg, crestX - 32, bTop + 19, 64, 42);
    } else {
      drawAakashEyeCanvas(ctx, crestX, bTop + 40, 0.48, '#075985');
    }

    ctx.fillStyle = '#075985';
    ctx.font = '900 33px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(SHOP_CONFIG.brandName, crestX, bTop + 87);

    ctx.fillStyle = '#075985';
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillText(SHOP_CONFIG.brandSubtitle, crestX, bTop + 117);

    // Luxury Pill Badge with Deep Navy & Gold Tagline
    const badgeGrad = ctx.createLinearGradient(crestX - 145, 0, crestX + 145, 0);
    badgeGrad.addColorStop(0, '#061826');
    badgeGrad.addColorStop(0.5, '#075985');
    badgeGrad.addColorStop(1, '#061826');
    ctx.fillStyle = badgeGrad;
    ctx.beginPath();
    ctx.roundRect(crestX - 145, bTop + 141, 290, 28, 14);
    ctx.fill();

    ctx.fillStyle = '#FCF6BA';
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillText(`✦ ${SHOP_CONFIG.brandTagline} ✦`, crestX, bTop + 160);
  }

  ctx.restore();
}
