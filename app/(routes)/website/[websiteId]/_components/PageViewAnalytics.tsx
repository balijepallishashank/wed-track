import { WebsiteInfoType } from "@/app/api/website/route"
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import LabelCountItem from "./LabelCountItem"
import { Separator } from "@radix-ui/react-separator"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  websiteInfo: WebsiteInfoType | undefined | null
  loading?: boolean
  analyticType: string
  liveUserCount:number
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

function PageViewAnalytics({
  websiteInfo,
  loading,
  analyticType,liveUserCount
}: Props) {
  const webAnalytics = websiteInfo?.analytics

  console.log("PageViewAnalytics - websiteInfo:", websiteInfo);
  console.log("PageViewAnalytics - webAnalytics:", webAnalytics);
  console.log("PageViewAnalytics - analyticType:", analyticType);
  console.log("PageViewAnalytics - Chart data:", 
    analyticType === "hourly" ? webAnalytics?.hourlyVisitors : webAnalytics?.dailyVisitors
  );

  return (
    <div className="mt-7">
      {!loading ? (
        <Card>
          {/* TOP STATS */}
          <CardContent className="p-5 flex items-center gap-6">
            <LabelCountItem
              label="Visitors"
              value={webAnalytics?.totalVisitors}
            />
            <Separator orientation="vertical" className="h-12" />

            <LabelCountItem
              label="Total Page Views"
              value={webAnalytics?.totalSessions}
            />
            <Separator orientation="vertical" className="h-12" />

            <LabelCountItem
              label="Total Active Time"
              value={
                (Number(webAnalytics?.totalActiveTime) / 60).toFixed(1) + " min"
              }
            />
            <Separator orientation="vertical" className="h-12" />

            <LabelCountItem
              label="Avg Active Time"
              value={
                (Number(webAnalytics?.avgActiveTime) / 60).toFixed(1) + " min"
              }
            />
            <Separator orientation="vertical" className="h-12" />

            <LabelCountItem label="Live Users" value={liveUserCount ?? 0} />
          </CardContent>

          {/* CHART */}
          <CardContent className="p-5 mt-5">
            <ChartContainer config={chartConfig} className="h-96 w-full">
              <AreaChart
                accessibilityLayer
                data={
                  analyticType === "hourly"
                    ? webAnalytics?.hourlyVisitors
                    : webAnalytics?.dailyVisitors
                }
                margin={{
                  left: 12,
                  right: 12,
                  top: 12,
                  bottom: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={analyticType === "hourly" ? "hourLabel" : "date"}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  width={25}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="count"
                  type="monotone"
                  fill="var(--color-primary)"
                  fillOpacity={0.4}
                  stroke="var(--color-primary)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className="w-full h-80 rounded-2xl" />
      )}
    </div>
  )
}

export default PageViewAnalytics
