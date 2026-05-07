## 1. UI Components

- [x] 1.1 Create FlagIndicator component in components/race-control/FlagIndicator.tsx
- [x] 1.2 Create RaceControlEventCard component in components/race-control/RaceControlEventCard.tsx
- [x] 1.3 Create RaceControlList component in components/race-control/RaceControlList.tsx
- [x] 1.4 Create CategoryFilter component for filtering by event type

## 2. Screen Implementation

- [x] 2.1 Create race control screen at app/(info)/race-control/[sessionKey]/[sessionKey].tsx using inline useQuery with fetchRaceControl from @api/openf1/client
- [x] 2.2 Add navigation link from session detail screen to race control

## 3. Integration & Polish

- [x] 3.1 Add driver enrichment (join with drivers data for context)
- [x] 3.2 Add error handling and retry UI
- [x] 3.3 Run lint and typecheck
