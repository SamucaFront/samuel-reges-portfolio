import type { Project } from '@/types';
import { cn } from '@/utils/format';

/**
 * Capa tipográfica gerada a partir dos dados do projeto.
 * Se `project.cover` existir, a imagem real é usada no lugar.
 * Três composições editoriais alternam conforme o índice.
 */
export function ProjectCover({ project, variant, className }: { project: Project; variant: number; className?: string }) {
  if (project.cover) {
    return (
      <img
        src={project.cover}
        alt={`Capa do projeto ${project.name}`}
        loading="lazy"
        className={cn('h-full w-full object-cover', className)}
      />
    );
  }

  const v = variant % 3;
  const initials = project.name.replace(/[^A-Za-zÀ-ú ]/g, '').split(' ').map((w) => w[0]).join('').slice(0, 2);

  return (
    <div
      role="img"
      aria-label={`Capa tipográfica do projeto ${project.name}`}
      className={cn('relative h-full w-full overflow-hidden bg-paper text-ink', className)}
      style={{ containerType: 'inline-size' }}
    >
      {/* grade fina */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--line)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line)) 1px, transparent 1px)',
          backgroundSize: '25% 33.333%',
        }}
      />
      <div aria-hidden className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
        <div className="flex justify-between">
          <span className="meta text-ink">{project.number} / 06</span>
          <span className="meta">{project.technologies[0]}</span>
        </div>

        {v === 0 && (
          <span className="display pointer-events-none absolute -bottom-[0.14em] left-3 whitespace-nowrap text-[24cqw] leading-none transition-transform duration-700 group-hover:-translate-y-2">
            {project.name.split(' ')[0]}
          </span>
        )}
        {v === 1 && (
          <span className="display pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[40cqw] leading-none text-ink/90 transition-transform duration-700 group-hover:scale-[1.04]">
            {initials}
            <span className="text-accent">.</span>
          </span>
        )}
        {v === 2 && (
          <div className="pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 font-mono text-[max(10px,1.8cqw)] leading-[1.9] text-muted sm:inset-x-8">
            <p><span className="text-accent">$</span> git clone {project.id}</p>
            <p><span className="text-accent">$</span> cd {project.id} && npm run dev</p>
            <p className="display mt-3 whitespace-nowrap text-[7.5cqw] leading-[0.9] text-ink">{project.name}</p>
          </div>
        )}

        <div className="relative flex items-end justify-between">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {v !== 0 && <span className="meta">{project.status}</span>}
        </div>
      </div>
    </div>
  );
}
