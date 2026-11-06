import Link from "next/link";
import type { ReactNode } from "react";
import { IconeSeta } from "./Icones";
import { HOTMART_URL, HOTMART_IS_LIVE } from "@/lib/content";

type Props = {
  children: ReactNode;
  href?: string;
  variante?: "primaria" | "fantasma";
  className?: string;
  icone?: ReactNode;
};

/**
 * Botão. O nome diz o que acontece ao usar.
 * Alvo de toque mínimo de 56px de altura.
 */
export function Acao({
  children,
  href = "#assinatura",
  variante = "primaria",
  className = "",
  icone,
}: Props) {
  const classe = `cta ${variante === "primaria" ? "cta-primary" : "cta-ghost"} ${className}`;
  const externo = href.startsWith("http");

  const conteudo = (
    <>
      <span>{children}</span>
      {icone ?? <IconeSeta className="size-[18px] shrink-0" />}
    </>
  );

  if (externo) {
    return (
      <a className={classe} href={href} target="_blank" rel="noopener noreferrer">
        {conteudo}
      </a>
    );
  }

  return (
    <Link className={classe} href={href}>
      {conteudo}
    </Link>
  );
}

/** CTA de compra: aponta para o checkout oficial quando ele estiver configurado. */
export function AcaoAssinar({
  children = "Entrar para o ecossistema",
  className = "",
  variante = "primaria",
}: {
  children?: ReactNode;
  className?: string;
  variante?: "primaria" | "fantasma";
}) {
  return (
    <Acao
      href={HOTMART_URL}
      variante={variante}
      className={className}
      icone={HOTMART_IS_LIVE ? undefined : <IconeSeta className="size-[18px] shrink-0" />}
    >
      {children}
    </Acao>
  );
}
