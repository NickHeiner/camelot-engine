import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import createEmptyGame from '../lib/engine/init/create-empty-game.js';
import withStartingPieces from '../lib/engine/init/with-starting-pieces.js';

export const createGame = mutation({
  args: {
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const emptyGame = createEmptyGame();
    const gameWithPieces = withStartingPieces(emptyGame);

    const gameId = await ctx.db.insert('games', {
      status: 'waiting',
      createdBy: args.createdBy,
      playerA: args.createdBy,
      turnCount: 0,
      currentPlayer: 'playerA',
      boardSpaces: gameWithPieces.boardSpaces,
      capturedPieces: gameWithPieces.capturedPieces,
      createdAt: Date.now(),
    });

    return gameId;
  },
});

export const joinGame = mutation({
  args: {
    gameId: v.id('games'),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) throw new Error('Game not found');
    if (game.status !== 'waiting') throw new Error('Game already started');
    if (game.playerB) throw new Error('Game already has two players');
    if (game.playerA === args.userId)
      throw new Error('Cannot join your own game');

    await ctx.db.patch(args.gameId, {
      playerB: args.userId,
      status: 'playing',
      startedAt: Date.now(),
    });
  },
});

export const getGame = query({
  args: { gameId: v.id('games') },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) return null;

    const playerAUser = game.playerA
      ? await ctx.db
          .query('users')
          .withIndex('by_clerk_id', (q) => q.eq('clerkId', game.playerA!))
          .unique()
      : null;

    const playerBUser = game.playerB
      ? await ctx.db
          .query('users')
          .withIndex('by_clerk_id', (q) => q.eq('clerkId', game.playerB!))
          .unique()
      : null;

    const moves = await ctx.db
      .query('moves')
      .withIndex('by_game', (q) => q.eq('gameId', args.gameId))
      .order('asc')
      .collect();

    return {
      game,
      boardSpaces: game.boardSpaces,
      moves,
      playerAName: playerAUser?.username ?? null,
      playerBName: playerBUser?.username ?? null,
    };
  },
});

export const getAvailableGames = query({
  handler: async (ctx) => {
    const games = await ctx.db
      .query('games')
      .withIndex('by_status', (q) => q.eq('status', 'waiting'))
      .order('desc')
      .take(20);

    return games;
  },
});

export const getMyGames = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const gamesAsPlayerA = await ctx.db
      .query('games')
      .withIndex('by_playerA', (q) => q.eq('playerA', args.userId))
      .collect();

    const gamesAsPlayerB = await ctx.db
      .query('games')
      .withIndex('by_playerB', (q) => q.eq('playerB', args.userId))
      .collect();

    const allGames = [...gamesAsPlayerA, ...gamesAsPlayerB];
    allGames.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    return allGames;
  },
});
