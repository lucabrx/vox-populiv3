import BlogCard from "@/components/ui/BlogCard"
import NewsCard from "@/components/ui/NewsCard"
import StoryCard from "@/components/ui/StoryCard"
import { getLatestStories } from "@/fetching-hooks/getLatesetStories"
import { getLatestBlog } from "@/fetching-hooks/getLatestBlog"
import { getLatestNews } from "@/fetching-hooks/getLatestNews"
import Link from "next/link"


export default async function Home() {

  const blogs = await getLatestBlog()
  const stories = await getLatestStories()
  const news = await getLatestNews()

  return (
   <div className="w-full pb-4 pt-3 flex flex-col justify-center items-center space-y-2">
      <div>
      <Link href="/news" className="text-[24px]  font-bold text-center px0:text-left py-2 px0:ml-4 pc:ml-0  w-full hover:text-my-primary-500 duration-300 transition-all">
       Latest News
    </Link>
    <div className="flex flex-wrap px0:ml-2 gap-4 pc:gap-6 justify-center items-center w-full ">
    {news?.map((news) => (
    <NewsCard key={news.News.id} data={news} />
    ))}
      </div>

</div>

<div>
<Link href="/blog" className="text-[24px]  font-bold text-center px0:text-left py-2 px0:ml-4 pc:ml-0  w-full hover:text-my-primary-500 duration-300 transition-all ">
       Latest Blogs
    </Link>
    <div className="flex flex-wrap px0:ml-2 gap-4 pc:gap-6 justify-center items-center w-full ">
    {blogs?.map((blog) => (
    <BlogCard key={blog.Blog.id} data={blog} />
    ))}

</div>
</div>

<div>
<Link href="/story" className="text-[24px]  font-bold text-center px0:text-left py-2 px0:ml-4 pc:ml-0  w-full hover:text-my-primary-500 duration-300 transition-all ">
       Latest Stories
    </Link>
    <div className="flex flex-wrap px0:ml-2 gap-4 pc:gap-6 justify-center items-center w-full ">
    {stories?.map((story) => (
    <StoryCard key={story.Story.id} data={story} />
    ))}

</div>
</div>
   </div>
  )
}
