import { useEffect, useRef, useState } from 'react';
import { navItems } from '@/data/navigation';
import { socialLinks } from '@/data/profile';

type Line = { kind: 'in' | 'out' | 'err' | 'ok'; text: string };

interface Props {
  /** Linhas exibidas ao abrir o terminal. */
  intro: Line[];
  onToggleTheme: () => void;
  /** Comandos extras específicos da página (ex.: "reload" na tela 500). */
  extra?: Record<string, { description: string; run: () => Line[] | void }>;
}

const go = (hash: string) => {
  window.location.href = `/${hash}`;
};

/** Terminal interativo: o visitante digita comandos para navegar a partir da página de erro. */
export function Terminal({ intro, onToggleTheme, extra = {} }: Props) {
  const [lines, setLines] = useState<Line[]>(intro);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  const sections = navItems.map((n) => n.id);

  const commands: Record<string, { description: string; run: (arg: string) => Line[] | void }> = {
    help: {
      description: 'lista os comandos',
      run: () => [
        ...Object.entries({ ...commands, ...extra })
          .filter(([, c]) => c.description)
          .map(([name, c]) => ({
          kind: 'out' as const,
          text: `  ${name.padEnd(10, ' ')} ${c.description}`,
        })),
        { kind: 'out', text: `  cd <seção>  ${sections.join(' · ')}` },
      ],
    },
    home: { description: 'volta para a página inicial', run: () => (go(''), [{ kind: 'ok', text: '→ redirecionando para /' }]) },
    ls: { description: 'lista as seções do portfólio', run: () => [{ kind: 'out', text: sections.map((s) => `${s}/`).join('   ') }] },
    projects: { description: 'abre os projetos', run: () => (go('#projetos'), [{ kind: 'ok', text: '→ abrindo /#projetos' }]) },
    contact: {
      description: 'mostra os canais de contato',
      run: () =>
        socialLinks.map((l) => ({
          kind: 'out' as const,
          text: `  ${l.label.padEnd(9, ' ')} ${l.value.replace(/^https?:\/\/(www\.)?/, '') || '—'}`,
        })),
    },
    whoami: { description: 'quem fez este site', run: () => [{ kind: 'out', text: 'Samuel Reges — Software Developer · Full Stack · Brasil' }] },
    theme: { description: 'alterna claro / escuro', run: () => (onToggleTheme(), [{ kind: 'ok', text: '✓ tema alterado' }]) },
    clear: { description: 'limpa o terminal', run: () => setLines([]) },
    sudo: { description: '', run: () => [{ kind: 'err', text: 'permission denied: boa tentativa 😉' }] },
  };

  const run = (raw: string) => {
    const input = raw.trim();
    if (!input) return;
    setHistory((h) => [input, ...h].slice(0, 30));
    setCursor(-1);
    const [cmd = '', ...rest] = input.split(/\s+/);
    const arg = rest.join(' ');
    const echo: Line = { kind: 'in', text: input };
    const name = cmd.toLowerCase();

    if (name === 'cd') {
      const target = arg.replace(/^[~/#]+/, '').replace(/\/$/, '').toLowerCase();
      if (!target || target === '~') {
        setLines((l) => [...l, echo, { kind: 'ok', text: '→ redirecionando para /' }]);
        go('');
      } else if (sections.includes(target as (typeof sections)[number])) {
        setLines((l) => [...l, echo, { kind: 'ok', text: `→ abrindo /#${target}` }]);
        go(`#${target}`);
      } else {
        setLines((l) => [...l, echo, { kind: 'err', text: `cd: ${arg}: seção não encontrada. Tente "ls".` }]);
      }
      return;
    }

    const c = commands[name] ?? extra[name];
    if (!c) {
      setLines((l) => [...l, echo, { kind: 'err', text: `command not found: ${cmd}. Digite "help".` }]);
      return;
    }
    const out = c.run(arg);
    if (name === 'clear') return;
    setLines((l) => [...l, echo, ...(out ?? [])]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(value);
      setValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (history[next] !== undefined) {
        setCursor(next);
        setValue(history[next] ?? '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setValue(next < 0 ? '' : history[next] ?? '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const all = [...Object.keys(commands), ...Object.keys(extra), 'cd'];
      const match = all.find((c) => c.startsWith(value.toLowerCase()) && c !== value);
      if (match) setValue(match);
    }
  };

  const color: Record<Line['kind'], string> = {
    in: 'text-ink',
    out: 'text-muted',
    err: 'text-accent',
    ok: 'text-ink',
  };

  return (
    <div
      className="overflow-hidden rounded-[4px] border border-line bg-bg-2 text-left"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full border border-line" />
          <span className="h-2.5 w-2.5 rounded-full border border-line" />
        </div>
        <span className="meta normal-case tracking-normal">sr@portfolio: ~</span>
        <span className="meta">zsh</span>
      </div>
      <div
        ref={bodyRef}
        className="h-56 overflow-y-auto px-4 py-4 font-mono text-[12px] leading-[1.8] sm:h-64 sm:text-[13px]"
        role="log"
        aria-live="polite"
      >
        {lines.map((l, i) => (
          <p key={i} className={`whitespace-pre-wrap break-words ${color[l.kind]}`}>
            {l.kind === 'in' && <span className="text-accent">❯ </span>}
            {l.text}
          </p>
        ))}
        <label className="flex items-center gap-2">
          <span className="text-accent" aria-hidden>
            ❯
          </span>
          <span className="sr-only">Digite um comando</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder='digite "help"'
            className="w-full bg-transparent text-ink caret-accent placeholder:text-muted/50 focus:outline-none"
          />
        </label>
      </div>
    </div>
  );
}
