import SingleNewsPage from "@/components/news/SingleNewsPage";
import { getNews } from "@/fetching-hooks/getNews";
import { getCurrentSession } from "@/fetching-hooks/getSession";

interface IParams {
    newsId?: string;
  }
  interface BlogProps {
      params: IParams;
      }
export default async function News({params}: BlogProps) {
    const session = await getCurrentSession()
    const news = await getNews(params.newsId!)

    return (
        <div className="w-full pb-4 pt-3 relative  max-w-[800px]">
            <SingleNewsPage news={news} session={session} />
        </div>
    )
}