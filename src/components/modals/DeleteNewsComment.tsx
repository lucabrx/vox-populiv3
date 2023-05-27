"use client"
import { useRef, type FC, useState } from 'react';
import ModalMultiAction from '../ui/ModalMultiAction';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useDeleteNewsCommentModal from '@/hooks/useDeleteNewsModal';

interface DeleteCommentModalProps {
    params: string;
    commentId: string;
    userId: string;
}

const DeleteNewsCommentModal: FC<DeleteCommentModalProps> = ({params,commentId,userId}) => {
    const deleteCommentRef = useRef<HTMLDivElement>(null);
    const deleteComment = useDeleteNewsCommentModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const deleteCommentMutation = useMutation({
        mutationFn: () => (axios.post("/api/comments/news/delete", {commentId, userId})),
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: () => {
            toast.success("Delete blog successfully")
            router.refresh()
        },
        onError: () => {
            toast.error("Something went wrong")
        },
        onSettled: () => {
            setIsLoading(false)
            deleteComment.onClose()
        }
    })

    const bodyContent = (
        <div className='flex justify-between items-center gap-2 py-2 w-full '>
        <div className='bg-rose-200 dark:bg-rose-600 flex justify-center items-center rounded-full w-[42px] h-[42px] '>
        <AlertTriangle size={28} className='text-rose-700 dark:text-rose-100 mb-1' />
        </div>
        <p className='text-lg text-my-neutral-950 dark:text-my-neutral-50 font-medium'>Are u sure that u want to delete this comment ? </p>
    </div>
    )
  return (
<ModalMultiAction
ref={deleteCommentRef}
loading={isLoading}
isOpen={deleteComment.isOpen}
onClose={deleteComment.onClose}
title="Delete Comment"
actionLabel='Delete'
disabled={isLoading}
onSubmit={deleteCommentMutation.mutate}
body={bodyContent}
secondaryAction={deleteComment.onClose}
secondaryActionLabel='Cancel'
/>
)
}

export default DeleteNewsCommentModal