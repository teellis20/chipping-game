
export async function POST(req) {
    const body = await req.json();
    console.log('API route /api/post-score called', body);
  return new Response(JSON.stringify({ message: 'Score received', data: body }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}