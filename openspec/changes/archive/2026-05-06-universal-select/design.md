## Context

The existing `@ui/select` component requires composing 5+ primitives (Select, SelectTrigger, SelectContent, SelectItem, SelectValue) to create a working select. Developers must manually:
- Map over an options array to render SelectItem components
- Manage selected state with value/onValueChange
- Extract display labels from data objects

This pattern repeats across the codebase with nearly identical boilerplate.

## Goals / Non-Goals

**Goals:**
- Create a single `<UniversalSelect>` component that accepts options array
- Support key extractors for label and value fields from data objects
- Provide both controlled (value/onValueChange) and uncontrolled modes
- Mirror existing Select styling and behavior

**Non-Goals:**
- Replace the existing primitive-based Select API (backward compatible)
- Add search/filter functionality (future capability)
- Add multi-select support (future capability)

## Decisions

1. **Props-based API over render prop pattern**
   - Props: `options`, `labelKey`, `valueKey`, `value`, `onValueChange`, `placeholder`
   - Simpler to use, TypeScript infers types automatically

2. **Required `options` array with generic type parameter**
   - `options: T[]` with `labelKey: keyof T`, `valueKey: keyof T`
   - Allows full type safety without custom extractors

3. **Default to string coercion for value**
   - Stores `String(option[valueKey])` to match SelectPrimitive behavior
   - Enables consistent comparison across number/string types

4. **Reuse existing Select styling**
   - Compose existing SelectTrigger, SelectContent, SelectItem styles
   - Ensures visual consistency with primitive version

## Risks / Trade-offs

- [Risk] Two select APIs could cause confusion → Mitigation: Document clear use cases for each
- [Risk] Type inference complexity → Mitigation: Use clear generic constraints, tested with common patterns
- [Risk] Extra component wrapper adds minimal overhead → Mitigation: Simple rendering, no additional state