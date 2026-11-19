import { forwardRef, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Globe, X } from 'lucide-react';
import type { Project } from '@/types';
import { ProjectCover } from './ProjectCover';
import { StatusBadge } from './StatusBadge';
import { useLockBody } from '@/hooks/useLockBody';
import { ease } from '@/utils/motion';

interface Props {
  project: Project | null;
  index: number;
  total: number;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
}

export function ProjectModal({ project, index, total, onClose, onNavigate }: Props) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = Boolean(project);
  useLockBody(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        const first = f[0];
        const last = f[f.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [isOpen, onClose, onNavigate]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [project?.id]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            aria-label="Fechar detalhes"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 bg-[#0b0b0b]/50 backdrop-blur-[2px]"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative h-full w-full overflow-y-auto overscroll-contain border-l border-line bg-bg md:w-[min(760px,92vw)]"
            initial={{ x: reduce ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: reduce ? 0 : '100%' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg/90 px-5 py-3 backdrop-blur sm:px-8">
              <span className="meta">
                <span className="text-accent">{project.number}</span> / {String(total).padStart(2, '0')} — Selected Works
              </span>
              <div className="flex items-center gap-2">
                <IconBtn label="Projeto anterior" onClick={() => onNavigate(-1)}>
                  <ArrowLeft size={15} strokeWidth={1.6} />
                </IconBtn>
                <IconBtn label="Próximo projeto" onClick={() => onNavigate(1)}>
                  <ArrowRight size={15} strokeWidth={1.6} />
                </IconBtn>
                <IconBtn label="Fechar" onClick={onClose} ref={closeRef}>
                  <X size={15} strokeWidth={1.6} />
                </IconBtn>
              </div>
            </div>

            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="px-5 pb-16 pt-8 sm:px-8"
              style={{ containerType: 'inline-size' }}
            >
              <div className="aspect-[16/9] overflow-hidden border border-line">
                <ProjectCover project={project} variant={index} />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <StatusBadge status={project.status} />
                {project.year && <span className="meta">{project.year}</span>}
              </div>
              <h2 id="project-modal-title" className="display mt-4 break-words text-[min(5.5rem,max(2.25rem,9cqw))]">
                {project.name}
                <span className="text-accent">.</span>
              </h2>
              <p className="mt-4 text-lg text-ink sm:text-xl">{project.tagline}</p>

              <Block label="Descrição">
                <p className="leading-relaxed text-muted">{project.description}</p>
              </Block>

              <Block label="Problema que resolve">
                {project.problem ? (
                  <p className="leading-relaxed text-muted">{project.problem}</p>
                ) : (
                  <Pending>Descrição do problema ainda não adicionada.</Pending>
                )}
              </Block>

              <Block label="Funcionalidades / escopo">
                {project.features.length ? (
                  <ul className="divide-y divide-line border-y border-line">
                    {project.features.map((f, i) => (
                      <li key={f} className="flex gap-4 py-3 text-sm text-ink sm:text-base">
                        <span className="meta mt-1 text-accent">{String(i + 1).padStart(2, '0')}</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Pending>Funcionalidades ainda não documentadas.</Pending>
                )}
              </Block>

              <Block label="Tecnologias">
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block label="Links">
                <div className="grid gap-3 sm:grid-cols-2">
                  <ExternalLink href={project.links.github} label="GitHub" icon={<Github size={16} strokeWidth={1.5} />} />
                  <ExternalLink href={project.links.demo} label="Demonstração" icon={<Globe size={16} strokeWidth={1.5} />} />
                </div>
              </Block>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-line pt-5">
      <h3 className="meta mb-4">{label}</h3>
      {children}
    </section>
  );
}

function Pending({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs text-muted">// {children}</p>;
}

function ExternalLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const base = 'flex items-center justify-between gap-3 border px-4 py-4 font-mono text-xs uppercase tracking-[0.12em]';
  if (!href) {
    return (
      <span className={`${base} cursor-not-allowed border-dashed border-line text-muted`} aria-disabled="true">
        <span className="flex items-center gap-3">
          {icon}
          {label}
        </span>
        <span className="normal-case tracking-normal">indisponível</span>
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} group border-ink text-ink transition-colors hover:border-accent hover:bg-accent hover:text-white`}
    >
      <span className="flex items-center gap-3">
        {icon}
        {label}
      </span>
      <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

const IconBtn = forwardRef<HTMLButtonElement, { label: string; onClick: () => void; children: React.ReactNode }>(
  function IconBtn({ label, onClick, children }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        onClick={onClick}
        className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink"
      >
        {children}
      </button>
    );
  },
);
