import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    const BRAZE_API_KEY = process.env.BRAZE_API_KEY;
    const BRAZE_REST_ENDPOINT = process.env.BRAZE_REST_ENDPOINT || 'https://rest.iad-01.braze.com';

    if (BRAZE_API_KEY) {
      // Connect to Braze
      const res = await fetch(`${BRAZE_REST_ENDPOINT}/users/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BRAZE_API_KEY}`,
        },
        body: JSON.stringify({
          attributes: [
            {
              email: email,
              email_subscribe: 'opted_in',
            }
          ]
        })
      });

      if (!res.ok) {
        console.error('Braze API error:', await res.text());
        return NextResponse.json({ ok: false, error: 'Failed to subscribe' }, { status: 500 });
      }
    } else {
      console.log('Newsletter signup:', email, '(Braze API key missing, just logging)');
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
