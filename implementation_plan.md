# Implementation Plan - Impostor Party Game

## App Overview
A mobile-first web application for the party game "Impostor" (similar to Spyfall).
**Core Loop**: Players add their names -> The app assigns roles (one Impostor, others know the phrase/location) -> Players pass the device to see their role -> Timer starts -> Voting happens.

## Tech Stack
- **Framework**: React (Vite)
- **Styling**: TailwindCSS (v4 if stable, otherwise v3), PostCSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## Aesthetic Direction
- **Theme**: Dark Mode, Cyberpunk/Neon accents or Sleek Modern Dark (Glassmorphism).
- **Colors**: Deep purples, rich blues, vibrant accents (pink/cyan).
- **Vibe**: Suspenseful, Premium, Dynamic.

## Phases

### Phase 1: Project Initialization & Foundation
- [ ] Initialize Vite Project (React + TS)
- [ ] Install Dependencies (Tailwind, Framer Motion, Zustand, clsx, lucide-react)
- [ ] Setup Tailwind Configuration & Global Styles (CSS Variables, Fonts)
- [ ] Create Base Components (Button, Card, Input, ScreenLayout)

### Phase 2: Core Game Logic (Zustand)
- [ ] Define Game Types (Player, Role, GameState)
- [ ] Implement `useGameStore` with actions:
    - Add/Remove Players
    - Start Game (Assign Roles randomly)
    - Next Player (Turn management for role reveal)
    - Start Timer
    - End Game / Reset

### Phase 3: Screens Implementation
- [ ] **Home Screen**: Title, "New Game" button, Rule summary.
- [ ] **Lobby Screen**: Add players input, list composed players.
- [ ] **Role Reveal Screen**: "Pass to [Name]", "Tap to Reveal", "Hide".
- [ ] **Game Loop Screen**: Timer, Topic/Location hint (for non-impostors), "Vote Now" button.
- [ ] **Voting/Results Screen**: Reveal the Impostor, Winner declaration.

### Phase 4: Polish & Animations
- [ ] Page Transitions (AnimatePresence)
- [ ] Micro-interactions (Button taps, Card flips)
- [ ] Sound Effects (Optional)
