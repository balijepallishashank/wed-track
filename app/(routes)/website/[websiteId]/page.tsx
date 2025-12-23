"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { format } from "date-fns"

import FormInput from "../_components/FormInput"
import PageViewAnalytics from "../_components/PageViewAnalytics"
import SourceWidget from "../_components/SourceWidget"

import { LiveUserType, WebsiteType } from "@/configs/type"
import { WebsiteInfoType } from "@/app/api/website/route"
import DeviceWidget from "../_components/DeviceWidget"
import GeoWidget from "../_components/GeoWidget"

function WebsiteDetail() {
  const { websiteId } = useParams<{ websiteId: string }>()
  const [websiteList, setWebsiteList] = useState<WebsiteType[]>([])
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfoType | null>(null)
  const [loading, setLoading] = useState(false)
  const [liveUser,setLiveUser]=useState<LiveUserType[]>([])

  const [formData, setFormData] = useState({
    analyticType: "hourly",
    fromDate: new Date(),
    toDate: new Date(),
  })

  /* ---------- Load Website ---------- */
  useEffect(() => {
    if (!websiteId) return

    axios
      .get(`/api/analytics?websiteId=${websiteId}&websiteOnly=true`)
      .then((res) => {
        setWebsiteInfo(res.data?.[0])
        setWebsiteList(res.data ? [res.data[0].website] : [])
      })
  }, [websiteId])

  /* ---------- Load Analytics ---------- */
  const loadAnalytics = async () => {
    if (!websiteId) return

    setLoading(true)

    const from = format(formData.fromDate, "yyyy-MM-dd")
    const to = format(formData.toDate, "yyyy-MM-dd")
    const res = await axios.get(`/api/website?websiteId=${websiteId}&from=${from}&to=${to}`
    )

    setWebsiteInfo(res.data?.[0])
    setLoading(false)
    GetLiveUsers();
  }

 const GetLiveUsers = async () => {
        
        const result = await axios.get('/api/live-visitor?websiteId=' + websiteId);
       console.log(result.data);
       console.log(result);
       setLiveUser(result?.data);
    }

  useEffect(() => {
    loadAnalytics()
  }, [formData.fromDate, formData.toDate, formData.analyticType])

  return (
    <div className="mt-10 space-y-5">
      <FormInput
        websiteList={websiteList}
        setFormData={setFormData}
        setReloadData={loadAnalytics}
      />

      <PageViewAnalytics
        websiteInfo={websiteInfo}
        loading={loading}
        analyticType={formData?.analyticType}
        liveUserCount={liveUser?.length}
      />

 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SourceWidget
          websiteAnalytics={websiteInfo?.analytics}
          loading={loading}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
  <SourceWidget
    websiteAnalytics={websiteInfo?.analytics}
    loading={loading}
  />

  <GeoWidget
    websiteAnalytics={websiteInfo?.analytics}
    loading={loading}
  />

  <DeviceWidget
    websiteAnalytics={websiteInfo?.analytics}
    loading={loading}
  />
</div>

    </div>
  )
}

export default WebsiteDetail
