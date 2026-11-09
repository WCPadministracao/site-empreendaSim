"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ESPECIALISTAS } from "@/lib/content";
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

const FATOR_ABERTA = 1.97; // 264 → 520 na referência
const ANCORA = 0.2; // a linha ativa fica a 20% do topo (187/900 na referência)
const CURSO_POR_LINHA = 1.55; // telas de rolagem que cada linha consome

type Pessoa = (typeof ESPECIALISTAS.pessoas)[number];

export default function Especialistas() {
  const escopo = useRef<HTMLElement>(null);
  const pino = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const trilho = lista.current;
          if (!trilho) return;

          const fotos = gsap.utils.toArray<HTMLElement>(".js-foto", escopo.current);
          const linhas = Array.from(trilho.querySelectorAll<HTMLLIElement>("li"));
          const total = linhas.length;
          let fechada = 0;
          let aberta = 0;
          let recuos: number[] = [];

          // Meça as linhas fechadas. As biografias ocupam alturas diferentes no celular.
          const estadoFechado = () => {
            gsap.set(fotos, { clearProps: "height" });
            fechada = fotos[0].offsetHeight;
            const linha = linhas[0];
            const compacto = getComputedStyle(linha).display === "grid";
            const vao = compacto
              ? linha.clientWidth
              : linha.clientWidth - linha.children[0].clientWidth - linha.children[2].clientWidth;
            const espacoTexto = compacto
              ? Math.max(...linhas.map((item) => item.offsetHeight - fechada))
              : 72;
            aberta = Math.max(fechada, Math.min(
              fechada * FATOR_ABERTA,
              vao,
              window.innerHeight * (1 - ANCORA) - espacoTexto,
            ));
            recuos = linhas.map((item) => item.offsetTop - linha.offsetTop);
          };
          estadoFechado();
          gsap.set(trilho, { y: 0 });
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
            tl.to(fotos[i], { height: () => aberta, duration: 1 }, base);

            // segura aberta entre base+1 e base+2 (nenhum tween nesse trecho)

            if (i < total - 1) {
              // fecha e entrega para a próxima, que sobe até a mesma altura
              tl.to(
                fotos[i],
                { height: () => fechada, duration: 1 },
                base + 2,
              ).to(
                trilho,
                { y: () => -recuos[i + 1], duration: 1 },
                base + 2,
              );
            }
          });

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", estadoFechado);
            gsap.set([...fotos, trilho], { clearProps: "all" });
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
          className="display section-title"
        />
        <Revelar delay={0.12} className="mt-6 lg:mt-0 lg:max-w-[40ch] lg:pb-2">
          <p className="lede">{ESPECIALISTAS.lede}</p>
        </Revelar>
      </div>

      <div ref={pino} className="mt-12 overflow-hidden lg:mt-16">
        <div className="shell">
          <ul ref={lista} className="relative border-b border-[var(--line)]">
            {ESPECIALISTAS.pessoas.map((pessoa, i) => (
              <LinhaEspecialista key={pessoa.nome} pessoa={pessoa} indice={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function LinhaEspecialista({ pessoa, indice }: { pessoa: Pessoa; indice: number }) {
  return (
    <li className="grid grid-cols-2 items-center gap-x-4 gap-y-3 border-t border-[var(--line)] py-4 lg:flex lg:justify-between lg:gap-0">
      {/* esquerda — largura fixa: o texto não reflui enquanto a foto cresce */}
      <div className="linha-lado flex items-start gap-2 lg:justify-end lg:gap-4 lg:pr-10 lg:text-right">
        <span className="tnum shrink-0 text-[0.75rem] text-muted lg:pt-1 lg:text-[0.85rem]">
          {String(indice + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="text-sm leading-snug font-medium text-green [overflow-wrap:anywhere] lg:text-[0.95rem] lg:leading-normal">{pessoa.area}</p>
          <p className="mt-3 hidden text-[0.95rem] leading-relaxed text-muted lg:block">
            {pessoa.bio}
          </p>
        </div>
      </div>

      {/* foto quadrada — o único elemento que a timeline anima */}
      <div className="js-foto foto-prensa relative order-first col-span-full aspect-square shrink-0 justify-self-center overflow-hidden lg:order-none">
        <Image
          src={pessoa.foto}
          alt={pessoa.alt}
          fill
          sizes="(max-width: 1023px) min(82vw, 355px), 46vw"
          className="object-cover"
        />
      </div>

      {/* direita — também de largura fixa */}
      <div className="linha-lado text-right lg:pl-10 lg:text-left">
        <h3 className="display text-[clamp(1rem,4.4vw,1.6rem)] leading-[1.05] [overflow-wrap:anywhere] lg:text-[clamp(1.6rem,2.6vw,2.1rem)]">
          {pessoa.nome}
        </h3>
      </div>
      <p className="col-span-full mx-auto max-w-[52ch] text-[0.95rem] leading-relaxed text-muted lg:hidden">
        {pessoa.bio}
      </p>
    </li>
  );
}
