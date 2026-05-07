## Why

Fans and users want to stay informed about race control events during sessions - flags, safety car deployments, penalties, and DRS decisions. Currently, the app lacks a dedicated screen to display these critical race control messages.

## What Changes

- Add a new **Race Control** screen accessible from the session hub
- Fetch race control data from OpenF1's `/v1/race_control` endpoint
- Display race control events with category, flag status, messages, and timing
- Show event categories: Flags (Green, Yellow, Double Yellow, Chequered), Safety Car, Session Status, Car Events, DRS

## Capabilities

### New Capabilities

- `race-control-screen`: New screen displaying race control events and flags for a given session
- `race-control-display`: UI components for rendering flag states and race control messages

### Modified Capabilities

- None - this is a net-new feature

## Impact

- New route: `(info)/race-control/[sessionKey]`
- Uses existing `fetchRaceControl` from `@api/openf1/client.ts` with inline useQuery
- New components: `RaceControlList`, `FlagIndicator`, `RaceControlEventCard`