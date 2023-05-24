import WriteBlog from "@/components/blog/WriteBlog";
import EmptyToSignIn from "@/components/content/EmptyToSignIn";
import { getCurrentSession } from "@/fetching-hooks/getSession";

export default async function NewBlog() {
    const session = await getCurrentSession()

    if (!session) {
        return <EmptyToSignIn />
    }
return (
    <div className="w-full pb-4 pt-3">
    <h2 className="text-[24px] md:text-[28px] font-bold text-center px0:text-left text-my-neutral-950 dark:text-my-neutral-50">Create A Blog</h2>
   <WriteBlog />
   </div>
)
}