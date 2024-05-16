import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface ModalProps {
    id?: string;
}
const Modal = ({...props}) => {
    const { id } = props as ModalProps;

    if (!id || isNaN(parseInt(id,10))){
        redirect("/admin");
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex justify-center items-center">
            <div className="w-[420px] max-w-md bg-white p-6 rounded-lg flex flex-col text-m font-bold items-center text-center">
                <img src="./modal.delete.svg" className="pb-6 " alt="close" width={48} height={48} />
                    <span className="text-2xl">
                        {props.title}
                    </span>
                <div className="w-full flex flex-row justify-between pt-6">
                    <Link className="w-[160px] border-2 px-4 py-3 rounded flex flex-row 
                    items-center justify-center" 
                        href="/admin"
                        scroll={false}
                    >
                            <span className='text-lg' style={{color: "black"}}>{props.firstButton || "Cancel"}</span>
                    </Link>
                    <button className="w-[160px] admin-concert button-delete px-4 py-3 rounded flex flex-row items-center justify-center"
                        style={{background:"red"}} onClick={props.onConfirmCallBack}>
                            <span className='text-lg' style={{color: "white"}}>{props.secondButton || "Yes, Delete"}</span>
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default Modal;