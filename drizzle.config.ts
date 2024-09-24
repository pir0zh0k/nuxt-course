import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: ["./server/db/schemas/*.schema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://root:root@localhost:5432/nuxt-course",
  },
});
