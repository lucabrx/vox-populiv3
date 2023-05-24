import { User } from "@/db";
import { db } from "@/lib/db";
import { EditUserType } from "@/schema/user.schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const body : EditUserType = await request.json();

    const {
        name,
        bio,
        page,
        userId
    } = body

    const allUsers = await db
    .select()
    .from(User)
    .where(eq(User.id, userId))

    const user = allUsers[0];

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    
    const updateUser = await db
    .update(User)
    .set({
        name: name,
        bio: bio,
        page: page,
    })
    .where(eq(User.id, userId))
   
     
    
    return NextResponse.json({
        message: "User updated successfully",
    });
}