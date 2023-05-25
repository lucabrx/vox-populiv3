import { Story } from "@/db";
import { getCurrentSession } from "@/fetching-hooks/getSession";
import { db } from "@/lib/db";
import { EditStoryType } from "@/schema/story.schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface IParams {
    storyId: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const {storyId} = params
    const currentUser = await getCurrentSession();
    const allStories = await db
    .select()
    .from(Story)
    .where(eq(Story.id, storyId))
 
    const news = allStories[0];

    if (!currentUser || currentUser.role !== "NewsEditor") {
        return new Response("Unauthorized", {status: 401});
    }
    if (!storyId) {
        return new Response("NewsId is required", {status: 400});
    }
    if (!news) {
        return new Response("News not found", {status: 404});
    }
     await db
    .delete(Story)
    .where(eq(Story.id, storyId))
    .execute()

    return NextResponse.json({ msg: "deleted" })
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentSession();
    const { storyId } = params
    const newsBody:EditStoryType = await request.json();
    const { body,title,description,category } = newsBody

    const allStories = await db
    .select()
    .from(Story)
    .where(eq(Story.id, storyId))

    const story = allStories[0];

    if(!body || !title || !description || !category){
        return NextResponse.json({message: "All fields are required"}, {status: 400})
    }
    if(!currentUser || currentUser.role !== "NewsEditor"){
        return NextResponse.json({message: "You are not allowed to edit news"}, {status: 403})
    }
    if(!storyId){
        return NextResponse.json({message: "NewsId is required"}, {status: 400})
    }
    if(!storyId){
        return NextResponse.json({message: "News not found"}, {status: 404})
    }

    const updateNews = await db
    .update(Story)
    .set({
        body,
        title,
        description,
        category,
    })
    .where(eq(Story.id, storyId))

    return NextResponse.json({ msg: "updated" })
}