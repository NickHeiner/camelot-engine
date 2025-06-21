# Agent Prompts for Camelot Web App

## Phase 1: Critical Path Setup (Sequential - Claude Code)

### Agent 1.1: Project Foundation

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

### Agent 2.1: Authentication Setup (Claude Code)

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

### Agent 2.2: Convex Backend Setup (Claude Code)

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

### Agent 2.3: Game Board UI 

```
Build the game board component for Camelot using the existing types and structure.

Context: This is a chess-like game called Camelot. The game engine already exists at camelot-engine.

Tasks:
1. Install @dnd-kit/sortable for drag-and-drop
2. Create components/game/Board.tsx:
   - 12x16 grid (Camelot board size)
   - Render pieces based on FEN-like position string
   - Handle drag-and-drop with visual feedback
   - Highlight valid moves on piece selection
3. Create components/game/Piece.tsx:
   - Render different piece types (use chess pieces as placeholder)
   - Make pieces draggable
   - Show piece color (white/black)
4. Create components/game/Square.tsx:
   - Handle drop events
   - Show highlighting for valid moves
   - Alternate colors checkerboard pattern

The board should be responsive and look good on mobile. Use Tailwind classes for styling.
```

### Agent 2.4: Game Integration (Claude Code)

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

### Agent 2.5: Monitoring Setup (Claude Code)

```
Set up Datadog monitoring for the Camelot game app.

Tasks:
1. Install @datadog/browser-rum and @datadog/browser-logs
2. Create lib/monitoring.ts with Datadog initialization
3. Add RUM (Real User Monitoring) to track:
   - Page load times
   - User interactions (moves, clicks)
   - Errors and exceptions
4. Set up custom events for:
   - Game started
   - Move made
   - Game completed
5. Add performance monitoring for:
   - Board render times
   - Move validation speed
   - Convex query/mutation times
6. Create error boundaries that report to Datadog
7. Set up development vs production configurations

Use environment variables for API keys. Create a comprehensive monitoring setup that helps track both technical performance and user behavior.
```

### Agent 2.6: Game Features 

```
Implement core game features for the Camelot web app.

Tasks:
1. Create components/game/Timer.tsx:
   - Countdown timer for each player
   - Pause when not player's turn
   - Visual warning when low on time
2. Create components/game/MoveHistory.tsx:
   - Display moves in algebraic notation
   - Scrollable list
   - Click to jump to position
3. Create components/game/GameStatus.tsx:
   - Show whose turn it is
   - Display game result when complete
   - Show captured pieces
4. Update the game page app/(auth)/game/[id]/page.tsx:
   - Combine all game components
   - Handle loading and error states
   - Show opponent info
5. Add sound effects:
   - Move sounds
   - Capture sounds
   - Game end sounds
   - Timer warning sounds

Use Zustand or Context for local game state that doesn't need to be in Convex.
```

### Agent 2.7: User Features 

```
Build user profile and game history features.

Tasks:
1. Implement app/(auth)/profile/page.tsx:
   - Show user stats (games played, won, lost)
   - Win rate percentage
   - Recent games list
   - Avatar from Clerk
2. Create components/profile/GameStats.tsx:
   - Visual charts for statistics
   - Use recharts or similar for graphs
3. Implement app/(auth)/history/page.tsx:
   - Paginated list of all games
   - Filter by outcome (won/lost/draw)
   - Search by opponent
4. Create components/history/GameListItem.tsx:
   - Show game summary
   - Link to replay
   - Show date and duration
5. Create components/shared/Avatar.tsx:
   - Reusable avatar component
   - Fall back to initials if no image

Make everything responsive and fast-loading with proper loading states.
```

### Agent 2.8: Game Creation Flow 

```
Build the game creation and joining flow.

Tasks:
1. Create app/(auth)/new-game/page.tsx:
   - Form to create a new game
   - Select time control
   - Choose color (white/black/random)
   - Generate shareable link
2. Create components/game/CreateGameForm.tsx:
   - Nice UI with Shadcn components
   - Time control presets
   - Copy invite link button
3. Create app/join/[code]/page.tsx:
   - Public page to join via invite link
   - Show game details
   - Redirect to sign-in if not authenticated
   - Join button
4. Create components/game/GameLobby.tsx:
   - Show while waiting for opponent
   - Display invite link prominently
   - Cancel game option
5. Add notifications using react-hot-toast:
   - Game started
   - Opponent joined
   - It's your turn

Focus on making the flow smooth and intuitive.
```

### Agent 2.9: Polish and Responsive Design 

```
Polish the UI and ensure everything is responsive and accessible.

Tasks:
1. Dark mode support:
   - Add theme toggle to navigation
   - Use Shadcn's theme system
   - Persist preference
2. Mobile optimizations:
   - Ensure board is touch-friendly
   - Optimize layout for small screens
   - Add viewport meta tag
3. Loading states:
   - Add skeletons for all data fetching
   - Smooth transitions
   - Progress indicators
4. Error handling:
   - User-friendly error messages
   - Retry mechanisms
   - Fallback UI
5. Animations:
   - Smooth piece movement
   - Page transitions with Framer Motion
   - Micro-interactions
6. SEO optimization:
   - Add metadata to all pages
   - Open Graph tags
   - Proper page titles

Test on various devices and ensure consistent experience.
```

### Agent 2.10: Documentation and Deployment (Claude Code)

```
Prepare the project for deployment and create documentation.

Tasks:
1. Create comprehensive README.md:
   - Project overview
   - Tech stack
   - Setup instructions
   - Architecture decisions
2. Set up GitHub Actions:
   - CI pipeline with tests
   - Type checking
   - Linting
3. Configure Vercel deployment:
   - Environment variables documentation
   - Build configuration
   - Preview deployments
4. Create CONTRIBUTING.md:
   - Code style guide
   - PR process
   - Development workflow
5. Add example .env.example:
   - All required environment variables
   - Clear descriptions
6. Performance optimizations:
   - Image optimization
   - Bundle analysis
   - Lighthouse audit fixes

Ensure the project is ready for production deployment and future contributors.
```

## Coordination Notes

- Agents 2.1 through 2.10 can work in parallel after Agent 1.1 completes
- Each agent should create feature branches
- Agents should not modify files outside their scope without coordination
- Use conventional commits for clear history
- Test your features in isolation before merging
