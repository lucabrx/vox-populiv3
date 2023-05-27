import { News, User } from "@/db/";
import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";

export async function getLatestNews() {

    const news = await db
    .select()
    .from(News)
    .innerJoin(User, eq(News.userId, User.id))
    .orderBy(desc(News.created_at))
    .limit(3)
    

    return news;
}