import type { Certification, EducationEntry, Language } from '@/types';

/** Preencha `institution` e `period` com os dados reais. */
export const education: EducationEntry[] = [
  {
    degree: 'Bacharelado em Engenharia de Software',
    status: 'Em andamento',
    institution: 'UNIFAN — Alfredo Nasser',
    period: '7º período',
  },
];

/**
 * Lista vazia de propósito. Para adicionar, siga o formato:
 * { name: 'Nome da certificação', issuer: 'Instituição', date: '2026', url: 'https://...' }
 */
export const certifications: Certification[] = [];

export const languages: Language[] = [
  { name: 'Português', level: 'Nativo', score: 5 },
  { name: 'Inglês', level: 'Intermediário', score: 3 },
];
