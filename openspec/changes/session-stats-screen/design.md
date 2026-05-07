## Context

The app currently has a weekend detail screen (`/weekend/[meetingKey]`) showing race calendar info, session schedule, and navigation to results/race control. There's a non-functional "Session Stats" placeholder button that should navigate to a new screen displaying circuit information.

The app uses OpenF1 API for race data. For circuit details (image, stats, lap records), we need to integrate api-sports.io which provides richer circuit data. To protect the api-sports API key and avoid rate limits, we will use a Cloudflare Worker as a proxy.

## Goals / Non-Goals

**Goals:**
- Create a new session stats screen showing circuit information
- Display: circuit image, city name, laps, circuit length, race distance, lap record (time, driver, year), year opened, capacity
- Integrate api-sports circuit data via Cloudflare Worker proxy
- Connect the existing placeholder button to the new screen

**Non-Goals:**
- Weather data display
- Session results display
- Session picker (multiple sessions)
- Driver/team standings
- Offline caching (handled by React Query with staleTime)
- Cloudflare Worker deployment (documented as prerequisite)

## Decisions

### 1. Circuit Data Source: Cloudflare Worker Proxy

**Decision:** Call api-sports through a Cloudflare Worker instead of directly from the app.

**Rationale:**
- Protects API key (hidden from client-side code)
- Handles rate limiting (100 req/day free tier on Cloudflare vs 100 req/day on api-sports)
- Provides caching at the edge

**Alternatives considered:**
- Direct API calls: Exposes API key in app bundle
- React Query persistence: Doesn't solve thundering herd on first app open

### 2. Circuit Matching: Fuzzy Location Matching

**Decision:** Match OpenF1 meeting to api-sports circuit using location + country with fallback to alias map.

**Rationale:**
- OpenF1 provides: `location` (city), `country_name`
- api-sports provides: `competition.location.city`, `competition.location.country`
- Most circuits have straightforward matches (Miami → Miami, Melbourne → Melbourne)
- Edge cases (Monaco → Monte-Carlo, Silverstone → Silverstone) handled via alias map

**Alternatives considered:**
- Hardcoded ID mapping: Reliable but requires manual maintenance
- API search: Too many requests, bad UX

### 3. Caching Strategy: React Query with 30-day staleTime

**Decision:** Use React Query's staleTime for caching (30 days) without additional file-system persistence.

**Rationale:**
- Survives app backgrounding and component remounts
- Acceptable to refetch on app restart (costs 1 API call)
- Simpler than implementing file-system cache

## Risks / Trade-offs

- [Risk] Circuit matching fails for some tracks → Show circuit info card with "Data unavailable" fallback
- [Risk] Cloudflare Worker unavailable → Show error with retry button
- [Risk] api-sports API key exposed in worker code → Accept risk; can rotate key if abused

## Migration Plan

1. Deploy Cloudflare Worker with api-sports integration
2. Add `EXPO_PUBLIC_CIRCUIT_WORKER_URL` to environment
3. Create api-sports client and types
4. Create session-stats route and component
5. Wire existing placeholder button to new screen

## Open Questions

- Should circuit matching use a more sophisticated algorithm?
- Do we need to handle multiple years of lap records (showing current vs historical)?