import { EVENTOS } from "@/lib/content";
import { Acao } from "@/components/Acao";
import FotoParallax from "@/components/FotoParallax";
import { Revelar, RevelarTitulo } from "@/components/Revelar";

/** Alturas e deslocamentos diferentes: a faixa respira como um ensaio, não como uma galeria. */
const COMPOSICAO = [
  "lg:col-span-7 lg:h-[64vh] lg:mt-0",
  "lg:col-span-5 lg:h-[46vh] lg:mt-24",
  "lg:col-span-6 lg:col-start-4 lg:h-[56vh] lg:-mt-10",
];

export default function Eventos() {
  return (
    <section id="eventos" aria-labelledby="eventos-titulo" className="relative py-20 md:py-28">
      <div className="shell">
        <div>
          <RevelarTitulo
            id="eventos-titulo"
            linhas={EVENTOS.titulo}
            className="display display-lg max-w-[17ch]"
          />
          <Revelar delay={0.12} className="mt-7">
            <p className="lede">{EVENTOS.lede}</p>
          </Revelar>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-x-8">
          {EVENTOS.legendas.map((foto, i) => (
            <figure key={foto.foto} className={`m-0 ${COMPOSICAO[i]}`}>
              <FotoParallax
                src={foto.foto}
                alt={foto.alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-[38vh] min-h-[230px] w-full lg:h-full"
                imgClassName="opacity-85"
                mascara="var(--fade-y)"
                intensidade={6}
              />
              <figcaption className="mt-4 max-w-[34ch] text-[0.98rem] text-muted">
                {foto.legenda}
              </figcaption>
            </figure>
          ))}
        </div>

        <Revelar className="mt-16">
          <Acao href="/eventos" variante="fantasma">
            Conhecer os eventos presenciais
          </Acao>
        </Revelar>
      </div>
    </section>
  );
}
