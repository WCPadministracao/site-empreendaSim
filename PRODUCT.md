# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 (tokens CSS-first via `@theme`) + Motion (`motion/react`).
Decisão delegada ao agente e registrada aqui: o usuário pediu "preserve a stack atual sempre que ela for adequada" e o diretório estava vazio, então a stack foi escolhida — não herdada.

- **Next.js**: `next/image` (AVIF/WebP, dimensões reservadas → CLS), metadata API para SEO, Server Components por padrão — só os blocos com scroll viram `"use client"`.
- **Motion em vez de GSAP**: todo o movimento pedido (reveals, parallax discreto, progressão por rolagem, interações de botão) é coberto por `useScroll`/`useTransform`/`whileInView`, que são scroll-linked nativos e respeitam `useReducedMotion` de fábrica. GSAP + ScrollTrigger só se justificaria com *pinning* e timelines encadeadas — que a direção evita de propósito, porque pin em mobile briga com a rolagem nativa. Motion é ~34 kB gz e já é React; GSAP seria uma segunda runtime de animação.
- Sem biblioteca de componentes (shadcn/Radix): a página tem um acordeão e um menu. Ambos saem de `<details>`/`<dialog>` nativos com teclado e `aria` corretos, sem 40 kB de dependência.

## Users

Donos de pequenas e médias empresas, MEIs, prestadores de serviço e profissionais liberais brasileiros — em geral presos ao operacional, vendendo sem previsibilidade e sem leitura clara do caixa. Chegam pelo Instagram, por eventos presenciais ou por indicação, quase sempre no celular, muitas vezes fora do horário comercial. Não têm formação em administração e avaliam o site em segundos: o que é isso, serve pra mim, quanto custa.

## Product Purpose

O Empreenda Sim é um ecossistema de desenvolvimento empresarial (iniciativa da WordCom Publicidade e Marketing) vendido como assinatura mensal de R$ 127 via Hotmart. Reúne cursos e trilhas práticas, materiais de execução (diagnósticos, checklists, e-books), comunidade, o assistente Cordex IA e benefícios de Área Premium nos eventos presenciais. Sucesso = assinatura iniciada; sucesso secundário = visitante entende que é ecossistema, não curso avulso.

## Positioning

"Transformar conhecimento em decisão e decisão em resultado." O diferencial defensável não é o conteúdo isolado — é a combinação de conteúdo + material de aplicação + comunidade + IA de apoio + presença física (eventos), sob uma empresa de marketing que opera de verdade. Um concorrente que vende só aulas não pode copiar isso com honestidade.

## Operating Context

Fluxo real: descoberta (Instagram / evento) → página → checkout Hotmart → liberação de acesso após confirmação → consumo dentro da Hotmart + comunidade + Cordex IA → encontro presencial com Área Premium. Os eventos presenciais têm página própria (`/eventos`).

## Capabilities and Constraints

- Assinatura mensal **R$ 127/mês**, cancelável conforme condições do checkout. Pagamento e liberação pela **Hotmart**.
- Conteúdo organizado em trilhas na ordem de aplicação: fundamentos → marketing e IA → vendas → finanças → processos e gestão → pessoas e liderança.
- Cordex IA é assistente de apoio; **não** substitui consultor ou profissional especializado (está no FAQ e precisa continuar explícito).
- Os botões de adesão abrem a página do produto na Hotmart pelo endereço fornecido em `HOTMART_URL`.
- **Em aberto:** URL real do Instagram e das páginas de Política de Privacidade e Termos de Uso (também `#` na referência).
- `/eventos` existe na referência e é linkada; neste redesign ela é uma rota a preservar, não a reescrever sem briefing.

## Brand Commitments

- Nome: **Empreenda Sim**. Assinatura: "Uma iniciativa WordCom."
- Logo real em `public/empreenda-sim-logo.png` (lockup horizontal, fundo escuro).
- Paleta herdada e preservada: verde `#00B85F`, verde claro `#00C968`, verde profundo `#064C31`, tinta `#080A09`, creme `#F4F5ED`.
- Voz: direta, adulta, sem promessa de atalho — "Sem fórmulas mágicas", "Feito é melhor que perfeito", "Trabalhar mais não resolve uma empresa desorganizada".
- Especialistas nomeados: Gabriel Ursini (gestão e marketing), Vinicius Sasaki (IA e vendas), Neto Pouza (gestão financeira).

## Evidence on Hand

Reais, baixados da referência para `public/`:
- `empreenda-sim-logo.png`, `favicon.png`
- `team/gabriel-ursini.webp`, `team/vinicius-sasaki.webp`, `team/neto-pouza.webp`
- `experiencias/`: `comunidade.webp`, `conteudo.webp`, `conexoes.webp`, `participantes.webp`, `networking.webp`, `interacao.webp` (fotos reais de eventos)

**Não existe e não deve ser fabricado:** depoimento, nome de aluno, número de membros, faturamento, logo de cliente, nota de avaliação, data de evento, contagem de aulas.

## Product Principles

1. O visitante decide em segundos — a oferta (o que é, para quem, R$ 127/mês) precisa estar legível antes de qualquer rolagem longa.
2. Nunca prometer resultado; prometer método, aplicação e companhia.
3. Ecossistema é a tese: as partes (curso, material, comunidade, IA, evento) só valem apresentadas conectadas.
4. Mobile é o cenário principal de uso, não a redução do desktop.
5. Conteúdo real ou nada: ausência de prova é registrada, não preenchida.

## Accessibility & Inclusion

Público adulto amplo, leitura em celular e frequentemente em ambiente com luz irregular. Alvo WCAG 2.2 AA: contraste ≥4,5:1 em texto corrido, foco visível, alvos de toque ≥44 px, hierarquia de headings sequencial, `prefers-reduced-motion` respeitado em todo o movimento de rolagem.
