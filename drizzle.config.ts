import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./libs/schema.ts",       // path to your schema
    out: "./drizzle",                // where migrations will be saved
    dialect: "postgresql",                    // postgres driver
    dbCredentials: {
        url: process.env.DB!,
    },
});
