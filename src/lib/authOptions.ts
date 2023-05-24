import { type NextAuthOptions, type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProviver from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import argon2 from "argon2";
import {env} from "@env"
import { db } from "./db";
import { drizzleAdapter } from "./drizzleAdapter";
import { Adapter } from "next-auth/adapters";
import { User } from "@/db";
import { eq } from "drizzle-orm";

//TODO add this to the types folder 
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}


export const authOptions: NextAuthOptions = {

  adapter: drizzleAdapter(db) as Adapter,
  providers: [
    GoogleProviver({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const allUsers = await db
        .select()
        .from(User)
        .where(eq(User.email, credentials.email))
        
        const user = allUsers[0];
       
    
        if (!user || !user?.password) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await argon2.verify(
          user.password,
          credentials.password,
        );
          
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return {
          ...user 
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },

}