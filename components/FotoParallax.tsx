"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Foto em sangria com parallax discreto.
 * O movimento fica na camada de imagem — nunca no texto.
 */
export default function FotoParallax({
  src,
  alt,
  sizes,
  className = "",
  imgClassName = "",
  intensidade = 8,
  priority = false,
  objectPosition,
  mascara,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  intensidade?: number;
  priority?: boolean;
  objectPosition?: string;
  /** gradiente que dissolve a borda da foto no fundo, para ela não virar um retângulo */
  mascara?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduz = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensidade}%`, `${intensidade}%`]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={mascara ? { maskImage: mascara, WebkitMaskImage: mascara } : undefined}
    >
      <motion.div
        className="absolute inset-0"
        style={reduz ? undefined : { y, scale: 1 + intensidade / 100 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
          style={objectPosition ? { objectPosition } : undefined}
        />
      </motion.div>
    </div>
  );
}
