"use client"
import { useEffect, type FC } from 'react';
import Field from '../ui/Field';
import MarkdownEditor from '../helpers/MarkdownEditor';
import Button from '../ui/Button';
import { useForm } from 'react-hook-form';
import { CreateNewsSchema, CreateNewsType } from '@/schema/news.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { nanoid } from 'nanoid';
import ImageUpload from '../ImageUpload';

interface WriteNewsProps {
  
}

const WriteNews: FC<WriteNewsProps> = ({}) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const {setValue,watch,reset,register,control,handleSubmit,formState: {errors}} = useForm<CreateNewsType>({
        resolver: zodResolver(CreateNewsSchema),
        defaultValues: {
            imageSrc: ""
        }
    })

    const imageSrc = watch("imageSrc")


    const createNews = useMutation({
        mutationFn: (data: CreateNewsType) => axios.post("/api/news/create-news", data),
        onSuccess: () => {
            toast.success("Create news successfully")
            reset()
            // TODO when fetch all news
            // queryClient.invalidateQueries({ }) 
        },
        onError: () => {
            toast.error("Create news failed")
        },
        onSettled: (data,err,variables) => {
            router.push(`/news/${variables.id}`)
         }
    })

    useEffect(() => {
        setValue("id", nanoid())
      }, [createNews,setValue,reset])

   

    const onSubmit = (values: CreateNewsType) => {
        createNews.mutate(values)
    }
  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col w-full justify-center items-center mt-4 space-y-4">
    <Field error={errors.title}>
    <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>
        Name
        </label>
       <input 
          {...register('title')}
        type="text"
        placeholder="News title"
       className='w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500' />
    </Field>

    <Field error={errors.description}>
    <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>
     Description
    </label> 
    <textarea 
    placeholder="Description"
    {...register('description')}
    className='w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500 resize-none h-16' />
    </Field>

    <Field error={errors.category}>
    <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>
     Category
    </label> 
   <select 
   className='p-2 rounded-md bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500' {...register("category")}>
        <option value="Tech">Tech</option>
        <option value="Sport">Sport</option>
        <option value="World">World</option>
        <option value="Lifestyle">Lifestyle</option>
    </select>
   </Field>
 
 
    <Field error={errors.body}>
    <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>
    Body
    </label> 
    <MarkdownEditor control={control} name="body" />
    </Field>

    <ImageUpload
    value={imageSrc!}
    onChange={(value) => setValue("imageSrc", value)}
    />
 
    <Button className="max-w-[160px] w-full self-end" size="md" art="cta">Create News</Button>
    </form>
)
}

export default WriteNews