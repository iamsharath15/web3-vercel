import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/lib/api/fetchWithAuth';

interface CheckInRequest {
  checkInToken: string; // Token from scanned QR code
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise <{ eventId: string }> }
) {
  try {
    const eventId = (await params)?.eventId; // ✅ No need to await params



    const body = await req.json() as CheckInRequest;
    if (!body.checkInToken) {
      return NextResponse.json(
        { error: 'Missing QR code check-in token' },
        { status: 400 }
      );
    }

    const response = await fetchWithAuth(
        `${process.env.API_END_POINT}/api/v1/events/${eventId}/check-in?token=${body.checkInToken}`,
      'POST'
    );

    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error during check-in:', error);
    return NextResponse.json(
      { error: 'Failed to check in guest' },
      { status: 500 }
    );
  }
}