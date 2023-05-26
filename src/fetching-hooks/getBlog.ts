import { Blog, User } from "@/db";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function getBlog(blogId: string) {

    const allBlogs = await db
    .select()
    .from(Blog)
    .innerJoin(User, eq(Blog.userId, User.id))
    .where(eq(Blog.id, blogId))

    const blog = allBlogs[0];

    return blog;
}