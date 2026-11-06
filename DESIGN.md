# Design — Empreenda Sim

Direção criativa do redesign. Escrita antes do código; o código segue este documento.

## 1. Leitura da referência

O site atual acerta o conteúdo e erra a forma. A identidade (verde sobre quase-preto, voz adulta, fotos reais de evento) é boa e fica. O que não fica:

| Na referência | Problema | Decisão |
|---|---|---|
| ~9 seções, cada uma com fundo próprio | A página lê como slides empilhados | Um único fundo contínuo para a página inteira |
| Cards com borda e fundo em quase todo bloco | "Kit SaaS": tudo vira retângulo do mesmo peso | Cards eliminados; conteúdo ancorado em grade e em uma linha vertical |
| Eyebrows em caixa-alta acima de cada título (`O ECOSSISTEMA DE QUEM EMPREENDE`) | Rótulo que não informa, repetido 10×; é o tell nº 1 de página gerada | Removidos. O título carrega o próprio peso |
| `01 02 03 04` nas dores | Numeração sem sequência real | Removida nas dores; **mantida nas trilhas**, onde a ordem é informação ("na ordem em que consegue aplicar") |
| Arial (nenhuma webfont carregada) | Sem voz tipográfica | Família display própria |
| Marquee de palavras + ✦ + emojis como ícone | Decoração genérica | Marquee sai; ícones viram SVG autoral de traço único |
| Fotos dentro de molduras arredondadas | Foto tratada como thumbnail | Fotos em sangria, cortando a borda da viewport |

## 2. Conceito — blocos alternados

> **Revisão (a pedido do cliente).** A primeira versão usava uma trilha vertical contínua
> e um único fundo para a página inteira. O cliente pediu o caminho oposto: remover a
> linha lateral e separar os assuntos em blocos, pretos e verdes, como na referência.
> A trilha foi removida; o que está descrito abaixo é o que está no ar.

Cada assunto ocupa o seu próprio bloco, de largura total, com borda dura entre eles.
A alternância preto → verde é o ritmo da página e substitui a trilha como elemento de
continuidade: o leitor sabe que mudou de assunto porque o fundo mudou.

O fundo vive em um lugar só, `components/Bloco.tsx` (`tom="preto" | "verde" | "destaque"`).
Nenhuma seção declara o seu próprio — assim a sequência inteira se lê e se reordena em
`app/page.tsx`.

| Bloco | Tom |
|---|---|
| Abertura | preto |
| Dores | verde |
| Ecossistema | preto |
| Especialistas | verde |
| Trilhas | preto |
| Eventos | verde |
| Assinatura | **destaque** (verde mais claro — é a decisão) |
| Dúvidas | preto |
| Fechamento | verde |

O que **não** voltou: cards de ícone + título + texto como estrutura, eyebrows em
caixa-alta, numeração sem sequência. Os blocos separam assuntos; dentro de cada bloco o
conteúdo continua ancorado em grade, recuo e escala tipográfica.

## 3. Fundos

- `--bloco preto`: `#080A09` chapado.
- `--bloco verde`: gradiente `#06241A → #04150F → #061B13` a 168°.
- `--bloco destaque`: gradiente `#073A26 → #052418 → #042A1B`, mais um realce radial suave
  atrás do preço.
- Uma camada de grão fixa (`components/Atmosfera.tsx`) cobre a página e mata o banding dos
  gradientes.

Contraste conferido sobre a parada mais clara de cada gradiente: texto secundário fica em
5,2:1 ou acima.

## 3b. Especialistas — reprodução da seção PRENSA (tarqstudio.com)

A pedido do cliente, esta seção reproduz a seção PRENSA do tarqstudio.com/es. A inspeção
foi feita no navegador, rolando devagar, para frente e para trás, medindo o DOM a cada
passo. Viewport 1440×900 nos dois lados.

### Medido na referência × medido aqui

| Comportamento | Referência | Aqui |
|---|---|---|
| Topo do elemento preso durante a sequência | `-181` constante | `180` constante |
| Foto fechada | 264 × 264 | 264 × 264 |
| Foto aberta | 520 (fator 1,97×) | 520 |
| Topo da linha ativa | `187` fixo | `180` fixo |
| Passo entre linhas | 280–288 | 297 |
| Colunas laterais | cedem (508 → 461 / 962) | cedem (`flex-1`, simétricas) |
| Progressão da foto | scrub contínuo preso à rolagem | scrub contínuo (`scrub: 1`) |
| Rolagem reversa | simétrica, sem salto | simétrica, sem salto |
| Hover | nenhum efeito visual | nenhum efeito visual |
| Título durante o pin | já saiu pela borda de cima | idem |
| Celular | layout próprio, sem pin | idem |

### Reproduzido

