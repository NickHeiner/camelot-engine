# Agent Prompts for Camelot Web App

## Completion Status Summary

### ✅ Completed (4/26)

- **Agent 1.1**: Project Foundation
- **Agent 2.1**: Authentication Setup (Clerk)
- **Agent 2.2**: Convex Backend Setup
- **Agent 2.4**: Game Integration (camelot-engine)

### ⚠️ Partially Completed (3/26)

- **Agent 2.3**: Game Board UI - Basic board exists with click-based movement, pieces shown as letters (K/P)
- **Agent 2.6.1**: Core Game UI Components - Basic turn/captured pieces display exists
- **Agent 2.6.3**: Sound Effects & Game Integration - Game page exists and integrates board

### ❌ Not Completed (19/26)

- **Agent 2.3.1**: Board Component Refactoring (wrong dimensions, no proper pieces)
- **Agent 2.3.2**: Drag and Drop Implementation
- **Agent 2.3.3**: Move Validation Visualization
- **Agent 2.5**: Monitoring Setup (Datadog)
- **Agent 2.6.2**: Move History Component
- **Agent 2.7.1**: User Profile Page
- **Agent 2.7.2**: Game History Page
- **Agent 2.7.3**: User Data Backend
- **Agent 2.8.1**: Game Creation UI
- **Agent 2.8.2**: Game Joining Flow
- **Agent 2.8.3**: Game Creation Backend & Notifications
- **Agent 2.9.1**: Theme & Mobile Optimization
- **Agent 2.9.2**: Loading States & Error Handling
- **Agent 2.9.3**: Animations & Polish
- **Agent 2.9.4**: SEO & Performance
- **Agent 2.10.1**: Project Documentation
- **Agent 2.10.2**: CI/CD Setup
- **Agent 2.10.3**: Deployment Configuration

**Note**: Each incomplete task below now includes detailed "Still TODO" sections specifying exactly what needs to be implemented.

---

## Phase 1: Critical Path Setup (Sequential - Claude Code)

### Agent 1.1: Project Foundation ✅ COMPLETED

```
Create a new Next.js TypeScript project for a chess-like board game called Camelot.

Setup:
1. Initialize Next.js with TypeScript, Tailwind CSS, and App Router
2. Install and configure Shadcn/ui
3. Create the basic folder structure as outlined in AGENTS.md

Basic Layout:
1. Create app/layout.tsx with a root layout
2. Add a simple navigation header component
3. Create app/page.tsx with a landing page
4. Set up the (auth) route group structure

Create placeholder pages at:
- app/(auth)/game/[id]/page.tsx
- app/(auth)/profile/page.tsx
- app/(auth)/history/page.tsx

The goal is to create enough structure that other agents can work in parallel. Keep everything minimal but well-organized.
```

## Phase 2: Parallel Development

### Agent 2.1: Authentication Setup (Claude Code) ✅ COMPLETED

```
Integrate Clerk authentication into the existing Next.js Camelot game app.

Tasks:
1. Install @clerk/nextjs and set up Clerk
2. Create middleware.ts to protect routes under (auth)
3. Add ClerkProvider to the root layout
4. Create a sign-in page at app/sign-in/[[...sign-in]]/page.tsx
5. Create a sign-up page at app/sign-up/[[...sign-up]]/page.tsx
6. Add UserButton component to the navigation
7. Create components/auth/UserProfile.tsx that displays user info
8. Set up environment variables (use .env.example)

Ensure the auth flow works smoothly and all protected routes redirect to sign-in when unauthenticated.
```

### Agent 2.2: Convex Backend Setup (Claude Code) ✅ COMPLETED

```
Set up Convex as the backend for the Camelot game app.

Tasks:
1. Install and initialize Convex
2. Create the schema in convex/schema.ts for games, users, and moves
3. Implement convex/games.ts with mutations for:
   - createGame
   - joinGame
   - makeMove
   - resignGame
4. Implement queries for:
   - getGame
   - listActiveGames
   - getGameHistory
5. Create convex/users.ts for user profile management
6. Set up real-time subscriptions for game state
7. Add ConvexProvider to the app
8. Create lib/convex-client.ts with typed hooks

Follow the data models in AGENTS.md. Ensure all mutations validate data properly.
```

### Agent 2.3: Game Board UI ⚠️ PARTIALLY COMPLETED

**Status**: Basic board exists in `game-board-preloaded.tsx` but missing drag-and-drop functionality

