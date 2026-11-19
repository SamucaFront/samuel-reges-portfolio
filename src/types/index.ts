export type Theme = 'light' | 'dark';

export type ProjectStatus = 'Concluído' | 'Em desenvolvimento';

export interface Project {
  id: string;
  number: string;
  name: string;
  tagline: string;
  summary: string;
  /** Descrição completa exibida no modal. */
  description: string;
  /** Problema que o projeto resolve. Deixe vazio até ter um texto real. */
  problem: string;
  /** Somente funcionalidades/escopo informados — nada inventado. */
  features: string[];
  technologies: string[];
  status: ProjectStatus;
  year?: string;
  /** Caminho opcional para uma imagem real em /public. Sem ela, gera-se uma capa tipográfica. */
  cover?: string;
  links: { github: string; demo: string };
}

export interface TechCategory {
  id: string;
  index: string;
  title: string;
  items: { name: string; /** Nível real de domínio (0–100). Deixe undefined até ser preenchido. */ level?: number }[];
}

export interface EducationEntry {
  degree: string;
  status: string;
  institution: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  name: string;
  level: string;
  /** Escala de 1 a 5. */
  score: number;
}

export interface ExperienceEntry {
  hash: string;
  role: string;
  company: string;
  period: string;
  current: boolean;
  responsibilities: string[];
  technologies: string[];
}

export interface SocialLink {
  id: 'linkedin' | 'github' | 'email';
  label: string;
  /** URL ou endereço. Vazio = ainda não configurado. */
  value: string;
}
