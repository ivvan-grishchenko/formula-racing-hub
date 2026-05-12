## ADDED Requirements

### Requirement: Team radio player with audio playback
The driver screen SHALL include a team radio section that plays audio from the `team_radio` `recording_url` using `expo-av`.

#### Scenario: Play button plays audio
- **WHEN** the team radio section is displayed with a valid `recording_url`
- **AND** the user taps the play button
- **THEN** the audio SHALL begin playback using `expo-av`
- **AND** the play button SHALL change to a pause button during playback

#### Scenario: Pause button pauses audio
- **WHEN** audio is currently playing
- **AND** the user taps the pause button
- **THEN** playback SHALL pause at the current position

#### Scenario: Audio completes
- **WHEN** audio playback reaches the end of the recording
- **THEN** the pause button SHALL revert to a play button

### Requirement: Team radio shows most recent clip for selected session
The team radio section SHALL display the most recent radio clip for the selected session by date.

#### Scenario: Single clip for session
- **WHEN** there is one or more team radio recordings for the selected session
- **THEN** the section SHALL display the clip with the latest `date`
- **AND** SHALL show the message text, session name, and meeting name

#### Scenario: No radio clips
- **WHEN** the `team_radio` endpoint returns no recordings for the selected session and driver
- **THEN** the team radio section SHALL display an empty state message: "No team radio available"

### Requirement: Prev/Next navigation for multiple radio clips
When multiple radio clips exist for a session, the user SHALL be able to navigate between them.

#### Scenario: Navigate to next clip
- **WHEN** the user taps "Next"
- **THEN** the next oldest clip SHALL be loaded and displayed
- **AND** audio playback SHALL reset to the beginning

#### Scenario: Navigate to previous clip
- **WHEN** the user taps "Prev"
- **THEN** the next most recent clip SHALL be loaded
- **AND** audio playback SHALL reset to the beginning
