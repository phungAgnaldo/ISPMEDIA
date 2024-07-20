"use client";
import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

function logOut() {
  deleteCookie("token");
}

export function Footer() {
  const router = useRouter();
  return (
    <footer className="flex-1 absolute bottom-20">
      <div
        className="flex items-center gap-6 mx-4 hover:text-red-700 cursor-pointer"
        onClick={() => {
          logOut();
          router.push("/");
          router.refresh();
        }}
      >
        {" "}
        <LogOut />
        Log out
      </div>
    </footer>
  );
}
