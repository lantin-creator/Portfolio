import { useCallback, useEffect, useState } from 'react';

interface UseCarouselOptions {
  autoPlayInterval?: number;
  initialIndex?: number;
  pauseOnHover?: boolean;
}

interface UseCarouselResult {
  currentIndex: number;
  count: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  isPlaying: boolean;
  containerProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
  };
}

export function useCarousel(
  slidesCount: number,
  options: UseCarouselOptions = {}
): UseCarouselResult {
  const {
    autoPlayInterval = 3000,
    initialIndex = 0,
    pauseOnHover = true,
  } = options;

  const [currentIndex, setCurrentIndex] = useState(
    slidesCount > 0 ? initialIndex % slidesCount : 0
  );
  const [isPlaying, setIsPlaying] = useState(autoPlayInterval > 0);

  const goTo = useCallback(
    (index: number) => {
      if (slidesCount === 0) return;
      const safe = ((index % slidesCount) + slidesCount) % slidesCount;
      setCurrentIndex(safe);
    },
    [slidesCount]
  );

  const next = useCallback(() => {
    if (slidesCount === 0) return;
    setCurrentIndex((i) => (i + 1) % slidesCount);
  }, [slidesCount]);

  const prev = useCallback(() => {
    if (slidesCount === 0) return;
    setCurrentIndex((i) => (i - 1 + slidesCount) % slidesCount);
  }, [slidesCount]);

  useEffect(() => {
    if (!isPlaying || autoPlayInterval <= 0 || slidesCount <= 1) return;

    const id = window.setInterval(() => {
      setCurrentIndex((i) => (i + 1) % slidesCount);
    }, autoPlayInterval);

    return () => window.clearInterval(id);
  }, [isPlaying, autoPlayInterval, slidesCount]);

  const containerProps = {
    onMouseEnter: pauseOnHover ? () => setIsPlaying(false) : () => {},
    onMouseLeave: pauseOnHover ? () => setIsPlaying(true) : () => {},
    onFocus: pauseOnHover ? () => setIsPlaying(false) : () => {},
    onBlur: pauseOnHover ? () => setIsPlaying(true) : () => {},
  };

  return {
    currentIndex,
    count: slidesCount,
    goTo,
    next,
    prev,
    isPlaying,
    containerProps,
  };
}