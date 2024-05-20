'use client' // Error components must be Client Components
 
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
    console.log(screen.width)
  useEffect(() => {

    console.error(error)
  }, [error])
 
  return (
    <div>
        <div className='grid min-h-full w-full h-[70vh] px-6 py-48 bg-blue-950'>
            <div className='w-full text-center'>
                <h2 className='font-bold text-6xl text-white'>Something went wrong!</h2>
                <div className='h-[30vh] py-32 flex item-center justify-center gap-24'>
                    <button className='bg-pink-200 px-8 py-12 border-8 border-pink-700
                    rounded-md flex items-center justify-center text-3xl font-semibold text-pink-700'
                        onClick={() => reset()}>
                        Try again
                    </button>
                    <Link className='bg-white text-black border-8 border-white px-8 py-12 
                    rounded-md flex items-center justify-center text-3xl font-semibold'
                    href='/'
                    >
                        back to home
                    </Link>
                </div>
            </div>
        </div>
        
    </div>
  )
}