Pin do contêiner das linhas com `ScrollTrigger` (`scrub: 1`, que dá o atraso que no site
de referência vem do ScrollSmoother). Timeline por linha, `ease: "none"`: abre, segura,
fecha e entrega para a próxima, que sobe até a mesma altura. A última fica aberta até o
pin soltar. Tudo reversível porque é scrub puro, nada é one-shot.

### Texto estático, por decisão

Na referência as colunas laterais encolhem junto com o crescimento da foto, e o texto
reflui a cada quadro. Aqui os dois blocos de texto têm **largura fixa**
(`clamp(220px, 23vw, 320px)`, na classe `.linha-lado`) e **não animam**: a foto cresce
para dentro do vão entre eles. Medido durante toda a rolagem, o bloco da bio fica em
`x: 169, largura: 246, altura: 148` — os mesmos três números em cada posição.

A abertura máxima da foto é limitada por `shell - lado × 2`, então ela nunca invade os
blocos de texto em nenhuma largura de tela.

### Ritmo

`CURSO_POR_LINHA = 1.55` — cada linha consome 1,55 tela de rolagem. É a constante a mexer
para acelerar ou desacelerar a sequência.

### Observado e deliberadamente não reproduzido

1. **Deslize horizontal do trilho.** Depois que a foto chega a 520, a rolagem vertical
   passa a mover o `scrollLeft` do `itemContentWrapper`: medi `0 → 53 → 159 → 371 → 478`,
   com `scrollWidth` 2720 contra 1360 visíveis. Revela texto longo e mais três imagens de
   286px. Cada item da referência é uma matéria de revista; cada especialista aqui tem
   nome, área, uma bio curta e uma foto. Reproduzir exigiria inventar texto e imagens.
   Decisão do cliente: fica de fora. Com material real, entra sem refazer o resto.
2. **Canto arredondado e sobreposição de "panels" na entrada.** Pertence ao sistema
   global de seções do site de referência (`panel-container panel`); reproduzir exigiria
   mexer em todas as seções do Empreenda Sim.

### Decisão de biblioteca

GSAP + ScrollTrigger nesta seção, a pedido do cliente (`@gsap/react` pelo `useGSAP`, que
limpa timelines e triggers no unmount). Custo medido: +43 kB no First Load da home.
Motion continua atendendo o resto do site — `Revelar`, `FotoParallax`, `Cabecalho` e
`Atmosfera` não mudaram.

Responsividade por `gsap.matchMedia()`: o pin só existe em
`(min-width: 1024px) and (prefers-reduced-motion: no-preference)`. Fora disso a seção é
uma lista estática legível. As medidas são relidas a cada `refreshInit` do ScrollTrigger,
então redimensionar não deixa altura presa.

Implementação: `secoes/Especialistas.tsx` + `.foto-prensa` no `globals.css`. Nenhuma
outra seção foi tocada.

## 3c. Faixa TextLoop no fecho da abertura

Componente `TextLoop` do React Bits (reactbits.dev), copiado sem alterações em
`components/TextLoop.jsx` + `TextLoop.css`. Os tipos vivem ao lado em `TextLoop.d.ts`,
para a fonte continuar atualizável a partir do upstream. Depende de `gsap`, que o projeto
já usa na seção Especialistas — nenhuma dependência nova entrou.

Duas fitas cruzadas a 12° repetindo "EMPREENDA SIM ✦", em sangria de ponta a ponta,
fechando a abertura e encostando no bloco verde seguinte.

O componente desenha num viewBox de 1200×520, mas com `shape: "line"` o conteúdo ocupa
só ~220 dessas unidades. A classe `.hero-loop` recorta o vazio: altura `19.6vw`, que
acompanha a escala do SVG em qualquer largura (266px a 1440, 76px a 390), com a faixa
centrada dentro.

`prefers-reduced-motion` é respeitado pelo próprio componente, que zera a velocidade
base. O SVG tem `role="img"` e `aria-label="empreenda sim"`, então a repetição não é lida
em loop por leitor de tela.

`ribbonColor` é `#00B85F`, o verde da marca — o mesmo dos botões e dos destaques. As
props originais traziam `#3fc13f`, trocado a pedido do cliente para não haver dois verdes
na mesma tela. Texto em `#120F17` sobre ele dá 7,0:1 de contraste.

## 4. Paleta

Herdada da marca, com os papéis fixados (nenhuma cor nova introduzida):

| Token | Valor | Papel |
|---|---|---|
| `--ink` | `#080A09` | Fundo base |
| `--ink-deep` | `#0A1711` | Meio do gradiente |
| `--green` | `#00B85F` | Ação, linha, foco |
| `--green-bright` | `#00C968` | Hover, ponto de progresso |
| `--green-deep` | `#064C31` | Sombra/bloom |
| `--cream` | `#F4F5ED` | Texto primário |
| `--muted` | `#9BA8A1` | Texto secundário (4,9:1 sobre `--ink`) |
| `--line` | `rgba(244,245,237,.14)` | Régua de 1px, só onde informa |

