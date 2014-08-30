'use strict';

var applyMove = require('../update/apply-move'),
    getBoardSpace = require('./get-board-space'),
    constants = require('../get-constants')(),
    getSpaceBetween = require('./get-space-between'),
    _ = require('lodash');

function isValidMove(gameState, moveParts) {

    function isValidMoveRec(gameState, moveParts, jumpedPlayer, nonJumpHasOccurred) {

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

        if (nonJumpHasOccurred) {
            return false;
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

        if (srcBoardSpace.piece.player === constants.PLAYER_A && destBoardSpace.row === constants.PLAYER_A_GOAL_ROW) {
            return false;
        }
        if (srcBoardSpace.piece.player === constants.PLAYER_B && destBoardSpace.row === constants.PLAYER_B_GOAL_ROW) {
            return false;
        }

        moveDelta = {
            row: moveParts[1].row - moveParts[0].row,
            col: moveParts[1].col - moveParts[0].col
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
            if (jumpedPlayer !== null &&
                boardSpaceBetween.piece.player !== jumpedPlayer &&
                srcBoardSpace.piece.type !== constants.KNIGHT) {
                return false;
            }
            jumpedPlayer = boardSpaceBetween.piece.player;
        } else {
            if (jumpedPlayer !== null) {
                return false;
            }
            nonJumpHasOccurred = true;
        }

        gameAfterFirstMove = applyMove(gameState, moveParts[0], moveParts[1]);
        return isValidMoveRec(gameAfterFirstMove, _.rest(moveParts), jumpedPlayer, nonJumpHasOccurred);

    }

    return isValidMoveRec(gameState, moveParts, null, false);

}

module.exports = isValidMove;