#### Agent 2.3.1: Board Component Refactoring ❌ NOT COMPLETED

**Still TODO:**

- Fix board dimensions (currently appears to be 8x14, should be 12x16 for Camelot)
- Replace letter-based pieces (K/P) with proper chess-like piece graphics or icons
- Implement proper checkerboard pattern colors (currently all squares are gray)
- Create separate Square.tsx component for better organization
- Update board rendering logic to use the new Square component
- Add proper piece assets or use chess piece Unicode symbols/icons

```
Refactor the existing game board to have correct dimensions, proper piece graphics, and better component structure for Camelot.
```

#### Agent 2.3.2: Drag and Drop Implementation ❌ NOT COMPLETED

**Still TODO:**

- Implement drag-and-drop functionality for moving pieces
- Replace click-based movement with drag-and-drop in game-board-preloaded.tsx
- Add visual feedback during drag (piece follows cursor, valid drop zones highlighted)
- Create separate Piece.tsx component with draggable functionality
- Add mobile touch support for drag operations

```
Add drag-and-drop functionality to the game board for an intuitive piece movement experience.
```

#### Agent 2.3.3: Move Validation Visualization ❌ NOT COMPLETED

**Still TODO:**

- Show legal moves when a piece is selected/being dragged
- Highlight valid destination squares
- Show different highlights for regular moves vs captures
- Add visual indicators for special moves (if any in Camelot)

```
Implement visual feedback for legal moves to guide players during gameplay.
```

### Agent 2.4: Game Integration (Claude Code) ✅ COMPLETED

```
Integrate the camelot-engine with the UI and backend.

Tasks:
1. Clone the camelot-engine repo into a lib/engine folder
2. Create lib/game-adapter.ts that:
   - Imports the engine
   - Provides methods to validate moves
   - Generates legal moves for a position
   - Converts between engine format and UI format
3. Update components/game/Board.tsx to:
   - Use the adapter for move validation
   - Only allow legal moves
   - Update Convex when moves are made
4. Create components/game/GameControls.tsx with:
   - Resign button
   - Draw offer button
   - Move history display
5. Create hooks/useGame.ts for game state management

Ensure moves are validated both client-side (for immediate feedback) and server-side (for security).
```

### Agent 2.5: Monitoring Setup (Claude Code) ❌ NOT COMPLETED

**Still TODO - Complete Setup Required:**

- Install packages: `npm install @datadog/browser-rum @datadog/browser-logs`
- Create `lib/monitoring.ts` with Datadog initialization
- Add to app/layout.tsx or app/providers.tsx to initialize monitoring on app load
- Set up RUM tracking for:
  - Page views and navigation
  - User sessions
  - Core Web Vitals
- Add custom event tracking in game components:
  - `game.started` when a new game begins
  - `move.made` with move details and timing
  - `game.completed` with winner and duration
  - `game.resigned` or `game.draw`
- Add error boundary components that report to Datadog
- Create environment variables:
  - `NEXT_PUBLIC_DATADOG_APPLICATION_ID`
  - `NEXT_PUBLIC_DATADOG_CLIENT_TOKEN`
  - `NEXT_PUBLIC_DATADOG_SITE`
- Configure different settings for dev/staging/prod environments
- Add performance tracking for Convex queries/mutations

```
Set up Datadog monitoring for the Camelot game app.
```

### Agent 2.6: Game Features ⚠️ PARTIALLY COMPLETED

**Status**: Basic game functionality exists but missing timer, move history display, and sound effects

#### Agent 2.6.1: Core Game UI Components ⚠️ PARTIALLY COMPLETED

**Status**: Basic turn indicator ("playerA's turn") and captured pieces display exist

**Still TODO:**

- Create `components/game/Timer.tsx`:
  - Countdown timer for each player
  - Visual countdown display (MM:SS format)
  - Warning styling when time is low
  - Persist time state with game
- Enhance game status display:
  - Better visual design for turn indicator (currently just text)
  - Use actual player usernames instead of "playerA/playerB"
  - Improve captured pieces display with better styling
  - Add game result display when complete
  - Add player avatars/colors to turn indicator

```
Create the timer component and enhance the existing game status displays for better user experience.
```

#### Agent 2.6.2: Move History Component ❌ NOT COMPLETED

**Still TODO:**

- Create `components/game/MoveHistory.tsx`:
  - Parse and display moves from game history
  - Display in standard notation
  - Scrollable list with move numbers
  - Allow viewing previous board positions
  - Highlight current move
  - Navigation controls to step through moves

