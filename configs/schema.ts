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