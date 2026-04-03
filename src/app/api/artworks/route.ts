import { NextRequest, NextResponse } from "next/server";
import { fetchArtworksFromAIC } from "@/lib/api-service";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const query = searchParams.get("q") || "";

  try {
    const data = await fetchArtworksFromAIC(page, limit, query);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
