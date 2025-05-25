'use client';

import { usePreloadedQuery, useMutation, Preloaded } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

interface GameListClientProps {
  preloadedAvailableGames: Preloaded<typeof api.games.getAvailableGames>;
  preloadedMyGames: Preloaded<typeof api.games.getMyGames>;
}

export function GameListClient({
  preloadedAvailableGames,
  preloadedMyGames,
}: GameListClientProps) {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const availableGames = usePreloadedQuery(preloadedAvailableGames);
  const myGames = usePreloadedQuery(preloadedMyGames);
  const createGame = useMutation(api.games.createGame);
  const joinGame = useMutation(api.games.joinGame);

  const handleCreateGame = async () => {
    if (!userId) return;
    const gameId = await createGame({ createdBy: userId });
    router.push(`/game/${gameId}`);
  };

  const handleJoinGame = async (gameId: string) => {
    if (!userId) return;
    await joinGame({
      gameId: gameId as Id<'games'>,
      userId,
    });
    router.push(`/game/${gameId}`);
  };

  return (
    <>
      <div className="mb-8">
        <button
          onClick={handleCreateGame}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Create New Game
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Games</h2>
          <div className="space-y-2">
            {availableGames?.map((game) => (
              <div key={game._id} className="border p-4 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <p>Created by: {game.createdBy}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(game.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleJoinGame(game._id)}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
            {!availableGames?.length && (
              <p className="text-gray-500">No available games</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">My Games</h2>
          <div className="space-y-2">
            {myGames?.map((game) => (
              <div key={game._id} className="border p-4 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <p>Status: {game.status}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(game.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => router.push(`/game/${game._id}`)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
            {!myGames?.length && <p className="text-gray-500">No games yet</p>}
          </div>
        </div>
      </div>
    </>
  );
}
