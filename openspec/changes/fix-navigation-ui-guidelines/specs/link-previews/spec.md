## ADDED Requirements

### Requirement: Major navigation links SHALL include Link.Preview components
Key navigation links in the app SHOULD include Link.Preview for iOS-style preview functionality.

#### Scenario: Link to meeting details has preview
- **WHEN** a Link navigates to a meeting detail route (e.g., /weekend/123)
- **THEN** it includes a `<Link.Preview />` component as a child

#### Scenario: Link to results has preview
- **WHEN** a Link navigates to a results route (e.g., /results/123)
- **THEN** it includes a `<Link.Preview />` component as a child

### Requirement: Context menus SHALL be available on navigation links
Key links SHOULD support long-press context menus with appropriate actions.

#### Scenario: Context menu on weekend link
- **WHEN** user long-presses a Link to weekend details
- **THEN** a context menu appears with options (e.g., Share, Copy Link)