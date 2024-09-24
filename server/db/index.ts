import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres("postgres://root:root@localhost:5432/nuxt-course");
export const db = drizzle(queryClient);

export * from "./schemas/user.schema";
