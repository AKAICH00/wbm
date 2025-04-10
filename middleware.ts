import { clerkMiddleware } from "@clerk/nextjs/server";

// Simple export with minimal configuration
export default clerkMiddleware();

export const config = {
  matcher: [
    // Match all paths except static assets and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 