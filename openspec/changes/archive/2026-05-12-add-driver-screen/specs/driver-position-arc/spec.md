## ADDED Requirements

### Requirement: Position arc step chart for Race sessions
For race sessions, the driver screen SHALL display a step chart tracking position changes over race distance.

#### Scenario: Position arc renders for race
- **WHEN** the user selects a race session for a driver
- **AND** position data is available from the `position` endpoint
- **THEN** a step chart SHALL be rendered using `gifted-charts` LineChart with step type
- **AND** the X-axis SHALL show formatted timestamps (hours:minutes)
- **AND** the Y-axis SHALL show position (1 at top, 20 at bottom)
- **AND** the chart SHALL show position held flat between events, stepping up or down on each position change

#### Scenario: Position arc hidden for non-race sessions
- **WHEN** the selected session type is not "Race"
- **THEN** the position arc section SHALL NOT be rendered

#### Scenario: Position arc data filtered to race duration only
- **WHEN** position data is loaded for a race session
- **THEN** entries with a `date` before `session.date_start` SHALL be filtered out
- **AND** remaining entries SHALL be sorted by `date` ascending before plotting

#### Scenario: No position data
- **WHEN** the `position` endpoint returns no data for the selected session and driver
- **THEN** the position arc section SHALL display a placeholder message: "Position data not available"

### Requirement: Starting and finishing position shown below chart
Below the position arc chart, the driver's starting grid position and finishing position SHALL be displayed.

#### Scenario: Positions shown below chart
- **WHEN** the position arc is rendered
- **THEN** text SHALL be displayed below the chart showing: "Started: P{grid} · Finished: P{finish}"
- **AND** the grid position SHALL be sourced from `starting_grid` for that session
- **AND** the finish position SHALL be sourced from `session_result` for that session and driver
