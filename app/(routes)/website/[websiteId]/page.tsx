"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import FormInput from "../_components/FormInput"
import PageViewAnalytics from "../_components/PageViewAnalytics"


import { WebsiteType } from "@/configs/type"
import { WebsiteInfoType } from "@/app/api/website/route"
import { format } from "date-fns"
import SourceWidget from "../_components/SourceWidget"

function WebsiteDetail() {
  const { websiteId } = useParams()

  const [websiteList, setWebsiteList] = useState<WebsiteType[]>([])
  const [loading, setLoading] = useState(false)
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfoType | null>(null)

  const [formData, setFormData] = useState({
    analyticType: "hourly",
    fromDate: new Date(),
    toDate: new Date(),
  })

  useEffect(() => {
    websiteId && GetWebsiteList()
  }, [websiteId])

  const GetWebsiteList = async () => {
    const websites = await axios.get(
      `/api/analytics?websiteId=${websiteId}&websiteOnly=true`
    )

    setWebsiteInfo(websites?.data?.[0])
    setWebsiteList(websites?.data ? [websites.data[0]] : [])
  }

  const GetWebsiteAnalyticalDetail = async () => {
    setLoading(true)

    const fromDate = format(formData.fromDate, "yyyy-MM-dd")
    const toDate = format(formData.toDate, "yyyy-MM-dd")

    const result = await axios.get(
      `/api/website?websiteId=${websiteId}&from=${fromDate}&to=${toDate}`
    )

    setWebsiteInfo(result?.data?.[0])
    setLoading(false)
  }

  useEffect(() => {
    GetWebsiteAnalyticalDetail()
  }, [formData.fromDate, formData.toDate, formData.analyticType])

  return (
    <div className="mt-10">
      <FormInput
        websiteList={websiteList}
        setFormData={setFormData}
        setReloadData={() => GetWebsiteAnalyticalDetail}
      />

      <PageViewAnalytics
        websiteInfo={websiteInfo}
        loading={loading}
        analyticType={formData.analyticType}
      />
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>

   <SourceWidget websiteAnalytics={websiteInfo?.analytics}
  loading={loading}
/>


    </div>
    
    
    </div>


  )
}

export default WebsiteDetail
