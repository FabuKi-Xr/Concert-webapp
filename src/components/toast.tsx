import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface ToastProps {
    message?: string;
    target?: string;
    imagesrc?: string;
    bgColor?: string;
    textColor ?: string;
}

const ToastSuccess = (props : ToastProps) => {
    return <Toast {...props} bgColor="#D0E7D2"/>;
}

const ToastError = (props : ToastProps) => {
    return <Toast {...props} imagesrc="error.svg" bgColor="#E84E4E" textColor="white"/>;
}

const Toast = async({...props}) => {
    const { message,target,imagesrc,bgColor,textColor } = props as ToastProps;

    if (!message) {
        redirect(target || "/");
    }

    return (
        <div id="toast-top-right" 
                className="fixed flex items-center w-full max-w-xs p-4 space-x-4
                rounded-lg shadow top-5 right-5 " style={{background:bgColor, color:textColor}}>
                    <div>
                        <Image src={imagesrc as string} alt="toast" width={20} height={20}/>
                    </div>
                    <div className="text-xl font-normal">{message}</div>
                    <div className='absolute flex justify-end right-5 '>
                        <Link className='flex flex-row items-center '
                            href="/admin"
                            scroll={false}
                        >
                            <Image src='close.svg' alt="close" width={20} height={20}/>
                        </Link>
                    </div>
                </div>
    )
};

export {ToastSuccess,ToastError};