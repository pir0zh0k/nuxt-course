import { db, VideoSchema, VideoSchemaInsert } from "~/server/db";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs/promises";

interface File {
  name: string;
  content: string;
}

async function converteVideo(
  inputPath: string,
  outputDir: string,
  fileName: string,
) {
  const qualities = [480, 720, 1080];

  return new Promise((resolve, reject) => {
    let completedConversions = 0;

    qualities.forEach((quality) => {
      const outputFilePath = path.join(
        outputDir,
        `${fileName}_${quality}.m3u8`,
      );

      ffmpeg(inputPath)
        .setFfmpegPath(ffmpegInstaller.path)
        .outputOptions([
          "" + `-vf scale=-2:${quality}`,
          "-hls_time 10",
          "-hls_list_size 0",
          "-f hls",
        ])
        .on("end", () => {
          completedConversions++;

          if (completedConversions === qualities.length) {
            resolve();
          }
        })
        .on("error", (err) => {
          reject(new Error(`Ошибка конвертации: ${err.message}`));
        })
        .save(outputFilePath);
    });
  });
}

export default defineEventHandler(async (event) => {
  const { video, poster, title, description } = await readBody<{
    video: File;
    poster: File;
    title: string;
    description: string;
  }>(event);

  const { user } = await getUserSession(event);
  const videoDir = path.join(process.cwd(), "public", "files", "video");

  const videoFileName = await storeFileLocally(video, 12, "/video");
  const posterFileName = await storeFileLocally(poster, 12, "/poster");

  try {
    const dirName = videoFileName.split(".")[0];
    const outDir = path.join(videoDir, dirName);

    await fs.mkdir(outDir, { recursive: true });

    await converteVideo(
      path.join(videoDir, videoFileName),
      outDir,
      videoFileName,
    );

    const newVideo: VideoSchemaInsert = await db
      .insert(VideoSchema)
      .values({
        title,
        description,
        posterFileName,
        videoFileName: videoDir,
        authorId: user.id,
      })
      .returning();

    return newVideo;
  } catch (error) {
    console.log(error);
    return {
      error: "Ошибка при конвертации",
    };
  }
});
