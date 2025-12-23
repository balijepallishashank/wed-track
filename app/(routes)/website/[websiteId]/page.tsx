"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { format } from "date-fns"

// Component Imports
import FormInput from "./_components/FormInput"
import PageViewAnalytics from "./_components/PageViewAnalytics"
import SourceWidget from "./_components/SourceWidget"
import DeviceWidget from "./_components/DeviceWidget"
import GeoWidget from "./_components/GeoWidget"
import ScriptForm from "./_components/ScriptForm"

// Type Imports
import { LiveUserType, WebsiteType } from "@/configs/type"
import { WebsiteInfoType } from "@/app/api/website/route"

function WebsiteDetail() {
  const { websiteId } = useParams<{ websiteId: string }>()
  
  // State
  const [websiteList, setWebsiteList] = useState<WebsiteType[]>([])
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfoType | null>(null)
  const [loading, setLoading] = useState(false)
  const [liveUser, setLiveUser] = useState<LiveUserType[]>([])

  const [formData, setFormData] = useState({
    analyticType: "hourly",
    fromDate: new Date(),
    toDate: new Date(),
  })

  /* ---------- 1. Load Website List & Initial Data ---------- */
  useEffect(() => {
    if (websiteId) {
        GetWebsiteList();
    }
  }, [websiteId])

  const GetWebsiteList = async () => {
    try {
        const res = await axios.get(`/api/website?websiteId=${websiteId}&websiteOnly=true`);
        const websiteData = res.data;
        setWebsiteList(websiteData ? [websiteData] : []);
    } catch (e) {
        console.error("Error fetching website list:", e);
    }
  }

  /* ---------- 2. Load Analytics on Filter Change ---------- */
  useEffect(() => {
    if(websiteId){
        loadAnalytics();
        
        // Auto-refresh analytics every 30 seconds
        const interval = setInterval(() => {
          loadAnalytics();
        }, 30000);
        
        return () => clearInterval(interval);
    }
  }, [formData.fromDate, formData.toDate, formData.analyticType, websiteId])

  const loadAnalytics = async () => {
    setLoading(true);
    try {
        const from = format(formData.fromDate, "yyyy-MM-dd");
        const to = format(formData.toDate, "yyyy-MM-dd");
        
        const res = await axios.get(
            `/api/website?websiteId=${websiteId}&from=${from}&to=${to}`
        );

        console.log("API Response:", res.data);
        console.log("First item:", res.data?.[0]);
        console.log("Analytics data:", res.data?.[0]?.analytics);
        console.log("Hourly visitors:", res.data?.[0]?.analytics?.hourlyVisitors);
        console.log("Daily visitors:", res.data?.[0]?.analytics?.dailyVisitors);
        
        // The API returns an array, we take the first item
        setWebsiteInfo(res.data?.[0]);
        
        // Also refresh live users
        GetLiveUsers();
    } catch (err) {
        console.error("Error loading analytics:", err);
    } finally {
        setLoading(false);
    }
  }

  /* ---------- 3. Get Live Users ---------- */
  const GetLiveUsers = async () => {
     try {
         const result = await axios.get('/api/live?websiteId=' + websiteId);
         setLiveUser(result?.data);
     } catch (err) {
         console.error("Error loading live users:", err);
     }
  }

  return (
    <div className="mt-10 space-y-5 mb-20">
      <FormInput
        websiteList={websiteList}
        setFormData={setFormData}
        setReloadData={loadAnalytics}
      />
{websiteList.length > 0 && (
        <ScriptForm 
          websiteId={websiteList[0].websiteId} 
          domain={websiteList[0].domain} 
        />
      )}

      
      <PageViewAnalytics
        websiteInfo={websiteInfo}
        loading={loading}
        // @ts-ignore - Ignoring strict type mismatch if analyticType string vs enum differs
        analyticType={formData?.analyticType}
        liveUserCount={liveUser?.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
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