import React, { useState } from 'react';
import Link from 'next/link';
import Transfer from "@/app/transfers/page";
import Contacts from '@/app/contacts/page';

const nav = [
    { name: 'Transfers', id: 'transfers' },
    { name: 'Contacts', id: 'contacts' }
];

function NavCard() {
    const [activePanel, setActivePanel] = useState<null | 'transfers' | 'contacts'>(null);

    const openPanel = (id: 'transfers' | 'contacts') => setActivePanel(id);
    const closePanel = () => setActivePanel(null);

    return (
        <>
            <div className="w-fit h-12 bg-white rounded-lg cursor-pointer border border-slate-300 z-20">
                <div className="w-full h-full flex space-x-7 items-center px-4">
                    {nav.map((item, index) => (
                        <h1
                            key={index}
                            onClick={() => openPanel(item.id as 'transfers' | 'contacts')}
                            className="hover:bg-blue-600 hover:text-white hover:rounded-md px-1"
                        >
                            {item.name}
                        </h1>
                    ))}
                </div>
            </div>

            {/* Panels */}
            <Transfer isOpen={activePanel === 'transfers'} onClose={closePanel} />
            <Contacts isOpen={activePanel === 'contacts'} onClose={closePanel} />
        </>
    );
}

export default NavCard;
