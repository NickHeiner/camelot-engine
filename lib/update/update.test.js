'use strict';

const update = require('./update');

describe('update', function() {

  it('exports applyMoves', function() {
    expect(typeof update().applyMoves).toBe('function');
  });

});
