import '@/app/admin/style/style.css'
import '@/app/admin/style/admin.create.page.css'
import { CONCERT_API } from '@/lib/constants';
import { FormEvent } from 'react';
import { redirect } from "next/navigation";

export type Props = {
    searchParams: Record<string, string> | null | undefined;
}

export default async function Page(props : Props) {
    const HandleCreateConcert = async (formData : FormData) => {
        "use server"

        const name = formData.get('concertName')
        const seats = formData.get('concertSeats')
        const description = formData.get('concertDescription')

        try{
            if(name && seats && description){
            const concert = {
                name,
                seats: parseInt(seats as string),
                description
            }

            const response = await fetch(CONCERT_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(concert)
            })

            if(response.ok){
                redirect('/admin')
            }else{
                console.log('Create concert failed')
            }
        }
        }
        catch(e){
            console.log(e)
            throw(e)
        }
        
        
        
    }
    return(
        <div className="admin mt-8 admin-create-page">
            <div className="py-10 px-10">
                <p className="title text-4xl font-semibold">Create</p>
                <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-300"></hr>
                <form action={HandleCreateConcert}>
                    <div className='grid gap-6 mb-6 md:grid-cols-2'>
                        <div>
                            <label htmlFor="concertName" className="block mb-2 text-2xl font-normal overflow-hidden">Concert Name</label>
                            <input type="text" 
                                id="concertName" 
                                name='concertName'
                                className="bg-gray-50 border border-gray-300  
                                text-base rounded-lg focus:ring-blue-500 
                                focus:border-blue-500 block w-full p-2.5  
                                dark:border-gray-600 dark:placeholder-gray-400 
                                dark:via-black dark:focus:ring-blue-500 
                                dark:focus:border-blue-500" 
                                placeholder="Please input concert name" required />
                        </div>
                        <div>
                            <label htmlFor="concertSeats" className="block mb-2 text-2xl font-normal">Total of seat</label>
                            <div className="relative">
                                <input type="number"
                                    name="concertSeats"
                                    id="concertSeats" 
                                    className="bg-gray-50 border border-gray-300  
                                    text-base rounded-lg focus:ring-blue-500 
                                    focus:border-blue-500 block w-full p-2.5  
                                    dark:border-gray-600 dark:placeholder-gray-400
                                    dark:via-black dark:focus:ring-blue-500 
                                    dark:focus:border-blue-500" 
                                    placeholder="Please input total of seat" itemType='number' 
                                    required />
                                <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
                                    <img src="/person-black.svg" alt="person" width={32} height={32}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="concertDescription" className="block mb-2 text-2xl font-normal">Description</label>
                        <textarea 
                            name="concertDescription"
                            id="first_name" 
                            className="h-[120px] bg-gray-50 border border-gray-300  
                            text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 
                            dark:via-black" 
                            placeholder="Please input total of seat" required />
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button type="submit" className="w-[160px] admin button-save px-4 py-3 rounded 
                        flex flex-row items-center justify-center " 
                        >
                            <img src="/save.svg" alt="delete" width={24} height={24}/>
                            Save
                        </button>
                    </div>
                                    
                </form>
                
            </div>
            
        </div>
    )
}