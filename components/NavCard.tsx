import React from 'react'
import Link from 'next/link'
const nav = [
    {
        name: "Transfers",
        link: "/transfers"
    },
    {
        name: "Contacts",
        link: "/contacts"
    }
]

function NavCard() {
    return (
        <div className='w-fit h-12 bg-white rounded-lg  cursor-pointer border border-slate-300 z-20'>
            <div className='w-full h-full flex space-x-7 items-center px-4'>
                {nav.map((name, index) => (
                    <Link href={name.link} key={index}>
                        <h1 key={index} >{name.name}</h1>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default NavCard
