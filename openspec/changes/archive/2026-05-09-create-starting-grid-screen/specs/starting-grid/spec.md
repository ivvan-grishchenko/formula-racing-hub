## ADDED Requirements

### Requirement: Starting Grid Display

The system SHALL display starting grid information for qualifying and race sessions, showing driver grid positions organized by category (F1, F2, F3).

#### Scenario: Display F1 starting grid after qualifying

- **WHEN** user navigates to the Starting grid from weekend-detail-screen with a meeting key
- **THEN** system displays F1 starting grid with driver positions, names, and team colors
- **AND** fetches data from OpenF1 `/v1/starting-grid` endpoint using meeting_key

#### Scenario: Display grid organized by grid position

- **WHEN** starting grid is loaded
- **THEN** drivers are sorted by grid position (1, 2, 3...)
- **AND** each position shows driver number, name, and team color indicator

### Requirement: Meeting Key Navigation

The system SHALL navigate to starting grid via meeting key from weekend-detail-screen.

#### Scenario: Navigate from weekend-detail-screen

- **WHEN** user presses "Starting grid" card in weekend-detail-screen
- **THEN** system navigates to `(info)/starting-grid/[meetingKey]`
- **AND** fetches grid data for that meeting

### Requirement: Category Filtering

The system SHALL allow users to filter grid by racing category (F1, F2, F3).

#### Scenario: Filter to F2 grid

- **WHEN** user selects F2 category
- **THEN** system displays F2 starting grid

#### Scenario: Filter to F3 grid

- **WHEN** user selects F3 category
- **THEN** system displays F3 starting grid

### Requirement: Pull-to-Refresh

The system SHALL support pull-to-refresh to update grid data.

#### Scenario: Pull to refresh grid

- **WHEN** user pulls down on the grid list
- **THEN** system fetches latest grid data
- **AND** displays updated positions

### Requirement: Loading and Error States

The system SHALL display appropriate loading and error states.

#### Scenario: Show loading indicator

- **WHEN** grid data is being fetched
- **THEN** system displays a loading indicator

#### Scenario: Show error with retry

- **WHEN** grid data fetch fails
- **THEN** system displays an error message
- **AND** provides a retry button

#### Scenario: Show empty state when no grid available

- **WHEN** no grid data exists for the selected session
- **THEN** system displays "No grid available" message
- **AND** suggests checking back after qualifying

### Requirement: Route Structure

The system SHALL use nested route structure under `(info)/`.

- Route: `app/(info)/starting-grid/[meetingKey].tsx`
- Component: `components/grid/starting-grid-screen.tsx`
- Data fetching: Direct in page component (no hook)