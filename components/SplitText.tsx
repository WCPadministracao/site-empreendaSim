"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, GSAPSplitText);

/** Adaptação do efeito rise do React Bits para os títulos do site. */
export function animarTituloDividido(titulo: HTMLElement, gatilho = titulo) {
  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    const texto = GSAPSplitText.create(titulo, {
      type: "words,chars",
      tag: "span",
      smartWrap: true,
      charsClass: "split-char",
      aria: "auto",
    });
    let terminou = false;
    let onda: gsap.core.Tween | undefined;

    gsap.fromTo(texto.chars, { opacity: 0, y: "0.65em" }, {
      opacity: 1,
      y: 0,
      duration: 3,
      ease: "power3.out",
      stagger: 0.05,
      clearProps: "transform,opacity",
      scrollTrigger: { trigger: gatilho, start: "top 90%", once: true, refreshPriority: -2 },
      onComplete: () => { terminou = true; },
    });

    function passarMouse(evento: PointerEvent) {
      if (!terminou || evento.pointerType !== "mouse" || onda?.isActive()) return;

      let maisPerto = 0;
      let menorDistancia = Infinity;
      texto.chars.forEach((letra, indice) => {
        const { x, y, width, height } = letra.getBoundingClientRect();
        const distancia = Math.hypot(x + width / 2 - evento.clientX, y + height / 2 - evento.clientY);
        if (distancia < menorDistancia) {
          maisPerto = indice;
          menorDistancia = distancia;
        }
      });

      onda = gsap.to(texto.chars, {
        keyframes: { y: [0, -6, 0], easeEach: "sine.inOut" },
        duration: 0.45,
        stagger: { each: 0.018, from: maisPerto },
        clearProps: "transform",
      });
    }

    titulo.addEventListener("pointerenter", passarMouse);
    return () => {
      titulo.removeEventListener("pointerenter", passarMouse);
      onda?.kill();
      texto.revert();
    };
  });

  return () => media.revert();
}

export function SplitText({ as: Tag, id, className, texto, destaque, children }: {
  as: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  texto: string;
  destaque?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (ref.current) return animarTituloDividido(ref.current);
  }, { scope: ref, dependencies: [texto, destaque, Tag], revertOnUpdate: true });

  return <Tag ref={ref} id={id} className={className}>{children}</Tag>;
}
