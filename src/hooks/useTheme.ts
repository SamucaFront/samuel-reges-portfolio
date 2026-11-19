import { useCallback, useEffect, useState } from 'react';
import type { Theme } from '@/types';

const STORAGE_KEY = 'sr-theme';

function readInitial(): Theme {
  if (typeof document === 'undefined') return 'light';
  const attr = document.documentElement.dataset.theme;
  return attr === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', theme === 'dark' ? '#111111' : '#E9E9E9');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage indisponível — o tema continua funcionando na sessão */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    window.setTimeout(() => root.classList.remove('theme-transition'), 550);
  }, []);

  return { theme, toggle };
}
