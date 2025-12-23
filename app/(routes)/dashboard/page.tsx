"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Globe, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'

interface Website {
  id: number
  websiteId: string
  domain: string
  timeZone: string
  enableLocalhostTracking: boolean
  userEmail: string
}

function Dashboard() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWebsites()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchWebsites()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchWebsites = async () => {
    try {
      const res = await axios.get('/api/website?websiteOnly=true')
      setWebsites(res.data || [])
    } catch (error) {
      console.error('Error fetching websites:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mt-10'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <p className='text-gray-500 mt-1'>Manage your websites and analytics</p>
        </div>
        <Link href='/dashboard/new'>
          <Button>
            <Plus className='h-4 w-4 mr-2' />
            Add Website
          </Button>
        </Link>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-4 w-1/2 mt-2' />
              </CardHeader>
            </Card>
          ))
        ) : websites.length === 0 ? (
          <Card className='col-span-full'>
            <CardHeader>
              <CardTitle>Your Websites</CardTitle>
              <CardDescription>
                Track and analyze your website performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-gray-500 text-sm'>
                No websites yet. Click "Add Website" to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          websites.map((website) => (
            <Link href={`/website/${website.websiteId}`} key={website.id}>
              <Card className='hover:shadow-lg transition-shadow cursor-pointer h-full'>
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-2'>
                      <Globe className='h-5 w-5 text-blue-500' />
                      <CardTitle className='text-lg'>{website.domain}</CardTitle>
                    </div>
                    <ExternalLink className='h-4 w-4 text-gray-400' />
                  </div>
                  <CardDescription className='text-xs'>
                    {website.timeZone}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard