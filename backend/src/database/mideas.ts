import { PrismaClient } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import fs from "fs";
import { resolve } from "path";
import { convertSecondsToMinutes } from "../helpers/time";
import { AddToCompressMidea } from "../jobs/compressMideaQueue";

export interface CreateMidea {
  name: string;
  authors?: string;
  album?: string;
  music_group?: string;
  description?: string;
  genre?: string;
  release_date?: Date;
  type: string;
  visibility: string;
  cover_url?: string;
  url: string;
  user_id: string;
}

export interface UpdateMidea {
  id: string;
  name?: string;
  authors?: string;
  album?: string;
  music_group?: string;
  description?: string;
  genre?: string;
  release_date?: Date;
  type?: string;
  visibility?: string;
  cover_url?: string;
  url?: string;
}

export enum Visibility {
  public = "public",
  private = "private",
}

export enum MideaType {
  video = "video",
  music = "music",
}

export interface CreateMidea {
  name: string;
  authors?: string;
  album?: string;
  music_group?: string;
  description?: string;
  genre?: string;
  release_date?: Date;
  type: string;
  visibility: string;
  cover_url?: string;
  url: string;
  user_id: string;
  time: number;
}

export interface CreateComment {
  message: string;
  user_id: string;
  midea_id: string;
}

export class DatabaseMidea {
  readonly prisma = new PrismaClient();

  async create(data: CreateMidea) {
    const time = convertSecondsToMinutes(data.time);

    const midea = await this.prisma.midea.create({
      data: {
        ...data,
        time,
        id: uuidV4(),
        created_at: new Date(),
        updated_at: new Date(),
        release_date: data.release_date
          ? new Date(data.release_date)
          : undefined,
      },
    });

    await AddToCompressMidea(midea);

    return midea;
  }

  async updade(data: UpdateMidea) {
    const midea = await this.findById(data.id);

    const mideaUpdated = await this.prisma.midea.update({
      where: { id: data.id },
      data: {
        name: data.name ? data.name : midea?.name,
        authors: data.authors ? data.authors : midea?.authors,
        cover_url: data.cover_url ? data.cover_url : midea?.cover_url,
        description: data.description ? data.description : midea?.description,
        genre: data.genre ? data.genre : midea?.genre,
        url: data.url ? data.url : midea?.url,
        type: data.type ? data.type : midea?.type,
        visibility: data.visibility ? data.visibility : midea?.visibility,
        music_group: data.music_group ? data.music_group : midea?.music_group,
        album: data.album ? data.album : midea?.album,
        updated_at: new Date(),
        release_date: data.release_date
          ? new Date(data.release_date)
          : midea?.release_date,
      },
    });

    if (midea) {
      if (data.cover_url && midea.cover_url) {
        fs.unlink(
          resolve(__dirname, "..", "..", "uploads", midea.cover_url),
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      }

      if (data.url && midea.url) {
        fs.unlink(
          resolve(__dirname, "..", "..", "uploads", midea.url),
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      }
    }

    return mideaUpdated;
  }

  async delete(id: string) {
    await this.prisma.comments.deleteMany({
      where: { midea_id: id },
    });

    const midea = await this.prisma.midea.delete({
      where: { id },
    });

    fs.unlink(midea.url, (err) => {
      fs.unlink(resolve(__dirname, "..", "..", "uploads", midea.url), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });

    if (midea.cover_url) {
      fs.unlink(
        resolve(__dirname, "..", "..", "uploads", midea.cover_url),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
    }
  }

  async list() {
    return await this.prisma.midea.findMany({
      where: { visibility: Visibility.public },
      include: { user: true },
    });
  }

  async listByUser(id: string) {
    return await this.prisma.midea.findMany({
      where: {
        user_id: id,
        visibility: Visibility.public,
      },
      include: { user: true },
    });
  }

  async search(query: string) {
    const mideas = await this.prisma.midea.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
        visibility: Visibility.public,
      },
      include: {
        user: true,
      },
    });

    const users = await this.prisma.user.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      include: { midea: { where: { visibility: Visibility.public } } },
    });

    const playlists = await this.prisma.playlist.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
        visibility: Visibility.public,
      },
      include: { mideas: true },
    });

    return { mideas, users, playlists };
  }

  async findById(id: string) {
    return await this.prisma.midea.findFirst({
      where: { id },
    });
  }

  async findByIdAndCount(id: string) {
    const midea = await this.prisma.midea.findFirst({
      where: { id },
      include: { user: true, comments: { include: { user: true } } },
      orderBy: { comments: { _count: "asc" } },
    });

    const count = await this.prisma.midea.count({
      where: { user_id: midea?.user.id },
    });

    return { midea, count };
  }

  async createComment(data: CreateComment) {
    return await this.prisma.comments.create({
      data: {
        id: uuidV4(),
        message: data.message,
        midea_id: data.midea_id,
        user_id: data.user_id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }
}
