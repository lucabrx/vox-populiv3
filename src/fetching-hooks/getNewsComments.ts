import { Comment, User } from "@/db";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function getNewsComments(newsId: string) {

    const allComments = await db
    .select()
    .from(Comment)
    .innerJoin(User, eq(User.id, Comment.userId))
    .where(eq(Comment.newsId, newsId))

    return allComments;
}