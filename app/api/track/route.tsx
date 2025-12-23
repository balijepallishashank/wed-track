import { db } from "@/configs/db";
import { pageViewTable } from "@/configs/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    let result;
    
    if (body.type === "entry") {
      result = await db.insert(pageViewTable).values({
        type: body.type,
        websiteId: body.websiteId,
        domain: body.domain,
        entryTime: body.entryTime,
        referrer: body.referrer,
        url: body.url,
        visitorId: body.visitorId,
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
        urlParams: body.urlParams,
      }).returning();
    } else if (body.type === "exit") {
      result = await db.update(pageViewTable)
        .set({
          exitTime: body.exitTime,
          totalActiveTime: body.totalActiveTime,
        })
        .where(eq(pageViewTable.visitorId, body.visitorId))
        .returning();
    }

    return NextResponse.json(
      { message: "Live update received", data: result },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("Tracking Error:", error);
    return NextResponse.json(
      { success: false },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}