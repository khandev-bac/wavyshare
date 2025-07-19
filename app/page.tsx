"use client"
import { SignUpButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation' // For App Router
import { useEffect } from 'react'

function page() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/home')
    }
  }, [isSignedIn, isLoaded, router])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (isSignedIn) {
    return <div>Redirecting...</div>
  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <h1 className='text-5xl font-black text-white md:text-6xl lg:text-7xl'>Wavy Share</h1>
      <p className=' text-white mt-4 font-medium text-sm md:text-base lg:text-lg'>Efficient file sharing, proudly simple</p>
      <SignUpButton

      >
        <button className='px-10 py-4 font-medium bg-blue-600 text-white rounded-2xl mt-4 hover:bg-blue-900 cursor-pointer'>
          Try it now !
        </button>
      </SignUpButton>
    </div>
  )
}

export default page