"use client"

import {  type FC, useState, useCallback } from 'react';
import { EditBLogSchema, EditBlogType } from '@/schema/blog.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Field from '../ui/Field';
import ShouldRender from '../helpers/ShouldRender';
import MarkdownEditor from '../helpers/MarkdownEditor';
import Button from '../ui/Button';
import IconContainer from '../ui/IconContainer';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useEditBlog from '@/hooks/useEditBlog';
import useEditNews from '@/hooks/useEditNews';
import { EditNewsSchema, EditNewsType } from '@/schema/news.schema';

interface EditNewsTextProps {
    newsData?: Blog;
}

const EditNewsText: FC<EditNewsTextProps> = ({newsData}) => {
    const editNews = useEditNews();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {watch,register,handleSubmit,formState:{errors},reset,control} = useForm<EditNewsType>({
        resolver: zodResolver(EditNewsSchema),
        defaultValues: {
          body: newsData?.body,
         title: newsData?.title,
         description: newsData?.description,
        }
    })

    const watchBody = watch("body");
    const watchTitle = watch("title");
    const watchDescription = watch("description");

    const shouldBlockUserFromUpdating =
      !watchBody ||
      !watchTitle ||
      (watchTitle === newsData?.title && watchBody === newsData?.body && watchDescription === newsData?.description);
  

    const editNewsText = useMutation({
        mutationFn: (data: EditNewsType) => 
        axios.post(`/api/news/${newsData?.id!}` , data),
        onSuccess: () => {
            toast.success("Edited news successfully")
            reset()
            router.refresh()
           
        },
        onError: (error : any) => {
            toast.error(error.response.data)
            reset()
        },
        onSettled: () => {
            setIsLoading(false);
            editNews.close() 
           
        }
    
    })

    const submitEvent: SubmitHandler<EditNewsType> = useCallback((data) => {
        setIsLoading(true);
        editNewsText.mutate({
            ...data,
    })

    router.refresh()
    }, [editNewsText,setIsLoading,router])


  return (
    <ShouldRender if={editNews.isOpen}>
<form
className='relative py-4 space-y-2 border-b border-my-neutral-200 dark:border-my-neutral-700'
onSubmit={handleSubmit(submitEvent)}>
<IconContainer
className='absolute top-5 right-0 cursor-pointer'
onClick={editNews.close}
>
    <X />
</IconContainer>
<h2 className="text-[24px] md:text-[28px] font-bold text-center px0:text-left">
    Edit Blog</h2>
            <Field>
   <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>
       Title
       </label>
      <input 
         {...register('title')}
       type="text"
      className='w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500' />
      <ShouldRender if={errors.title}>
       <p className="text-red-500 text-sm">{errors.title?.message}</p>
   </ShouldRender>
   </Field>
   <Field>
   <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>
    Description
   </label> 
   <textarea 
   placeholder="Description"
   {...register('description')}
   className='w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex  focus:ring-1 focus:ring-my-primary-500 resize-none h-16 overflow-y-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue lighter scrollbar-w-2 scrolling-touch outline-none' />
   <ShouldRender if={errors.description}>
       <p className="text-red-500 text-sm">{errors.description?.message}</p>
   </ShouldRender>
   </Field>
   <Field error={errors.category}>
   <select 
   className='p-2 rounded-md bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500' {...register("category")}>
        <option value="Tech">Tech</option>
        <option value="Sport">Sport</option>
        <option value="World">World</option>
        <option value="Lifestyle">Lifestyle</option>
    </select>

    <ShouldRender if={errors.category}>
        <p className="text-red-500 text-sm">{errors.category?.message}</p>
    </ShouldRender>
   </Field>
   <Field>
   <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>
   Body
   </label> 
   <MarkdownEditor  control={control} name="body" />
   <ShouldRender if={errors.body}>
       <p className="text-red-500 text-sm">{errors.body?.message}</p>
   </ShouldRender>
   </Field>

   <div className='flex justify-end items-center gap-2 py-2'>
    <Button
    onClick={editNews.close}
    disabled={isLoading}
    className='min-w-[100px]' art="ghost">Cancel</Button>
    <Button 
    type="submit"
    disabled={shouldBlockUserFromUpdating || isLoading}
    className='min-w-[100px]' art="cta">Edit</Button>

   </div>
   </form>
    </ShouldRender>
)
}

export default EditNewsText