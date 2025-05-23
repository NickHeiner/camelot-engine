import _ from 'lodash';

export default function repeat<T>(val: T, count: number): T[] {
  return _.map(_.range(count), _.constant(val));
}
