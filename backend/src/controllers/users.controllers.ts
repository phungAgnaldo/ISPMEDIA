import { DatabaseUser } from "../database";
import AppError from "../errors/appError";
import { CreateUserDTO, LoginUserDTO } from "./dtos";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../config/auth";

class UserControllers {
  readonly databaseUser = new DatabaseUser();

  async create({
    email,
    confirmationPassword,
    name,
    password,
    avatarUrl,
    description,
  }: CreateUserDTO) {
    if (password != confirmationPassword) {
      return new AppError("Password Does Not Match", 400);
    }

    const userExists = await this.databaseUser.findByEmail(email);

    if (userExists) {
      return new AppError("User Already Exists", 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.databaseUser.create({
      email,
      name,
      password: hashedPassword,
      avatarUrl,
      description,
    });

    const token = sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      config.secret_token,
      {
        subject: user.id,
        expiresIn: config.expires_in_token,
      }
    );

    return { token };
  }

  async login({ email, password }: LoginUserDTO) {
    const userExists = await this.databaseUser.findByEmail(email);

    if (!userExists) {
      return new AppError("Email or Password Incorret", 400);
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      return new AppError("Email or Password Incorret", 400);
    }

    const token = sign(
      {
        name: userExists.name,
        avatarUrl: userExists.avatarUrl,
      },
      config.secret_token,
      {
        subject: userExists.id,
        expiresIn: config.expires_in_token,
      }
    );

    return { token };
  }

  async findById(id: string) {
    return await this.databaseUser.findByID(id);
  }
}

export { UserControllers };
