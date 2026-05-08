## 1. Prerequisites

- [x] 1.1 Deploy Cloudflare Worker with api-sports circuit endpoint
- [x] 1.2 Configure worker to require `X-Worker-Secret` header (shared secret) and reject requests without it
- [x] 1.3 Add `EXPO_PUBLIC_CIRCUIT_WORKER_URL` to environment variables
- [x] 1.4 Add `EXPO_PUBLIC_WORKER_SECRET` to environment variables

## 2. API Client

- [x] 2.1 Create `api/api-sports/types.ts` with Circuit type definitions
- [x] 2.2 Create `api/api-sports/client.ts` with circuit fetching logic
- [x] 2.3 Add `X-Worker-Secret` header with shared secret to Cloudflare Worker requests
- [x] 2.4 Implement circuit matching logic with search parameter
- [x] 2.5 Create `api/api-sports/query-keys.ts` for React Query (removed as simplified)

## 3. Route Setup

- [x] 3.1 Create `app/(info)/session-stats/[meetingKey].tsx` route file

## 4. UI Component

- [x] 4.1 Create `components/session-stats/session-stats-screen.tsx`
- [x] 4.2 Build CircuitInfoCard component with all fields
- [x] 4.3 Add circuit image display
- [x] 4.4 Add stats grid (laps, length, distance, opened, capacity)
- [x] 4.5 Add lap record display
- [x] 4.6 Handle "circuit data unavailable" fallback state

## 5. Navigation

- [x] 5.1 Update `weekend-detail-screen.tsx` to wire Session Stats button to new route

## 6. Testing

- [x] 6.1 Verify screen loads with circuit data for known meeting
- [x] 6.2 Test fallback state for unmatched circuits
- [x] 6.3 Verify navigation from weekend detail to session stats
- [x] 6.4 Run lint and typecheck