import _ from 'lodash';

export default function pairwise<T>(elems: T[]): Array<[T, T]> {
  if (elems.length === 1) {
    throw new Error(
      'pairwise: Cannot create pairs from a list that only has one member'
    );
  }

  function pairwiseRec(soFar: Array<[T, T]>, remaining: T[]): Array<[T, T]> {
    if (remaining.length <= 1) {
      return soFar;
    }

    const first = remaining[0];
    const second = remaining[1];

    return pairwiseRec(soFar.concat([[first, second]]), _.tail(remaining));
  }

  return pairwiseRec([], elems);
}
