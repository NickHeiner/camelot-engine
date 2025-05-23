import _ from 'lodash';

export default function repeat<T>(val: T, count: number): T[] {
  if (count < 0) {
    throw new Error('repeat: count must not be negative');
  }

  return _.map(_.range(count), _.constant(val));
}
