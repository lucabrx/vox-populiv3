"use client"
import { Icon } from 'lucide-react';
import { type FC } from 'react';
import IconContainer from '../ui/IconContainer';
import { usePathname, useRouter } from 'next/navigation';
 
interface NavigationLinkProps {
  path: string;
  icon: Icon;
  title: string;
}

const NavigationLink: FC<NavigationLinkProps> = ({path,icon: Icon,title}) => {
const pathname = usePathname();
const router = useRouter();

const clickAction = () => {
  router.push(path);

}

  return (
<div 
onClick={clickAction}
className={`flex items-center justify-between w-full py-1.5 rounded-md hover:bg-zinc-300/50 hover:dark:bg-zinc-500/20 dark:hover:bg-my-neutral-800 transition-colors duration-200 pl-2 pr-4 mr-2 cursor-pointer
${pathname === path ? 'bg-zinc-300/50 dark:bg-zinc-500/20' : ''}
`}> 
<IconContainer art="solid">
    <Icon size={20} />
</IconContainer>
<h2 className='text-lg '>{title}</h2>
</div>
)
}

export default NavigationLink