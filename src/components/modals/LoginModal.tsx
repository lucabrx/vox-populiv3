"use client"
import { useState, type FC, useCallback, useRef } from 'react';
import RegularModal from '../ui/RegularModal';
import  useLoginModal  from '@/hooks/useLoginModal';
import { Icon } from '../ui/Icon';
import { signIn } from 'next-auth/react';
import Button from '../ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserLoginSchema, UserLoginType } from '@/schema/user.schema';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import LoginInput from './LoginInput';
import useLockOverflow from '@/hooks/useLockOverlfow';
import { useClickOutside } from '@/hooks/useClickOutside';
import useRegisterModal from '@/hooks/useRegisterModal';

interface LoginModalProps {
  
}

const LoginModal: FC<LoginModalProps> = ({}) => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)
  const loginModalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  

  const toggle = useCallback(() => {
    loginModal.close();
    registerModal.open();
    }, [loginModal, registerModal])



  const {register,handleSubmit,formState:{errors},reset} = useForm<UserLoginType>({
    resolver: zodResolver(UserLoginSchema)
})

  const onSubmit: SubmitHandler<UserLoginType> = (data) => {
    setIsLoading(true)
   signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
   })
   .then((res) => {
    setIsLoading(false)

    if(res?.ok) {
        toast.success('Welcome back!');
        reset()
        router.refresh();
        loginModal.close(); 
    }
    if (res?.error) {
        toast.error("Wrong Credentials")
    }
   })
   .catch((err) => {
          setIsLoading(false)
          router.push("/")
          loginModal.open();
     })
}


const BodyContent = (
  <div className="flex flex-col space-y-4 mt-2">
      <LoginInput
      id="email"
      label="Email"
      placeholder='yanadoe@examle.com'
      disabled={isLoading}
      register={register}
      errors={errors}
      required
      />
        <LoginInput 
      id="password"
      label="Password"
      disabled={isLoading}
      register={register}
      type="password"
      placeholder='********'
      errors={errors}
      required
      />
      </div>
)

  const FooterContent = (
    <div className='flex flex-col gap-4 p-6 border-t border-my-neutral-200/50 dark:border-my-neutral-700/50'>
            
    <Button 
    art="google"
     onClick={() => signIn("google")}
     className='flex justify-center items-center gap-4 w-full'
     >
    <Icon.Google />    
    <p>Google</p>
     </Button>
    <Button 
    art="github"
    className='flex justify-center items-center gap-4 w-full'
    onClick={() => signIn("github")}>
    <Icon.Github />
    <p className='text-my-neutral-50 dark:text-my-neutral-50'>
    Github
    </p>
    </Button>

    <div className='text-neutral-700 dark:text-my-neutral-200 text-center mt-4 font-light'>
        <div className='flex flex-row items-center gap-2 justify-center'>
        <p>Need an account?</p>
        <button
        onClick={toggle}
        className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold cursor-pointer hover:underline'>Register</button>
        </div>
    </div>

</div>
  )

  useLockOverflow(loginModal.isOpen);
  useClickOutside(loginModalRef,loginModal.close);
  return (
<RegularModal
actionLabel='Sign in'
title='Sign in to your account'
onClose={loginModal.close}
isOpen={loginModal.isOpen}
ref={loginModalRef}
disabled={isLoading}
footer={FooterContent}
onSubmit={handleSubmit(onSubmit)} 
body={BodyContent}
/>
)
}

export default LoginModal