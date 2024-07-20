import {
  DatabaseUser,
  DatabaseMidea,
  MideaType,
  Visibility,
} from "../database";
import AppError from "../errors/appError";
import getVideoDuration from "get-video-duration";
import { resolve } from "path";
import { CreateCommentDTO, CreateMideaDTO, UpdateMideaDTO } from "./dtos";

// Data Transfer Object
class MideaController {
  readonly databaseMidea = new DatabaseMidea();
  readonly databaseUser = new DatabaseUser();

  async create(data: CreateMideaDTO) {
    const time = await getVideoDuration(resolve("uploads/", `${data.url}`));
    if (!(data.type in MideaType)) {
      return new AppError("MediaType Not Allowed", 400);
    }

    if (!(data.visibility in Visibility)) {
      return new AppError("Invalid Visibility Type", 400);
    }

    const userExists = await this.databaseUser.findByID(data.user_id);

    if (!userExists) {
      return new AppError("User Not Exists", 400);
    }

    return await this.databaseMidea.create({
      ...data,
      time: time,
      type: data.type as MideaType,
      visibility: data.visibility as Visibility,
    });
  }
  async list() {
    return await this.databaseMidea.list();
  }

  async listByUser(id: string) {
    return await this.databaseMidea.listByUser(id);
  }

  async search(query: string) {
    return await this.databaseMidea.search(query);
  }

  async findByIdAndCount(id: string) {
    return await this.databaseMidea.findByIdAndCount(id);
  }

  async delete(id: string) {
    return await this.databaseMidea.delete(id);
  }

  async update(data: UpdateMideaDTO) {
    const mideaExists = await this.databaseMidea.findById(data.id);

    if (!mideaExists) {
      return new AppError("Midea Not Exists", 400);
    }
    if (data.type && !(data?.type in MideaType)) {
      return new AppError("MediaType Not Allowed", 400);
    }

    if (data.visibility && !(data.visibility in Visibility)) {
      return new AppError("Invalid Visibility Type", 400);
    }

    return await this.databaseMidea.updade({
      ...data,
      type: data.type as MideaType,
      visibility: data.visibility as Visibility,
    });
  }

  async createComment({ message, midea_id, user_id }: CreateCommentDTO) {
    const userExists = await this.databaseUser.findByID(user_id);
    const mideaExists = await this.databaseMidea.findById(midea_id);

    if (!userExists) {
      return new AppError("User Not Exists", 400);
    }

    if (!mideaExists) {
      return new AppError("Midea Not Exists", 400);
    }

    return await this.databaseMidea.createComment({
      message,
      midea_id,
      user_id,
    });
  }
}

export { MideaController };
