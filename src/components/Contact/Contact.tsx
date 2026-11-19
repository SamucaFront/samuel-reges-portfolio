import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Github, Linkedin, Loader2, Mail, Send, type LucideIcon } from 'lucide-react';
import { RevealText } from '@/components/ui/RevealText';
import { socialLinks } from '@/data/profile';
import { useContactForm, type FormValues } from './useContactForm';
import { fadeUp, stagger, viewport } from '@/utils/motion';
import { cn } from '@/utils/format';
import type { SocialLink } from '@/types';

const icons: Record<SocialLink['id'], LucideIcon> = { linkedin: Linkedin, github: Github, email: Mail };

function hrefFor(l: SocialLink) {
  if (!l.value) return '';
  return l.id === 'email' && !l.value.startsWith('mailto:') ? `mailto:${l.value}` : l.value;
}

function displayFor(l: SocialLink) {
  if (!l.value) return 'Em breve';
  return l.value.replace(/^mailto:/, '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function Contact() {
  const form = useContactForm();

  return (
    <section id="contato" className="frame py-24 sm:py-36" aria-label="Contato">
      <div className="mb-8 flex items-center justify-between border-t border-line pt-4">
        <span className="meta">
          <span className="text-accent">(06)</span> — Contato
        </span>
        <span className="meta hidden sm:inline">sr://contato</span>
      </div>

      <RevealText text="LET'S CONNECT." className="text-[clamp(3.2rem,13.5vw,13rem)]" />
      <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="mt-6 text-xl text-ink sm:text-2xl">
        Ready to build something <span className="font-script text-[1.6em] leading-none text-accent">extraordinary</span>?
      </motion.p>

      <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* canais */}
        <motion.ul className="lg:col-span-5" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport}>
          {socialLinks.map((l, i) => {
            const Icon = icons[l.id];
            const href = hrefFor(l);
            const inner = (
              <>
                <span className="flex items-center gap-4">
                  <span className="meta w-5">{String(i + 1).padStart(2, '0')}</span>
                  <Icon size={18} strokeWidth={1.4} aria-hidden />
                  <span className="display text-2xl sm:text-3xl">{l.label}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="hidden font-mono text-xs text-muted sm:inline">{displayFor(l)}</span>
                  {href && <ArrowUpRight size={18} strokeWidth={1.4} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />}
                </span>
              </>
            );
            return (
              <motion.li key={l.id} variants={fadeUp} className="border-b border-line first:border-t">
                {href ? (
                  <a
                    href={href}
                    target={l.id === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-6 transition-colors hover:text-accent"
                  >
                    {inner}
                  </a>
                ) : (
                  <span className="flex items-center justify-between py-6 text-muted" aria-disabled="true" title="Link ainda não configurado">
                    {inner}
                  </span>
                )}
              </motion.li>
            );
          })}
        </motion.ul>

        {/* formulário */}
        <motion.form
          noValidate
          onSubmit={form.submit}
          className="lg:col-span-6 lg:col-start-7"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          aria-label="Formulário de contato"
        >
          <p className="meta mb-8">
            <span className="text-accent">$</span> send --message
          </p>

          {/* honeypot */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.values.website}
                onChange={(e) => form.setField('website', e.target.value)}
              />
            </label>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <Field form={form} name="name" label="Nome" autoComplete="name" />
            <Field form={form} name="email" label="E-mail" type="email" autoComplete="email" />
          </div>
          <div className="mt-8">
            <Field form={form} name="message" label="Mensagem" multiline />
          </div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p
              role="status"
              aria-live="polite"
              className={cn(
                'min-h-[1.25rem] font-mono text-xs',
                form.status === 'error' ? 'text-accent' : 'text-muted',
              )}
            >
              {form.status !== 'idle' && form.status !== 'sending' ? form.feedback : form.channel === 'none' ? '// canal de envio não configurado' : ''}
            </p>
            <button
              type="submit"
              disabled={form.status === 'sending'}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.14em] text-bg transition-colors hover:bg-accent hover:text-white disabled:opacity-60"
            >
              {form.status === 'sending' ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Enviando
                </>
              ) : form.status === 'success' || form.status === 'mailto' ? (
                <>
                  <Check size={14} /> Enviado
                </>
              ) : (
                <>
                  Enviar mensagem <Send size={13} className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}

type FormApi = ReturnType<typeof useContactForm>;

function Field({
  form,
  name,
  label,
  type = 'text',
  autoComplete,
  multiline,
}: {
  form: FormApi;
  name: Exclude<keyof FormValues, 'website'>;
  label: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const error = form.touched[name] ? form.errors[name] : undefined;
  const id = `contact-${name}`;
  const common = {
    id,
    name,
    value: form.values[name],
    onBlur: () => form.blur(name),
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
    required: true,
    className: cn('field', error && 'border-accent focus:border-accent'),
  };
  return (
    <motion.div variants={fadeUp}>
      <label htmlFor={id} className="meta flex justify-between">
        <span>{label} *</span>
        {multiline && <span>{form.values.message.length}/3000</span>}
      </label>
      {multiline ? (
        <textarea {...common} rows={5} maxLength={3000} className={cn(common.className, 'resize-none')} onChange={(e) => form.setField(name, e.target.value)} />
      ) : (
        <input {...common} type={type} autoComplete={autoComplete} onChange={(e) => form.setField(name, e.target.value)} />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 font-mono text-[11px] text-accent">
          {error}
        </p>
      )}
    </motion.div>
  );
}
