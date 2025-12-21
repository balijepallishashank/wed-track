"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator' // Ensure this path is correct or use standard HR
import React, { useState } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Globe, Loader2Icon, Plus } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox' // Changed to UI component if available, else keep radix
import { Button } from '@/components/ui/button'
import axios from 'axios'
// 1. FIXED: Correct import for App Router
import { useRouter } from 'next/navigation'
import { toast } from 'sonner' // Optional: For nice error messages

function WebsiteForm() {
    const [domain, setDomain] = useState('');
    const [timeZone, setTimeZone] = useState('');
    const [enableLocalhostTracking, setEnableLocalhostTracking] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // 2. FIXED: Correct usage of router
    const router = useRouter();

    const onFormSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 3. Logic: Ensure https is added only once
            // If user typed "google.com", we send "https://google.com"
            // If they already typed "https://google.com", we don't add it again.
            const finalDomain = domain.includes('http') ? domain : `https://${domain}`;

            const result = await axios.post('/api/website', {
                // Generate ID here or let DB do it. Tutorial usually generates here.
                websiteId: crypto.randomUUID(), 
                domain: finalDomain,
                timeZone: timeZone,
                enableLocalhostTracking: enableLocalhostTracking
            });

            console.log(result.data);
            
            // Check if result has data (Drizzle returns an array usually)
            if (result.data) {
                // Determine the correct ID/Domain to pass
                const responseData = Array.isArray(result.data) ? result.data[0] : result.data;
                
                router.push(`/dashboard/new?step=script&websiteId=${responseData.websiteId}&domain=${responseData.domain}`);
            }

        } catch (error: any) {
            console.error("Error:", error);
            // Show alert or toast
            alert(error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Add Website</CardTitle>
                </CardHeader>
                <Separator className='my-2' /> {/* Used className instead of Radix Separator */}
                <CardContent>
                    <form className='mt-5' onSubmit={onFormSubmit}>
                        
                        {/* Domain Input */}
                        <div className='mb-4'>
                            <label className='text-sm font-medium'>Domain</label>
                            <InputGroup className="mt-1">
                                <InputGroupAddon>
                                    <Globe size={18} />
                                    <span className='text-sm text-gray-500'>https://</span>
                                </InputGroupAddon>
                                <InputGroupInput
                                    type='text'
                                    placeholder="example.com"
                                    required
                                    // 4. FIXED: Do not add 'https://' here repeatedly. Just store the text.
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                />
                            </InputGroup>
                        </div>

                        {/* Timezone Select */}
                        <div className='mt-3'>
                            <label className='text-sm font-medium'>Timezone</label>
                            <Select required onValueChange={(value) => setTimeZone(value)}>
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Select a timezone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Asia</SelectLabel>
                                        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                                        <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                                        {/* Add other timezones as needed */}
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Europe</SelectLabel>
                                        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>North America</SelectLabel>
                                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Checkbox */}
                        <div className='mt-5 flex gap-2 items-center'>
                            {/* Make sure Checkbox is imported from UI or Radix correctly */}
                            <Checkbox 
                                id="localhost-tracking"
                                onCheckedChange={(value) => setEnableLocalhostTracking(value === true)}
                            />
                            <label htmlFor="localhost-tracking" className='text-sm cursor-pointer'>
                                Enable localhost tracking in development
                            </label>
                        </div>

                        {/* Submit Button */}
                        <Button className='mt-5 w-full' disabled={loading} type='submit'>
                            {loading ? <Loader2Icon className='animate-spin mr-2' /> : <Plus className="mr-2"/>}
                            Add Website
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default WebsiteForm