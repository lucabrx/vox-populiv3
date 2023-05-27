"use client"
import { SafeBlog } from '@/types/joinedNews';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import {  Fragment, type FC } from 'react';
import SkeletonPost from '../ui/SkeletonPost';
import ShouldRender from '../helpers/ShouldRender';
import Button from '../ui/Button';
import BlogCard from '../ui/BlogCard';


const BlogHome: FC = ({}) => {

    const querykey = ['blog', 'all']

    const fetchBlog = async ({pageParam = 0}) => {
        try {
          const response = await axios.get("/api/blog/get-blogs", {
            params: {
              offset: pageParam,
              limit: 9
            },
          });
          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      };

      const {data, isLoading,fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery<SafeBlog[]>({
        queryKey: querykey,
        queryFn: fetchBlog,
        getNextPageParam: (lastPage, allPages) => {
          const lastPageLength = lastPage.length;
          return lastPageLength > 0 ? allPages.length * 1 : undefined;
        },
        
    })

    function handleLoadMore() {
        fetchNextPage();
      };
    
  
      if (isLoading) {
        [Array(3).keys()].map((_,idx) => (
           <SkeletonPost key={idx} />
        )
        )
        }

  return (
    <div className="flex flex-col w-full pb-4 md:pt-3 justify-center items-center">
<h2 className="text-[24px] md:text-[28px] font-bold text-center px0:text-left py-2 px0:ml-4 pc:ml-0  w-full">
   All Blogs
    </h2>
    <div className="flex flex-wrap px0:ml-2 gap-4 pc:gap-6 justify-center items-center w-full ">

    {data?.pages?.map((page, pageIndex) => (
      <Fragment key={pageIndex}>
        {page?.map((blog) => (
    <BlogCard key={blog?.Blog?.id} data={blog} />
    ))}
    </Fragment>
    ))}

</div>
<ShouldRender if={hasNextPage}>
      <Button
        className="mt-4"
        size="sm"
      onClick={handleLoadMore}
       disabled={isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </Button>
</ShouldRender>
</div>
)
}

export default BlogHome