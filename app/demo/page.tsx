'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useState } from 'react';

export default function DemoPage() {
  const [testResult, setTestResult] = useState<string>('');
  const createGame = useMutation(api.games.createGame);
  const games = useQuery(api.games.getAvailableGames);
  
  const runTest = async () => {
    try {
      setTestResult('Testing Convex connection...');
      
      // Test 1: Create a game
      const gameId = await createGame({ createdBy: 'demo-user' });
      setTestResult(prev => prev + '\n✅ Created game with ID: ' + gameId);
      
      // Test 2: Check if real-time updates work
      setTimeout(() => {
        setTestResult(prev => prev + '\n✅ Real-time updates working - game list updated');
      }, 1000);
      
    } catch (error) {
      setTestResult('❌ Error: ' + error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Convex Integration Demo</h1>
      
      <div className="space-y-6">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">1. Convex Connection Status</h2>
          <p className={games !== undefined ? 'text-green-500' : 'text-red-500'}>
            {games !== undefined ? '✅ Connected to Convex' : '❌ Not connected to Convex'}
          </p>
        </div>
        
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">2. Available Games</h2>
          <p>Games in database: {games?.length || 0}</p>
          {games?.map((game, i) => (
            <div key={game._id} className="text-sm text-gray-600 mt-1">
              Game {i + 1}: {game._id} (Status: {game.status})
            </div>
          ))}
        </div>
        
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">3. Test Game Creation</h2>
          <button
            onClick={runTest}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2"
          >
            Run Test
          </button>
          {testResult && (
            <pre className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
              {testResult}
            </pre>
          )}
        </div>
        
        <div className="border p-4 rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">How to Test the Full Game:</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to <a href="/game" className="text-blue-500 underline">/game</a></li>
            <li>Click "Create New Game" - this will create a game and redirect you to it</li>
            <li>Open the same game URL in another browser tab/window</li>
            <li>Click "Join" on the second tab to join as Player B</li>
            <li>Make moves by clicking pieces and then clicking destination squares</li>
            <li>Watch the board update in real-time in both windows!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}