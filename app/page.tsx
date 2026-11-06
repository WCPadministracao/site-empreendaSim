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
          <Assinatura />
        </Bloco>
        <Bloco tom="preto">
          <Dores />
        </Bloco>
        <Bloco tom="verde">
          <Ecossistema />
        </Bloco>
        <Bloco tom="preto">
          <Especialistas />
        </Bloco>
        <Bloco tom="verde">
          <Trilhas />
        </Bloco>
        <Bloco tom="preto">
          <Eventos />
        </Bloco>
      </main>

      <Bloco tom="verde">
        <Rodape />
      </Bloco>
    </>
  );
}
