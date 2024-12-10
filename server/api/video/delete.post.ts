import { db, VideoSchema } from "~/server/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  await db.delete(VideoSchema).where(eq(VideoSchema.id, id));

  return true;
});
