import _ from 'lodash';

export default function repeat(val, count) {
  return _.map(_.range(count), _.constant(val));
}
