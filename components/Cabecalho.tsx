"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { NAV, PRECO } from "@/lib/content";
import { AcaoAssinar } from "./Acao";
import { IconeFechar, IconeMenu } from "./Icones";

export default function Cabecalho() {
  const pathname = usePathname();
  const [rolou, setRolou] = useState(false);
  const { scrollY } = useScroll();
  const dialogo = useRef<HTMLDialogElement>(null);
  const [aberto, setAberto] = useState(false);
  const [galeriaVisivel, setGaleriaVisivel] = useState(false);
  const ocultarCabecalho = galeriaVisivel && !aberto;

  useMotionValueEvent(scrollY, "change", (v) => setRolou(v > 24));

  useEffect(() => {
    const galeria = document.getElementById("eventos");
    if (!galeria) {
      setGaleriaVisivel(false);
      return;
    }
    let frame = 0;
    const verificarGaleria = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const limites = galeria.getBoundingClientRect();
        // Restore navigation as soon as the footer begins entering the screen.
        setGaleriaVisivel(limites.top < window.innerHeight && limites.bottom >= window.innerHeight - 1);
      });
    };
    verificarGaleria();
    window.addEventListener("scroll", verificarGaleria, { passive: true });
    window.addEventListener("resize", verificarGaleria, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", verificarGaleria);
      window.removeEventListener("resize", verificarGaleria);
    };
  }, [pathname]);


  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;
    if (aberto && !el.open) el.showModal();
    if (!aberto && el.open) el.close();
  }, [aberto]);

  return (
    <header
      inert={ocultarCabecalho}
      aria-hidden={ocultarCabecalho}
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,opacity,background-color,border-color,backdrop-filter] duration-200 motion-reduce:transition-none ${ocultarCabecalho ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"} ${
        rolou
          ? "border-b border-[var(--line)] bg-[rgb(8_10_9/.72)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center" aria-label="Empreenda Sim, página inicial">
          <Image
            src="/empreenda-sim-logo.png"
            alt="Empreenda Sim"
            width={484}
            height={83}
            priority
            className="h-[22px] w-auto md:h-[26px]"
          />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-2 text-[0.95rem] text-muted transition-colors duration-200 hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AcaoAssinar className="hidden min-h-[46px] px-5 text-[0.9rem] sm:inline-flex">
            Quero fazer parte
          </AcaoAssinar>

          <button
            type="button"
            onClick={() => setAberto(true)}
            aria-label="Abrir menu de navegação"
            className="grid size-11 place-items-center rounded-full border border-[var(--line)] text-cream transition-colors duration-200 hover:border-[var(--line-strong)] lg:hidden"
          >
            <IconeMenu className="size-5" />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogo}
        onClose={() => setAberto(false)}
        onClick={(e) => {
          if (e.target === dialogo.current) setAberto(false);
        }}
        aria-label="Navegação"
        className="m-0 max-h-none max-w-none bg-transparent p-0 backdrop:bg-[rgb(4_6_5/.72)] backdrop:backdrop-blur-sm"
      >
        <div className="fixed inset-x-0 top-0 border-b border-[var(--line)] bg-[#0a0f0c] px-5 pb-8 pt-5">
          <div className="mb-7 flex items-center justify-between">
            <Image
              src="/empreenda-sim-logo.png"
              alt="Empreenda Sim"
              width={484}
              height={83}
              className="h-[22px] w-auto"
            />
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar menu"
              className="grid size-11 place-items-center rounded-full border border-[var(--line)] text-cream"
            >
              <IconeFechar className="size-5" />
            </button>
          </div>

          <nav aria-label="Principal (celular)">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href} className="border-t border-[var(--line)] first:border-t-0">
                  <Link
                    href={item.href}
                    onClick={() => setAberto(false)}
                    className="flex min-h-[60px] items-center font-display text-[1.45rem] tracking-[-0.02em]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <AcaoAssinar className="mt-7 w-full justify-center">
            Assinar por {PRECO.moeda} {PRECO.valor}
            {PRECO.periodo}
          </AcaoAssinar>
        </div>
      </dialog>
    </header>
  );
}
