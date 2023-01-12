
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

export function getCoordsBetween(space1: Space, space2: Space): Space | null {
  if (space1.row === space2.row && space1.col === space2.col) {
    return null;
  }

  if (space1.row === space2.row) {
    return {
      row: space1.row,
      col: space1.col < space2.col ? space1.col + 1 : space1.col - 1
    };
  }

  if (space1.col === space2.col) {
    return {
      row: space1.row < space2.row ? space1.row + 1 : space1.row - 1,
      col: space1.col
    };
  }

  return {
    row: space1.row < space2.row ? space1.row + 1 : space1.row - 1,
    col: space1.col < space2.col ? space1.col + 1 : space1.col - 1
  };
}