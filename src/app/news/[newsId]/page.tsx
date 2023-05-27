import SingleNewsPage from "@/components/news/SingleNewsPage";
import Comments from "@/components/news/newsComment/Comments";
import { getNews } from "@/fetching-hooks/getNews";
import { getNewsComments } from "@/fetching-hooks/getNewsComments";
import { getCurrentSession } from "@/fetching-hooks/getSession";

interface IParams {
    newsId?: string;
  }
  interface NewsProps {
      params: IParams;
      }
export default async function News({params}: NewsProps) {
    const session = await getCurrentSession()
    const news = await getNews(params.newsId!)
    const comments = await getNewsComments(params.newsId!)
    return (
        <div className="w-full pb-4 pt-3 relative  max-w-[800px]">
            <SingleNewsPage 
            news={news} 
            session={session} />

        <Comments
        comments={comments}
        session={session} 
        params={params.newsId!} />
        </div>
    )
}