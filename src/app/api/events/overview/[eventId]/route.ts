import { NextRequest, NextResponse } from "next/server";
import { fetchWithAuth } from "@/lib/api/fetchWithAuth";

const API_URL = process.env.API_END_POINT;

export async function GET(
  _req: NextRequest,
  context: { params:Promise <{ eventId: string }> }
) {
  const { eventId } = await context.params;

  if (!API_URL) {
    console.error("❌ API URL is not defined in environment variables");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  if (!eventId) {
    return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
  }

  try {
    const FETCH_EVENT_URL = `${API_URL}/api/v1/events/id/${eventId}`;
    const eventsResponse = await fetchWithAuth(FETCH_EVENT_URL, "GET");

    if (!eventsResponse || !eventsResponse.data) {
      return NextResponse.json(
        { error: "Invalid API response format" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: eventsResponse.data }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching events:", error);

    return NextResponse.json(
      { error: error?.message || "Failed to fetch events" },
      { status: 500 }
    );
  }
}
