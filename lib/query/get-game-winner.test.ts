
import { expect } from 'chai';
import createEmptyGame from '../init/create-empty-game';
import _ from 'lodash';
import updateBoardSpace from '../update/update-board-space';
import constants from '../get-constants';
import getAllBoardSpaces from './get-all-board-spaces';
import getGameWinner from './get-game-winner';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

describe('get-game-winner', () => {

    it('should not say that anyone has won initially', () => {
        expect(getGameWinner(createEmptyGame())).to.equal(null);
    });

    function withoutColorPieces(gameState: GameState, player: Player): GameState {
        return _.reduce(getAllBoardSpaces(gameState), (gameStateAcc: GameState, boardSpace: Space): GameState => {
            if (boardSpace.piece && boardSpace.piece.player === player) {
                return updateBoardSpace(gameStateAcc, boardSpace.row, boardSpace.col, {piece: null});
            }
            return gameStateAcc;
        }, gameState);
    }

    function addPiece(gameState: GameState, row: Row, col: Col, piece: MovePart, player: Player): GameState {
        return updateBoardSpace(gameState, row, col, {piece: piece, player: player});
    }

    it('identifies playerB as the winner when playerA has fewer than two pieces', () => {
        const withoutWhitePieces = withoutColorPieces(createEmptyGame(), constants.PLAYER_A);

        expect(getGameWinner(withoutWhitePieces)).to.equal(constants.PLAYER_B);
    });

    it('identifies playerA as the winner when playerB has fewer than two pieces', () => {
        const withoutWhitePieces = withoutColorPieces(createEmptyGame(), constants.PLAYER_B);

        expect(getGameWinner(withoutWhitePieces)).to.equal(constants.PLAYER_A);
    });

    it('does not identify playerB as a winner when playerA has one piece in the goal', () => {
        const game = createEmptyGame();
        const gameWithOneInGoal = addPiece(game, 0, 5, constants.PAWN, constants.PLAYER_B);

        expect(getGameWinner(gameWithOneInGoal)).to.equal(null);
    });

    it('does not identify playerA as a winner when playerB has one piece in the goal', () => {
        const game = createEmptyGame();
        const gameWithOneInGoal = addPiece(game, 15, 5, constants.KNIGHT, constants.PLAYER_A);

        expect(getGameWinner(gameWithOneInGoal)).to.equal(null);
    });

    it('identifies playerB as the winner when it has entered the playerA goal', () => {
        const game = createEmptyGame();
        const gameWithOneInGoal = addPiece(game, 0, 5, constants.PAWN, constants.PLAYER_B);
        const gameWithTwoInGoal = addPiece(gameWithOneInGoal, 0, 6, constants.PAWN, constants.PLAYER_B);

        expect(getGameWinner(gameWithTwoInGoal)).to.equal(constants.PLAYER_B);
    });

    it('identifies playerA as the winner when it has entered the playerB goal', () => {
        const game = createEmptyGame();
        const gameWithOneInGoal = addPiece(game, 16, 5, constants.PAWN, constants.PLAYER_A);
        const gameWithTwoInGoal = addPiece(gameWithOneInGoal, 16, 6, constants.PAWN, constants.PLAYER_A);

        expect(getGameWinner(gameWithTwoInGoal)).to.equal(constants.PLAYER_A);
    });

});