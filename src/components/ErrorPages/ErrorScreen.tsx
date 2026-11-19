import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Signature } from '@/components/Hero/Signature';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { Logo } from '@/components/ui/Logo';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Terminal } from './Terminal';
import { useTheme } from '@/hooks/useTheme';
import { ease } from '@/utils/motion';

interface Props {
  code: '404' | '500';
  title: string;
  message: string;
  signature: string;
  path?: string;
  /** Detalhe técnico do erro (somente em desenvolvimento). */
  detail?: string;
  onRetry?: () => void;
}

export function ErrorScreen({ code, title, message, signature, path, detail, onRetry }: Props) {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !areaRef.current) return;
    const r = areaRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const intro =
    code === '404'
      ? [
          { kind: 'in' as const, text: `GET ${path ?? '/'}` },
          { kind: 'err' as const, text: '404 Not Found — essa rota não existe (ainda).' },
          { kind: 'out' as const, text: 'Digite "help" para ver os comandos, ou "home" para voltar.' },
        ]
      : [
          { kind: 'in' as const, text: 'npm run portfolio' },
          { kind: 'err' as const, text: `500 Internal Error${detail ? ` — ${detail}` : ''}` },
          { kind: 'out' as const, text: 'Digite "reload" para tentar de novo, ou "help".' },
        ];

  const digits = code.split('');

  return (
    <div className="flex min-h-[100svh] flex-col bg-bg text-ink" onPointerMove={onMove}>
      <CustomCursor />
      <header className="frame flex h-14 items-center justify-between border-b border-line sm:h-16">
        <a href="/" aria-label="Voltar para o início">
          <Logo />
        </a>
        <span className="meta hidden sm:inline">
          Error <span className="text-accent">{code}</span> · {code === '404' ? 'Not Found' : 'Internal Error'}
        </span>
        <ThemeToggle theme={theme} onToggle={toggle} />
      </header>

      <main className="frame grid flex-1 items-center gap-12 py-12 lg:grid-cols-12 lg:gap-10">
        <div ref={areaRef} className="relative lg:col-span-7">
          <p className="meta mb-6">
            <span className="text-accent">({code})</span> — {code === '404' ? 'Página não encontrada' : 'Algo quebrou'}
          </p>

          <div className="relative select-none" aria-hidden>
            <div className="display flex text-[clamp(8rem,34vw,24rem)] leading-[0.8] tracking-[-0.06em]">
              {digits.map((d, i) => (
                <Digit key={i} char={d} index={i} total={digits.length} sx={sx} sy={sy} reduce={Boolean(reduce)} />
              ))}
            </div>
            <div className="pointer-events-none absolute left-[8%] top-1/2 w-[92%] -translate-y-[30%] -rotate-[7deg]">
              <Signature text={signature} delay={0.7} fontSize={200} />
            </div>
          </div>
        </div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.4 }}
        >
          <h1 className="display text-[clamp(2.25rem,5vw,3.75rem)]">
            {title}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-muted sm:text-lg">{message}</p>

          <div className="mt-8">
            <Terminal
              intro={intro}
              onToggleTheme={toggle}
              extra={onRetry ? { reload: { description: 'tenta carregar de novo', run: onRetry } } : undefined}
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-bg transition-colors hover:bg-accent hover:text-white"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" /> Voltar ao início
            </a>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
              >
                <RotateCcw size={13} /> Tentar de novo
              </button>
            )}
            <a
              href="/#contato"
              className="inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
            >
              Reportar
            </a>
          </div>
        </motion.div>
      </main>

      <footer className="frame flex flex-col gap-2 border-t border-line py-5 sm:flex-row sm:justify-between">
        <span className="meta">© 2026 Samuel Reges</span>
        <span className="meta flex items-center gap-2">
          <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
          System status: <span className="text-ink">{code === '404' ? 'Online · rota inexistente' : 'Degradado'}</span>
        </span>
      </footer>
    </div>
  );
}

/** Cada dígito entra por uma máscara e reage ao mouse com profundidade diferente. */
function Digit({
  char,
  index,
  total,
  sx,
  sy,
  reduce,
}: {
  char: string;
  index: number;
  total: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  reduce: boolean;
}) {
  const depth = (index - (total - 1) / 2) * 18 + 10;
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * (depth * 0.6));
  const rotate = useTransform(sx, (v) => v * (index % 2 ? -4 : 4));
  const isAccent = index === 1;

  return (
    <span className="inline-block overflow-hidden pb-[0.04em]">
      <motion.span
        className={`inline-block ${isAccent ? 'text-transparent' : ''}`}
        style={{ x, y, rotate, WebkitTextStroke: isAccent ? '2px rgb(var(--ink))' : undefined }}
        initial={{ y: reduce ? 0 : '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.1 + index * 0.08 }}
        whileHover={reduce ? undefined : { color: 'rgb(var(--accent))', WebkitTextStroke: '0px transparent' }}
      >
        {char}
      </motion.span>
    </span>
  );
}
