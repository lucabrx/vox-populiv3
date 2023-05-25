"use client"
import { useRef, type FC, useState } from 'react';
import ModalMultiAction from '../ui/ModalMultiAction';
import { AlertTriangle, Info } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';
import useLockOverflow from '@/hooks/useLockOverlfow';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useDeleteNewsModal from '@/hooks/useDeleteNews';



  interface DeleteNewsModalProps {
      params: string 
      }

const DeleteNewsModal: FC<DeleteNewsModalProps> = ({params}) => {
    const router = useRouter()
    const deleteNewsRef = useRef<HTMLDivElement>(null);
    const deleteNews = useDeleteNewsModal();
    const [isLoading, setIsLoading] = useState(false);
    useClickOutside(deleteNewsRef, deleteNews.close)
    useLockOverflow(deleteNews.isOpen)

    const deleteNewsMutation = useMutation({
        mutationFn: () => axios.delete(`/api/news/${params}`),
        onSuccess: () => {
            toast.success("Deleted news successfully")
            deleteNews.close()
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
ref={deleteNewsRef}
loading={isLoading}
isOpen={deleteNews.isOpen}
onClose={deleteNews.close}
title="Delete Blog"
actionLabel='Delete'
disabled={isLoading}
onSubmit={deleteNewsMutation.mutate}
body={bodyContent}
secondaryAction={deleteNews.close}
secondaryActionLabel='Cancel'
/>
)
}

export default DeleteNewsModal