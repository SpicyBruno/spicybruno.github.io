import Image from "next/image";

interface ProjectVisualProps {
  imageSrc: string;
  /** Stessa destinazione del link testuale sotto la descrizione. */
  href: string;
  /** Didascalia tecnica sotto l'immagine (supporto, tecnologia, formato). */
  meta: string;
  priority?: boolean;
}

/*
  Cover 16:9 a filo, senza cornice. Desaturata a riposo, a colori all'hover
  (vedi .visual-frame in globals.css).

  La cover è cliccabile perché è il bersaglio che si tenta d'istinto, ma è
  `aria-hidden` e fuori dall'ordine di tabulazione: senza, ogni progetto
  darebbe due tappe di tastiera e due annunci per la stessa destinazione.
  L'immagine è quindi decorativa (alt="") — titolo, tag, descrizione,
  didascalia e link testuale dicono già tutto, a un passo da qui.
*/
export function ProjectVisual({
  imageSrc,
  href,
  meta,
  priority,
}: ProjectVisualProps) {
  return (
    <figure className="m-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="visual-frame cover-scrub relative block aspect-video"
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          priority={priority}
          className="object-cover object-top"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </a>
      <figcaption className="mt-3 text-[11px] uppercase tracking-[0.12em] text-current opacity-60">
        {meta}
      </figcaption>
    </figure>
  );
}
