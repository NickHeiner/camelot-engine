import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import {
  playerValidator,
  boardSpaceValidator,
  capturedPiecesValidator,
  coordinatesValidator,
  pieceTypeValidator,
} from './convexTypes';

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
    winner: v.optional(playerValidator),
    createdAt: v.number(),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),

    // Game state
    turnCount: v.number(),
    currentPlayer: playerValidator,
    boardSpaces: v.array(boardSpaceValidator),
    capturedPieces: capturedPiecesValidator,
  })
    .index('by_status', ['status'])
    .index('by_playerA', ['playerA'])
    .index('by_playerB', ['playerB'])
    .index('by_creator', ['createdBy']),

  moves: defineTable({
    gameId: v.id('games'),
    turnNumber: v.number(),
    player: playerValidator,
    from: coordinatesValidator,
    to: coordinatesValidator,
    capturedPiece: v.optional(
      v.object({
        type: pieceTypeValidator,
        at: coordinatesValidator,
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
