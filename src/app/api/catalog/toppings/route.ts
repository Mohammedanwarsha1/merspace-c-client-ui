import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL;
  const tenantId = request.nextUrl.searchParams.get("tenantId");

  if (!backendUrl) {
    return NextResponse.json(
      { error: "BACKEND_URL is not configured" },
      { status: 500 },
    );
  }

  if (!tenantId) {
    return NextResponse.json(
      { error: "tenantId is required" },
      { status: 400 },
    );
  }

  const response = await fetch(
    `${backendUrl}/api/catalog/toppings?tenantId=${encodeURIComponent(tenantId)}`,
    { cache: "no-store" },
  );

  const body = await response.text();

  return new NextResponse(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/json",
    },
  });
}
