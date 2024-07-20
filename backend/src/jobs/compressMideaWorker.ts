import { Worker } from "bullmq";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import { resolve, extname } from "path";
import fs from "fs/promises";
ffmpeg.setFfmpegPath(ffmpegPath.path);

export const worker = new Worker(
  "CompressMidea",
  async (job) => {
    const promise = await new Promise((resolv, reject) => {
      ffmpeg(resolve("uploads/", `${job.data.midea.url}`))
        .videoCodec("libx264")
        .audioCodec("aac")
        .outputOptions(["-crf 22", "-preset slow"])
        .save(
          resolve("uploads/", `temp${job.id}${extname(job.data.midea.url)}`)
        )
        .on("end", async () => {
          await fs.unlink(`${resolve("uploads", job.data.midea.url)}`);
          await fs.rename(
            `${resolve(
              "uploads",
              `temp${job.id}${extname(job.data.midea.url)}`
            )}`,
            `${resolve("uploads", job.data.midea.url)}`
          );
          resolv(() => {
            return "File compressed successfully";
          });
        })
        .on("error", (err) => {
          reject(() => {
            return "File compresse Error";
          });
        });
    });
    return promise;
  },
  {
    connection: { host: "localhost", port: 6379 },
    autorun: true,
  }
);

worker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
  console.log(`has failed with ${err.message}`);
});
