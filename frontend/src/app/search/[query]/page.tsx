import { Mideas } from "@/app/home/page";
import { Playlists } from "@/app/playlists/page";
import { Community } from "@/components/community";
import { FilterSearch } from "@/components/filterSearch";
import { Header } from "@/components/header";
import { getUser } from "@/contexts/auth";
import { User } from "@/contexts/profile";
import { api } from "@/lib/api";
import { ListVideo } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Params {
  params: {
    query: string;
  };
}

export default async function Search({ params: { query } }: Params) {
  const response = await api.get("/mideas/search", {
    params: {
      query,
    },
  });

  const { mideas, users, playlists } = response.data;

  const mideasFetched: Mideas[] = mideas;

  const usersFetched: User[] = users;

  const playlistFetched: Playlists[] = playlists;

  return (
    <>
      <Header userId={getUser().sub} />

      <div className="flex mt-6">
        <section className="flex-1">
          <FilterSearch />
          <div className="border-b my-4"></div>
          {usersFetched.length === 0 ? (
            <div className="flex flex-1 items-center justify-center p-16">
              <p className="w-[360px] text-center leading-relaxed">
                Nenhum usuário encontrado
              </p>
            </div>
          ) : (
            <></>
          )}
          {usersFetched.map((user) => {
            return (
              <div className="flex" key={user.id}>
                <div className="w-[140]">
                  <figure className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={`${api.getUri()}/${user.avatarUrl}`}
                      alt="Profile Avatar"
                      width={150}
                      height={32}
                      className="bg-cover object-contain"
                    />
                  </figure>
                </div>

                <div className="mx-12">
                  <Link
                    href={`/profile/${user.id}`}
                    className="font-light	text-sm"
                  >
                    {user.name}
                  </Link>
                  <p>{user.midea.length} Mideas</p>
                  <p>{user.description}</p>
                </div>
              </div>
            );
          })}

          <div className="border-b my-4"></div>
          <div className="my-2">Resultados</div>

          <div className="flex flex-col gap-6 content-around">
            {mideasFetched.length === 0 ? (
              <div className="flex flex-1 items-center justify-center p-16">
                <p className="w-[360px] text-center leading-relaxed">
                  Nenhum mídea encontrado
                </p>
              </div>
            ) : (
              <></>
            )}
            {mideasFetched.map((midea) => {
              return (
                <div key={midea.id} className="flex space-x-8">
                  <Link href={`/midea/${midea.id}`}>
                    <div className={`w-64 h-32 relative overflow-hidden`}>
                      <Image
                        src={`${api.getUri()}/${midea.cover_url}`}
                        alt=""
                        fill
                      />
                      <span className="bg-zinc-800 m-2 absolute bottom-0 left-0">
                        {midea.time}
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-col space-y-4">
                    <span className="font-bold mt-1">{midea.name}</span>
                    <span className="font-normal mt-1">
                      {midea.description}
                    </span>
                    <Link
                      href={`/profile/${midea.user.id}`}
                      className="font-light	text-sm"
                    >
                      {midea.user.name}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-b my-4"></div>
          <div className="my-2">Playlists</div>

          <div className="flex flex-col gap-6 content-around">
            {playlistFetched.length === 0 ? (
              <div className="flex flex-1 items-center justify-center p-16">
                <p className="w-[360px] text-center leading-relaxed">
                  Nenhuma playlist encontrada
                </p>
              </div>
            ) : (
              <></>
            )}
            {playlistFetched.map((playlist) => {
              return (
                <div key={playlist.id} className="flex space-x-8">
                  <div
                    className={`h-32 w-64 relative overflow-hidden bg-white`}
                  >
                    <Link href={`/playlists/${playlist.id}`}>
                      <Image
                        src={
                          playlist.mideas.length === 0
                            ? `/playlist.png`
                            : `${api.getUri()}/${playlist.mideas[0].cover_url}`
                        }
                        alt=""
                        fill
                      />
                      <div className="flex bg-zinc-800 m-2 absolute bottom-0 left-0">
                        <ListVideo />
                        <span className="text-white ml-1">
                          {" "}
                          {playlist.mideas.length}
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="flex flex-col flex-1 place-content-between">
                    <p className="font-normal mt-1">{playlist.name}</p>
                    <p className="font-normal mt-1">{playlist.description}</p>

                    <Link href={`/playlists/${playlist.id}`}>
                      VER PLAYLIST COMPLETA
                    </Link>

                    <p className="font-light text-sm	mt-1">{`${new Date(
                      playlist.created_at
                    ).toDateString()}`}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <Community />
      </div>
    </>
  );
}
