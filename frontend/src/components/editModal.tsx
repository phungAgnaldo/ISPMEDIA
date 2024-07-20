"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Camera, Edit2 } from "lucide-react";
import { FormEvent, Fragment, useState } from "react";
import { CoverPicker } from "./coverPicker";
import { MediaVideoPicker } from "./mideaVideoPicker";
import { api } from "@/lib/api";
import { Midea } from "@/contexts/profile";

interface Props {
  midea: Midea;
}

export function EditModal({ midea }: Props) {
  let [isOpen, setIsOpen] = useState(false);

  const mideaType = midea.type == "video" ? "Video" : "Musíca";

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleEditMidea(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const type = midea.type == "video" ? "video" : "music";

    formData.append("type", type);
    close();

    await api.put(`/mideas/${midea.id}`, formData);
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="w-32 h-10 flex items-center bg-opacity-20 px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <Edit2 className="mr-2 h-5 w-5 text-red-700" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    Editar {mideaType}
                  </Dialog.Title>
                  <form
                    onSubmit={handleEditMidea}
                    className="flex flex-1 flex-col gap-2"
                  >
                    <div className="">
                      <label
                        htmlFor="name"
                        className="flex items-center gap-1.5 text-sm text-black"
                      >
                        Titulo
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder={midea.name}
                        id="name"
                        className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
                      />
                    </div>
                    <div className="flex items-center gap-8 justify-around">
                      <div>
                        <label
                          htmlFor="authors"
                          className="flex items-center gap-1.5 text-sm text-black"
                        >
                          Autores
                        </label>
                        <input
                          type="text"
                          name="authors"
                          placeholder={midea.authors}
                          id="authors"
                          className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="album"
                          className="flex items-center gap-1.5 text-sm text-black"
                        >
                          Album
                        </label>
                        <input
                          type="text"
                          name="album"
                          placeholder={midea.album}
                          id="album"
                          className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="music_groupss"
                          className="flex items-center gap-1.5 text-sm text-black"
                        >
                          Grupo Musical
                        </label>
                        <input
                          type="text"
                          name="music_groups"
                          placeholder={midea.music_group}
                          id="music_groups"
                          className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-8 justify-around">
                      <div className="w-[177px]">
                        <label
                          htmlFor="genre"
                          className="flex items-center gap-1.5 text-sm text-black"
                        >
                          Genero
                        </label>
                        <input
                          type="text"
                          name="genre"
                          placeholder={midea.genre}
                          id="genre"
                          className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
                        />
                      </div>
                      <div className="w-[177px]">
                        <label
                          htmlFor="release_date"
                          className="flex items-center gap-1.5 text-sm text-black"
                        >
                          Data De Lançamento
                        </label>
                        <input
                          type="date"
                          name="release_date"
                          id="release_date"
                          placeholder={midea.release_date}
                          className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
                        />
                      </div>
                      <div className="w-[177px]">
                        <label
                          htmlFor="visibility"
                          className="flex items-center gap-1.5 text-sm text-black"
                        >
                          Visibilidade
                        </label>
                        <select
                          name="visibility"
                          id="visibility"
                          className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
                        >
                          <option value="public">Pública</option>
                          <option value="private">Privada</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="cover_url"
                        className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
                      >
                        <Camera className="h-4 w-4" />
                        Anexar Cover
                      </label>
                    </div>

                    <CoverPicker />

                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="url"
                        className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
                      >
                        <Camera className="h-4 w-4" />
                        Anexar mídia
                      </label>
                    </div>

                    <MediaVideoPicker />

                    <textarea
                      name="description"
                      id="description"
                      placeholder={midea.description}
                      spellCheck={false}
                      className="w-full flex-1 resize-none rounded border-0  bg-gray-700 p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
                    />

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
