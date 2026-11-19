import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CodeWindow } from './CodeWindow';
import { profile } from '@/data/profile';
import { fadeUp, stagger, viewport } from '@/utils/motion';

export function About() {
  const { about } = profile;
  return (
    <section id="sobre" className="frame py-24 sm:py-36" aria-labelledby="sobre-title">
      <SectionHeader id="sobre" index="01" label="Sobre" title={about.title} subtitle={about.subtitle} />
      <span id="sobre-title" className="sr-only">Sobre mim</span>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <motion.div
          className="space-y-6 lg:col-span-5"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className={i === 0 ? 'text-xl font-medium leading-snug text-ink sm:text-2xl' : 'text-base leading-relaxed text-muted sm:text-lg'}
            >
              {p}
            </motion.p>
          ))}
          <motion.p variants={fadeUp} className="meta pt-4">
            ↳ Engenharia de Software · Full Stack · Brasil
          </motion.p>
        </motion.div>

        <div className="min-w-0 lg:col-span-6 lg:col-start-7">
          <CodeWindow />
        </div>
      </div>

      <motion.div
        className="mt-24 grid border-t border-line md:grid-cols-3"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {about.principles.map((b) => (
          <motion.article
            key={b.index}
            variants={fadeUp}
            className="group border-b border-line py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <p className="meta mb-8">
              <span className="text-accent">{b.index}</span> — {b.title}
            </p>
            <h3 className="display mb-4 text-3xl transition-colors group-hover:text-accent sm:text-4xl">{b.title}</h3>
            <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-base">{b.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
