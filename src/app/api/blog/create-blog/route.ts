import { Blog } from "@/db";
import { getCurrentSession } from "@/fetching-hooks/getSession";
import { db } from "@/lib/db";
import { CreateBlogType } from "@/schema/blog.schema";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const blogBody: CreateBlogType = await request.json();
    const { body,title,description,id } = blogBody;
    const currentUser = await getCurrentSession();
    
if (!currentUser) {
    return new Response("Unauthorized", {status: 401});
}
if(!title || !body){
    return new Response("Title and body are required", { status: 400 });
}

const blog = await db
    .insert(Blog)
    .values({
        id,
        title,
        body,
        userId: currentUser.id,
        description 
    })
    
    return NextResponse.json(blog)
}