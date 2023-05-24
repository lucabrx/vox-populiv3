"use client"
import { type FC } from 'react';
import ShouldRender from '../helpers/ShouldRender';
import { signOut } from 'next-auth/react';
import IconContainer from '../ui/IconContainer';
import { useTheme } from 'next-themes';
import { LogOut, Moon, Sun } from 'lucide-react';

interface SidebarFooterProps {
  session: SafeSession | null;
}

const SidebarFooter: FC<SidebarFooterProps> = ({session}) => {
    const { setTheme, resolvedTheme } = useTheme()

  return (

<div className='flex w-full justify-center  items-center gap-2 border-t-[0.5px] px-4 border-my-neutral-200 dark:border-my-neutral-700/50 pt-2'>
<div className='flex bg-white dark:bg-zinc-900 rounded-md p-1.5 gap-1 '>
<IconContainer 
art="themeToggle" 
onClick={() => setTheme('light')}
className={resolvedTheme === "light" ? "bg-zinc-200 dark:bg-zinc-700 select-none" : "cursor-pointer"}> 
<Sun 
size={20} /> 
<p className='text-[14px] text-my-neutral-950 dark:text-my-neutral-50'>Light</p>
</IconContainer>
<IconContainer 
art="themeToggle" 
className={resolvedTheme === "dark" ? "bg-zinc-200 dark:bg-zinc-700 select-none" : "cursor-pointer"}
onClick={() => setTheme('dark')}
> 
<Moon 
size={20}
 />
<p className='text-[14px] text-my-neutral-950 dark:text-my-neutral-50'>Dark</p>
</IconContainer>
</div>
<ShouldRender if={session}>
<IconContainer 
onClick={() => signOut()}
className='w-[48px] h-[48px] p-1.5 cursor-pointer'>
    <LogOut
    size={28} 
    className='text-my-neutral-950 dark:text-my-neutral-50' />
</IconContainer>
</ShouldRender>
</div>
)
}

export default SidebarFooter