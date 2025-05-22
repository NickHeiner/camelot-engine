'use strict';

var camelotEngine = require('..');

describe('camelot-engine', function() {

    describe('createEmptyGame', function() {

        it('should have turnCount = 0', function() {
            expect(camelotEngine().createEmptyGame()).toHaveProperty('turnCount', 0);
        });

        it('should have no captured pieces', function() {
            expect(camelotEngine().createEmptyGame().capturedPieces).toEqual({
                playerA: {pawn: 0, knight: 0},
                playerB: {pawn: 0, knight: 0}
            });
        });

        it('should create board spaces', function() {
            expect(camelotEngine().createEmptyGame().boardSpaces).toHaveLength(172);
        });

    });

    describe('query', function() {

        it('exports isGoal', function() {
            expect(typeof camelotEngine().query().isGoal).toBe('function');
        });
        
        it('exports isValidMove', function() {
            expect(typeof camelotEngine().query().isValidMove).toBe('function');
        });

        it('exports getGameWinner', function() {
            expect(typeof camelotEngine().query().getGameWinner).toBe('function');
        });

        it('exports getBoardSpace', function() {
            expect(typeof camelotEngine().query().getBoardSpace).toBe('function');
        });

        it('exports getAllBoardSpaces', function() {
            expect(typeof camelotEngine().query().getAllBoardSpaces).toBe('function');
        });

        it('exports getCoordsBetween', function() {
            expect(typeof camelotEngine().query().getCoordsBetween).toBe('function');
        });

    });

    describe('update', function() {
        it('exports applyMoves', function() {
            expect(typeof camelotEngine().update().applyMoves).toBe('function');
        });
    });

    describe('constants', function() {
        it('exports KNIGHT', function() {
            expect(typeof camelotEngine().constants().KNIGHT).toBe('string');
        });

        it('exports PAWN', function() {
            expect(typeof camelotEngine().constants().PAWN).toBe('string');
        });
    });

});
