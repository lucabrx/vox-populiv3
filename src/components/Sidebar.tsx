import { type FC } from 'react';
import Logo from './ui/Logo';
import SidebarFooter from './sidebar/SidebarFooter';
import SidebarFooterTop from './sidebar/SidebarFooterTop';
import SidebarBody from './sidebar/SidebarBody';

interface SidebarProps {
  session: SafeSession | null
}

const Sidebar: FC<SidebarProps> = ({session}) => {
  return (
<div  className='w-[230px]  fixed left-0 top-0 h-screen bottom-0 bg-my-neutral-50 dark:bg-neutral-950 border-r border-my-neutral-200/30 dark:border-my-neutral-700/50 hidden px0:block pb-3  shadow-sm '> 
<div className=' h-full w-full flex flex-col justify-between items-center'>
<div className='py-[16px] shadow-sm w-full flex justify-center'>
<Logo />
</div>
<SidebarBody />

<SidebarFooterTop session={session} />
<SidebarFooter session={session} />
</div>
</div>
)
}

export default Sidebar