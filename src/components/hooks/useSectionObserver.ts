import { useEffect, useRef, useState } from 'react';

interface SectionConfig {
  id: string;
}

interface UseSectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
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

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: [threshold], rootMargin }
    );

    const observedElements: Element[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observerRef.current!.observe(el);
        observedElements.push(el);
      }
    });

    return () => {
      observedElements.forEach((el) => observerRef.current?.unobserve(el));
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [sections, threshold, rootMargin]);

  return activeId;
}