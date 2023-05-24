import { datetime, index, mysqlTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const Session = mysqlTable(
    "Session",
    {
      id: varchar("id", { length: 191 }).primaryKey().notNull(),
      sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
      userId: varchar("userId", { length: 191 }).notNull(),
      expires: datetime("expires").notNull(),
      created_at: timestamp("created_at").notNull().defaultNow().onUpdateNow(),
      updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    },
    (session) => ({
      sessionTokenIndex: uniqueIndex("sessions__sessionToken__idx").on(session.sessionToken),
      userIdIndex: index("sessions__userId__idx").on(session.userId),
    }),
  );