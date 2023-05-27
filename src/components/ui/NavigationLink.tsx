"use client"
import { Icon } from 'lucide-react';
import { useCallback, type FC } from 'react';
import IconContainer from '../ui/IconContainer';
import { usePathname, useRouter } from 'next/navigation';
import useMobileMenu from '@/hooks/useMobileMenu';
 
interface NavigationLinkProps {
  path: string;
  icon: Icon;
  title: string;
}

const NavigationLink: FC<NavigationLinkProps> = ({path,icon: Icon,title}) => {
const pathname = usePathname();
const router = useRouter();
const mobileMenu = useMobileMenu();

const clickAction = useCallback(() => {
  mobileMenu.close();
  router.push(path);
}, [router, path, mobileMenu])

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