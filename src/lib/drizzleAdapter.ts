import type { Adapter } from "@auth/core/adapters";
import { nanoid } from "nanoid";
import { and, eq } from "drizzle-orm";
import type { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import {  Account,Session,User,VerificationToken } from "@/db"

export function drizzleAdapter(db: PlanetScaleDatabase): Adapter {
  return {
    async createUser(userData) {
      await db.insert(User).values({
        id: nanoid(),
        email: userData.email,
        emailVerified: userData.emailVerified,
        name: userData.name || nanoid(),
        image: userData.image,
      });
      const rows = await db.select().from(User).where(eq(User.email, userData.email)).limit(1);
      const row = rows[0];
      if (!row) throw new Error("User not found");
      return row;
    },
    async getUser(id) {
      const rows = await db.select().from(User).where(eq(User.id, id)).limit(1);
      const row = rows[0];
      return row ?? null;
    },
    async getUserByEmail(email) {
      const rows = await db.select().from(User).where(eq(User.email, email)).limit(1);
      const row = rows[0];
      return row ?? null;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const rows = await db
        .select()
        .from(User)
        .innerJoin(Account, eq(User.id, Account.userId))
        .where(and(eq(Account.providerAccountId, providerAccountId), eq(Account.provider, provider)))
        .limit(1);
      const row = rows[0];
      return row?.User ?? null;
    },
    async updateUser({ id, ...userData }) {
      if (!id) throw new Error("User not found");
      await db.update(User).set(userData).where(eq(User.id, id));
      const rows = await db.select().from(User).where(eq(User.id, id)).limit(1);
      const row = rows[0];
      if (!row) throw new Error("User not found");
      return row;
    },
    async deleteUser(userId) {
      await db.delete(User).where(eq(User.id, userId));
    },
    async linkAccount(account) {
      await db.insert(Account).values({
        id: nanoid(),
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        type: account.type,
        userId: account.userId,
        // OpenIDTokenEndpointResponse properties
        access_token: account.access_token,
        expires_in: account.expires_in,
        id_token: account.id_token,
        refresh_token: account.refresh_token,
        refresh_token_expires_in: account.refresh_token_expires_in as number, // TODO: why doesn't the account type have this property?
        scope: account.scope,
        token_type: account.token_type,
      });
    },
    async unlinkAccount({ providerAccountId, provider }) {
      await db
        .delete(Account)
        .where(and(eq(Account.providerAccountId, providerAccountId), eq(Account.provider, provider)));
    },
    async createSession(data) {
      await db.insert(Session).values({
        id: nanoid(),
        expires: data.expires,
        sessionToken: data.sessionToken,
        userId: data.userId,
      });
      const rows = await db.select().from(Session).where(eq(Session.sessionToken, data.sessionToken)).limit(1);
      const row = rows[0];
      if (!row) throw new Error("User not found");
      return row;
    },
    async getSessionAndUser(sessionToken) {
      const rows = await db
        .select({
          user: User,
          session: {
            id: Session.id,
            userId: Session.userId,
            sessionToken: Session.sessionToken,
            expires: Session.expires,
          },
        })
        .from(Session)
        .innerJoin(User, eq(User.id, Session.userId))
        .where(eq(Session.sessionToken, sessionToken))
        .limit(1);
      const row = rows[0];
      if (!row) return null;
      const { user, session } = row;
      return {
        user,
        session: {
          id: session.id,
          userId: session.userId,
          sessionToken: session.sessionToken,
          expires: session.expires,
        },
      };
    },
    async updateSession(session) {
      await db.update(Session).set(session).where(eq(Session.sessionToken, session.sessionToken));
      const rows = await db.select().from(Session).where(eq(Session.sessionToken, session.sessionToken)).limit(1);
      const row = rows[0];
      if (!row) throw new Error("Coding bug: updated session not found");
      return row;
    },
    async deleteSession(sessionToken) {
      await db.delete(Session).where(eq(Session.sessionToken, sessionToken));
    },
    async createVerificationToken(verificationToken) {
      await db.insert(VerificationToken).values({
        expires: verificationToken.expires,
        identifier: verificationToken.identifier,
        token: verificationToken.token,
      });
      const rows = await db
        .select()
        .from(VerificationToken)
        .where(eq(VerificationToken.token, verificationToken.token))
        .limit(1);
      const row = rows[0];
      if (!row) throw new Error("Coding bug: inserted verification token not found");
      return row;
    },
    async useVerificationToken({ identifier, token }) {
      // First get the token while it still exists. TODO: need to add identifier to where clause?
      const rows = await db.select().from(VerificationToken).where(eq(VerificationToken.token, token)).limit(1);
      const row = rows[0];
      if (!row) return null;
      // Then delete it.
      await db
        .delete(VerificationToken)
        .where(and(eq(VerificationToken.token, token), eq(VerificationToken.identifier, identifier)));
      // Then return it.
      return row;
    },
  };
}