'use client';

import createEmptyGame from '@/lib/engine/init/create-empty-game';

export default function BoardDebugPage() {
  const gameState = createEmptyGame();
  
  // Group board spaces by row
  const boardByRow = new Map<number, typeof gameState.boardSpaces>();
  gameState.boardSpaces.forEach(space => {
    if (!boardByRow.has(space.row)) {
      boardByRow.set(space.row, []);
    }
    boardByRow.get(space.row)!.push(space);
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Board Debug Info</h1>
      <p>Total spaces: {gameState.boardSpaces.length}</p>
      <p>Rows: {boardByRow.size}</p>
      
      <div className="mt-4">
        <h2 className="text-xl mb-2">Spaces per row:</h2>
        {Array.from(boardByRow.entries())
          .sort(([a], [b]) => a - b)
          .map(([row, spaces]) => (
            <div key={row}>
              Row {row}: {spaces.length} spaces (cols {Math.min(...spaces.map(s => s.col))} - {Math.max(...spaces.map(s => s.col))})
            </div>
          ))}
      </div>

      <div className="mt-4">
        <h2 className="text-xl mb-2">Visual representation:</h2>
        <pre className="font-mono text-xs">
          {Array.from({ length: 17 }, (_, row) => {
            const rowSpaces = boardByRow.get(row) || [];
            const minCol = Math.min(...rowSpaces.map(s => s.col));
            const maxCol = Math.max(...rowSpaces.map(s => s.col));
            
            let line = '';
            for (let col = 0; col < 12; col++) {
              if (rowSpaces.some(s => s.col === col)) {
                const space = rowSpaces.find(s => s.col === col)!;
                line += space.piece ? (space.piece.player === 'playerA' ? 'A' : 'B') : '.';
              } else {
                line += ' ';
              }
            }
            return `${row.toString().padStart(2)}: ${line}`;
          }).join('\n')}
        </pre>
      </div>
    </div>
  );
}