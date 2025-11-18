
export async function GET() {
    console.log('API route /api/hello called');

    const initialPlayers = [
  { id: 1, name: 'T', totalScore: 66, percent: 93 },
  { id: 2, name: 'Skippy', totalScore: 35, percent: 33 },
  { id: 3, name: 'Dave', totalScore: 0, percent: 0 },
];

  return new Response(JSON.stringify({ message: 'Hello from Next.js API!', players: initialPlayers }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}