import { InferModel } from "drizzle-orm";
import { index, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";


export const News = mysqlTable("News", {
    id: varchar("id", {length: 191}).primaryKey().notNull(),
    title: varchar("title", {length: 191}).notNull(),
    body: text("body").notNull(),
    category: varchar("category", {length: 191}).notNull(),
    description: varchar("description", {length: 256}).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    userId: varchar("userId", {length: 191}).notNull(),
    imageSrc: varchar("imageSrc", {length: 191}),
}, (table) => ({
    categoryIndex: index("news__category__idx").on(table.category),
}
))

export type NewsType = InferModel<typeof News, "select">;
