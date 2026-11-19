import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import { ProjectCover } from './ProjectCover';
import { StatusBadge } from './StatusBadge';
import { ease, viewport } from '@/utils/motion';

interface Props {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}

export function ProjectCard({ project, index, onOpen }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1, ease, delay: (index % 2) * 0.1 }}
      className={index % 2 === 1 ? 'md:mt-32' : ''}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="group block w-full text-left"
        aria-label={`Ver detalhes do projeto ${project.name}`}
        aria-haspopup="dialog"
      >
        <div className="relative aspect-[4/3] overflow-hidden border border-line">
          <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.035]">
            <ProjectCover project={project} variant={index} />
          </div>
          <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-accent text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <ArrowUpRight size={18} strokeWidth={1.6} />
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="meta">
            <span className="text-accent">{project.number}</span> — Project
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="display mt-3 text-[clamp(2.25rem,5vw,4rem)] transition-colors duration-300 group-hover:text-accent">
          {project.name}
        </h3>
        <p className="mt-3 max-w-md text-base text-ink">{project.tagline}</p>
        <p className="mt-1 max-w-md text-sm text-muted">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1" aria-label="Tecnologias">
          {project.technologies.map((t) => (
            <li key={t} className="font-mono text-[11px] text-muted">
              #{t}
            </li>
          ))}
        </ul>

        <span className="meta mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-ink transition-colors group-hover:border-accent group-hover:text-accent">
          Ver detalhes <ArrowUpRight size={12} strokeWidth={1.8} />
        </span>
      </button>
    </motion.article>
  );
}
