import { motion } from 'framer-motion';
import { BarChart3, Database, Monitor, Server, Wrench, type LucideIcon } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { technologies } from '@/data/technologies';
import { ease, fadeUp, stagger, viewport } from '@/utils/motion';

const icons: Record<string, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  tools: Wrench,
  data: BarChart3,
};

export function TechStack() {
  return (
    <section id="stack" className="bg-bg-2 py-24 sm:py-36" aria-label="Tecnologias">
      <div className="frame">
        <SectionHeader id="stack" index="02" label="Stack" title="TECHNOLOGIES." subtitle="Tools I use to build digital experiences." />

        <div className="border-b border-line">
          {technologies.map((cat) => {
            const Icon = icons[cat.id] ?? Wrench;
            return (
              <motion.div
                key={cat.id}
                className="group grid gap-6 border-t border-line py-8 sm:py-10 lg:grid-cols-12 lg:gap-10"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={stagger(0.05)}
              >
                <motion.div variants={fadeUp} className="flex items-start gap-4 lg:col-span-5">
                  <span className="meta mt-2 w-6 transition-colors group-hover:text-accent">{cat.index}</span>
                  <div>
                    <h3 className="display text-[clamp(2rem,5vw,3.75rem)] transition-transform duration-500 group-hover:translate-x-2" style={{ transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)' }}>
                      {cat.title}
                    </h3>
                    <p className="meta mt-3 flex items-center gap-2">
                      <Icon size={13} strokeWidth={1.5} aria-hidden />
                      {cat.items.length} tecnologias
                    </p>
                  </div>
                </motion.div>

                <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:col-span-7">
                  {cat.items.map((item) => (
                    <motion.li
                      key={item.name}
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                      className="group/item flex items-center justify-between gap-4 border-b border-line/70 py-3"
                    >
                      <span className="flex items-center gap-3 font-mono text-sm text-ink">
                        <span aria-hidden className="h-1 w-1 rounded-full bg-muted transition-colors group-hover/item:bg-accent" />
                        {item.name}
                      </span>
                      <LevelIndicator level={item.level} name={item.name} />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
        <p className="meta mt-6">* Indicadores de nível vazios até serem preenchidos com informações reais.</p>
      </div>
    </section>
  );
}

function LevelIndicator({ level, name }: { level?: number; name: string }) {
  const defined = typeof level === 'number';
  return (
    <span
      className="relative h-px w-16 shrink-0 bg-line sm:w-20"
      role="meter"
      aria-label={defined ? `Nível em ${name}` : `Nível em ${name} não informado`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={defined ? level : undefined}
    >
      {defined && (
        <motion.span
          className="absolute inset-y-0 left-0 bg-ink"
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.max(0, Math.min(100, level))}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        />
      )}
    </span>
  );
}
