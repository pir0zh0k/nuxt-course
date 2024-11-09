import { db, VideoSchema, VideoSchemaInsert } from "~/server/db";

interface File {
  name: string;
  content: string;
}

export default defineEventHandler(async (event) => {
  const { video, poster, title, description } = await readBody<{
    video: File;
    poster: File;
    title: string;
    description: string;
  }>(event);

  const { user } = await getUserSession(event);

  const videoFileName = await storeFileLocally(video, 12, "/video");
  const posterFileName = await storeFileLocally(poster, 12, "/poster");

  const newVideo: VideoSchemaInsert = await db
    .insert(VideoSchema)
    .values({
      title,
      description,
      videoFileName,
      posterFileName,
      authorId: user.id,
    })
    .returning();

  return newVideo;
});
