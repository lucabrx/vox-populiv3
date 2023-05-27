import { News } from "@/db/";
import { getCurrentSession } from "@/fetching-hooks/getSession";
import { db } from "@/lib/db";
import { CreateNewsType } from "@/schema/news.schema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const newNews: CreateNewsType = await request.json()
    const {body,category,description,id,title,imageSrc} = newNews

    if(!body || !category || !description || !id || !title){
        return NextResponse.json({message: "All fields are required"}, {status: 400})
    }

    const currentUser = await getCurrentSession()
    if(!currentUser){
        return NextResponse.json({message: "You are not logged in"}, {status: 401})
    }
    if(currentUser.role !== "NewsEditor"){
        return NextResponse.json({message: "You are not allowed to create news"}, {status: 403})
    }
    
    const news = await db
    .insert(News)
    .values({
        id,
        title,
        body,
        category,
        description,
        userId: currentUser.id,
        imageSrc
    })

    return NextResponse.json({
        message: "News created successfully",
    })

}