import { PrismaClient } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { Visibility } from "./mideas";
export interface ICreatePlaylist {
  name: string;
  visibility: string;
  user_id: string;
  description?: string;
}

export class DatabasePlaylist {
  readonly prisma = new PrismaClient();

  async create({ name, description, visibility, user_id }: ICreatePlaylist) {
    return await this.prisma.playlist.create({
      data: {
        name,
        description,
        visibility,
        user_id: user_id,
        id: uuidV4(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async addMidea(id: string, mideaId: string) {
    return await this.prisma.playlist.update({
      where: { id },
      data: {
        mideas: {
          connect: {
            id: mideaId,
          },
        },
      },
    });
  }
  async findById(id: string) {
    return await this.prisma.playlist.findUnique({
      where: { id },
    });
  }

  async findByAndMideas(id: string) {
    return await this.prisma.playlist.findUnique({
      where: { id },
      include: {
        mideas: {
          include: { comments: { include: { user: true } }, user: true },
        },
      },
    });
  }
  async list() {
    return await this.prisma.playlist.findMany({
      where: { visibility: Visibility.public },
      include: { mideas: true },
    });
  }

  async delete(id: string) {
    await this.prisma.playlist.delete({
      where: { id },
    });
  }

  async listByUser(id: string) {
    return await this.prisma.playlist.findMany({
      where: { user_id: id },
      include: { mideas: true },
    });
  }
}
