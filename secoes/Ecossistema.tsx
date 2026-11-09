import { ECOSSISTEMA } from "@/lib/content";
import { ICONES } from "@/components/Icones";
import { Revelar, RevelarTitulo } from "@/components/Revelar";

export default function Ecossistema() {
  return (
    <section id="ecossistema" aria-labelledby="ecossistema-titulo" className="relative py-20 md:py-28">
      <div className="shell">
        <div className="max-w-5xl">
          <RevelarTitulo
            id="ecossistema-titulo"
            linhas={ECOSSISTEMA.titulo}
            className="display section-title"
          />

          <ul role="list" className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)] md:mt-12">
            {ECOSSISTEMA.partes.map((parte, indice) => {
              const Icone = ICONES[parte.icone];
              return (
                <li key={parte.t} className="py-5 md:py-6">
                  <Revelar
                    delay={indice * 0.18}
                    duracao={0.75}
                    deslocamento={5}
                    className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-x-4 gap-y-1.5 md:grid-cols-[1.5rem_minmax(0,1fr)_minmax(0,1.5fr)] md:gap-x-6"
                  >
                    <Icone className="mt-0.5 size-6 text-green" />
                    <h3 className="font-display text-xl leading-tight font-semibold text-cream">{parte.t}</h3>
                    <p className="col-start-2 max-w-[52ch] text-base leading-relaxed text-muted md:col-start-3">{parte.d}</p>
                  </Revelar>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
