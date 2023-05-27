import { Comment } from "@/db";
import { getCurrentSession } from "@/fetching-hooks/getSession";
import { db } from "@/lib/db";
import { deleteCommentType } from "@/schema/newsComment.schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const body: deleteCommentType = await request.json()
    const { commentId,userId } = body
    const session = await getCurrentSession()

    if (!session) {
        return new Response("Unauthorized", { status: 401 })
    }

    if (session.id !== userId) {
        return new Response("Unauthorized", { status: 401 })
    }
    
    await db
    .delete(Comment)
    .where(eq(Comment.id, commentId))

    return NextResponse.json({ message: "Comment deleted successfully" })
}