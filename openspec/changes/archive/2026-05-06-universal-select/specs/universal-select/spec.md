## ADDED Requirements

### Requirement: UniversalSelect accepts options array
The UniversalSelect component SHALL accept an `options` prop containing an array of objects to display in the dropdown.

#### Scenario: Array of options renders as selectable items
- **WHEN** options `[{ id: '1', name: 'Option A' }, { id: '2', name: 'Option B' }]` is provided with `labelKey="name"` and `valueKey="id"`
- **THEN** selecting each option displays its label in the trigger and persists the selected value

### Requirement: UniversalSelect extracts labels and values from data objects
The component SHALL accept `labelKey` and `valueKey` props to extract display text and selected value from each option object.

#### Scenario: Custom labelKey extracts display text
- **WHEN** `labelKey="displayName"` is provided with options `[{ displayName: 'First', value: 1 }]`
- **THEN** the dropdown displays "First" as the option label

#### Scenario: Custom valueKey extracts selected value
- **WHEN** `valueKey="id"` is provided with options `[{ id: 'abc', name: 'Test' }]`
- **THEN** selecting that option sets the value to "abc"

### Requirement: UniversalSelect supports controlled mode
The component SHALL accept controlled `value` and `onValueChange` props for external state management.

#### Scenario: Controlled value updates UI
- **WHEN** `value="2"` is provided to a select with matching option
- **THEN** the trigger displays the corresponding option's label

#### Scenario: Selection triggers onValueChange callback
- **WHEN** user selects an option in controlled mode
- **THEN** the `onValueChange` callback is invoked with the selected value

### Requirement: UniversalSelect supports uncontrolled mode
The component SHALL work without `value` prop, managing internal selection state.

#### Scenario: Uncontrolled mode maintains selection
- **WHEN** no `value` prop is provided
- **THEN** selecting an option persists the selection internally

#### Scenario: Uncontrolled mode exposes ref
- **WHEN** a ref is attached to the component
- **THEN** the ref provides access to the underlying SelectPrimitive methods

### Requirement: UniversalSelect displays placeholder when no value selected
The component SHALL display a placeholder text when no option is selected.

#### Scenario: Placeholder displays with empty value
- **WHEN** `placeholder="Select an option"` is provided and no value is selected
- **THEN** the trigger displays "Select an option"

### Requirement: UniversalSelect supports size prop
The component SHALL accept a `size` prop to control trigger height (matching Select component).

#### Scenario: Small size renders smaller trigger
- **WHEN** `size="sm"` is provided
- **THEN** the trigger renders with smaller height (h-8)