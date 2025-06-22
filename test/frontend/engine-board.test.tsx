/** @jest-environment jsdom */
import { render, fireEvent, screen } from '@testing-library/react';
import { EngineBoard } from '@/components/game/engine-board';
import createBoardSpaces from '@/lib/engine/init/create-board-spaces';
import type { GameState } from '@/lib/engine/types';
import updateBoardSpace from '@/lib/engine/update/update-board-space';
import { KNIGHT, PAWN } from '@/lib/engine/constants';

function makeEmptyGame(): GameState {
  const boardSpaces = createBoardSpaces().map((s) => ({
    ...s,
    piece: undefined,
  }));
  return {
    turnCount: 0,
    capturedPieces: {
      playerA: { pawn: 0, knight: 0 },
      playerB: { pawn: 0, knight: 0 },
    },
    boardSpaces,
  };
}

function renderWithState(state: GameState) {
  render(<EngineBoard initialGame={state} />);
}

test('handles optional canter chains', () => {
  let game = makeEmptyGame();
  game = updateBoardSpace(game, 5, 5, {
    piece: { type: PAWN, player: 'playerA' },
  });
  game = updateBoardSpace(game, 5, 6, {
    piece: { type: PAWN, player: 'playerA' },
  });
  game = updateBoardSpace(game, 5, 8, {
    piece: { type: PAWN, player: 'playerA' },
  });

  renderWithState(game);
  fireEvent.click(screen.getByTestId('square-5-5'));
  fireEvent.click(screen.getByTestId('square-5-7'));
  expect(screen.getByTestId('confirm')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('confirm'));
  expect(screen.getByTestId('square-5-7').textContent).toBe('P');
});

test('handles forced capture chains', () => {
  let game = makeEmptyGame();
  game = updateBoardSpace(game, 10, 4, {
    piece: { type: PAWN, player: 'playerA' },
  });
  game = updateBoardSpace(game, 11, 4, {
    piece: { type: PAWN, player: 'playerB' },
  });
  game = updateBoardSpace(game, 13, 4, {
    piece: { type: PAWN, player: 'playerB' },
  });

  renderWithState(game);
  fireEvent.click(screen.getByTestId('square-10-4'));
  fireEvent.click(screen.getByTestId('square-12-4'));
  expect(screen.queryByTestId('confirm')).not.toBeInTheDocument();
  fireEvent.click(screen.getByTestId('square-14-4'));
  expect(screen.getByTestId('confirm')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('confirm'));
  expect(screen.getByTestId('square-14-4').textContent).toBe('P');
  expect(screen.getByTestId('square-11-4').textContent).toBe('');
});

test('handles cancel', () => {
  let game = makeEmptyGame();
  game = updateBoardSpace(game, 5, 5, {
    piece: { type: PAWN, player: 'playerA' },
  });
  game = updateBoardSpace(game, 5, 6, {
    piece: { type: PAWN, player: 'playerA' },
  });

  renderWithState(game);
  fireEvent.click(screen.getByTestId('square-5-5'));
  fireEvent.click(screen.getByTestId('square-5-7'));
  fireEvent.click(screen.getByTestId('cancel'));
  expect(screen.getByTestId('square-5-5').textContent).toBe('P');
  expect(screen.queryByTestId('confirm')).not.toBeInTheDocument();
});

test('handles confirm', () => {
  let game = makeEmptyGame();
  game = updateBoardSpace(game, 5, 5, {
    piece: { type: KNIGHT, player: 'playerA' },
  });
  renderWithState(game);
  fireEvent.click(screen.getByTestId('square-5-5'));
  fireEvent.click(screen.getByTestId('square-6-5'));
  fireEvent.click(screen.getByTestId('confirm'));
  expect(screen.getByText(/Current player: playerB/)).toBeInTheDocument();
});
