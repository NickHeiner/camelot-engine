'use strict';

var expect = require('chai').expect,
    createEmptyGame = require('../init/create-empty-game'),
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

        expect(getBoardSpace(withMove, dest).piece).to.equal(constants.PAWN);
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

        expect(getBoardSpace(withMove, src).piece).to.equal(null);
    });

    it('removes a jumped piece', function() {
        var game = createEmptyGame(),
            withPieceToJump = updateBoardSpace(game, 11, 4, {piece: constants.PAWN}),
            src = {
                row: 10,
                col: 4
            },
            withMove = applyMove(withPieceToJump, src, {
                row: 12,
                col: 4
            });

        expect(getBoardSpace(withMove, 11, 4).piece).to.equal(null);
    });

});
