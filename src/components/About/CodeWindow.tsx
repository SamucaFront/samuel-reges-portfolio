import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { fadeUp, viewport } from '@/utils/motion';

type Token = { t: string; c?: 'kw' | 'key' | 'str' | 'punc' | 'muted' };

const str = (v: string): Token => ({ t: `'${v}'`, c: 'str' });
const arr = (vals: string[]): Token[] => [
  { t: '[', c: 'punc' },
  ...vals.flatMap((v, i) => (i < vals.length - 1 ? [str(v), { t: ', ', c: 'punc' as const }] : [str(v)])),
  { t: ']', c: 'punc' },
];

function buildLines(): Token[][] {
  const d = profile.developer;
  const prop = (key: string, value: Token[]): Token[] => [
    { t: '  ' },
    { t: key, c: 'key' },
    { t: ': ', c: 'punc' },
    ...value,
    { t: ',', c: 'punc' },
  ];
  return [
    [{ t: '// developer.js', c: 'muted' }],
    [{ t: 'const ', c: 'kw' }, { t: 'developer' }, { t: ' = {', c: 'punc' }],
    prop('name', [str(d.name)]),
    prop('role', [str(d.role)]),
    prop('education', [str(d.education)]),
    prop('focus', arr(d.focus)),
    prop('interests', arr(d.interests)),
    prop('mindset', [str(d.mindset)]),
    [{ t: '};', c: 'punc' }],
    [],
    [{ t: 'export default ', c: 'kw' }, { t: 'developer' }, { t: ';', c: 'punc' }],
  ];
}

const color: Record<NonNullable<Token['c']>, string> = {
  kw: 'text-accent',
  key: 'text-ink',
  str: 'text-muted',
  punc: 'text-muted/70',
  muted: 'text-muted/70 italic',
};

export function CodeWindow() {
  const lines = buildLines();
  return (
    <motion.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="overflow-hidden rounded-[4px] border border-line bg-bg-2"
      aria-label="Arquivo developer.js com o perfil de Samuel Reges"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full border border-line" />
          <span className="h-2.5 w-2.5 rounded-full border border-line" />
        </div>
        <span className="meta normal-case tracking-normal">developer.js</span>
        <span className="meta">JS</span>
      </div>
      <pre className="overflow-x-auto px-4 py-5 font-mono text-[12px] leading-[1.9] sm:text-[13px]">
        <code>
          {lines.map((line, i) => (
            <motion.span
              key={i}
              className="flex"
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
            >
              <span aria-hidden className="mr-5 w-5 shrink-0 select-none text-right text-muted/50">
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {line.map((tok, j) => (
                  <span key={j} className={tok.c ? color[tok.c] : 'text-ink'}>
                    {tok.t}
                  </span>
                ))}
                {i === lines.length - 1 && (
                  <span aria-hidden className="pulse-dot ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[0.2em] bg-accent" />
                )}
              </span>
            </motion.span>
          ))}
        </code>
      </pre>
    </motion.figure>
  );
}
