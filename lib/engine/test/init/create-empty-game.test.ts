import getBoardSpace from '../query/get-board-space.ts';
import createEmptyGame from '../init/create-empty-game.ts';

describe('create-empty-game', function () {
  it('should have a board space at 10, 3', function () {
    expect(getBoardSpace(createEmptyGame(), 10, 3)).toEqual({
      row: 10,
      col: 3,
      piece: {
        type: 'pawn',
        player: 'playerB',
      },
    });
  });

  it('should not have a board space at 0, 0', function () {
    expect(getBoardSpace(createEmptyGame(), 0, 0)).toBe(null);
  });

  it('should start with turnCount = 0', function () {
    expect(createEmptyGame()).toHaveProperty('turnCount', 0);
  });

  it('should include a captured pieces record', function () {
    expect(createEmptyGame()).toHaveProperty('capturedPieces');
    expect(createEmptyGame().capturedPieces).toEqual({
      playerA: {
        pawn: 0,
        knight: 0,
      },
      playerB: {
        pawn: 0,
        knight: 0,
      },
    });
  });
});
