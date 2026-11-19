import type { TechCategory } from '@/types';

/** `level` fica indefinido de propósito: preencha apenas com informação real. */
export const technologies: TechCategory[] = [
  {
    id: 'frontend',
    index: '01',
    title: 'Frontend',
    items: [{ name: 'HTML5' }, { name: 'CSS3' }, { name: 'JavaScript' }, { name: 'TypeScript' }, { name: 'React' }, { name: 'Tailwind CSS' }],
  },
  {
    id: 'backend',
    index: '02',
    title: 'Backend',
    items: [{ name: 'Java' }, { name: 'Node.js' }, { name: 'Express' }, { name: 'Python' }, { name: 'APIs REST' }, { name: 'TypeORM' }],
  },
  {
    id: 'database',
    index: '03',
    title: 'Database',
    items: [{ name: 'PostgreSQL' }, { name: 'MySQL' }, { name: 'MariaDB' }, { name: 'SQLite' }],
  },
  {
    id: 'tools',
    index: '04',
    title: 'Tools & Workflow',
    items: [{ name: 'Git' }, { name: 'GitHub' }, { name: 'VS Code' }, { name: 'IntelliJ IDEA' }, { name: 'Postman' }, { name: 'Docker' }],
  },
  {
    id: 'data',
    index: '05',
    title: 'Data & Analytics',
    items: [{ name: 'Power BI' }, { name: 'Microsoft Excel' }, { name: 'SQL' }, { name: 'Análise de Dados' }],
  },
];
