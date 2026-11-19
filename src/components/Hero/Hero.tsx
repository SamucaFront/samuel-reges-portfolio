import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Signature } from './Signature';
import { useFitText } from './useFitText';
import { useClock } from '@/hooks/useClock';
import { formatDate, formatTime } from '@/utils/format';
import { profile } from '@/data/profile';
import { ease } from '@/utils/motion';

const WORD = 'PORTFOLIO';
const tags = ['Software Developer', 'Full Stack Development', 'Based in Brazil', 'Available for Opportunities'];

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const now = useClock();
  const { containerRef, textRef, size } = useFitText<HTMLDivElement, HTMLHeadingElement>();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const sigY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);

  // parallax sutil com o mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const sigX = useTransform(sx, (v) => v * 14);
  const sigYm = useTransform(sy, (v) => v * 10);
  const sigYTotal = useTransform<number, number>([sigY, sigYm], ([a, b]) => (a ?? 0) + (b ?? 0));
  const titleX = useTransform(sx, (v) => v * -5);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-14 sm:pt-16"
      aria-label="Apresentação"
    >
      {/* linhas finas da composição */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="frame relative h-full">
          <motion.span
            className="absolute inset-y-0 left-4 w-px origin-top bg-line sm:left-8 lg:left-12"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.1 }}
          />
          <motion.span
            className="absolute inset-y-0 right-4 w-px origin-bottom bg-line sm:right-8 lg:right-12"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
          />
        </div>
      </div>

      {/* linha superior: meta */}
      <div className="frame relative">
        <motion.div
          className="flex items-start justify-between gap-4 border-b border-line px-3 py-4 sm:px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="meta text-ink">
            Samuel Reges <span className="text-muted">— Software Developer</span>
          </p>
          <div className="flex flex-col items-end gap-1 text-right">
            <p className="meta flex items-center gap-2 text-ink">
              {profile.available && <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />}
              {profile.available ? 'Available' : 'Unavailable'}
            </p>
            <p className="meta hidden sm:block">
              <time dateTime={now.toISOString()}>{formatDate(now)}</time> · {formatTime(now)} BRT
            </p>
          </div>
        </motion.div>
      </div>

      {/* título gigante + assinatura */}
      <div className="frame relative flex flex-1 items-center">
        <motion.div style={{ opacity: fade }} className="relative w-full px-3 sm:px-5">
          <div ref={containerRef} className="relative w-full">
            <motion.h1
              ref={textRef}
              style={{ y: titleY, x: titleX, fontSize: size ? `${size}px` : 'min(17.5vw, 15rem)' }}
              className="display select-none whitespace-nowrap text-center leading-[0.8] tracking-[-0.055em]"
              aria-label="Portfolio — Samuel Reges"
            >
              {WORD.split('').map((ch, i) => (
                <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.04em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: reduce ? 0 : '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, ease, delay: 0.25 + i * 0.045 }}
                  >
                    {ch}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <div className="pointer-events-none absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-[40%] -rotate-[6deg] sm:w-[62%]">
              <motion.div style={{ y: sigYTotal, x: sigX }}>
                <Signature />
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-6 flex items-center justify-between sm:mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.2 }}
          >
            <span className="meta">(Vol. 01)</span>
            <span className="meta">Portfolio — {now.getFullYear()}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* rodapé do hero */}
      <div className="frame relative">
        <motion.div
          className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line px-3 py-5 sm:px-5 md:grid-cols-[repeat(4,1fr)_auto]"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.4 } } }}
        >
          {tags.map((t, i) => (
            <motion.p
              key={t}
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
              className="meta flex gap-2 text-ink"
            >
              <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
              {t}
            </motion.p>
          ))}
          <motion.a
            href="#sobre"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.7 } } }}
            className="meta col-span-2 flex items-center gap-3 justify-self-start text-ink hover:text-accent md:col-span-1 md:justify-self-end"
            aria-label="Rolar para a seção Sobre"
          >
            <span className="relative block h-8 w-px overflow-hidden bg-line">
              <span className="scroll-line absolute inset-0 bg-ink" />
            </span>
            Scroll <ArrowDown size={12} strokeWidth={1.6} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
