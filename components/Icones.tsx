/**
 * Ícones autorais, traço único de 1.5 e mesma caixa de 24.
 * Nenhum emoji, nenhum glifo Unicode no lugar de ícone.
 */

type Props = { className?: string };

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Aprenda — páginas abertas */
export const IconeAprenda = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="M12 6.4c-1.9-1.5-4-2-6.2-1.9a.9.9 0 0 0-.8.9v10.3c0 .5.4.9 1 .9 2-.1 3.9.4 5.6 1.6" />
    <path d="M12 6.4c1.9-1.5 4-2 6.2-1.9.5 0 .8.4.8.9v10.3c0 .5-.4.9-1 .9-2-.1-3.9.4-5.6 1.6" />
    <path d="M12 6.4V18.2" />
  </svg>
);

/** Aplique — marca de execução dentro do documento */
export const IconeAplique = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="M6 3.8h8.4L19 8.4v11.8H6z" />
    <path d="M14.2 3.8v4.7H19" />
    <path d="M9 14.1l2 2 4-4.4" />
  </svg>
);

/** Cordex IA — núcleo com órbitas de apoio */
export const IconeApoio = ({ className }: Props) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="3.1" />
    <path d="M12 4.2V8.9" />
    <path d="M12 15.1v4.7" />
    <path d="M4.9 8.1l4 2.3" />
    <path d="M15.1 13.6l4 2.3" />
    <path d="M4.9 15.9l4-2.3" />
    <path d="M15.1 10.4l4-2.3" />
  </svg>
);

/** Conecte-se — pessoas ligadas */
export const IconeConecte = ({ className }: Props) => (
  <svg {...base} className={className}>
    <circle cx="8" cy="8.4" r="2.6" />
    <circle cx="17" cy="15.6" r="2.6" />
    <path d="M8 11v3.3a2 2 0 0 0 2 2h4.4" />
    <path d="M17 13v-2.4a2 2 0 0 0-2-2h-4.1" />
  </svg>
);

export const IconeCheck = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="M5 12.6 9.6 17 19 7.4" />
  </svg>
);

export const IconeSeta = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="M5.5 12h12.3" />
    <path d="M13.4 7.4 18.5 12l-5.1 4.6" />
  </svg>
);

export const IconeDesce = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="M12 5.4v12.3" />
    <path d="M7.4 13.4 12 18.5l4.6-5.1" />
  </svg>
);

export const IconeCadeado = ({ className }: Props) => (
  <svg {...base} className={className}>
    <rect x="5.2" y="10.3" width="13.6" height="9.2" rx="2" />
    <path d="M8.6 10.3V7.8a3.4 3.4 0 0 1 6.8 0v2.5" />
  </svg>
);

export const IconeMenu = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="M4.5 8.2h15" />
    <path d="M4.5 15.8h15" />
  </svg>
);

export const IconeFechar = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="M6.6 6.6l10.8 10.8" />
    <path d="M17.4 6.6 6.6 17.4" />
  </svg>
);

export const ICONES = {
  aprenda: IconeAprenda,
  aplique: IconeAplique,
  apoio: IconeApoio,
  conecte: IconeConecte,
} as const;
