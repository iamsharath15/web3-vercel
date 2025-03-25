import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Read request body once
    const { eventId, customFields } = body;

    if (!eventId) {
      return NextResponse.json({ message: "Event ID is required." }, { status: 400 });
    }

    const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

    const result = await fetchWithAuth(
      `${API_BASE_URL}/api/v1/events/join`, 
      "POST",
      { eventId, customFields: customFields || [] }
    );

    return NextResponse.json({ message: "Successfully registered for the event!", data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}
