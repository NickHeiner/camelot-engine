import { v } from 'convex/values';
import { mutation } from './_generated/server';
import { Doc } from './_generated/dataModel';
import isValidMove from '../lib/engine/query/is-valid-move.js';
import applyMove from '../lib/engine/update/apply-move.js';
import getGameWinner from '../lib/engine/query/get-game-winner.js';
import { boardSpacesToGameState, getCurrentPlayer } from './gameHelpers';
import type { Coordinates } from '../lib/engine/types';

export const makeMove = mutation({
  args: {
    gameId: v.id('games'),
    userId: v.string(),
    from: v.object({ row: v.number(), col: v.number() }),
    to: v.object({ row: v.number(), col: v.number() }),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) throw new Error('Game not found');
    if (game.status !== 'playing') throw new Error('Game is not active');

    const currentPlayer = getCurrentPlayer(game.turnCount);
    const playerUserId =
      currentPlayer === 'playerA' ? game.playerA : game.playerB;
    if (playerUserId !== args.userId) throw new Error('Not your turn');

    const boardSpaces = await ctx.db
      .query('boardSpaces')
      .withIndex('by_game', (q) => q.eq('gameId', args.gameId))
      .collect();

    const gameState = boardSpacesToGameState(boardSpaces, game);

    const from: Coordinates = { row: args.from.row, col: args.from.col };
    const to: Coordinates = { row: args.to.row, col: args.to.col };

    if (!isValidMove(gameState, from, to)) {
      throw new Error('Invalid move');
    }

    const newGameState = applyMove(gameState, from, to);

    const fromSpace = await ctx.db
      .query('boardSpaces')
      .withIndex('by_game_position', (q) =>
        q.eq('gameId', args.gameId).eq('row', from.row).eq('col', from.col)
      )
      .first();

    const toSpace = await ctx.db
      .query('boardSpaces')
      .withIndex('by_game_position', (q) =>
        q.eq('gameId', args.gameId).eq('row', to.row).eq('col', to.col)
      )
      .first();

    if (!fromSpace || !toSpace) throw new Error('Invalid board position');

    const capturedPiece = toSpace.piece
      ? {
          type: toSpace.piece.type,
          at: { row: to.row, col: to.col },
        }
      : undefined;

    await ctx.db.insert('moves', {
      gameId: args.gameId,
      turnNumber: game.turnCount,
      player: currentPlayer,
      from: args.from,
      to: args.to,
      capturedPiece,
      timestamp: Date.now(),
    });

    await ctx.db.patch(fromSpace._id, { piece: undefined });
    await ctx.db.patch(toSpace._id, { piece: fromSpace.piece });

    const winner = getGameWinner(newGameState);
    const updates: Partial<Doc<'games'>> = {
      turnCount: newGameState.turnCount,
      currentPlayer: getCurrentPlayer(newGameState.turnCount),
      capturedPieces: newGameState.capturedPieces,
    };

    if (winner) {
      updates.status = 'completed';
      updates.winner = winner;
      updates.completedAt = Date.now();
    }

    await ctx.db.patch(args.gameId, updates);
  },
});
