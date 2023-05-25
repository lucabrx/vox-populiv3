import { News } from "@/db/";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function getNews(newsId: string) {

    const allNews = await db
    .select()
    .from(News)
    .where(eq(News.id, newsId))

    const news = allNews[0];

    return news;
}