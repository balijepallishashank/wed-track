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
    totalSessions: number; 
    totalVisitors: number;
    hourlyVisitors: HourlyVisitorsType[];
    dailyVisitors: DailyVisitorsType[];
}

export type HourlyVisitorsType = {
    count: number;
    date: string;
    hour: number; 
    hourLabel: string;
}
export type DailyVisitorsType={
  date:string,
  count:number
}