import _ from 'lodash';
import getRangeForRow from './get-range-for-row.js';

/* eslint-disable no-magic-numbers */

const getBoardSpaces = () => {
  // TODO verify that this is actually correct

  const middleRows = _.range(3, 14).map((row) => getRangeForRow(row, 0));

  return [
    ...getRangeForRow(0, 5),
    ...getRangeForRow(1, 2),
    ...getRangeForRow(2, 1),
    ...middleRows.flat(),
    ...getRangeForRow(14, 1),
    ...getRangeForRow(15, 2),
    ...getRangeForRow(16, 5),
  ];
};

export default getBoardSpaces;
