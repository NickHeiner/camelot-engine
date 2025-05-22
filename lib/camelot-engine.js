'use strict';

function camelotEngine() {
  return {
    createEmptyGame: require('./init/create-empty-game'),
    query: require('./query/query'),
    update: require('./update/update'),
    constants: require('./get-constants')
  };
}

module.exports = camelotEngine;
