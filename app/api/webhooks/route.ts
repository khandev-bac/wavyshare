import { db } from '@/libs/db'
import { user } from '@/libs/schema'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req)

        // Do something with payload
        // For this guide, log payload to console
        // const { id } = evt.data
        // const eventType = evt.type
        // console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
        // console.log('Webhook payload:', evt.data)
        if (evt.type === "user.created") {
            const { id, first_name, email_addresses, image_url } = evt.data
            try {
                const newUser = await db.insert(user).values({
                    clerkId: id,
                    name: first_name,
                    email: email_addresses[0]?.email_address ?? null,
                    profile: image_url,
                })
                return NextResponse.json({
                    message: "User created successfully",
                    data: JSON.stringify(newUser)
                }, { status: 201 })
            } catch (error) {
                console.error("DB insert error:", error)
                return NextResponse.json({
                    message: "failed to create user",
                    error: error
                }, { status: 500 })
            }
        }
        return new Response("Webhook successfull")
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}