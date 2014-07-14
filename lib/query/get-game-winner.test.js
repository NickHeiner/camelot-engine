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

    function addPiece(gameState, row, col, piece, color) {
        return updateBoardSpace(gameState, row, col, {piece: piece, color: color});
    }

    it('identifies black as the winner when white has fewer than two pieces', function() {
        var withoutWhitePieces = withoutColorPieces(createEmptyGame(), constants.WHITE);

        expect(getGameWinner(withoutWhitePieces)).to.equal(constants.BLACK);
    });

    it('identifies white as the winner when black has fewer than two pieces', function() {
        var withoutWhitePieces = withoutColorPieces(createEmptyGame(), constants.BLACK);

        expect(getGameWinner(withoutWhitePieces)).to.equal(constants.WHITE);
    });

    it('does not identify black as a winner when white has one piece in the goal', function() {
        var game = createEmptyGame(),
            gameWithOneInGoal = addPiece(game, 0, 5, constants.PAWN, constants.BLACK);

        expect(getGameWinner(gameWithOneInGoal)).to.equal(null);
    });

    it('does not identify white as a winner when black has one piece in the goal', function() {
        var game = createEmptyGame(),
            gameWithOneInGoal = addPiece(game, 15, 5, constants.KNIGHT, constants.WHITE);

        expect(getGameWinner(gameWithOneInGoal)).to.equal(null);
    });

    it('identifies black as the winner when it has entered the white goal', function() {
        var game = createEmptyGame(),
            gameWithOneInGoal = addPiece(game, 0, 5, constants.PAWN, constants.BLACK),
            gameWithTwoInGoal = addPiece(gameWithOneInGoal, 0, 6, constants.PAWN, constants.BLACK);

        expect(getGameWinner(gameWithTwoInGoal)).to.equal(constants.BLACK);
    });

    it('identifies white as the winner when it has entered the black goal', function() {
        var game = createEmptyGame(),
            gameWithOneInGoal = addPiece(game, 16, 5, constants.PAWN, constants.WHITE),
            gameWithTwoInGoal = addPiece(gameWithOneInGoal, 16, 6, constants.PAWN, constants.WHITE);

        expect(getGameWinner(gameWithTwoInGoal)).to.equal(constants.WHITE);
    });

});
