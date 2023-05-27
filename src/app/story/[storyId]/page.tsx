import SingeStoryPage from "@/components/story/SingeStoryPage";
import Comments from "@/components/story/storyComments/Comments";
import { getCurrentSession } from "@/fetching-hooks/getSession";
import { getStory } from "@/fetching-hooks/getStory";
import { getStoryComments } from "@/fetching-hooks/getStoryComment";


interface IParams {
    storyId?: string;
  }
  interface StoryProps {
      params: IParams;
      }
export default async function StoryPage({params}: StoryProps) {
    const session = await getCurrentSession()
    const story = await getStory(params.storyId!)
    const comments = await getStoryComments(params.storyId!)
    return (
        <div className="w-full pb-4 pt-3 relative  max-w-[800px]">
            <SingeStoryPage 
            story={story} 
            session={session} />

            <Comments
        comments={comments}
        session={session} 
        params={params.storyId!} />
        </div>
        
    )
}