import { User } from "@/db";
import { authOptions } from "@/lib/authOptions"
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next"

export async function getSession() {
  return await getServerSession(authOptions)
}
export async function getCurrentSession() {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUsers = await db
    .select()
    .from(User)
    .where(eq(User.email, session.user.email))
    
    const user = {
      id: currentUsers[0].id,
      name: currentUsers[0].name,
      email: currentUsers[0].email,
      image: currentUsers[0].image,
      role: currentUsers[0].role,
      bio: currentUsers[0].bio,
      page: currentUsers[0].page,
      banned: currentUsers[0].banned,
      createdAt: currentUsers[0].created_at,
    }

    
    

    if (!user) {
      return null;
    }
    return user

}