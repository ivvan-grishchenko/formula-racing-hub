## 1. Component Implementation

- [x] 1.1 Add UniversalSelect component to existing `components/ui/select.tsx` file
- [x] 1.2 Define TypeScript generic type for options array
- [x] 1.3 Implement props interface (options, labelKey, valueKey, value, onValueChange, placeholder, size, disabled)
- [x] 1.4 Use Select primitives (Root, Trigger, Value, Content, Item) from existing select
- [x] 1.5 Map options array to SelectItem components with extracted labels/values
- [x] 1.6 Handle controlled vs uncontrolled mode

## 2. Styling & Behavior

- [x] 2.1 Apply existing SelectTrigger styles (size prop handling)
- [x] 2.2 Apply placeholder text when no value selected
- [x] 2.3 Handle disabled prop on the Select component
- [x] 2.4 Ensure accessibility attributes are passed through

## 3. Export & Types

- [x] 3.1 Export UniversalSelect component from select.tsx (already exported with other Select components)
- [x] 3.2 Export UniversalSelectProps type for consumers

## 4. Verification

- [x] 4.1 Run TypeScript type check
- [x] 4.2 Run ESLint to ensure code style compliance