import { SafeNews } from '@/types/joinedNews';
import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';
import  dayjs from 'dayjs'
import relativeFormat from 'dayjs/plugin/relativeTime'
import Badge from './Badge';
dayjs.extend(relativeFormat) 

interface NewsCardProps {
  data: SafeNews
}

const NewsCard: FC<NewsCardProps> = ({data}) => {
    const cutDesc = data?.News.description.slice(0, 100)
    const createdDate = dayjs(data?.News.created_at).fromNow()

  return (
<div className='bg-white dark:bg-my-neutral-900 rounded-lg  min-w-[320px] max-w-[328px] xs:max-w-[343px] w-full relative ss:max-w-[420px] xs:max-h-[256px] ss:max-h-[252px] md:max-w-[360px] lg:max-w-[320px] lg:max-h-[260px]  px0:max-w-[332px] pc:max-w-[350px] pc2:max-w-[360px]'> 
  <Badge 
  className='absolute top-2 right-2'
  art={data?.News?.category as "Tech" | "Sport" || "Lifestyle" || "World" }>{data.News.category}
  </Badge>

<div className='mt-3 px-4  max-w-[83%] w-full'>
<Link href={`/news/${data.News.id}`} className='font-semibold text-xl text-my-neutral-950 dark:text-my-neutral-50 hover:text-my-primary-500 hover:dark:text-my-primary-500 duration-300 transition-all'>
{data.News.title}
</Link>
</div>


<div className='pb-3'>
<div className='w-full grid grid-cols-2 place-items-start gap-3 items-start justify-items-start mt-3 px-3'>
    <div className='relative h-full w-full px0:w-[148px] lg:h-[120px]'>
        <Image 
        fill
        sizes='100%'
        src={data?.News?.imageSrc!}
        alt="mockup"
        priority
        className='rounded-md'
        />
    </div>
    <p className='text-[14px] font-medium leading-[20px]'>
    {cutDesc}...
    </p>
</div>

<div className='flex justify-between items-center w-full mt-3 px-3'>
<div className="flex justify-center items-center gap-2">

<div className='relative w-8 h-8'> 
<Image 
fill 
sizes='100%'
className='rounded-full'
src={data?.User?.image!}
alt={data?.User?.name!}
/>
</div>
<Link 
href={`/user/${data?.News.userId}`}
className='text-my-primary-500 text-[16px] font-medium'>{data?.User.name}
</Link>



</div>
<span className='text-sm text-my-neutral-700 dark:text-my-neutral-200'>{createdDate}</span>
</div>

</div>
</div>

)
}

export default NewsCard