'use client';

import { RefObject, useEffect, useState } from 'react';

export function useIsInViewport(ref: RefObject<HTMLElement | null>, rootMargin = '160px') {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
