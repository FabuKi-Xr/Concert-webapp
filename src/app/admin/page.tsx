import ConcertCard from '@/app/admin/components/concertCard'
import Modal from "@/components/modal";
import { Suspense } from "react";
import { CONCERT_API } from "@/lib/constants";
import { Concert } from "@/lib/type";

export type Props = {
    searchParams: Record<string, string> | null | undefined;
}

export default async function Page(props : Props) {
    const { searchParams } = props;
    const showModal = searchParams?.modal === "true";
    const concertId = searchParams?.concertId;
    
    const response = await fetch(CONCERT_API, { cache: "no-cache"})
    const concerts = await response.json() as Concert[];
    return (            
            <div>
                {
                    concerts.map((concert) => {
                        return <ConcertCard key={concert.id} {...concert} />
                    })
                }
                {showModal && 
                    (<Suspense key={concertId} >
                        <Modal 
                        title={`Are you sure to delete? “Concert Name 2”`}
                        firstButton="Cancel"
                        secondButton="Yes, Delete"
                        id = {concertId}
                        />
                    </Suspense>
                    )}
            </div>
    );
}