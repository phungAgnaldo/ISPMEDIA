import { Midea } from "@prisma/client";
import { Queue, Processor } from "bullmq";
import { worker } from "./compressMideaWorker";

export const queue = new Queue("CompressMidea", {
  defaultJobOptions: {
    priority: 0,
  },
  connection: { host: "localhost", port: 6379 },
});

export async function AddToCompressMidea(midea: Midea) {
  await queue.add("midea", { midea: midea }, {});
  worker.run();
}
