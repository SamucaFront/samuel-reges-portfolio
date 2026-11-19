# Samuel Reges — Portfolio

Portfólio editorial de **Samuel Reges, Software Developer**.
Editorial Design · Swiss Typography · Minimalism · Creative Development.

## Stack

React 18 · TypeScript (strict) · Vite 5 · Tailwind CSS 3 · CSS Variables · Framer Motion · Lucide React · alias `@/` → `src/`.

## Como rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build
```

## Onde editar o conteúdo

Todo o conteúdo fica em `src/data/` — nenhum componente precisa ser alterado.

| Arquivo | O que contém |
| --- | --- |
| `profile.ts` | Nome, textos do "Sobre", `developer.js`, **e-mail** e links de **LinkedIn/GitHub** (começam vazios) |
| `projects.ts` | Os 6 projetos. Preencha `problem`, `links.github`, `links.demo` e, se quiser, `cover` (imagem em `/public`) |
| `technologies.ts` | Categorias e tecnologias. `level` (0–100) fica vazio até ser preenchido com dados reais |
| `education.ts` | Formação (`institution` e `period` editáveis), certificações (lista vazia) e idiomas |
| `experience.ts` | Timeline no estilo `git log` |

Campos vazios aparecem como "a definir", "indisponível" ou "em breve" — nada é inventado.

## Formulário de contato

Ordem de envio:

1. Se `VITE_CONTACT_ENDPOINT` existir (veja `.env.example`), envia `POST` com JSON `{ name, email, message }`.
2. Senão, se `profile.email` estiver preenchido, abre o cliente de e-mail via `mailto:`.
3. Senão, avisa que o canal de envio não está configurado.

Inclui validação por campo, feedback acessível (`aria-live`) e honeypot anti-spam.

## Design system

Tokens em `src/styles/globals.css` como canais RGB (`--bg`, `--bg-2`, `--surface`, `--ink`, `--muted`, `--line`, `--accent`), expostos ao Tailwind (`bg-bg`, `text-ink`, `text-accent`…).

- **Light:** `#E9E9E9` / `#F4F4F2` / `#171717` / `#777777` / `#CCCCCC` / `#FF3535`
- **Dark:** `#111111` / `#191919` / `#222222` / `#F1F1EF` / `#929292` / `#353535` / `#FF4545`

Tipografia: Archivo Black (títulos), Inter (texto), JetBrains Mono (metadados), Mrs Saint Delafield (assinatura).

O tema respeita `prefers-color-scheme` na primeira visita e salva a escolha em `localStorage` (`sr-theme`), aplicada antes da renderização para evitar flash.

## Destaques

- **Hero:** `PORTFOLIO` dimensionado via `ResizeObserver` para ocupar exatamente a largura disponível em qualquer tela, com a assinatura SVG desenhada progressivamente (traço + máscara + floreio).
- Parallax no scroll e no mouse, cursor customizado (só em ponteiro fino), indicador da seção ativa.
- Modal de projeto com foco preso, `Esc` para fechar e `←`/`→` para navegar.
- `prefers-reduced-motion` respeitado globalmente (`MotionConfig reducedMotion="user"` + CSS).
- Sem scroll horizontal (testado de 390px a 1440px).

## Estrutura

```
src/
  components/  Navbar Hero About TechStack Projects Education Languages Experience Contact Footer ThemeToggle ui
  data/        profile projects technologies education experience navigation
  hooks/       useTheme useActiveSection useClock useLockBody
  styles/      globals.css
  types/       index.ts
  utils/       motion.ts format.ts
```
