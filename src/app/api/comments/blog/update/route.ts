import { Comment } from "@/db"
import { getCurrentSession } from "@/fetching-hooks/getSession"
import { db } from "@/lib/db"
import { updateCommentType } from "@/schema/comment.schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const commentBody: updateCommentType = await request.json()
    const { body,userId,commentId } = commentBody
    const session = await getCurrentSession()
    console.log(commentBody)
    if(!session) {
        return new Response("Unauthorized", { status: 401 })
    }
    if(!commentId || !body) {
        return new Response("Unauthorized", { status: 401 })
    }
    if(session.id !== userId) {
        return new Response("Unauthorized", { status: 401 })
    }

    await db
    .update(Comment)
    .set({
        body,
    })
    .where(eq(Comment.id, commentId))
   
   return NextResponse.json({ message: "Comment created successfully" })
}


