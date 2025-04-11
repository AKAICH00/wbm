"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import BasicWealthBuilderPortal from '@/components/BasicWealthBuilderPortal';

export default function HomePage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Only redirect after auth has loaded and if user is signed in
    if (isLoaded && userId) {
      router.push('/dashboard');
    }
  }, [isLoaded, userId, router]);

  // Don't render anything during the auth check to prevent flashes of content
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>;
  }
  
  // If user is not authenticated, show the landing page
  if (!userId) {
    return <BasicWealthBuilderPortal />;
  }
  
  // This will rarely be seen as the useEffect will redirect
  return <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>;
}
