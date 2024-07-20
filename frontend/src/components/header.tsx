"use client";
import { RadioReceiver, Search } from "lucide-react";

import { UploadModal } from "./uploadModal";
import { KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
}

export function Header({ userId }: Props) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      searchQuery(search);
    }
  }

  function searchQuery(query: string) {
    router.push(`/search/${query}`);
  }

  return (
    <header className="flex space-x-96">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            handleKeyPress(e);
          }}
          className="w-[580px] h-10 rounded-md flex-1 bg-gray-700 placeholder:pl-4 text"
        />
        <Search
          className="hover:text-red-700"
          onClick={() => {
            searchQuery(search);
          }}
        />
      </div>

      <div className="flex space-x-10">
        <div className="flex items-center w-32 h-10 rounded-full bg-red-700">
          <UploadModal userId={userId} />
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            router.push("/radio");
          }}
        >
          <RadioReceiver
            className="flex items-center"
            color={"rgb(153 27 27"}
            size={"32"}
          />
        </div>
      </div>
    </header>
  );
}
