import Link from 'next/link';
import { type FC } from 'react';

interface LogoProps {
  
}

const Logo: FC<LogoProps> = ({}) => {
  return (
<Link href="/" className='text-my-neutral-950 dark:text-my-neutral-50 text-[28px] leading-[28px] font-bold cursor-pointer px0:ml-10 pc2:ml-0'>
vox <span className=' text-my-primary-500'>
  Populi
</span>
</Link>
)
}

export default Logo