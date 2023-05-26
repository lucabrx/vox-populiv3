import { Story, User } from "@/db/";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function getStory(storyId: string) {

    const allStories = await db
    .select()
    .from(Story)
    .innerJoin(User, eq(Story.userId, User.id))
    .where(eq(Story.id, storyId))

    const story = allStories[0];

    return story;
}