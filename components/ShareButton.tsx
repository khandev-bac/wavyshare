// app/file/[id]/ShareButton.tsx
"use client";

import { Share2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast"
interface ShareButtonProps {
    title: string;
    message: string;
    fileUrl: string;
}

export function ShareButton({ title, message, fileUrl }: ShareButtonProps) {
    const handleShare = async () => {
        if (navigator.share && fileUrl) {
            try {
                await navigator.share({
                    title: title || "Shared File",
                    text: message || `Check out this file: ${title}`,
                    url: window.location.href
                });
            } catch (error) {
                // User cancelled or share failed, fallback to clipboard
                handleCopyToClipboard();
            }
        } else {
            handleCopyToClipboard();
        }
    };

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            console.log('Link copied to clipboard');
            toast.success("Link copied to clipboard")
        } catch (error) {
            toast.error("❌ Failed to copy the link");
            console.error('Failed to copy to clipboard:', error);
        }
    };

    return (
        <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors cursor-pointer"
        >
            <Share2 className="w-5 h-5" />
            Share
        </button>
    );
}

// app/file/[id]/DownloadButton.tsx


import { Download } from "lucide-react";
import { useState } from "react";

interface DownloadButtonProps {
    fileUrl: string;
    fileName: string;
}

export function DownloadButton({ fileUrl, fileName }: DownloadButtonProps) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!fileUrl) return;

        setIsDownloading(true);

        try {
            // First try the simple download attribute approach
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = fileName || 'download';

            // For cross-origin files, we might need to fetch and create blob
            if (fileUrl.startsWith('http') && !fileUrl.includes(window.location.hostname)) {
                try {
                    const response = await fetch(fileUrl);
                    if (!response.ok) throw new Error('Failed to fetch file');

                    const blob = await response.blob();
                    const blobUrl = window.URL.createObjectURL(blob);

                    link.href = blobUrl;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // Clean up the blob URL
                    window.URL.revokeObjectURL(blobUrl);
                } catch (fetchError) {
                    // Fallback: open in new tab if fetch fails
                    window.open(fileUrl, '_blank');
                }
            } else {
                // For same-origin files or data URLs
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Download failed:', error);
            // Ultimate fallback: open in new tab
            window.open(fileUrl, '_blank');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading || !fileUrl}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors cursor-pointer"
        >
            <Download className={`w-5 h-5 ${isDownloading ? 'animate-bounce' : ''}`} />
            {isDownloading ? 'Downloading...' : 'Download File'}
        </button>
    );
}