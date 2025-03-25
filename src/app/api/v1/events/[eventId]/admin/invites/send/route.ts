import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/lib/api/fetchWithAuth';


export async function POST(
  req: NextRequest,
  { params }: { params: Promise <{ eventId: string }> }
) {
  try {
  
    const eventId = (await params)?.eventId; // ✅ No need to await params


    const body = await req.json();

    const inviteResponse = await fetchWithAuth(
        `${process.env.API_END_POINT}/api/v1/events/${eventId}/admin/invites/send`,
      'POST',
      body
    );

    return NextResponse.json(
      { success: true, data: inviteResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error sending invite:', error);
    return NextResponse.json(
      { error: 'Failed to send invitation' },
      { status: 500 }
    );
  }
}