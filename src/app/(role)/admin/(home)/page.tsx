import {ConcertCardDelete} from '@/components/concertCard'
import { DeleteModal } from "@/components/modal";
import { Suspense } from "react";
import { CONCERT_API } from "@/lib/constants";
import { Concert } from "@/lib/type";
import { ToastError, ToastSuccess } from '@/components/toast';
import { redirect } from 'next/navigation';

export type Props = {
    searchParams: Record<string, string> | null | undefined;
}

export default async function Page(props : Props) {
    const { searchParams } = props;
    const showModal = searchParams?.modal === "true";
    const concertId = searchParams?.concertId || "";
    const showToast = searchParams?.toast === "true";
    const isSuccess = searchParams?.success === "true";

    const response = await fetch(CONCERT_API, { cache: "no-cache"})
    const concerts = await response.json() as Concert[];

    const handleDeleteConcert = async() => {
        "use server"
        try {
            const response = await fetch(`${CONCERT_API}/${concertId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok){
                redirect("/admin?toast=true&&success=true");
            }
            else{
                redirect("/admin?toast=true&&success=false");
            }
            
        }
        catch(e){
            throw(e)
        }
        
    }
    
    return (            
            <div>
                {showToast && (
                    <Suspense key={showToast.toString()}>
                        {
                            isSuccess? <ToastSuccess 
                                message='Create successfully'
                                imagesrc='/success.svg'
                                target='/admin'
                            />
                            : <ToastError
                                message='Create failed'
                                imagesrc='/error.svg'
                                target='/admin'
                            />

                        }
                    </Suspense>
                    )
                }

                {
                    concerts.map((concert) => {
                        return <ConcertCardDelete key={concert.id} {...concert} />
                    })
                }
                {showModal && 
                    (<Suspense key={concertId} >
                        <DeleteModal 
                        redirectTarget="/admin"
                        id = {concertId}
                        callback={handleDeleteConcert}
                        />
                    </Suspense>
                    )}
            </div>
    );
}