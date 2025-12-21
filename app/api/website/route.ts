import { db } from '@/configs/db';
import { websitesTable } from '@/configs/schema';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
export async function POST(request: Request) {
    const { websiteId, domain, timeZone, enableLocalhostTracking } = await request.json();
    const user = await currentUser();

    //check if Domain already exists
    const existingDomain = await db.select().from(websitesTable).where(and(eq(websitesTable.domain, domain),
     eq(websitesTable.userEmail, user?.primaryEmailAddress?.emailAddress as string)));

    if (existingDomain.length > 0) {
        return NextResponse.json({ error: "Domain already exists",data: existingDomain[0] }, );
    }
    const userEmail = user?.emailAddresses[0]?.emailAddress;
const result=await db.insert(websitesTable).values({
    domain: domain,
    websiteId: websiteId,
    timeZone: timeZone,
    enableLocalhostTracking: enableLocalhostTracking,
    userEmail:user?.primaryEmailAddress?.emailAddress as string,
}).returning();
    return NextResponse.json(result);
}