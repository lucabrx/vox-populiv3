"use client"
import { useState, type FC, useRef } from 'react';
import IconContainer from '../ui/IconContainer';
import { Edit, Edit2, Trash } from 'lucide-react';
import Button from '../ui/Button';
import useDeleteBlogModal from '@/hooks/useDeleteBlogModal';
import useLockOverflow from '@/hooks/useLockOverlfow';
import { useClickOutside } from '@/hooks/useClickOutside';

import ShouldRender from '../helpers/ShouldRender';
import DeleteBlogModal from '../modals/DeleteBlogModal';
import EditBlogText from './EditBlogText';
import useEditBlog from '@/hooks/useEditBlog';

interface EditBlogProps {
  data: Blog | null;
}

const EditBlog: FC<EditBlogProps> = ({data}) => {
    const [menu, setMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const deleteBlog = useDeleteBlogModal();
    const editBlog = useEditBlog();
    useLockOverflow(menu)
    useClickOutside(menuRef, () => setMenu(false))

    const openDeleteBlog = () => {
        deleteBlog.open()
        setMenu(false)
    }
    
    const openEditBlog = () => {
        editBlog.open()
        setMenu(false)
    }

  return (
<>
<DeleteBlogModal params={data?.id!}  />
<EditBlogText  blogData={data!} />

<ShouldRender if={!menu}>
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
 onClick={openEditBlog}
art="solid">
    <Edit2 size={24} className=' dark:text-my-neutral-50' />
   
</IconContainer>
<p>Edit Blog</p>
</Button>

<Button 
onClick={openDeleteBlog}
art="ghost" 
className='flex justify-between gap-3 items-center w-full bg-z'>
<IconContainer art="solid">
    <Trash size={24} className=' dark:text-my-neutral-50' />
</IconContainer>
<p>Delete Blog</p>
</Button>



</div>
</div>
)}
</>
)
}

export default EditBlog