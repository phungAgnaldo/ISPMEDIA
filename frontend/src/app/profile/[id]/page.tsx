import { Header } from "@/components/header";
import { ProfileTabs } from "@/components/profileTabs";
import { getUser } from "@/contexts/auth";
import { ProfileContext } from "@/contexts/profile";
import { api } from "@/lib/api";
import Image from "next/image";

interface Params {
  params: {
    id: string;
  };
}

export default async function Profile({ params: { id } }: Params) {
  const userLogged = getUser().sub;
  await ProfileContext.getMideas(id);

  const isUserLogged = userLogged === ProfileContext.user.id;
  let mideas = ProfileContext.user.midea;
  if (!isUserLogged) {
    mideas = ProfileContext.user.midea.filter(
      (midea) => midea.visibility === "public"
    );
  }

  return (
    <div>
      <Header userId={userLogged} />
      <div className="w-full h-40 overflow-hidden flex flex1 items-center my-4">
        <Image
          src="/isptube.png"
          alt=""
          width={1200}
          height={32}
          className="bg-cover object-contain"
        />
      </div>
      <div className="flex items-center space-y-3">
        <figure className="w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={`${api.getUri()}/${ProfileContext.user.avatarUrl}`}
            alt="Profile Avatar"
            width={150}
            height={32}
            className="bg-cover object-contain"
          />
        </figure>
        <div className="ml-4">
          <span>{ProfileContext.user.name}</span>
          <p>{mideas?.length} Mideas</p>
        </div>
      </div>
      <div>
        <ProfileTabs user={ProfileContext.user} userLoggedId={userLogged} />
      </div>
    </div>
  );
}
