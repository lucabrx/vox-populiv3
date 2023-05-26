import { type FC } from 'react';
import Skeleton from './Skeleton';
interface SkeletonProps {
  
}

const SkeletonPost: FC<SkeletonProps> = ({}) => {
  return (
<div className='bg-white/75 dark:bg-my-neutral-900/70 rounded-lg  min-w-[320px] max-w-[328px] xs:max-w-[343px] w-full relative ss:max-w-[420px] xs:max-h-[256px] ss:max-h-[236px] md:max-w-[360px] lg:max-w-[320px] lg:max-h-[260px]  px0:max-w-[332px] pc:max-w-[350px] pc2:max-w-[360px] animate-pulse'> 
<Skeleton classes="title width-50" />
            <Skeleton classes="text width-100" />
            <Skeleton classes="text width-100" />
            <Skeleton classes="text width-100" />
</div>
)
}

export default SkeletonPost