import type { SocialLink } from '@/types';

/**
 * Dados pessoais. Preencha os campos vazios com informações reais.
 * Nada aqui foi inventado: links e e-mail começam vazios de propósito.
 */
export const profile = {
  name: 'Samuel Reges',
  role: 'Software Developer',
  location: 'Brazil',
  available: true,
  /** E-mail de contato (ex.: "nome@dominio.com"). Usado nos links e no fallback mailto do formulário. */
  email: 'samucadev4@gmail.com',
  about: {
    title: 'ABOUT ME.',
    subtitle: 'Desenvolvimento Full Stack: web, mobile e back-end.',
    paragraphs: [
      'Estudante de Engenharia de Software e desenvolvedor Full Stack, interessado em construir soluções digitais completas, desde a modelagem de dados e desenvolvimento de APIs até a criação de interfaces modernas.',
      'Tenho interesse em arquitetura de software, desenvolvimento back-end, banco de dados e soluções que resolvam problemas reais.',
    ],
    principles: [
      {
        index: '01',
        title: 'Filosofia',
        text: 'Software bom é software que dá para manter: componentes pequenos, responsabilidades bem separadas e decisões que continuem fazendo sentido no futuro.',
      },
      {
        index: '02',
        title: 'Aprendizado',
        text: 'Aprender construindo, experimentar tecnologias e transformar conhecimento em soluções funcionais.',
      },
      {
        index: '03',
        title: 'Objetivo',
        text: 'Atuar profissionalmente como desenvolvedor de software, contribuindo em produtos reais e evoluindo em arquitetura e engenharia de back-end.',
      },
    ],
  },
  developer: {
    name: 'Samuel Reges',
    role: 'Software Developer',
    education: 'Engenharia de Software',
    focus: ['Backend', 'Frontend', 'Database'],
    interests: ['APIs', 'Arquitetura', 'Dados', 'UI/UX'],
    mindset: 'Continuous Learning',
  },
};

export const socialLinks: SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', value: 'https://www.linkedin.com/in/samuel-reges-204421381/' },
  { id: 'github', label: 'GitHub', value: 'https://github.com/SamucaFront' },
  { id: 'email', label: 'E-mail', value: profile.email },
];
