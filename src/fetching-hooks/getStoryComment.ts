import { Comment, User } from "@/db";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function getStoryComments(storyId: string) {

    const allComments = await db
    .select()
    .from(Comment)
    .innerJoin(User, eq(User.id, Comment.userId))
    .where(eq(Comment.storyId, storyId))

    return allComments;
}