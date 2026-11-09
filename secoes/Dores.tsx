import { DORES } from "@/lib/content";
import { RevelarTitulo } from "@/components/Revelar";
import { GlowCard } from "@/components/ui/spotlight-card";
import { TextEffect } from "@/components/ui/text-effect";

export default function Dores() {
  return (
    <section id="dores" aria-labelledby="dores-titulo" className="relative py-20 md:py-28">
      <div className="shell">
        <div>
          <RevelarTitulo
            id="dores-titulo"
            linhas={DORES.titulo}
            className="display section-title"
          />

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {DORES.itens.map((item, i) => (
              <li key={item.t}>
                <GlowCard>
                  <span aria-hidden="true" className="tnum font-display text-lg font-semibold text-green">
                    {i + 1}
                  </span>
                  <h3 className="display mt-6 text-[1.5rem] leading-[1.12] text-cream">{item.t}</h3>
                  <p className="mt-3 text-base text-muted">{item.d}</p>
                </GlowCard>
              </li>
            ))}
          </ol>

          <TextEffect className="mx-auto mt-12 max-w-[42ch] text-balance text-center text-[clamp(1.125rem,2.2vw,1.75rem)] leading-[1.3] tracking-[-0.025em] text-cream italic md:mt-16">
            {DORES.fecho}
          </TextEffect>
        </div>
      </div>
    </section>
  );
}
