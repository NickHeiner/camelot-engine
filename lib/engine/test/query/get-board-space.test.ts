import getBoardSpace from '../../query/get-board-space.js';
import createEmptyGame from '../../init/create-empty-game.js';

describe('get-board-space', function () {
  it('returns null for an invalid board space', function () {
    expect(getBoardSpace(createEmptyGame(), 10000, 20034)).toBeNull();
  });

  it('allows a lookup by row and column', function () {
    expect(getBoardSpace(createEmptyGame(), 10, 4)).toEqual({
      row: 10,
      col: 4,
      piece: {
        type: 'pawn',
        player: 'playerB',
      },
    });
  });

  it('allows a lookup by board space object', function () {
    expect(
      getBoardSpace(createEmptyGame(), {
        row: 9,
        col: 5,
      })
    ).toEqual({
      row: 9,
      col: 5,
      piece: {
        type: 'pawn',
        player: 'playerB',
      },
    });
  });
});
