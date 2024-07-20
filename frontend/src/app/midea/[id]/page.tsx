import { api, nextApi } from "@/lib/api";
import { Download, ThumbsDown, ThumbsUp } from "lucide-react";
import { Mideas as Midea } from "@/app/home/page";
import { Mideas } from "@/components/mideas";
import { Header } from "@/components/header";
import Link from "next/link";
import Image from "next/image";
import { getUser } from "@/contexts/auth";
import { Comment } from "@/components/commentForm";
import { CopyToClipboard } from "@/components/copyClipboard";
import { AddToPlaylist } from "@/components/addToPlaylist";
import { Playlists } from "@/app/playlists/page";

interface Params {
  params: {
    id: string;
  };
}
export default async function Midea({ params: { id } }: Params) {
  const midea = (await api.get(`/mideas/${id}`)).data as Midea;

  const usersMideas = (await api.get(`/mideas/by/${midea.user.id}`))
    .data as Midea[];

  const userLogged = getUser();

  const response = await api.get(`/playlists/by/${userLogged.sub}`);

  const playlists = response.data as Playlists[];

  const isMusic = midea.type === "music";

  return (
    <>
      <Header userId={userLogged.sub} />

      <div className="flex mt-6">
        <section className="flex-1">
          <div className={"flex flex-col"}>
            {isMusic && (
              <figure className="bg-cover h-96 relative overflow-hidden">
                <Image
                  src={`${api.getUri()}/${midea.cover_url}`}
                  alt="Cover Da Mídea"
                  width={900}
                  height={160}
                />
              </figure>
            )}

            <video
              className={isMusic ? "h-12 my-6" : "h-96 my-6"}
              src={`${api.getUri()}/mideas/stream/${id}`}
              controls
              autoPlay
              width={900}
            ></video>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl mt-1">{midea.name}</span>
            <div className="flex content-between justify-between">
              <div>
                <p className="font-ligh text-sm inline-block">
                  {new Date(midea.created_at).toDateString()}
                </p>
              </div>
              <div className="flex space-x-4 mx-7">
                <p className="flex items-center">
                  <ThumbsUp width={16} height={16} className="mx-2" />
                  200
                </p>
                <p className="flex items-center">
                  <ThumbsDown width={16} height={16} className="mx-2" />
                  20
                </p>
                <CopyToClipboard link={`${nextApi}/midea/${midea.id}`} />
                <AddToPlaylist
                  playlist={playlists}
                  mideaId={midea.id}
                  userId={userLogged.sub}
                />
                <Link
                  href={`${api.getUri()}/${midea.url}`}
                  download
                  target="_blank"
                  className="flex items-center"
                >
                  <Download width={16} height={16} className="mx-2" />
                  Download
                </Link>
              </div>
            </div>
            <div className="mt-3">
              <p>{midea.description}</p>
            </div>
            <div className="border-b border-m my-4"></div>
          </div>
          <div>
            <div className="flex items-center">
              <figure className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={`${api.getUri()}/${midea.user.avatarUrl}`}
                  alt="Profile Avatar"
                  width={150}
                  height={32}
                  className="bg-cover object-contain"
                />
              </figure>
              <div className="mx-2">
                <Link href={`/profile/${midea.user.id}`}>
                  <div>
                    <span>{midea.user.name}</span>
                    <p>{midea.count} mideas</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="ml-14 my-3">{midea.user.description}</div>
          </div>

          <section>
            <div className="border-b border-m my-4"></div>
            <Comment
              user={userLogged}
              midea_id={midea.id}
              comments={midea.comments}
            />
          </section>
        </section>

        <Mideas mideas={usersMideas} exclude={id} />
      </div>
    </>
  );
}
