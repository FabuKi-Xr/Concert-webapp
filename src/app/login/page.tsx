import { cookies } from "next/headers";
import * as constants from "@/constants";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page(){
    const handleUserLogin = async(formData:FormData) => {
        "use server"
        cookies().set("userId",constants.userId,{
          expires: new Date(Date.now() + constants.userCookiesExpiredIn5Minutes),
        })
        redirect("/user")
      }
    return(
        <div className="w-full px-16 md:px-0 h-screen flex items-center justify-center">
          <div className="grid justify-items-center ">
            <div className="flex flex-rows mb-[5rem] text-4xl font-bold text-neutral-700 ">
              <p>Login as</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center ">
            <Link
              href="/admin"
              className="px-8 py-10 w-[200px] bg-blue-500 rounded-md drop-shadow-md text-3xl font-bold 
                duration-100 hover:scale-105 hover:bg-blue-700 text-center text-white"
            >
                Admin
              </Link>
              <form action={handleUserLogin}>
                <button
                  className="mt-10 w-[200px] md:mt-0 ml-0 md:ml-12 px-8 py-10 
                  bg-blue-500  rounded-md drop-shadow-md text-3xl font-bold 
                    duration-100 hover:scale-105 hover:bg-blue-700 text-center 
                    text-white"
                  type="submit"
                >
                  User
              </button>
              </form>
              
            </div>
            </div>
          
        </div>
    )
}