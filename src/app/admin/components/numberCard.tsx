import "../style/style.css"
import { AdminCard } from "../constants/admin.constants";
import React from "react";

const NumberCard = (cardInfo: AdminCard ) => {
    return (
    <div className="admin-components admin-components-card w-[350px] px-4 py-6 rounded-lg flex flex-col items-center" 
        style={{background:cardInfo.color, gap:'10px'}}>
        <img src={cardInfo.icon} alt={cardInfo.type} width={50} height={50}/>
        <p className="text-2xl">{cardInfo.title}</p>
        <p className="text-6xl ">{cardInfo.seats}</p>
    </div>
    );
};

export default NumberCard;