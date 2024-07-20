import Image from "next/image";

export function Community() {
  return (
    <section className="flex flex-col w-60 mt-16 ml-6">
      <div>
        <span>Grupos</span>
        <div className="border-b border-m"></div>
        <div className="flex mt-2">
          <figure className="flex w-6 h-6 rounded-full overflow-hidden mt-3">
            <Image
              src="/margareth.jpeg"
              alt="logo do usuário"
              width={100}
              height={32}
              className="bg-cover object-contain"
            />
          </figure>
          <div className="ml-2 w-60">
            <span>Grupo 1</span>
            <div className="flex place-content-between gap-6">
              <span className="">12 Membros</span>
              <span className="">13h atrás</span>
            </div>
          </div>
        </div>
        <div className="flex mt-2">
          <figure className="flex w-6 h-6 rounded-full overflow-hidden mt-3">
            <Image
              src="/margareth.jpeg"
              alt="logo do usuário"
              width={100}
              height={32}
              className="bg-cover object-contain"
            />
          </figure>
          <div className="ml-2 w-60">
            <span>Grupo 2</span>
            <div className="flex place-content-between gap-6">
              <span className="">5 Membros</span>
              <span className="">4h atrás</span>
            </div>
          </div>
        </div>
        <div className="flex mt-2">
          <figure className="flex w-6 h-6 rounded-full overflow-hidden mt-3">
            <Image
              src="/margareth.jpeg"
              alt="logo do usuário"
              width={100}
              height={32}
              className="bg-cover object-contain"
            />
          </figure>
          <div className="ml-2 w-60">
            <span>Grupo 3</span>
            <div className="flex place-content-between">
              <span className="">8 Membros</span>
              <span className="">1 dia atrás</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <span>Ultimos comentarios</span>
        <div className="border-b border-m"></div>
        <div className="flex mt-2">
          <figure className="flex w-12 h-12  overflow-hidden mt-3">
            <Image
              src="/margareth.jpeg"
              alt="logo do usuário"
              width={100}
              height={32}
              className="bg-cover object-contain"
            />
          </figure>
          <div className="ml-2 w-60">
            <span>Great video, where is it? Please ...</span>
            <div className="flex place-content-between">
              <span className="">by Nickname</span>
              <span className="">13h atrás</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
