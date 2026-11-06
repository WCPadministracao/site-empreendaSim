/**
 * Todo o texto da página vive aqui.
 * Conteúdo real, herdado do site de referência. Nada foi inventado:
 * sem depoimento, sem número de membros, sem data de evento, sem logo de cliente.
 */

/**
 * Checkout oficial da Hotmart.
 * A referência ainda aponta `#` neste botão, então a URL real não é conhecida.
 * Defina NEXT_PUBLIC_HOTMART_URL antes de publicar — e valide a oferta no checkout.
 * Sem a variável, o CTA leva à seção de assinatura, que explica a oferta.
 */
export const HOTMART_URL = process.env.NEXT_PUBLIC_HOTMART_URL || "#assinatura";
export const HOTMART_IS_LIVE = Boolean(process.env.NEXT_PUBLIC_HOTMART_URL);

export const PRECO = { valor: "127", moeda: "R$", periodo: "/mês" } as const;

export const NAV = [
  { href: "#ecossistema", label: "O ecossistema" },
  { href: "#trilhas", label: "Trilhas" },
  { href: "#especialistas", label: "Especialistas" },
  { href: "/eventos", label: "Eventos presenciais" },
] as const;

export const HERO = {
  titulo: ["Venda mais.", "Organize sua empresa.", "Cresça com direção."],
  lede: "Cursos práticos, comunidade, ferramentas, Cordex IA e benefícios em eventos presenciais. Tudo para você aplicar no seu negócio, em um único lugar.",
  nota: "O próximo nível da sua empresa começa com uma decisão: empreender melhor.",
} as const;

export const DORES = {
  titulo: ["Trabalhar mais não resolve", "uma empresa desorganizada."],
  lede: "Você pode até aumentar o faturamento. Mas, sem gestão, cada novo cliente também traz mais cobrança, retrabalho e incêndios.",
  itens: [
    {
      t: "Você é o gargalo",
      d: "Tudo depende da sua aprovação, da sua memória e do seu tempo.",
    },
    {
      t: "Vende sem previsibilidade",
      d: "Um mês é bom. O outro depende de indicação, sorte e urgência.",
    },
    {
      t: "Fatura, mas não vê dinheiro",
      d: "O caixa gira, as contas chegam e a margem continua um mistério.",
    },
    {
      t: "Aprende, mas não aplica",
      d: "Conteúdo demais. Direção, acompanhamento e execução de menos.",
    },
  ],
  fecho:
    "O Empreenda Sim existe para transformar conhecimento em decisão e decisão em resultado.",
} as const;

export const ECOSSISTEMA = {
  titulo: ["Conteúdo, conexão", "e ferramentas para agir."],
  lede: "O Empreenda Sim reúne o que o empreendedor normalmente procura separado. Você aprende, leva para a empresa, troca com outros membros e conta com apoio para continuar.",
  partes: [
    {
      acao: "Aprenda",
      t: "Cursos e trilhas práticas",
      d: "Conteúdos sobre gestão, vendas, marketing, finanças, tecnologia, IA, processos e pessoas.",
      icone: "aprenda",
    },
    {
      acao: "Aplique",
      t: "Materiais de execução",
      d: "Diagnósticos, checklists, e-books e atividades para usar dentro da empresa.",
      icone: "aplique",
    },
    {
      acao: "Conte com apoio",
      t: "Cordex IA",
      d: "Um assistente virtual preparado para apoiar dúvidas e decisões do seu negócio.",
      icone: "apoio",
    },
    {
      acao: "Conecte-se",
      t: "Comunidade e eventos",
      d: "Troque experiências e tenha benefícios exclusivos nos eventos presenciais.",
      icone: "conecte",
    },
  ],
} as const;

export const ESPECIALISTAS = {
  titulo: ["Conteúdo criado por quem", "vive a empresa na prática."],
  lede: "Experiências diferentes, reunidas para ajudar você a tomar decisões melhores e aplicar o conhecimento no seu negócio.",
  pessoas: [
    {
      nome: "Gabriel Ursini",
      area: "Gestão empresarial e marketing",
      bio: "Empreendedor e gestor da WordCom. Conduz os conteúdos de gestão, marketing, operação e vendas, com foco em estruturar a empresa para crescer com consistência.",
      foto: "/team/gabriel-ursini.webp",
      alt: "Gabriel Ursini em produção de conteúdo",
      w: 1400,
      h: 934,
    },
    {
      nome: "Vinicius Sasaki",
      area: "IA e vendas",
      bio: "Especialista em Inteligência Artificial aplicada ao contexto comercial. Traduz tecnologia em ganho de produtividade e em uma operação de vendas mais previsível.",
      foto: "/team/vinicius-sasaki.webp",
      alt: "Vinicius Sasaki durante palestra",
      w: 1400,
      h: 934,
    },
    {
      nome: "Neto Pouza",
      area: "Gestão financeira",
      bio: "Especialista em gestão financeira. Trabalha margem, fluxo de caixa e leitura de indicadores para que os números orientem as decisões da empresa.",
      foto: "/team/neto-pouza.webp",
      alt: "Neto Pouza durante encontro empresarial",
      w: 934,
      h: 1400,
    },
  ],
} as const;

