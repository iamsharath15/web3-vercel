import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/lib/api/fetchWithAuth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.startTime || !body.endTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const eventResponse = await fetchWithAuth(
      `${process.env.API_END_POINT}/api/v1/events/create`,
      'POST',
      body
    );

    return NextResponse.json({ success: true, event: eventResponse }, { status: 201 });
  } catch (error:any) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
