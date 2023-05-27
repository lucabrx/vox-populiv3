"use client"
import { useRef, type FC, useState, useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {  updateCommentType, updateCommentSchema } from '@/schema/storyComment.schema';
import Field from '../ui/Field';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import WriteModal from '../ui/WriteModal';
import { useRouter } from 'next/navigation';
import useEditStoryComment from '@/hooks/useEditStoryComment';

interface DeleteCommentModalProps {
    params: string;
    commentId: string;
    userId: string;
    body: string;
}

const EditStoryCommentModal: FC<DeleteCommentModalProps> = ({params,commentId,userId,body}) => {
    const editCommentRef = useRef<HTMLDivElement>(null);
    const editComment = useEditStoryComment();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const {register,handleSubmit,formState:{errors}, reset, setValue} = useForm<updateCommentType>({
        resolver: zodResolver(updateCommentSchema),
        defaultValues: {
            body: body 
        }
    })

    useEffect(() => {
        setValue("commentId", commentId!)
        setValue("userId", userId!)
    }, [setValue,commentId,userId])


    const editCommentMutation = useMutation({
        mutationFn: (data : updateCommentType) => (axios.post("/api/comments/story/update", {
            body: data.body,
            userId: data.userId,
            commentId : data.commentId
        })),

        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: () => {
            toast.success("edit blog successfully")
            
            
        },
        onError: () => {
            toast.error("Something went wrong")
            console.log("Something went wrong")
        },
        onSettled: () => {
            setIsLoading(false)
            editComment.onClose()
            reset()
            router.refresh()
        }
    })




    const onSubmit: SubmitHandler<updateCommentType> = useCallback((data) => {
        setIsLoading(true);
        editCommentMutation.mutate({...data})
    }, [editCommentMutation,setIsLoading])

    const bodyContent = (
            <Field error={errors.body}>
           <textarea 
              {...register('body')}
           className='w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500 resize-none' />
           </Field>
    )
  return (
<WriteModal
ref={editCommentRef}
isOpen={editComment.isOpen}
onClose={editComment.onClose}
title="Edit Comment"
actionLabel='Edit'
disabled={isLoading}
onSubmit={handleSubmit(onSubmit)}
body={bodyContent}
/>
)
}

export default EditStoryCommentModal