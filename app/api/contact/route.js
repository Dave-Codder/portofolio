export async function POST(request) {
  const body = await request.json();
  console.log('Form data:', body); // Log form data
  return new Response(JSON.stringify({ message: 'Message sent successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}