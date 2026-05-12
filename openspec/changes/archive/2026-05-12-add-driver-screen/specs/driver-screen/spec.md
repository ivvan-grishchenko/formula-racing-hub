## ADDED Requirements

### Requirement: Driver screen displays driver identity
The driver screen SHALL display the driver's headshot, full name, driver number, and team name in a header band with team color.

#### Scenario: Driver identity on load
- **WHEN** the user navigates to the driver screen with a valid driver number and session key
- **THEN** the screen SHALL display the headshot image, full name, driver number, and team name

#### Scenario: Driver identity with missing headshot
- **WHEN** the headshot URL is unavailable
- **THEN** the driver number SHALL be displayed in place of the headshot

### Requirement: Driver screen shows season-at-a-glance points bar chart
The driver screen SHALL display a bar chart showing championship points scored per race meeting for the selected season.

#### Scenario: Season points chart renders
- **WHEN** the user is on the driver screen with a year selected
- **THEN** a bar chart SHALL be displayed with one bar per race meeting, where bar height represents points scored that race
- **AND** the X-axis SHALL show abbreviated meeting names

#### Scenario: No points data for season
- **WHEN** no championship driver data exists for the selected year
- **THEN** the chart area SHALL display a placeholder message

### Requirement: Driver screen shows season stats grid
The driver screen SHALL display a grid of season-level stat cards: position, points, wins, podiums, DNFs.

#### Scenario: Season stats display
- **WHEN** the user is on the driver screen with a year selected
- **THEN** six stat cards SHALL be displayed showing: current championship position, total points, race wins, podiums, fastest laps, and DNF count for the selected season
- **AND** each card SHALL display the value and a label

#### Scenario: Stat is zero
- **WHEN** a stat value is zero
- **THEN** the value SHALL still be displayed as "0" with the appropriate label

### Requirement: Driver screen sections load independently with skeleton states
Each data section on the driver screen SHALL load independently and display a skeleton placeholder while its data is being fetched.

#### Scenario: Skeleton shown while lap times load
- **WHEN** the user selects a qualifying session and lap time data is being fetched
- **THEN** the lap times section SHALL display a skeleton placeholder matching the chart dimensions

#### Scenario: Skeleton hidden when data arrives
- **WHEN** the skeleton for a section is displayed and its data arrives
- **THEN** the skeleton SHALL be replaced with the actual content immediately
