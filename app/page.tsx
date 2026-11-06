import Atmosfera from "@/components/Atmosfera";
import Bloco from "@/components/Bloco";
import Cabecalho from "@/components/Cabecalho";
import Abertura from "@/secoes/Abertura";
import Assinatura from "@/secoes/Assinatura";
import Dores from "@/secoes/Dores";
import Ecossistema from "@/secoes/Ecossistema";
import Especialistas from "@/secoes/Especialistas";
import Eventos from "@/secoes/Eventos";
import Rodape from "@/secoes/Rodape";
import Trilhas from "@/secoes/Trilhas";

export default function Home() {
  return (
    <>
      <Atmosfera />
      <Cabecalho />

      {/* Cada assunto ocupa o seu próprio bloco, alternando preto e verde. */}
      <main id="conteudo" className="relative z-10">
        <Bloco tom="preto">
          <Abertura />
        </Bloco>
        <Bloco tom="verde">
          <Dores />
        </Bloco>
        <Bloco tom="preto">
          <Ecossistema />
        </Bloco>
        <Bloco tom="verde">
          <Especialistas />
        </Bloco>
        <Bloco tom="preto">
          <Trilhas />
        </Bloco>
        <Bloco tom="verde">
          <Eventos />
        </Bloco>
        <Bloco tom="destaque">
          <Assinatura />
        </Bloco>
      </main>

      <Bloco tom="preto">
        <Rodape />
      </Bloco>
    </>
  );
}
