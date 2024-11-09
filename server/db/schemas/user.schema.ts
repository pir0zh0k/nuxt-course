import { boolean, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { VideoSchema } from "./video.schema";

export const UserSchema = pgTable("user", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).unique(),
  passwordHash: varchar("password_hash"),
  isAdmin: boolean("is_admin").default(false),
});

export const userRelations = relations(UserSchema, ({ many }) => ({
  video: many(VideoSchema),
}));

export type UserSchemaSelect = typeof UserSchema.$inferSelect;
export type UserSchemaInsert = typeof UserSchema.$inferInsert;
