import { User } from "@/db";
import { db } from "@/lib/db";
import { UserChangePaswordType } from "@/schema/user.schema";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const body : UserChangePaswordType = await request.json();
    const { 
        oldPassword,
        newPassword,
        userId
     } = body;

     const allUsers = await db
     .select()
     .from(User)
     .where(eq(User.id, userId))
     .limit(1)
     
     const user = allUsers[0];

        if(!user) {
            return new Response("User not found", { status: 404 })
        }
        if(user.password === null) {
            return new Response("Oauth dosent provide password", { status: 400 })
        }

        const isCorrectPassword = await argon2.verify(
            user.password,
            oldPassword,
          );

        if(!isCorrectPassword) {
            return new Response("Old password is incorrect", { status: 400 })
        }
        
        if(oldPassword === newPassword) {
         return new Response("New password cannot be the same as old password", { status: 400 })
        }

        const newHashedPassword = await argon2.hash(newPassword);


        const updateUser = await db
        .update(User)
        .set({
            password: newHashedPassword,
        })
        .where(eq(User.id, userId))


        return NextResponse.json({
            message: "Password updated successfully",
        });

}