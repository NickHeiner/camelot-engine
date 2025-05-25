'use client';

import { useState, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  closestCenter,
} from '@dnd-kit/core';
import { Square } from './Square';
import { Piece } from './Piece';
import type { GameState, Coordinates } from '@/lib/engine/types';
import { BOARD_WIDTH, BOARD_HEIGHT } from '@/lib/engine/constants';
import getBoardSpace from '@/lib/engine/query/get-board-space';
import isValidMove from '@/lib/engine/query/is-valid-move';
import applyMove from '@/lib/engine/update/apply-move';

interface BoardProps {
  gameState: GameState;
  onMove: (newGameState: GameState) => void;
  currentPlayer: 'playerA' | 'playerB';
}

export function Board({ gameState, onMove, currentPlayer }: BoardProps) {
  const [selectedPiece, setSelectedPiece] = useState<Coordinates | null>(null);
  const [validMoves, setValidMoves] = useState<Coordinates[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handlePieceSelect = useCallback(
    (position: Coordinates) => {
      const space = getBoardSpace(gameState, position);
      if (!space?.piece || space.piece.player !== currentPlayer) {
        setSelectedPiece(null);
        setValidMoves([]);
        return;
      }

      setSelectedPiece(position);

      const moves: Coordinates[] = [];
      for (let row = 0; row < BOARD_HEIGHT; row++) {
        for (let col = 0; col < BOARD_WIDTH; col++) {
          const to = { row, col };
          if (isValidMove(gameState, position, to)) {
            moves.push(to);
          }
        }
      }
      setValidMoves(moves);
    },
    [gameState, currentPlayer]
  );

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data?.position) {
      setIsDragging(true);
      handlePieceSelect(data.position);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);

    if (!event.over || !selectedPiece) return;

    const [toRow, toCol] = event.over.id.toString().split('-').map(Number);
    const to = { row: toRow, col: toCol };

    if (isValidMove(gameState, selectedPiece, to)) {
      const newGameState = applyMove(gameState, selectedPiece, to);
      onMove(newGameState);
      setSelectedPiece(null);
      setValidMoves([]);
    }
  };

  const handleSquareClick = (row: number, col: number) => {
    const clickedSpace = { row, col };
    const space = getBoardSpace(gameState, clickedSpace);

    if (selectedPiece && isValidMove(gameState, selectedPiece, clickedSpace)) {
      const newGameState = applyMove(gameState, selectedPiece, clickedSpace);
      onMove(newGameState);
      setSelectedPiece(null);
      setValidMoves([]);
    } else if (space?.piece && space.piece.player === currentPlayer) {
      handlePieceSelect(clickedSpace);
    } else {
      setSelectedPiece(null);
      setValidMoves([]);
    }
  };

  const isHighlighted = (row: number, col: number) => {
    return validMoves.some((move) => move.row === row && move.col === col);
  };

  const isSelected = (row: number, col: number) => {
    return selectedPiece?.row === row && selectedPiece?.col === col;
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="max-w-6xl mx-auto p-4">
        <div className="inline-block border-4 border-amber-900 shadow-2xl bg-amber-50">
          {/* Render the castle-shaped board */}
          <div className="flex flex-col">
            {Array.from({ length: BOARD_HEIGHT }, (_, row) => {
              // Calculate indent for castle shape
              let indent = 0;
              if (row <= 2) indent = 5 - row * 2;
              else if (row >= 14) indent = (row - 14) * 2 + 1;
              
              return (
                <div key={`row-${row}`} className="flex">
                  {/* Left padding */}
                  {Array.from({ length: indent }, (_, i) => (
                    <div key={`pad-left-${i}`} className="w-16 h-16" />
                  ))}
                  
                  {/* Actual board squares */}
                  {Array.from({ length: BOARD_WIDTH }, (_, col) => {
                    const space = getBoardSpace(gameState, { row, col });
                    if (!space) return null;
                    
                    return (
                      <div
                        key={`${row}-${col}`}
                        onClick={() => handleSquareClick(row, col)}
                      >
                        <Square
                          row={row}
                          col={col}
                          isHighlighted={isHighlighted(row, col)}
                        >
                          {space.piece && (
                            <Piece
                              piece={space.piece}
                              position={{ row, col }}
                              isSelected={isSelected(row, col)}
                              onSelect={() =>
                                !isDragging && handlePieceSelect({ row, col })
                              }
                            />
                          )}
                        </Square>
                      </div>
                    );
                  })}
                  
                  {/* Right padding */}
                  {Array.from({ length: indent }, (_, i) => (
                    <div key={`pad-right-${i}`} className="w-16 h-16" />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DndContext>
  );
}
