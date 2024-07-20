"use client";
import { RegisterTabs } from "@/components/registerTabs";

export default function Register() {
  return (
    <div className="mx-auto mt-40 bg-white flex flex-col w-[900px] relative items-center justify-center rounded-2xl p-6">
      <RegisterTabs />
    </div>
  );
}
