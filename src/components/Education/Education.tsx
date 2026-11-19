import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Languages } from '@/components/Languages/Languages';
import { certifications, education } from '@/data/education';
import { fadeUp, stagger, viewport } from '@/utils/motion';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="meta mb-1">{label}</dt>
      <dd className={value ? 'text-sm text-ink sm:text-base' : 'font-mono text-xs text-muted'}>{value || '— a definir'}</dd>
    </div>
  );
}

export function Education() {
  return (
    <section id="formacao" className="bg-bg-2 py-24 sm:py-36" aria-label="Formação e certificações">
      <div className="frame">
        <SectionHeader id="formacao" index="04" label="Formação" title="EDUCATION & CREDENTIALS." />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* formação */}
          <motion.div className="lg:col-span-7" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport}>
            <motion.h3 variants={fadeUp} className="meta mb-6 flex items-center gap-2 text-ink">
              <GraduationCap size={14} strokeWidth={1.5} aria-hidden /> Formação acadêmica
            </motion.h3>
            {education.map((e) => (
              <motion.article key={e.degree} variants={fadeUp} className="group border-t border-line py-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="meta inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-ink">
                    <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
                    {e.status}
                  </span>
                </div>
                <h4 className="display text-[clamp(2rem,4.6vw,3.75rem)] transition-colors group-hover:text-accent">{e.degree}</h4>
                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-5 sm:max-w-lg">
                  <Field label="Instituição" value={e.institution} />
                  <Field label="Período" value={e.period} />
                </dl>
              </motion.article>
            ))}
          </motion.div>

          {/* certificações */}
          <motion.div className="lg:col-span-4 lg:col-start-9" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport}>
            <motion.h3 variants={fadeUp} className="meta mb-6 flex items-center gap-2 text-ink">
              <Award size={14} strokeWidth={1.5} aria-hidden /> Certificações
              <span className="text-muted">({String(certifications.length).padStart(2, '0')})</span>
            </motion.h3>
            {certifications.length > 0 ? (
              <ul className="border-t border-line">
                {certifications.map((c) => (
                  <motion.li key={c.name} variants={fadeUp} className="border-b border-line py-4">
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-underline font-medium text-ink">
                        {c.name}
                      </a>
                    ) : (
                      <span className="font-medium text-ink">{c.name}</span>
                    )}
                    <p className="meta mt-1">
                      {c.issuer} · {c.date}
                    </p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.div variants={fadeUp} className="border border-dashed border-line p-6">
                <p className="font-mono text-xs leading-relaxed text-muted">
                  <span className="text-accent">const</span> certifications = [];
                  <br />
                  <span className="opacity-70">// Nenhuma certificação adicionada ainda.</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        <Languages />
      </div>
    </section>
  );
}
