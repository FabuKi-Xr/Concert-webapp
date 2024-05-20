"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const Sidebar = () => {
    const pathName = usePathname() || "";
    const [width, setWidth] = useState(0); // default width, detect on server.

    const useWidth = () => {
        const width = window.innerWidth;
        setWidth(width);
    };
    useEffect(() => {
        window.addEventListener('resize', useWidth);
        useWidth();
      }, []);

    const navLink = [
        {
            name: "Home",
            link: "/admin",
            icon: "/sidebar/home.icon.svg",
            role: "admin"
        },
        {
            name: "History",
            link: "/admin/history",
            icon: "/sidebar/history.icon.svg",
            role: "admin"
        },
        {
            name: "Switch to user",
            link: pathName?.match("admin") ? "/user" : "/admin",
            icon: "/sidebar/switch.icon.svg",
            role: "*"
        }
    ]
    return (
        <aside className={`w-[${width < 720 ? "60px" : "240px"}] ma-w-xs h-screen fixed z-40 border-r sidebar `}>
            <div className="py-10 top-0 ">
                    <div className="h-16 role">
                        {/* Role */}
                        <h1 className="md:mx-6 md:my-6 font-semibold  text-foreground mobile:text-lg mobile:text-center md:text-5xl ">
                            {pathName?.match("admin") ? "Admin" : "User"}
                        </h1>
                    </div>
                    
                    <div className="h-full py-2 route flex-col">
                        {   
                            navLink.map((link, index) => (
                                link.role.match(pathName?.split('/')[1]) || link.role == "*" ? 
                                <Link 
                                    className={`mx-2 my-2 px-2 py-4 rounded-lg flex items-center
                                    ${pathName === link.link ? "select" : "text-foreground"}
                                    `}
                                    key={index} href={link.link} 
                                    prefetch={false}
                                >                                    
                                    <Image src={link.icon} alt={link.name} width={24} height={24}/>
                                    {
                                        width > 640 ?
                                        <h3 className="mobile:text-xs lg:text-lg">
                                            {link.name}
                                        </h3>
                                        : null
                                    }
                                </Link>: null
                            ))
                        }


                        <div className="absolute inset-x-0 bottom-10 left-0">
                            <Link className="mx-2 my-2 px-2 py-4 rounded-lg flex items-center"
                                href="/"
                            >
                                <Image src="/sidebar/logout.icon.svg" alt="logout" width={24} height={24}/>
                                {
                                   width > 640 ?
                                    <h3 className="text-lg">
                                        Log out
                                    </h3> 
                                    : null
                                }
                                
                            </Link>
                        </div>
                    </div>
            </div>
        </aside>
    );
};

export default Sidebar;