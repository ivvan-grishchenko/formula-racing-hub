## Context

The app currently surfaces driver data only as secondary context — names in lists, headshots in cards, positions in standings. No screen exists to deep-dive into an individual driver's season performance, race history, tyre strategy, overtake patterns, or team radio.

The app uses React Native 0.83 + Expo Router with file-based routing, TanStack Query for data fetching, NativeWind for styling, and React Native Reusables for UI components. The `(info)` layout stack already handles detail screens (weekend, results, race-control, session-stats). A new `driver/[driverNumber]` route fits naturally in the same stack.

## Goals / Non-Goals

**Goals:**
- General-purpose driver explorer screen accessible from any driver tap target across the app
- Year + session type + meeting picker to scope data context
- Season-level overview: points bar chart, stat cards (position, points, wins, podiums, DNFs)
- Per-session detail: result, lap times (Practice/Qualifying), position arc (Race), tyre strategy, overtakes, pit stops, team radio
- All data sections load independently with skeleton placeholders
- Audio playback for team radio recordings

**Non-Goals:**
- Real-time data — this is historical-only, free OpenF1 API
- Personalized driver profiles (favorites, saved drivers) — future work
- Fastest lap data for races (lap-level data unavailable for race sessions in OpenF1 free tier)
- Live session tracking

## Decisions

### Route design — `/app/(info)/driver/[driverNumber].tsx`

The route accepts `driverNumber` as a required param. Two optional query params scope the data:
- `meetingKey` — pre-selects a specific meeting
- `sessionKey` — pre-selects a specific session within that meeting

```tsx
// app/(info)/driver/[driverNumber].tsx
export default function DriverPage() {
  // reads driverNumber from params
  // reads meetingKey + sessionKey from useSearchParams()
  // renders <DriverScreen />
}
```

This keeps the route clean — the picker state lives in React, not URL complexity. Back navigation returns to the previous screen naturally.

### Hook structure — `useDriverData`

A single composable hook orchestrates all queries:

```
useDriverData({ driverNumber, year, sessionType, sessionKey })
  ├── drivers (for identity: headshot, name, team)
  ├── meetings (all meetings for year + sessionType, for meeting picker)
  ├── sessions (to find most recent race on load)
  ├── championshipDrivers (for season points + position per race)
  ├── sessionResult (for selected session result)
  ├── laps (for lap time chart — Practice/Qualifying only)
  ├── position (for position arc — Race only)
  ├── stints (for tyre strategy — all sessions)
  ├── overtakes (for overtake stats — Race only)
  ├── pit (for pit stops — Race only)
  └── teamRadio (for radio recordings — all sessions)
```

Each query has its own `isLoading`, `isRefreshing`, `error` state exposed so the component can render per-section skeletons independently.

### Chart library — `gifted-charts` + `expo-linear-gradient`

`react-native-gifted-charts` is already the recommended chart library. Dependencies:
- `react-native-gifted-charts` — chart components
- `expo-linear-gradient` — already available in Expo SDK
- `react-native-svg` — already in package.json

LineChart for lap times and position arc. BarChart for season points.

**Lap time resampling:** If laps > 50, group into 50 buckets by floor(lap_number / 50), take median duration per bucket. Prevents chart overload on sessions with many laps.

**Position arc data:** OpenF1's `position` endpoint returns sparse event-based data (position changes only, not periodic samples). This is ideal — typically 10-20 events per race. No resampling needed.

### Team radio — `expo-av`

`expo-av` is already available in Expo SDK. `Audio.Sound` is used to load and play the `recording_url` from `team_radio`.

```tsx
const [sound, setSound] = useState<Audio.Sound | null>(null);

const loadAudio = async (url: string) => {
  await Audio.Sound.createAsync({ uri: url }, {}, setOnPlaybackStatusUpdate);
};
```

Playback state managed in a `useState` hook with `isPlaying`, `currentClipIndex`, and `clips[]`. Prev/Next navigation updates the index and reloads audio.

### Overtakes and pit stops — Race only

`overtakes` and `pit` endpoints are race-session data only. These sections are conditionally rendered:

```tsx
{sessionType === 'Race' && (
  <>
    <OvertakesSection data={overtakes} />
    <PitStopsSection data={pit} />
  </>
)}
```

### Tyre strategy — stint bars

Tyre compounds use F1 color convention:
- SOFT → `#DC0000` (red)
- MEDIUM → `#FFD900` (yellow)
- HARD → `#FFFFFF` (white)
- INTERMEDIATE → `#43B02A` (green)
- WET → `#1E90FF` (blue)

Each stint rendered as a colored bar with compound label and lap range. Width proportional to lap span.

### Lap data availability caveat

`laps` data is not available for race sessions. The "Lap Times" section is hidden when `sessionType === 'Race'`. The "Position Arc" section replaces it for race sessions.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| `position` data is sparse — position arc may show gaps in long races | The event-based model is accurate; chart shows position held flat between changes — this is the correct interpretation |
| Team radio recordings may be CORS-blocked or unavailable | Handle 404/null gracefully with empty state message |
| Lap data for practice sessions can be large (dozens of laps per driver) | Resample to max 50 data points before charting |
| `championship_drivers` is beta — structure may change | Version lock on OpenF1 API; monitor for breaking changes |
| `gifted-charts` SVG rendering performance on large datasets | Resampling limits data points; only load current session's laps |
| Audio playback interrupts on app background | Use `expo-av` `Audio.Sound.createAsync()` with `shouldPlayAfterExpansion: false` to avoid auto-play |

## Open Questions

- Should the driver screen be deep-linkable with `meetingKey` + `sessionKey` params? Currently no — picker state lives in React. This is fine for v1 but limits shareability.
- `fastestLap` stat is excluded — OpenF1 free tier doesn't expose race fastest laps cleanly. Revisit if API improves or if a paid real-time tier is added.
- Headshot images from F1.com CDN may be large. Consider using `expo-image` `cachePolicy: 'memory'` to avoid re-fetching across sessions.
