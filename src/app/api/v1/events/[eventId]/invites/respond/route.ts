import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/lib/api/fetchWithAuth';
import { auth } from '@/lib/auth/authConfig';

interface CustomUser {
  access_token: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise <{ eventId: string }> }
) {
  try {
    // Extract the event ID from the URL parameters
    const eventId = (await params)?.eventId; // ✅ No need to await params

    // Parse the action ('accept' or 'decline') from the query string
    const action = req.nextUrl.searchParams.get('action')?.toLowerCase();
    if (!action || (action !== 'accept' && action !== 'decline')) {
      return NextResponse.json(
        { error: 'Invalid action parameter' },
        { status: 400 }
      );
    }

    // Authenticate the user
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = session.user as CustomUser | undefined;
    if (!user?.access_token) {
      return NextResponse.json(
        { error: 'Unauthorized: Missing access token' },
        { status: 401 }
      );
    }

    // Prepare the token for authenticated requests
    const token = user.access_token;

    // Call the backend API to update the invitation status
    // Pass the action as a query parameter in the URL
    const response = await fetchWithAuth(
      `${process.env.API_END_POINT}/api/v1/events/${eventId}/invites/respond?action=${action}`,
      'POST'
    );

    // Handle errors from the backend API
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to update invitation status' },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        status: 200,
        message: `Invitation ${action}ed successfully`,
        data: response.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating invitation status:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}