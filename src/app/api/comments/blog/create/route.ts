import { Comment } from "@/db"
import { getCurrentSession } from "@/fetching-hooks/getSession"
import { db } from "@/lib/db"
import { createCommentType } from "@/schema/blogComment.schema"
import { nanoid } from "nanoid"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const commentBody: createCommentType = await request.json()
    const { blogId,body } = commentBody
    const session = await getCurrentSession()

    if(!session) {
        return new Response("Unauthorized", { status: 401 })
    }
    if(!blogId || !body) {
        return new Response("Unauthorized", { status: 401 })
    }

    await db
    .insert(Comment)
    .values({
        blogId,
        body,
        userId: session.id,
        id: nanoid(),
    })
   
   return NextResponse.json({ message: "Comment created successfully" })
}

