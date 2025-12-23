import React from 'react'
import { analyticsType } from '@/app/api/website/route'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
    websiteAnalytics: analyticsType | undefined
    loading: boolean
}

function SourceWidget({ websiteAnalytics, loading }: Props) {
    const sourceList = websiteAnalytics?.referrals || []
    const pageList = websiteAnalytics?.urls || []

    if (loading) return <Skeleton className="h-64 w-full rounded-xl" />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Sources & Pages</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
                {/* Referrers List */}
                <div>
                    <h3 className='text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider'>Top Referrers</h3>
                    <div className='space-y-2'>
                        {sourceList.length > 0 ? sourceList.slice(0, 5).map((item, index) => (
                            <div key={index} className='flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition-colors border'>
                                <div className='flex items-center gap-2 overflow-hidden'>
                                    <img 
                                        src={`https://icons.duckduckgo.com/ip3/${item.domainName}.ico`} 
                                        alt="icon" 
                                        className='w-5 h-5 flex-shrink-0'
                                        onError={(e) => e.currentTarget.src = '/globe.png'} 
                                    />
                                    <span className='text-sm font-medium truncate'>{item.name}</span>
                                </div>
                                <span className='text-sm font-bold bg-slate-100 px-2 py-1 rounded'>{item.uv}</span>
                            </div>
                        )) : <p className='text-sm text-gray-400'>No referral data</p>}
                    </div>
                </div>

                {/* Top Pages List */}
                <div>
                    <h3 className='text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider'>Top Pages</h3>
                    <div className='space-y-2'>
                        {pageList.length > 0 ? pageList.slice(0, 5).map((item, index) => (
                            <div key={index} className='flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition-colors border'>
                                <span className='text-xs font-mono text-blue-600 truncate max-w-[70%]'>{item.name}</span>
                                <span className='text-sm font-bold bg-slate-100 px-2 py-1 rounded'>{item.uv}</span>
                            </div>
                        )) : <p className='text-sm text-gray-400'>No page view data</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SourceWidget