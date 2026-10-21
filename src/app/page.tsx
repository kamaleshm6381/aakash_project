'use client';

import { useRouter } from 'next/navigation';
import { Glasses, Camera, Download, ShieldCheck, Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import StartPhotoboothButton from '@/components/StartPhotoboothButton';
import VisionCraftLogo from '@/components/VisionCraftLogo';
import { SHOP_CONFIG } from '@/config/shop';

// ── Step Icons Map ────────────────────────────────────────────
const STEP_ICONS = [Glasses, Eye, Camera, Download];

// ── HeroVisual (Optical Store Spectacles Graphic) ─────────────
function HeroVisual() {
  return (
    <div
      className="mx-5 rounded-[22px] overflow-hidden relative aspect-[4/3] shadow-[0_8px_24px_rgba(7,89,133,0.18)] border border-[#D6EAF0]"
      style={{
        background: 'linear-gradient(135deg, #075985 0%, #0284C7 50%, #22A6BE 100%)',
      }}
      role="img"
      aria-label="VisionCraft Opticals virtual eyewear photobooth illustration"
    >
      {/* Decorative optical lens focus rings */}
      {[
        'w-[220px] h-[220px] -top-[60px] -right-[60px] border-white/[.15]',
        'w-[150px] h-[150px] -bottom-6 -left-8 border-white/[.12]',
        'w-24 h-24 top-6 left-8 border-white/[.18]',
      ].map((cls, i) => (
        <div
          key={i}
          className={cn('absolute rounded-full border-[1.5px]', cls)}
          aria-hidden="true"
        />
      ))}

      {/* Teal / Cyan shimmer light bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] opacity-80"
        style={{
          background: 'linear-gradient(90deg, transparent, #22A6BE, #38bdf8, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Central Spectacles & Lens Focus Graphic */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3"
        aria-hidden="true"
      >
        <div
          className="w-[140px] h-[92px] border-[2.5px] border-white/95 rounded-[16px] relative flex items-center justify-center bg-white/10 backdrop-blur-xs shadow-inner"
          style={{ animation: 'pulse-frame 3s ease-in-out infinite' }}
        >
          {/* Cyan precision corner brackets */}
          <span className="absolute -top-[3px] -left-[3px] w-3.5 h-3.5 border-t-2 border-l-2 border-[#22A6BE]" />
          <span className="absolute -bottom-[3px] -right-[3px] w-3.5 h-3.5 border-b-2 border-r-2 border-[#22A6BE]" />
          <span className="absolute -top-[3px] -right-[3px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#22A6BE]" />
          <span className="absolute -bottom-[3px] -left-[3px] w-3.5 h-3.5 border-b-2 border-l-2 border-[#22A6BE]" />

          {/* Spectacles Eyewear Icon */}
          <Glasses className="size-11 text-white drop-shadow-md animate-bounce duration-1000" strokeWidth={1.8} />
        </div>

        <p className="text-white/90 text-xs font-bold tracking-[0.14em] uppercase drop-shadow-xs">
          Clear Vision • Signature Style
        </p>
      </div>

      {/* Floating "Virtual Booth Ready" badge */}
      <Badge
        className="absolute top-3.5 left-3.5 bg-white/95 text-[#075985] border-0 shadow-[0_2px_10px_rgba(7,89,133,0.2)] gap-1.5 text-[0.72rem] font-bold"
        aria-hidden="true"
      >
        <span className="size-[7px] rounded-full bg-[#22A6BE] shadow-[0_0_0_2px_rgba(34,166,190,0.3)] shrink-0 inline-block animate-pulse" />
        Eyewear Photobooth Ready
      </Badge>
    </div>
  );
}

// ── StepItem ──────────────────────────────────────────────────
function StepItem({
  num,
  icon: Icon,
  title,
  desc,
  isLast,
}: {
  num: number;
  icon: React.ElementType;
  title: string;
  desc: string;
  isLast: boolean;
}) {
  return (
    <>
      <li className="flex items-start gap-3.5 py-2.5">
        {/* Step number badge circle */}
        <div className="flex flex-col items-center shrink-0">
          <div
            className="size-9 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 border-[1.5px] bg-[#EAF7FA] text-[#075985] border-[#D6EAF0] shadow-2xs"
            aria-label={`Step ${num}`}
          >
            {num}
          </div>
        </div>

        {/* Step details */}
        <div className="pt-0.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Icon
              className="size-4 shrink-0 text-[#0284C7]"
              aria-hidden="true"
              strokeWidth={2.2}
            />
            <p className="text-[0.92rem] font-bold text-[#172B3A] tracking-tight">
              {title}
            </p>
          </div>
          <p className="text-[0.8rem] text-[#5B788E] leading-snug">{desc}</p>
        </div>
      </li>

      {!isLast && (
        <Separator
          className="ml-[1.125rem] w-px h-4 bg-gradient-to-b from-[#22A6BE]/40 to-transparent self-start data-horizontal:hidden"
          orientation="vertical"
          aria-hidden="true"
        />
      )}
    </>
  );
}

// ── HomePage ──────────────────────────────────────────────────
export default function HomePage() {
  const router = useRouter();

  return (
    <div className="page-shell">
      <div className="mobile-card">
        {/* ── Header ──────────────────────────────────── */}
        <header className="flex items-center justify-between px-5 pt-5 pb-3 bg-white">
          <VisionCraftLogo size="md" />
          <Badge
            variant="outline"
            className="bg-[#EAF7FA] text-[#075985] border-[#D6EAF0] text-[10px] font-bold px-2 py-0.5 rounded-full"
          >
            In-Store
          </Badge>
        </header>

        {/* ── Hero copy ───────────────────────────────── */}
        <section className="px-5 pb-4 flex flex-col gap-2" aria-labelledby="hero-title">
          {/* Eyebrow badge */}
          <Badge
            variant="secondary"
            className="w-fit gap-1.5 text-[0.68rem] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full h-auto bg-[#EAF7FA] text-[#075985] border border-[#D6EAF0]"
          >
            <Sparkles className="size-3 text-[#22A6BE]" aria-hidden="true" strokeWidth={2.5} />
            Spectacles &amp; Eyewear Boutique
          </Badge>

          {/* Heading */}
          <h1
            id="hero-title"
            className="text-[clamp(1.9rem,6.5vw,2.3rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#172B3A] m-0"
          >
            {SHOP_CONFIG.landing.heading.split('Your')[0]}
            <span
              style={{
                background: 'linear-gradient(110deg, #075985 0%, #0284C7 50%, #22A6BE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Your Perfect Look
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[0.92rem] leading-[1.5] text-[#5B788E] m-0">
            {SHOP_CONFIG.landing.subtitle}
          </p>
        </section>

        {/* ── Hero visual ─────────────────────────────── */}
        <HeroVisual />

        {/* ── Primary CTA Button ──────────────────────── */}
        <section className="px-5 pt-5 pb-3" aria-label="Get started">
          <StartPhotoboothButton onStart={() => router.push('/camera')} />
        </section>

        {/* ── Instructions Steps (Card) ───────────────── */}
        <section className="px-5" aria-labelledby="steps-heading">
          <Card className="rounded-[22px] border border-[#D6EAF0] shadow-xs bg-white">
            <CardHeader className="pb-1 pt-4">
              <CardTitle
                id="steps-heading"
                className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[#0284C7] flex items-center gap-1.5"
              >
                <Glasses className="size-3.5 text-[#22A6BE]" />
                {SHOP_CONFIG.landing.instructionsHeading}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-1 pb-3">
              <ol className="flex flex-col">
                {SHOP_CONFIG.landing.steps.map((step, i) => (
                  <StepItem
                    key={step.num}
                    num={step.num}
                    icon={STEP_ICONS[i] || Camera}
                    title={step.title}
                    desc={step.desc}
                    isLast={i === SHOP_CONFIG.landing.steps.length - 1}
                  />
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* ── Privacy Note Pill (Responsive, never clips text) ── */}
        <div className="flex justify-center px-4 pt-3 pb-1">
          <div
            className="w-full max-w-[360px] rounded-2xl px-4 py-2.5 text-xs font-semibold leading-relaxed bg-[#EAF7FA] text-[#075985] border border-[#D6EAF0] shadow-2xs flex items-center justify-center gap-2 text-center"
            role="note"
          >
            <ShieldCheck
              className="size-4 shrink-0 text-[#22A6BE]"
              aria-hidden="true"
              strokeWidth={2.4}
            />
            <span className="leading-snug">
              {SHOP_CONFIG.landing.privacyMessage}
            </span>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────── */}
        <footer className="mt-auto pt-4 pb-4 px-4 text-center border-t border-[#D6EAF0] mt-4">
          <p className="text-[0.76rem] text-[#8AA0B2] m-0">
            © 2026{' '}
            <span className="text-[#075985] font-bold">{SHOP_CONFIG.brandName}</span>
            {' '}• Virtual Photobooth
          </p>
        </footer>
      </div>
    </div>
  );
}
