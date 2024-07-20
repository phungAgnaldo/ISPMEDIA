import { Router } from "express";
import fs from "fs";
import { resolve } from "path";
import { progress_middleware } from "./middlewares";
import uploadConfig from "../config/upload";
import multer from "multer";

import { MideaController } from "../controllers/mideas.controllers";
import AppError from "../errors/appError";
import { destructureObject } from "../helpers";

const mideaController = new MideaController();

const uploadAvatar = multer(uploadConfig("./uploads"));

const router = Router();
router.post(
  "/:id",
  progress_middleware,
  uploadAvatar.fields([
    { name: "url", maxCount: 1 },
    { name: "cover_url", maxCount: 1 },
  ]),
  async (request, response) => {
    const {
      name,
      authors,
      album,
      music_group,
      description,
      genre,
      release_date,
      type,
      visibility,
    } = request.body;

    const { id } = request.params;

    const fields = request.files;

    const images = destructureObject(fields);

    if (!fields?.length == !2) {
      throw new AppError("Error on Upload File,Please, Try Again", 400);
    }

    await mideaController.create({
      name,
      authors,
      album,
      music_group,
      url: images.url.filename,
      cover_url: images.cover_url.filename,
      description,
      genre,
      release_date,
      type,
      visibility,
      user_id: id,
    });

    return response.status(200).send("Midea uploaded");
  },

  router.put(
    "/:id",
    progress_middleware,
    uploadAvatar.fields([
      { name: "url", maxCount: 1 },
      { name: "cover_url", maxCount: 1 },
    ]),
    async (request, response) => {
      const {
        name,
        authors,
        album,
        music_group,
        description,
        genre,
        release_date,
        type,
        visibility,
      } = request.body;

      const { id } = request.params;

      const fields = request.files;
      let images = null;

      try {
        if (fields) {
          images = destructureObject(fields);
        }
      } catch (error) {}

      await mideaController.update({
        name,
        authors,
        album,
        music_group,
        url: images?.url.filename,
        cover_url: images?.cover_url.filename,
        description,
        genre,
        release_date,
        type,
        visibility,
        id,
      });

      return response.status(200).send("Midea Updated");
    }
  ),

  router.get("/", async (request, response) => {
    return response.json(await mideaController.list());
  }),

  router.get("/by/:id", async (request, response) => {
    const { id } = request.params;
    return response.json(await mideaController.listByUser(id));
  }),

  router.get("/search", async (request, response) => {
    const { query } = request.query;

    const queryDecoded = decodeURIComponent(query as string);

    if (!queryDecoded) {
      return;
    }

    return response.json(await mideaController.search(queryDecoded));
  }),

  router.get("/:id", async (request, response) => {
    const { id } = request.params;

    const { count, midea } = await mideaController.findByIdAndCount(id);
    return response.json({ ...midea, count });
  }),

  router.delete("/:id", async (request, response) => {
    const { id } = request.params;
    await mideaController.delete(id);
    return response.send();
  }),

  router.get("/stream/:id", async function (request, response) {
    const { id } = request.params;

    const { midea } = await mideaController.findByIdAndCount(id);
    const path = resolve("uploads/", `${midea?.url}`);

    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = request.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      response.writeHead(206, head);
      file.pipe(response);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      response.writeHead(200, head);
      fs.createReadStream(path).pipe(response);
    }
  }),

  router.post("/:id/comment", async (request, response) => {
    const { message, user_id } = request.body;

    const { id } = request.params;

    await mideaController.createComment({
      midea_id: id,
      message,
      user_id,
    });

    return response.status(200).send();
  })
);

export default router;
