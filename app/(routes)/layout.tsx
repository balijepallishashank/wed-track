import React from "react"

 function DashboardProvider({children}: {children: React.ReactNode}){
    return ( <div><DashboardProvider>{children}</DashboardProvider>
    </div>
 )}

 export default DashboardProvider