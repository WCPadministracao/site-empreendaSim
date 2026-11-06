import Image from "next/image";
import { HERO, PRECO } from "@/lib/content";
import { Acao, AcaoAssinar } from "@/components/Acao";
import { IconeDesce } from "@/components/Icones";
import { Revelar, RevelarTitulo } from "@/components/Revelar";
import TextLoop from "@/components/TextLoop";

export default function Abertura() {
  return (
    <section id="abertura" aria-labelledby="abertura-titulo" className="relative pb-0 pt-[118px] md:pt-[150px]">
      {/* A foto não é um card: ela sangra pela borda e se dissolve no fundo da página */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[44vw] max-w-[760px] lg:block"
      >
        <div className="relative h-full w-full">
          <Image
            src="/experiencias/comunidade.webp"
            alt=""
            fill
            priority
            sizes="44vw"
            className="object-cover object-[42%_45%] opacity-[0.3]"
            style={{
              maskImage:
                "radial-gradient(104% 88% at 92% 44%, #000 12%, rgb(0 0 0 / .4) 50%, transparent 76%)",
              WebkitMaskImage:
                "radial-gradient(104% 88% at 92% 44%, #000 12%, rgb(0 0 0 / .4) 50%, transparent 76%)",
            }}
          />
        </div>
      </div>

      <div className="shell relative">
        <div className="max-w-[min(100%,900px)]">
          <Revelar className="mb-7">
            <p className="max-w-[46ch] text-[0.95rem] leading-relaxed text-muted">
              {HERO.nota}
            </p>
          </Revelar>

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

          <Revelar delay={0.26} className="mt-10">
            <p className="text-[0.95rem] text-muted">
              Assinatura mensal de{" "}
              <span className="tnum font-semibold text-cream">
                {PRECO.moeda} {PRECO.valor}
              </span>
              {PRECO.periodo} · acesso imediato pela Hotmart
            </p>
          </Revelar>
        </div>
      </div>

      {/* no celular a mesma foto fecha a abertura, também em sangria */}
      <div className="relative mt-16 h-[46vh] min-h-[260px] w-full lg:hidden">
        <Image
          src="/experiencias/comunidade.webp"
          alt="Participantes reunidos em uma edição presencial do Empreenda Sim"
          fill
          sizes="100vw"
          className="object-cover object-[40%_45%] opacity-55"
          style={{
            maskImage: "linear-gradient(180deg, transparent, #000 34%, #000 62%, transparent)",
            WebkitMaskImage: "linear-gradient(180deg, transparent, #000 34%, #000 62%, transparent)",
          }}
        />
      </div>

      {/* faixa que fecha a abertura, em sangria de ponta a ponta */}
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
          ribbonColor="#00b85f"
          ribbonWidth={94}
          edgeFade={0}
          cross
          crossAngle={12}
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
