"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with no SSR
const CanvasHouseAnimation = dynamic(() => import('@/components/CanvasHouseAnimation'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center">Loading sketch...</div>
});

export default function CanvasHouseAnimationWrapper() {
  return (
    <div className="w-full h-full">
      <CanvasHouseAnimation />
    </div>
  );
} 