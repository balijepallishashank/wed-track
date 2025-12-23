import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const origin = req.headers.get("origin") || "*";
  
  // Define CORS headers for the response
  const headers = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body = await req.json();
    
    // TODO: Insert 'body' data into your database here
    // console.log("Track data received:", body);

    return NextResponse.json({ success: true }, { status: 200, headers });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500, headers });
  }
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin") || "*";

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}