'use strict';

const _ = require('lodash'),
    immutable = require('immutable'),
    getBoardSpace = require('../query/get-board-space');

function updateBoardSpace(gameState, row, col, newBoardSpace) {
    gameState = immutable.fromJS(gameState);
    
    const indexToUpdate = gameState
        .get('boardSpaces')
        .findIndex(space => space.get('row') === row && space.get('col') === col);
    
    return gameState.update(
            'boardSpaces', 
            boardSpaces => 
                boardSpaces.update(indexToUpdate, space => space.merge(newBoardSpace))
        ).toJS();
}

module.exports = updateBoardSpace; 
