# Empreenda Sim — site

Redesign da página do ecossistema Empreenda Sim (iniciativa WordCom).
A direção criativa está em [DESIGN.md](DESIGN.md); a verdade de produto, em [PRODUCT.md](PRODUCT.md).

## Rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:3100`. Build de produção: `npm run build && npm start`.

## O que precisa ser configurado antes de publicar

Os botões de adesão usam `HOTMART_URL` em `lib/content.ts` para abrir a página do produto na Hotmart.

Também ficaram de fora por não existir destino real na referência (todos apontavam para `#`):

- link do Instagram;
- Política de Privacidade e Termos de Uso — **importante**: uma página que vende assinatura
  recorrente normalmente precisa desses dois. Assim que as URLs existirem, acrescente em
  `lib/content.ts` e no rodapé (`secoes/Fechamento.tsx`);
- o formulário "receba as novidades" da página de eventos, que não tem endpoint conhecido.
  A página diz que cidade e data são anunciadas nos canais oficiais, em vez de exibir um
  formulário que não envia nada.

## Estrutura

```
app/            layout (fontes, metadata, SEO), globals.css (tokens), / e /eventos
components/     Bloco (fundo por assunto), Atmosfera (grão), Revelar, FotoParallax,
                Cabecalho, Acao (CTAs), Icones (SVG autoral),
                TextLoop (React Bits, copiado da fonte — ajuste por props)
secoes/         uma por assunto, na ordem da narrativa; Rodape.tsx fecha as duas páginas
lib/content.ts  todo o texto e os caminhos das imagens em um só lugar
public/         logo e fotos reais, baixadas da referência
```

Para trocar qualquer texto, preço ou foto: `lib/content.ts`. Nenhuma seção tem copy inline.

## Decisões que valem saber

- **Nenhuma seção tem fundo próprio.** O fundo vem do `<Bloco>` que a envolve em
  `app/page.tsx` (`tom="preto" | "verde" | "destaque"`). Para reordenar a página ou trocar
  a alternância de cor, mexa só ali.
- **Sem cards dentro dos blocos.** O conteúdo se organiza por grade, recuo e escala
  tipográfica. Fotos sangram pela borda e dissolvem por máscara (`--fade-l`, `--fade-r`,
  `--fade-y`).
- **CSS custom vive em `@layer base` / `@layer components`** no `globals.css`. Fora de
  camada, essas classes venceriam as utilities do Tailwind (`.cta` chegou a anular um
  `hidden`). Mantenha dentro das camadas.
- **Numeração 01–06** aparece só nas trilhas, onde a ordem é informação. As dores não são
  uma sequência, então não têm número.
- **`prefers-reduced-motion`** é respeitado em todo lugar: o parallax desliga, as entradas
  viram cross-fade de 160 ms e a seção Especialistas perde o pin, virando lista estática.
- **Duas libs de animação, de propósito.** Motion atende o site inteiro. GSAP +
  ScrollTrigger existem só em `secoes/Especialistas.tsx`, que reproduz a mecânica de pin e
  scrub da seção PRENSA do tarqstudio.com (ver DESIGN.md). Não use GSAP fora dali sem
  motivo.

- **Sem contato no rodapé** (endereço, telefone, e-mail, redes) porque esses dados não
  existem no material recebido. Quando existirem, entram em `RODAPE` no `lib/content.ts`.

## Verificado

- Build de produção limpo; TypeScript estrito sem erros.
- Contraste: nenhum texto abaixo de 4,5:1 (3:1 em texto grande) no varrimento automático
  da página inteira.
- Sem rolagem horizontal em 320, 375, 390, 768, 1280 e 1440.
- Headings sequenciais, todas as imagens com `alt` real, foco visível, menu do celular com
  `<dialog>` (Escape e armadilha de foco nativos).
- Detector de design do Impeccable: zero achados.

## Não verificado

- Comportamento em hardware real (iOS Safari / Android Chrome). As checagens foram em
  viewport emulado; gesto e rolagem com inércia pedem aparelho de verdade.
- Core Web Vitals em rede real — as fotos de evento somam ~690 kB e passam pelo
  `next/image`, mas o número de campo depende da hospedagem.
- A página `/eventos` foi reconstruída com o conteúdo da referência, sem briefing próprio.
