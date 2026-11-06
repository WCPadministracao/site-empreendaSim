import { ASSINATURA, HOTMART_IS_LIVE, PRECO } from "@/lib/content";
import { AcaoAssinar } from "@/components/Acao";
import { IconeCadeado, IconeCheck } from "@/components/Icones";
import { Revelar, RevelarTitulo } from "@/components/Revelar";

export default function Assinatura() {
  return (
    <section
      id="assinatura"
      aria-labelledby="assinatura-titulo"
      className="relative pb-20 pt-[calc(5rem+max(37px,9.8vw))] md:pb-28 md:pt-[calc(7rem+max(37px,9.8vw))]"
    >
      <div className="shell">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10">
          <div className="lg:col-span-7">
            <RevelarTitulo
              id="assinatura-titulo"
              linhas={ASSINATURA.titulo}
              className="display section-title"
            />
            <Revelar className="mt-6">
              <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-[#b9cbc1]">
                {ASSINATURA.lede}
              </p>
            </Revelar>
          </div>

          {/* No celular, a decisão vem antes do detalhamento dos benefícios. */}
          <Revelar className="border-t border-[var(--line-strong)] pt-8 lg:col-span-5 lg:row-span-2 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="text-[1.05rem] font-medium text-cream">
              {ASSINATURA.oferta}
            </p>
            <p className="display mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-[1.65rem] font-medium text-[#b9cbc1]">{PRECO.moeda}</span>
              <span className="tnum text-[clamp(5rem,8vw,7rem)] leading-none">{PRECO.valor}</span>
              <span className="font-sans text-[1rem] font-normal tracking-normal text-[#b9cbc1]">{PRECO.periodo}</span>
            </p>
            <p className="mt-3 text-[0.95rem] text-[#b9cbc1]">{ASSINATURA.recorrencia}</p>

            <AcaoAssinar className="mt-7 w-full justify-center">{ASSINATURA.cta}</AcaoAssinar>

            <p className="mt-5 flex items-start gap-2 text-[0.85rem] leading-relaxed text-[#b9cbc1]">
              <IconeCadeado className="mt-0.5 size-4 shrink-0 text-green" />
              {ASSINATURA.seguranca}
            </p>

            <div className="mt-6 space-y-3 border-t border-[var(--line)] pt-6 text-[0.9rem] leading-relaxed text-[#b9cbc1]">
              <p>{ASSINATURA.acesso}</p>
              <p>{ASSINATURA.cancelamento}</p>
            </div>

            {!HOTMART_IS_LIVE && (
              <p className="mt-5 text-[0.85rem] leading-relaxed text-[#b9cbc1]">{ASSINATURA.pendente}</p>
            )}
          </Revelar>

          <Revelar className="lg:col-span-7 lg:row-start-2">
            <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {ASSINATURA.beneficios.map((beneficio) => (
                <li key={beneficio.titulo} className="flex gap-4 py-6">
                  <IconeCheck className="mt-1 size-5 shrink-0 text-green" />
                  <div>
                    <h3 className="text-[1.1rem] font-semibold leading-snug text-cream">{beneficio.titulo}</h3>
                    <p className="mt-2 max-w-[51ch] text-[0.95rem] leading-relaxed text-[#b9cbc1]">{beneficio.descricao}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
