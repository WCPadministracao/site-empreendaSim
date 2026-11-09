"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TRILHAS } from "@/lib/content";
import { Revelar, RevelarTitulo } from "@/components/Revelar";

export default function Trilhas() {
  const [ativo, setAtivo] = useState(0);
  const reduz = useReducedMotion();
  const item = TRILHAS.itens[ativo];

  return (
    <section id="trilhas" aria-labelledby="trilhas-titulo" className="relative py-20 md:py-28">
      <div className="shell">
        <div>
          <RevelarTitulo
            id="trilhas-titulo"
            linhas={TRILHAS.titulo}
            className="display section-title"
          />
          <Revelar delay={0.12} className="mt-7">
            <p className="lede">{TRILHAS.lede}</p>
          </Revelar>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          {/* lista: a numeração aqui é informação — é a ordem de aplicação */}
          <ol className="lg:col-span-7">
            {TRILHAS.itens.map((t, i) => {
              const selecionado = i === ativo;
              return (
                <li key={t.t} className="border-t border-[var(--line)] last:border-b">
                  <button
                    type="button"
                    aria-expanded={selecionado}
                    aria-controls={`trilha-painel-${i}`}
                    onClick={() => setAtivo(i)}
                    onMouseEnter={() => setAtivo(i)}
                    onFocus={() => setAtivo(i)}
                    className="group flex w-full items-baseline gap-5 py-6 text-left transition-colors duration-200 md:py-7"
                  >
                    <span
                      className={`tnum shrink-0 font-display text-[0.95rem] tabular-nums transition-colors duration-200 ${
                        selecionado ? "text-green" : "text-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`display block text-[clamp(1.35rem,3.1vw,2rem)] transition-colors duration-200 ${
                          selecionado ? "text-cream" : "text-[#c3cdc8] group-hover:text-cream"
                        }`}
                      >
                        {t.t}
                      </span>
                      <span
                        className={`mt-2 block max-w-[52ch] text-[0.98rem] leading-relaxed transition-colors duration-200 ${
                          selecionado ? "text-muted" : "text-[#7d8b84]"
                        }`}
                      >
                        {t.d}
                      </span>
                    </span>
                  </button>

                  {/* no celular a própria trilha revela a sua foto */}
                  <div
                    id={`trilha-painel-${i}`}
                    className="grid lg:hidden"
                    style={{
                      gridTemplateRows: selecionado ? "1fr" : "0fr",
                      transition: "grid-template-rows 240ms cubic-bezier(.23,1,.32,1)",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="relative mb-7 h-[34vh] min-h-[200px] w-full">
                        <Image
                          src={t.foto}
                          alt={t.alt}
                          fill
                          sizes="100vw"
                          className="object-cover opacity-85"
                          style={{
                            maskImage: "var(--fade-y)",
                            WebkitMaskImage: "var(--fade-y)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* desktop: a foto acompanha o item em foco */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[110px] h-[62vh] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={item.foto}
                  className="absolute inset-0"
                  initial={reduz ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", scale: 1.03 }}
                  animate={reduz ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={reduz ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: reduz ? 0.16 : 0.26, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    maskImage: "var(--fade-l)",
                    WebkitMaskImage: "var(--fade-l)",
                  }}
                >
                  <Image
                    src={item.foto}
                    alt={item.alt}
                    fill
                    sizes="42vw"
                    className="object-cover opacity-85"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
