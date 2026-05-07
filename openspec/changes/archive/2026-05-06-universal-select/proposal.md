## Why

Developers currently need to compose multiple primitives (Select, SelectTrigger, SelectContent, SelectItem, SelectValue) to create a working select component. This leads to verbose code when the common use case is simply displaying a list of options and handling selection. A unified component would provide a cleaner API that handles data rendering internally.

## What Changes

- **New**: Create `UniversalSelect` component in `@components/ui/universal-select.tsx`
- The component accepts an `options` array and extracts display/value keys
- Handles all internal rendering of SelectTrigger, SelectContent, and SelectItem primitives
- Provides controlled and uncontrolled modes via value/onValueChange props

## Capabilities

### New Capabilities

- `universal-select`: Single-component select that accepts options array and key extractors for label/value extraction

### Modified Capabilities

(None - this is a new capability)

## Impact

- New file: `components/ui/select.tsx` (append UniversalSelect to existing)
- Dependencies: `react-native-rn-select` primitives, existing Select component styles