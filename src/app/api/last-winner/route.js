import LastWinner from '../../../Models/LastWinner';

export async function GET() {
    console.log('API route /api/last-winner called');

    const lastWinner = await LastWinner.find({}).lean();
    if (!lastWinner || lastWinner.length === 0) {
        return new Response(JSON.stringify({ message: 'No last winner found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

  return new Response(JSON.stringify({ message: 'success', winner: lastWinner }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}