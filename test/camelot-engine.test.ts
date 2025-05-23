import {
  createEmptyGame,
  applyMoves,
  isGoal,
  isValidMove,
  getGameWinner,
  getBoardSpace,
  getAllBoardSpaces,
  getCoordsBetween,
} from '../lib/camelot-engine.js';
import { KNIGHT, PAWN } from '../lib/constants.js';

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

  describe('query', function () {
    it('exports isGoal', function () {
      expect(typeof isGoal).toBe('function');
    });

    it('exports isValidMove', function () {
      expect(typeof isValidMove).toBe('function');
    });

    it('exports getGameWinner', function () {
      expect(typeof getGameWinner).toBe('function');
    });

    it('exports getBoardSpace', function () {
      expect(typeof getBoardSpace).toBe('function');
    });

    it('exports getAllBoardSpaces', function () {
      expect(typeof getAllBoardSpaces).toBe('function');
    });

    it('exports getCoordsBetween', function () {
      expect(typeof getCoordsBetween).toBe('function');
    });
  });

  describe('update', function () {
    it('exports applyMoves', function () {
      expect(typeof applyMoves).toBe('function');
    });
  });

  describe('constants', function () {
    it('exports KNIGHT', function () {
      expect(typeof KNIGHT).toBe('string');
    });

    it('exports PAWN', function () {
      expect(typeof PAWN).toBe('string');
    });
  });
});
