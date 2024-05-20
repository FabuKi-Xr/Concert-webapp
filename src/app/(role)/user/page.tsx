import {ConcertCardCancel, ConcertCardDelete, ConcertCardReserve} from '@/components/concertCard';
import { CancelModal, DeleteModal, ReserveModal } from '@/components/modal';import { ToastError, ToastSuccess } from '@/components/toast';
 '@/components/modal';
import { CONCERT_ACTION } from '@/constants';
import { CONCERT_API } from '@/lib/constants';
import { dateInDdMmYyyyHhMmSs } from '@/lib/datetime';
import { Concert, ReserveConcertCardData, ReserveConcertResponseData } from '@/lib/type';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import React, { Suspense } from 'react';

export type Props = {
    searchParams: Record<string, string> | null | undefined;
}

export default async function Page(props : Props) {
    const cookieStore = cookies()
    const userId = cookieStore.get("userId")
    if (!userId) {
        redirect("/")
    }

    const { searchParams } = props;
    const showModal = searchParams?.modal === "true";
    const modalType = searchParams?.modalType || "";
    const concertId = searchParams?.concertId || "";
    const showToast = searchParams?.toast === "true";
    const isSuccess = searchParams?.success === "true";


    const concertData = await fetch(`${CONCERT_API}`, {next: {revalidate : 60* 0 }})

    const reserveData = await  fetch(`${CONCERT_API}/transaction/${userId.value}`, {next: {revalidate : 60* 0 }})

    const concerts = await concertData.json()

    const userReserve = await reserveData.json() as ReserveConcertResponseData[]

    const renderConcert:ReserveConcertCardData[] = concerts.map((concert : Concert) => {
        const reserve = userReserve.find((reserve) => reserve.concertName === concert.name)
        return {
            ...concert,
            action: reserve ? reserve.action : CONCERT_ACTION.NULL
        }
    })

    const handleReserveConcert = async() => {
        "use server"
        try {
            const { searchParams } = props;
            const id = searchParams?.concertId || "";

            const concertResponse = await fetch(`${CONCERT_API}?id=${id}`, {next: {revalidate : 60* 0 }})
            const concertData = await concertResponse.json() as Concert

            const body = JSON.stringify({
                concertName: concertData.name,
                userId: userId.value,
                username: "test", 
                action: CONCERT_ACTION.RESERVE,
                datetime : dateInDdMmYyyyHhMmSs(new Date(),"/") // format date ex: 
            })

            const response = await fetch(`${CONCERT_API}/transaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body
            });

            if (response.ok){
                redirect("/user?toast=true&&success=true");
            }
            else{
                redirect("/user?toast=true&&success=false");
            }
            
        }
        catch(e){
            throw(e)
        }
        
    }

    const handleCancelConcert = async() => {
        "use server"
        try {
            const { searchParams } = props;
            const id = searchParams?.concertId || "";

            const concertResponse = await fetch(`${CONCERT_API}?id=${id}`, {next: {revalidate : 60* 0 }})
            const concertData = await concertResponse.json() as Concert

            const body = JSON.stringify({
                concertName: concertData.name,
                userId: userId.value,
                username: "test", 
                action: CONCERT_ACTION.CANCEL,
                datetime : dateInDdMmYyyyHhMmSs(new Date(),"/") // format date ex: 
            })

            const response = await fetch(`${CONCERT_API}/transaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body
            });

            if (response.ok){
                redirect("/user?toast=true&&success=true");
            }
            else{
                redirect("/user?toast=true&&success=false");
            }
            
        }
        catch(e){
            throw(e)
        }
        
    }
    
    return (
        <div>
            {
                showToast && (
                    <Suspense key={showToast.toString()}>
                        {
                            isSuccess? <ToastSuccess 
                                message='Create successfully'
                                imagesrc='/success.svg'
                                target='/user'
                            />
                            : <ToastError
                                message='Create failed'
                                imagesrc='/error.svg'
                                target='/user'
                            />

                        }
                    </Suspense>
                )
            }
            {
                showModal &&
                    <Suspense key={concertId} >
                        {
                           modalType == CONCERT_ACTION.RESERVE ?
                           <ReserveModal
                                key={concertId}
                                redirectTarget="/user"
                                callback={handleReserveConcert}
                                id = {concertId}
                            /> 
                            : <CancelModal
                                key={concertId}
                                redirectTarget="/user"
                                callback={handleCancelConcert}
                                id = {concertId}
                            />
                        }
                    </Suspense>
                    
            }
            {
                renderConcert.map((concert : ReserveConcertCardData) => (
                    concert.action == CONCERT_ACTION.RESERVE ?
                    <ConcertCardCancel key={concert.id} {...concert} />
                    : <ConcertCardReserve key={concert.id} {...concert} /> 
                ))
            } 
        </div>
    )
}