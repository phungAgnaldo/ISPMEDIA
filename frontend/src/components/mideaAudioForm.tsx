"use client";
import { Camera } from "lucide-react";
import { CoverPicker } from "./coverPicker";
import { FormEvent } from "react";
import { api } from "@/lib/api";
import { MediaAudioPicker } from "./mideaAudioPicker";
interface Props {
  close(): void;
  userId: string;
}

export function MideaAudioForm({ close, userId }: Props) {
  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    event.currentTarget.dir;

    const formData = new FormData(event.currentTarget);

    const coverUrlToUpload = formData.get("cover_url");
    const urlToUpload = formData.get("url");

    formData.append("type", "music");

    if (coverUrlToUpload && urlToUpload) {
      formData.set("cover_url", coverUrlToUpload);
      formData.set("url", urlToUpload);
      close();
      await api.post(`/mideas/${userId}`, formData);
    }
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="">
        <label
          htmlFor="name"
          className="flex items-center gap-1.5 text-sm text-black"
        >
          Titulo Da Música
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
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
            id="album"
            className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
          />
        </div>
        <div>
          <label
            htmlFor="music_group"
            className="flex items-center gap-1.5 text-sm text-black"
          >
            Grupo Musical
          </label>
          <input
            type="text"
            name="music_groups"
            id="music_group"
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
            required
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

      <MediaAudioPicker />

      <textarea
        name="description"
        id="description"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-gray-700 placeholder:pl-4 text p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Descrição Do Mídea"
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full  bg-red-700 px-5 py-3 font-alt text-sm uppercase text-white leading-none  hover:bg-red-900"
      >
        Salvar
      </button>
    </form>
  );
}
