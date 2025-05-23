import createEmptyGame from '../../lib/init/create-empty-game.js';
import updateBoardSpace from '../../lib/update/update-board-space.js';
import getBoardSpace from '../../lib/query/get-board-space.js';
import { PAWN } from '../../lib/constants.js';
import applyMove from '../../lib/update/apply-move.js';

describe('apply-move', function () {
  it('adds a piece to the destination', function () {
    const game = createEmptyGame(),
      dest = {
        row: 11,
        col: 4,
      },
      withMove = applyMove(
        game,
        {
          row: 10,
          col: 4,
        },
        dest
      );

    expect(getBoardSpace(withMove, dest)?.piece).toHaveProperty('type', PAWN);
  });

  it('removes a piece from the source', function () {
    const game = createEmptyGame(),
      src = {
        row: 10,
        col: 4,
      },
      withMove = applyMove(game, src, {
        row: 11,
        col: 4,
      });

    expect(getBoardSpace(withMove, src)?.piece).toBe(null);
  });

  it('removes a jumped piece', function () {
    const game = createEmptyGame(),
      withPieceToJump = updateBoardSpace(game, 11, 4, {
        piece: { type: PAWN, player: 'playerA' },
      }),
      src = {
        row: 10,
        col: 4,
      };

    const withMove = applyMove(withPieceToJump, src, {
      row: 12,
      col: 4,
    });

    expect(getBoardSpace(withMove, 11, 4)?.piece).toBe(null);
  });

  it('should not remove a jumped piece if it is friendly', function () {
    const game = createEmptyGame(),
      withPieceToJump = updateBoardSpace(game, 11, 4, {
        piece: { type: PAWN, player: 'playerB' },
      }),
      src = {
        row: 10,
        col: 4,
      },
      withMove = applyMove(withPieceToJump, src, {
        row: 12,
        col: 4,
      });

    expect(getBoardSpace(withMove, 11, 4)?.piece).toEqual(
      getBoardSpace(withPieceToJump, 11, 4)?.piece
    );
  });

  describe('errors', function () {
    it('throws an error when there is no piece to jump', function () {
      const game = createEmptyGame(),
        src = {
          row: 10,
          col: 4,
        };

      expect(function () {
        applyMove(game, src, {
          row: 12,
          col: 4,
        });
      }).toThrow(
        /if the move is a jump there must be a piece in the space between/
      );
    });

    it('throws an error when there is no piece at start', function () {
      const game = createEmptyGame(),
        src = {
          row: 12,
          col: 4,
        };

      expect(function () {
        applyMove(game, src, {
          row: 12,
          col: 5,
        });
      }).toThrow(/there must be a piece to move at moveStart/);
    });
  });
});
