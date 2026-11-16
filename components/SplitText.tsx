"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, GSAPSplitText);

/** Adaptação do efeito rise do React Bits para os títulos do site. */
export function animarTituloDividido(titulo: HTMLElement, gatilho = titulo) {
  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    let texto: GSAPSplitText | undefined;
    let entrada: gsap.core.Tween | undefined;
    let onda: gsap.core.Tween | undefined;
    let terminou = false;
    let cancelado = false;

    // Observe a posição real do título, inclusive depois de fixações e redimensionamentos.
    const observador = new IntersectionObserver((registros) => {
      const registro = registros[registros.length - 1];
      if (cancelado || texto || !registro?.isIntersecting || registro.intersectionRatio < 0.01) return;

      observador.disconnect();
      texto = GSAPSplitText.create(titulo, {
        type: "words,chars",
        tag: "span",
        smartWrap: true,
        charsClass: "split-char",
        aria: "auto",
      });
      entrada = gsap.fromTo(texto.chars, { opacity: 0, y: "0.65em" }, {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: "power3.out",
        stagger: 0.05,
        clearProps: "transform,opacity",
        onComplete: () => { terminou = true; },
      });
    }, { threshold: 0.01 });

    function observar() {
      if (!cancelado) observador.observe(gatilho);
    }

    if (document.fonts.status === "loaded") observar();
    else void document.fonts.ready.then(observar);

    function passarMouse(evento: PointerEvent) {
      if (!texto || !terminou || evento.pointerType !== "mouse" || onda?.isActive()) return;

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
      cancelado = true;
      observador.disconnect();
      titulo.removeEventListener("pointerenter", passarMouse);
      onda?.kill();
      entrada?.kill();
      texto?.revert();
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
