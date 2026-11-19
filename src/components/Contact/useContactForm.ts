import { useState } from 'react';
import { isEmail } from '@/utils/format';
import { profile } from '@/data/profile';

export interface FormValues {
  name: string;
  email: string;
  message: string;
  /** honeypot — deve permanecer vazio */
  website: string;
}
export type FormErrors = Partial<Record<'name' | 'email' | 'message', string>>;
export type FormStatus = 'idle' | 'sending' | 'success' | 'mailto' | 'error';

const initial: FormValues = { name: '', email: '', message: '', website: '' };

export function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};
  if (v.name.trim().length < 2) e.name = 'Informe seu nome (mínimo 2 caracteres).';
  if (!isEmail(v.email)) e.email = 'Informe um e-mail válido.';
  if (v.message.trim().length < 10) e.message = 'A mensagem precisa ter ao menos 10 caracteres.';
  if (v.message.length > 3000) e.message = 'A mensagem pode ter no máximo 3000 caracteres.';
  return e;
}

export function useContactForm() {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [feedback, setFeedback] = useState('');

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ?? '';
  const email = profile.email.trim();
  const channel: 'endpoint' | 'mailto' | 'none' = endpoint ? 'endpoint' : email ? 'mailto' : 'none';

  const setField = (k: keyof FormValues, val: string) => {
    const next = { ...values, [k]: val };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
    if (status === 'error' || status === 'success' || status === 'mailto') setStatus('idle');
  };

  const blur = (k: keyof FormValues) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length) {
      setStatus('error');
      setFeedback('Revise os campos destacados.');
      return;
    }
    // honeypot preenchido: finge sucesso e descarta
    if (values.website) {
      setStatus('success');
      setFeedback('Mensagem enviada. Obrigado!');
      setValues(initial);
      return;
    }

    const payload = { name: values.name.trim(), email: values.email.trim(), message: values.message.trim() };

    if (channel === 'endpoint') {
      setStatus('sending');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('success');
        setFeedback('Mensagem enviada com sucesso. Retorno em breve!');
        setValues(initial);
        setTouched({});
      } catch {
        setStatus('error');
        setFeedback('Não foi possível enviar agora. Tente novamente em instantes.');
      }
      return;
    }

    if (channel === 'mailto') {
      const subject = encodeURIComponent(`Contato via portfólio — ${payload.name}`);
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name}\n${payload.email}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      setFeedback('Abrimos seu aplicativo de e-mail com a mensagem pronta para envio.');
      return;
    }

    setStatus('error');
    setFeedback('Canal de envio ainda não configurado. Use um dos links ao lado.');
  };

  return { values, errors, touched, status, feedback, channel, setField, blur, submit };
}
