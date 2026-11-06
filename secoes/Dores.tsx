import { DORES } from "@/lib/content";
import { Acao } from "@/components/Acao";
import { ItemLista, Revelar, RevelarLista, RevelarTitulo } from "@/components/Revelar";

/** Degraus de recuo: as quatro afirmações descem junto com a trilha. */
const RECUO = ["lg:ml-0", "lg:ml-[7%]", "lg:ml-[14%]", "lg:ml-[21%]"];

export default function Dores() {
  return (
    <section id="dores" aria-labelledby="dores-titulo" className="relative py-20 md:py-28">
      <div className="shell">
        <div>
          <RevelarTitulo
            id="dores-titulo"
            linhas={DORES.titulo}
            className="display display-lg max-w-[18ch]"
          />

          <Revelar delay={0.12} className="mt-7">
            <p className="lede">{DORES.lede}</p>
          </Revelar>

          <RevelarLista className="mt-16 flex flex-col gap-12 md:gap-14">
            {DORES.itens.map((item, i) => (
              <ItemLista key={item.t} className={`max-w-[46ch] ${RECUO[i]}`}>
                <h3 className="display display-md text-cream">{item.t}</h3>
                <p className="mt-3 text-muted">{item.d}</p>
              </ItemLista>
            ))}
          </RevelarLista>

          <Revelar className="mt-20 max-w-[30ch] md:mt-28">
            <p className="display text-[clamp(1.5rem,3.4vw,2.2rem)] leading-[1.12] tracking-[-0.025em]">
              {DORES.fecho}
            </p>
            <div className="mt-9">
              <Acao href="#ecossistema" variante="fantasma">
                Ver como o ecossistema funciona
              </Acao>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
