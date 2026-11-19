import type { Project } from '@/types';

/**
 * Projetos. Os campos `problem` e `links` começam vazios quando não há
 * informação real — o modal exibe um estado "a preencher" nesses casos.
 * Para usar uma imagem real de capa, coloque o arquivo em /public e
 * preencha `cover` (ex.: '/covers/lexcore.jpg').
 */
export const projects: Project[] = [
  {
    id: 'lexcore',
    number: '01',
    name: 'LexCore',
    tagline: 'SaaS de gestão para escritórios de advocacia.',
    summary: 'Monorepo com 10 módulos e biblioteca própria de componentes de interface.',
    description:
      'SaaS de gestão para escritórios de advocacia. Monorepo com Next.js, NestJS, PostgreSQL, Prisma, JWT e Turborepo. Possui 10 módulos e biblioteca própria de componentes de interface.',
    problem: '',
    features: ['Arquitetura monorepo com Turborepo', '10 módulos', 'Biblioteca própria de componentes de interface', 'Autenticação com JWT'],
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'JWT', 'Turborepo'],
    status: 'Concluído',
    links: { github: '', demo: '' },
  },
  {
    id: 'noctis-capital',
    number: '02',
    name: 'Noctis Capital',
    tagline: 'SaaS financeiro Full Stack com interface dark premium.',
    summary: 'Plataforma financeira com back-end em Node.js e autenticação JWT.',
    description: 'SaaS financeiro Full Stack com interface dark premium, construído com Node.js, Express, PostgreSQL e JWT.',
    problem: '',
    features: ['Interface dark premium', 'Autenticação com JWT'],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    status: 'Em desenvolvimento',
    links: { github: '', demo: '' },
  },
  {
    id: 'gm-training',
    number: '03',
    name: 'GM Training',
    tagline: 'Plataforma premium de cursos fitness online.',
    summary: 'Autenticação, catálogo, ranking, player de aulas e painel administrativo.',
    description: 'Plataforma premium de cursos fitness online, desenvolvida com React, TypeScript, Tailwind, Node.js e PostgreSQL.',
    problem: '',
    features: ['Autenticação', 'Catálogo de cursos', 'Ranking', 'Player de aulas', 'Painel administrativo'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    status: 'Em desenvolvimento',
    links: { github: '', demo: '' },
  },
  {
    id: 'vintra-capital',
    number: '04',
    name: 'Vintra Capital',
    tagline: 'Gestão de empréstimos, clientes e parcelas.',
    summary: 'Clientes, parcelas, juros, agenda e notificações.',
    description: 'Sistema de gestão de empréstimos, clientes, parcelas, juros, agenda e notificações.',
    problem: '',
    features: ['Gestão de empréstimos', 'Cadastro de clientes', 'Controle de parcelas', 'Cálculo de juros', 'Agenda', 'Notificações (e-mail e SMS)'],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Nodemailer', 'Twilio'],
    status: 'Em desenvolvimento',
    links: { github: '', demo: '' },
  },
  {
    id: 'odontoplus',
    number: '05',
    name: 'Clínica OdontoPlus',
    tagline: 'API REST para gestão de clínica odontológica.',
    summary: '20 endpoints testados no Postman.',
    description: 'API REST desenvolvida com TypeScript, Node.js, Express, TypeORM e PostgreSQL. 20 endpoints testados no Postman.',
    problem: '',
    features: ['API REST', '20 endpoints', 'Endpoints testados no Postman'],
    technologies: ['TypeScript', 'Node.js', 'Express', 'TypeORM', 'PostgreSQL', 'Postman'],
    status: 'Concluído',
    links: { github: '', demo: '' },
  },
  {
    id: 'emprestimopro',
    number: '06',
    name: 'EmpréstimoPRO',
    tagline: 'Aplicativo Android nativo para gestão de empréstimos.',
    summary: 'Kotlin, Jetpack Compose, Room e Navigation Compose.',
    description: 'Aplicativo Android nativo para gestão de empréstimos, desenvolvido com Kotlin, Jetpack Compose, Room e Navigation Compose.',
    problem: '',
    features: ['Aplicativo Android nativo', 'Persistência local com Room', 'Navegação com Navigation Compose'],
    technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Navigation Compose'],
    status: 'Concluído',
    links: { github: '', demo: '' },
  },
];
