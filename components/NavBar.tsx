"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth, UserButton } from '@clerk/nextjs';
import ThemeToggle from './ThemeToggle';

export default function NavBar() {
  const { isSignedIn, isLoaded } = useAuth();
  
  return (
    <nav className="border-b border-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                Wealth Builder Mortgage Educators
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/"
                className="border-transparent hover:border-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                href="/pricing"
                className="border-transparent hover:border-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Pricing
              </Link>
              
              {isLoaded && isSignedIn && (
                <>
                  <Link 
                    href="/dashboard"
                    className="border-transparent hover:border-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/community"
                    className="border-transparent hover:border-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Community
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
            {/* Theme Toggle Button */}
            <ThemeToggle />
            
            {isLoaded && isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/sign-in"
                  className="hover:text-primary-foreground hover:bg-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  href="/sign-up"
                  className="bg-primary text-primary-foreground hover:bg-foreground hover:text-background px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 