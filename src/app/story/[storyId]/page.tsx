import SingeStoryPage from "@/components/story/SingeStoryPage";
import { getCurrentSession } from "@/fetching-hooks/getSession";
import { getStory } from "@/fetching-hooks/getStory";


interface IParams {
    storyId?: string;
  }
  interface StoryProps {
      params: IParams;
      }
export default async function StoryPage({params}: StoryProps) {
    const session = await getCurrentSession()
    const story = await getStory(params.storyId!)

    return (
        <div className="w-full pb-4 pt-3 relative  max-w-[800px]">
            <SingeStoryPage story={story} session={session} />
        </div>
    )
}