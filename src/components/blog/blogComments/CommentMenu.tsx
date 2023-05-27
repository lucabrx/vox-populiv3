"use client"
import DeleteCommentModal from '@/components/modals/DeleteBlogComment';
import EditCommentModal from '@/components/modals/EditBlogComment';

import Button from '@/components/ui/Button';
import IconContainer from '@/components/ui/IconContainer';
import useDeleteBlogCommentModal from '@/hooks/useDeleteBlogComment';
import useEditBlogComment from '@/hooks/useEditBlogComment';


import { Edit2, MoreHorizontal, Trash } from 'lucide-react';
import { useState, type FC, useRef } from 'react';

interface CommentMenuProps {
  params: string;
  userId: string;
    commentId: string;
    body: string;
}

const CommentMenu: FC<CommentMenuProps> = ({params,userId,commentId,body}) => {
    const [commentMenu, setcommentMenu] = useState(false);
    const commentMenuRef = useRef<HTMLDivElement>(null);
    const deleteComment = useDeleteBlogCommentModal()
    const updateComment = useEditBlogComment()
    
   

    const handleDeleteComment = () => {
        deleteComment.onOpen()
        setcommentMenu(false)
    }

    const handleUpdateComment = () => {
        updateComment.onOpen()
        setcommentMenu(false)
    }
    
  return (
<>
<DeleteCommentModal
params={params}
commentId={commentId}
userId={userId}
/>

<EditCommentModal
body={body}
params={params}
commentId={commentId}
userId={userId}
/>

<div 
ref={commentMenuRef}
onClick={() => setcommentMenu(!commentMenu)}
className='absolute -top-1 right-2 p-0.5 rounded-md hover:bg-zinc-300/50 hover:dark:bg-zinc-500/20 cursor-pointer'> 
<MoreHorizontal size={24} className='text-my-neutral-950 dark:text-my-neutral-50' />
</div>


{commentMenu && (
    <div ref={commentMenuRef}  
    className='absolute top-7 right-2 bg-white dark:bg-zinc-900 rounded-md shadow-sm p-2 z-10
    min-w-[220px] max-w-[260px]'>
    <div className='w-full h-full flex justify-center flex-col items-center gap-2'>
    
    
    <Button 
    onClick={handleUpdateComment}
    art="ghost" 
    className='flex justify-between gap-3 items-center w-full'>
    <IconContainer
    
    art="solid">
        <Edit2 size={24} className=' dark:text-my-neutral-50' />
    </IconContainer>
    <p className='text-sm text-my-neutral-950 dark:text-my-neutral-50'>Edit Comment</p>
    </Button>
    
    <Button 
    onClick={handleDeleteComment}
    art="ghost" 
    className='flex justify-between gap-3 items-center w-full '>
    <IconContainer art="solid">
        <Trash size={24} className=' dark:text-my-neutral-50' />
    </IconContainer>
    <p className='text-sm text-my-neutral-950 dark:text-my-neutral-50'>Delete Comment</p>
    </Button>
    </div>
    </div>
)}
</>
)
}

export default CommentMenu