import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/data/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLockBody } from '@/hooks/useLockBody';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { Logo } from '@/components/ui/Logo';
import { ease } from '@/utils/motion';
import { cn } from '@/utils/format';
import type { Theme } from '@/types';

const ids = navItems.map((n) => n.id);

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: Props) {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useLockBody(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          scrolled || open ? 'border-line bg-bg/80 backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      >
        <nav className="frame flex h-14 items-center justify-between sm:h-16" aria-label="Navegação principal">
          <a href="#top" className="text-sm sm:text-base" aria-label="Samuel Reges — início" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, i) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors',
                      isActive ? 'text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    <span className="text-[9px] opacity-60">0{i + 1}</span>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-px h-px bg-accent"
                        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink lg:hidden"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={16} strokeWidth={1.6} /> : <Menu size={16} strokeWidth={1.6} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg pt-20 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease }}
          >
            <ul className="frame flex flex-1 flex-col justify-center">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="border-t border-line last:border-b"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.05 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-3"
                  >
                    <span className={cn('display text-[clamp(2.4rem,11vw,4.5rem)]', active === item.id && 'text-accent')}>
                      {item.label}
                    </span>
                    <span className="meta">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="frame flex items-center justify-between py-6">
              <span className="meta">Samuel Reges — Software Developer</span>
              <span className="meta">BR</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
