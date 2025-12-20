"use client"
import React from "react"
import AppHeader from "../_components/AppHeader"

 function DashboardProvider({children}: {children: React.ReactNode}){
    return ( <div className='px-10 md:px-20 lg:px-36 xl:px-48'>
        <AppHeader />
        {children}
    </div>
 )}

 export default DashboardProvider