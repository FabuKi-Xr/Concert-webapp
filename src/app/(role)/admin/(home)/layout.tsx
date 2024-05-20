import Navbar from "@/components/admin/navbar"
import NumberCard from "@/components/admin/numberCard"
import { AdminCardDefault } from "@/constants/admin.constants"

export default function AdminHomeLayout({children}:Readonly<{children: React.ReactNode}>){
    return (
        // i want mobile only that use space-y-5
        <div className="admin-page"> 
            <div className="
            w-full md:h-full
            flex mobile:flex-col lg:flex-row md:gap-4
            mobile:space-y-5 sm:space-y-0 md:justify-between ">
                
                {
                    Object.entries(AdminCardDefault).map(([key, value]) => {
                        return <NumberCard key={key} seats={1} title={value.title} color={value.color} icon={value.icon} type={key} />
                    })
                }
            </div>
            <Navbar/>
            {children}
        </div>
    )
}