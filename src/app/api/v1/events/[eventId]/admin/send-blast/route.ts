import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/lib/api/fetchWithAuth';


export async function POST(
  req: NextRequest,
  { params }: { params: Promise <{ eventId: string }> }
) {
  try {
   
    const eventId = (await params)?.eventId; // ✅ No need to await params


    const body = await req.json();

    const blastResponse = await fetchWithAuth(
      `${process.env.API_END_POINT}/api/v1/events/${eventId}/admin/send-blast`,
      'POST',
      body
    );

    return NextResponse.json(
      { success: true, data: blastResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error sending blast:', error);
    return NextResponse.json(
      { error: 'Failed to send blast' },
      { status: 500 }
    );
  }
}