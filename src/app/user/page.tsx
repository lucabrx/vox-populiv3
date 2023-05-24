import EmptyToSignIn from "@/components/content/EmptyToSignIn";
import UserCover from "@/components/user/UserCover";
import { getCurrentSession } from "@/fetching-hooks/getSession"


export default async function UserPage() {
    const session = await getCurrentSession();

    if (!session) {
        return <EmptyToSignIn />
    }
return (
    <div className="w-full pb-4 pt-3">
     <UserCover data={session} session={session.id} />
    </div>
)
}