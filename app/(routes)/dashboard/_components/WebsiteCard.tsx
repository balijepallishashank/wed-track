"use client"

import { WebsiteInfoType } from "@/app/api/website/route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Globe, Link } from "lucide-react"
import React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

type Props = {
  websiteInfo: WebsiteInfoType
}

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

function WebsiteCard({ websiteInfo }: Props) {
  const chartData = websiteInfo.analytics.hourlyVisitors

  return (
    <Link href={'/dashboard/website/'+websiteInfo?.website?.websiteId}>
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex gap-2 items-center">
            <Globe className="h-8 w-8 p-2 rounded-md bg-primary text-white" />
            <h2 className="font-bold text-lg">
              {websiteInfo.website.domain.replace("https://", "")}
            </h2>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-20 w-full">
          <AreaChart 
          data={chartData}>
          accessibilityLayer
          margin={{
            left:12,
            right:12,
            top:8,
            bottom:8,
          }}
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hourLabel"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="count"
              type="natural"
              fill="var(--color-primary)"
              fillOpacity={0.4}
              stroke="var(--color-primary)"
            />
          </AreaChart>
        </ChartContainer>

        <h2 className="text-sm mt-2">
          <strong>{websiteInfo.analytics.totalVisitors}</strong> Visitors
        </h2>
      </CardContent>
    </Card>
    </Link>
  )
}

export default WebsiteCard
