import { Blog,  User } from "@/db/";
import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";

export async function getLatestBlog() {

    const stories = await db
    .select()
    .from(Blog)
    .innerJoin(User, eq(Blog.userId, User.id))
    .orderBy(desc(Blog.created_at))
    .limit(3)
    
    return stories;
}