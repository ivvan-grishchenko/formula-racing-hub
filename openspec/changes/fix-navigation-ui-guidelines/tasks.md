## 1. Add Stack.Screen Titles

- [ ] 1.1 Add title to home.tsx route: `<Stack.Screen options={{ title: "Home" }} />`
- [ ] 1.2 Add title to calendar.tsx route: `<Stack.Screen options={{ title: "Calendar" }} />`
- [ ] 1.3 Add title to standings.tsx route: `<Stack.Screen options={{ title: "Standings" }} />`
- [ ] 1.4 Add title to settings.tsx route: `<Stack.Screen options={{ title: "Settings" }} />`
- [ ] 1.5 Add title to weekend/[meetingKey].tsx route: `<Stack.Screen options={{ title: "Weekend Overview" }} />`
- [ ] 1.6 Add title to results/[meetingKey].tsx route: `<Stack.Screen options={{ title: "Race Results" }} />`
- [ ] 1.7 Add title to race-control/[meetingKey].tsx route: `<Stack.Screen options={{ title: "Race Control" }} />`
- [ ] 1.8 Add title to starting-grid/[meetingKey].tsx route: `<Stack.Screen options={{ title: "Starting Grid" }} />`
- [ ] 1.9 Add title to session-stats/[meetingKey].tsx route: `<Stack.Screen options={{ title: "Session Stats" }} />`

## 2. Add contentInsetAdjustmentBehavior

- [ ] 2.1 Update ScrollView in home-screen.tsx with `contentInsetAdjustmentBehavior="automatic"`
- [ ] 2.2 Update ScrollView in calendar-screen.tsx (if exists) with automatic inset behavior
- [ ] 2.3 Update FlatList in standings-screen.tsx (if exists) with automatic inset behavior
- [ ] 2.4 Update ScrollView in weekend-detail-screen.tsx with automatic inset behavior
- [ ] 2.5 Update ScrollView in results-screen.tsx with automatic inset behavior
- [ ] 2.6 Update ScrollView in race-control-screen.tsx with automatic inset behavior
- [ ] 2.7 Update ScrollView in starting-grid-screen.tsx with automatic inset behavior
- [ ] 2.8 Update ScrollView in session-stats-screen.tsx with automatic inset behavior

## 3. Add Link Previews

- [ ] 3.1 Add Link.Preview to NextRace component navigation link
- [ ] 3.2 Add Link.Preview to LatestResult component navigation link
- [ ] 3.3 Add Link.Preview to calendar race card links
- [ ] 3.4 Add Link.Preview to standings driver/team links (if navigable)
- [ ] 3.5 Add Link.Preview to weekend detail navigation links (sessions, results)

## 4. Add Context Menus

- [ ] 4.1 Add Link.Menu with Link.MenuAction to weekend detail links (Share, Copy)
- [ ] 4.2 Add Link.Menu with Link.MenuAction to results page links (Share, Copy)
- [ ] 4.3 Add context menu to driver card links (Share driver info)