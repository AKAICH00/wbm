import React from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
// import { SignedIn, SignedOut } from '@clerk/nextjs'; // Removed unused imports
import { ChevronDown } from 'lucide-react'; // For scroll cue
import CanvasHouseAnimationWrapper from '@/components/CanvasHouseAnimationWrapper';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Main minimalist content area */}
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4 relative">
        
        {/* Canvas-based House Animation */}
        <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mb-8 border border-muted rounded-lg p-2">
          <CanvasHouseAnimationWrapper />
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-12">
          Build Wealth Through Strategic Real Estate
        </h1>

        {/* Subtle Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full p-4 text-center text-xs text-muted-foreground border-t border-theme">
        <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
        <span className="mx-1">|</span>
        <span>© {new Date().getFullYear()} WealthBuilder Mortgage</span>
      </footer>
    </div>
  );
}
