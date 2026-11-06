import Image from "next/image";
import { HERO } from "@/lib/content";
import { Acao, AcaoAssinar } from "@/components/Acao";
import { IconeDesce } from "@/components/Icones";
import { Revelar, RevelarTitulo } from "@/components/Revelar";
import TextLoop from "@/components/TextLoop";

export default function Abertura() {
  return (
    <section id="abertura" aria-labelledby="abertura-titulo" className="relative pb-0 pt-[118px] md:pt-[150px]">
      {/* Fundo em toda a Hero, com escurecimento para preservar a leitura. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="relative h-full w-full">
          <Image
            src="/experiencias/hero-dsc-8314.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/75" />
        </div>
      </div>

      <div className="shell relative">
        <div className="max-w-[min(100%,900px)]">
          <RevelarTitulo
            as="h1"
            id="abertura-titulo"
            linhas={HERO.titulo}
            className="display display-xl"
          />

          <Revelar delay={0.14} className="mt-8">
            <p className="lede">{HERO.lede}</p>
          </Revelar>

          <Revelar delay={0.2} className="mt-10 flex flex-wrap items-center gap-3">
            <AcaoAssinar>Entrar para o ecossistema</AcaoAssinar>
            <Acao href="#ecossistema" variante="fantasma" icone={<IconeDesce className="size-[18px] shrink-0" />}>
              Entender o que eu recebo
            </Acao>
          </Revelar>

        </div>
      </div>

      {/* faixa centralizada na divisória com a próxima seção */}
      <div className="hero-loop mt-16 md:mt-24">
        <TextLoop
          text="empreenda sim"
          shape="line"
          speed={55}
          direction="reverse"
          separator="✦"
          curviness={126}
          tilt={0}
          fontSize={42}
          fontWeight={800}
          letterSpacing={0}
          uppercase
          ribbon
          ribbonColor="#00B85F"
          ribbonWidth={74}
          edgeFade={0}
          cross
          crossAngle={13}
          draggable={false}
          scrollBoost={0}
          outline={false}
          pauseOnHover={false}
          color="#120f17"
          crossColor="#000000"
        />
      </div>
    </section>
  );
}
