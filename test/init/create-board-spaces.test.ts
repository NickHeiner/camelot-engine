import _ from 'lodash';
import createBoardSpaces from '../../lib/init/create-board-spaces.js';

describe('get-board-spaces', function () {
  it('should create 172 board spaces', function () {
    // TODO Is this the right number?
    expect(createBoardSpaces()).toHaveLength(172);
  });

  it('should have 17 rows', function () {
    const generatedRows = _(createBoardSpaces())
      .map('row')
      .uniq()
      .sortBy(_.identity)
      .valueOf();

    expect(generatedRows).toEqual(_.range(17));
  });
});
