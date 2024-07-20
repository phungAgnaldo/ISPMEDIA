import { Mideas } from "@/app/home/page";
import { api } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface Props {
  mideas: Mideas[];
  exclude: string;
}
export function Mideas({ mideas, exclude }: Props) {
  const usersMideas = mideas.filter((mideas) => mideas.id !== exclude);
  return (
    <section className="flex flex-col w-60 mt-10 ml-6">
      <div className="flex flex-col space-x-10">
        <div className="flex items-center p-2 rounded-full bg-red-700">
          <p className="flex items-center gap-5 mx-auto text-sm">
            Mideas Do Usuário
          </p>
        </div>
        {usersMideas.length === 0 ? (
          <div className="flex flex-1 items-center justify-center my-6">
            <p className="leading-relaxed w-full">
              Usuário sem mídeas disponível.
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>

      {usersMideas.map((midea) => {
        return (
          <div key={midea.id} className="my-4">
            <Link href={`/midea/${midea.id}`}>
              <div className={`bg-cover h-28 relative overflow-hidden`}>
                <Image
                  src={`${api.getUri()}/${midea.cover_url}`}
                  alt=""
                  width={200}
                  height={32}
                />
                <span className="bg-zinc-800 m-2 absolute bottom-0 left-0">
                  {midea.time}
                </span>
              </div>
            </Link>

            <div className="flex flex-col">
              <span className="font-normal mt-1">{midea.name}</span>
              <div className="flex place-content-between">
                <span className="font-light text-sm	">{`${new Date(
                  midea.created_at
                ).toDateString()}`}</span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
