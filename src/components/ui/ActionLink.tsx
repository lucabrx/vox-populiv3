"use client"
import { useCallback, type FC } from 'react';
import IconContainer from '../ui/IconContainer';
import { Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useMobileMenu from '@/hooks/useMobileMenu';



interface ActionLinkProps {
    action?: string;
    icon: Icon;
    title: string;
    path: string;
}

const ActionLink: FC<ActionLinkProps> = ({icon: Icon,title,path}) => {
  const router = useRouter();
  const mobileMenu = useMobileMenu();
  const handleClick = useCallback(() => {
    mobileMenu.close();
      router.push(path);
  }, [router, path, mobileMenu])
  return (
<button
onClick={handleClick}
className='flex items-center justify-between w-full py-2 rounded-md hover:bg-zinc-300/50 hover:dark:bg-zinc-500/20 dark:hover:bg-my-neutral-800 transition-colors duration-200 pl-2 pr-4 mr-2'
> 
<IconContainer art="solid">
    <Icon size='1.5rem' />
</IconContainer>
<h2 className='text-lg'>{title}</h2>
</button>
)
}

export default ActionLink