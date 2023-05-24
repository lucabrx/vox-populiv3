"use client"
import { useRef, type FC, useState, useEffect, useCallback } from 'react';
import useChangePasswordModal from '@/hooks/useChangePasswordModal';
import { useClickOutside } from '@/hooks/useClickOutside';
import useLockOverflow from '@/hooks/useLockOverlfow';
import Field from '../ui/Field';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserChangePaswordSchema, UserChangePaswordType } from '@/schema/user.schema';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import RegularModal from '../ui/RegularModal';

interface ChangePasswordModalProps {
  session : SafeSession | null;
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({session}) => {
    const changePasswordRef = useRef<HTMLDivElement>(null);
    const changePasswordModal = useChangePasswordModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register,handleSubmit,formState:{errors},reset, setValue} = useForm<UserChangePaswordType>({
        resolver: zodResolver(UserChangePaswordSchema),
    })

  

    useClickOutside(changePasswordRef, changePasswordModal.onClose)
    useLockOverflow(changePasswordModal.isOpen)

const changePassword = useMutation({
  mutationFn: (data: UserChangePaswordType) => 
  axios.post("/api/user/change-password", data),
  onSuccess: () => {
  toast.success("Password changed")
  reset()
  },
  onError: (error : any) => {
    toast.error(error.response.data)
    reset()
  },
  onSettled: () => {
    setIsLoading(false);
    changePasswordModal.onClose() 
     
  }
})

 useEffect(() => {
  setValue("userId", session?.id!)
}, [session?.id,setValue,changePassword])

    const onSubmit: SubmitHandler<UserChangePaswordType> = useCallback((data) => {
        setIsLoading(true);
        changePassword.mutate({...data})
    }, [changePassword,setIsLoading])
   

    const bodyContent = (
         <div className='flex flex-col w-full gap-4 items-center justify-center pt-4'>

           <Field error={errors.oldPassword}>
            <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>Old Password</label>
           <input 
              {...register('oldPassword')}
           placeholder='********'
            type="password"
           className='w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500' />
           </Field>

           <Field error={errors.newPassword}>
            <label className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold'>New Password</label>
           <input 
           {...register('newPassword')}
            placeholder='********'
            type="password"
           className='w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500' />
           </Field>

         </div>
    )
  return (
<RegularModal 
ref={changePasswordRef}
title='Change password'
disabled={isLoading}
isOpen={changePasswordModal.isOpen}
onClose={changePasswordModal.onClose}
onSubmit={handleSubmit(onSubmit)}
actionLabel="Update Password"
body={bodyContent}
/>
)
}

export default ChangePasswordModal