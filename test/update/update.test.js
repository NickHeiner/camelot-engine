'use strict';

const update = require('../../lib/update/update');

describe('update', function () {
  it('exports applyMoves', function () {
    expect(typeof update().applyMoves).toBe('function');
  });
});
