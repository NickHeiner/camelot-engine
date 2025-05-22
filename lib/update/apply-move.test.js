'use strict';

var createEmptyGame = require('../init/create-empty-game'),
    updateBoardSpace = require('./update-board-space'),
    getBoardSpace = require('../query/get-board-space'),
    constants = require('../get-constants')(),
    applyMove = require('./apply-move');

describe('apply-move', function() {

    it('adds a piece to the destination', function() {
        var game = createEmptyGame(),
            dest = {
                row: 11,
                col: 4
            },
            withMove = applyMove(game, {
                row: 10,
                col: 4
            }, dest);

        expect(getBoardSpace(withMove, dest).piece).toHaveProperty('type', constants.PAWN);
    });

    it('removes a piece from the source', function() {
        var game = createEmptyGame(),
            src = {
                row: 10,
                col: 4
            },
            withMove = applyMove(game, src, {
                row: 11,
                col: 4
            });

        expect(getBoardSpace(withMove, src).piece).toBe(null);
    });

    it('removes a jumped piece', function() {
        var game = createEmptyGame(),
            withPieceToJump = updateBoardSpace(game, 11, 4, {piece: {type: constants.PAWN, player: 'playerA'}}),
            src = {
                row: 10,
                col: 4
            };

        var withMove = applyMove(withPieceToJump, src, {
                row: 12,
                col: 4
            });

        expect(getBoardSpace(withMove, 11, 4).piece).toBe(null);
    });

    it('should not remove a jumped piece if it is friendly', function() {
        var game = createEmptyGame(),
            withPieceToJump = updateBoardSpace(game, 11, 4, {piece: {type: constants.PAWN, player: 'playerB'}}),
            src = {
                row: 10,
                col: 4
            },
            withMove = applyMove(withPieceToJump, src, {
                row: 12,
                col: 4
            });

        expect(getBoardSpace(withMove, 11, 4).piece).toEqual(getBoardSpace(withPieceToJump, 11, 4).piece);
    });

    describe('errors', function() {

        it('throws an error when there is no piece to jump', function() {
            var game = createEmptyGame(),
                src = {
                    row: 10,
                    col: 4
                };

            expect(function() {
                applyMove(game, src, {
                    row: 12,
                    col: 4
                });
            }).toThrow(/if the move is a jump there must be a piece in the space between/);
        });

        it('throws an error when there is no piece at start', function() {
            var game = createEmptyGame(),
                src = {
                    row: 12,
                    col: 4
                };

            expect(function() {
                applyMove(game, src, {
                    row: 12,
                    col: 5
                });
            }).toThrow(/there must be a piece to move at moveStart/);    
        });

    });

});
