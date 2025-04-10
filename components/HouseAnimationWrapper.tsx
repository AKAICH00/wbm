"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with no SSR - this is allowed in a client component
const HouseAnimation = dynamic(() => import('@/components/HouseAnimation'), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center">Loading...</div>
});

export default function HouseAnimationWrapper() {
  return (
    <div className="w-full h-full">
      <HouseAnimation />
    </div>
  );
} 