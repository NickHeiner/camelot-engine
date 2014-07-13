'use strict';

var expect = require('chai').expect,
    createEmptyGame = require('../init/create-empty-game'),
    _ = require('lodash'),
    updateBoardSpace = require('../update/update-board-space'),
    constants = require('../get-constants')(),
    getAllBoardSpaces = require('./get-all-board-spaces'),
    getGameWinner = require('./get-game-winner');

describe('get-game-winner', function() {

    it('should not say that anyone has won initially', function() {
        expect(getGameWinner(createEmptyGame())).to.equal(null);
    });

    function withoutColorPieces(gameState, color) {
        return _.reduce(getAllBoardSpaces(gameState), function(gameStateAcc, boardSpace) {
            if (boardSpace.color === color) {
                return updateBoardSpace(gameStateAcc, boardSpace.row, boardSpace.col, {piece: null, color: null});
            }
            return gameStateAcc;
        }, gameState);
    }

    it('identifies black as the winner when white has fewer than two pieces', function() {
        var withoutWhitePieces = withoutColorPieces(createEmptyGame(), constants.WHITE);

        expect(getGameWinner(withoutWhitePieces)).to.equal(constants.BLACK);
    });

    it('identifies white as the winner when black has fewer than two pieces', function() {
        var withoutWhitePieces = withoutColorPieces(createEmptyGame(), constants.BLACK);

        expect(getGameWinner(withoutWhitePieces)).to.equal(constants.WHITE);
    });

    it('identifies black as the winner when it has entered the white goal');
    it('identifies white as the winner when it has entered the black goal');

});
