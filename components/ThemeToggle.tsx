"use client";

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-gray-800" />
      ) : (
        <Sun size={20} className="text-gray-200" />
      )}
    </button>
  );
} 