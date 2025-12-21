"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@radix-ui/react-separator'
import React, { use, useState } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
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

import { Globe, Loader2Icon, Plus, Search } from 'lucide-react'
import { Checkbox } from '@radix-ui/react-checkbox'
import { Button } from '@/components/ui/button'
import { boolean } from 'drizzle-orm/gel-core'
import axios from 'axios'
import { useRouter } from 'next/router'

function WebsiteForm() {
    const[domain,setDomain]=useState('');
    const [timeZone,setTimeZone]=useState('');
    const[enableLocalhostTracking,setEnableLocalhostTracking]=useState(false);
    const[Loading,setLoading]=useState(false);
    const router =useRouter();


    const onFormSubmit = async (e:any) => {
        e.preventDefault();

        console.log({timeZone,domain,enableLocalhostTracking});
        setLoading(true);
        const websiteId=crypto.randomUUID();
        const result=await axios.post('/api/website',{
            websiteId:websiteId,
            domain:domain,
            timeZone:timeZone,
            enableLocalhostTracking:enableLocalhostTracking
        })
        console.log(result.data);
        if(result.data.data){
            router.push('/dashboard/new?step=script&websiteId='+result?.data?.data?.websiteId+'&domain='+result?.data?.data?.domain);

        }
        else if(result?.data?.message){
            router.push('/dashboard/new?step=script&websiteId='+websiteId);

        }
        else{
            alert(result?.data?.message);
        }
        setLoading(false);
    }
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Add Website</CardTitle>
            </CardHeader>
            <Separator/>
            <CardContent>
                    <form className='mt-5' onSubmit={(e) =>onFormSubmit(e)}> 
                        <label className='text-sm'>Domain</label>
                  <InputGroup>
        <InputGroupInput type='text' 
        placeholder="mywebsite.com"  required
        onChange={(e)=>setDomain('https://' + e.target.value)}/>
        <InputGroupAddon>
           <Globe />
           <span>https://</span>
        </InputGroupAddon>
      </InputGroup>
      <div className='mt-3'>
        <label className='text-sm'>Timezone</label>
         <Select required onValueChange={(value)=>setTimeZone(value)}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
          <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
          <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe & Africa</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
          <SelectItem value="west">
            Western European Summer Time (WEST)
          </SelectItem>
          <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
          <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
          <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
          <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
          <SelectItem value="ist_indonesia">
            Indonesia Central Standard Time (WITA)
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Australia & Pacific</SelectLabel>
          <SelectItem value="awst">
            Australian Western Standard Time (AWST)
          </SelectItem>
          <SelectItem value="acst">
            Australian Central Standard Time (ACST)
          </SelectItem>
          <SelectItem value="aest">
            Australian Eastern Standard Time (AEST)
          </SelectItem>
          <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
          <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>South America</SelectLabel>
          <SelectItem value="art">Argentina Time (ART)</SelectItem>
          <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
          <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
          <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <div className='mt-3 flex gap-2 items-center'>
        <Checkbox onCheckedChange={(value)=>setEnableLocalhostTracking(value == true)}/> <span className='ml-2 text-sm'>Enable localhost tracking in development</span>
            
        
    </div>
    <Button className='mt-5 w-full' disabled={Loading} type='submit'>
        {Loading ? <Loader2Icon className='animate-spin' /> : <Plus/> }
        Add Website </Button>
      </div>
      
                    </form>
  
            </CardContent>
        </Card>
    </div>
  )
}

export default WebsiteForm