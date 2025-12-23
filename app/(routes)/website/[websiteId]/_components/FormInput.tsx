"use client"

import React, { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { WebsiteType } from "@/configs/type"
import { useParams, useRouter } from "next/navigation"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Link, RefreshCcw, Settings } from "lucide-react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  websiteList: WebsiteType[]
  setFormData: any
  setReloadData: any
}

function FormInput({ websiteList, setFormData, setReloadData }: Props) {
  const params = useParams()
  const router = useRouter()
  const websiteId = params?.websiteId as string

  const today = new Date()
  const [analyticsType, setAnalytic] = useState<string>("hourly")

  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
  })

  const handleDateChange = (range?: DateRange) => {
    if (!range?.from) return
    setDate(range)
  }

  const handleToday = () => {
    setDate({ from: today })
  }

  const handleReset = () => {
    setDate({ from: today })
  }

  // 🔑 Update parent whenever filters change
  useEffect(() => {
    setFormData({
      analyticsType,
      fromDate: date?.from ?? today,
      toDate: date?.to ?? today,
    })
  }, [analyticsType, date])

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-3">
        {/* Website Select */}
        <Select
          value={websiteId || ""}
          onValueChange={(v) => router.push("/dashboard/website/" + v)}
        >
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Select a Website" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Websites</SelectLabel>
              {websiteList?.map((website, index) => (
                <SelectItem key={index} value={website.websiteId}>
                  {website.domain.replace("https://", "")}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`justify-start text-left font-normal ${
                date?.to ? "w-[320px]" : "w-[220px]"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "PPP")} - {format(date.to, "PPP")}
                  </>
                ) : (
                  format(date.from, "PPP")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <div className="flex justify-between items-center my-3 px-2">
              <Button variant="outline" onClick={handleToday}>
                Today
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>

            <Calendar
              mode="range"
              selected={date}
              onSelect={handleDateChange}
              className="w-[280px]"
            />
          </PopoverContent>
        </Popover>

        {/* Analytics Type */}
        <Select value={analyticsType} onValueChange={setAnalytic}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => setReloadData(true)}>
          <RefreshCcw />
        </Button>
      </div>
      <Link href={'/dashboard/website/'+websiteId+'/settings'}>
      <Button variant="outline">
        <Settings />
      </Button>
      </Link>
    </div>
  )
}

export default FormInput
