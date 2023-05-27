"use client"
import Button from '@/components/ui/Button';
import { useState, type FC, useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCommentSchema,createCommentType } from '@/schema/blogComment.schema';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';

interface WriteCommentProps {
  
}

const WriteComment: FC<WriteCommentProps> = ({}) => {
  const pathname = usePathname()
  const blogId = pathname?.split("/")[2]
  const router = useRouter()
const [loading,setLoading] = useState(false)

const {register,handleSubmit,reset, setValue} = useForm<createCommentType>({
  resolver: zodResolver(createCommentSchema),
})

const createComment = useMutation({
mutationFn: (data: createCommentType) => (
  axios.post(`/api/comments/blog/create`, data)
),
onSuccess: () => {
  toast.success("Commented successfully")
  reset()
  router.refresh()
},
onError: (error : any) => {
  toast.error(error.response.data)
  reset()
},
onSettled: () => {
  setLoading(false);
  reset()
}
})
 useEffect(() => {
   setValue("blogId", blogId!)
 }, [createComment,setValue,reset,blogId])

const onSubmit: SubmitHandler<createCommentType> = useCallback((data: createCommentType) => {
  setLoading(true)
  createComment.mutate({
    body: data.body,
    blogId: data.blogId
  })
}, [createComment,setLoading])

  return (
<form 
onSubmit={handleSubmit(onSubmit)}
className='flex flex-col justify-center items-center w-full space-y-2 border-b border-my-neutral-200/30 dark:border-my-neutral-700/50 pb-3'>
<textarea 
    {...register('body')}
   placeholder="Tell me what you think..."
   className='w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex  focus:ring-1 focus:ring-my-primary-500 resize-none   h-full overflow-y-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue lighter scrollbar-w-2 scrolling-touch outline-none max-h-[70px]' 
/>
<Button isLoading={loading} art="cta" className='self-end'>Comment</Button>
</form>
)
}

export default WriteComment