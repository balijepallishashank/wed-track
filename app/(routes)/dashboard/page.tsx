"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function AddNewWebsite() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onCreateWebsite = async () => {
      // Basic validation
      if(!domain || domain.length < 3) {
        toast.error("Please enter a valid domain");
        return;
      }

      setLoading(true);
      try {
          await axios.post('/api/website', {
              domain: domain,
              active: true 
          });
          toast.success("Website Created Successfully!");
          router.replace('/dashboard');
      } catch(e) {
          console.error(e);
          toast.error("Error creating website");
      } finally {
          setLoading(false);
      }
  }

  return (
    <div className='flex justify-center items-start mt-10'>
      <Card className='w-full max-w-[600px]'>
        <CardHeader>
            <CardTitle className="text-2xl">Add New Website</CardTitle>
            <CardDescription>
                Enter your website domain to start tracking analytics (e.g., example.com)
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className='grid gap-5'>
                <div className='grid gap-2'>
                    <label className='font-semibold text-sm'>Domain Name</label>
                    <Input 
                        placeholder='https://example.com' 
                        value={domain}
                        onChange={(e)=>setDomain(e.target.value)}
                    />
                </div>
                
                <Button 
                    onClick={onCreateWebsite} 
                    disabled={loading}
                    className='w-full'
                >
                    {loading && <Loader2 className='animate-spin mr-2 h-4 w-4' />}
                    Create Website
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddNewWebsite