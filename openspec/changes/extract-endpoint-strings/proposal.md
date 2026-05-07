## Why

The OpenF1 API endpoint strings (e.g., `'drivers'`, `'meetings'`, `'sessions'`) are hardcoded as string literals in multiple files. This creates duplication and risk — if an endpoint name changes, developers must update it in multiple places and may miss one. Centralizing these strings into a single source of truth improves maintainability and reduces the chance of errors.

## What Changes

- Create a new `api/openf1/endpoints.ts` file with all endpoint strings as constants
- Update `api/openf1/client.ts` to import and use the centralized endpoint constants
- Update `api/openf1/query-keys.ts` to import and use the centralized endpoint constants (where applicable)
- No new capabilities or behavioral changes — this is a pure refactor

## Capabilities

### New Capabilities
- `api-endpoints-centralization`: Centralize all OpenF1 API endpoint strings into a single file for maintainability

### Modified Capabilities
- (none — this is a refactor with no requirement changes)

## Impact

- **Files modified**: `api/openf1/client.ts`, `api/openf1/query-keys.ts`, new `api/openf1/endpoints.ts`
- **No breaking changes**: All existing function signatures remain identical
- **No new dependencies**: Uses existing project patterns