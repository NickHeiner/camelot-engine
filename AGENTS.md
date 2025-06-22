# AGENTS.md - Camelot Web App Architecture Overview

## General guidance

- If you need a task done online (e.g. log into the Convex dev console and do a tas), ask the user to do it for you.
- Break down complex tasks into a TODO list, then work your way through it.
- Your task will be described to you in agent-prompts.md. When you finish your task, update the agent-prompts.md file to reflect your progress. (Flag any known issues in the appropriate section of that file.)

Do not start responses with "you're absolutely right" or similar. Be my professional partner, not sycophant.
When removing code, actually delete it. Don't just comment it out.

## Testing Requirements

When you write a unit test or implement a feature, do whatever you can to try it yourself (actually run the tests, call the script, etc) before reporting that you're done. Fix any issues you find.

If your changes can be verified by updating the unit test suite (e.g. adding or modifying tests), do that and run the tests before actually making the change.

**IMPORTANT**: Always run `npm test` before reporting any work as complete or done. This command runs:

If tests fail, fix the issues before proceeding. The full test suite should pass before any work is considered complete.

## General Guidelines

- Follow the architectural guidance in AGENTS.md
- Use TypeScript strictly - no `any` types unless absolutely necessary
- Follow existing code patterns and conventions
- Keep components small and focused
- Write clear, self-documenting code with meaningful variable names

<code-best-pratices>
* Use optional chaining whenever possible
* Prefer Boolean() over !!
</code-best-pratices>

## ⚠️ IMPORTANT: This is context, not instructions

This document provides architectural context for all agents working on the Camelot web app. It describes the overall system design and how components fit together. Your specific instructions are in your individual prompt - use this document to understand how your work fits into the larger system.

Generally try to abide by this doc, but if you do change something that this doc says, update the doc accordingly.

## Tech Stack

Use the latest versions of all deps:

- **Frontend**: Next.js + TypeScript
- **UI**: Shadcn/ui + Tailwind CSS
- **Authentication**: Clerk
- **Database/Realtime**: Convex
- **Hosting**: Vercel
- **Monitoring**: Datadog
- **Game Engine**: Existing camelot-engine (TypeScript)

## Project Structure

```
camelot-web/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth-required routes
│   │   ├── game/          # Active game pages
│   │   ├── profile/       # User profile pages
│   │   └── history/       # Game history
│   ├── api/               # API routes if needed
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── game/              # Game-specific components
│   │   ├── Board.tsx      # Main game board
│   │   ├── Piece.tsx      # Individual pieces
│   │   └── GameControls.tsx
│   ├── ui/                # Shadcn components
│   └── shared/            # Shared components
├── convex/                # Convex backend
│   ├── schema.ts          # Database schema
│   ├── games.ts           # Game mutations/queries
│   └── users.ts           # User data
├── lib/
│   ├── game-adapter.ts    # Adapter for camelot-engine/
```

## Core Data Models

## Key Architectural Decisions

### 1. Game State Management

- The camelot-engine handles all game logic validation
- Convex stores the authoritative game state
- Real-time updates flow through Convex subscriptions
- UI state is derived from Convex data

### 2. Authentication Flow

- Clerk handles all auth
- Middleware protects game routes
- User profiles linked to Clerk IDs

### 3. Real-time Multiplayer

- Convex mutations for moves
- Optimistic updates for responsiveness
- Presence system shows online opponents
- Game invites via shareable links

### 4. Component Architecture

- Server components for initial page loads
- Client components for interactivity
- Board component handles drag-and-drop
- Move validation happens both client and server side

## Integration Points

### Camelot Engine Integration

- Import engine into lib/game-adapter.ts
- Engine validates moves before sending to Convex
- Engine generates legal moves for UI hints
- Engine evaluates positions for analysis

### Clerk Integration

- Middleware in middleware.ts
- User data synced to Convex on first login
- Profile pictures from Clerk

### Convex Integration

- Real-time subscriptions for game state
- Mutations for all game actions
- Queries for game history and stats

## Performance Considerations

- Server-side render game board for SEO
- Lazy load heavy components (analysis, history)
- Use Convex indexes for fast queries

## Security Considerations

- All moves validated (or fully performed) server-side
- Row-level security in Convex
- Private games use access tokens
- Rate limiting on game creation

Remember: This document provides context. Always refer to your specific agent prompt for your actual tasks and deliverables.

# Other Context

<game-rules>
**Camelot in a nutshell**

- **Board & setup:** 160-square board (12×14 with the four corner 3-square blocks removed) plus two-square “castle” extensions at each short edge. Each side starts with **14 pieces – 4 knights, 10 men** – in the centre rows. ([en.wikipedia.org][1])
- **Win conditions:** (1) be the first to occupy the enemy castle with **any two** of your pieces, or (2) capture **all** opposing pieces while still having at least two of your own left. ([en.wikipedia.org][1])
- **Three ways to move (any direction):**

  1. **Plain move:** one square, like a chess king.
  2. **Canter:** leap over an adjacent friendly piece to the empty square immediately beyond; chain as many leaps as you like. Cantering is **optional** and you can stop anywhere. ([en.wikipedia.org][1], [worldcamelotfederation.com][2])
  3. **Jump (capture):** leap over an adjacent enemy piece to the empty square beyond; the jumped piece is removed. If, after landing, another capture is available with that same piece, you **must** continue jumping in the same turn. ([en.wikipedia.org][1], [worldcamelotfederation.com][2])

- **Knight’s Charge:** a knight may string together any number of canters **followed by** one or more compulsory jumps in one turn. It’s voluntary; once begun, the capture part follows the usual forced-jump rule. ([en.wikipedia.org][1])
- **Castles:** you can **never** move or canter into your own castle, but you may jump out of it if forced on your next turn. Capturing into the opponent’s castle counts toward the “two-in-castle” victory. ([beta.goldtoken.com][3])
- **Forced capture priority:** if any of your pieces has a legal jump, you must choose **one** of them and perform **some** capture sequence (your choice which). There’s no “legal-max” rule; length doesn’t matter, only that you keep jumping until no more captures are immediately available. ([en.wikipedia.org][1])
- **No promotion, no piece-type changes, no en passant-style quirks.**
- **Draws** are rare but can be agreed or declared after 50 consecutive non-capture moves by both players (common tournament rule, not universal). ([worldcamelotfederation.com][2])

[1]: https://en.wikipedia.org/wiki/Camelot_%28board_game%29?utm_source=chatgpt.com 'Camelot (board game)'
[2]: https://www.worldcamelotfederation.com/Camelot_Rules.htm?utm_source=chatgpt.com 'Camelot Rules English'
[3]: https://beta.goldtoken.com/play?rules=Camelot&utm_source=chatgpt.com 'Camelot Rules - GoldToken'

</game-rules>
