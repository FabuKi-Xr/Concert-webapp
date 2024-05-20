import { headers } from "next/headers";
import "@/styles/admin/concertCard.css"
import Link from "next/link";
import { Concert } from "@/lib/type";
import Image from "next/image";
import { CONCERT_ACTION } from "@/constants";

interface ConcertCardProps extends Concert{
    icon: string;
    bgcolor: string;
    color: string;
    message: string;
    modalType: string;
}

const ConcertCardDelete = (props : Concert) => {
    return <ConcertCard {...props} icon="/bin.svg" 
        bgcolor="#E84E4E" color="white" 
        message="Delete"
        modalType="delete"
    />;
}

const ConcertCardCancel = (props : Concert) => {
    return <ConcertCard {...props} icon="" 
        bgcolor="#E84E4E" color="white" 
        message="Cancel"
        modalType={CONCERT_ACTION.CANCEL}
    />;
}

const ConcertCardReserve = (props : Concert) => {
    return <ConcertCard {...props} icon="" 
        bgcolor="#1692EC" color="white" 
        message="Reserve"
        modalType={CONCERT_ACTION.RESERVE}
    />;
}


const ConcertCard = ({...props}: ConcertCardProps) => {
    const headersList = headers();
    const pathname = headersList.get("x-pathname");
    
    const url = new URL(pathname ?  pathname : "", "http://localhost:3000")

    url.searchParams.set("modal", "true");
    url.searchParams.set("modalType", props.modalType);
    url.searchParams.set("concertId", props.id.toString());

    return (
        <div className="admin-concert admin-concert-card card px-10 pt-10 mb-12">
            <p className="admin-concert title mobile:text-xl sm:text-2xl md:text-4xl ">{props.name}</p>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-300"></hr>
            <p className="admin-concert detail mobile:text-sm md:text-base lg:text-xl">{props.description}</p>
            <div className="flex mobile:flex-col sm:flex-row md:justify-between mt-8 mb-10 
                mobile:space-y-2 sm:space-y-0 mobile:items-start sm:items-center">
                <div className="flex items-center mobile:gap-0 md:gap-1">
                    <Image src="/person-black.svg" alt="person" width={32} height={32}/>
                    <p className="admin-concert detail mobile:text-xs sm:text-lg">{props.seats}</p>
                </div>

                <Link className="mobile:w-full sm:w-[160px]  admin-concert mobile:gap-0 md:gap-3 
                    mobile:py-2 sm:px-4 sm:py-4 
                    font-medium rounded mobile:text-sm md:text-lg
                    flex flex-row items-center justify-center" 
                    style={{backgroundColor: props.bgcolor, color: props.color}}
                    href={url.toString() }
                    scroll={false}
                >
                    {
                        props.icon ? 
                        <Image src={props.icon} alt={props.modalType} width={24} height={24}/> : null
                    }
                    {
                        props.message
                    }
                </Link>
                
            </div>
            
        </div>
    );
};

export {ConcertCardDelete, ConcertCardCancel, ConcertCardReserve};