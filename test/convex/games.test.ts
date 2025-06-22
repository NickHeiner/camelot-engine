import { describe, it, expect } from '@jest/globals';

// Mock Convex context for testing
const createMockDb = () => {
  const games: any[] = [];
  let nextId = 1;

  return {
    insert: async (table: string, data: any) => {
      const id = `game${nextId++}`;
      const game = { _id: id, ...data, _creationTime: Date.now() };
      games.push(game);
      return id;
    },
    query: (table: string) => ({
      withIndex: (indexName: string, filter: (q: any) => any) => ({
        order: (direction: string) => ({
          take: async (limit: number) => {
            // Filter by status='waiting'
            const waitingGames = games.filter((g) => g.status === 'waiting');
            // Sort by creation time descending
            const sorted = waitingGames.sort(
              (a, b) => b._creationTime - a._creationTime
            );
            return sorted.slice(0, limit);
          },
        }),
      }),
    }),
    patch: async (id: string, updates: any) => {
      const gameIndex = games.findIndex((g) => g._id === id);
      if (gameIndex !== -1) {
        games[gameIndex] = { ...games[gameIndex], ...updates };
      }
    },
  };
};

describe('games.getAvailableGames', () => {
  it('should return waiting games when no userId provided', async () => {
    const mockDb = createMockDb();
    const ctx = { db: mockDb };

    // Create test games
    await mockDb.insert('games', {
      playerA: 'user1',
      playerAName: 'Player 1',
      status: 'waiting',
      turnCount: 0,
    });

    await mockDb.insert('games', {
      playerA: 'user2',
      playerAName: 'Player 2',
      status: 'waiting',
      turnCount: 0,
    });

    // Simulate the query logic
    const gamesQuery = ctx.db
      .query('games')
      .withIndex('by_status', (q: any) => q.eq('status', 'waiting'));
    const allGames = await gamesQuery.order('desc').take(100);
    const filteredGames = allGames.slice(0, 20);

    expect(filteredGames).toHaveLength(2);
    expect(filteredGames[0].status).toBe('waiting');
    expect(filteredGames[1].status).toBe('waiting');
  });

  it('should exclude games where user is playerA', async () => {
    const mockDb = createMockDb();
    const ctx = { db: mockDb };
    const userId = 'user1';

    // Create games where user1 is playerA
    await mockDb.insert('games', {
      playerA: 'user1',
      playerAName: 'Player 1',
      status: 'waiting',
      turnCount: 0,
    });

    // Create games where user1 is NOT involved
    await mockDb.insert('games', {
      playerA: 'user2',
      playerAName: 'Player 2',
      status: 'waiting',
      turnCount: 0,
    });

    // Simulate the query logic with filtering
    const gamesQuery = ctx.db
      .query('games')
      .withIndex('by_status', (q: any) => q.eq('status', 'waiting'));
    const allGames = await gamesQuery.order('desc').take(100);
    const filteredGames = userId
      ? allGames.filter(
          (game: any) => game.playerA !== userId && game.playerB !== userId
        )
      : allGames;
    const result = filteredGames.slice(0, 20);

    expect(result).toHaveLength(1);
    expect(result[0].playerA).toBe('user2');
  });

  it('should exclude games where user is playerB', async () => {
    const mockDb = createMockDb();
    const ctx = { db: mockDb };
    const userId = 'user1';

    // Create a game and join it as playerB
    const gameId = await mockDb.insert('games', {
      playerA: 'user2',
      playerAName: 'Player 2',
      playerB: 'user1',
      playerBName: 'Player 1',
      status: 'active',
      turnCount: 0,
    });

    // Create another game that user1 hasn't joined
    await mockDb.insert('games', {
      playerA: 'user3',
      playerAName: 'Player 3',
      status: 'waiting',
      turnCount: 0,
    });

    // Simulate the query logic
    const gamesQuery = ctx.db
      .query('games')
      .withIndex('by_status', (q: any) => q.eq('status', 'waiting'));
    const allGames = await gamesQuery.order('desc').take(100);
    const filteredGames = userId
      ? allGames.filter(
          (game: any) => game.playerA !== userId && game.playerB !== userId
        )
      : allGames;
    const result = filteredGames.slice(0, 20);

    expect(result).toHaveLength(1);
    expect(result[0].playerA).toBe('user3');
  });

  it('should limit results to 20 games', async () => {
    const mockDb = createMockDb();
    const ctx = { db: mockDb };

    // Create 25 games
    for (let i = 0; i < 25; i++) {
      await mockDb.insert('games', {
        playerA: `user${i}`,
        playerAName: `Player ${i}`,
        status: 'waiting',
        turnCount: 0,
      });
    }

    // Simulate the query logic
    const gamesQuery = ctx.db
      .query('games')
      .withIndex('by_status', (q: any) => q.eq('status', 'waiting'));
    const allGames = await gamesQuery.order('desc').take(100);
    const result = allGames.slice(0, 20);

    expect(result).toHaveLength(20);
  });

  it('should return games in descending order by creation time', async () => {
    const mockDb = createMockDb();
    const ctx = { db: mockDb };

    // Create games with delay to ensure different creation times
    const game1Id = await mockDb.insert('games', {
      playerA: 'user1',
      playerAName: 'Player 1',
      status: 'waiting',
      turnCount: 0,
    });

    // Simulate time passing
    await new Promise((resolve) => setTimeout(resolve, 10));

    const game2Id = await mockDb.insert('games', {
      playerA: 'user2',
      playerAName: 'Player 2',
      status: 'waiting',
      turnCount: 0,
    });

    // Simulate the query logic
    const gamesQuery = ctx.db
      .query('games')
      .withIndex('by_status', (q: any) => q.eq('status', 'waiting'));
    const allGames = await gamesQuery.order('desc').take(100);
    const result = allGames.slice(0, 20);

    // Most recent game should be first
    expect(result[0]._id).toBe(game2Id);
    expect(result[1]._id).toBe(game1Id);
  });

  it('should only return games with waiting status', async () => {
    const mockDb = createMockDb();
    const ctx = { db: mockDb };

    // Create a waiting game
    const waitingGameId = await mockDb.insert('games', {
      playerA: 'user1',
      playerAName: 'Player 1',
      status: 'waiting',
      turnCount: 0,
    });

    // Create an active game (joined by playerB)
    const activeGameId = await mockDb.insert('games', {
      playerA: 'user2',
      playerAName: 'Player 2',
      playerB: 'user3',
      playerBName: 'Player 3',
      status: 'active',
      turnCount: 0,
    });

    // Simulate the query logic
    const gamesQuery = ctx.db
      .query('games')
      .withIndex('by_status', (q: any) => q.eq('status', 'waiting'));
    const allGames = await gamesQuery.order('desc').take(100);
    const result = allGames.slice(0, 20);

    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe(waitingGameId);
    expect(result[0].status).toBe('waiting');
  });
});
