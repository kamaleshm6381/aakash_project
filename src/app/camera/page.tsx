'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CameraScreen from '@/components/CameraScreen';
import { FrameId } from '@/config/shop';

function CameraContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const frameParam = searchParams?.get('frame') as FrameId | null;
  const initialFrame: FrameId =
    frameParam === 'classic-vision' || frameParam === 'modern-teal' || frameParam === 'premium-eyewear'
      ? frameParam
      : 'classic-vision';

  return (
    <CameraScreen
      initialFrameId={initialFrame}
      onBack={() => {
        router.push('/');
      }}
      onContinue={() => {
        router.push('/frame');
      }}
    />
  );
}

export default function CameraPage() {
  return (
    <Suspense
      fallback={
        <div className="page-shell flex items-center justify-center min-h-screen text-[#075985]">
          Loading Camera...
        </div>
      }
    >
      <CameraContent />
    </Suspense>
  );
}
