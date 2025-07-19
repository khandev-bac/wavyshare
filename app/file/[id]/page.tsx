// app/file/[id]/page.tsx
import { file as fileTable } from "@/libs/schema";
import { db } from "@/libs/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import {
    Download,
    Eye,
    FileText,
    FileImage,
    FileVideo,
    FileAudio,
    File,
    Calendar,
    HardDrive,
    Share2,
    ExternalLink
} from "lucide-react";

import { ShareButton, DownloadButton } from "@/components/ShareButton";

interface PageProps {
    params: Promise<{ id: string }>;
}

// Helper function to get file type and icon
function getFileInfo(fileName: string, fileUrl: string) {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';

    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) {
        return { type: 'image', icon: FileImage, color: 'text-green-600' };
    }
    if (['mp4', 'avi', 'mov', 'webm', 'mkv'].includes(extension)) {
        return { type: 'video', icon: FileVideo, color: 'text-purple-600' };
    }
    if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
        return { type: 'audio', icon: FileAudio, color: 'text-blue-600' };
    }
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension)) {
        return { type: 'document', icon: FileText, color: 'text-red-600' };
    }
    return { type: 'other', icon: File, color: 'text-gray-600' };
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default async function FilePage({ params }: PageProps) {
    try {
        // Await params before using its properties
        const { id } = await params;

        const [file] = await db
            .select()
            .from(fileTable)
            .where(eq(fileTable.id, id));

        if (!file) {
            notFound();
        }

        const fileInfo = getFileInfo(file.fileName || '', file.fileUrl || '');
        const IconComponent = fileInfo.icon;

        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg bg-gray-50 ${fileInfo.color}`}>
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-1 break-words">
                                        {file.title || 'Untitled File'}
                                    </h1>
                                    {file.fileName && (
                                        <p className="text-sm text-gray-500 font-mono mb-2 bg-gray-50 inline-block px-2 py-1 rounded">
                                            {file.fileName}
                                        </p>
                                    )}
                                    {file.message && (
                                        <p className="text-gray-600 leading-relaxed">{file.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* File Details */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center gap-3">
                                    <File className="w-5 h-5 text-gray-400" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900">File Name</p>
                                        <p className="text-sm text-gray-600 break-all font-mono bg-gray-50 px-2 py-1 rounded">
                                            {file.fileName || 'No filename available'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <HardDrive className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Size</p>
                                        <p className="text-sm text-gray-600">{formatFileSize(file.fileSize || 0)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Uploaded</p>
                                        <p className="text-sm text-gray-600">
                                            {file.createdAt ? new Date(file.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) : 'Unknown'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-gray-600" />
                                <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                            </div>
                        </div>

                        <div className="p-6">
                            {fileInfo.type === 'image' && file.fileUrl ? (
                                <div className="text-center">
                                    <img
                                        src={file.fileUrl}
                                        alt={file.title || "File preview"}
                                        className="max-w-full max-h-96 mx-auto rounded-lg shadow-sm border border-gray-200 object-contain"
                                    />
                                </div>
                            ) : fileInfo.type === 'video' && file.fileUrl ? (
                                <div className="text-center">
                                    <video
                                        controls
                                        className="max-w-full max-h-96 mx-auto rounded-lg shadow-sm border border-gray-200"
                                    >
                                        <source src={file.fileUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            ) : fileInfo.type === 'audio' && file.fileUrl ? (
                                <div className="text-center py-8">
                                    <div className="inline-block p-4 bg-gray-50 rounded-lg mb-4">
                                        <FileAudio className="w-12 h-12 text-blue-600 mx-auto" />
                                    </div>
                                    <audio controls className="w-full max-w-md">
                                        <source src={file.fileUrl} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            ) : fileInfo.type === 'document' && file.fileUrl ? (
                                <div className="text-center py-12">
                                    <div className="inline-block p-4 bg-gray-50 rounded-lg mb-4">
                                        <FileText className="w-12 h-12 text-red-600 mx-auto" />
                                    </div>
                                    <p className="text-gray-600 mb-4">Document preview not available</p>
                                    <a
                                        href={file.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Open in New Tab
                                    </a>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="inline-block p-4 bg-gray-50 rounded-lg mb-4">
                                        <IconComponent className={`w-12 h-12 ${fileInfo.color} mx-auto`} />
                                    </div>
                                    <p className="text-gray-600">No preview available for this file type</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row gap-3">
                                {file.fileUrl && (
                                    <DownloadButton
                                        fileUrl={file.fileUrl}
                                        fileName={file.fileName || 'download'}
                                    />
                                )}
                                <ShareButton
                                    title={file.title || ''}
                                    message={file.message || ''}
                                    fileUrl={file.fileUrl || ''}
                                />
                                {file.fileUrl && (
                                    <a
                                        href={file.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        Open
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching file:', error);
        notFound();
    }
}