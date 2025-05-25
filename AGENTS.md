# AGENTS.md - Camelot Web App Architecture Overview

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
