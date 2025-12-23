"use client"
import { BarChart, LayoutGrid, Plus, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard' // Matches app/(routes)/dashboard/page.tsx
    },
    {
      id: 2,
      name: 'Add Website',
      icon: Plus,
      path: '/website/new' // Matches app/(routes)/website/new/page.tsx
    },
    {
      id: 3,
      name: 'Analytics',
      icon: BarChart,
      path: '/website' // This might need a specific ID, but linking to root /website is fine for now
    },
    {
      id: 4,
      name: 'Settings',
      icon: Settings,
      path: '/settings' // Matches app/(routes)/settings/page.tsx
    }
  ]
  
  const path = usePathname();

  return (
    <div className='h-screen p-5 border-b bg-white'>
      <div className='flex items-center gap-2 mb-10'>
         {/* You can add your logo image here */}
         <h2 className='font-bold text-2xl text-primary'>WebTrack</h2>
      </div>

      <div className='flex flex-col gap-2'>
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-all 
              ${path === menu.path ? 'bg-primary text-white' : 'text-gray-700'}
            `}>
              <menu.icon className="h-5 w-5" />
              <h2 className='text-lg'>{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SideNav