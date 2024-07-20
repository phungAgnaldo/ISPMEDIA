"use client";
import { Dialog, Transition } from "@headlessui/react";
import { ListPlus } from "lucide-react";
import { FormEvent, Fragment, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
}

export function CreatePlaylistModal({ userId }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleCreatePlaylist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const visibility = formData.get("visibility");

    await api.post(`/playlists/${userId}`, {
      name,
      description,
      visibility,
    });

    router.refresh();
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="w-40 h-8 flex items-center rounded-full bg-red-700 bg-opacity-40 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <ListPlus className="mx-2" />
          Criar Playlist
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
                    Criar Playlist
                  </Dialog.Title>
                  <form
                    onSubmit={handleCreatePlaylist}
                    className="flex flex-1 flex-col gap-2"
                  >
                    <div className="">
                      <label
                        htmlFor="name"
                        className="flex items-center gap-1.5 text-sm text-black"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="visibility"
                        className="flex items-center gap-1.5 text-sm text-black"
                      >
                        Visibilidade
                      </label>
                      <select
                        name="visibility"
                        id="visibility"
                        required
                        className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
                      >
                        <option value="public">Pública</option>
                        <option value="private">Privada</option>
                      </select>
                    </div>
                    <div className="">
                      <label
                        htmlFor="visibility"
                        className="flex items-center gap-1.5 text-sm text-black"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        spellCheck={false}
                        className="w-full flex-1 resize-none rounded border-0 bg-gray-700 p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-block self-end rounded-full  bg-red-700 px-5 py-3 font-alt text-sm uppercase text-white leading-none  hover:bg-red-900"
                      onClick={closeModal}
                    >
                      Salvar
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
