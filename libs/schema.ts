// db/schema.ts
import {
    date,
    integer,
    pgTable,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// User table
export const user = pgTable("user", {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email"),
    profile: text("profile"),
    createdAt: timestamp("created_at").defaultNow(),
});

// File table with FK to user
export const file = pgTable("file", {
    id: serial("id").primaryKey(),
    title: text("title"),
    message: text("message"),
    fileName: text("file_message"),
    fileSize: integer("file_size"),
    expireIn: timestamp("expire_in"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    userId: integer("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});


