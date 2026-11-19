import { useEffect, useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Assinatura manuscrita "Samuel Reges".
 * Escrita progressiva: o contorno é desenhado (stroke-dashoffset) enquanto
 * uma máscara revela o traço da esquerda para a direita, e então o preenchimento
 * aparece. Um floreio final é desenhado com pathLength.
 */
export function Signature({ delay = 0.9, text = 'Samuel Reges', fontSize = 240 }: { delay?: number; text?: string; fontSize?: number }) {
  const reduce = useReducedMotion();
  const clipId = `sig-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    let alive = true;
    const fallback = window.setTimeout(() => alive && setFontReady(true), 1800);
    if ('fonts' in document) {
      document.fonts.load('120px "Mrs Saint Delafield"').finally(() => alive && setFontReady(true));
    } else setFontReady(true);
    return () => {
      alive = false;
      window.clearTimeout(fallback);
    };
  }, []);

  const write = reduce ? { duration: 0 } : { duration: 2.6, ease: [0.45, 0.05, 0.25, 1] as const, delay };

  return (
    <svg
      viewBox="0 0 1000 340"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label={`Assinatura: ${text}`}
    >
      <defs>
        <clipPath id={clipId}>
          <motion.rect
            x="-20"
            y="-40"
            height="440"
            initial={{ width: reduce ? 1100 : 0 }}
            animate={fontReady ? { width: 1100 } : undefined}
            transition={write}
          />
        </clipPath>
      </defs>
      {fontReady && (
        <g clipPath={`url(#${clipId})`}>
          <motion.text
            x="500"
            y="205"
            textAnchor="middle"
            className="font-script"
            style={{ fontSize }}
            fill="rgb(var(--accent))"
            stroke="rgb(var(--accent))"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeDasharray="2600"
            initial={{ strokeDashoffset: reduce ? 0 : 2600, fillOpacity: reduce ? 1 : 0 }}
            animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
            transition={{
              strokeDashoffset: write,
              fillOpacity: reduce ? { duration: 0 } : { duration: 1.2, delay: delay + 1.4, ease: 'easeOut' },
            }}
          >
            {text}
          </motion.text>
        </g>
      )}
      {/* floreio sob a assinatura */}
      <motion.path
        d="M210 262 C 360 238, 560 236, 700 248 S 860 270, 905 236"
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth={2.2}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        variants={{
          hidden: { strokeDashoffset: reduce ? 0 : 1, opacity: reduce ? 1 : 0 },
          drawn: {
            strokeDashoffset: 0,
            opacity: 1,
            transition: reduce ? { duration: 0 } : { duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: delay + 2.3 },
          },
        }}
        initial="hidden"
        animate={fontReady ? 'drawn' : 'hidden'}
      />
    </svg>
  );
}