Sem gradiente em texto. Sem glass decorativo. O verde é ação e caminho — nunca preenchimento de fundo de bloco.

## 5. Tipografia

| Papel | Família | Tratamento |
|---|---|---|
| Display | **Bricolage Grotesque** (variável: `opsz` 12–96, `wdth` 75–100, `wght` 200–800) | `clamp()` até 6rem, `letter-spacing: -0.035em`, `line-height: 0.95`, `text-wrap: balance` |
| Corpo / UI | **Inter** | 17–19px, `line-height: 1.65`, medida 62–70ch |

Bricolage é escolhida pelo eixo `wdth`: no celular os títulos **comprimem** em vez de encolher, então continuam grandes e expressivos em 360px — que é exatamente o pedido de "títulos grandes e bem posicionados" sem quebrar o mobile. Eixo `opsz` ajusta o desenho por tamanho (tracking negativo real no display, neutro no corpo), em linha com a disciplina de tracking por tamanho.

Nada de monoespaçada como fantasia de "tecnologia". Nada de caixa-alta como rótulo.

## 6. Composição

Grade de 12 colunas, `max-width: 1240px`, com 20px de margem no celular e 40px no desktop.

- As composições alternam de lado — nunca duas seguidas iguais.
- Fotos de evento sangram para fora da grade e cortam a borda direita ou esquerda da viewport.
- Sobreposições sutis: títulos invadem a área da foto em até 8%, com a foto escurecida por trás apenas onde há texto (máscara em gradiente, não uma caixa).
- Nenhum bloco é centralizado por padrão; centralização só no fechamento, onde o eixo único é o ponto.

## 7. Movimento

Princípio: o movimento serve a leitura. Entrada de títulos por recorte é o momento autoral; o resto é feedback.

| Momento | Técnica | Valores |
|---|---|---|
| Entrada de títulos | máscara `clip-path` subindo (não fade-and-slide) | 520ms, `cubic-bezier(.23,1,.32,1)` |
| Entrada de parágrafos | opacidade + 10px | 380ms, stagger 50ms, no máximo 6 itens |
| Parallax das fotos | `yPercent` −8 a +8 por `useTransform` | só em camada de imagem, nunca em texto |
| Trilhas (lista interativa) | item ativo troca a foto ao lado, com blur de 6px na troca | 260ms |
| Botões | `scale(0.97)` no `:active`, brilho varrendo via `clip-path` no hover | 140ms `ease-out` |
| Acordeão do FAQ | altura via `grid-template-rows: 0fr → 1fr` | 240ms `ease-out` |

Deliberadamente **sem**: pinning de seção, scroll sequestrado, smooth-scroll de biblioteca, contador animado, marquee, texto letra-a-letra, confete.

`prefers-reduced-motion: reduce` → parallax desligado e entradas viram cross-fade de 160 ms. Nada some.

## 8. Ordem da página

1. **Abertura** — título em três linhas ("Venda mais. / Organize sua empresa. / Cresça com direção."), CTA e preço já visíveis. *Hero novo a caminho do cliente.*
2. **A verdade que ninguém conta** (dores) — quatro afirmações em escada tipográfica descendente, sem cards, sem números.
3. **O ecossistema** — as cinco partes conectadas pela trilha, com a foto de comunidade em sangria.
4. **Especialistas** — editorial: foto grande, nome em display, especialidade em corpo. Três composições diferentes entre si.
5. **Trilhas de conhecimento** — lista interativa 01→06 (numeração earned), foto trocando conforme o item ativo.
6. **Eventos presenciais** — a faixa mais fotográfica da página; fotos reais em sangria, texto mínimo.
7. **Assinatura R$ 127** — o bloco de destaque, o verde mais claro da página, porque é a decisão.
8. **Rodapé** — fecha a página sozinho: a declaração da marca
   ("Feito é melhor que perfeito."), a última chamada com o CTA, depois identidade,
   navegação e as condições reais de acesso, e a barra legal.

*(As seções de dúvidas e de fechamento foram removidas a pedido do cliente. O texto das
duas continua em `lib/content.ts`, anotado, porque é real e revisado — este projeto não
tem versionamento, então apagar seria perder. A frase "Feito é melhor que perfeito."
migrou para o rodapé.)*

Dores antes de ecossistema: a referência abre com oferta e só depois nomeia o problema. Invertido, o visitante se reconhece antes de ser convidado.

## 9. Piso de qualidade

Contraste AA verificado; foco visível em verde com `outline-offset: 3px`; `::selection`, caret e scrollbar tematizados; alvos ≥44px; headings sequenciais; `next/image` com `sizes` e dimensões reservadas; sem rolagem horizontal em 320px; `alt` real em toda foto de pessoa.
