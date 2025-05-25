'use client';

import { useState } from 'react';
import { ClientOnlyBoard } from '@/components/game/ClientOnlyBoard';
import createEmptyGame from '@/lib/engine/init/create-empty-game';
import type { GameState } from '@/lib/engine/types';

export default function BoardDemoPage() {
  const [gameState, setGameState] = useState<GameState>(createEmptyGame);
  const [currentPlayer, setCurrentPlayer] = useState<'playerA' | 'playerB'>(
    'playerA'
  );

  const handleMove = (newGameState: GameState) => {
    setGameState(newGameState);
    // Toggle player after each move
    setCurrentPlayer(currentPlayer === 'playerA' ? 'playerB' : 'playerA');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        Camelot Board Demo
      </h1>
      <div className="text-center mb-4">
        <p className="text-lg">
          Current Player:{' '}
          <span className="font-bold">
            {currentPlayer === 'playerA' ? 'White' : 'Black'}
          </span>
        </p>
      </div>
      <ClientOnlyBoard
        gameState={gameState}
        onMove={handleMove}
        currentPlayer={currentPlayer}
      />
    </div>
  );
}
