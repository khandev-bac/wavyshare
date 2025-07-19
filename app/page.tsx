"use client"
import { SignUpButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
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
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-6 border-2 border-blue-600 rounded-full animate-pulse mb-4"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  if (isSignedIn) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-6 border-2 border-blue-600 rounded-full animate-pulse mb-4"></div>
          <p className="text-gray-800 font-medium">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-screen h-screen bg-white flex flex-col justify-center items-center px-6'>

      {/* Main Content */}
      <div className='text-center max-w-2xl'>

        {/* Brand */}
        <div className="mb-12">
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight'>
            WavyShare
          </h1>
        </div>

        {/* Value Proposition */}
        <div className="mb-12">
          <h2 className='text-2xl md:text-3xl text-gray-700 font-light mb-6 leading-relaxed'>
            Share files effortlessly
          </h2>

          <p className='text-lg text-gray-600 leading-relaxed max-w-lg mx-auto'>
            Upload, share, and manage your files with a simple, secure platform designed for modern professionals.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <SignUpButton>
            <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200'>
              Get Started
            </button>
          </SignUpButton>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
            <p className="text-sm text-gray-600">Your files are protected with enterprise-grade security</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Fast</h3>
            <p className="text-sm text-gray-600">Lightning-fast uploads and downloads</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Simple</h3>
            <p className="text-sm text-gray-600">Intuitive interface that just works</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page