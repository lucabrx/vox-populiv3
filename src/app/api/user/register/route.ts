import { NextResponse } from "next/server";
import argon2 from "argon2";

import { UserRegisterType } from "@/schema/user.schema";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { User } from "@/db";
import { eq } from "drizzle-orm";


export async function POST(request: Request) {
  const body : UserRegisterType = await request.json();
  const { 
    email,
    password,
    name,
   } = body;

   console.log(body)

   if(!email || !password || !name) {
    return NextResponse.json({
      message: "Email, password and name are required",
    });
    }

    const users = await db
    .select()
    .from(User)
    .where(eq(User.email, email))
    
    
    const user = users[0]
    if(user) {
      return NextResponse.json({
        message: "Email already exists",
    });
    }
    
 
   const hashedPassword = await argon2.hash(password);

    await db
    .insert(User)
    .values({
        id: nanoid(),
        email: email,
        name,
        password: hashedPassword,
    })
   
    

  return NextResponse.json({
    message: "User created successfully",
  });
}