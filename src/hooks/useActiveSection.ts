import { useEffect, useState } from 'react';

/** Retorna o id da seção atualmente visível no viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        });
        const first = ids.find((id) => visible.has(id));
        setActive(first ?? '');
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.01, 0.5, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