```
Build the move history component that shows the game progression and allows reviewing past positions.
```

#### Agent 2.6.3: Sound Effects & Game Integration ❌ NOT COMPLETED

**Still TODO:**

- Add sound effects:
  - Move sounds
  - Capture sounds
  - Game end sounds
  - Timer warning sounds
  - Mute toggle option
  - Volume control
- Update `app/(auth)/game/[id]/page.tsx`:
  - Integrate Timer, GameStatus, and MoveHistory components
  - Layout all game components properly
  - Handle responsive design for game view
  - Ensure real-time updates work smoothly

```
Add sound effects to enhance game experience and integrate all game components into the main game page.
```

### Agent 2.7: User Features ❌ NOT COMPLETED

**Status**: Only placeholder pages exist for profile and history

#### Agent 2.7.1: User Profile Page ❌ NOT COMPLETED

**Still TODO:**

- Update `app/(auth)/profile/page.tsx`:
  - Fetch user stats from Convex users table
  - Display: username, games played, games won, win rate %
  - Show avatar from Clerk user data
  - List of recent games (last 5-10)
- Create `components/profile/GameStats.tsx`:
  - Visual representation of win/loss statistics
  - Games played over time visualization
  - Average game duration and other key metrics
- Create `components/shared/Avatar.tsx`:
  - Use Clerk's user image URL
  - Fallback to initials (first letter of username)
  - Consistent sizing (small/medium/large variants)

```
Build the user profile page showing player statistics and recent activity.
```

#### Agent 2.7.2: Game History Page ❌ NOT COMPLETED

**Still TODO:**

- Update `app/(auth)/history/page.tsx`:
  - Query Convex for user's games (both as playerA and playerB)
  - Implement pagination (10-20 games per page)
  - Add filters: All/Won/Lost/Draw/In Progress
  - Search by opponent username
  - Sort by date (newest first by default)
- Create `components/history/GameListItem.tsx`:
  - Game date and duration
  - Opponent name and avatar
  - Result (Won/Lost/Draw/In Progress)
  - Number of moves
  - "View Game" link to game replay

```
Create the game history page with filtering, searching, and pagination capabilities.
```

#### Agent 2.7.3: User Data Backend ❌ NOT COMPLETED

**Still TODO:**

- Add necessary Convex queries in `convex/users.ts`:
  - getUserStats query
  - getUserRecentGames query
  - updateUserStats mutation
- Add necessary Convex queries in `convex/games.ts`:
  - getUserGameHistory query with pagination
  - getGamesByOpponent query
  - Game filtering logic

```
Implement the backend queries and mutations needed for user profile and game history features.
```

### Agent 2.8: Game Creation Flow ❌ NOT COMPLETED

#### Agent 2.8.1: Game Creation UI ❌ NOT COMPLETED

**Still TODO:**

- Create `app/(auth)/new-game/page.tsx`:
  - Form with game settings
  - Time control selection (5 min, 10 min, 30 min, unlimited)
  - Color preference (White/Black/Random)
  - Private game toggle (invite-only vs public)
- Create `components/game/CreateGameForm.tsx`:
  - Game creation form with appropriate UI components
  - Time control selection interface
  - Color preference selection with visual feedback
  - Generate shareable invite code/link on creation
  - Copy to clipboard functionality for invite link

```
Build the game creation page and form components for starting new games.
```

#### Agent 2.8.2: Game Joining Flow ❌ NOT COMPLETED

**Still TODO:**

- Create `app/join/[code]/page.tsx` (public route):
  - Parse invite code from URL params
  - Query Convex for game details
  - Show game creator's username
  - Show time control settings
  - "Join Game" button (redirect to sign-in if not authenticated)
  - Redirect to game page after joining
- Create `components/game/GameLobby.tsx`:
  - Display while game.status === 'waiting'
  - Show large invite link/code
  - QR code for mobile sharing
  - "Cancel Game" button for creator
  - Auto-redirect when opponent joins

```
Implement the flow for joining games via invite links and the waiting lobby.
```

#### Agent 2.8.3: Game Creation Backend & Notifications ❌ NOT COMPLETED

**Still TODO:**

- Update Convex mutations in `convex/games.ts`:
  - Add invite code generation to createGame
  - Add joinGameByCode mutation
  - Add cancelGame mutation
  - Add getGameByCode query
- Add toast/notification system:
  - "Game created! Share the link to invite a friend"
  - "Opponent joined!"
  - "It's your turn!"
  - "Game cancelled"
  - Integrate notifications throughout the app

