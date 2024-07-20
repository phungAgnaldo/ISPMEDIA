import { PrismaClient } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  description?: string;
}

export class DatabaseUser {
  readonly prisma = new PrismaClient();

  async create({ email, name, password, avatarUrl, description }: ICreateUser) {
    return await this.prisma.user.create({
      data: {
        email,
        name,
        password,
        avatarUrl,
        description,
        id: uuidV4(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email: email } });
    return user;
  }

  async findByID(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { midea: true, playlists: { include: { mideas: true } } },
    });
  }
}
