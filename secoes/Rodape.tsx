import Image from "next/image";
import Link from "next/link";
import { NAV, RODAPE } from "@/lib/content";
import { AcaoAssinar } from "@/components/Acao";
import { IconeCadeado } from "@/components/Icones";
import { Revelar, RevelarTitulo } from "@/components/Revelar";

/**
 * Rodapé: fecha a página sozinho, já que as seções de dúvidas e de fechamento
 * saíram. Carrega a declaração da marca, a conversão, a navegação e as condições
 * reais de acesso.
 *
 * Não há endereço, telefone, e-mail nem redes aqui porque esses dados não existem
 * no material recebido — e inventar contato é pior do que omitir.
 */
export default function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative">
      <div className="shell">
        {/* declaração da marca + a última chance de converter */}
        <div className="grid gap-10 border-b border-[var(--line)] py-20 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <RevelarTitulo
            as="h2"
            linhas={[RODAPE.marca]}
            className="display display-lg max-w-[13ch]"
          />
          <Revelar delay={0.1} className="lg:pb-3">
            <p className="lede max-w-[38ch]">{RODAPE.chamada}</p>
            <AcaoAssinar className="mt-8">{RODAPE.cta}</AcaoAssinar>
          </Revelar>
        </div>

        {/* identidade · navegação · acesso */}
        <div className="grid gap-12 py-14 md:grid-cols-[1.4fr_0.8fr_1.1fr] md:gap-10 md:py-16">
          <div>
            <Link href="/" aria-label="Empreenda Sim, página inicial" className="inline-flex">
              <Image
                src="/empreenda-sim-logo.png"
                alt="Empreenda Sim"
                width={484}
                height={83}
                className="h-[26px] w-auto"
              />
            </Link>
            <p className="mt-6 max-w-[32ch] text-[0.98rem] leading-relaxed text-muted">
              {RODAPE.frase}
            </p>
          </div>

          <nav aria-labelledby="rodape-navegar">
            <p id="rodape-navegar" className="text-[0.85rem] text-muted">
              {RODAPE.navTitulo}
            </p>
            <ul className="mt-5 flex list-none flex-col gap-1 p-0">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-[1rem] transition-colors duration-200 hover:text-green md:min-h-[34px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[0.85rem] text-muted">{RODAPE.acessoTitulo}</p>
            <ul className="mt-5 flex max-w-[34ch] list-none flex-col gap-3 p-0 text-[0.95rem] leading-relaxed text-muted">
              {RODAPE.acesso.map((linha) => (
                <li key={linha}>{linha}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* barra legal */}
        <div className="flex flex-col gap-3 border-t border-[var(--line)] py-7 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.88rem] text-muted">
            © {ano} Empreenda Sim · {RODAPE.assinatura}
          </p>
          <p className="flex items-center gap-2 text-[0.88rem] text-muted">
            <IconeCadeado className="size-[16px] shrink-0 text-green" />
            Pagamento seguro processado pela Hotmart.
          </p>
        </div>
      </div>
    </footer>
  );
}
