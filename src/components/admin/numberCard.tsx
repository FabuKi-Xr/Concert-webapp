import "@/styles/admin/root.css"
import { AdminCard } from "@/.types";
import React from "react";
import Image from "next/image";

const NumberCard = (cardInfo: AdminCard ) => {
    return (
    <div className="
    mobile:gap-1 mobile:h-full
    sm:w-[100px]  sm: gap-2
    md:w-full
    lg:w-[450px] lg:gap-4 
    px-4 py-6 rounded-lg 
    flex flex-col items-center
    text-center text-white
    mobile:text-xs md:text-sm lg:text-2xl
    " 
        style={{background:cardInfo.color}}>
        <Image src={cardInfo.icon} alt={cardInfo.type} width={50} height={50}/>
        <p >{cardInfo.title}</p>
        <p >{cardInfo.seats}</p>
    </div>
    );
};

export default NumberCard;