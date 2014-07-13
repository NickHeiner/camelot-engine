'use strict';

var applyMove = require('../update/apply-move'),
    getBoardSpace = require('./get-board-space'),
    getSpaceBetween = require('./get-space-between'),
    _ = require('lodash');

function isValidMove(gameState, moveParts) {

    function isValidMoveRec(gameState, moveParts, jumpedColor) {

        var srcBoardSpace,
            destBoardSpace,
            moveDelta,
            spaceBetween,
            boardSpaceBetween,
            gameAfterFirstMove;

        if (!gameState) {
            throw new Error('gameState must be a game state object, but was: `' + gameState + '`');
        }

        if (moveParts.length <= 1) {
            return true;
        }

        srcBoardSpace = getBoardSpace(gameState, moveParts[0]);
        destBoardSpace = getBoardSpace(gameState, moveParts[1]);

        if (srcBoardSpace === null ||
            destBoardSpace === null ||
            !srcBoardSpace.piece ||
            destBoardSpace.piece
        ) {
            return false;
        }

        moveDelta = {
            row: moveParts[1].row - moveParts[0].row,
            col: moveParts[1].col - moveParts[0].cow
        };

        if (Math.abs(moveDelta.row) > 2 || Math.abs(moveDelta.col) > 2) {
            return false;
        }

        spaceBetween = getSpaceBetween(moveParts[0], moveParts[1]);

        if (spaceBetween !== null) {
            boardSpaceBetween = getBoardSpace(gameState, spaceBetween);
            if (!getBoardSpace(gameState, spaceBetween).piece) {
                return false;
            }
            if (jumpedColor !== null && boardSpaceBetween.color !== jumpedColor) {
                return false;
            }
            jumpedColor = boardSpaceBetween.color;
        }

        gameAfterFirstMove = applyMove(gameState, moveParts[0], moveParts[1]);
        return isValidMoveRec(gameAfterFirstMove, _.rest(moveParts), jumpedColor);

    }

    return isValidMoveRec(gameState, moveParts, null);

}

module.exports = isValidMove;
