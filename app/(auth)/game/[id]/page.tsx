export default function GamePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Game {params.id}</h1>
      <div className="bg-muted rounded-lg p-8 text-center">
        <p className="text-muted-foreground">
          Game board and controls will be implemented here
        </p>
      </div>
    </div>
  );
}