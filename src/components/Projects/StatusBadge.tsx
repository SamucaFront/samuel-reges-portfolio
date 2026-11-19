import type { ProjectStatus } from '@/types';

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const done = status === 'Concluído';
  return (
    <span className="meta inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-ink">
      <span
        aria-hidden
        className={done ? 'h-1.5 w-1.5 rounded-full bg-ink' : 'pulse-dot h-1.5 w-1.5 rounded-full bg-accent'}
      />
      {status}
    </span>
  );
}
