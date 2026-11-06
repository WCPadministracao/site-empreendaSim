import { ECOSSISTEMA } from "@/lib/content";
import { AcaoAssinar } from "@/components/Acao";
import { ICONES } from "@/components/Icones";
import { ItemLista, Revelar, RevelarLista, RevelarTitulo } from "@/components/Revelar";

/** Cada parte ocupa colunas diferentes: nenhuma composição se repete. */
const COLUNAS = [
  "lg:col-start-1 lg:col-end-7",
  "lg:col-start-8 lg:col-end-13 lg:mt-28",
  "lg:col-start-2 lg:col-end-8 lg:-mt-10",
  "lg:col-start-8 lg:col-end-13",
];

export default function Ecossistema() {
  return (
    <section id="ecossistema" aria-labelledby="ecossistema-titulo" className="relative py-20 md:py-28">
      <div className="shell">
        <div>
          <RevelarTitulo
            id="ecossistema-titulo"
            linhas={ECOSSISTEMA.titulo}
            className="display section-title"
          />
          <Revelar delay={0.12} className="mt-7">
            <p className="lede">{ECOSSISTEMA.lede}</p>
          </Revelar>
        </div>

        <RevelarLista className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
          {ECOSSISTEMA.partes.map((parte, i) => {
            const Icone = ICONES[parte.icone as keyof typeof ICONES];
            return (
              <ItemLista
                key={parte.t}
                className={`${COLUNAS[i]}`}
              >
                <Icone className="size-7 text-green" />
                <p className="mt-5 text-[0.95rem] font-medium text-green">{parte.acao}</p>
                <h3 className="display display-md mt-2 max-w-[18ch]">{parte.t}</h3>
                <p className="mt-4 max-w-[44ch] text-muted">{parte.d}</p>
              </ItemLista>
            );
          })}
        </RevelarLista>

        <Revelar className="mt-16">
          <AcaoAssinar>Quero ter acesso a tudo isso</AcaoAssinar>
        </Revelar>
      </div>
    </section>
  );
}
