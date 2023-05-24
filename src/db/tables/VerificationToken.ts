import { datetime, mysqlTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const VerificationToken = mysqlTable(
    "VerificationToken",
    {
      identifier: varchar("identifier", { length: 191 }).primaryKey().notNull(),
      token: varchar("token", { length: 191 }).notNull(),
      expires: datetime("expires").notNull(),
      created_at: timestamp("created_at").notNull().defaultNow().onUpdateNow(),
      updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    },
    (verificationToken) => ({
      tokenIndex: uniqueIndex("verification_tokens__token__idx").on(verificationToken.token),
    }),
  );