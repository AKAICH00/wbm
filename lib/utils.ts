import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Added timeAgo function from Vercel template
export function timeAgo(timestamp: Date | string | number): string {
  const date = typeof timestamp === 'string' || typeof timestamp === 'number' ? new Date(timestamp) : timestamp;
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;

  for (const key in ranges) {
    if (ranges[key as keyof typeof ranges] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key as keyof typeof ranges];
      return formatter.format(Math.round(delta), key as keyof typeof ranges);
    }
  }
  return 'just now';
}
