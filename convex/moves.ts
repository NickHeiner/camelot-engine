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

    const gameState = boardSpacesToGameState(game.boardSpaces, game);

    const from: Coordinates = { row: args.from.row, col: args.from.col };
    const to: Coordinates = { row: args.to.row, col: args.to.col };

    if (!isValidMove(gameState, from, to)) {
      throw new Error('Invalid move');
    }

    const newGameState = applyMove(gameState, from, to);

    // Find the piece being moved
    const fromSpaceIndex = game.boardSpaces.findIndex(
      (s) => s.row === from.row && s.col === from.col
    );
    const toSpaceIndex = game.boardSpaces.findIndex(
      (s) => s.row === to.row && s.col === to.col
    );

    if (fromSpaceIndex === -1 || toSpaceIndex === -1) {
      throw new Error('Invalid board position');
    }

    const movingPiece = game.boardSpaces[fromSpaceIndex].piece;
    if (!movingPiece) throw new Error('No piece at source position');

    const capturedPiece = game.boardSpaces[toSpaceIndex].piece
      ? {
          type: game.boardSpaces[toSpaceIndex].piece!.type,
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

    // Update the board spaces array
    const updatedBoardSpaces = [...game.boardSpaces];
    updatedBoardSpaces[fromSpaceIndex] = {
      ...updatedBoardSpaces[fromSpaceIndex],
      piece: undefined,
    };
    updatedBoardSpaces[toSpaceIndex] = {
      ...updatedBoardSpaces[toSpaceIndex],
      piece: movingPiece,
    };

    const winner = getGameWinner(newGameState);
    const updates: Partial<Doc<'games'>> = {
      boardSpaces: updatedBoardSpaces,
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
