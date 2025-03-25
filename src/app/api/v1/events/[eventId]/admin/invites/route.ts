import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/lib/api/fetchWithAuth';


export async function GET(
  req: NextRequest,
  { params }: { params: Promise <{ eventId: string }> }
) {
  try {
    const eventId = (await params)?.eventId; // ✅ No need to await params



    const response = await fetchWithAuth(
      `${process.env.API_END_POINT}/api/v1/events/${eventId}/admin/invites`,
      'GET'
    );

    return NextResponse.json(
      { 
        status: 200,
        message: "Successfully retrieved invited users",
        data: response.data 
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching invited users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invited users' },
      { status: 500 }
    );
  }
}