import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { CreateGameButton } from '@/components/game/create-game-button';

export default async function GameListPageSSR() {
  // Fetch data on the server
  const availableGames = await fetchQuery(api.games.getAvailableGames);
  const myGames = await fetchQuery(api.games.getMyGames, { 
    userId: 'user-123' // TODO: Get from auth
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Games (Server-Side Rendered)</h1>
      
      <div className="mb-8">
        <CreateGameButton />
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
                  <form action="/api/join-game" method="POST">
                    <input type="hidden" name="gameId" value={game._id} />
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                    >
                      Join
                    </button>
                  </form>
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
                  <Link
                    href={`/game/${game._id}`}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 inline-block"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
            {!myGames?.length && (
              <p className="text-gray-500">No games yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}