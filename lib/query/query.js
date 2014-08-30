'use strict';

function query() {
    return {
        isValidMove: require('./is-valid-move'),
        getGameWinner: require('./get-game-winner'),
        getBoardSpace: require('./get-board-space'),
        getAllBoardSpaces: require('./get-all-board-spaces'),
        getSpaceBetween: require('./get-space-between'),
    };
}

module.exports = query;
