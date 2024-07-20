"use client";
import { Tab } from "@headlessui/react";
import { MideaVideoForm } from "./mideaVideoForm";
import { MideaAudioForm } from "./mideaAudioForm";

interface Props {
  userId: string;
  close(): void;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function MideaTabs({ close, userId }: Props) {
  return (
    <Tab.Group>
      <Tab.List className={"flex"}>
        <Tab
          className={({ selected }) =>
            classNames(
              "items-center m-4 text-black",
              selected ? "border-b-4 border-red-800" : ""
            )
          }
        >
          Videos
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "items-center m-4 text-black",
              selected ? "border-b-4 border-red-800" : ""
            )
          }
        >
          Musicas
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <MideaVideoForm close={close} userId={userId} />
        </Tab.Panel>
        <Tab.Panel>
          <MideaAudioForm close={close} userId={userId} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
