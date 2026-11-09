"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { SplitText } from "./SplitText";

const MARGEM = "0px 0px -12% 0px";

/** A Hero mantém sua composição por linhas; títulos de seção quebram naturalmente. */
export function RevelarTitulo({
  linhas,
  className = "",
  as: Tag = "h2",
  id,
  destaque,
}: {
  linhas: readonly string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  destaque?: string;
}) {
  const trechos = Tag === "h1" ? linhas : [linhas.join(" ")];

  return (
    <SplitText as={Tag} className={className} id={id} texto={linhas.join(" ")} destaque={destaque}>
      {trechos.map((linha, i) => (
        <span key={linha} className="block">
          {destaque
            ? linha.split(destaque).map((parte, indice) => (
                <span key={indice}>
                  {indice > 0 && <span className="text-green">{destaque}</span>}
                  {parte}
                </span>
              ))
            : linha}
          {i < trechos.length - 1 && " "}
        </span>
      ))}
    </SplitText>
  );
}

/** Entrada discreta para texto corrido e grupos. */
export function Revelar({
  children,
  delay = 0,
  duracao = 0.38,
  deslocamento = 10,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duracao?: number;
  deslocamento?: number;
  className?: string;
}) {
  const reduz = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduz ? { opacity: 0 } : { opacity: 0, y: deslocamento }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: MARGEM }}
      transition={{ duration: reduz ? 0.16 : duracao, delay, ease: [0.23, 1, 0.32, 1] }}
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
