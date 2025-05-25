import { BOARD_WIDTH } from '../../constants.js';
import getRangeForRow from '../../init/get-range-for-row.js';

describe('get-range-for-row', function () {
  it('should create a full row', function () {
    expect(getRangeForRow(0, 0)).toHaveLength(BOARD_WIDTH);
  });

  it('should create a row with squares only in the middle', function () {
    expect(getRangeForRow(0, 5)).toHaveLength(2);
  });

  it('should init the piece to null', function () {
    expect(getRangeForRow(0, 5)[0]).toHaveProperty('piece', null);
  });
});
