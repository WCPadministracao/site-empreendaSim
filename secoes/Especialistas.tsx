"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ESPECIALISTAS } from "@/lib/content";
import { AcaoAssinar } from "@/components/Acao";
import { Revelar, RevelarTitulo } from "@/components/Revelar";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Reprodução da seção PRENSA do tarqstudio.com, medida no navegador.
 *
 * Sequência: o título rola para fora, o contêiner das linhas prende no topo e
 * uma linha por vez abre — a foto quadrada cresce ~1,97× em scrub contínuo.
 * A linha segura aberta, fecha e a lista sobe para a próxima assumir; a última
 * fica aberta até o pin soltar. Tudo é scrub, então subir refaz o caminho.
 *
 * Os blocos de texto têm LARGURA FIXA e não animam: a foto cresce para dentro do
 * vão entre eles, e nenhum parágrafo reflui durante a rolagem.
 *
 * A fase de deslize horizontal do trilho (observada na referência) não entra:
 * exigiria texto longo e imagens extras por pessoa. Ver DESIGN.md.
 */

const FECHADA_MIN = 150;
const FECHADA_MAX = 264; // medida na referência a 1440px
const FECHADA_VW = 0.183;
const FATOR_ABERTA = 1.97; // 264 → 520 na referência
const RESPIRO = 16; // passo entre linhas na referência: 280–288 para foto de 264
const ANCORA = 0.2; // a linha ativa fica a 20% do topo (187/900 na referência)
const CURSO_POR_LINHA = 1.55; // telas de rolagem que cada linha consome

/** Largura fixa de cada bloco de texto — precisa casar com `.linha-lado` no CSS. */
function ladoPx() {
  return Math.round(Math.max(220, Math.min(window.innerWidth * 0.23, 320)));
}

function medidas() {
  const gutter = window.innerWidth >= 768 ? 80 : 40;
  const shell = Math.min(window.innerWidth, 1240) - gutter;
  const lado = ladoPx();

  const fechada = Math.round(
    Math.max(FECHADA_MIN, Math.min(window.innerWidth * FECHADA_VW, FECHADA_MAX)),
  );
  const aberta = Math.round(
    Math.min(
      fechada * FATOR_ABERTA,
      window.innerHeight * (1 - ANCORA) - 72, // nunca estoura a viewport
      shell - lado * 2, // nem invade os blocos de texto
    ),
  );

  return { fechada, aberta, linha: fechada + RESPIRO * 2 + 1 };
}

type Pessoa = (typeof ESPECIALISTAS.pessoas)[number];

export default function Especialistas() {
  const escopo = useRef<HTMLElement>(null);
  const pino = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const total = ESPECIALISTAS.pessoas.length;
          const fotos = gsap.utils.toArray<HTMLElement>(".js-foto", escopo.current);

          // as medidas dependem da viewport, então são relidas a cada refresh
          // do ScrollTrigger (resize, troca de orientação, fontes carregando)
          const estadoFechado = () => {
            gsap.set(fotos, { height: medidas().fechada });
          };
          estadoFechado();
          gsap.set(lista.current, { y: 0 });
          ScrollTrigger.addEventListener("refreshInit", estadoFechado);

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: pino.current,
              start: `top ${ANCORA * 100}%`,
              end: () =>
                `+=${Math.round(window.innerHeight * CURSO_POR_LINHA) * total}`,
              pin: pino.current,
              pinSpacing: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          ESPECIALISTAS.pessoas.forEach((_, i) => {
            const base = i * 3;

            // abre
            tl.to(fotos[i], { height: () => medidas().aberta, duration: 1 }, base);

            // segura aberta entre base+1 e base+2 (nenhum tween nesse trecho)

            if (i < total - 1) {
              // fecha e entrega para a próxima, que sobe até a mesma altura
              tl.to(
                fotos[i],
                { height: () => medidas().fechada, duration: 1 },
                base + 2,
              ).to(
                lista.current,
                { y: () => -(i + 1) * medidas().linha, duration: 1 },
                base + 2,
              );
            }
          });

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", estadoFechado);
            gsap.set([...fotos, lista.current], { clearProps: "all" });
          };
        },
      );

      return () => mm.revert();
    },
    { scope: escopo },
  );

  return (
    <section
      ref={escopo}
      id="especialistas"
      aria-labelledby="especialistas-titulo"
      className="relative py-20 md:py-28"
    >
      <div className="shell lg:flex lg:items-end lg:justify-between lg:gap-14">
        <RevelarTitulo
          id="especialistas-titulo"
          linhas={ESPECIALISTAS.titulo}
          className="display display-lg max-w-[18ch] lg:shrink-0"
        />
        <Revelar delay={0.12} className="mt-6 lg:mt-0 lg:max-w-[40ch] lg:pb-2">
          <p className="lede">{ESPECIALISTAS.lede}</p>
        </Revelar>
      </div>

      <div ref={pino} className="mt-12 lg:mt-16 lg:overflow-hidden">
        <div className="shell">
          <ul ref={lista} className="border-b border-[var(--line)]">
            {ESPECIALISTAS.pessoas.map((pessoa, i) => (
              <LinhaEspecialista key={pessoa.nome} pessoa={pessoa} indice={i} />
            ))}
          </ul>
        </div>
      </div>

      <div className="shell">
        <Revelar className="mt-12">
          <AcaoAssinar variante="fantasma">Aprender com quem vive o mercado</AcaoAssinar>
        </Revelar>
      </div>
    </section>
  );
}

function LinhaEspecialista({ pessoa, indice }: { pessoa: Pessoa; indice: number }) {
  return (
    <li className="flex flex-col gap-5 border-t border-[var(--line)] py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:py-4">
      {/* esquerda — largura fixa: o texto não reflui enquanto a foto cresce */}
      <div className="linha-lado order-2 flex items-start gap-4 lg:order-1 lg:justify-end lg:pr-10 lg:text-right">
        <span className="tnum shrink-0 pt-[3px] text-[0.85rem] text-muted lg:pt-1">
          {String(indice + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="text-[0.95rem] font-medium text-green">{pessoa.area}</p>
          <p className="mt-3 hidden text-[0.95rem] leading-relaxed text-muted lg:block">
            {pessoa.bio}
          </p>
        </div>
      </div>

      {/* foto quadrada — o único elemento que a timeline anima */}
      <div className="js-foto foto-prensa relative order-1 aspect-square shrink-0 overflow-hidden lg:order-2">
        <Image
          src={pessoa.foto}
          alt={pessoa.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 46vw"
          className="object-cover"
        />
      </div>

      {/* direita — também de largura fixa */}
      <div className="linha-lado order-3 lg:pl-10">
        <h3 className="display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.05]">
          {pessoa.nome}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted lg:hidden">
          {pessoa.bio}
        </p>
      </div>
    </li>
  );
}
