import { CONCERT_API } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface ModalProps {
    id: string;
    redirectTarget: string;
    callback: () => void ;
}

interface ModalConfigCardProps extends ModalProps {
    message: string;
    firstButtonText: string;
    firstButtonColor: string;
    secondButtonText: string;
    secondButtonColor: string;
    imagePath?:string;
}

const CancelModal = async(props: ModalProps) => {
    return (
        <Modal
            id={props.id}
            message="Are you sure to cancel?"
            redirectTarget={props.redirectTarget}
            callback={props.callback}
            firstButtonText="Cancel"
            firstButtonColor="white"
            secondButtonText="Yes, Cancel"
            secondButtonColor="red"
        ></Modal>
    )
}

const ReserveModal = async(props: ModalProps) => {
    return (
        <Modal
            id={props.id}
            message="Are you sure to Reserve?"
            redirectTarget={props.redirectTarget}
            callback={props.callback}
            firstButtonText="Cancel"
            firstButtonColor="white"
            secondButtonText="Yes, Reserve"
            secondButtonColor="#1692EC"
        ></Modal>
    )
}

const DeleteModal = async(props: ModalProps) => {
    return (
        <Modal
            id={props.id}
            message="Are you sure to delete?"
            redirectTarget={props.redirectTarget}
            callback={props.callback}
            firstButtonText="Cancel"
            firstButtonColor="white"
            secondButtonText="Yes, Delete"
            secondButtonColor="red"
            imagePath="./modal.delete.svg"
        ></Modal>
    )
}

const Modal = async({...props}:ModalConfigCardProps) => {
    const { id,message,redirectTarget,
        callback,
        firstButtonText,firstButtonColor,
        secondButtonText, secondButtonColor,
        imagePath

    } = props as ModalConfigCardProps;

    if (!id || isNaN(parseInt(id,10))){
        redirect(redirectTarget);
    }
    
    const response = await fetch(`${CONCERT_API}?id=${id}`, {next: {revalidate : 60* 1 }})
    const concert = await response.json();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex justify-center items-center">
            <div className="w-[420px] max-w-md bg-white p-6 rounded-lg flex flex-col text-m font-bold items-center text-center">
            {
                imagePath? <Image src="./modal.delete.svg" className="pb-6 " alt="close" width={48} height={48} />
                : null 
            }
            
                    <span className="text-2xl">
                    {message || "Are you sure to delete?"}
                        <br/>
                        “{concert.name}”
                    </span>
                <div className="w-full flex flex-row justify-between pt-6">
                    <Link className="w-[160px] border-2 px-4 py-3 rounded flex flex-row 
                    items-center justify-center" 
                        href={redirectTarget}
                        scroll={false}
                    >
                            <span className='text-lg' 
                                style={{background: firstButtonColor}}
                            >
                                {firstButtonText}
                            </span>
                    </Link>
                    <form action={callback}>
                        <button type="submit" className="lg:w-[160px] sm:w-120px admin-concert button-delete px-4 py-3 rounded flex flex-row items-center justify-center"
                            style={{background:secondButtonColor}} >
                                <span className='text-lg' style={{color: "white"}}>{secondButtonText}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { ReserveModal, DeleteModal , CancelModal};