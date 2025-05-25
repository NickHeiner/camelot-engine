import { httpRouter } from 'convex/server';
import { api } from './_generated/api';
import { httpAction } from './_generated/server';

const http = httpRouter();

// Enable HTTP actions for server-side data fetching
http.route({
  path: '/api/game',
  method: 'GET',
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const gameId = url.searchParams.get('id');
    
    if (!gameId) {
      return new Response('Missing game ID', { status: 400 });
    }
    
    const result = await ctx.runQuery(api.games.getGame, { 
      gameId: gameId as any 
    });
    
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  }),
});

export default http;