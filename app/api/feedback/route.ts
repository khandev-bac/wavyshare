import { db } from "@/libs/db";
import { feedback, user } from "@/libs/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userId: clerkId } = await auth()
        const { message } = await req.json()
        if (!clerkId) {
            return NextResponse.json({
                message: "Unauthorized",
            }, { status: 401 })
        }
        const Newuser = await db.select().from(user).where(eq(user.clerkId, clerkId))
        const currentUser = Newuser[0];
        if (!currentUser) {
            return NextResponse.json({
                message: "User not found !"
            }, { status: 401 })
        }
        await db.insert(feedback).values({ feedBackMessage: message }).returning()
        return NextResponse.json({
            message: "Feedback is successfully sent",
        })
    } catch (error) {
        console.error("Feedback error ", error);
        return NextResponse.json({
            message: "failed to send feedback"
        }, { status: 500 })
    }
}