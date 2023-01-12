
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';
import getBoardSpace from '../query/get-board-space';
import util from 'util';
import getCoordsBetween from '../query/get-coords-between';
import updateBoardSpace from './update-board-space';
import newObj from '../util/new-obj';
import _ from 'lodash';

export default function applyMove(gameState: GameState, moveStart: MovePart, moveEnd: MovePart): GameState {
    const movingPiece: Space = getBoardSpace(gameState, moveStart).piece;
    const withMovingPieceNotAtSrc: GameState = updateBoardSpace(gameState, moveStart.row, moveStart.col, {piece: null});
    const withMovingPieceAtDest: GameState = updateBoardSpace(withMovingPieceNotAtSrc, moveEnd.row, moveEnd.col, {piece: movingPiece});
    const coordsBetween: MovePart = getCoordsBetween(moveStart, moveEnd);
    let nextGameState: GameState;
    let spaceBetween: Space;

    if (movingPiece === null) {
        throw new Error(`applyMove: there must be a piece to move at moveStart. moveStart is: \`${util.inspect(moveStart)}\``);
    }

    if (coordsBetween === null) {
        return withMovingPieceAtDest;
    }

    spaceBetween = getBoardSpace(gameState, coordsBetween.row, coordsBetween.col);

    if (!spaceBetween.piece) {
        throw new Error(`applyMove: if the move is a jump there must be a piece in the space between the start and end. That space between is: \`${util.inspect(spaceBetween)}\``);    
    }

    if (spaceBetween.piece.player !== movingPiece.player) {
        nextGameState = _.merge({}, withMovingPieceAtDest, {
            capturedPieces: newObj(
                spaceBetween.piece.player, newObj(
                    spaceBetween.piece.type, 
                    withMovingPieceAtDest.capturedPieces[spaceBetween.piece.player][spaceBetween.piece.type] + 1
                )
            )
        });
        return updateBoardSpace(nextGameState, spaceBetween.row, spaceBetween.col, {piece: null});
    }

    return withMovingPieceAtDest;

}