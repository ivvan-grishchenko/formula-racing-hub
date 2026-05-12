## ADDED Requirements

### Requirement: Lap time trend line chart for Practice and Qualifying
For practice and qualifying sessions, the driver screen SHALL display a line chart showing lap duration over lap number.

#### Scenario: Lap times chart renders for qualifying
- **WHEN** the user selects a qualifying session for a driver
- **THEN** a line chart SHALL be rendered with lap number on the X-axis and lap duration (in seconds) on the Y-axis
- **AND** each data point SHALL represent one lap from the `laps` endpoint for that driver and session
- **AND** the chart SHALL render using `react-native-gifted-charts` LineChart component

#### Scenario: Lap times hidden for race sessions
- **WHEN** the selected session type is "Race"
- **THEN** the lap times section SHALL NOT be rendered

#### Scenario: Empty lap data
- **WHEN** the `laps` endpoint returns no data for the selected session
- **THEN** the lap times section SHALL display a placeholder message: "Lap data not available"

### Requirement: Season points per race bar chart
The driver screen SHALL display a bar chart using `gifted-charts` showing points scored per race meeting for the selected season.

#### Scenario: Bar chart renders
- **WHEN** championship driver data is available for the selected year
- **THEN** a bar chart SHALL be rendered with one bar per race meeting
- **AND** bar height SHALL represent points scored at each race
- **AND** the X-axis SHALL display abbreviated circuit names
- **AND** bars SHALL use team color from `driver` data

### Requirement: Lap time chart resamples to max 50 data points
When the `laps` endpoint returns more than 50 laps, the data SHALL be resampled to a maximum of 50 points using the median lap duration per lap range.

#### Scenario: Resampling kicks in for high-lap sessions
- **WHEN** a qualifying session has more than 50 laps
- **THEN** laps SHALL be grouped into 50 buckets and the median lap duration per bucket SHALL be used as the chart data points
