## ADDED Requirements

### Requirement: Year picker defaults to current year
The year picker on the driver screen SHALL default to the current calendar year on initial load.

#### Scenario: Year defaults to current on load
- **WHEN** the user navigates to the driver screen
- **THEN** the year picker SHALL be set to the current year (e.g., 2026)
- **AND** the selectable range SHALL be 2023 to current year inclusive

### Requirement: Session type picker defaults to Race on load
The session type picker SHALL default to "Race" on initial load.

#### Scenario: Session type defaults to Race
- **WHEN** the user navigates to the driver screen
- **THEN** the session type picker SHALL be set to "Race"

### Requirement: Meeting picker auto-selects most recent race
After the year and session type are selected, the meeting picker SHALL auto-select the most recently completed race in the selected year.

#### Scenario: Most recent race auto-selected
- **WHEN** the user navigates to the driver screen with Race selected
- **THEN** the meeting picker SHALL automatically select the race with the latest `date_end` in the selected year
- **AND** that meeting's data SHALL be loaded immediately

### Requirement: Meeting picker lists all meetings of selected session type
The meeting picker SHALL display all meetings of the selected session type for the chosen year, ordered most recent first.

#### Scenario: Meeting list for year
- **WHEN** the user selects year 2025 and session type "Race"
- **THEN** the meeting picker SHALL list every race meeting in 2025, ordered by date descending
- **AND** selecting a meeting SHALL load that session's data

### Requirement: Changing session type resets meeting picker to most recent
When the user changes the session type, the meeting picker SHALL reset and auto-select the most recent completed session of the new type.

#### Scenario: Session type change resets meeting
- **WHEN** the user changes session type from "Race" to "Qualifying"
- **THEN** the meeting picker SHALL reset and auto-select the most recent qualifying session
- **AND** the per-session sections SHALL update to show qualifying-specific content

### Requirement: Skeleton shown while picker data loads
While the meeting list is being fetched, the meeting picker SHALL display a skeleton placeholder.

#### Scenario: Skeleton on picker load
- **WHEN** the meeting list data is being fetched after a picker change
- **THEN** the meeting picker SHALL display a skeleton loading state
