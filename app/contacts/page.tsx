import React from 'react';

interface ContactProps {
    isOpen: boolean;
    onClose: () => void;
}

const Contact: React.FC<ContactProps> = ({ isOpen, onClose }) => {
    return (
        <div
            className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">Contact</h2>
                <button onClick={onClose} className=" text-slate-900 text-xl cursor-pointer ">&times;</button>
            </div>
            <div className="p-4">
                {/* Content */}
                <p></p>
            </div>
        </div>
    );
};

export default Contact;
