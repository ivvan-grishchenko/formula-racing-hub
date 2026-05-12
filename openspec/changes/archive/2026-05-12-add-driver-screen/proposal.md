## Why

There is no way to explore individual driver data beyond what is shown in shared contexts like the home screen or standings. Users who want to dive deeper into a driver's season performance, race history, tyre strategies, overtake patterns, or team radio messages have no dedicated screen to do so. All existing entry points (home, standings, starting grid, race control, session stats) show driver data as secondary context — names in lists, headshots in cards — with no path to a full driver profile.

## What Changes

- New `/app/(info)/driver/[driverNumber].tsx` route — driver detail screen in the existing (info) stack
- New `useDriverData` hook to aggregate all driver-related queries
- New driver screen components: header, season stats, session result, lap times, position arc, tyre strategy, overtakes, pit stops, team radio
- New API client functions for `fetchPosition`, `fetchOvertakes`, `fetchStints`, `fetchPit`, `fetchTeamRadio`
- New `OpenF1Position`, `OpenF1Overtake`, `OpenF1Stint`, `OpenF1Pit`, `OpenF1TeamRadio` types
- `gifted-charts` + `expo-linear-gradient` + `react-native-svg` dependencies for line/bar charts
- `expo-av` for team radio audio playback
- Skeleton loaders during data fetch per section
- Driver tap targets on home, standings, starting grid, race control, session stats screens linking to the new driver route

## Capabilities

### New Capabilities

- `driver-screen`: Full driver detail page with season overview, per-session stats, charts, tyre strategy, overtake data, pit stops, and team radio
- `driver-session-picker`: Year + session type + meeting picker to scope driver data to a specific context
- `driver-charts`: Lap time trend charts and season points bar chart using `gifted-charts`
- `driver-team-radio`: Audio playback of team radio recordings using `expo-av`
- `driver-position-arc`: Step chart visualizing position changes over race distance

### Modified Capabilities

_(none — no existing spec behavior changes)_

## Impact

- New route `app/(info)/driver/[driverNumber].tsx` with `meetingKey` and `sessionKey` query params
- New API client functions in `api/openf1/client.ts`
- New type definitions in `api/openf1/types.ts`
- New hook `hooks/use-driver-data.ts` with multiple TanStack queries
- New chart components in `components/driver/` directory
- New audio playback state via `expo-av`
- New dependencies: `react-native-gifted-charts`, `expo-linear-gradient`, `expo-av`
- Skeleton loader components from `react-native-reusables`
