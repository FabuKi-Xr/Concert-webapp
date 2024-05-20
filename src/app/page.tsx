import * as constants from "@/constants";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {

  return (
    <main>
      <div className="w-full h-[10vh]
      mobile:px-0 mobile:py-1 
      md:px-5 md:py-2 
      lg:px-2 lg:py-10
      shadow-lg shadow-slate-800
      bg-slate-900 text-white flex items-center justify-end
      " 
      >
          <Link className="
            w-full h-[10vh]
            mobile:w-[70px]  mobile:text-md  mobile:px-0
            sm:w-[100px] sm:px-2 sm:py-1 sm:text-lg
            md:w-[100px] md:px-2 md:py-2 md:text-2xl
            lg:w-[150px] lg:px-2 lg:py-4
            hover:bg-violet-500
            font-bold flex items-center justify-center
            text-center 
            "
              href="/login"
            >
              Login
          </Link>
        
      </div>
      <div className="w-full  max-h-max h-[90vh]
      bg-cover bg-center bg-no-repeat 
      text-white 
      " 
      >
        <Image className="absolute -z-10 " src="/concert.jpg" alt="concert image" fill/>
        <h1 className="
        mobile:text-lg md:text-4xl lg:text-6xl font-extrabold 
        mobile:pl-6 sm:pl-16 md:pl-24 lg:pl-32 pt-20 ">
          <span className="backdrop-blur-sm ">THE 
            <span className="text-pink-600">     CONCERTO</span>
            </span><br/>
          <span className="backdrop-blur-sm ">CONNECT YOUR 
          <span className="backdrop-blur-sm text-pink-600"> &ldquo;FAV&rdquo; </span> 
          ARTIST.</span>
          
        </h1>
      </div>
        
    </main>
  );
}
