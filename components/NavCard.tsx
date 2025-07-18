import React from 'react'
import Link from 'next/link'
const nav = [
    {
        name: "Files",
        link: "/file"
    },
    {
        name: "Contacts",
        link: "/contact"
    }
]

function NavCard() {
    return (
        <div className='w-fit h-12 bg-white rounded-lg  cursor-pointer border border-slate-300 z-20'>
            <div className='w-full h-full flex space-x-7 items-center px-4'>
                {nav.map((name, index) => (
                    <Link href={name.link}>
                        <h1 key={index} >{name.name}</h1>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default NavCard
