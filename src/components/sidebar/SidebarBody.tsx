"use client"
import { type FC } from 'react';
import { Bold, Home, MenuSquare, Newspaper, Pen, User } from 'lucide-react';
import NavigationLink from '../ui/NavigationLink';
import ActionLink from '../ui/ActionLink';
import ShouldRender from '../helpers/ShouldRender';

interface BodyTopProps {
  session : SafeSession | null;
}

const navigationLink = [
    {
        path: '/',
        icon: Home,
        title: 'Home'
    },
    {
        path: '/news',
        icon: Newspaper,
        title: 'News'
    },
    {
        path: '/blog',
        icon: Bold,
        title: 'Blogs'
    },
    {
        path: '/story',
        icon: MenuSquare,
        title: 'Stories'
    },
    {
        path: '/user',
        icon: User,
        title: 'Profile'
    }
]

const actionLink = [
    {
        icon: Pen,
        title: 'Create Blog',
        path: '/blog/new',
    }
]

const SidebarBody: FC<BodyTopProps> = ({session}) => {
  return (
<div className='flex flex-col  w-full h-full pt-2  px-4 border-my-neutral-200/30  dark:border-my-neutral-700/50 dark:border-t-[1px] pb-1 '> 
<h2 className='text-xl rounded-md dark:text-my-neutral-50 text-my-neutral-950 font-semibold px-2 '>Navigation</h2>
<div className='flex flex-col items-center justify-center mt-2 gap-2'>
    {navigationLink.map((link) => (
        <NavigationLink
        key={link.path}
        path={link.path}
        icon={link.icon}
        title={link.title}
        />
    ))}
</div>
<div className='flex flex-col items-center justify-center mt-2 '>
    {actionLink.map((link) => (
        <ActionLink
        key={link.title}
        icon={link.icon}
        title={link.title}
        path={link.path}
        />
    ))}
    
   <ShouldRender if={session?.role === 'NewsEditor' }>
   <ActionLink 
        icon={Newspaper}
        title='Create News'
        path='/news/new'
    /> 
     <ActionLink 
        icon={MenuSquare}
        title='Create Story'
        path='/story/new'
    /> 
    </ShouldRender>
  

</div>
</div>
)
}

export default SidebarBody