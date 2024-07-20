"use client";
import { MoreVertical, Trash } from "lucide-react";
import { Menu } from "@headlessui/react";
import { Midea } from "@/contexts/profile";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Props {
  mideas: Midea;
}

export function ProfileMoreVertical({ mideas }: Props) {
  const router = useRouter();

  async function deleteMideas(id: string) {
    (await api.delete(`/mideas/${id}`)).data;
    router.refresh();
  }
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center">
            <MoreVertical
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="px-1 py-1"
            onClick={() => {
              deleteMideas(mideas.id);
            }}
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <Trash className="mr-2 h-5 w-5 text-violet-400" />
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
