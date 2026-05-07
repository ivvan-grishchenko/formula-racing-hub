## Context

Currently, OpenF1 API endpoint strings are duplicated across two files:
- `api/openf1/client.ts` — 8 endpoint strings used in fetch functions
- `api/openf1/query-keys.ts` — 4 endpoint strings used in TanStack Query key factories

The endpoints are: `championship_drivers`, `championship_teams`, `drivers`, `meetings`, `race_control`, `session_result`, `sessions`, `weather`.

This duplication creates maintenance risk — if an endpoint name changes, developers must update multiple files.

## Goals / Non-Goals

**Goals:**
- Create a single source of truth for all OpenF1 endpoint strings
- Reduce code duplication and maintenance risk
- Maintain backward compatibility (no breaking changes to existing function signatures)

**Non-Goals:**
- Changing endpoint URLs (this is a refactor, not an API migration)
- Adding new endpoints (existing endpoints only)
- Type-safe endpoint-to-type mapping (out of scope — keep it simple)
- Modifying the TracingInsights client (separate concern)

## Decisions

### Decision: Centralize endpoints into `api/openf1/endpoints.ts`

**Alternative considered:** Keep endpoint strings inline and rely on IDE search for refactoring.

**Rationale:** Explicit constants provide better discoverability, documentation, and compile-time error if an endpoint is misnamed. It's a simple change with clear benefits.

### Decision: Use `as const` for immutable endpoint objects

```typescript
export const openf1Endpoints = {
  championshipDrivers: 'championship_drivers',
  // ...
} as const;
```

**Rationale:** `as const` makes the values readonly and enables type inference. It prevents accidental reassignment and allows consumers to use `typeof` patterns if needed later.

### Decision: Keep endpoint constants as simple string mappings (not enum)

**Alternative considered:** Use a TypeScript enum.

**Rationale:** String constants with `as const` are simpler, more ergonomic (no `Enum.Value` syntax), and work better with string-based APIs. Enums add unnecessary ceremony for this use case.

## Risks / Trade-offs

- **Low risk**: This is a pure refactor with no behavioral changes
- **No migration needed**: Update all references in a single PR — no rollback required since there's no deployment
- **Minimal testing**: Verify existing tests still pass (no test changes expected)

## Open Questions

- None — the scope is clear and straightforward.