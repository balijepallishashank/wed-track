import { ArrowLeft } from 'lucide-react';
import React from 'react'
import { Button } from '@/components/ui/button';
import WebsiteForm from './_components/WebsiteForm';

function AddWebsite(){

return(
    <div className='flex flex-col justify-center items-center mt-10'>
        <div className='max-w-lg flex flex-col items-start w-full'>
            <Button variant={'outline'}> <ArrowLeft/>Dashboard</Button>
        </div>
        <div className='mt-10 w-full max-w-lg'>
            <WebsiteForm />
        </div>
    </div>

)
}
export default AddWebsite;