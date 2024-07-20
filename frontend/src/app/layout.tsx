import { SideBar } from "@/components/sidebar";
import "./globals.css";
import { cookies } from "next/headers";
export const metadata = {
  title: "IspTube",
  description: "Mideas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has("token");

  return (
    <html lang="en">
      <body className="bg-zinc-900 text-zinc-50 h-screen flex">
        {isAuthenticated ? <SideBar /> : <></>}
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
