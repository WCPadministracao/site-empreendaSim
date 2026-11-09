import Image from "next/image";
import { ScrollGallery, ScrollGalleryTitle } from "@/components/ui/scroll-gallery";
import { EVENTOS } from "@/lib/content";
import styles from "./Eventos.module.css";

const slides = [
  {
    image: "/experiencias/eventos-galeria-1.webp",
    title: EVENTOS.titulo.join(" "),
    highlight: "Conhecimento",
    alt: "Participantes com sacolas do Empreenda Sim reunidos na entrada do evento",
  },
  {
    image: "/experiencias/eventos-galeria-2.webp",
    title: "Encontros que geram oportunidades.",
    highlight: "oportunidades",
    alt: "Três participantes reunidos durante o encontro do Empreenda Sim",
  },
  {
    image: "/experiencias/eventos-galeria-3.webp",
    title: "Conteúdo para levar à prática.",
    highlight: "prática",
    alt: "Público acompanhando uma apresentação no evento do Empreenda Sim",
  },
  {
    image: "/experiencias/eventos-galeria-4.webp",
    title: "Pessoas diferentes. Desafios em comum.",
    highlight: "Pessoas",
    alt: "Participantes sorrindo durante uma atividade presencial do Empreenda Sim",
  },
  {
    image: "/experiencias/eventos-galeria-5.webp",
    title: "Relações que continuam depois do encontro.",
    highlight: "Relações",
    alt: "Duas participantes se abraçando durante o evento do Empreenda Sim",
  },
];

const galleryClasses = {
  images: styles.images,
  info: styles.info,
  infoInner: styles.infoInner,
  prefix: styles.prefix,
  prefixText: styles.prefixText,
  title: styles.title,
  titleText: `display section-title ${styles.titleText}`,
};

export default function Eventos() {
  return (
    <section id="eventos" aria-labelledby="eventos-titulo">
      <h2 id="eventos-titulo" className="sr-only">{EVENTOS.titulo.join(" ")}</h2>
      <p className="sr-only">{EVENTOS.lede}</p>
      <div className={styles.animated}>
        <ul className="sr-only">
          {slides.map((slide) => <li key={slide.image}>{slide.alt}. {slide.title}</li>)}
        </ul>
        <ScrollGallery
          animateIntroTitle
          mobileSticky
          imageFit="cover"
          slides={slides}
          className={styles.stage}
          classNames={galleryClasses}
          prefixLabel="Eventos presenciais"
          showLink={false}
          scrollPerTransition={120}
          timing={{ initialDelay: 50, finalDelay: 60, titleDuration: 0.24, scaleFrom: 1, scaleTo: 1 }}
          refreshPriority={-1}
        />
      </div>
      <div className={styles.reduced}>
        {slides.map((slide) => (
          <figure className={styles.still} key={slide.image}>
            <div className={styles.images}>
              <Image src={slide.image} alt={slide.alt} fill sizes="100vw" className={styles.stillImage} />
            </div>
            <figcaption className={styles.info}>
              <div className={styles.infoInner}>
                <p className={`${styles.prefix} ${styles.prefixText}`}>Eventos presenciais</p>
                <p className={`display section-title ${styles.titleText}`}><ScrollGalleryTitle slide={slide} /></p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
