'use strict';

var expect = require('chai').expect,
    isValidMove = require('./is-valid-move'),
    constants = require('../get-constants')(),
    updateBoardSpace = require('../update/update-board-space'),
    createEmptyGame = require('../init/create-empty-game');

describe('is-valid-move', function() {

    it('empty moves are valid', function() {
        expect(isValidMove(createEmptyGame(), [])).to.equal(true);
    });

    it('does not allow moves that do not start on a valid space', function() {
        expect(isValidMove(createEmptyGame(), [{
            row: 9933,
            col: 232
        }, {
            row: 234,
            col: 49
        }])).to.equal(false);
    });

    it('does not allow moves that do not start on a space containing a piece', function() {
        expect(isValidMove(createEmptyGame(), [{
            row: 6,
            col: 1
        },
        {
            row: 6,
            col: 2
        }])).to.equal(false);
    });

    it('allows a piece to move into an empty space', function() {
        var game = createEmptyGame();
        expect(isValidMove(game, [
            {
                row: 6,
                col: 4
            },
            {
                row: 7,
                col: 4
            }
        ])).to.equal(true);
    });

    it('allows a piece to jump over its own pieces', function() {
        var game = createEmptyGame();
        expect(isValidMove(game, [
            {
                row: 5,
                col: 6
            },
            {
                row: 7,
                col: 6
            }
        ])).to.equal(true);
    });

    it('does not allow a piece to jump over an empty space', function() {
        var game = createEmptyGame();
        expect(isValidMove(game, [
            {
                row: 5,
                col: 2
            },
            {
                row: 3,
                col: 2
            }
        ])).to.equal(false);
    });

    it('does not allow movement outside of the board', function() {
        var game = createEmptyGame(),
            outOfBoundsCol = 12;

        expect(isValidMove(game, [
            {
                row: 10,
                col: 11
            },
            {
                row: 10,
                col: outOfBoundsCol
            }
        ])).to.equal(false);
    });

    it('does not allow movement into another piece', function() {
        var game = createEmptyGame();
        expect(isValidMove(game, [
            {
                row: 5,
                col: 3
            },
            {
                row: 5,
                col: 4
            }
        ])).to.equal(false);
    });

    it('does not allow a jump of greater than one space', function() {
        var game = createEmptyGame();
        expect(isValidMove(game, [
            {
                row: 5,
                col: 3
            },
            {
                row: 12,
                col: 3
            }
        ])).to.equal(false);
    });

    it('does not allow a jump of greater than one space in the same row', function() {
        var game = createEmptyGame();
        expect(isValidMove(game, [
            {
                row: 5,
                col: 8
            },
            {
                row: 5,
                col: 0
            }
        ])).to.equal(false);
    });

    it('does not allow pawns to jump over both friendly and enemy pieces in the same jump', function() {
        var game = createEmptyGame(),
            withPawnInJumpRange = updateBoardSpace(game, 8, 5, {piece: {type: constants.PAWN, player: 'playerA'}});

        expect(isValidMove(withPawnInJumpRange, [
            {
                row: 10,
                col: 4
            },
            {
                row: 8,
                col: 4
            },
            {
                row: 8,
                col: 6
            }
        ])).to.equal(false);
    });

    it('does allow knights to jump over both friendly and enemy pieces in the same jump', function() {
        var game = createEmptyGame(),
            withPawnInJumpRange = updateBoardSpace(game, 4, 9, {piece: {type: constants.PAWN, player: 'playerB'}});

        expect(isValidMove(withPawnInJumpRange, [
            {
                row: 6,
                col: 8
            },
            {
                row: 4,
                col: 8
            },
            {
                row: 4,
                col: 10
            }
        ])).to.equal(true);
    });

    it('does not allow a jump followed by a non-jump', function() {
        var game = createEmptyGame();
        expect(isValidMove(game, [
            {
                row: 5,
                col: 6
            },
            {
                row: 7,
                col: 6
            },
            {
                row: 7,
                col: 7
            }
        ])).to.equal(false);
    });

    it('does not allow a non-jump followed by a jump', function() {
        var game = createEmptyGame();
        expect(isValidMove(game, [
            {
                row: 5,
                col: 6
            },
            {
                row: 7,
                col: 6
            },
            {
                row: 7,
                col: 7
            }
        ])).to.equal(false);
    });

    it('does not allow more than one non-jump', function() {
        var game = createEmptyGame();
        expect(isValidMove(game, [
            {
                row: 5,
                col: 6
            },
            {
                row: 4,
                col: 6
            },
            {
                row: 3,
                col: 6
            }
        ])).to.equal(false);
    });

    it('does not allow playerA to move into its own goal', function() {
        var game = createEmptyGame(),
            withPawnNearGoal = updateBoardSpace(game, 1, 5, {piece: {type: constants.PAWN, player: 'playerA'}});

        expect(isValidMove(withPawnNearGoal, [
            {
                row: 1,
                col: 5
            },
            {
                row: 0,
                col: 5
            }
        ])).to.equal(false);
    });

    it("does allow playerB to move into playerA's goal", function() {
        var game = createEmptyGame(),
            withPawnNearGoal = updateBoardSpace(game, 1, 5, {piece: {type: constants.PAWN, player: 'playerB'}});

        expect(isValidMove(withPawnNearGoal, [
            {
                row: 1,
                col: 5
            },
            {
                row: 0,
                col: 5
            }
        ])).to.equal(true);
    });

    it("does allow playerA to move into playerB's goal", function() {
        var game = createEmptyGame(),
            withPawnNearGoal = updateBoardSpace(game, 15, 5, {piece: {type: constants.PAWN, player: 'playerA'}});

        expect(isValidMove(withPawnNearGoal, [
            {
                row: 15,
                col: 5
            },
            {
                row: 16,
                col: 5
            }
        ])).to.equal(true);
    });

    it('does not allow playerB to move into its own goal', function() {
        var game = createEmptyGame(),
            withPawnNearGoal = updateBoardSpace(game, 15, 5, {piece: {type: constants.PAWN, player: 'playerB'}});

        expect(isValidMove(withPawnNearGoal, [
            {
                row: 15,
                col: 5
            },
            {
                row: 16,
                col: 5
            }
        ])).to.equal(false);
    });

});
