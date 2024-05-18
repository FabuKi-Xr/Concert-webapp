import { CONCERT_API } from "@/lib/constants";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface ModalProps {
    id?: string;
}

const Modal = async({...props}) => {
    const { id } = props as ModalProps;

    if (!id || isNaN(parseInt(id,10))){
        redirect("/admin");
    }
    
    const response = await fetch(`${CONCERT_API}/${id}`, {next: {revalidate : 60* 1 }})
    const concert = await response.json();

    const handleDeleteConcert = async() => {
        "use server"
        try {
            const response = await fetch(`${CONCERT_API}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok){
                redirect("/admin");
            }
            
        }
        catch(e){
            throw(e)
        }
        
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex justify-center items-center">
            <div className="w-[420px] max-w-md bg-white p-6 rounded-lg flex flex-col text-m font-bold items-center text-center">
                <img src="./modal.delete.svg" className="pb-6 " alt="close" width={48} height={48} />
                    <span className="text-2xl">
                    Are you sure to delete?
                        <br/>
                        {concert.name}
                    </span>
                <div className="w-full flex flex-row justify-between pt-6">
                    <Link className="w-[160px] border-2 px-4 py-3 rounded flex flex-row 
                    items-center justify-center" 
                        href="/admin"
                        scroll={false}
                    >
                            <span className='text-lg' style={{color: "black"}}>{props.firstButton || "Cancel"}</span>
                    </Link>
                    <form action={await handleDeleteConcert}>
                        <button type="submit" className="w-[160px] admin-concert button-delete px-4 py-3 rounded flex flex-row items-center justify-center"
                            style={{background:"red"}} >
                                <span className='text-lg' style={{color: "white"}}>{props.secondButton || "Yes, Delete"}</span>
                        </button>
                    </form>
                </div>
            </div>
            
        </div>
    );
};

export default Modal;