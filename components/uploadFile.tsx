'use client';

import React, { FC, useState } from 'react';
import { PlusCircleIcon, Upload } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import axios from 'axios';

interface UploadFileProps { }

const UploadFile: FC<UploadFileProps> = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [shareLink, setShareLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFilePick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '*/*';
        input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const selected = target.files?.[0];
            if (selected) {
                setFile(selected);
            }
        };
        input.click();
    };

    const handleUpload = async () => {
        if (!file) return alert('Please select a file.');

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('message', message);

            const res = await axios.post('/api/upload', formData);
            setShareLink(res.data.shareLink);
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Upload failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-80 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Upload File</h2>
                </div>
                <p className="text-sm text-gray-600 mt-1">Share your files with link</p>
            </div>

            <div className="px-6 py-6">
                {/* Upload File Section */}
                <div className=" mb-8">
                    <button
                        className="w-full group relative overflow-hidden focus:outline-none cursor-pointer"
                        onClick={handleFilePick}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                        <div className="border-2 border-dashed border-gray-300 group-hover:border-blue-400 rounded-2xl p-8 transition-all duration-300 bg-gray-50/50 group-hover:bg-blue-50/50">
                            <div className="flex flex-col items-center space-y-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 scale-150"></div>
                                    <PlusCircleIcon className="relative text-blue-700 group-hover:text-blue-600 w-8 h-8 transition-all duration-300 group-hover:scale-110" />
                                </div>
                                <p className="text-sm text-black group-hover:text-blue-700 transition-colors duration-300">
                                    {file ? file.name : 'Add file'}
                                </p>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Form Section */}
                <div className='w-full space-y-4 flex flex-col justify-center items-center'>
                    <Input placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Input placeholder={'Message'} value={message} onChange={(e) => setMessage(e.target.value)} />
                    <Button onClick={handleUpload} title={isLoading ? 'Uploading...' : 'Get Link'} />
                </div>

                {/* Link Output */}
                {shareLink && (
                    <div className="mt-6 text-sm text-blue-700 break-all text-center">
                        <p className="font-semibold mb-1">Shareable Link:</p>
                        <a href={shareLink} target="_blank" rel="noopener noreferrer" className="underline">
                            {shareLink}
                        </a>
                    </div>
                )}
            </div>

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <span>Secure file sharing</span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default UploadFile;
