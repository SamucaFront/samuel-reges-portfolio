import { cn } from '@/utils/format';

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('font-mono font-bold tracking-tight', className)}>
      <span className="text-muted">&lt;</span>SR<span className="text-accent">/</span>
      <span className="text-muted">&gt;</span>
    </span>
  );
}
