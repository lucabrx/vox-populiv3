import { InferModel } from "drizzle-orm";
import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const Comment = mysqlTable("Comment", {
    id: varchar("id", {length: 191}).primaryKey().notNull(),
    body: varchar("body", {length: 191}).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    userId: varchar("user_id", {length: 191}).notNull(),
    blogId: varchar("post_id", {length: 191}),
    newsId: varchar("post_id", {length: 191}),
    storyId: varchar("post_id", {length: 191}),

})

export type CommentType = InferModel<typeof Comment, "select">;
