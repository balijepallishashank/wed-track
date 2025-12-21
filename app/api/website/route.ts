import { db } from "@/configs/db";
import { websitesTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { and, eq, desc } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      websiteId,
      domain,
      timeZone,
      enableLocalhostTracking,
    } = await request.json();

    // check if domain already exists
    const existingDomain = await db
      .select()
      .from(websitesTable)
      .where(
        and(
          eq(websitesTable.domain, domain),
          eq(
            websitesTable.userEmail,
            user.primaryEmailAddress.emailAddress
          )
        )
      );

    if (existingDomain.length > 0) {
      return NextResponse.json(
        { error: "Domain already exists", data: existingDomain[0] },
        { status: 409 }
      );
    }

    const result = await db
      .insert(websitesTable)
      .values({
        domain,
        websiteId,
        timeZone,
        enableLocalhostTracking,
        userEmail: user.primaryEmailAddress.emailAddress,
      })
      .returning();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(" Website API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
    const user=await currentUser();

    const result=await db.select().from(websitesTable)
    .where(eq(websitesTable.userEmail,user?.primaryEmailAddress?.emailAddress as string))
    .orderBy(desc(websitesTable.id));

    return NextResponse.json(result);

}
