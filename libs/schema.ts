// db/schema.ts
import {
    date,
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

// User table
export const user = pgTable("user", {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkId: text("clerk_id").notNull(),
    name: text("name"),
    email: text("email"),
    profile: text("profile"),
    createdAt: timestamp("created_at").defaultNow(),
});
// File table with FK to user
export const file = pgTable("file", {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text("title"),
    message: text("message"),
    fileUrl: text("file_url"),
    fileName: text("file_name"),
    fileSize: integer("file_size"),
    expireIn: timestamp("expire_in"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
});
export const feedback = pgTable("feedback", {
    id: uuid("id").defaultRandom().primaryKey(),
    feedBackMessage: text("feed_back_message"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" })
})
