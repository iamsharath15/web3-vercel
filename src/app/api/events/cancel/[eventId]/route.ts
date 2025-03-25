
import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_END_POINT || "http://localhost:8080";
export async function DELETE(req: NextRequest, { params }: { params:Promise <{ eventId: string }> }) {

  try {
    const eventId = (await params)?.eventId; // ✅ No need to await params
    console.log("Event ID:", eventId);

    if (!eventId) {
      return NextResponse.json({ error: "MISSING_EVENT_ID" }, { status: 400 });
    }

    const EVENT_CANCEL_URL = `${API_URL}/api/v1/events/${eventId}/admin/cancel`;

    // Fetch with authentication
    const result = await fetchWithAuth(EVENT_CANCEL_URL, "DELETE");

    if (!result.ok) {
      return NextResponse.json(
        { error: "Failed to cancel event" },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { success: true, message: "EVENT_CANCELED_SUCCESSFULLY" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ ERROR_CANCELING_EVENT:", error);
    return NextResponse.json(
      { error: error.message || "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
