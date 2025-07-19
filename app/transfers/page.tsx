import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface TransferProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FileType {
    id: string;
    title: string;
    message: string;
    fileUrl: string;
    fileName: string;
    fileSize: string;
}

const Transfer: React.FC<TransferProps> = ({ isOpen, onClose }) => {
    const [files, setFiles] = useState<FileType[]>([]);

    const getFiles = async () => {
        try {
            const res = await axios.get('/api/getFiles');
            setFiles(res.data.files);
            console.log('files successfully retrieved');
        } catch (error) {
            console.error('failed to retrieve: ', error);
        }
    };

    useEffect(() => {
        if (isOpen) getFiles();
    }, [isOpen]);

    return (
        <div
            className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">Transfers</h2>
                <button onClick={onClose} className="text-black cursor-pointer text-xl">&times;</button>
            </div>

            <div className="p-4 space-y-4">
                {files.length === 0 ? (
                    <p className="text-gray-500 text-sm">No transfers yet.</p>
                ) : (
                    files.map((file) => (
                        <div key={file.id} className="bg-gray-100 rounded-lg p-3 shadow-sm flex gap-3 items-start">
                            {/* Image or icon preview */}
                            <div className="">
                                <img
                                    src={file.fileUrl}
                                    alt={file.title}
                                    className="object-cover w-10 h-10 rounded-md"
                                />
                            </div>

                            {/* Title and message */}
                            <div className="flex flex-col justify-center">
                                <h3 className="text-sm font-semibold text-gray-800">{file.title}</h3>
                                <p className="text-xs text-gray-600 line-clamp-2">{file.message}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Transfer;
