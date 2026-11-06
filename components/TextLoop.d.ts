import type { CSSProperties } from "react";

/**
 * Tipos para TextLoop.jsx (React Bits). Escritos a partir da tabela de props da
 * documentação do componente — a fonte em .jsx fica intocada para poder ser
 * atualizada a partir do upstream.
 */
export interface TextLoopProps {
  /** Frase repetida ao longo da curva. */
  text?: string;
  /** Curva pronta em que o texto corre. */
  shape?: "wave" | "circle" | "infinity" | "arch" | "line";
  /** `d` de um path SVG próprio, num viewBox de 1200×520. Ignora `shape`. */
  path?: string;
  /** Velocidade ao longo do caminho, em unidades por segundo. */
  speed?: number;
  direction?: "forward" | "reverse";
  /** Glifo entre cada repetição. */
  separator?: string;
  /** Amplitude da onda, ou raio das formas fechadas. */
  curviness?: number;
  /** Gira o laço inteiro, em graus. */
  tilt?: number;
  /** Segunda faixa cruzando a primeira em X, correndo no sentido oposto. */
  cross?: boolean;
  crossColor?: string;
  /** Ângulo entre as duas faixas, em graus. */
  crossAngle?: number;
  /** Arrastar para embalar o laço; o arremesso mantém a inércia. */
  draggable?: boolean;
  /** Quanto a rolagem da página empurra o laço. 0 desliga. */
  scrollBoost?: number;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  uppercase?: boolean;
  /** Desenha as letras em contorno em vez de preenchidas. */
  outline?: boolean;
  outlineWidth?: number;
  /** Cor do texto. Sem valor, branco sobre a fita. */
  color?: string;
  /** Faixa sólida atrás do texto. */
  ribbon?: boolean;
  ribbonColor?: string;
  ribbonWidth?: number;
  /** Esmaece o laço nas bordas, de 0 (corte seco) a 1 (fade largo). */
  edgeFade?: number;
  /** Freia o laço enquanto o ponteiro está sobre ele. */
  pauseOnHover?: boolean;
  className?: string;
  style?: CSSProperties;
}

declare const TextLoop: (props: TextLoopProps) => JSX.Element;
export default TextLoop;
