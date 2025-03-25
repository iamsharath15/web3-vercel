import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/lib/api/fetchWithAuth';

const API_URL = process.env.API_END_POINT; // Store base API URL as a constant
export async function GET(req: NextRequest) {
  try {
    const FETCH_EVENT_URL = `${API_URL}/api/v1/events`;

    const eventsResponse = await fetchWithAuth(FETCH_EVENT_URL,
      'GET'
    );

    if (!Array.isArray(eventsResponse.data)) {
      return NextResponse.json(
        { error: 'Invalid API response format' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: eventsResponse.data }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
