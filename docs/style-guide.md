# Style Guide — Code Writing Patterns

## General Conventions
- Single quotes for strings; semicolons required.
- TypeScript strict mode enabled.
- Use path aliases consistently: `@components/*`, `@lib/*`, `@ui/*`, `@hooks/*`.
- Named exports preferred over `export default` (e.g., `export function`, `export type`).
- Use direct imports like `import { useEffect } from 'react'` instead of `import * as React from 'react'` where possible.
- Use `cn()` (tailwind-merge) for classnames.
- Prefer destructuring with defaults for props; keep prop order: event handlers last.

## Function Parameters
- Pass options as a single object when 2+ params; use `React.ComponentProps`/`PropsWithChildren` for prop typing.
- For callbacks, wrap in `useCallback`; for derived lists, use `useMemo`.

## Props & Types
- Define explicit prop types with `React.ComponentProps<typeof X> & { extra?: Type }`.
- Export types alongside components: `export type { ComponentNameProps }`.

## Platform-Specific Styles
- Use `Platform.select({ web: '…', default: '…' })` for web/ native differences.

## Hooks & Data Fetching
- Return `{ data, isLoading, isRefreshing, refetch }` shape from data hooks.
- Enable queries with `enabled` when dependent on required params.
