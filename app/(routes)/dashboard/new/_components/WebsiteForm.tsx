"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

function WebsiteForm() {
  const router = useRouter()

  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)

  const onCreateWebsite = async () => {
    setLoading(true)

    try {
      await axios.post("/api/website", {
        domain: domain,
        websiteId: crypto.randomUUID(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        enableLocalhostTracking: true,
      })

      router.push("/dashboard")
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <div className="max-w-xl">
      <h2 className="font-bold text-2xl mb-2">Add New Website</h2>
      <p className="text-gray-500 mb-6">
        Add your website domain to start tracking analytics
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <Label>Website Domain</Label>
          <Input
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>

        <Button
          disabled={!domain || loading}
          onClick={onCreateWebsite}
        >
          {loading ? "Creating..." : "Create Website"}
        </Button>
      </div>
    </div>
  )
}

export default WebsiteForm