export const TRILHAS = {
  titulo: ["Do caos à construção", "de uma empresa forte."],
  lede: "Sem fórmulas mágicas. Você aprende o que precisa, na ordem em que consegue aplicar.",
  // A numeração aqui é informação: é a ordem de aplicação.
  itens: [
    {
      t: "Fundamentos de uma empresa forte",
      d: "Organize a base antes que o crescimento transforme pequenos problemas em grandes prejuízos.",
      foto: "/experiencias/conteudo.webp",
      alt: "Público acompanhando conteúdo presencial do Empreenda Sim",
      w: 1600,
      h: 1068,
    },
    {
      t: "Marketing, presença e IA",
      d: "Use ferramentas e posicionamento para ser lembrado, atrair oportunidades e vender com consistência.",
      foto: "/experiencias/interacao.webp",
      alt: "Participantes interagindo durante atividade do evento",
      w: 1600,
      h: 1068,
    },
    {
      t: "Vendas que sustentam o caixa",
      d: "Construa uma rotina comercial prática. Porque empresa cresce quando vende — e vende bem.",
      foto: "/experiencias/networking.webp",
      alt: "Participantes conversando em evento do Empreenda Sim",
      w: 1600,
      h: 1066,
    },
    {
      t: "Finanças sem complicação",
      d: "Entenda seus números, proteja sua margem e pare de confundir faturamento com dinheiro disponível.",
      foto: "/experiencias/participantes.webp",
      alt: "Participantes com materiais do Empreenda Sim",
      w: 934,
      h: 1400,
    },
    {
      t: "Processos e gestão",
      d: "Saia do improviso, reduza retrabalho e faça a empresa depender menos de você para funcionar.",
      foto: "/experiencias/comunidade.webp",
      alt: "Participantes reunidos em uma edição presencial do Empreenda Sim",
      w: 1800,
      h: 1201,
    },
    {
      t: "Pessoas e liderança",
      d: "Monte um time que entenda o que precisa fazer e cresça junto com o negócio.",
      foto: "/experiencias/conexoes.webp",
      alt: "Participantes se abraçando durante o evento",
      w: 1600,
      h: 1068,
    },
  ],
} as const;

export const EVENTOS = {
  titulo: ["Conhecimento que sai da tela", "e aproxima pessoas."],
  lede: "Os encontros do Empreenda Sim combinam conteúdo, participação e networking. Um ambiente para aprender, trocar experiências e construir novas conexões.",
  legendas: [
    {
      foto: "/experiencias/comunidade.webp",
      alt: "Participantes reunidos em uma edição presencial do Empreenda Sim",
      legenda: "Pessoas diferentes. Desafios em comum.",
      w: 1800,
      h: 1201,
    },
    {
      foto: "/experiencias/networking.webp",
      alt: "Participantes conversando durante o networking do evento",
      legenda: "Encontros que geram oportunidades.",
      w: 1600,
      h: 1066,
    },
    {
      foto: "/experiencias/conexoes.webp",
      alt: "Participantes se abraçando durante o evento",
      legenda: "Relações que continuam depois do encontro.",
      w: 1600,
      h: 1068,
    },
  ],
} as const;

