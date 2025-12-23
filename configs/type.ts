// configs/type.ts

export type CountItemType = {
  name: string
  visitors: number
  image?: string
}

export type HourlyVisitorType = {
  date: string
  hour: number
  hourLabel: string
  count: number
}

export type AnalyticsType = {
  last24hVisitors: number
  totalSessions: number
  totalActiveTime: number
  avgActiveTime: number

  hourlyVisitors: HourlyVisitorType[]
  dailyVisitors: HourlyVisitorType[]

  countries: CountItemType[]
  cities: CountItemType[]
  regions: CountItemType[]
  devices: CountItemType[]
  os: CountItemType[]
  browsers: CountItemType[]
}

export type WebsiteType = {
  id: number
  websiteId: string
  domain: string
  timeZone: string
  enableLocalhostTracking: boolean
  userEmail: string
}

export type WebsiteInfoType = {
  website: WebsiteType
  analytics: AnalyticsType
}
