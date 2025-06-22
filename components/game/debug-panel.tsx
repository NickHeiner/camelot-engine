'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Bug, ChevronUp, ChevronDown } from 'lucide-react';

interface DebugPanelProps {
  gameId: Id<'games'>;
  currentPlayer: 'playerA' | 'playerB';
  playerAName: string;
  playerBName: string;
}

export function DebugPanel({
  gameId,
  currentPlayer,
  playerAName,
  playerBName,
}: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const changeTurn = useMutation(api.games.debugChangeTurn);

  const handleChangeTurn = async () => {
    try {
      await changeTurn({
        gameId,
        newCurrentPlayer: currentPlayer === 'playerA' ? 'playerB' : 'playerA',
      });
    } catch (error) {
      console.error('Failed to change turn:', error);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-colors z-50"
        title="Open Debug Panel"
      >
        <Bug className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white rounded-lg shadow-2xl z-50 min-w-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4 text-purple-400" />
          <span className="font-semibold">Debug Panel</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="p-4 space-y-4">
          {/* Current Turn Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">Current Turn</h3>
            <div className="flex items-center justify-between bg-gray-800 p-3 rounded gap-3">
              <span className="text-sm truncate flex-1 min-w-0">
                {currentPlayer === 'playerA' ? (
                  <span className="text-red-400 break-all">{playerAName}</span>
                ) : (
                  <span className="text-blue-400 break-all">{playerBName}</span>
                )}
              </span>
              <button
                onClick={handleChangeTurn}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors flex-shrink-0"
              >
                Switch Turn
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="text-xs text-gray-500 border-t border-gray-700 pt-3">
            <p>Debug mode - Development only</p>
            <p className="break-all">Game ID: {gameId}</p>
          </div>
        </div>
      )}
    </div>
  );
}
