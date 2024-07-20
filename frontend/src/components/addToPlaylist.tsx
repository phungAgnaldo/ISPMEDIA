"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ListPlus } from "lucide-react";
import { api } from "@/lib/api";
import { Playlists } from "@/app/playlists/page";
import Link from "next/link";
import { CreatePlaylistModal } from "./createPlaylistModal";
interface Props {
  playlist: Playlists[];
  mideaId: string;
  userId: string;
}

export function AddToPlaylist({ userId, playlist, mideaId }: Props) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function addToPlaylist(id: string, midea_id: string) {
    api.post(`/playlists/${id}/add/`, {
      midea_id,
    });
    closeModal();
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="w-16 h-10 flex items-center hover:text-red-700  font-medium"
        >
          <ListPlus width={16} height={16} className="mx-2" />
          Save
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto text-black">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white rounded-2xl p-6 text-left align-middle  transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium">
                    <div className="flex my-2 place-content-between">
                      <span>Playlists</span>
                      <CreatePlaylistModal userId={userId} />
                    </div>
                  </Dialog.Title>
                  {playlist.map((playlist) => {
                    return (
                      <div key={playlist.id} className="my-4">
                        <div className="flex flex-1 items-center place-content-between">
                          <p className="font-bold">{playlist.name}</p>

                          <Link href={`/playlists/${playlist.id}`}>
                            VER PLAYLIST COMPLETA
                          </Link>
                          <button
                            type="button"
                            className="inline-block self-end rounded-full  bg-red-700 px-5 py-3 font-alt text-sm uppercase text-white leading-none  hover:bg-red-900"
                            onClick={(e) => {
                              addToPlaylist(playlist.id, mideaId);
                            }}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
