import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
});

export const websitesTable = pgTable("websites", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    websiteId: varchar('website_id', { length: 255 }).notNull().unique(),
    domain: varchar('domain', { length: 255 }).notNull(),
    timeZone: varchar('time_zone', { length: 255 }).notNull(),
    enableLocalhostTracking: boolean('enable_localhost_tracking').default(false),
    userEmail: varchar('user_email', { length: 255 })
});

export const pageViewTable = pgTable('pageViews', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    visitorId: varchar({ length: 255 }),
    websiteId: varchar({ length: 255 }).notNull(),
    domain: varchar({ length: 255 }).notNull(),    
    url: varchar({ length: 2048 }),
    type: varchar({ length: 50 }).notNull(),
    referrer: varchar({ length: 2048 }),
    entryTime: varchar({ length: 100 }),
    exitTime: varchar({ length: 100 }),
    totalActiveTime: integer(),
    urlParams: varchar(),
    utm_source: varchar({ length: 255 }),
    utm_medium: varchar({ length: 255 }),
    utm_campaign: varchar({ length: 255 }),
    device: varchar(),
    os: varchar(),
    browser: varchar(),
    city: varchar(),
    region: varchar(),
    country: varchar(),
    ipAddress: varchar(),
    refParams: varchar(),
});