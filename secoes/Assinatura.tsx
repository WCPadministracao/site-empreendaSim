import { ASSINATURA, HOTMART_IS_LIVE, PRECO } from "@/lib/content";
import { AcaoAssinar } from "@/components/Acao";
import { IconeCadeado, IconeCheck } from "@/components/Icones";
import { ItemLista, Revelar, RevelarLista, RevelarTitulo } from "@/components/Revelar";

export default function Assinatura() {
  return (
    <section id="assinatura" aria-labelledby="assinatura-titulo" className="relative py-20 md:py-28">
      {/* o bloco de destaque já carrega o verde mais claro da página;
          aqui só um realce suave atrás do preço */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 inset-y-0 -z-10"
        style={{
          background:
            "radial-gradient(58% 48% at 72% 50%, rgb(0 184 95 / .14), transparent 70%)",
        }}
      />

      <div className="shell">
        <div>
          <RevelarTitulo
            id="assinatura-titulo"
            linhas={ASSINATURA.titulo}
            className="display display-lg max-w-[16ch]"
          />
          <Revelar delay={0.12} className="mt-7">
            <p className="lede">{ASSINATURA.lede}</p>
          </Revelar>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-x-12">
          <RevelarLista className="flex flex-col gap-4 lg:col-span-7">
            {ASSINATURA.inclui.map((linha) => (
              <ItemLista key={linha} className="flex items-start gap-3.5">
                <IconeCheck className="mt-[3px] size-[19px] shrink-0 text-green" />
                <span className="text-[1.02rem] leading-relaxed">{linha}</span>
              </ItemLista>
            ))}
          </RevelarLista>

          <Revelar delay={0.1} className="lg:col-span-5">
            <p className="text-[0.95rem] text-muted">Assinatura mensal</p>
            <p className="display mt-1 flex items-baseline gap-1.5 text-[clamp(3.4rem,9vw,5.4rem)] leading-none">
              <span className="text-[0.38em] font-medium text-muted">{PRECO.moeda}</span>
              <span className="tnum">{PRECO.valor}</span>
              <span className="text-[0.22em] font-medium text-muted">{PRECO.periodo}</span>
            </p>

            <p className="mt-6 max-w-[40ch] text-[0.98rem] leading-relaxed text-muted">
              {ASSINATURA.condicoes}
            </p>

            <AcaoAssinar className="mt-8 w-full justify-center sm:w-auto">
              Quero entrar no ecossistema
            </AcaoAssinar>

            <p className="mt-5 flex items-center gap-2 text-[0.9rem] text-muted">
              <IconeCadeado className="size-[17px] shrink-0 text-green" />
              {ASSINATURA.seguranca}
            </p>

            {!HOTMART_IS_LIVE && (
              <p className="mt-5 max-w-[40ch] border-t border-[var(--line)] pt-5 text-[0.85rem] leading-relaxed text-muted">
                Configuração pendente: defina <code className="text-cream">NEXT_PUBLIC_HOTMART_URL</code>{" "}
                com a URL oficial do checkout e valide a oferta antes de publicar.
              </p>
            )}
          </Revelar>
        </div>
      </div>
    </section>
  );
}
