## Context

The current app structure uses expo-router for navigation with custom UI components. The navigation follows the pattern:
- Root layout: Stack with headerShown: false
- Tabs layout: expo-router/ui Tabs component
- Info layout: Stack with slide_from_right animation

All route files are missing:
1. Page titles via Stack.Screen options
2. ScrollView contentInsetAdjustmentBehavior configuration
3. Link previews and context menus

## Goals / Non-Goals

**Goals:**
- Add descriptive titles to all navigable screens for iOS navigation bar
- Ensure all scrollable content respects safe area insets (notch, home indicator)
- Add iOS-standard link previews to major navigation points

**Non-Goals:**
- Refactoring to NativeTabs (issue #1) - not part of this change
- Adding animations to existing screens
- Modifying the component architecture

## Decisions

1. **Stack.Screen titles**: Add explicit title in each route file's Stack.Screen options. This is more explicit than relying on automatic title detection.

2. **contentInsetAdjustmentBehavior**: Apply to all ScrollView/FlatList/SectionList components. This replaces the need for SafeAreaView wrappers and handles notch/home indicator automatically.

3. **Link.Preview placement**: Add to primary navigation links - tabs navigate automatically, but info route links should have previews. Major cards in home screen, calendar items, etc.

## Risks / Trade-offs

- [Risk] Some screens may not have a natural title → Mitigation: Use descriptive "Meeting Details", "Race Results", etc.
- [Risk] Link.Preview requires destination route to exist → Mitigation: Only add to routes that resolve to actual screens
- [Risk] contentInsetAdjustmentBehavior may duplicate existing safe area handling → Mitigation: Check each component individually, remove redundant SafeAreaView where present