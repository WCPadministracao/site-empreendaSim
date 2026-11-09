import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const amsiPro = localFont({
  src: "./fonts/AmsiPro-Regular.otf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--fonte-marca",
});

const titulo = "Empreenda Sim — conhecimento para empresas fortes";
const descricao =
  "Ecossistema de desenvolvimento empresarial: cursos práticos, materiais de execução, comunidade, Cordex IA e benefícios em eventos presenciais. Assinatura de R$ 127 por mês.";

export const metadata: Metadata = {
  title: { default: titulo, template: "%s · Empreenda Sim" },
  description: descricao,
  applicationName: "Empreenda Sim",
  authors: [{ name: "WordCom Publicidade e Marketing" }],
  keywords: [
    "empreendedorismo",
    "gestão empresarial",
    "vendas",
    "finanças para pequenas empresas",
    "comunidade de empreendedores",
    "Empreenda Sim",
    "WordCom",
  ],
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    title: titulo,
    description: descricao,
    siteName: "Empreenda Sim",
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080a09",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={amsiPro.variable}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[90] focus:rounded-full focus:bg-green focus:px-5 focus:py-3 focus:font-semibold focus:text-[#03130a]"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
