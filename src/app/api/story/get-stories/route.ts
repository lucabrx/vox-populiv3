import { Story, User } from "@/db";
import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest ) {
const limit = new URL(request.nextUrl).searchParams.get("limit") // pagesize
const offset = new URL(request.nextUrl).searchParams.get("offset")


    const allStories = await db
    .select()
    .from(Story)
    .offset(Number(offset) * Number(limit))
    .limit(Number(limit))
    .innerJoin(User, eq(User.id,Story.userId))
    .orderBy(desc(Story.created_at))

    return NextResponse.json(allStories)

}