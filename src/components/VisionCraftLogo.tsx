'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { SHOP_CONFIG } from '@/config/shop';

interface VisionCraftLogoProps {
  className?: string;
  iconClassName?: string;
  showText?: boolean;
  lightText?: boolean;
  size?: 'sm' | 'md' | 'lg' | number;
  tagline?: string;
}

export function EyeIcon({
  className,
  alt = 'Aakash Eye Clinic & Optical Logo',
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/aakash-eye-logo.png"
      alt={alt}
      className={cn('shrink-0 object-contain select-none pointer-events-none', className)}
    />
  );
}

/**
 * Clean Line-Art Spectacles Icon used in the 3 frames
 */
export function SpectaclesIcon({
  className,
  color = '#075985',
  showTemples = true,
}: {
  className?: string;
  color?: string;
  showTemples?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-label="Spectacles Icon"
      role="img"
    >
      {/* Left Lens */}
      <rect
        x="12"
        y="12"
        width="32"
        height="26"
        rx="8"
        stroke={color}
        strokeWidth="3.2"
      />
      {/* Right Lens */}
      <rect
        x="56"
        y="12"
        width="32"
        height="26"
        rx="8"
        stroke={color}
        strokeWidth="3.2"
      />
      {/* Center Nose Bridge */}
      <path
        d="M 44 20 Q 50 16 56 20"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Left Temple Lug */}
      <line
        x1="12"
        y1="18"
        x2="4"
        y2="18"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Right Temple Lug */}
      <line
        x1="88"
        y1="18"
        x2="96"
        y2="18"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Optional Angled Temples */}
      {showTemples && (
        <>
          <path
            d="M 4 18 Q 1 18 1 24 L 2 34"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 96 18 Q 99 18 99 24 L 98 34"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
        </>
      )}
    </svg>
  );
}

export default function VisionCraftLogo({
  className,
  iconClassName,
  showText = true,
  lightText = false,
  size = 'md',
  tagline,
}: VisionCraftLogoProps) {
  const sizeMap = {
    sm: 'w-8 h-5',
    md: 'w-10 h-6',
    lg: 'w-14 h-8',
  };

  const iconSizeClass = typeof size === 'number' ? `w-[${size}px]` : sizeMap[size];

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className={cn('relative flex items-center justify-center shrink-0', iconSizeClass, iconClassName)}>
        <EyeIcon className="w-full h-full" />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          {/* Brand Name */}
          <span
            className={cn(
              'font-black tracking-tight leading-none text-base sm:text-lg',
              lightText ? 'text-white' : 'text-[#075985]'
            )}
          >
            {SHOP_CONFIG.brandName}
          </span>
          {/* Subtitle */}
          <span
            className={cn(
              'text-[8.5px] sm:text-[9.5px] font-bold tracking-tight leading-none mt-0.5',
              lightText ? 'text-[#D6EAF0]' : 'text-[#075985]'
            )}
          >
            {SHOP_CONFIG.brandSubtitle}
          </span>
          {/* Tagline */}
          <span
            className={cn(
              'text-[6.5px] sm:text-[7.5px] font-semibold tracking-[0.18em] uppercase mt-0.5',
              lightText ? 'text-[#22A6BE]' : 'text-[#0284C7]'
            )}
          >
            {tagline || SHOP_CONFIG.brandTagline}
          </span>
        </div>
      )}
    </div>
  );
}
