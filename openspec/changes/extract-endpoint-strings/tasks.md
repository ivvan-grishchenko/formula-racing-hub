## 1. Create endpoints file

- [ ] 1.1 Create `api/openf1/endpoints.ts` with `openf1Endpoints` object using `as const`
- [ ] 1.2 Export all 8 endpoint strings: championship_drivers, championship_teams, drivers, meetings, race_control, session_result, sessions, weather

## 2. Update client.ts

- [ ] 2.1 Import `openf1Endpoints` from `./endpoints`
- [ ] 2.2 Replace all inline endpoint strings in fetch functions with `openf1Endpoints.*` references
- [ ] 2.3 Remove the `BASE` constant comment (keep only the BASE_URL)

## 3. Update query-keys.ts

- [ ] 3.1 Import `openf1Endpoints` from `../openf1/endpoints` (adjust path as needed)
- [ ] 3.2 Replace endpoint strings in key factories where used: drivers, meetings, sessions, weather
- [ ] 3.3 Import type `OpenF1Driver`, etc. for proper import path

## 4. Verify

- [ ] 4.1 Run `npm run lint` to check for errors
- [ ] 4.2 Verify the app still compiles and runs