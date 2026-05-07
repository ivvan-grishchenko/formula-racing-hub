## ADDED Requirements

### Requirement: Centralized endpoint constants
The OpenF1 API client module MUST expose all endpoint paths as immutable constants in a dedicated `endpoints.ts` file.

#### Scenario: Export all endpoints as constants
- **WHEN** a developer imports from `@api/openf1/endpoints`
- **THEN** they have access to all 8 endpoint string constants: `championship_drivers`, `championship_teams`, `drivers`, `meetings`, `race_control`, `session_result`, `sessions`, `weather`

#### Scenario: Endpoint values are immutable
- **WHEN** code attempts to reassign an endpoint constant
- **THEN** TypeScript throws a type error (due to `as const`)

### Requirement: Client uses centralized endpoints
The OpenF1 API client functions MUST import and use the centralized endpoint constants instead of inline strings.

#### Scenario: Fetch functions use constants
- **WHEN** `fetchDriver()`, `fetchMeetings()`, etc. are called
- **THEN** each function internally references `openf1Endpoints.drivers`, `openf1Endpoints.meetings`, etc.

### Requirement: Query keys use centralized endpoints
The TanStack Query key factories for endpoints used in both client and keys MUST use the centralized constants.

#### Scenario: Query keys reference endpoints
- **WHEN** `openf1Keys.drivers()`, `openf1Keys.meetings()`, `openf1Keys.sessions()`, `openf1Keys.weather()` are called
- **THEN** each key factory uses `openf1Endpoints.drivers`, etc. as part of the key tuple