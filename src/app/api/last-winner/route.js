
export async function GET() {
    console.log('API route /api/last-winner called');

    const lastWinner = [
  { id: 1, name: 'T', totalScore: 66, percent: 93 },
];

  return new Response(JSON.stringify({ message: 'success', winner: lastWinner }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}