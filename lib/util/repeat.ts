
import _ from 'lodash';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

export function repeat(val: any, count: number): any[] {
    return _.map(_.range(count), _.constant(val));
}