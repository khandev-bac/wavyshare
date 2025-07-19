"use client"
import React, { FC } from 'react'
import { useUser } from "@clerk/nextjs";
import { UserButton } from '@clerk/nextjs';
interface UserCardProps {
    email: string;
}
const UserCard: FC<UserCardProps> = ({ email }) => {
    const { user } = useUser();
    return (
        <div className='w-fit h-12 bg-white rounded-lg  cursor-pointer border border-slate-300 z-20 shadow-gray-300'>
            <div className='w-full h-full flex space-x-7 items-center px-4'>
                <h1 className='text-sm' >{user?.emailAddresses[0]?.emailAddress ?? " khanf23@gmail.com"}</h1>
                <UserButton />
            </div>
        </div>
    )
}

export default UserCard
