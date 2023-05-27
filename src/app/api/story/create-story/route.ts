import { Story } from "@/db";
import { getCurrentSession } from "@/fetching-hooks/getSession";
import { db } from "@/lib/db";
import { CreateStoryType } from "@/schema/story.schema";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const storyBody: CreateStoryType = await request.json();
    const { body, title, description, category, id, imageSrc } = storyBody;
    const currentUser = await getCurrentSession()

    if(!body || !category || !description || !id || !title){
        return NextResponse.json({message: "All fields are required"}, {status: 400})
    }

    if(!currentUser){
        return NextResponse.json({message: "You are not logged in"}, {status: 401})
    }
    if(currentUser.role !== "NewsEditor"){
        return NextResponse.json({message: "You are not allowed to create news"}, {status: 403})
    }
    
    await db
    .insert(Story)
    .values({
        id,
        title,
        body,
        category,
        description,
        userId: currentUser.id,
        imageSrc : imageSrc
    })

    return NextResponse.json({
        message: "Story created successfully",
    })
}