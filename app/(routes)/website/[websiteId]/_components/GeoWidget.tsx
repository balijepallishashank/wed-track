import React from "react"
import { analyticsType } from "@/app/api/website/route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  websiteAnalytics: analyticsType | undefined
  loading: boolean
}

const chartConfig = {
  countries: {
    label: "Countries",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

const BarLabelWithImage = (props: any) => {
  const { x, y, height, payload } = props
  if (!payload) return null
  return (
    <g transform={`translate(${x + 12}, ${y + height / 2 + 4})`}>
      {payload.image && (
        <image 
            href={payload.image} 
            x={0} 
            y={-10} 
            width={16} 
            height={16} 
        />
      )}
      <text 
        x={24} 
        y={3} 
        fontSize={12} 
        fill="#ffffff" 
        fontWeight={500}
      >
        {payload.name}
      </text>
    </g>
  )
}

function GeoWidget({ websiteAnalytics, loading }: Props) {
  if (loading) return <div className="h-64 bg-slate-100 rounded-lg animate-pulse"></div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Countries</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart
            accessibilityLayer
            data={websiteAnalytics?.countries || []}
            layout="vertical"
            margin={{ left: 0, right: 0 }}
            >
            <CartesianGrid horizontal={false} />
            <YAxis dataKey="name" type="category" hide />
            <XAxis type="number" hide />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar
                dataKey="uv" // Fixed: API uses 'uv'
                layout="vertical"
                fill="var(--color-countries)"
                radius={4}
                barSize={32}
            >
                <LabelList content={<BarLabelWithImage />} />
            </Bar>
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default GeoWidget