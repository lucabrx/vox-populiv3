"use client"
import { SafeNews } from '@/types/joinedNews';
import {  useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, type FC, useCallback, Fragment } from 'react';
import NewsCard from '../ui/NewsCard';
import SkeletonPost from '../ui/SkeletonPost';
import ShouldRender from '../helpers/ShouldRender';
import Button from '../ui/Button';




const NewsHome: FC = ({}) => {
    const [category,setCategory] = useState('all')
    const queryClient = useQueryClient()
    const querykey = ['news', category]

    const fetchNews = useCallback(async ({pageParam = 0}) => {
        try {
          const response = await axios.get("/api/news/get-news", {
            params: {
              category: category,
              offset: pageParam,
              limit: 9
            },
          });
          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }, [category]);

    const {data, isLoading,fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery<SafeNews[]>({
        queryKey: querykey,
        queryFn: fetchNews,
        getNextPageParam: (lastPage, allPages) => {
          const lastPageLength = lastPage.length;
          return lastPageLength > 0 ? allPages.length * 9 : undefined;
        },
        
    })

     function handleClick(value: string) {
        setCategory(value)
        queryClient.invalidateQueries(querykey)  
    }

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
        <div className='flex w-full justify-center  items-center gap-2  px-4 mt-2'>
            <button onClick={() => handleClick("all")} className={`px-2 py-1 rounded-md text-sm font-semibold ${category === 'all' ? 'bg-neutral-300 text-my-neutral-950' : 'text-my-neutral-700  dark:text-my-neutral-50'}`}>All</button>

            <button onClick={() => handleClick("World")} className={`px-2 py-1 rounded-md text-sm font-semibold ${category === 'World' ? 'bg-neutral-300 text-my-neutral-950' : 'text-my-neutral-700  dark:text-my-neutral-50'}`}>World</button>

            <button onClick={() => handleClick("Tech")} className={`px-2 py-1 rounded-md text-sm font-semibold ${category === 'Tech' ? 'bg-neutral-300 text-my-neutral-950' : ' text-my-neutral-700  dark:text-my-neutral-50'}`}>Technology</button>

            <button onClick={() => handleClick('Sport')} className={`px-2 py-1 rounded-md text-sm font-semibold ${category === 'Sport' ? 'bg-neutral-300 text-my-neutral-950' : ' text-my-neutral-700  dark:text-my-neutral-50'}`}>Sport</button>

            <button onClick={() => handleClick('Lifestyle')} className={`px-2 py-1 rounded-md text-sm font-semibold ${category === 'Lifestyle' ? 'bg-neutral-300 text-my-neutral-950' : ' text-my-neutral-700  dark:text-my-neutral-50'}`}>Lifestyle</button>
        </div>
    <h2 className="text-[24px] md:text-[28px] font-bold text-center px0:text-left py-2 px0:ml-4 pc:ml-0  w-full">
    {
        category === 'all' ? 'Latest News' : category === 'Tech' ? 'Technology' : category === 'Sport' ? 'Sport' : category === 'Lifestyle' ? 'Lifestyle' : category === 'World' ? 'World' : 'Latest News'
    }    
    </h2>
    <div className="flex flex-wrap px0:ml-2 gap-4 pc:gap-6 justify-center items-center w-full ">

    {data?.pages?.map((page, pageIndex) => (
      <Fragment key={pageIndex}>
        {page?.map((news) => (
    <NewsCard key={news.News.id} data={news} />
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

export default NewsHome