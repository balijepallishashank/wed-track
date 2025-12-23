"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AnalyticsType } from "@/configs/type"
import React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type Props = {
  websiteAnalytics: AnalyticsType | undefined
  loading: boolean
}


const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

/* ---------- LABEL WITH IMAGE + TEXT ---------- */
const BarLabelWithImage = (props: any) => {
  const { x, y, height, payload } = props
  if (!payload) return null

  return (
    <g transform={`translate(${x + 8}, ${y + height / 2 - 8})`}>
      {payload.image && (
        <image href={payload.image} width={16} height={16} />
      )}
      <text x={22} y={12} fontSize={12} fill="#fff">
        {payload.name}
      </text>
    </g>
  )
}

function SourceWidget({ websiteAnalytics, loading }: Props) {
  if (loading || !websiteAnalytics) return null

  return (
    <div className="mt-5">
      <Card>
        <CardContent className="p-5">
          <Tabs defaultValue="countries">
            <TabsList>
              <TabsTrigger value="countries">Countries</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="browsers">Browsers</TabsTrigger>
            </TabsList>

            {/* COUNTRIES */}
            <TabsContent value="countries">
              <ChartContainer config={chartConfig} className="h-64">
                <BarChart data={websiteAnalytics.countries} layout="vertical">
                  <CartesianGrid horizontal={false} />
                  <YAxis type="category" hide />
                  <XAxis type="number" hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="visitors" radius={6} fill="var(--color-primary)">
                    <LabelList content={<BarLabelWithImage />} />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </TabsContent>

            {/* DEVICES */}
            <TabsContent value="devices">
              <ChartContainer config={chartConfig} className="h-64">
                <BarChart data={websiteAnalytics.devices} layout="vertical">
                  <CartesianGrid horizontal={false} />
                  <YAxis type="category" hide />
                  <XAxis type="number" hide />
                  <Bar dataKey="visitors" radius={6} fill="var(--color-primary)">
                    <LabelList content={<BarLabelWithImage />} />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </TabsContent>

            {/* BROWSERS */}
            <TabsContent value="browsers">
              <ChartContainer config={chartConfig} className="h-64">
                <BarChart data={websiteAnalytics.browsers} layout="vertical">
                  <CartesianGrid horizontal={false} />
                  <YAxis type="category" hide />
                  <XAxis type="number" hide />
                  <Bar dataKey="visitors" radius={6} fill="var(--color-primary)">
                    <LabelList content={<BarLabelWithImage />} />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default SourceWidget
