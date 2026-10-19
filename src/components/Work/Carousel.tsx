import { useCarousel } from '../hooks/useCarousel';

interface Photo {
  id: number;
  Foto: string;
}

interface CarouselProps {
  photos: Photo[];
  autoPlayInterval?: number;
  ariaLabel?: string;
}

export function Carousel({
  photos,
  autoPlayInterval = 3000,
  ariaLabel = 'Галерея',
}: CarouselProps) {
  const {
    currentIndex,
    count,
    goTo,
    next,
    prev,
    containerProps,
  } = useCarousel(photos.length, { autoPlayInterval, pauseOnHover: true });

  if (count === 0) return null;

  return (
    <div className="carousel" aria-label={ariaLabel} {...containerProps}>
      <div
        className="slides-wrapper"
        style={{
          display: 'flex',
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.5s ease',
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} из ${count}`}
            style={{
              minWidth: '100%',
              backgroundImage: `url('${photo.Foto}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
      </div>

      <button
        type="button"
        className="prev-btn"
        onClick={prev}
        aria-label="Предыдущий слайд"
      >
        ❮
      </button>

      <button
        type="button"
        className="next-btn"
        onClick={next}
        aria-label="Следующий слайд"
      >
        ❯
      </button>

      <div className="dots" role="tablist">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Перейти к слайду ${i + 1}`}
            className={`dot${i === currentIndex ? ' active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className="slide-counter" aria-live="polite">
        {currentIndex + 1} / {count}
      </div>
    </div>
  );
}