import Navbar from "./components/navbar"
import NumberCard from "./components/numberCard"
import { AdminCardDefault } from "../constants/admin.constants"

export default function AdminLayout({children}:Readonly<{children: React.ReactNode}>){
    return (
        <div className="mt-16 mx-10 admin-page"> 
            <div className="w-full flex flex-row justify-between">
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