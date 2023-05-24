import { Blog } from "@/db";
import { getCurrentSession } from "@/fetching-hooks/getSession";
import { db } from "@/lib/db";
import { EditBlogType } from "@/schema/blog.schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface IParams {
    blogId: string;
}


export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentSession();
    const { blogId } = params

    const allBlogs = await db
    .select()
    .from(Blog)
    .where(eq(Blog.id, blogId))

    const blog = allBlogs[0];

    if (!currentUser) {
        return new Response("Unauthorized", {status: 401});
    }
if(currentUser.id !== blog.userId) {
    return new Response("Unauthorized", {status: 401});
}

    await db
    .delete(Blog)
    .where(eq(Blog.id, blogId))

    return NextResponse.json({ msg: "deleted" })
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentSession();
    const { blogId } = params
    const blogBody: EditBlogType = await request.json();
    const { body,title,description } = blogBody;

    const allBlogs = await db
    .select()
    .from(Blog)
    .where(eq(Blog.id, blogId))

    const blog = allBlogs[0];

    if (!currentUser) {
        return new Response("Unauthorized", {status: 401});
    }
    if(currentUser.id !== blog.userId) {
    return new Response("Unauthorized", {status: 401});
    }

    const updateBlog = await db
    .update(Blog)
    .set({
        title,
        body,
        description
    })
    .where(eq(Blog.id, blogId))
    

    return NextResponse.json(updateBlog);
    }