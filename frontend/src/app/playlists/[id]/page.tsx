import { api } from "@/lib/api";
import { Header } from "@/components/header";
import { getUser } from "@/contexts/auth";
import { Playlists } from "../page";
import { PlaylistPlayer } from "@/components/playlistPlayer";

interface Params {
  params: {
    id: string;
  };
}
export default async function Playlist({ params: { id } }: Params) {
  const playlist = (await api.get(`/playlists/${id}`)).data as Playlists;

  const userLogged = getUser();

  return (
    <>
      <Header userId={userLogged.sub} />

      <PlaylistPlayer playlist={playlist} userLogged={userLogged} />
    </>
  );
}
