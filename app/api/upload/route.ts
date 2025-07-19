import cloudinary from "@/libs/cloudinary";
import { db } from "@/libs/db";
import { file, user } from "@/libs/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return NextResponse.json({
                message: "Unauthorized"
            }, { status: 401 });
        }

        const formData = await req.formData();
        const fileData = formData.get('file') as File;
        const title = formData.get('title')?.toString();
        const message = formData.get("message")?.toString();

        if (!fileData) {
            return NextResponse.json({
                error: "No file provided"
            }, { status: 400 });
        }

        // Extract filename from the File object
        const originalFileName = fileData.name;
        const fileSize = fileData.size;

        console.log("Original filename:", originalFileName);
        console.log("File size:", fileSize);

        const arrayBuffer = await fileData.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        try {
            // Upload to Cloudinary with original filename preserved
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "files",
                        resource_type: "auto", // This allows all file types, not just images
                        public_id: originalFileName.split('.')[0], // Use original name (without extension) as public_id
                        use_filename: true,
                        unique_filename: false
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                stream.end(buffer);
            });

            const cloudRes = result as any;

            // Get user from database
            const [dbUser] = await db.select().from(user).where(eq(user.clerkId, clerkId));

            if (!dbUser) {
                return NextResponse.json({
                    error: "User not found"
                }, { status: 404 });
            }

            // Set expiration date to 24 hours from now
            const oneDayFromNow = new Date();
            oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);

            // Determine the best filename to use
            const finalFileName = originalFileName;
            const finalFileSize = cloudRes.bytes || fileSize || 0;

            console.log("Final filename to save:", finalFileName);
            console.log("Cloudinary response filename:", cloudRes.original_filename);

            // Insert file record into database
            const [insertedFile] = await db.insert(file).values({
                title: title ?? "untitled",
                message: message ?? null,
                userId: dbUser.id,
                fileName: finalFileName,
                fileSize: finalFileSize,
                fileUrl: cloudRes.secure_url,
                expireIn: oneDayFromNow,
            }).returning();

            const shareUrl = `https://hopeful-probably-doe.ngrok-free.app/file/${insertedFile.id}`;

            return NextResponse.json({
                message: "File uploaded successfully",
                file: {
                    id: insertedFile.id,
                    title: insertedFile.title,
                    fileName: insertedFile.fileName,
                    fileSize: insertedFile.fileSize,
                    fileUrl: insertedFile.fileUrl,
                    expireIn: insertedFile.expireIn
                },
                shareLink: shareUrl
            });

        } catch (uploadError) {
            console.error("Failed to upload file to Cloudinary:", uploadError);
            return NextResponse.json({
                message: "Failed to upload file",
                error: uploadError instanceof Error ? uploadError.message : "Unknown error"
            }, { status: 500 });
        }

    } catch (error) {
        console.error("General upload error:", error);
        return NextResponse.json({
            message: "Failed to process upload",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}