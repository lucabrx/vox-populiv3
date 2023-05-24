import {  mysqlTable, timestamp, uniqueIndex, varchar } from 'drizzle-orm/mysql-core'

export const User = mysqlTable(
   "User",
   {
     id: varchar("id", { length: 191 }).primaryKey().notNull(),
     name: varchar("name", { length: 191 }),
     email: varchar("email", { length: 191 }).notNull(),
     emailVerified: timestamp("emailVerified"),
     bio: varchar("bio", { length: 191 }),
     page: varchar("page", { length: 191 }),
     role: varchar("role", { length: 191 }).default('user'),
     banned: varchar('banned', {length: 191}).default('false'),
     image: varchar("image", { length: 191 }).default("/avatar-placeholder.jpeg"),
     password: varchar("hashedPassword", { length: 191 }),
     created_at: timestamp("created_at").notNull().defaultNow(),
     updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
   },
   (user) => ({
     emailIndex: uniqueIndex("users__email__idx").on(user.email),
   }),
 );

