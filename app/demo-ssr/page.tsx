import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';

export default async function DemoSSRPage() {
  // This data is fetched on the server at request time
  const availableGames = await fetchQuery(api.games.getAvailableGames);
  
  // Get the render time to show it's server-rendered
  const renderTime = new Date().toISOString();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Convex SSR vs Client-Side Demo</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Server-Side Rendering (SSR)</h2>
          <div className="space-y-2 text-sm">
            <p className="text-green-600">✅ SEO friendly</p>
            <p className="text-green-600">✅ Faster initial page load</p>
            <p className="text-green-600">✅ No loading states</p>
            <p className="text-yellow-600">⚠️ No real-time updates</p>
            <p className="text-yellow-600">⚠️ Full page reload on navigation</p>
          </div>
          
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-sm font-mono">Rendered at: {renderTime}</p>
            <p className="text-sm">Games count: {availableGames.length}</p>
          </div>
          
          <div className="mt-4 space-y-2">
            <Link href="/game-ssr" className="text-blue-500 underline block">
              View SSR Games List →
            </Link>
            <p className="text-xs text-gray-500">
              (Data fetched on server, no loading spinner)
            </p>
          </div>
        </div>
        
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Client-Side Rendering</h2>
          <div className="space-y-2 text-sm">
            <p className="text-green-600">✅ Real-time updates</p>
            <p className="text-green-600">✅ Instant interactions</p>
            <p className="text-green-600">✅ Live multiplayer sync</p>
            <p className="text-yellow-600">⚠️ Shows loading states</p>
            <p className="text-yellow-600">⚠️ Less SEO friendly</p>
          </div>
          
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-sm">Uses useQuery hook</p>
            <p className="text-sm">Updates automatically</p>
          </div>
          
          <div className="mt-4 space-y-2">
            <Link href="/game" className="text-blue-500 underline block">
              View Client-Side Games List →
            </Link>
            <p className="text-xs text-gray-500">
              (Data fetched on client, shows loading state)
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Convex SSR Options:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><code>fetchQuery</code> - Fetch data once on server (used above)</li>
          <li><code>preloadQuery</code> - Preload on server, hydrate on client with real-time updates</li>
          <li><code>fetchMutation</code> - Run mutations from server actions</li>
        </ul>
        
        <div className="mt-4">
          <p className="text-sm font-semibold">Best of Both Worlds:</p>
          <p className="text-sm">Use <code>preloadQuery</code> to get SSR benefits + real-time updates!</p>
        </div>
      </div>
    </div>
  );
}