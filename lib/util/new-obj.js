
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

export function newObj(key: string, val: any): { [key: string]: any } {
    const obj: { [key: string]: any } = {};
    obj[key] = val;
    return obj;
}