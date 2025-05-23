import updateBoardSpace from '../../lib/update/update-board-space.js';
import { createEmptyGame, getBoardSpace } from '../..';

describe('updateBoardSpace', function () {
  it('updates a board space', function () {
    const game = createEmptyGame(),
      piece = { type: 'pawn', player: 'playerB' },
      withPiece = updateBoardSpace(game, 11, 4, { piece });

    expect(getBoardSpace(withPiece, 11, 4).piece).toEqual(piece);
  });
});
