import { headers } from "next/headers";
import "../style/concertCard.css"
import Link from "next/link";

const ConcertCard = ({...props}) => {
    const headersList = headers();
    const pathname = headersList.get("x-pathname");
    console.log(pathname)
    const url = new URL(pathname ?  pathname : "", "http://localhost:3000")

    url.searchParams.set("modal", "true");
    url.searchParams.set("concertId", "1");

    return (
        <div className="admin-concert admin-concert-card card px-10 pt-10 mb-12">
            <p className="admin-concert title">Concert Name 1</p>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-300"></hr>
            <p className="admin-concert detail">Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. 
                Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. 
                Blandit ut purus nunc sed donec commodo morbi diam scelerisque.</p>
            <div className="flex justify-between mt-8 mb-10">
                <div className="flex items-center gap-1">
                    <img src="/person-black.svg" alt="person" width={32} height={32}/>
                    <p className="admin-concert detail">500</p>
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