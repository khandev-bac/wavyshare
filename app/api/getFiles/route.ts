import { db } from '@/libs/db';
import { file, user } from '@/libs/schema';
import { auth, } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
export async function GET() {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }
    try {
        const [createdUser] = await db.select().from(user).where(eq(user.clerkId, clerkId))
        if (!createdUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const userFile = await db.select({
            id: file.id,
            title: file.title,
            message: file.message,
            fileUrl: file.fileUrl,
            fileName: file.fileName,
            fileSize: file.fileSize,
            expireIn: file.expireIn,
            createdAt: file.createdAt,
        }).from(file).where(eq(file.userId, createdUser.id))
        return NextResponse.json({ files: userFile }, { status: 200 });
    } catch (error) {
        console.error('[FILES_GET_ERROR]', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}