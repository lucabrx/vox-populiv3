import { Blog, User } from "@/db";
import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest ) {
const limit = new URL(request.nextUrl).searchParams.get("limit") // pagesize
const offset = new URL(request.nextUrl).searchParams.get("offset")


    const allNews = await db
    .select()
    .from(Blog)
    .offset(Number(offset))
    .limit(Number(limit))
    .innerJoin(User, eq(User.id,Blog.userId))
    .orderBy(desc(Blog.created_at))

    return NextResponse.json(allNews)

}