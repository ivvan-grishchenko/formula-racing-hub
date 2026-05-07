## Context

The Formula Racing Hub app currently displays session information, driver data, and timing data, but lacks visibility into race control events. The OpenF1 API provides a `race_control` endpoint that streams events like flags, safety car deployments, penalties, and DRS decisions during sessions.

## Goals / Non-Goals

**Goals:**
- Display race control events (flags, safety car, session status) for a selected session
- Clear visual representation of flag states and event categories
- Accessible from session detail screen

**Non-Goals:**
- Historical race control data from past sessions (only current/live)
- Push notifications for race control events (future enhancement)
- Offline support for race control data

## Decisions

1. **Data display**: Display events in reverse chronological order (newest first) with the most recent events prominently visible. Use color coding for flag states (green, yellow, red).

2. **Filtering**: Allow filtering by event category (Flags, Safety Car, Session Status, Car Events) to let users focus on relevant information.

3. **API integration**: Use the existing `fetchRaceControl` function from `@api/openf1/client.ts` with inline `useQuery` from TanStack Query.

## Risks / Trade-offs

- **[Risk] API rate limits**: OpenF1 free tier has rate limits. Mitigation: The client uses rate limiting via SlidingWindowThrottle.
- **[Risk] Missing driver context**: Race control events may reference driver numbers without full context. Mitigation: Join with drivers data to show driver names and team colors.
- **[Risk] Event timing**: Events may arrive with slight delays. Mitigation: Show timestamp.