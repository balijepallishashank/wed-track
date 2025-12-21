"use client"

import { Button } from "@/components/ui/button"
import { Link } from "lucide-react";
import Image from "next/image" // Added missing import
import React, { useState } from "react"

function Dashboard() {
    // Initialized as an empty array [] so .length works immediately
    const [websiteList, setWebsiteList] = useState([]); 

    return (
        <div className='mt-8'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-xl'>My Website</h2>
                <Link href={"/dashboard/new"}>
                <Button>+ Website</Button>
                </Link>
            </div>

            {/* Empty State Logic - Must be inside the parent div */}
            {websiteList?.length === 0 && (
                <div className="flex flex-col justify-center items  -center gap-4 p-8 border-dashed rounded-2xl mt-5" >
                    <Image  src={'/website.png'} alt="Website"  width={100} height={100} />
                    <h2> you don't have any websites added for tracking!</h2>
                    <Link href={"/dashboard/new"}>
                    <Button>+ Website</Button>
                    </Link>
                    <div className="mt-4 text-gray-500">
                        <p>No websites found. Add your first one!</p>
                    </div>
                </div>
            )}

            {/* Website List would go here */}
        </div>
    );
}

export default Dashboard;