import { applyMoves } from '../../update/update.js';

describe('update', function () {
  it('exports applyMoves', function () {
    expect(typeof applyMoves).toBe('function');
  });
});
