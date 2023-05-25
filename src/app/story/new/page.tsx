import EmptyToSignIn from "@/components/content/EmptyToSignIn"
import RedirectHome from "@/components/content/RedirectHome"
import WriteStory from "@/components/story/WriteStory"
import { getCurrentSession } from "@/fetching-hooks/getSession"

export default async function NewStoryPage() {
    const session = await getCurrentSession()

    if (!session ) {
        return <EmptyToSignIn />
    }
    if(session.role !== 'NewsEditor') {
        return <RedirectHome />
    }

return (    
<div className="w-full pb-4 pt-3">
    <h2 className="text-[24px] md:text-[28px] font-bold text-center px0:text-left text-my-neutral-950 dark:text-my-neutral-50">Create A Story</h2>
    <WriteStory />
    </div>
)
}