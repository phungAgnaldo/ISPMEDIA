"use client";
import { Community } from "@/components/community";
import { EmptyMideas, MideaEnum } from "@/components/emptyMidea";
import { Header } from "@/components/header";
import { api, socket } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  description?: string;
}
export interface Comments {
  id: string;
  message: string;
  user: User;
  midea_id: string;
  created_at: string;
}
export interface Mideas {
  id: string;
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
  time: string;
  user_id: string;
  created_at: string;
  count: number;
  user: User;
  comments: Comments[];
}

interface Props {
  userId: string;
}

export default function Home({ userId }: Props) {
  const [mideas, setMideas] = useState<Mideas[]>([]);
  const [message, setMessage] = useState(0);
  const router = useRouter();

  socket.on("upload", (message) => {
    setMessage(message);
    if (message === 100) {
      window.location.reload();
    }
  });

  const videos = mideas.filter((midea) => midea.type === "video");
  const musics = mideas.filter((midea) => midea.type === "music");

  useEffect(() => {
    async function getMideas() {
      const response = await api.get("/mideas");
      setMideas(response.data);
    }
    getMideas();
  }, []);

  if (mideas.length === 0) {
    return (
      <div className="flex mt-6">
        <div className="flex-col">
          <Header userId={userId} />

          <EmptyMideas title={MideaEnum.midea} />
        </div>
      </div>
    );
  }
  return (
    <>
      <Header userId={userId} />

      <div className="flex mt-6">
        <section className="flex-1">
          <Tab.Group>
            <Tab.List className={"flex ml-16 items-end justify-end"}>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "items-center m-4",
                    "items-center m-4",
                    selected ? "border-b-4 border-red-800" : ""
                  )
                }
              >
                Todos
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "items-center m-4",
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
                    "items-center m-4",
                    selected ? "border-b-4 border-red-800" : ""
                  )
                }
              >
                Musicas
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                {" "}
                <div className="grid grid-cols-4 gap-6 content-around">
                  {mideas.map((midea) => {
                    return (
                      <div key={midea.id}>
                        <Link href={`/midea/${midea.id}`}>
                          <div
                            className={`bg-cover h-32 relative overflow-hidden`}
                          >
                            <Image
                              src={`${api.getUri()}/${midea.cover_url}`}
                              alt=""
                              width={200}
                              height={32}
                            />
                            <span className="bg-zinc-800 m-2 absolute bottom-0 left-0">
                              {midea.time}
                            </span>
                          </div>
                        </Link>

                        <div className="flex flex-col">
                          <span className="font-normal mt-1">{midea.name}</span>
                          <div className="flex place-content-between">
                            <Link
                              href={`/profile/${midea.user.id}`}
                              className="font-light	text-sm"
                            >
                              {midea.user.name}
                            </Link>

                            <a href=""></a>
                            <span className="font-light text-sm	">{`${new Date(
                              midea.created_at
                            ).toDateString()}`}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                {videos.length === 0 ? (
                  <div className="flex mt-6">
                    <EmptyMideas title={MideaEnum.video} />
                  </div>
                ) : (
                  <></>
                )}
                <div className="grid grid-cols-4 gap-6 content-around">
                  {videos.map((midea) => {
                    return (
                      <div key={midea.id}>
                        <Link href={`/midea/${midea.id}`}>
                          <div
                            className={`bg-cover h-32 relative overflow-hidden`}
                          >
                            <Image
                              src={`${api.getUri()}/${midea.cover_url}`}
                              alt=""
                              width={200}
                              height={32}
                            />
                            <span className="bg-zinc-800 m-2 absolute bottom-0 left-0">
                              {midea.time}
                            </span>
                          </div>
                        </Link>

                        <div className="flex flex-col">
                          <span className="font-normal mt-1">{midea.name}</span>
                          <div className="flex place-content-between">
                            <Link
                              href={`/profile/${midea.user.id}`}
                              className="font-light	text-sm"
                            >
                              {midea.user.name}
                            </Link>

                            <a href=""></a>
                            <span className="font-light text-sm	">{`${new Date(
                              midea.created_at
                            ).toDateString()}`}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                {musics.length === 0 ? (
                  <div className="flex mt-6">
                    <EmptyMideas title={MideaEnum.musica} />
                  </div>
                ) : (
                  <></>
                )}{" "}
                <div className="grid grid-cols-4 gap-6 content-around">
                  {musics.map((midea) => {
                    return (
                      <div key={midea.id}>
                        <Link href={`/midea/${midea.id}`}>
                          <div
                            className={`bg-cover h-32 relative overflow-hidden`}
                          >
                            <Image
                              src={`${api.getUri()}/${midea.cover_url}`}
                              alt=""
                              width={200}
                              height={32}
                            />
                            <span className="bg-zinc-800 m-2 absolute bottom-0 left-0">
                              {midea.time}
                            </span>
                          </div>
                        </Link>

                        <div className="flex flex-col">
                          <span className="font-normal mt-1">{midea.name}</span>
                          <div className="flex place-content-between">
                            <Link
                              href={`/profile/${midea.user.id}`}
                              className="font-light	text-sm"
                            >
                              {midea.user.name}
                            </Link>

                            <a href=""></a>
                            <span className="font-light text-sm	">{`${new Date(
                              midea.created_at
                            ).toDateString()}`}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          {message !== 0 && message !== 100 && (
            <div className="flex flex-col m-2 absolute bottom-0 right-10">
              <label>Downloading progress</label>
              <progress id="file" value={message} max="100"></progress>
            </div>
          )}
        </section>
        <Community />
      </div>
    </>
  );
}
