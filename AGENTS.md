# Formula Racing Hub

## Commands

```bash
npm run dev    # Start Expo Dev Server
npm run lint  # Run ESLint
```

Press `i` for iOS simulator (Mac), `a` for Android emulator, or scan QR with Expo Go.

## Stack

- **React Native** 0.83 + **Expo** ~55 with Expo Router (file-based routing in `app/`)
- **NativeWind** (Tailwind CSS)
- **React Native Reusables** for UI components
- **TanStack Query** for data fetching

## Path Aliases

Configured in `tsconfig.json`:
- `@components/*` → `components/*`
- `@lib/*` → `lib/*`
- `@ui/*` → `components/ui/*`
- `@hooks/*` → `hooks/*`

## Code Style

- **ESLint**: single quotes, semicolons required
- **TypeScript**: strict mode enabled

## Project Structure

```
app/              # Expo Router pages (_layout.tsx is root layout)
components/      # UI components (organized by feature)
  ui/            # Reusable primitive components
lib/             # Utilities (http, utils, theme)
hooks/           # Custom React hooks
```

## Add Components

```bash
npx react-native-reusables/cli@latest add [component-name]
```