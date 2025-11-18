import Player from '../../../Models/Player';

export async function GET() {
    console.log('API route /api/players called');

    const players = await Player.find({}).lean();

    if (!players) {
        return new Response(JSON.stringify({ message: 'No players found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


  return new Response(JSON.stringify({ message: 'Hello from Next.js API!', players }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}