import { v } from 'convex/values';
import { mutation } from './_generated/server';
import { Doc } from './_generated/dataModel';
import isValidMove from '../lib/engine/query/is-valid-move.js';
import applyMove from '../lib/engine/update/apply-move.js';
import getGameWinner from '../lib/engine/query/get-game-winner.js';
import getMoveDetails from '../lib/engine/query/get-move-details.js';
import { boardSpacesToGameState, getCurrentPlayer } from './gameHelpers';
import type { Coordinates } from '../lib/engine/types';
import { coordinatesValidator } from './convexTypes';

export const makeMove = mutation({
  args: {
    gameId: v.id('games'),
    userId: v.string(),
    from: coordinatesValidator,
    to: coordinatesValidator,
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

    if (!isValidMove(gameState, [from, to])) {
      throw new Error('Invalid move');
    }

    // Get move details before applying the move
    const moveDetails = getMoveDetails(gameState, from, to);

    // Apply the move to get the new game state
    const newGameState = applyMove(gameState, from, to);

    await ctx.db.insert('moves', {
      gameId: args.gameId,
      turnNumber: game.turnCount,
      player: currentPlayer,
      from: args.from,
      to: args.to,
      capturedPiece: moveDetails.capturedPiece,
      timestamp: Date.now(),
    });

    // Convert the new game state board spaces to Convex format
    const updatedBoardSpaces = newGameState.boardSpaces.map((space) => ({
      row: space.row,
      col: space.col,
      piece: space.piece || undefined,
    }));

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
