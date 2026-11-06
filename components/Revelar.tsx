"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const MARGEM = "0px 0px -12% 0px";

/**
 * Título que surge por máscara (o texto sobe por trás de um recorte),
 * em vez do fade-and-slide que toda seção de toda landing page usa.
 * Uma linha por filho, com atraso curto entre elas.
 */
export function RevelarTitulo({
  linhas,
  className = "",
  as: Tag = "h2",
  id,
}: {
  linhas: readonly string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
}) {
  const reduz = useReducedMotion();

  return (
    <Tag className={className} id={id}>
      {linhas.map((linha, i) => (
        /* revelação por recorte: o texto sobe por trás de uma máscara.
           clip-path em vez de translate percentual — a altura da linha muda
           quando a fonte carrega ou o texto quebra, e a porcentagem erra o alvo. */
        <motion.span
          key={linha}
          className="block"
          initial={
            reduz
              ? { opacity: 0 }
              : { clipPath: "inset(100% 0% -12% 0%)", y: 14, opacity: 0.001 }
          }
          whileInView={
            reduz
              ? { opacity: 1 }
              : { clipPath: "inset(0% 0% -12% 0%)", y: 0, opacity: 1 }
          }
          viewport={{ once: true, margin: MARGEM }}
          transition={
            reduz
              ? { duration: 0.16 }
              : { duration: 0.56, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }
          }
        >
          {linha}
        </motion.span>
      ))}
    </Tag>
  );
}

/** Entrada discreta para texto corrido e grupos. */
export function Revelar({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduz = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduz ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: MARGEM }}
      transition={{ duration: reduz ? 0.16 : 0.38, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

const listaPai: Variants = {
  oculto: {},
  visivel: { transition: { staggerChildren: 0.055 } },
};

const listaFilho: Variants = {
  oculto: { opacity: 0, y: 10 },
  visivel: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.23, 1, 0.32, 1] } },
};

/** Grupo com escalonamento curto — no máximo seis itens, senão o último arrasta. */
export function RevelarLista({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.ul
      className={className}
      variants={listaPai}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: MARGEM }}
    >
      {children}
    </motion.ul>
  );
}

export function ItemLista({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduz = useReducedMotion();
  return (
    <motion.li
      className={className}
      variants={reduz ? { oculto: { opacity: 0 }, visivel: { opacity: 1 } } : listaFilho}
    >
      {children}
    </motion.li>
  );
}
