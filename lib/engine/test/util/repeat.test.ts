import repeat from '../../lib/util/repeat.js';

describe('repeat', function () {
  it('returns an empty array for count 0', function () {
    expect(repeat('x', 0)).toEqual([]);
  });

  it('repeats the value the specified number of times', function () {
    expect(repeat('a', 3)).toEqual(['a', 'a', 'a']);
  });

  it('throws an error for negative counts', function () {
    expect(function () {
      repeat('z', -1);
    }).toThrow(/count must not be negative/);
  });
});
