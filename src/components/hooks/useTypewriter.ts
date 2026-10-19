import { useEffect, useRef, useState } from 'react';

interface SectionConfig {
  id: string;
}

interface UseSectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  fallbackSections?: string[];
}

function getFirstVisibleId(ids: string[]): string | null {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      return id;
    }
  }
  return null;
}

export function useSectionObserver(
  sections: SectionConfig[],
  options: UseSectionObserverOptions = {}
): string | null {
  const { threshold = 0.3, rootMargin = '0px' } = options;
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!sections.length) return;

    const ids = sections.map(s => s.id);
    const firstId = getFirstVisibleId(ids);
    if (firstId) setActiveId(firstId);
  }, [sections]);

  useEffect(() => {
    if (!sections.length) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });

        let bestId: string | null = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId && bestRatio >= threshold) {
          setActiveId(bestId);
        }
      },
      { threshold: [0, threshold, 1], rootMargin }
    );

    observerRef.current = observer;

    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      observerRef.current = null;
    };
  }, [sections, threshold, rootMargin]);

  return activeId;
}

interface UseTypewriterOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  holdDelay?: number;
  betweenDelay?: number;
  startDelay?: number;
}

export function useTypewriter(
  texts: readonly string[],
  options: UseTypewriterOptions = {}
) {
  const {
    typeSpeed = 120,
    deleteSpeed = 50,
    holdDelay = 5000,
    betweenDelay = 1000,
    startDelay = 500,
  } = options;

  const [text, setText] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!texts.length) return;
    const id = window.setTimeout(() => setIsStarted(true), startDelay);
    return () => window.clearTimeout(id);
  }, [texts, startDelay]);

  useEffect(() => {
    if (!isStarted || !texts.length) return;

    const tick = () => {
      const currentText = texts[textIndexRef.current];
      const charIndex = charIndexRef.current;
      const isDeleting = isDeletingRef.current;

      if (isDeleting) {
        const next = currentText.substring(0, charIndex - 1);
        charIndexRef.current -= 1;
        setText(next);

        if (charIndexRef.current <= 0) {
          charIndexRef.current = 0;
          isDeletingRef.current = false;
          textIndexRef.current = (textIndexRef.current + 1) % texts.length;
          timeoutRef.current = window.setTimeout(tick, betweenDelay);
          return;
        }

        timeoutRef.current = window.setTimeout(tick, deleteSpeed);
        return;
      }

      const next = currentText.substring(0, charIndex + 1);
      charIndexRef.current += 1;
      setText(next);

      if (charIndexRef.current >= currentText.length) {
        isDeletingRef.current = true;
        timeoutRef.current = window.setTimeout(tick, holdDelay);
        return;
      }

      timeoutRef.current = window.setTimeout(tick, typeSpeed);
    };

    timeoutRef.current = window.setTimeout(tick, typeSpeed);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isStarted, texts, typeSpeed, deleteSpeed, holdDelay, betweenDelay]);

  return { text, isStarted };
}