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
    path: v.array(coordinatesValidator), // Full path of moves
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) throw new Error('Game not found');
    if (game.status !== 'playing') throw new Error('Game is not active');

    const pathCoords = args.path;

    if (pathCoords.length < 2) {
      throw new Error('Path must contain at least 2 positions');
    }

    const currentPlayer = getCurrentPlayer(game.turnCount);
    const playerUserId =
      currentPlayer === 'playerA' ? game.playerA : game.playerB;
    if (playerUserId !== args.userId) throw new Error('Not your turn');

    // Validate the entire move sequence
    if (!isValidMove(game, pathCoords, currentPlayer)) {
      throw new Error('Invalid move');
    }

    // Apply all moves in the path
    let currentState = {
      boardSpaces: game.boardSpaces,
      turnCount: game.turnCount,
      capturedPieces: game.capturedPieces,
    };

    // Record all move details
    const allMoveDetails = [];
    for (let i = 0; i < pathCoords.length - 1; i++) {
      const from = pathCoords[i];
      const to = pathCoords[i + 1];
      const moveDetails = getMoveDetails(currentState, from, to);
      allMoveDetails.push(moveDetails);
      currentState = applyMove(currentState, from, to);
    }

    // Record the move in the database
    await ctx.db.insert('moves', {
      gameId: args.gameId,
      from: pathCoords[0],
      to: pathCoords[pathCoords.length - 1],
      turnNumber: game.turnCount,
      player: currentPlayer,
      capturedPiece: allMoveDetails.find((d) => d.capturedPiece)?.capturedPiece,
      timestamp: Date.now(),
    });

    // Board spaces are already in the correct format
    const updatedBoardSpaces = currentState.boardSpaces;

    const winner = getGameWinner(currentState);
    const updates: Partial<Game> = {
      boardSpaces: updatedBoardSpaces,
      turnCount: currentState.turnCount,
      capturedPieces: currentState.capturedPieces,
    };

    if (winner) {
      updates.status = 'completed';
      updates.winner = winner;
      updates.completedAt = Date.now();
    }

    await ctx.db.patch(args.gameId, updates);
  },
});
