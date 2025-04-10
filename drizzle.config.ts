import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv'

// Explicitly load .env.local before defineConfig reads process.env
config({ path: '.env.local' });

// Check if POSTGRES_URL is loaded
if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL not found in .env.local. Check the file path and variable name.');
}

export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'postgresql'
  schema: './lib/drizzle.ts', // Path to your schema file
  out: './drizzle', // Directory for migrations (optional for push)
  dbCredentials: {
    // Now process.env.POSTGRES_URL should be available
    url: process.env.POSTGRES_URL,
  },
  // Recommended for Drizzle Studio
  verbose: true,
  strict: true,
}) 