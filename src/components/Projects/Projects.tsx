import { useCallback, useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { projects } from '@/data/projects';
import type { Project } from '@/types';

export function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const current = openIndex !== null ? projects[openIndex] ?? null : null;

  const open = useCallback((p: Project) => setOpenIndex(projects.findIndex((x) => x.id === p.id)), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const navigate = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + projects.length) % projects.length)),
    [],
  );

  return (
    <section id="projetos" className="frame py-24 sm:py-36" aria-label="Projetos">
      <SectionHeader id="projetos" index="03" label="Projetos" title="SELECTED WORKS." subtitle={`${projects.length} projetos — web, back-end e mobile.`} />

      <div className="grid gap-x-10 gap-y-20 md:grid-cols-2 lg:gap-x-16">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={open} />
        ))}
      </div>

      <ProjectModal project={current} index={openIndex ?? 0} total={projects.length} onClose={close} onNavigate={navigate} />
    </section>
  );
}
