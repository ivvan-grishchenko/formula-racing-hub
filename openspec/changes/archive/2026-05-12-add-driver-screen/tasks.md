## 1. Setup

- [x] 1.1 Install `react-native-gifted-charts` via `npx expo install`
- [x] 1.2 Verify `expo-linear-gradient` is installed (Expo SDK)
- [x] 1.3 Verify `expo-av` is installed (Expo SDK)
- [x] 1.4 Verify `react-native-svg` is already in package.json

## 2. API Client & Types

- [x] 2.1 Add `OpenF1Position`, `OpenF1Overtake`, `OpenF1Stint`, `OpenF1Pit`, `OpenF1TeamRadio` types to `api/openf1/types.ts`
- [x] 2.2 Add `fetchPosition` function to `api/openf1/client.ts`
- [x] 2.3 Add `fetchOvertakes` function to `api/openf1/client.ts`
- [x] 2.4 Add `fetchStints` function to `api/openf1/client.ts`
- [x] 2.5 Add `fetchPit` function to `api/openf1/client.ts`
- [x] 2.6 Add `fetchTeamRadio` function to `api/openf1/client.ts`
- [x] 2.7 Add query keys for new endpoints in `api/openf1/query-keys.ts`
- [x] 2.8 Add tyre compound color constants to `lib/utils.ts`

## 3. Hook — useDriverData

- [x] 3.1 Create `hooks/use-driver-data.ts` with all queries (drivers, meetings, sessions, championship, sessionResult, laps, position, stints, overtakes, pit, teamRadio)
- [x] 3.2 Expose per-query `isLoading`, `isRefreshing`, `error`, `refetch` for independent section loading
- [x] 3.3 Add computed season stats: wins, podiums, DNFs from `sessionResult` array
- [x] 3.4 Add computed overtakes made/lost counts from `overtakes` array
- [x] 3.5 Add session meeting picker logic: find most recent completed session on load

## 4. Components — Driver Header

- [x] 4.1 Create `components/driver/driver-header.tsx` with headshot, name, number, team name, team color band
- [x] 4.2 Add skeleton placeholder matching header height

## 5. Components — Season Stats & Charts

- [x] 5.1 Create `components/driver/season-points-chart.tsx` using gifted-charts `BarChart` for points per race
- [x] 5.2 Add skeleton for bar chart
- [x] 5.3 Create `components/driver/season-stats.tsx` grid with POS, PTS, WINS, PODS, FLAP, DNF cards
- [x] 5.4 Add skeleton for stats grid

## 6. Components — Session Picker

- [x] 6.1 Create `components/driver/session-picker.tsx` with year dropdown, session type dropdown, meeting dropdown
- [x] 6.2 Year picker: 2023 to current year; default to current year
- [x] 6.3 Session type picker: Practice, Qualifying, Sprint Qualifying, Sprint Shootout, Race; default to Race
- [x] 6.4 Meeting picker: auto-selects most recent; shows all meetings for selected year + type
- [x] 6.5 Add skeleton for meeting picker loading state

## 7. Components — Session Result

- [x] 7.1 Create `components/driver/session-result.tsx` displaying POS, TIME, LAPS, PTS
- [x] 7.2 Content adapts per session type: Race shows all; Qualifying shows position + best time; Practice shows position + best lap
- [x] 7.3 Add skeleton placeholder

## 8. Components — Lap Times

- [x] 8.1 Create `components/driver/lap-times-chart.tsx` using gifted-charts `LineChart`
- [x] 8.2 Resample data to max 50 points if laps > 50
- [x] 8.3 Display best lap time and sector splits below chart
- [x] 8.4 Conditionally render only for Practice and Qualifying sessions
- [x] 8.5 Add skeleton placeholder

## 9. Components — Position Arc

- [x] 9.1 Create `components/driver/position-arc-chart.tsx` using gifted-charts `LineChart` with step mode
- [x] 9.2 Filter entries to `date >= session.date_start`
- [x] 9.3 X-axis: formatted timestamps; Y-axis: position (1 at top)
- [x] 9.4 Display starting and finishing position below chart
- [x] 9.5 Conditionally render only for Race sessions
- [x] 9.6 Add skeleton placeholder

## 10. Components — Tyre Strategy

- [x] 10.1 Create `components/driver/tyre-strategy.tsx` with colored stint bars
- [x] 10.2 Apply F1 tyre compound colors (SOFT=red, MEDIUM=yellow, HARD=white, etc.)
- [x] 10.3 Display compound label and lap range per stint
- [x] 10.4 Add skeleton placeholder

## 11. Components — Overtakes & Pit Stops

- [x] 11.1 Create `components/driver/overtakes-section.tsx` showing overtakes made, overtaken, most frequent turn
- [x] 11.2 Conditionally render only for Race sessions
- [x] 11.3 Add skeleton placeholder
- [x] 11.4 Create `components/driver/pit-stops-section.tsx` listing pit stops with lap and duration
- [x] 11.5 Conditionally render only for Race sessions
- [x] 11.6 Add skeleton placeholder

## 12. Components — Team Radio

- [x] 12.1 Create `components/driver/team-radio.tsx` with `expo-av` audio playback
- [x] 12.2 Implement play/pause toggle button
- [x] 12.3 Implement Prev/Next navigation between clips
- [x] 12.4 Display clip message, meeting name, session type
- [x] 12.5 Handle empty state when no recordings available
- [x] 12.6 Add skeleton placeholder

## 13. Route — Driver Screen

- [x] 13.1 Create `app/(info)/driver/[driverNumber].tsx` route
- [x] 13.2 Read `driverNumber` from route params, `meetingKey` and `sessionKey` from `useSearchParams()`
- [x] 13.3 Render `<DriverScreen />` with all sections
- [x] 13.4 Each section renders its skeleton while loading, content when loaded
- [x] 13.5 Integrate session picker state (year, session type, meeting) and drive all sections

## 14. Integration — Driver Tap Targets

- [x] 14.1 Add `router.push()` to driver name/headshot in `driver-standing-line.tsx` on standings screen
- [x] 14.2 Add tap target to driver name in `driver-focus.tsx` on home screen
- [x] 14.3 Add tap target to driver row in `starting-grid-screen.tsx`
- [x] 14.4 Add tap target to driver in `race-control-event-card.tsx`
- [x] 14.5 Add tap target to driver in session stats screen components
- [x] 14.6 Ensure all tap targets pass `driverNumber` and optionally `sessionKey` / `meetingKey`
