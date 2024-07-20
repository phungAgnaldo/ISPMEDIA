import { cookies } from "next/headers";
import Register from "./register/page";
import Home from "./home/page";
import { getUser } from "@/contexts/auth";

export default async function Page() {
  const isAuthenticated = cookies().has("token");

  return (
    <>{isAuthenticated ? <Home userId={getUser().sub} /> : <Register />}</>
  );
}
