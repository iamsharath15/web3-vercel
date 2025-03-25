import { fetchWithAuth } from '@/lib/api/fetchWithAuth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const urlSegments = req.nextUrl.pathname.split('/');
    const eventUrl = urlSegments[urlSegments.length - 1]; // Extract dynamic segment

    if (!eventUrl) {
      return NextResponse.json({ error: 'Event URL is required' }, { status: 400 });
    }

    // Fetch event details from the backend
    const response = await fetchWithAuth(`${process.env.API_END_POINT}/api/v1/events/${eventUrl}`, "GET");

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch event details' }, { status: response.status });
    }

    const eventData = await response.json();
    return NextResponse.json(eventData, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching event details:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
