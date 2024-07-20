import { config } from "../../config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { DatabaseUser } from "../../database";
import AppError from "../../errors/appError";

interface IVerifyOptions {
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 403);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id} = verify(
      token,
      config.secret_token
    ) as IVerifyOptions;
    const userDatabase = new DatabaseUser();

    const user = await userDatabase.findByID(user_id);

    if (!user) {
      throw new AppError("User does not exists", 404);
    }

    request.user = {
      id: user.id,
      name : user.name,
      avatarUrl : user.avatarUrl
    };
    next();
  } catch (error) {
    throw new AppError("Invalid token", 400);
  }
}

export default ensureAuthenticated;
