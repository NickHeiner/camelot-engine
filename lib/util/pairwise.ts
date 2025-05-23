import _ from 'lodash';

export default function pairwise<T>(elems: T[]): Array<[T, T]> {
  if (elems.length === 1) {
    throw new Error(
      'pairwise: Cannot create pairs from a list that only has one member'
    );
  }

  function pairwiseRec(soFar: Array<[T, T]>, elems: T[]): Array<[T, T]> {
    if (elems.length <= 1) {
      return soFar;
    }

    const first = _.first(elems) as T;
    const second = elems[1] as T;

    return pairwiseRec(soFar.concat([[first, second]]), _.tail(elems));
  }

  return pairwiseRec([], elems);
}
