// app/home/page.tsx
"use client"
import Navbar from "@/components/Nvabar";
import UploadFile from "@/components/uploadFile";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function HomePage() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) return <div>Loading...</div>;

    if (!isSignedIn) {
        redirect("/");
    }

    return (
        <div className="w-full h-full">
            <Navbar />
            <div className="flex justify-center items-center">
                <UploadFile />
            </div>
        </div>
    );
}