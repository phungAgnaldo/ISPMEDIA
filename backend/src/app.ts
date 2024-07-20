import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Queue } from "bullmq";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import cors from "cors";
import "express-async-errors";
import routes from "./routes";
import AppError from "./errors/appError";
import path from "path";
import { worker } from "./jobs/compressMideaWorker";
const app = express();
export const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/ui");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "uploads")));
app.use("/ui", serverAdapter.getRouter());
app.use(routes);

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.use(
  (err: Error, resquest: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal Error Server -${err.stack}`,
    });
  }
);

createBullBoard({
  queues: [
    new BullMQAdapter(
      new Queue("CompressMidea", {
        connection: { host: "localhost", port: 6379 },
      })
    ),
  ],
  serverAdapter,
});

worker.run();
