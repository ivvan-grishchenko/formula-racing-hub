## Context

The app currently lacks a starting grid view. Users need to see driver positions before races, organized by category (F1, F2, F3). The existing standings and session results screens provide patterns for data fetching and UI components.

OpenF1 provides a dedicated `/v1/starting-grid` endpoint that provides grid position data directly.

## Goals / Non-Goals

**Goals:**
- Display starting grid for upcoming/qualifying race sessions via meeting key
- Visual grid layout showing driver positions, names, and team colors
- Filter by category (F1, F2, F3)
- Support pull-to-refresh for live updates

**Non-Goals:**
- Real-time position updates (use polling, not WebSocket)
- Grid penalty explanations or detailed penalty history
- Historical grid comparison

## Decisions

**1. Direct data fetching in page component**

Use OpenF1 `/v1/starting-grid` endpoint to fetch grid data directly in the page component, without creating a dedicated hook.

Alternative considered: Create `useStartingGridData` hook. Rejected to keep the pattern simple for this single-use screen.

**2. Nested route under `(info)/` with meeting key**

Follows the nested info route pattern: `(info)/starting-grid/[meetingKey]`. Users navigate from weekend-detail-screen to view the grid for a specific meeting.

Alternative considered: Tab-based route at `/grid`. Rejected in favor of nested route for better context (meeting-specific data).

**3. Navigation from weekend-detail-screen**

The "Starting grid" card in weekend-detail-screen becomes a Pressable that triggers navigation to `(info)/starting-grid/[meetingKey]`.

## API Reference

**OpenF1 Starting Grid Endpoint**

- Endpoint: `GET https://api.openf1.org/v1/starting-grid`
- Parameters: `meeting_key` (required)
- Response: Array of grid position objects with driver, position, team info

Reference: https://openf1.org/docs/#starting-grid

## Risks / Trade-offs

- **Data availability**: Grid data only available after qualifying sessions complete. Screen shows empty or "No grid available" state before qualifying.
- **Category filtering**: F2/F3 grid data may be sparse compared to F1. Handle missing data gracefully.

## Open Questions

- Should grid display show historical grids for past races, or only upcoming/most recent? (Initial scope: meeting-specific grid via navigation)