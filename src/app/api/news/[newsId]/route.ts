import { News } from "@/db/";
import { getCurrentSession } from "@/fetching-hooks/getSession";
import { db } from "@/lib/db";
import { EditNewsType } from "@/schema/news.schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface IParams {
    newsId: string;
}
export async function DELETE(request: Request, { params }: { params: IParams }) {
    const {newsId} = params
    const currentUser = await getCurrentSession();
    const allNews = await db
    .select()
    .from(News)
    .where(eq(News.id, newsId))
 
    const news = allNews[0];

    if (!currentUser || currentUser.role !== "NewsEditor") {
        return new Response("Unauthorized", {status: 401});
    }
    if (!newsId) {
        return new Response("NewsId is required", {status: 400});
    }
    if (!news) {
        return new Response("News not found", {status: 404});
    }
     await db
    .delete(News)
    .where(eq(News.id, newsId))
    .execute()

    return NextResponse.json({ msg: "deleted" })
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentSession();
    const { newsId } = params
    const newsBody:EditNewsType = await request.json();
    const { body,title,description,category } = newsBody

    const allNews = await db
    .select()
    .from(News)
    .where(eq(News.id, newsId))

    const news = allNews[0];

    if(!body || !title || !description || !category){
        return NextResponse.json({message: "All fields are required"}, {status: 400})
    }
    if(!currentUser || currentUser.role !== "NewsEditor"){
        return NextResponse.json({message: "You are not allowed to edit news"}, {status: 403})
    }
    if(!newsId){
        return NextResponse.json({message: "NewsId is required"}, {status: 400})
    }
    if(!news){
        return NextResponse.json({message: "News not found"}, {status: 404})
    }

    const updateNews = await db
    .update(News)
    .set({
        body,
        title,
        description,
        category,
    })
    .where(eq(News.id, newsId))

    return NextResponse.json({ msg: "updated" })
}