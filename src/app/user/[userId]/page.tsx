import EmptyToSignIn from "@/components/content/EmptyToSignIn";
import UserCover from "@/components/user/UserCover";
import { getCurrentSession } from "@/fetching-hooks/getSession"
import { getUser } from "@/fetching-hooks/getUser";

interface IParams {
    userId?: string;
  }
  interface UserParams {
      params: IParams;
      }

export default async function UserPage({params}: UserParams) {
    const session = await getCurrentSession();
    const user = await getUser(params?.userId!);
  
return (
    <div className="w-full pb-4 pt-3">
     <UserCover data={user} session={session?.id} />
    </div>
)
}