import _ from 'lodash';

export default function pairwise(elems) {
  if (elems.length === 1) {
    throw new Error(
      'pairwise: Cannot create pairs from a list that only has one member'
    );
  }

  function pairwiseRec(soFar, elems) {
    if (elems.length <= 1) {
      return soFar;
    }

    const first = _.first(elems),
      second = _(elems).tail().first().valueOf();

    return pairwiseRec(soFar.concat([[first, second]]), _.tail(elems));
  }

  return pairwiseRec([], elems);
}
