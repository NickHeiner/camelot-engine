import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  games: defineTable({
    // Game metadata
    status: v.union(
      v.literal('waiting'),
      v.literal('playing'),
      v.literal('completed')
    ),
    createdBy: v.string(), // User ID who created the game
    playerA: v.optional(v.string()), // User ID of player A
    playerB: v.optional(v.string()), // User ID of player B
    winner: v.optional(v.union(v.literal('playerA'), v.literal('playerB'))),
    createdAt: v.number(),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),

    // Game state
    turnCount: v.number(),
    currentPlayer: v.union(v.literal('playerA'), v.literal('playerB')),
    capturedPieces: v.object({
      playerA: v.object({
        knight: v.number(),
        pawn: v.number(),
      }),
      playerB: v.object({
        knight: v.number(),
        pawn: v.number(),
      }),
    }),
  })
    .index('by_status', ['status'])
    .index('by_playerA', ['playerA'])
    .index('by_playerB', ['playerB'])
    .index('by_creator', ['createdBy']),

  boardSpaces: defineTable({
    gameId: v.id('games'),
    row: v.number(),
    col: v.number(),
    piece: v.optional(
      v.object({
        type: v.union(v.literal('knight'), v.literal('pawn')),
        player: v.union(v.literal('playerA'), v.literal('playerB')),
      })
    ),
  })
    .index('by_game', ['gameId'])
    .index('by_game_position', ['gameId', 'row', 'col']),

  moves: defineTable({
    gameId: v.id('games'),
    turnNumber: v.number(),
    player: v.union(v.literal('playerA'), v.literal('playerB')),
    from: v.object({ row: v.number(), col: v.number() }),
    to: v.object({ row: v.number(), col: v.number() }),
    capturedPiece: v.optional(
      v.object({
        type: v.union(v.literal('knight'), v.literal('pawn')),
        at: v.object({ row: v.number(), col: v.number() }),
      })
    ),
    timestamp: v.number(),
  })
    .index('by_game', ['gameId'])
    .index('by_game_and_turn', ['gameId', 'turnNumber']),

  users: defineTable({
    clerkId: v.string(), // Clerk user ID for authentication
    username: v.string(),
    gamesPlayed: v.number(),
    gamesWon: v.number(),
    createdAt: v.number(),
  })
    .index('by_clerk_id', ['clerkId'])
    .index('by_username', ['username']),
});
