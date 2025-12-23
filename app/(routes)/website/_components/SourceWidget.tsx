"use client"

import React from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
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
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  LabelList,
} from "recharts"

type Props = {
  websiteAnalytics: any
  loading: boolean
}

const chartConfig = {
  countries: {
    label: "Countries",
    color: "var(--chart-2)",
  },
  devices: {
    label: "Devices",
    color: "var(--chart-3)",
  },
  browsers: {
    label: "Browsers",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const BarLabelWithImage = (props: any) => {
  const { x, y, height, payload } = props
  if (!payload) return null
  return (
    <g transform={`translate(${x + 8}, ${y + height / 2 - 8})`}>
      {payload.image && <image href={payload.image} width={16} height={16} />}
      <text x={22} y={12} fontSize={12} fill="#ffffff">
        {payload.name}
      </text>
    </g>
  )
}

function SourceWidget({ websiteAnalytics, loading }: Props) {
  if (loading) return null

  return (
    <div className="mt-5">
      <Card>
        <CardContent className="p-5">
          <Tabs defaultValue="countries" className="w-full">
            <TabsList>
              <TabsTrigger value="countries">Countries</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="browsers">Browsers</TabsTrigger>
            </TabsList>

            {/* COUNTRIES */}
            <TabsContent value="countries">
              <ChartContainer config={chartConfig.countries} className="h-64 w-full">
                <BarChart
                  data={websiteAnalytics?.countries || []}
                  layout="vertical"
                  margin={{ right: 16 }}
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis type="category" hide />
                  <XAxis type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="visitors"
                    radius={6}
                    fill="var(--color-primary)"
                  >
                    <LabelList content={<BarLabelWithImage />} />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </TabsContent>

            {/* DEVICES */}
            <TabsContent value="devices">
              <ChartContainer config={chartConfig.devices} className="h-64 w-full">
                <BarChart
                  data={websiteAnalytics?.devices || []}
                  layout="vertical"
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis type="category" hide />
                  <XAxis type="number" hide />
                  <Bar
                    dataKey="visitors"
                    radius={6}
                    fill="var(--color-primary)"
                  >
                    <LabelList content={<BarLabelWithImage />} />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </TabsContent>

            {/* BROWSERS */}
            <TabsContent value="browsers">
              <ChartContainer config={chartConfig.browsers} className="h-64 w-full">
                <BarChart
                  data={websiteAnalytics?.browsers || []}
                  layout="vertical"
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis type="category" hide />
                  <XAxis type="number" hide />
                  <Bar
                    dataKey="visitors"
                    radius={6}
                    fill="var(--color-primary)"
                  >
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
