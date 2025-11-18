import LastWinner from '../../../Models/LastWinner';
import Player from '../../../Models/Player';

export async function GET() {
    console.log('API route /api/determine-winner called');

    const players = await Player.find({}).lean();
    if (!players || players.length === 0) {
        return new Response(JSON.stringify({ message: 'No players found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const winner = players.reduce((prev, current) => (prev.totalScore > current.totalScore) ? prev : current);

    // Save the last winner to the LastWinner collection
    await LastWinner.deleteMany({});
    const newLastWinner = new LastWinner(winner);
    await newLastWinner.save();

    // Set all players' scores to zero for the next game
    await Player.updateMany({}, { totalScore: 0, percent: 0 });


  return new Response(JSON.stringify({ message: 'success', winner: newLastWinner }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}