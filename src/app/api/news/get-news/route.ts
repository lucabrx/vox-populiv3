import { News, User } from "@/db";
import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest ) {
const category = new URL(request.nextUrl).searchParams.get("category") 
const limit = new URL(request.nextUrl).searchParams.get("limit") // pagesize
const offset = new URL(request.nextUrl).searchParams.get("offset")

if(!category) {
    return NextResponse.json({message: "Category is required", status: 400})
}

if(category === "all" ) {
    const allNews = await db
    .select()
    .from(News)
    .offset(Number(offset))
    .limit(Number(limit))
    .innerJoin(User, eq(User.id,News.userId))
    .orderBy(desc(News.created_at))

    return NextResponse.json(allNews)
}

const news = await db
.select()
.from(News)
.innerJoin(User, eq(User.id,News.userId))
.where(eq(News.category, category))
.orderBy(desc(News.created_at))
.offset(Number(offset))
.limit(Number(limit))

return NextResponse.json(news)
}