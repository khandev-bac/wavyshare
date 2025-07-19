"use client"
import Navbar from "@/components/Nvabar";
import UploadFile from "@/components/uploadFile";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function HomePage() {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center">
                    {/* Blue Circular Spinner */}
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                    {/* Optional loading text */}
                    <p className="text-blue-500 text-sm font-medium mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
        redirect("/");
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Clean overlay */}
            <div className="absolute inset-0 bg-white/80"></div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                {/* Mobile - WavyShare at top */}
                <div className="block md:hidden pt-8 pb-8 text-center flex-shrink-0">
                    <h1 className="text-4xl font-bold text-gray-900">
                        WavyShare
                    </h1>
                </div>

                {/* Main content container - centered and flexible */}
                <div className="flex-1 flex items-center justify-center px-4 md:px-8 lg:px-16">
                    <div className="w-full max-w-7xl">
                        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-8 md:gap-12">

                            {/* UploadFile - perfectly centered with fixed container */}
                            <div className="flex justify-center items-center w-full md:w-1/2">
                                <div className="w-full max-w-md flex justify-center">
                                    {/* Container with fixed dimensions to prevent layout shift */}
                                    <div className="w-full min-h-[300px] flex items-center justify-center">
                                        <UploadFile />
                                    </div>
                                </div>
                            </div>

                            {/* Desktop heading */}
                            <div className="hidden md:flex md:w-1/2 justify-center items-center">
                                <div className="text-center max-w-lg">
                                    <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 leading-tight">
                                        Beautifully Fast. Painfully Simple.
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}