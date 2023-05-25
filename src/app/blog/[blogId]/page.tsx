
import { getCurrentSession } from "@/fetching-hooks/getSession";
import SingleBlogPage from "@/components/blog/SingleBlogPage";
import { getBlog } from "@/fetching-hooks/getBlog";

interface IParams {
    blogId?: string;
  }
  interface BlogProps {
      params: IParams;
      }
  
export default async function Blog({params}: BlogProps) {
    const session = await getCurrentSession()
    const blog = await getBlog(params.blogId!)
 
    
    return (
          <div className="w-full pb-4 pt-3 relative  max-w-[800px]">
          <SingleBlogPage 
          blog={blog}
          session={session}
           />
        </div>
    )
}