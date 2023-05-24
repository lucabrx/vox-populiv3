import { Blog } from "@/db";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function getBlog(blogId: string) {

    const allBlogs = await db
    .select()
    .from(Blog)
    .where(eq(Blog.id, blogId))

    const blog = allBlogs[0];

    return blog;
}