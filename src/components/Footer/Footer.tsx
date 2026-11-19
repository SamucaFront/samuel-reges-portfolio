import { ArrowUp } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { navItems } from '@/data/navigation';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="frame">
        <div className="grid gap-10 py-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="text-3xl sm:text-4xl" />
            <p className="mt-4 max-w-xs text-sm text-muted">Designed &amp; Developed with code.</p>
          </div>
          <nav className="md:col-span-4" aria-label="Rodapé">
            <ul className="grid grid-cols-2 gap-y-2">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="link-underline meta text-ink hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-start md:col-span-3 md:justify-end">
            <a href="#top" className="meta group inline-flex items-center gap-2 text-ink hover:text-accent">
              Voltar ao topo
              <span className="grid h-8 w-8 place-items-center rounded-full border border-line transition-colors group-hover:border-accent">
                <ArrowUp size={13} strokeWidth={1.6} />
              </span>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta text-ink">© 2026 Samuel Reges</p>
          <p className="meta flex items-center gap-2">
            <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            System status: <span className="text-ink">Online</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
