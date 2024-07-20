export enum MideaEnum {
  midea = "mídea",
  video = "vídeo",
  musica = "musíca",
}
interface Props {
  title: MideaEnum;
}
export function EmptyMideas({ title }: Props) {
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="w-[360px] text-center leading-relaxed">
        {title === MideaEnum.video ? "Nenhum" : "Nenhuma"} {title} disponível,
        começa adicionando agora
      </p>
    </div>
  );
}
