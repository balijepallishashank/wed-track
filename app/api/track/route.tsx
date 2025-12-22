import { db } from "@/configs/db";
import { pageViewTable } from "@/configs/schema";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from 'ua-parser-js';
import { eq } from 'drizzle-orm'; // 👈 IMPORTANT: Don't forget this import!

export async function POST(req: NextRequest) {
  const body = await req.json();

  let result;

  // IF it is a new visit ('entry'), we INSERT data
  if (body.type !== 'exit') {
      
      // 1. Parse User Agent
      const parser = new UAParser(req.headers.get('user-agent') || '');
      const deviceInfo = parser.getDevice();
      const osInfo = parser.getOS()?.name;
      const browserInfo = parser.getBrowser()?.name;
      
      // 2. Get IP Address
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '71.71.22.54';
      
      // 3. Get Geo Info
      const geoRes = await fetch(`http://ip-api.com/json/${ip}`); 
      const geoInfo = await geoRes.json();

      // 4. Insert into DB
      result = await db.insert(pageViewTable).values({
        visitorId: body.visitorId,
        websiteId: body.websiteId,
        domain: body.domain,
        url: body.url,
        type: body.type,
        referrer: body.referrer,
        entryTime: body.entryTime,
        exitTime: body.exitTime,
        totalActiveTime: body.totalActiveTime,
        urlParams: body.urlParams,
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
        device: JSON.stringify(deviceInfo), 
        os: osInfo,
        browser: browserInfo,
        city: geoInfo?.city,
        region: geoInfo?.region,
        country: geoInfo?.country,
        ipAddress: ip || '',
        refParams: body.refParams,
      }).returning();

  } 
  else {
      result = await db.update(pageViewTable)
        .set({
            exitTime: body.exitTime,
            totalActiveTime: body.totalActiveTime,
        })
        .where(eq(pageViewTable.visitorId, body.visitorId))
        .returning();
  }
  console.log("Insert Result:",result);

  return NextResponse.json({ message: "Data received successfully", data: result });
}