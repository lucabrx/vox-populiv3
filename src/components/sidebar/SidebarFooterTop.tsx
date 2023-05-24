import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';

interface SidebarHeaderProps {
    session: SafeSession | null;
}

const SidebarFooterTop: FC<SidebarHeaderProps> = ({session}) => {
  

  return (
<div className={`flex   justify-center  items-center w-full gap-2 px-4 py-2 ${session && "border-t-[0.5px]  border-my-neutral-200 dark:border-my-neutral-700/50"} min-h-[65.5px] `}> 
    { session && 
    <Link href="/user" className='cursor-pointer'>
    <Image 
    src={session?.image || '/avatar-placeholder.jpeg'}
    width={40}
    height={40}
    alt="user"
    className='rounded-full'
    />
    </Link>
    }
<div className='flex flex-col justify-center items-start w-full '>
    <Link href="/user" className='text-[16px] hover:text-my-primary-500 hover:dark:hover:text-my-primary-500 cursor-pointer text-my-neutral-950 dark:text-my-neutral-50 font-medium'>
      {session?.name}</Link>
<p className='text-my-neutral-400 dark:text-my-neutral-700 text-[12px]'>
    {session?.email}
</p>
</div>
</div>
)
}

export default SidebarFooterTop