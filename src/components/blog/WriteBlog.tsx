"use client"
import { useEffect, type FC } from 'react';
import ShouldRender from "@/components/helpers/ShouldRender";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import { CreateBlogSchema, CreateBlogType } from "@/schema/blog.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import MarkdownEditor from '../helpers/MarkdownEditor';
interface WriteBlogProps {
  
}

const WriteBlog: FC<WriteBlogProps> = ({}) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { register, handleSubmit,reset, formState: {errors}, setValue, control } = useForm<CreateBlogType>({
        resolver: zodResolver(CreateBlogSchema),
    });

    const createBlog = useMutation({
        mutationFn: (data: CreateBlogType) => 
        axios.post("/api/blog/create-blog", data),
        onSuccess: (data,variables) => {
            toast.success("Create blog successfully")
            reset()
            // TODO when fetch all blogs
            queryClient.invalidateQueries({
                queryKey: ["latest-blogs"],
            })
        },
        onError: () => {
            toast.error("Create blog failed")
        },
        onSettled: (data,err,variables) => {
        
           router.push(`/blog/${variables.id}`)
        }
    })

    useEffect(() => {
        setValue("id", nanoid())
      }, [createBlog,setValue,reset])

    const onSubmit = (values: CreateBlogType) => {
        createBlog.mutate(values)
      };
      
  return (
   <form 
   onSubmit={handleSubmit(onSubmit)}
   className="flex flex-col w-full justify-center items-center mt-4 space-y-4">
   <Field>
   <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>
       Name
       </label>
      <input 
         {...register('title')}
       type="text"
       placeholder="Blog title"
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
   className='w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500 resize-none h-16' />
   <ShouldRender if={errors.description}>
       <p className="text-red-500 text-sm">{errors.description?.message}</p>
   </ShouldRender>
   </Field>

   <Field>
   <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>
   Body
   </label> 
   <MarkdownEditor control={control} name="body" />

   <ShouldRender if={errors.body}>
       <p className="text-red-500 text-sm">{errors.body?.message}</p>
   </ShouldRender>
   </Field>

   <Button className="max-w-[140px] w-full self-end" size="md" art="cta">Create Blog</Button>
   </form>

)
}

export default WriteBlog