```
Add backend support for game creation flow and implement a notification system.
```

### Agent 2.9: Polish and Responsive Design ⚠️ PARTIALLY COMPLETED

**Status**: Dark mode CSS exists but no toggle, some responsive design in place

#### Agent 2.9.1: Theme & Mobile Optimization ❌ NOT COMPLETED

**Still TODO:**

- Dark mode implementation:
  - Create `components/shared/ThemeToggle.tsx`
  - Add theme switching functionality
  - Add theme provider to app/layout.tsx
  - Update navigation to include theme toggle
  - Ensure all components respect theme
- Mobile optimizations:
  - Test and fix game board on small screens (320px+)
  - Ensure drag-and-drop works on touch devices
  - Add meta viewport tag if missing
  - Responsive font sizes and spacing

```
Implement dark mode toggle and ensure the app works perfectly on mobile devices.
```

#### Agent 2.9.2: Loading States & Error Handling ❌ NOT COMPLETED

**Still TODO:**

- Loading states:
  - Add skeleton loaders for all data fetching
  - Loading spinner for game board initial load
  - Loading states for user profile data
  - Loading states for game history items
- Error handling:
  - Create `components/shared/ErrorBoundary.tsx`
  - User-friendly error messages (not technical jargon)
  - "Try Again" buttons for failed operations
  - Offline state detection and messaging

```
Add comprehensive loading states and error handling throughout the application.
```

#### Agent 2.9.3: Animations & Polish ❌ NOT COMPLETED

**Still TODO:**

- Animations:
  - Smooth piece movement animations
  - Page transitions
  - Interactive hover states
  - Notification animations
- UI Polish:
  - Consistent spacing and typography
  - Smooth scrolling
  - Focus states for accessibility
  - Keyboard navigation support

```
Add animations and final UI polish to create a smooth, professional experience.
```

#### Agent 2.9.4: SEO & Performance ❌ NOT COMPLETED

**Still TODO:**

- SEO optimization:
  - Add metadata to all pages using Next.js metadata API
  - Open Graph tags for game sharing
  - Proper page titles and descriptions
  - robots.txt and sitemap.xml
- Performance:
  - Lazy load game history
  - Optimize images (Next.js Image component)
  - Implement virtual scrolling for long lists
  - Code splitting for faster initial load

```
Optimize the app for search engines and performance to ensure fast loading and discoverability.
```

### Agent 2.10: Documentation and Deployment ❌ NOT COMPLETED

**Status**: Only basic development README exists

#### Agent 2.10.1: Project Documentation ❌ NOT COMPLETED

**Still TODO:**

- Update `README.md` with:
  - Project overview and features
  - Tech stack details (Next.js, Convex, Clerk, etc.)
  - Local development setup instructions
  - Environment variables documentation
  - Architecture decisions and diagrams
  - API documentation for Convex functions
- Additional documentation:
  - `docs/ARCHITECTURE.md` - System design and data flow
  - `docs/GAME_RULES.md` - Camelot game rules
  - `docs/API.md` - Convex functions documentation

```
Create comprehensive project documentation for developers and users.
```

#### Agent 2.10.2: CI/CD Setup ❌ NOT COMPLETED

**Still TODO:**

- Set up GitHub Actions (`.github/workflows/ci.yml`):
  - Run on PR and push to main
  - Steps: Install, Type check, Lint, Build, Test
  - Add caching for node_modules
  - Run engine tests
- Create `CONTRIBUTING.md`:
  - Code style guide (Prettier config already exists)
  - Branch naming conventions
  - PR template
  - Commit message format
  - Testing requirements

```
Set up continuous integration and contribution guidelines.
```

#### Agent 2.10.3: Deployment Configuration ❌ NOT COMPLETED

**Still TODO:**

- Vercel deployment configuration:
  - Create `vercel.json` if needed
  - Document build settings
  - Environment variables setup guide
  - Preview deployment configuration
- Performance optimizations:
  - Analyze bundle size and optimize
  - Implement performance improvements
  - Add performance testing to CI
  - Document performance targets
- Production readiness checklist

```
Configure deployment settings and optimize for production.
```

## Coordination Notes

- Agents 2.1 through 2.10 can work in parallel after Agent 1.1 completes
- Each agent should create feature branches
- Agents should not modify files outside their scope without coordination
- Use conventional commits for clear history
- Test your features in isolation before merging
