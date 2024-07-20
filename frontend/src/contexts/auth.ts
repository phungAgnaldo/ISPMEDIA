import { cookies } from "next/headers";
import decode from "jwt-decode";

export interface UserPayload {
  sub: string;
  name: string;
  avatarUrl: string;
}

export function getUser(): UserPayload {
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Unauthenticated.");
  }

  const user: UserPayload = decode(token);

  return user;
}
