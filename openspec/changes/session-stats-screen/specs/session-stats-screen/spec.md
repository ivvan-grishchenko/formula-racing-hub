## ADDED Requirements

### Requirement: Display circuit information

The session stats screen SHALL display detailed circuit information for a race weekend including circuit image, location details, and racing statistics.

#### Scenario: Circuit image displays correctly
- **WHEN** the session stats screen loads with valid circuit data
- **THEN** the circuit image from api-sports SHALL be displayed at the top of the screen

#### Scenario: Circuit city and country display
- **WHEN** the session stats screen loads
- **THEN** the city name from `competition.location.city` SHALL be displayed as the title

#### Scenario: Circuit statistics display
- **WHEN** the session stats screen loads
- **THEN** the following statistics SHALL be displayed:
  - Number of laps (from `laps`)
  - Circuit length (from `length`)
  - Race distance (from `race_distance`)
  - Year opened (from `opened`)
  - Capacity (from `capacity`)

#### Scenario: Lap record display
- **WHEN** the session stats screen loads with valid circuit data
- **THEN** the lap record SHALL display:
  - Lap time (from `lap_record.time`)
  - Driver name (from `lap_record.driver`)
  - Year (from `lap_record.year`)

### Requirement: Navigate to session stats from weekend detail

The weekend detail screen SHALL link to the session stats screen via the Session Stats button.

#### Scenario: Button navigation works
- **WHEN** user taps "Session Stats" button on the weekend detail screen
- **THEN** the app SHALL navigate to `/session-stats/[meetingKey]`

### Requirement: Circuit matching

The app SHALL match OpenF1 meeting data to api-sports circuit data using location-based matching.

#### Scenario: Direct city match
- **WHEN** OpenF1 meeting `location` equals api-sports circuit `competition.location.city`
- **AND** OpenF1 meeting `country_name` contains api-sports circuit `competition.location.country`
- **THEN** the circuits SHALL be considered a match

#### Scenario: Alias matching for edge cases
- **WHEN** direct match fails but location is in the alias map
- **THEN** the alias map value SHALL be used for matching

#### Scenario: No matching circuit found
- **WHEN** no matching circuit can be found after direct and alias matching
- **THEN** the screen SHALL display "Circuit data unavailable" message