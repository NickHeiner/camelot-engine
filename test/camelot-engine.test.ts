import { createEmptyGame } from '../lib/camelot-engine.js';

describe('camelot-engine', function () {
  describe('createEmptyGame', function () {
    it('should have turnCount = 0', function () {
      expect(createEmptyGame()).toHaveProperty('turnCount', 0);
    });

    it('should have no captured pieces', function () {
      expect(createEmptyGame().capturedPieces).toEqual({
        playerA: { pawn: 0, knight: 0 },
        playerB: { pawn: 0, knight: 0 },
      });
    });

    it('should create board spaces', function () {
      expect(createEmptyGame().boardSpaces).toHaveLength(172);
    });
  });


});
