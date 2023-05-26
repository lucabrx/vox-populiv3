import { News, User } from "@/db/";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function getNews(newsId: string) {

    const allNews = await db
    .select()
    .from(News)
    .innerJoin(User, eq(News.userId, User.id))
    .where(eq(News.id, newsId))

    const news = allNews[0];

    return news;
}