import { InferModel } from "drizzle-orm";
import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";


export const Blog = mysqlTable("Blog", {
    id: varchar("id", {length: 191}).primaryKey().notNull(),
    title: varchar("title", {length: 191}).notNull(),
    body: text("body").notNull(),
    description: varchar("description", {length: 256}).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    userId: varchar("userId", {length: 191}).notNull()
})

export type BlogType = InferModel<typeof Blog, "select">;