import Link from 'next/link';

export default function RenderingModesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Convex Rendering Modes</h1>
      
      <div className="grid gap-6">
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">1. Client-Side Rendering</h2>
          <p className="text-gray-600 mb-4">
            Original implementation - loads data on client with loading states
          </p>
          <Link href="/game" className="bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600">
            View Client-Side Game List
          </Link>
        </div>
        
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">2. Server-Side Rendering (SSR)</h2>
          <p className="text-gray-600 mb-4">
            Data fetched on server - no loading states, but no real-time updates
          </p>
          <Link href="/game-ssr" className="bg-green-500 text-white px-4 py-2 rounded inline-block hover:bg-green-600">
            View SSR Game List
          </Link>
        </div>
        
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">3. Hybrid (SSR + Real-time)</h2>
          <p className="text-gray-600 mb-4">
            Best of both worlds - instant load from server + real-time updates
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Create a game first, then view it with the hybrid approach:
          </p>
          <div className="space-x-2">
            <Link href="/game" className="bg-purple-500 text-white px-4 py-2 rounded inline-block hover:bg-purple-600">
              Create a Game First
            </Link>
            <span className="text-gray-500">then</span>
            <Link href="/game-hybrid/YOUR_GAME_ID" className="bg-purple-500 text-white px-4 py-2 rounded inline-block hover:bg-purple-600">
              View with Hybrid Mode
            </Link>
          </div>
        </div>
        
        <div className="border p-6 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Quick Comparison</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Feature</th>
                <th className="text-center py-2">Client</th>
                <th className="text-center py-2">SSR</th>
                <th className="text-center py-2">Hybrid</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Initial Load Speed</td>
                <td className="text-center">⚡</td>
                <td className="text-center">⚡⚡⚡</td>
                <td className="text-center">⚡⚡⚡</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Real-time Updates</td>
                <td className="text-center">✅</td>
                <td className="text-center">❌</td>
                <td className="text-center">✅</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">SEO Friendly</td>
                <td className="text-center">❌</td>
                <td className="text-center">✅</td>
                <td className="text-center">✅</td>
              </tr>
              <tr>
                <td className="py-2">Loading States</td>
                <td className="text-center">Yes</td>
                <td className="text-center">No</td>
                <td className="text-center">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}