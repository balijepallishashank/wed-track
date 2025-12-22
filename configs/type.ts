import { analyticsType } from "@/app/api/website/route"

export type WebsiteType = {
  id: number
  websiteId: string
  domain: string
  timeZone: string
  enableLocalhostTracking?: boolean
  userEmail?: string
}

export type WebsiteInfoType={
  website: WebsiteType,
  analytics:analyticsType,
}

export type AnalyticsType = {
    avgActiveTime: number;
    totalActiveTime: number;
    totalSessions: number; // Fixed typo (was 'totalSesstions')
    totalVisitors: number;
    hourlyVisitors: HourlyVisitorsType[];
}

export type HourlyVisitorsType = {
    count: number;
    date: string;
    hour: number; // Fixed (was 'hours') to match your API response
    hourLabel: string;
}