"use client";
import { Tab } from "@headlessui/react";
import { LoginForm } from "./loginForm";
import { RegisterForm } from "./registerForm";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function RegisterTabs() {
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
          Login
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "items-center m-4 text-black",
              selected ? "border-b-4 border-red-800" : ""
            )
          }
        >
          Registrar
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <LoginForm />
        </Tab.Panel>
        <Tab.Panel>
          <RegisterForm />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
