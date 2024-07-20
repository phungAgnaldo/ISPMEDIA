"use client";
import { SlidersHorizontal } from "lucide-react";
import { Menu } from "@headlessui/react";

export function FilterSearch() {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center">
            <div className="flex space-x-4 my-2">
              <SlidersHorizontal />
              <p>Filtrar</p>
            </div>
          </Menu.Button>
        </div>
        <Menu.Items className="absolute right-0 mt-1 ml-96 w-28 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-black`}
              >
                Mídeas
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-black`}
              >
                Playlists
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}
