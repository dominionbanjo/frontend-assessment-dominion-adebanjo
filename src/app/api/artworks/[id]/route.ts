import { NextRequest, NextResponse } from "next/server";
import { fetchArtworkByIdFromAIC } from "@/lib/api-service";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const data = await fetchArtworkByIdFromAIC(id);
    console.log("Artwork fetched by ID:", data.data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error (by ID):", error);
    const status = error instanceof Error && error.message === "Artwork not found" ? 404 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status }
    );
  }
}
