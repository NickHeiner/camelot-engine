import classifyMove from '../../query/classify-move.js';
import createEmptyGame from '../../init/create-empty-game.js';
import withStartingPieces from '../../init/with-starting-pieces.js';
import updateBoardSpace from '../../update/update-board-space.js';
import type { GameState, Coordinates } from '../../types.js';
import { PLAYER_A, PLAYER_B, KNIGHT, PAWN } from '../../constants.js';

describe('classifyMove', () => {
  let gameState: GameState;

  beforeEach(() => {
    gameState = withStartingPieces(createEmptyGame());
  });

  describe('simple moves', () => {
    it('should classify a one-space move as simple', () => {
      const moveParts: Coordinates[] = [
        { row: 5, col: 3 }, // This is a Player A pawn
        { row: 4, col: 3 }, // Moving forward for Player A
      ];

      const result = classifyMove(gameState, moveParts);

      expect(result).not.toBeNull();
      expect(result!.steps).toHaveLength(1);
      expect(result!.steps[0].type).toBe('simple');
      expect(result!.steps[0].from).toEqual({ row: 5, col: 3 });
      expect(result!.steps[0].to).toEqual({ row: 4, col: 3 });
      expect(result!.player).toBe(PLAYER_A);
      expect(result!.piece).toBe(PAWN);
    });

    it('should classify a diagonal move as simple', () => {
      const moveParts: Coordinates[] = [
        { row: 5, col: 3 }, // Player A pawn
        { row: 4, col: 4 }, // Diagonal forward
      ];

      const result = classifyMove(gameState, moveParts);

      expect(result).not.toBeNull();
      expect(result!.steps[0].type).toBe('simple');
    });
  });

  describe('jump moves', () => {
    it('should classify a jump over an enemy piece', () => {
      // Set up a scenario where player A can jump over player B
      let modifiedState = updateBoardSpace(gameState, 6, 3, {
        piece: { type: PAWN, player: PLAYER_A },
      });
      modifiedState = updateBoardSpace(modifiedState, 7, 3, {
        piece: { type: PAWN, player: PLAYER_B },
      });

      const moveParts: Coordinates[] = [
        { row: 6, col: 3 },
        { row: 8, col: 3 },
      ];

      const result = classifyMove(modifiedState, moveParts);

      expect(result).not.toBeNull();
      expect(result!.steps).toHaveLength(1);
      expect(result!.steps[0].type).toBe('jump');
      expect(result!.steps[0].capturedPiece).toEqual({ row: 7, col: 3 });
      expect(result!.player).toBe(PLAYER_A);
    });

    it('should classify a diagonal jump', () => {
      // Set up a diagonal jump scenario
      let modifiedState = updateBoardSpace(gameState, 6, 3, {
        piece: { type: PAWN, player: PLAYER_A },
      });
      modifiedState = updateBoardSpace(modifiedState, 7, 4, {
        piece: { type: PAWN, player: PLAYER_B },
      });
      modifiedState = updateBoardSpace(modifiedState, 8, 5, {
        piece: null,
      });

      const moveParts: Coordinates[] = [
        { row: 6, col: 3 },
        { row: 8, col: 5 },
      ];

      const result = classifyMove(modifiedState, moveParts);

      expect(result).not.toBeNull();
      expect(result!.steps[0].type).toBe('jump');
      expect(result!.steps[0].capturedPiece).toEqual({ row: 7, col: 4 });
    });

    it('should classify a jump over friendly piece as canter', () => {
      // Set up a scenario where a piece jumps over a friendly piece
      let modifiedState = updateBoardSpace(gameState, 6, 3, {
        piece: { type: PAWN, player: PLAYER_A },
      });
      modifiedState = updateBoardSpace(modifiedState, 7, 3, {
        piece: { type: PAWN, player: PLAYER_A },
      });
      modifiedState = updateBoardSpace(modifiedState, 8, 3, {
        piece: null,
      });

      const moveParts: Coordinates[] = [
        { row: 6, col: 3 },
        { row: 8, col: 3 },
      ];

      const result = classifyMove(modifiedState, moveParts);

      expect(result).not.toBeNull();
      expect(result!.steps[0].type).toBe('canter');
      expect(result!.steps[0].capturedPiece).toBeUndefined();
    });
  });

  describe('canter moves', () => {
    it('should classify a diagonal jump over friendly piece as canter', () => {
      // Set up a diagonal canter scenario
      let modifiedState = updateBoardSpace(gameState, 6, 3, {
        piece: { type: PAWN, player: PLAYER_A },
      });
      modifiedState = updateBoardSpace(modifiedState, 7, 4, {
        piece: { type: PAWN, player: PLAYER_A },
      });
      modifiedState = updateBoardSpace(modifiedState, 8, 5, {
        piece: null,
      });

      const moveParts: Coordinates[] = [
        { row: 6, col: 3 },
        { row: 8, col: 5 },
      ];

      const result = classifyMove(modifiedState, moveParts);

      expect(result).not.toBeNull();
      expect(result!.steps[0].type).toBe('canter');
      expect(result!.steps[0].capturedPiece).toBeUndefined();
    });

    it('should handle knight cantering over any piece', () => {
      // Knights can canter over any piece (friendly or enemy)
      let modifiedState = updateBoardSpace(gameState, 6, 3, {
        piece: { type: KNIGHT, player: PLAYER_A },
      });
      modifiedState = updateBoardSpace(modifiedState, 7, 3, {
        piece: { type: PAWN, player: PLAYER_B },
      });
      modifiedState = updateBoardSpace(modifiedState, 8, 3, {
        piece: null,
      });

      const moveParts: Coordinates[] = [
        { row: 6, col: 3 },
        { row: 8, col: 3 },
      ];

      const result = classifyMove(modifiedState, moveParts);

      expect(result).not.toBeNull();
      expect(result!.steps[0].type).toBe('canter');
      expect(result!.piece).toBe(KNIGHT);
      // Knights cantering over enemy pieces don't capture them
      expect(result!.steps[0].capturedPiece).toBeUndefined();
    });
  });

  describe('multi-step moves', () => {
    it('should classify a double jump correctly', () => {
      // Set up a double jump scenario
      let modifiedState = updateBoardSpace(gameState, 4, 3, {
        piece: { type: PAWN, player: PLAYER_A },
      });
      modifiedState = updateBoardSpace(modifiedState, 5, 3, {
        piece: { type: PAWN, player: PLAYER_B },
      });
      modifiedState = updateBoardSpace(modifiedState, 6, 3, {
        piece: null,
      });
      modifiedState = updateBoardSpace(modifiedState, 7, 3, {
        piece: { type: PAWN, player: PLAYER_B },
      });
      modifiedState = updateBoardSpace(modifiedState, 8, 3, {
        piece: null,
      });

      const moveParts: Coordinates[] = [
        { row: 4, col: 3 },
        { row: 6, col: 3 },
        { row: 8, col: 3 },
      ];

      const result = classifyMove(modifiedState, moveParts);

      expect(result).not.toBeNull();
      expect(result!.steps).toHaveLength(2);
      expect(result!.steps[0].type).toBe('jump');
      expect(result!.steps[0].capturedPiece).toEqual({ row: 5, col: 3 });
      expect(result!.steps[1].type).toBe('jump');
      expect(result!.steps[1].capturedPiece).toEqual({ row: 7, col: 3 });
    });

    it('should classify a simple move followed by a jump', () => {
      // Set up a scenario with simple move then jump
      let modifiedState = updateBoardSpace(gameState, 5, 3, {
        piece: { type: PAWN, player: PLAYER_A },
      });
      modifiedState = updateBoardSpace(modifiedState, 6, 3, {
        piece: null,
      });
      modifiedState = updateBoardSpace(modifiedState, 7, 3, {
        piece: { type: PAWN, player: PLAYER_B },
      });
      modifiedState = updateBoardSpace(modifiedState, 8, 3, {
        piece: null,
      });

      const moveParts: Coordinates[] = [
        { row: 5, col: 3 },
        { row: 6, col: 3 },
        { row: 8, col: 3 },
      ];

      const result = classifyMove(modifiedState, moveParts);

      // This should be invalid because non-jump moves must be the only move
      expect(result).toBeNull();
    });
  });

  describe('invalid moves', () => {
    it('should return null for invalid move', () => {
      const moveParts: Coordinates[] = [
        { row: 5, col: 3 },
        { row: 10, col: 3 }, // Invalid destination
      ];

      const result = classifyMove(gameState, moveParts);
      expect(result).toBeNull();
    });

    it('should return null for empty move parts', () => {
      const result = classifyMove(gameState, []);
      expect(result).toBeNull();
    });

    it('should return null for single coordinate', () => {
      const result = classifyMove(gameState, [{ row: 5, col: 3 }]);
      expect(result).toBeNull();
    });

    it('should return null when starting position has no piece', () => {
      const moveParts: Coordinates[] = [
        { row: 8, col: 3 }, // Empty space
        { row: 7, col: 3 },
      ];

      const result = classifyMove(gameState, moveParts);
      expect(result).toBeNull();
    });

    it('should return null for move that exceeds allowed distance', () => {
      const moveParts: Coordinates[] = [
        { row: 5, col: 3 },
        { row: 8, col: 6 }, // Too far
      ];

      const result = classifyMove(gameState, moveParts);
      expect(result).toBeNull();
    });
  });
});
