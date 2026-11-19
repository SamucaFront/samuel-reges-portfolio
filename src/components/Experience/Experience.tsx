import { motion } from 'framer-motion';
import { GitBranch, GitCommitHorizontal } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { experience } from '@/data/experience';
import { ease, fadeUp, stagger, viewport } from '@/utils/motion';

export function Experience() {
  return (
    <section id="experiencia" className="frame py-24 sm:py-36" aria-label="Experiência">
      <SectionHeader id="experiencia" index="05" label="Experiência" title="EXPERIENCE." />

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="meta flex items-center gap-2 text-ink">
            <GitBranch size={13} strokeWidth={1.5} aria-hidden /> main
          </p>
          <p className="mt-2 font-mono text-xs text-muted">$ git log --graph --oneline</p>
        </div>

        <ol className="relative lg:col-span-9">
          {/* trilho da timeline */}
          <motion.span
            aria-hidden
            className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
          />
          {experience.map((exp) => (
            <motion.li
              key={exp.hash}
              className="relative pb-14 pl-10 sm:pl-14"
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              <span aria-hidden className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-ink bg-bg">
                <span className="h-[5px] w-[5px] rounded-full bg-accent" />
              </span>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs">
                <span className="text-accent">{exp.hash}</span>
                {exp.current && (
                  <span className="rounded-full border border-accent px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-accent">
                    HEAD → main
                  </span>
                )}
                <span className="text-muted">{exp.period}</span>
              </motion.div>

              <motion.h3 variants={fadeUp} className="display mt-4 text-[clamp(1.9rem,4.4vw,3.5rem)]">
                {exp.role}
              </motion.h3>
              <motion.p variants={fadeUp} className="meta mt-3 text-ink">
                @ {exp.company}
              </motion.p>

              <ul className="mt-8 border-t border-line">
                {exp.responsibilities.map((r) => (
                  <motion.li key={r} variants={fadeUp} className="flex gap-4 border-b border-line py-3 text-sm text-ink sm:text-base">
                    <span aria-hidden className="font-mono text-accent">+</span>
                    {r}
                  </motion.li>
                ))}
              </ul>

              <motion.ul variants={fadeUp} className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologias utilizadas">
                {exp.technologies.map((t) => (
                  <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                    {t}
                  </li>
                ))}
              </motion.ul>
            </motion.li>
          ))}

          <li className="relative pl-10 sm:pl-14">
            <span aria-hidden className="absolute left-[3px] top-0.5 text-muted">
              <GitCommitHorizontal size={9} />
            </span>
            <p className="font-mono text-xs text-muted">// próximos commits em breve…</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
