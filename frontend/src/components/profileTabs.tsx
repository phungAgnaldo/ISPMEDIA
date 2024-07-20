"use client";
import { api } from "@/lib/api";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { ProfileMoreVertical } from "./profileMoreVertical";
import { User } from "@/contexts/profile";
import { EditModal } from "./editModal";
import { ListVideo } from "lucide-react";
import { DeletePlaylist } from "./deletePlaylist";

interface Props {
  user: User;
  userLoggedId: string;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
export function ProfileTabs({ user, userLoggedId }: Props) {
  const isUserLogged = userLoggedId === user.id;
  let mideas = user.midea;
  let playlists = user.playlists;

  if (!isUserLogged) {
    mideas = mideas.filter((midea) => midea.visibility === "public");
    playlists = playlists.filter((midea) => midea.visibility === "public");
  }

  let videos = mideas.filter((midea) => midea.type === "video");
  let musics = mideas.filter((midea) => midea.type === "music");

  return (
    <Tab.Group>
      <Tab.List className={"flex ml-16"}>
        <Tab
          className={({ selected }) =>
            classNames(
              "items-center m-4",
              selected ? "border-b-4 border-red-800" : ""
            )
          }
        >
          Videos
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "items-center m-4",
              selected ? "border-b-4 border-red-800" : ""
            )
          }
        >
          Musicas
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "items-center m-4",
              selected ? "border-b-4 border-red-800" : ""
            )
          }
        >
          Playlists
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "items-center m-4",
              selected ? "border-b-4 border-red-800" : ""
            )
          }
        >
          Comunidade
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "items-center m-4",
              selected ? "border-b-4 border-red-800" : ""
            )
          }
        >
          Sobre
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          {videos.length === 0 ? (
            <div className="flex flex-1 items-center justify-center p-16">
              <p className="w-[360px] text-center leading-relaxed">
                Usuário sem vídeo disponível.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 mt-4">
              {videos.map((video) => {
                return (
                  <div key={video.id} className="m-4">
                    <div className={`bg-cover h-32 relative overflow-hidden`}>
                      <Link href={`/midea/${video.id}`}>
                        <Image
                          src={`${api.getUri()}/${video.cover_url}`}
                          alt=""
                          width={250}
                          height={50}
                        />
                        <span className="bg-zinc-800 m-2 absolute bottom-0 left-0">
                          {video.time}
                        </span>
                      </Link>
                      {isUserLogged ? (
                        <span className="m-2 absolute bottom-0 left-48">
                          <EditModal midea={video} />
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-normal mt-1">{video.name}</span>
                      <div className="flex place-content-between">
                        <p className="font-light text-sm mt-1">15h atrás</p>
                        {isUserLogged ? (
                          <ProfileMoreVertical mideas={video} />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Tab.Panel>
        <Tab.Panel>
          {musics.length === 0 ? (
            <div className="flex flex-1 items-center justify-center p-16">
              <p className="w-[360px] text-center leading-relaxed">
                Usuário sem música disponível.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 mt-4">
              {musics.map((video) => {
                return (
                  <div className="m-4" key={video.id}>
                    <div className={`bg-cover h-32 relative overflow-hidden`}>
                      <Link href={`/midea/${video.id}`}>
                        <Image
                          src={`${api.getUri()}/${video.cover_url}`}
                          alt=""
                          width={250}
                          height={50}
                        />
                        <span className="bg-zinc-800 m-2 absolute bottom-0 left-0">
                          {video.time}
                        </span>
                      </Link>
                      {isUserLogged ? (
                        <span className="m-2 absolute bottom-0 left-48">
                          <EditModal midea={video} />
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-normal mt-1">{video.name}</span>
                      <div className="flex place-content-between">
                        <p className="font-light text-sm mt-1">15h atrás</p>
                        {isUserLogged ? (
                          <ProfileMoreVertical mideas={video} />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Tab.Panel>
        <Tab.Panel>
          {playlists.length === 0 ? (
            <div className="flex flex-1 items-center justify-center p-16">
              <p className="w-[360px] text-center leading-relaxed">
                Usuário sem Playlists Dispónivel.
              </p>
            </div>
          ) : (
            <></>
          )}
          <div className="grid grid-cols-4 mt-4">
            {playlists.map((playlist) => {
              return (
                <div key={playlist.id} className="flex flex-col">
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
                    {isUserLogged ? (
                      <span className="ml-44">
                        <DeletePlaylist id={playlist.id} />
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 place-content-between">
                    <p className="font-normal">{playlist.name}</p>
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
        </Tab.Panel>
        <Tab.Panel>
          {" "}
          <div className="flex flex-1 items-center justify-center p-16">
            <p className="w-[360px] text-center leading-relaxed">Comunidades</p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          {" "}
          <div className="flex flex-1 px-20 py-4">
            <p className="leading-relaxed">{user.description}</p>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
