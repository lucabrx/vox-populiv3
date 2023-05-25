"use client"
import { NewsType } from '@/db/tables/News';
import { useState, type FC, useRef } from 'react';
import IconContainer from '../ui/IconContainer';
import { Edit, Edit2, Trash } from 'lucide-react';
import Button from '../ui/Button';
import ShouldRender from '../helpers/ShouldRender';
import useDeleteNewsModal from '@/hooks/useDeleteNews';
import useLockOverflow from '@/hooks/useLockOverlfow';
import { useClickOutside } from '@/hooks/useClickOutside';
import useEditNews from '@/hooks/useEditNews';
import DeleteBlogModal from '../modals/DeleteBlogModal';
import EditBlogText from '../blog/EditBlogText';
import DeleteNewsModal from '../modals/DeleteNewsModal';
import EditNewsText from './EditNewsText';

interface EditNewsProps {
  data: NewsType | null
}

const EditNews: FC<EditNewsProps> = ({data}) => {
    const [menu, setMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const deleteModal = useDeleteNewsModal()
    const editNews = useEditNews();
    useLockOverflow(menu)
    useClickOutside(menuRef, () => setMenu(false))

    const openDeleteBlog = () => {
        deleteModal.open()
        setMenu(false)
    }
    
    const openEditBlog = () => {
        editNews.open()
        setMenu(false)
    }
  return (
<>
<DeleteNewsModal params={data?.id!}  />
<EditNewsText  newsData={data!} />

<ShouldRender if={!editNews.isOpen}>
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

export default EditNews