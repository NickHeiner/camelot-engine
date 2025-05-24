import { applyMoves } from '../update/update.ts';

describe('update', function () {
  it('exports applyMoves', function () {
    expect(typeof applyMoves).toBe('function');
  });
});
