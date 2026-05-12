## 1. Project Structure

- [x] 1.1 Create `components/grid/` directory
- [x] 1.2 Create `components/grid/starting-grid-screen.tsx`
- [x] 1.3 Create `app/(info)/starting-grid/[meetingKey].tsx` route

## 2. API Integration

- [x] 2.1 Verify OpenF1 `/v1/starting-grid` endpoint availability
- [x] 2.2 Check/update grid-related types in `api/openf1/types.ts` if needed
- [x] 2.3 Add/verify fetch function for starting-grid in `api/openf1/client.ts`
- [x] 2.4 Add query keys for starting-grid in `api/openf1/query-keys.ts` (if using query)

## 3. Navigation Integration

- [x] 3.1 Update weekend-detail-screen.tsx - convert "Starting grid" card to Pressable
- [x] 3.2 Add handleStartingGrid function with router navigation
- [x] 3.3 Navigate to `(info)/starting-grid/[meetingKey]`

## 4. UI Components

- [x] 4.1 Create `StartingGridScreen` component
- [x] 4.2 Fetch data directly using OpenF1 /v1/starting-grid endpoint
- [x] 4.3 Add meeting_key parameter to fetch call
- [x] 4.4 Display grid rows with position, driver name, team color
- [x] 4.5 Add loading state with Loader component
- [x] 4.6 Add error state with ErrorDisplay and retry
- [x] 4.7 Add empty state for missing grid data
- [x] 4.8 Add pull-to-refresh functionality

## 5. Route File

- [x] 5.1 Create `app/(info)/starting-grid/[meetingKey].tsx`
- [x] 5.2 Pass meetingKey from route params to StartingGridScreen
- [x] 5.3 Fetch data directly in page component (not via hook)

## 6. Testing & Polish

- [x] 6.1 Run `npm run lint` and fix any issues
- [ ] 6.2 Verify navigation from weekend-detail-screen works
- [ ] 6.3 Verify data displays correctly for past qualifying sessions