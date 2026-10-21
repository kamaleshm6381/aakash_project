'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SHOP_CONFIG } from '@/config/shop';

interface StartPhotoboothButtonProps {
  onStart?: () => void;
}

export default function StartPhotoboothButton({ onStart }: StartPhotoboothButtonProps) {
  const [pressed, setPressed] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 300);
    if (onStart) {
      onStart();
    } else {
      router.push('/camera');
    }
  };

  return (
    <Button
      id="start-photobooth-btn"
      onClick={handleClick}
      aria-label="Start Virtual Photobooth — tap to begin"
      size="lg"
      className={cn(
        // Layout & shape
        'w-full h-14 rounded-full gap-2.5 text-base font-bold tracking-tight cursor-pointer',
        // VisionCraft brand gradient: #075985 -> #0284C7 -> #22A6BE
        'bg-gradient-to-r from-[#075985] via-[#0284C7] to-[#22A6BE]',
        'text-white border-transparent',
        // Glow shadow
        'shadow-[0_6px_22px_rgba(7,89,133,0.35)]',
        // Hover / active
        'hover:brightness-105 hover:-translate-y-px hover:shadow-[0_8px_26px_rgba(2,132,199,0.4)]',
        'active:translate-y-px active:scale-[0.98] active:shadow-[0_2px_8px_rgba(7,89,133,0.3)]',
        // Transitions
        'transition-all duration-150',
        pressed && 'scale-[0.98] translate-y-px'
      )}
    >
      <Camera
        className="size-5 shrink-0 text-white"
        aria-hidden="true"
        strokeWidth={2.4}
      />
      <span>{SHOP_CONFIG.landing.primaryButton}</span>
    </Button>
  );
}
