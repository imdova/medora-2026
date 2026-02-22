# Folder structure and rationale

## `/app`

- **App Router** entry. All routes live here (`page.tsx`, `layout.tsx`, `loading.tsx`, etc.).
- **Server Components** by default; add `"use client"` only where needed (interactivity, hooks, browser APIs).
- **Layouts** wrap segments and provide shared UI (e.g. `dashboard/layout.tsx` with sidebar + header).

## `/components`

- **`/ui`** — Primitive, reusable UI from shadcn/Radix (Button, Input, Card, Dialog, Table, Form, etc.). No business logic; only presentational and accessibility.
- **`/shared`** — Composed, domain-agnostic pieces: DataTable (TanStack Table), RichTextEditor (Tiptap), SortableCards (dnd-kit), ThemeProvider, ThemeToggle. Used across features.
- **`/features`** — Feature-specific modules (e.g. `dashboard/`: AppSidebar, AppHeader, TaskFormModal, task columns). Can grow to `auth/`, `patients/`, etc.

**Why:** Clear split between primitives (ui), shared composition (shared), and feature UI (features). Easier to locate and refactor.

## `/lib`

- **`/db`** — Dummy in-memory data, `delay()`, and CRUD. **Not imported by UI.** Strongly typed; every “fetch” awaits `delay()` and returns deep-cloned data.
- **`/dal`** — Data access layer. Exposes `fetchUsers()`, `createTask()`, etc. **UI imports only from `/lib/dal`.** Today these call `/lib/db`; tomorrow they can call `fetch("/api/...")` or server actions without changing UI.
- **`/validations`** — Zod schemas for forms and (when you add API) request/response validation.
- **`/store`** — Zustand store built from **slices** (e.g. `ui-slice`). Selectors (e.g. `useSidebarOpen()`) limit re-renders.
- **`/tiptap`** — Tiptap extensions list; single place to add/remove editor features.
- **`/utils`** — Helpers like `cn()` for class names.

**Why:** One place for “where data comes from” (DAL), one for “how we validate it” (validations), one for client state (store). DB is an implementation detail behind DAL.

## `/types`

- Shared domain types (e.g. `User`, `Task`). Used by db, dal, validations, and components. Kept stable when swapping dummy DB for real API.

## `/hooks` (optional)

- Custom hooks (e.g. `useDebounce`, `useLocalStorage`). Keeps components thin.

## `/constants` (optional)

- App-wide constants (routes, config). Avoids magic strings in code.

## Integration strategy (future API)

1. **Types** in `/types` stay the same; API responses are parsed/validated (e.g. with Zod) into these types.
2. **DAL** functions keep the same signatures; only their implementation changes (e.g. from `getTasks()` in `/lib/db` to `fetch("/api/tasks")` or a server action).
3. **UI** keeps calling `fetchTasks()`, `createTask()`, etc. No component refactors needed.
4. **Validations** can be reused for API request/response schemas.

This keeps the migration path: **replace DAL implementation → keep types and UI contracts.**
