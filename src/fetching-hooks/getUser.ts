import {  User } from "@/db";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function getUser(userId: string) {

    const allUsers = await db
    .select()
    .from(User)
    .where(eq(User.id, userId))

    const user = {
        id: allUsers[0].id,
        name: allUsers[0].name,
        email: allUsers[0].email,
        image: allUsers[0].image,
        role: allUsers[0].role,
        bio: allUsers[0].bio,
        page: allUsers[0].page,
        banned: allUsers[0].banned,
        createdAt: allUsers[0].created_at,
      }
    
    return user;
}