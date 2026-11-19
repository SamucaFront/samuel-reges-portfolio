import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Calcula o font-size (px) para que o texto ocupe exatamente a largura do container,
 * sem cortar letras em nenhum dispositivo.
 */
export function useFitText<C extends HTMLElement, T extends HTMLElement>(max = 400) {
  const containerRef = useRef<C>(null);
  const textRef = useRef<T>(null);
  const [size, setSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    const c = containerRef.current;
    const t = textRef.current;
    if (!c || !t) return;
    const BASE = 100;
    const measure = () => {
      const prevSize = t.style.fontSize;
      const prevWidth = t.style.width;
      t.style.fontSize = `${BASE}px`;
      t.style.width = 'max-content';
      const w = t.getBoundingClientRect().width;
      t.style.fontSize = prevSize;
      t.style.width = prevWidth;
      const available = c.clientWidth;
      if (w > 0) setSize(Math.min(max, (available / w) * BASE * 0.99));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(c);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => ro.disconnect();
  }, [max]);

  return { containerRef, textRef, size };
}
