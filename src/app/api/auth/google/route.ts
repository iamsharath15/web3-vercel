import { NextResponse } from 'next/server';

export async function POST(request: Request) { // Use the Request type from next/server
  try {
    const { authKey, authType } = await request.json();
    const apiEndpoint = process.env.API_END_POINT;

    if (!apiEndpoint) {
      console.error('API_END_POINT environment variable is not defined.');
      return NextResponse.json(
        { status: 500, message: 'Internal Server Error: API endpoint not configured.' },
        { status: 500 }
      );
    }

    const response = await fetch(`${apiEndpoint}/api/v1/auth/google`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authKey, authType }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { status: response.status, message: data.message },
        { status: response.status }
      );
    }

    return NextResponse.json({ status: 200, data });
  } catch (error) {
    console.error('Error in Google auth route:', error);
    return NextResponse.json(
      { status: 500, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}