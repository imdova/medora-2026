# Medora 247

Production-grade1 Next.js starter with App Router, TypeScript (strict), Tailwind, shadcn/ui, and a scalable feature-based architecture.

## Stack

- **Next.js 15** (App Router, Server Components by default)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS** + **CVA** (class variance authority)
- **shadcn/ui** + **Radix UI**
- **TanStack Table** (headless data table)
- **Tiptap** (modular rich text editor)
- **dnd-kit** (drag and drop)
- **Motion** (animations, Framer Motion successor)
- **Zustand** (slice-based state)
- **React Hook Form** + **Zod** (+ Zod resolver)

## Quick start

```bash
# Install dependencies
npm install

# Run development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Open Dashboard** to go to the dashboard (sidebar, table, form modal, sortable cards, rich text editor).

## Project structure

| Path | Purpose |
|------|---------|
| `/app` | App Router routes and layouts. Server Components by default. |
| `/components/ui` | Reusable shadcn/Radix primitives (Button, Card, Dialog, etc.). |
| `/components/shared` | Shared composed components (DataTable, RichTextEditor, SortableCards, ThemeProvider, ThemeToggle). |
| `/components/features` | Feature-specific components (dashboard sidebar, header, task form, columns). |
| `/lib/db` | **Dummy database**: mock data, `delay()`, CRUD. **Do not import from here in UI.** |
| `/lib/dal` | **Data access layer**: `fetchUsers`, `createTask`, etc. UI imports only from `/lib/dal`. Swap implementation here when moving to a real API. |
| `/lib/validations` | Zod schemas for forms and API. |
| `/lib/store` | Zustand store (slice pattern). |
| `/lib/tiptap` | Tiptap extensions. |
| `/lib/utils` | `cn()` and other helpers. |
| `/types` | Shared domain types (User, Task, etc.). |
| `/hooks` | Custom React hooks (optional). |
| `/constants` | App constants (optional). |

## Design system

- **Tailwind** uses CSS variables in `app/globals.css` (e.g. `--primary`, `--radius`). Light/dark themes are defined there.
- **Theme toggle**: `ThemeToggle` in header uses `next-themes`; persists in `localStorage`.
- **Containers**: `--container-max`, `--container-sm`, etc. in Tailwind config.

## Data flow (DAL)

1. **UI** calls only **DAL** functions: `fetchTasks()`, `createUser()`, etc.
2. **DAL** (`/lib/dal`) currently delegates to **dummy DB** (`/lib/db`). Each function `await delay()` and returns deep-cloned data.
3. To switch to a real backend:
   - Replace the body of each DAL function with `fetch("/api/...")` or a server action.
   - Keep the same function names and return types. Validate API responses with Zod if needed.
   - No UI refactor: components keep calling `fetchTasks()`, `createTask()`, etc.

## Scripts

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — ESLint
- `npm run format` — Prettier (write)
- `npm run format:check` — Prettier (check)

## Adding shadcn components

```bash
npx shadcn@latest add <component-name>
```

Components are added under `components/ui/`. Use the existing `components.json` and path aliases.
