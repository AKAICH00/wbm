import { clerkMiddleware } from "@clerk/nextjs/server";

// Middleware that enforces auth with better configuration for large headers
export default clerkMiddleware({
  debug: true, // Enable debug mode to see more info in console
  // If other options are needed, they can be added here
});

// Export a more specific matcher configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - Static assets and Next.js system files
     * - Public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}; 