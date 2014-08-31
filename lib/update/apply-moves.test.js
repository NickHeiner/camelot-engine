'use strict';

var expect = require('chai').expect,
    createEmptyGame = require('../init/create-empty-game'),
    updateBoardSpace = require('./update-board-space'),
    getBoardSpace = require('../query/get-board-space'),
    constants = require('../get-constants')(),
    applyMoves = require('./apply-moves');

describe('apply-moves', function() {

    it('adds a piece to the destination', function() {
        var game = createEmptyGame(),
            dest = {
                row: 11,
                col: 4
            },
            withMove = applyMoves(game, [{
                row: 10,
                col: 4
            }, dest]);

        expect(getBoardSpace(withMove, dest).piece).to.have.property('type', constants.PAWN);
    });

    it('removes a piece from the source', function() {
        var game = createEmptyGame(),
            src = {
                row: 10,
                col: 4
            },
            withMove = applyMoves(game, [src, {
                row: 11,
                col: 4
            }]);

        expect(getBoardSpace(withMove, src).piece).to.equal(null);
    });

    it('removes a jumped piece', function() {
        var game = createEmptyGame(),
            withPieceToJump = updateBoardSpace(game, 11, 4, {piece: {type: constants.PAWN, player: 'playerA'}}),
            src = {
                row: 10,
                col: 4
            },
            withMove = applyMoves(withPieceToJump, [src, {
                row: 12,
                col: 4
            }]);

        expect(getBoardSpace(withMove, 11, 4)).to.have.property('piece', null);
    });

    it('applies a chain with three moves', function() {
        var game = createEmptyGame(),
            withPieceToJump = updateBoardSpace(game, 4, 5, {piece: {type: constants.PAWN, player: 'playerB'}}),
            withSecondPieceToJump = updateBoardSpace(withPieceToJump, 3, 6, {piece: {type: constants.PAWN, player: 'playerB'}}),
            moves = [
                {
                    row: 5, 
                    col: 5
                },
                {
                    row: 3,
                    col: 5
                },
                {
                    row: 3,
                    col: 7
                }
            ],
            afterApplyingMove = applyMoves(withSecondPieceToJump, moves);

        expect(getBoardSpace(afterApplyingMove, 3, 7))
            .to.have.property('piece')
            .that.deep.equals({
                type: 'pawn',
                player: 'playerA'
            });
    });

    it('updates the turn count', function() {
        var game = createEmptyGame(),
            dest = {
                row: 11,
                col: 4
            },
            withMove = applyMoves(game, [{
                row: 10,
                col: 4
            }, dest]);

        expect(withMove).to.have.property('turnCount', 1);
    });

    it('updates the captured pieces record when a pawn is captured', function() {
        var game = createEmptyGame(),
            withPieceToJump = updateBoardSpace(game, 11, 4, {piece: {type: 'pawn', player: 'playerA'}}),
            src = {
                row: 10,
                col: 4
            },
            withMove = applyMoves(withPieceToJump, [src, {
                row: 12,
                col: 4
            }]);

        expect(withMove.capturedPieces.playerA.pawn).to.equal(1);
    });

    it('updates the captured pieces record when a knight is captured', function() {
        var game = createEmptyGame(),
            withPieceToJump = updateBoardSpace(game, 11, 4, {piece: {type: 'knight', player: 'playerA'}}),
            src = {
                row: 10,
                col: 4
            },
            withMove = applyMoves(withPieceToJump, [src, {
                row: 12,
                col: 4
            }]);

        expect(withMove.capturedPieces.playerA.knight).to.equal(1);
    });

});
