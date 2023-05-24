"use client"
import { useRef, type FC, useState } from 'react';
import useDeleteBlogModal from '@/hooks/useDeleteBlogModal';
import ModalMultiAction from '../ui/ModalMultiAction';
import { AlertTriangle, Info } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';
import useLockOverflow from '@/hooks/useLockOverlfow';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';



  interface DeleteBlogModalProps {
      params: string 
      }

const DeleteBlogModal: FC<DeleteBlogModalProps> = ({params}) => {
    const router = useRouter()
    const deleteBlogRef = useRef<HTMLDivElement>(null);
    const deleteBlog = useDeleteBlogModal();
    const [isLoading, setIsLoading] = useState(false);
    useClickOutside(deleteBlogRef, deleteBlog.close)
    useLockOverflow(deleteBlog.isOpen)

    const deleteBlogMutation = useMutation({
        mutationFn: () => axios.delete(`/api/blog/${params}`),
        onSuccess: () => {
            toast.success("Deleted blog successfully")
            deleteBlog.close()
            router.push("/")
        }
        
        
    })

    const bodyContent = (
        <div className='flex justify-between items-center gap-4 py-2 w-full '>
            <div className='bg-rose-200 dark:bg-rose-600 flex justify-center items-center rounded-full w-[42px] h-[42px] '>
            <AlertTriangle size={28} className='text-rose-700 dark:text-rose-100 mb-1' />
            </div>
            <p className='text-lg text-my-neutral-950 dark:text-my-neutral-50 font-medium'>Are u sure that u want to delete this blog post ? </p>
        </div>
    )
  return (
<ModalMultiAction
ref={deleteBlogRef}
loading={isLoading}
isOpen={deleteBlog.isOpen}
onClose={deleteBlog.close}
title="Delete Blog"
actionLabel='Delete'
disabled={isLoading}
onSubmit={deleteBlogMutation.mutate}
body={bodyContent}
secondaryAction={deleteBlog.close}
secondaryActionLabel='Cancel'
/>
)
}

export default DeleteBlogModal