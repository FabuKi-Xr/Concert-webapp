import { headers } from "next/headers";
import "../style/concertCard.css"
import Link from "next/link";
import { Concert } from "@/lib/type";


const ConcertCard = (concert : Concert) => {
    const headersList = headers();
    const pathname = headersList.get("x-pathname");
    
    const url = new URL(pathname ?  pathname : "", "http://localhost:3000")

    url.searchParams.set("modal", "true");
    url.searchParams.set("concertId", concert.id.toString());

    return (
        <div className="admin-concert admin-concert-card card px-10 pt-10 mb-12">
            <p className="admin-concert title">{concert.name}</p>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-300"></hr>
            <p className="admin-concert detail">{concert.description}</p>
            <div className="flex justify-between mt-8 mb-10">
                <div className="flex items-center gap-1">
                    <img src="/person-black.svg" alt="person" width={32} height={32}/>
                    <p className="admin-concert detail">{concert.seats}</p>
                </div>

                <Link className="w-[160px] admin-concert button-delete px-4 py-3 rounded 
                    flex flex-row items-center justify-center" 
                    href={url.toString()}
                    scroll={false}
                >
                    <img src="/bin.svg" alt="delete" width={24} height={24}/>
                    Delete
                </Link>
                
            </div>
            
        </div>
    );
};

export default ConcertCard;