/**
 * Camada de grão sobre a página inteira: mata o banding dos gradientes dos
 * blocos e dá textura. O fundo de cada assunto vive no seu <Bloco>.
 */
export default function Atmosfera() {
  return <div aria-hidden className="grain" />;
}
