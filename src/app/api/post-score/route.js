import Player from '../../../Models/Player';

export async function POST(req) {
    const body = await req.json();
    console.log('API route /api/post-score called', body);

    const foundPlayer = await Player.findOne({ name: body.name });

    if (!foundPlayer) {
        return new Response(JSON.stringify({ message: 'Player not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    foundPlayer.totalScore = body.totalScore;
    foundPlayer.percent = body.percent;
    await foundPlayer.save();
   
  return new Response(JSON.stringify({ message: 'Score received' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}