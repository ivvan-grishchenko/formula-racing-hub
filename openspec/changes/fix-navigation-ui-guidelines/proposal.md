## Why

The app's navigation and UI components don't follow the Expo UI Guidelines, which affects iOS platform consistency, accessibility, and user experience. Specifically, missing page titles, ScrollView configuration, and navigation previews reduce the app's polish and deviate from Apple Human Interface Guidelines.

## What Changes

- Add explicit `Stack.Screen options={{ title: "..." }}` to all route files in `(tabs)` and `(info)` groups
- Add `contentInsetAdjustmentBehavior="automatic"` to all ScrollView, FlatList, and SectionList components
- Add `<Link.Preview />` components to key navigation links throughout the app
- Add context menus to relevant Link components using `Link.Menu` and `Link.MenuAction`

## Capabilities

### New Capabilities
- `navigation-titles`: Add descriptive titles to all stack screens for better navigation and accessibility
- `scrollview-insets`: Configure all scrollable views with automatic content inset adjustment
- `link-previews`: Add iOS-style link previews to enhance navigation discoverability

### Modified Capabilities
- (none - no existing spec behavior changes)

## Impact

- All route files in `app/(tabs)/` and `app/(info)/` directories
- All ScrollView/FlatList/SectionList usage in components
- Navigation links in screens like home, calendar, standings, weekend details, results, etc.