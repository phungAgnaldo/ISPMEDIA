import { getUser } from "@/contexts/auth";
import { api } from "@/lib/api";
import { LayoutGrid, ListVideo, LogOut, ThumbsUp, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "./footer";

export function SideBar() {
  const user = getUser();

  return (
    <aside className="flex flex-col w-64 p-6">
      <section className="flex flex-col items-center space-y-3">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="Profile Avatar"
            width={100}
            height={32}
            className="bg-cover object-contain"
          />
        </Link>

        <figure className="w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={`${api.getUri()}/${user.avatarUrl}`}
            alt="Profile Avatar"
            width={150}
            height={32}
            className="bg-cover object-contain"
          />
        </figure>
        <span>{user.name}</span>
        <p>Meu Canal</p>
      </section>

      <nav className="mt-8">
        <Link className="flex items-center gap-6 m-4" href={`/`}>
          <LayoutGrid />
          Home
        </Link>

        <Link className="flex items-center gap-6 m-4" href={`/playlists`}>
          <ListVideo />
          Playlists
        </Link>

        <Link
          className="flex items-center gap-6 m-4"
          href={`/profile/${user.sub}`}
        >
          <User />
          Perfil
        </Link>
      </nav>

      <Footer />
    </aside>
  );
}
