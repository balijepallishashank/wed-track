"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AnalyticsType } from "@/configs/type"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

type Props = {
  analytics?: AnalyticsType
}

const chartConfig = {
  visitors: {
    label: <span>Visitors</span>,
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function DeviceWidget({ analytics }: Props) {
  if (!analytics?.devices?.length) return null

  return (
    <Card>
      <CardContent className="p-5">
        <ChartContainer config={chartConfig} className="h-64">
          <BarChart data={analytics.devices} layout="vertical">
            <CartesianGrid horizontal={false} />
            <YAxis type="category" hide />
            <XAxis type="number" hide />
            <Bar dataKey="visitors" radius={6}>
              <LabelList dataKey="name" position="insideLeft" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
