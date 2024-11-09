import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { UserSchema } from "./user.schema";

export const VideoSchema = pgTable("video", {
  id: serial("id").primaryKey(),
  title: varchar("title"),
  description: varchar("description"),
  posterFileName: varchar("poster_file_name"),
  videoFileName: varchar("video_file_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  authorId: integer("author_id"),
});

export const videoRelations = relations(VideoSchema, ({ one }) => ({
  author: one(UserSchema, {
    fields: [VideoSchema.authorId],
    references: [UserSchema.id],
  }),
}));

export type VideoSchemaSelect = typeof VideoSchema.$inferSelect;
export type VideoSchemaInsert = typeof VideoSchema.$inferInsert;
