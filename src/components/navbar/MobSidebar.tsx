import { forwardRef, type FC } from 'react';
import IconContainer from '../ui/IconContainer';
import { X } from 'lucide-react';
import SidebarBody from '../sidebar/SidebarBody';



interface MbMenuProps {
  disableAction: () => void;
}




const MobSidebar = forwardRef<HTMLDivElement,MbMenuProps>(({disableAction},ref) => {
  return (
<div  ref={ref} className='absolute right-0 top-0 shadow-sm border-l border-my-neutral-200/30 dark:border-my-neutral-700/50 w-[300px] h-screen z-10 bg-my-neutral-50 dark:bg-my-neutral-950 px-2'> 
<IconContainer 
onClick={disableAction}
className='absolute top-2 right-2'>
    <X size={28} className='text-my-neutral-950 dark:text-my-neutral-50' />
</IconContainer>

<div className='w-full h-full mt-12 flex flex-col justify-start'>

<SidebarBody />

</div>
</div>
)
})
MobSidebar.displayName = 'MobSidebar'
export default MobSidebar