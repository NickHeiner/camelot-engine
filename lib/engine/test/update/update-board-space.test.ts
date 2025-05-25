import updateBoardSpace from '../../update/update-board-space.js';
import { createEmptyGame, getBoardSpace } from '../../camelot-engine.js';

describe('updateBoardSpace', function () {
  it('updates a board space', function () {
    const game = createEmptyGame(),
      piece = { type: 'pawn' as const, player: 'playerB' as const },
      withPiece = updateBoardSpace(game, 11, 4, { piece });

    expect(getBoardSpace(withPiece, 11, 4)?.piece).toEqual(piece);
  });

  it('throws an error when the coordinates do not exist', function () {
    expect(function () {
      updateBoardSpace(createEmptyGame(), 99, 99, { piece: null });
    }).toThrow(/invalid coordinates/);
  });
});
