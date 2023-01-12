
import _ from 'lodash';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

export function pairwise(elems: any[]): any[][] {
  if (elems.length === 1) {
    throw new Error('pairwise: Cannot create pairs from a list that only has one member');
  }

  function pairwiseRec(soFar: any[][], elems: any[]): any[][] {
    if (elems.length <= 1) {
      return soFar;
    }

    const first = _.first(elems);
    const second = _(elems).tail().first().valueOf();

    return pairwiseRec(soFar.concat([[first, second]]), _.tail(elems));
  }

  return pairwiseRec([], elems);
}