export const ASSINATURA = {
  titulo: ["Um ecossistema para", "fazer sua empresa avançar."],
  lede: "Aprenda com especialistas, aplique no seu negócio e conte com uma comunidade para continuar. Tudo em uma assinatura.",
  beneficios: [
    {
      titulo: "Aprenda o que sua empresa precisa",
      descricao: "Cursos e trilhas de marketing, vendas, finanças e gestão, com tecnologia, IA e automação na prática.",
    },
    {
      titulo: "Transforme conteúdo em ação",
      descricao: "Diagnósticos, checklists, e-books e o assistente Cordex IA para apoiar a aplicação no dia a dia.",
    },
    {
      titulo: "Cresça com gente por perto",
      descricao: "Comunidade de empreendedores, lives exclusivas e benefícios de Área Premium nos eventos presenciais.",
    },
  ],
  oferta: "Acesso ao ecossistema completo",
  cta: "Quero fazer parte",
  recorrencia: "Assinatura mensal",
  acesso: "Acesso liberado após a confirmação do pagamento.",
  cancelamento: "Cancele quando quiser, conforme as condições do checkout.",
  pendente: "O link de assinatura ainda está sendo configurado.",
  inclui: [
    "Cursos práticos e conteúdos com especialistas",
    "Tecnologia, Inteligência Artificial e automação",
    "Marketing, vendas e gestão financeira",
    "Lives exclusivas e comunidade de empreendedores",
    "Área Premium nos eventos presenciais",
    "Assistente Virtual Cordex IA para apoiar seu negócio",
  ],
  condicoes:
    "Acesso imediato pela Hotmart. Cancele quando quiser, conforme as condições apresentadas no checkout.",
  seguranca: "Pagamento seguro processado pela Hotmart.",
} as const;

/**
 * Seção removida da página a pedido do cliente. O texto fica aqui porque é real e
 * revisado — se as perguntas voltarem, é só reativar a seção.
 */
export const DUVIDAS = {
  titulo: ["Respostas diretas para", "decidir com segurança."],
  itens: [
    {
      p: "Para quem o Ecossistema Empreenda Sim foi criado?",
      r: "Para MEIs, prestadores de serviços, profissionais liberais e donos de pequenas e médias empresas. É especialmente útil para quem vive no operacional, vende sem previsibilidade, precisa organizar a gestão ou quer crescer sem aumentar o caos. Os conteúdos partem de problemas reais e não exigem formação prévia em administração.",
    },
    {
      p: "O que está incluído na assinatura de R$ 127 por mês?",
      r: "Cursos e trilhas práticas, materiais de execução como diagnósticos, checklists e e-books, a comunidade de membros, lives exclusivas, o assistente Cordex IA e os benefícios de Área Premium nos eventos presenciais.",
    },
    {
      p: "Como recebo o acesso depois da compra?",
      r: "O acesso é liberado após a confirmação do pagamento pela Hotmart. Cursos, materiais, comunidade e Cordex IA ficam disponíveis em um só lugar.",
    },
    {
      p: "Preciso assistir aos cursos em uma ordem específica?",
      r: "Não é obrigatório. As trilhas estão organizadas na ordem em que a maioria consegue aplicar — dos fundamentos até pessoas e liderança — mas você pode começar pelo tema mais urgente da sua empresa.",
    },
    {
      p: "Os eventos presenciais estão incluídos?",
      r: "A assinatura dá direito a benefícios de Área Premium nos encontros presenciais. As condições de cada edição ficam na página de eventos.",
    },
    {
      p: "Posso cancelar a assinatura?",
      r: "Sim. O cancelamento segue as condições apresentadas no checkout da Hotmart no momento da contratação.",
    },
    {
      p: "O Cordex IA substitui um consultor ou profissional especializado?",
      r: "Não. O Cordex IA é um assistente virtual de apoio a dúvidas e decisões do dia a dia. Ele não substitui consultoria, contabilidade, assessoria jurídica ou qualquer profissional especializado.",
    },
  ],
} as const;

/**
 * Seção de fechamento removida a pedido do cliente. "Feito é melhor que perfeito."
 * sobreviveu: virou a declaração de abertura do rodapé (ver RODAPE.marca).
 */
export const FECHAMENTO = {
  marca: "Feito é melhor que perfeito.",
  titulo: ["Sua empresa não precisa", "estar pronta para crescer.", "Mas você precisa começar."],
  cta: "Sim, quero empreender melhor",
} as const;

export const RODAPE = {
  marca: "Diga SIM para crescer, aprender e transformar!",
  chamada: "Comece pelo diagnóstico da sua empresa e aplique a partir da primeira trilha.",
  cta: "Entrar para o ecossistema",
  frase: "Conhecimento, conexão e aplicação para construir empresas mais fortes.",
  assinatura: "Uma iniciativa WordCom.",
  navTitulo: "Navegar",
  acessoTitulo: "Acesso",
  acesso: [
    "Assinatura mensal de R$ 127, cobrada pela Hotmart.",
    "Liberação imediata após a confirmação do pagamento.",
    "Cancelamento conforme as condições do checkout.",
  ],
} as const;
