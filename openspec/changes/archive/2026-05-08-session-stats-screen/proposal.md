## Why

The weekend detail page has a placeholder "Session Stats" button that is not functional. Users need a dedicated screen to view detailed circuit information (image, stats, lap records) for each race weekend. This provides valuable context about the track before viewing session results.

## What Changes

- Create new `/session-stats/[meetingKey]` route
- Create `SessionStatsScreen` component with circuit info card
- Integrate api-sports circuit data via Cloudflare Worker proxy
- Wire the existing placeholder button to navigate to the new screen
- Add circuit matching logic to link OpenF1 meeting to api-sports circuit

## Capabilities

### New Capabilities

- `session-stats-screen`: New screen displaying circuit information including image, city name, laps, circuit length, race distance, lap record (time, driver, year), year opened, and capacity

### Modified Capabilities

- None

## Impact

- New route: `app/(info)/session-stats/[meetingKey].tsx`
- New component: `components/session-stats/session-stats-screen.tsx`
- New API client: `api/api-sports/client.ts`
- Existing change: Update `weekend-detail-screen.tsx` to link to new screen
- Dependency: Cloudflare Worker for api-sports proxy (protects API key and rate limits)