"use client";
import { api } from "@/lib/api";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export function DeletePlaylist({ id }: Props) {
  const router = useRouter();
  function deletePlaylist(id: string) {
    api.delete(`/playlists/${id}`);
    router.refresh();
  }

  return (
    <div
      className="flex m-2 absolute bottom-0 left-52 cursor-pointer"
      onClick={(e) => deletePlaylist(id)}
    >
      <Trash color={"rgb(153 27 27"} />
    </div>
  );
}
