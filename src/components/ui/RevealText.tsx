import { motion, useReducedMotion } from 'framer-motion';
import { ease, viewport } from '@/utils/motion';
import { cn } from '@/utils/format';

interface Props {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  /** Se true, o ponto final é renderizado em vermelho. */
  accentDot?: boolean;
  delay?: number;
}

/** Revela cada palavra deslizando de dentro de uma máscara. */
export function RevealText({ text, className, as = 'h2', accentDot = true, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const hasDot = accentDot && text.endsWith('.');
  const words = (hasDot ? text.slice(0, -1) : text).split(' ');

  return (
    <Tag
      className={cn('display', className)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: reduce ? 0 : '105%', opacity: reduce ? 0 : 1 },
              show: { y: 0, opacity: 1, transition: { duration: 1, ease } },
            }}
          >
            {word}
            {i === words.length - 1 && hasDot && <span className="text-accent">.</span>}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
