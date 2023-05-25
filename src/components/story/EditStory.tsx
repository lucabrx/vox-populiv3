"use client"
import { NewsType } from '@/db/tables/News';
import { useState, type FC, useRef } from 'react';
import IconContainer from '../ui/IconContainer';
import { Edit, Edit2, Trash } from 'lucide-react';
import Button from '../ui/Button';
import ShouldRender from '../helpers/ShouldRender';
import useLockOverflow from '@/hooks/useLockOverlfow';
import { useClickOutside } from '@/hooks/useClickOutside';
import useDeleteStory from '@/hooks/useDeleteStory';
import useEditStory from '@/hooks/useEditStory';
import DeleteStoryModal from '../modals/DeleteStoryModal';
import EditStoryText from './EditStoryText';


interface EditStoryProps {
  data: NewsType | null
}

const EditStory: FC<EditStoryProps> = ({data}) => {
    const [menu, setMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const deleteModal = useDeleteStory()
    const editStory = useEditStory();
    useLockOverflow(menu)
    useClickOutside(menuRef, () => setMenu(false))

    const openDeleteBlog = () => {
        deleteModal.open()
        setMenu(false)
    }
    
    const openEditBlog = () => {
        editStory.open()
        setMenu(false)
    }
  return (
<>
<DeleteStoryModal params={data?.id!}  />
<EditStoryText  storyData={data!} />

<ShouldRender if={!editStory.isOpen}>
<IconContainer 
onClick={() => setMenu(!menu)}
className='absolute right-2 top-2 cursor-pointer'> 
<Edit size={24} className='text-my-neutral-950 dark:text-my-neutral-50'  />
</IconContainer>
</ShouldRender>

{menu && (
<div ref={menuRef} className='absolute top-14 right-2 bg-white dark:bg-zinc-900 rounded-md shadow-sm p-4 
min-w-[220px] max-w-[260px]'>
<div className='w-full h-full flex justify-center flex-col items-center gap-2'>


<Button 
onClick={openEditBlog}
art="ghost" 
className='flex justify-between gap-3 items-center w-full'>
<IconContainer
art="solid">
    <Edit2 size={24} className=' dark:text-my-neutral-50' />
   
</IconContainer>
<p>Edit News</p>
</Button>

<Button 
onClick={openDeleteBlog}
art="ghost" 
className='flex justify-between gap-3 items-center w-full bg-z'>
<IconContainer art="solid">
    <Trash size={24} className=' dark:text-my-neutral-50' />
</IconContainer>
<p>Delete News</p>
</Button>



</div>
</div>
)}
</>
)
}

export default EditStory