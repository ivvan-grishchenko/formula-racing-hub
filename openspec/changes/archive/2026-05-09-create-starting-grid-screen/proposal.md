## Why

The app currently lacks a dedicated view for displaying starting grids before races. Users need to see driver positions on the starting grid, organized by F1, F2, and F3 categories, with visual differentiation for team colors and grid penalties.

## What Changes

- New `(info)/starting-grid/[meetingKey]` nested route with a starting grid screen
- Grid display organized by category (F1, F2, F3)
- Visual grid layout showing driver positions, names, team colors
- Navigation triggered from "Starting grid" card in weekend-detail-screen
- Display grid penalties and position changes

## Capabilities

### New Capabilities

- `starting-grid`: Displays starting grid information for upcoming or qualifying race sessions. Shows driver positions, team colors, grid slot numbers, and penalty information.

## Impact

- New route: `app/(info)/starting-grid/[meetingKey].tsx`
- New component: `components/grid/starting-grid-screen.tsx`
- Updated navigation: Add starting grid handler to `components/weekend/weekend-detail-screen.tsx`
- Uses OpenF1 `/v1/starting-grid` endpoint for data
- Direct data fetching in page component (no dedicated hook)