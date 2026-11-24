import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import MetallicButton from "@/components/ui/button-metallic";
import { EVENTO_CAMPINAS_URL, HOTMART_URL } from "@/lib/content";
import BackgroundVideo from "./background-video";
import styles from "./page.module.css";

const title = "Links oficiais";
const description =
  "Inscreva-se na Etapa Campinas, conheça a comunidade e acesse o site do Empreenda Sim.";
const bioUrl = "https://empreendasim.com.br/bio";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: bioUrl },
  openGraph: { title: `${title} · Empreenda Sim`, description, url: bioUrl },
  twitter: { card: "summary", title: `${title} · Empreenda Sim`, description },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#080a09",
  viewportFit: "cover",
};

const cards = [
  {
    title: "Etapa Campinas",
    description: "Garanta sua inscrição pelo Sympla.",
    href: EVENTO_CAMPINAS_URL,
  },
  {
    title: "Faça Parte",
    description: "Conheça a comunidade na Hotmart.",
    href: HOTMART_URL,
  },
  {
    title: "Site",
    description: "Explore o ecossistema Empreenda Sim.",
    href: "https://empreendasim.com.br/",
  },
];

export default function BioPage() {
  return (
    <main id="conteudo" className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1>
            <Image
              src="/empreenda-sim-logo.png"
              alt="Empreenda Sim"
              width={484}
              height={83}
              sizes="252px"
              priority
              className={styles.logo}
            />
          </h1>
        </header>

        <nav aria-label="Links oficiais do Empreenda Sim">
          <ul className={styles.cards}>
            {cards.map((card) => (
              <li key={card.href}>
                <MetallicButton href={card.href} className={styles.card}>
                  <span className={styles.cardContent}>
                    <span className={styles.copy}>
                      <span className={styles.title}>{card.title}</span>
                      <span className={styles.description}>{card.description}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" className={styles.arrow} />
                  </span>
                </MetallicButton>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <BackgroundVideo />
    </main>
  );
}
