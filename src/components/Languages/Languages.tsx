import { motion } from 'framer-motion';
import { languages } from '@/data/education';
import { ease, fadeUp, stagger, viewport } from '@/utils/motion';

export function Languages() {
  return (
    <motion.div
      className="mt-24 grid gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:gap-10"
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      aria-label="Idiomas"
    >
      <motion.div variants={fadeUp} className="lg:col-span-4">
        <p className="meta mb-3">
          <span className="text-accent">(04.1)</span> — Idiomas
        </p>
        <h3 className="display text-[clamp(2.5rem,6vw,4.5rem)]">
          Languages<span className="text-accent">.</span>
        </h3>
      </motion.div>
      <ul className="lg:col-span-7 lg:col-start-6">
        {languages.map((l) => (
          <motion.li
            key={l.name}
            variants={fadeUp}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-5 first:border-t lg:first:border-t-0"
          >
            <span className="font-mono text-sm uppercase tracking-[0.12em] text-ink">
              {l.name} <span className="text-muted">— {l.level}</span>
            </span>
            <span className="flex gap-1.5" role="meter" aria-label={`Proficiência em ${l.name}: ${l.level}`} aria-valuemin={1} aria-valuemax={5} aria-valuenow={l.score}>
              {Array.from({ length: 5 }, (_, i) => (
                <motion.span
                  key={i}
                  className={i < l.score ? 'h-2 w-6 bg-ink sm:w-8' : 'h-2 w-6 border border-line sm:w-8'}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.08 }}
                />
              ))}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
