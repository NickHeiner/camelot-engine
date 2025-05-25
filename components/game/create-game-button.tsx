'use client';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

export function CreateGameButton() {
  const router = useRouter();
  const createGame = useMutation(api.games.createGame);

  const handleCreateGame = async () => {
    const gameId = await createGame({ createdBy: 'user-123' }); // TODO: Get from auth
    router.push(`/game/${gameId}`);
  };

  return (
    <button
      onClick={handleCreateGame}
      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
    >
      Create New Game
    </button>
  );
}