import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/lib/api/fetchWithAuth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const eventId = (await params)?.eventId; // ✅ No need to await params

    // Get email from URL query parameters instead of request body
    const email = req.nextUrl.searchParams.get('email');
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const response = await fetchWithAuth(
      `${process.env.API_END_POINT}/api/v1/events/${eventId}/admin/invites/cancel?email=${email}`,
      'DELETE'
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error canceling invite:', error);
    return NextResponse.json(
      { error: 'Failed to cancel invite' },
      { status: 500 }
    );
  }
}
