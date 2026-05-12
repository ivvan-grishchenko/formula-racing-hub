## ADDED Requirements

### Requirement: All stack screens SHALL have explicit titles
All routes in `(tabs)` and `(info)` groups that use Stack navigation MUST define a title via Stack.Screen options.

#### Scenario: Tab route has title
- **WHEN** user navigates to a tab route (home, calendar, standings, settings)
- **THEN** the route file contains `<Stack.Screen options={{ title: "<screen-name>" }} />`

#### Scenario: Info route has title
- **WHEN** user navigates to an info route (weekend, results, race-control, starting-grid, session-stats)
- **THEN** the route file contains a descriptive title (e.g., "Weekend Overview", "Race Results")

### Requirement: Titles SHALL use sentence case
All screen titles SHALL use sentence case (first letter capitalized, rest lowercase).

#### Scenario: Title follows sentence case
- **WHEN** a title is defined in Stack.Screen options
- **THEN** it uses sentence case (e.g., "Home", "Race Results", "Weekend Overview")