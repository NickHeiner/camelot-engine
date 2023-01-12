
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';
import _ from 'lodash';
import getAllBoardSpaces from './get-all-board-spaces';
import util from 'util';
import constants from '../get-constants';

function getGameWinner(gameState: GameState): Player | null {
    function hasEnoughPieces(player: Player): boolean {
        return _.filter(getAllBoardSpaces(gameState), (boardPiece: Space) => {
            return boardPiece.piece && boardPiece.piece.player === player;
        }).length > constants.COUNT_PIECES_NEEDED_TO_WIN;
    }

    function isRowFilled(row: Row): boolean {
        if (!_.isNumber(row)) {
            throw new Error(`isRowFilled: row must be a number, but was: \`${util.inspect(row)}\``);
        }

        const piecesInRow = _.filter(getAllBoardSpaces(gameState), {row});
        return piecesInRow.length === _.filter(piecesInRow, 'piece').length;
    }

    if (!hasEnoughPieces(constants.PLAYER_A) || isRowFilled(constants.PLAYER_A_GOAL_ROW)) {
        return constants.PLAYER_B;
    } else if (!hasEnoughPieces(constants.PLAYER_B) || isRowFilled(constants.PLAYER_B_GOAL_ROW)) {
        return constants.PLAYER_A;
    }

    return null;
}

export default getGameWinner;