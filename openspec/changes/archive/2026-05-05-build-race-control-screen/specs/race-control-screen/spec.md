## ADDED Requirements

### Requirement: Fetch race control data
The system SHALL fetch race control events from the OpenF1 API for a given session key.

#### Scenario: Fetch events for a session
- **WHEN** the user navigates to the race control screen for session key `9159`
- **THEN** the app makes a GET request to `https://api.openf1.org/v1/race_control?session_key=9159`
- **AND** returns an array of race control event objects

#### Scenario: Handle API errors gracefully
- **WHEN** the OpenF1 API returns an error response
- **THEN** the app displays an error message and allows retry

### Requirement: Display race control events
The system SHALL display race control events in a scrollable list with the most recent events at the top.

#### Scenario: Show event details
- **WHEN** race control events are loaded
- **THEN** each event displays: category icon, flag/color indicator, message text, and timestamp

#### Scenario: Event categories are visually distinct
- **WHEN** events have different categories (Flag, SafetyCar, SessionStatus, CarEvent)
- **THEN** each category has a distinct visual indicator (color or icon)

### Requirement: Real-time updates
The system SHALL poll for new race control events every 5 seconds during live sessions.

#### Scenario: Polling during live session
- **WHEN** the session status is "In Progress"
- **THEN** the app polls the race control endpoint every 5 seconds
- **AND** updates the displayed events with any new data

#### Scenario: Stop polling when session ends
- **WHEN** the session status changes to "Finished" or "Completed"
- **THEN** the app stops polling for new events

### Requirement: Filter events by category
The system SHALL allow users to filter race control events by category.

#### Scenario: Filter by Flag events
- **WHEN** the user selects the "Flag" filter
- **THEN** only events with category "Flag" are displayed

### Requirement: Show driver context
The system SHALL enrich race control events with driver information when applicable.

#### Scenario: Events with driver numbers show driver details
- **WHEN** a race control event includes a `driver_number`
- **THEN** the event displays the driver's name, team color, and team name