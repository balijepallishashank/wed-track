import React from "react"
import { analyticsType } from "@/app/api/website/route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// Configuration for colors and labels
const chartConfig = {
  devices: {
    label: "Devices",
    color: "hsl(var(--chart-1))",
  },
  os: {
    label: "OS",
    color: "hsl(var(--chart-2))",
  },
  browsers: {
    label: "Browsers",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

// Custom Label Component to render Image + Text inside the Bar
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
        fill="#ffffff" // White text for visibility on colored bars
        fontWeight={500}
      >
        {payload.name}
      </text>
    </g>
  )
}

function DeviceWidget({ websiteAnalytics, loading }: Props) {
  if (loading) return <div className="h-64 bg-slate-100 rounded-lg animate-pulse"></div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="devices" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="os">OS</TabsTrigger>
            <TabsTrigger value="browsers">Browsers</TabsTrigger>
          </TabsList>

          {/* DEVICES TAB */}
          <TabsContent value="devices">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart
                accessibilityLayer
                data={websiteAnalytics?.devices || []}
                layout="vertical"
                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis dataKey="name" type="category" hide width={100} />
                <XAxis type="number" hide />
                <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                <Bar
                  dataKey="uv"
                  layout="vertical"
                  fill="var(--color-devices)"
                  radius={4}
                  barSize={32}
                >
                  <LabelList content={<BarLabelWithImage />} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </TabsContent>

          {/* OS TAB */}
          <TabsContent value="os">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart
                accessibilityLayer
                data={websiteAnalytics?.os || []}
                layout="vertical"
                margin={{ left: 0, right: 0 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis dataKey="name" type="category" hide />
                <XAxis type="number" hide />
                <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                <Bar
                  dataKey="uv"
                  layout="vertical"
                  fill="var(--color-os)"
                  radius={4}
                  barSize={32}
                >
                  <LabelList content={<BarLabelWithImage />} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </TabsContent>

          {/* BROWSERS TAB */}
          <TabsContent value="browsers">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart
                accessibilityLayer
                data={websiteAnalytics?.browsers || []}
                layout="vertical"
                margin={{ left: 0, right: 0 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis dataKey="name" type="category" hide />
                <XAxis type="number" hide />
                <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                <Bar
                  dataKey="uv"
                  layout="vertical"
                  fill="var(--color-browsers)"
                  radius={4}
                  barSize={32}
                >
                  <LabelList content={<BarLabelWithImage />} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default DeviceWidget