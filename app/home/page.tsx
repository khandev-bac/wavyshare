// app/home/page.tsx
"use client"
import Navbar from "@/components/Nvabar";
import UploadFile from "@/components/uploadFile";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function HomePage() {
    const { isLoaded, isSignedIn, user } = useUser();

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
        <div

        >
            {/* Clean overlay */}
            <div className="absolute inset-0 bg-white/80"></div>

            <div className="relative z-10">
                <Navbar />

                {/* Mobile - WavyShare at top */}
                <div className="block md:hidden pt-8 pb-16 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        WavyShare
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-8 px-8 md:px-16 lg:px-40 pt-4 md:pt-32">

                    {/* UploadFile - centered on mobile, left on desktop */}
                    <div className="flex justify-center w-full md:w-auto">
                        <div className="w-full max-w-md md:max-w-none flex justify-center">
                            <UploadFile />
                        </div>
                    </div>

                    {/* Simple headline - desktop only */}
                    <div className="hidden md:block">
                        <h1 className="text-3xl text-center lg:text-4xl xl:text-5xl font-light text-gray-900 leading-tight">
                            Beautifully Fast. Painfully Simple."
                            <br />
                            {/* <span className="font-medium">Beautifully Simple</span> */}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}