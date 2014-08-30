'use strict';

function camelotEngine() {
    return {
        createEmptyGame: require('./init/create-empty-game'),
        query: require('./query/query')
    };
}

module.exports = camelotEngine;
