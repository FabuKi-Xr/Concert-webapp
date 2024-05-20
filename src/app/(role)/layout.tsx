import Sidebar from "@/components/sidebar";


export default function AdminLayout({children}:Readonly<{children: React.ReactNode}>){
    return (
        <div > 
            <Sidebar/>
            <main className="mobile:ml-[60px] md:ml-[240px] pt-16 px-10">
                {children}
            </main>
        </div>
    )
}