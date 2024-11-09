import { db, UserSchema, VideoSchema, VideoSchemaSelect } from "~/server/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event): VideoSchemaSelect[] => {
  return db
    .select()
    .from(VideoSchema)
    .leftJoin(UserSchema, eq(VideoSchema.authorId, UserSchema.id))
    .orderBy(UserSchema.id);
});
