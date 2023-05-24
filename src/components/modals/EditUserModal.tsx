"use client"
import { useRef, type FC, useState, useEffect, useCallback } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import useLockOverflow from '@/hooks/useLockOverlfow';
import useEditUser from '@/hooks/useEditUser';
import Field from '../ui/Field';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EditUserSchema, EditUserType } from '@/schema/user.schema';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import WriteModal from '../ui/WriteModal';

interface EditUserModalProps {
  session : SafeSession | null;
}

const EditUserModal: FC<EditUserModalProps> = ({session}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const editUserRef = useRef<HTMLDivElement>(null);
    const editUser = useEditUser();
    useClickOutside(editUserRef, editUser.onClose)
    useLockOverflow(editUser.isOpen)

    const {register,handleSubmit,formState:{errors},reset, setValue} = useForm<EditUserType>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            name: session?.name!,
            bio: session?.bio!,
            page: session?.page!,
        }
    })

    const editProfile = useMutation({
        mutationFn: (data: EditUserType) => 
        axios.post("/api/user/edit-profile", data),
        onSuccess: () => {
            toast.success("Edit profile successfully")
            reset()
        },
        onError: (error : any) => {
            toast.error(error.response.data)
            reset()
        },
        onSettled: () => {
            setIsLoading(false);
            editUser.onClose() 
        }
    
    })

    useEffect(() => {
        setValue("userId", session?.id!)
      }, [session?.id,setValue,editProfile])

      const onSubmit: SubmitHandler<EditUserType> = useCallback((data) => {
        setIsLoading(true);
        editProfile.mutate({...data})
    }, [editProfile,setIsLoading])

    const bodyContent = (
        <div className='flex flex-col w-full gap-4 items-center justify-center pt-4'>
            <Field error={errors.name}>
            <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>
            Name
            </label>
           <input 
              {...register('name')}
            type="text"
           className='w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500' />
           </Field>

           
           <Field >
            <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>
            Page
            </label>
           <input 
              {...register('page')}
            type="text"
           className='w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500' />
           </Field>
           <Field>
            <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>
            Bio</label>
           <textarea 
              {...register('bio')}
           className='w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500 resize-none' />
           </Field>
        </div>
    )

  return (
<WriteModal
ref={editUserRef}
isOpen={editUser.isOpen}
onClose={editUser.onClose}
title="Edit Profile"
actionLabel='Save'
disabled={isLoading}
onSubmit={handleSubmit(onSubmit)}
body={bodyContent}
/>
)
}

export default EditUserModal