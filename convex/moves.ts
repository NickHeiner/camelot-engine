import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import _ from 'lodash';
import isValidMove from '../lib/engine/query/is-valid-move.js';
import applyMove from '../lib/engine/update/apply-move.js';
import getGameWinner from '../lib/engine/query/get-game-winner.js';
import getMoveDetails from '../lib/engine/query/get-move-details.js';
import getCoordsBetween from '../lib/engine/query/get-coords-between.js';
import getBoardSpace from '../lib/engine/query/get-board-space.js';
import { getCurrentPlayer } from '../lib/game-utils';
import type { Coordinates } from '../lib/engine/types';
import { coordinatesValidator, type Game } from './convexTypes';

export const getLegalMoves = query({
  args: {
    gameId: v.id('games'),
    from: coordinatesValidator,
    path: v.array(coordinatesValidator),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) throw new Error('Game not found');
    if (game.status !== 'playing')
      return { legalMoves: [], captureAvailable: false };

    const currentPlayer = getCurrentPlayer(game.turnCount);

    // Create engine-compatible game state
    let currentState = {
      boardSpaces: game.boardSpaces,
      turnCount: game.turnCount,
      capturedPieces: game.capturedPieces,
    };

    // Apply the path moves to get current board state
    for (let i = 0; i < args.path.length - 1; i++) {
      currentState = applyMove(currentState, args.path[i], args.path[i + 1]);
    }

    const from =
      args.path.length > 0 ? args.path[args.path.length - 1] : args.from;
    const legalMoves: Coordinates[] = [];
    let captureAvailable = false;

    // Check all possible destination squares
    for (const space of currentState.boardSpaces) {
      const to = { row: space.row, col: space.col };
      if (isValidMove(currentState, [from, to], currentPlayer)) {
        legalMoves.push(to);

        // Check if this is a capture move
        const between = getCoordsBetween(from, to);
        if (between) {
          const betweenSpace = getBoardSpace(currentState, between);
          if (
            betweenSpace?.piece &&
            betweenSpace.piece.player !== currentPlayer
          ) {
            captureAvailable = true;
          }
        }
      }
    }

    return { legalMoves, captureAvailable };
  },
});

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

    const from: Coordinates = { row: args.from.row, col: args.from.col };
    const to: Coordinates = { row: args.to.row, col: args.to.col };

    if (!isValidMove(game, [from, to])) {
      throw new Error('Invalid move');
    }

    // Get move details before applying the move
    const moveDetails = getMoveDetails(game, from, to);

    // Apply the move to get the new game state
    const newGameState = applyMove(game, from, to);

    await ctx.db.insert('moves', {
      ..._.pick(args, ['gameId', 'from', 'to']),
      turnNumber: game.turnCount,
      player: currentPlayer,
      capturedPiece: moveDetails.capturedPiece,
      timestamp: Date.now(),
    });

    // Board spaces are already in the correct format
    const updatedBoardSpaces = newGameState.boardSpaces;

    const winner = getGameWinner(newGameState);
    const updates: Partial<Game> = {
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
