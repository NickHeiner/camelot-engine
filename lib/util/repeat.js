'use strict';

const _ = require('lodash');

function repeat(val, count) {
  return _.map(_.range(count), _.constant(val));
}

module.exports = repeat;
