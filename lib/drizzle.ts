import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'

// Revert to original imports
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// Remove Neon/dotenv imports
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import { config } from "dotenv";

// Check environment variable
if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set in .env.local');
}

// Revert to original connection method using postgres-js
// Neon URLs work with postgres-js, ensure sslmode=require is included in the URL
const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

// Original Drizzle initialization
export const db = drizzle(sql);

// Keep the schema definition
export const UsersTable = pgTable(
  'profiles',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    image: text('image').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    }
  }
)

export type User = InferSelectModel<typeof UsersTable>
export type NewUser = InferInsertModel<typeof UsersTable> 
