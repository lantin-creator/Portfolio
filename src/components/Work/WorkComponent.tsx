import type { ReactNode } from "react";
import { Carousel } from "./Carousel";

interface Photo {
  id: number;
  Foto: string;
}

type WorkComponentProps = {
  nameClass?: string;
  textClass?: string;
  name?: ReactNode;
  text?: ReactNode;
  href?: string;
  photos?: Photo[];
  autoPlayInterval?: number;
  ariaLabel?: string;
};

const WorkComponent = ({
  nameClass = "",
  textClass = "",
  name,
  text,
  href,
  photos,
  autoPlayInterval = 3000,
  ariaLabel,
}: WorkComponentProps) => {
  const hasCarousel = photos && photos.length > 0;

  return (
    <div className="workcard">
      {name && <div className={nameClass}>{name}</div>}
      {text && <div className={textClass}>{text}</div>}

      {hasCarousel && (
        <div id="slider1">
          <Carousel
            photos={photos}
            autoPlayInterval={autoPlayInterval}
            ariaLabel={ariaLabel ?? (typeof name === "string" ? name : undefined)}
          />
        </div>
      )}

      {href && (
        <div className="Visittherepository">
          <a
            className="repository"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            Посетить репозиторий
          </a>
        </div>
      )}
    </div>
  );
};

export default WorkComponent;