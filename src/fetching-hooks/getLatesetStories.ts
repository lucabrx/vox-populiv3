import { Story, User } from "@/db/";
import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";

export async function getLatestStories() {

    const stories = await db
    .select()
    .from(Story)
    .innerJoin(User, eq(Story.userId, User.id))
    .orderBy(desc(Story.created_at))
    .limit(3)
    

    return stories;
}