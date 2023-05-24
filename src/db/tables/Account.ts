import { index, int, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const Account = mysqlTable(
    "Account",
    {
      id: varchar("id", { length: 191 }).primaryKey().notNull(),
      userId: varchar("userId", { length: 191 }).notNull(),
      type: varchar("type", { length: 191 }).notNull(),
      provider: varchar("provider", { length: 191 }).notNull(),
      providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
      access_token: text("access_token"),
      expires_in: int("expires_in"),
      id_token: text("id_token"),
      refresh_token: text("refresh_token"),
      refresh_token_expires_in: int("refresh_token_expires_in"),
      scope: varchar("scope", { length: 191 }),
      token_type: varchar("token_type", { length: 191 }),
      createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
    },
    (account) => ({
      providerProviderAccountIdIndex: uniqueIndex("accounts__provider__providerAccountId__idx").on(
        account.provider,
        account.providerAccountId,
      ),
      userIdIndex: index("accounts__userId__idx").on(account.userId),
    }),
  );