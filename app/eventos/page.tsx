import type { Metadata } from "next";
import Link from "next/link";
import Atmosfera from "@/components/Atmosfera";
import Cabecalho from "@/components/Cabecalho";
import Bloco from "@/components/Bloco";
import Rodape from "@/secoes/Rodape";
import FotoParallax from "@/components/FotoParallax";
import { Acao, AcaoAssinar } from "@/components/Acao";
import { Revelar, RevelarTitulo } from "@/components/Revelar";

export const metadata: Metadata = {
  title: "Eventos presenciais",
  description:
    "Os eventos Empreenda Sim reúnem empreendedores, especialistas e empresas para compartilhar experiências, discutir desafios reais e gerar novas oportunidades.",
};

export default function EventosPage() {
  return (
    <>
      <Atmosfera />
      <Cabecalho />

      <main id="conteudo" className="relative z-10">
        <Bloco tom="preto">
          <section
            aria-labelledby="eventos-hero"
            className="pb-20 pt-[132px] md:pb-28 md:pt-[168px]"
          >
            <div className="shell">
              <div className="max-w-[760px]">
                <RevelarTitulo
                  as="h1"
                  id="eventos-hero"
                  linhas={["Conteúdo, conexões", "e negócios presenciais."]}
                  className="display display-xl"
                />
                <Revelar delay={0.14} className="mt-8">
                  <p className="lede">
                    Os eventos Empreenda Sim reúnem empreendedores,
                    especialistas e empresas para compartilhar experiências,
                    discutir desafios reais e gerar novas oportunidades.
                  </p>
                </Revelar>
              </div>
            </div>
          </section>
        </Bloco>

        <Bloco tom="verde">
          <FotoParallax
            src="/experiencias/comunidade.webp"
            alt="Participantes reunidos em uma edição presencial do Empreenda Sim"
            sizes="100vw"
            className="h-[52vh] min-h-[280px] w-full md:h-[64vh]"
            imgClassName="opacity-80"
            mascara="var(--fade-y)"
            priority
          />

          <section aria-labelledby="agenda" className="py-24 md:py-32">
            <div className="shell">
              <div>
                <RevelarTitulo
                  id="agenda"
                  linhas={["Agenda de eventos", "presenciais."]}
                  className="display section-title"
                />

                <Revelar delay={0.12} className="mt-14 max-w-[52ch]">
                  <p className="text-[0.95rem] font-medium text-green">
                    Em breve
                  </p>
                  <h3 className="display display-md mt-2">
                    Próxima etapa Empreenda Sim
                  </h3>
                  <p className="mt-4 text-muted">
                    Um encontro para empreendedores com conteúdo aplicável,
                    troca de experiências, networking e novas oportunidades de
                    negócios.
                  </p>
                  <p className="mt-5 border-t border-[var(--line)] pt-5 text-[0.95rem] text-muted">
                    Cidade, data e inscrições serão anunciadas nos canais
                    oficiais do Empreenda Sim.
                  </p>
                  <div className="mt-9">
                    <AcaoAssinar>Fazer parte do ecossistema</AcaoAssinar>
                  </div>
                </Revelar>
              </div>
            </div>
          </section>
        </Bloco>

        <Bloco tom="destaque">
          <section
            aria-labelledby="eventos-fecho"
            className="py-24 text-center md:py-36"
          >
            <div className="shell flex flex-col items-center">
              <RevelarTitulo
                id="eventos-fecho"
                linhas={[
                  "Assinantes têm Área Premium",
                  "nos encontros presenciais.",
                ]}
                className="display section-title"
              />
              <Revelar delay={0.16} className="mt-10">
                <Acao href="/#assinatura">Ver o que a assinatura inclui</Acao>
              </Revelar>
              <Revelar delay={0.22} className="mt-10">
                <Link
                  href="/"
                  className="text-[0.98rem] text-muted underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:text-cream"
                >
                  Voltar para a página inicial
                </Link>
              </Revelar>
            </div>
          </section>
        </Bloco>
      </main>

      <Bloco tom="preto">
        <Rodape />
      </Bloco>
    </>
  );
}
