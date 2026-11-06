import type { ReactNode } from "react";

type Tom = "preto" | "verde" | "destaque";

const TONS: Record<Tom, string> = {
  preto: "bloco bloco--preto",
  verde: "bloco bloco--verde",
  destaque: "bloco bloco--destaque",
};

/**
 * Um bloco por assunto. O fundo vive aqui — as seções lá dentro não declaram
 * o seu, para que a alternância preto/verde fique em um lugar só.
 */
export default function Bloco({
  tom,
  children,
}: {
  tom: Tom;
  children: ReactNode;
}) {
  return <div className={TONS[tom]}>{children}</div>;
}
