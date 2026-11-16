"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const UNIDADES = [
  { rotulo: "Dias", segundos: 86400, ciclo: Infinity },
  { rotulo: "Horas", segundos: 3600, ciclo: 24 },
  { rotulo: "Minutos", segundos: 60, ciclo: 60 },
  { rotulo: "Segundos", segundos: 1, ciclo: 60 },
] as const;

export function AnimatedCountdown({ targetDate }: { targetDate: string }) {
  const alvo = Date.parse(targetDate);
  const [segundos, setSegundos] = useState<number | null>(null);
  const reduzirMovimento = useReducedMotion();

  useEffect(() => {
    if (!Number.isFinite(alvo)) return;

    let timeout: number;
    function atualizar() {
      window.clearTimeout(timeout);
      const restante = Math.max(0, alvo - Date.now());
      setSegundos(Math.ceil(restante / 1000));
      if (restante > 0) timeout = window.setTimeout(atualizar, restante % 1000 || 1000);
    }

    atualizar();
    document.addEventListener("visibilitychange", atualizar);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("visibilitychange", atualizar);
    };
  }, [alvo]);

  if (!Number.isFinite(alvo)) return null;

  return (
    <div className="w-full max-w-lg">
      <p className="mb-3 text-sm font-semibold text-cream">
        {segundos === 0 ? "Contagem regressiva encerrada" : "Contagem regressiva para o evento"}
      </p>
      <div role="timer" aria-label="Tempo até o evento" aria-live="off" className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {UNIDADES.map(({ rotulo, segundos: divisor, ciclo }) => {
          const valor = segundos === null
            ? "–"
            : String(Math.floor(segundos / divisor) % ciclo).padStart(2, "0");

          return (
            <div key={rotulo} className="min-w-0 rounded-xl border border-green/25 border-t-green bg-ink-deep/95 px-0.5 py-3 text-center sm:py-5">
              <span className="relative grid h-[1em] place-items-center overflow-hidden text-[clamp(1.6rem,5vw,3.25rem)] leading-none font-bold text-green tnum">
                <span className="sr-only">{valor}</span>
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={valor}
                    aria-hidden="true"
                    initial={reduzirMovimento ? false : { y: "60%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduzirMovimento ? undefined : { y: "-60%", opacity: 0 }}
                    transition={{ duration: reduzirMovimento ? 0 : 0.22, ease: "easeOut" }}
                  >
                    {valor}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="mt-2 block text-[0.6875rem] text-cream/80 sm:text-xs">{rotulo}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
