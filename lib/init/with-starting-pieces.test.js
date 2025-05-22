'use strict';

var _ = require('lodash'),
    camelotEngine = require('../..')(),
    constants = camelotEngine.constants(),
    query = camelotEngine.query(),
    createEmptyGame = camelotEngine.createEmptyGame;

describe('with-starting-pieces', function() {

    it('creates a board with the right number of knights', function() {
        var gameState = createEmptyGame();
        expect(_.filter(gameState.boardSpaces, function(boardSpace) {
            return boardSpace.piece && boardSpace.piece.type === constants.KNIGHT;
        }).length).toBe(8);
    });

    it('creates a board with the right number of pawns', function() {
        var gameState = createEmptyGame();
        expect(_.filter(gameState.boardSpaces, function(boardSpace) {
            return boardSpace.piece && boardSpace.piece.type === constants.PAWN;
        }).length).toBe(20);
    });

    it('should not have a piece at (5, 1)', function() {
        var gameState = createEmptyGame();
        expect(query.getBoardSpace(gameState, 5, 1).piece).toBeNull();
    });

    it('should not have a piece at (5, 2)', function() {
        var gameState = createEmptyGame();
        expect(query.getBoardSpace(gameState, 5, 2).piece).toEqual({
            type: 'knight',
            player: 'playerA'
        });
    });

    it('should have a piece at (5, 3)', function() {
        var gameState = createEmptyGame();
        expect(query.getBoardSpace(gameState, 5, 3).piece).toEqual({
            type: 'pawn',
            player: 'playerA'
        });
    });

});
